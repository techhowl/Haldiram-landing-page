# Hero form → Google Sheet (Apps Script)

Roughly 10 minutes end to end. No Google Cloud project, no service account, no API key.

How it flows: **browser → `/api/leads` (Next.js) → Apps Script Web App → Sheet.**
The Apps Script URL never reaches the browser, so it can't be scraped off the page and
spammed, and the existing validation + honeypot still run before anything is written.

---

## 1. Create the spreadsheet

1. Go to [sheets.new](https://sheets.new) and name it e.g. `Haldiram Hampers — Leads`.
2. Leave it empty. The script creates the `Leads` tab and header row itself.

## 2. Add the script

1. In that spreadsheet: **Extensions → Apps Script**.
2. Delete whatever is in `Code.gs`.
3. Paste the full contents of [`Code.gs`](./Code.gs) from this folder.
4. Replace `CHANGE_ME_TO_A_LONG_RANDOM_STRING` on line 15 with a long random string.
   Generate one with:

   ```bash
   node -e "console.log(require('crypto').randomBytes(24).toString('hex'))"
   ```

   Keep it somewhere — you need the identical string in step 4.
5. **Save** (Ctrl+S). Name the project anything.
6. Optional: pick `setup` in the function dropdown and **Run** once to create the
   `Leads` tab and header row immediately. Approve the permission prompt
   ("Advanced" → "Go to … (unsafe)" is expected — it's your own script).

## 3. Deploy it as a Web App

1. **Deploy → New deployment**.
2. Click the gear next to "Select type" → **Web app**.
3. Set:
   - **Description**: `Lead capture v1`
   - **Execute as**: **Me** (your account — this is what gives it sheet access)
   - **Who has access**: **Anyone**  ← must be "Anyone", not "Anyone with Google account"
4. **Deploy**, approve the authorization prompt.
5. Copy the **Web app URL**. It ends in `/exec`.

> "Anyone" only means the URL is reachable without a Google login. The `SHARED_SECRET`
> check is what actually keeps strangers from writing rows.

Sanity check: open that `/exec` URL in a browser. You should see
`{"success":true,"message":"Haldiram lead endpoint is live."}`.

## 4. Point the site at it

Create `.env.local` in the project root:

```bash
GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/PASTE_YOUR_ID/exec
GOOGLE_APPS_SCRIPT_SECRET=the-same-random-string-from-step-2
```

Restart the dev server (env vars are read at boot):

```bash
npm run dev
```

Submit the hero form. A row should appear in the `Leads` tab within a second or two.

## 5. Deploy to production

Add the same two variables in your host's dashboard — on Vercel:
**Project → Settings → Environment Variables** (Production + Preview) — then redeploy.

---

## Testing the source tracking

Load the site with campaign params and submit:

```
http://localhost:3000/?utm_source=google&utm_medium=cpc&utm_campaign=diwali_hampers&gclid=TEST123
```

The row should show **Channel** = `Google Ads`, plus source, medium, campaign and the
click ID in their own columns.

What lands in the sheet, per lead:

| Group | Columns |
| --- | --- |
| Form fields | Full Name, Contact Number, Email, Designation, Company, No. of Hampers |
| Last touch | Channel, UTM Source/Medium/Campaign/Term/Content, Click ID (+ type), Referrer, Landing Page, Submitted From Page |
| First touch | Channel, Source, Campaign, Referrer, Landing Page, timestamp — the campaign that *originally* brought them, even if they convert days later on a direct visit |
| Visitor | Visit Count, Device, Screen Size, Language, Browser Timezone |
| Server-derived | Country, Region, City (from Vercel/Cloudflare headers in production), User Agent, Request Referer |
| Timing | Received At (sheet timezone), Submitted At (ISO) |

`Channel` is the one to filter on day to day — it collapses everything above into
`Google Ads`, `Meta Ads`, `Organic Search`, `Referral — site.com`, `Direct`, `WhatsApp`,
`Email`, etc.

## Adding a form field later

1. Add it to `LeadFormData` in [`src/types/lead.ts`](../src/types/lead.ts) and the form.
2. Add it to the `payload` object in [`src/lib/leadsSheet.ts`](../src/lib/leadsSheet.ts).
3. Add a `{ key, label }` pair to `COLUMNS` in `Code.gs`.
4. **Deploy → Manage deployments → edit (pencil) → Version: New version → Deploy.**

Step 4 matters: editing the script alone does **not** update the live `/exec` URL.
Always ship a new version, and keep the same deployment so the URL doesn't change.

## Troubleshooting

| Symptom | Cause |
| --- | --- |
| Form says "couldn't submit", server logs show `HTTP 401`/`Unauthorized` | Secret mismatch between `.env.local` and `Code.gs` |
| Logs show a non-JSON response containing HTML | Deployment access isn't "Anyone" — Google served a login page |
| Rows stop appearing after a script edit | You edited but didn't redeploy a new version |
| `GOOGLE_APPS_SCRIPT_URL is not configured` | `.env.local` missing, or dev server not restarted after creating it |
| Phone numbers show as a negative number | Stale rows from before `sanitizeCell_` — new rows are stored as text |

Apps Script quotas are far above what a landing page needs (20,000 URL-fetch calls/day
on a free consumer account), so volume isn't a concern here.
