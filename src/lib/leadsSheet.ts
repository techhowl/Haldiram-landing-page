import type { LeadSubmissionPayload } from "@/types/lead";

/**
 * Server-side only. Forwards a validated lead to the Google Apps Script Web
 * App that owns the spreadsheet — no Google Cloud project, no service account,
 * no OAuth. The Web App runs as the sheet's owner, so it already has write
 * access; all this side needs is the deployment URL and a shared secret.
 *
 * Env vars (see `.env.local.example`):
 *  - GOOGLE_APPS_SCRIPT_URL     -> the /exec URL from the Apps Script deployment
 *  - GOOGLE_APPS_SCRIPT_SECRET  -> the same string as SHARED_SECRET in Code.gs
 *
 * The URL stays on the server precisely so the endpoint can't be scraped off
 * the page and spammed directly.
 */

/** Apps Script cold starts are slow; past this the visitor has waited too long. */
const REQUEST_TIMEOUT_MS = 10_000;

function getConfig() {
  const url = process.env.GOOGLE_APPS_SCRIPT_URL;
  const secret = process.env.GOOGLE_APPS_SCRIPT_SECRET;

  if (!url) {
    throw new Error(
      "GOOGLE_APPS_SCRIPT_URL is not configured. Set it to the /exec URL of your " +
        "Apps Script Web App deployment."
    );
  }

  return { url, secret: secret ?? "" };
}

export async function appendLeadToSheet(lead: LeadSubmissionPayload): Promise<void> {
  const { url, secret } = getConfig();

  const { attribution, serverMeta } = lead;

  // Flat key/value shape: Code.gs maps these onto columns by name, so adding a
  // field here only needs the matching entry in the script's COLUMNS list.
  const payload = {
    secret,
    submittedAt: new Date().toISOString(),

    fullName: lead.fullName,
    contactNumber: lead.contactNumber,
    email: lead.email,
    designation: lead.designation,
    company: lead.company,
    numberOfHampers: lead.numberOfHampers,

    channel: attribution.channel,
    source: attribution.source,
    medium: attribution.medium,
    campaign: attribution.campaign,
    term: attribution.term,
    content: attribution.content,
    clickId: attribution.clickId,
    clickIdType: attribution.clickIdType,
    referrer: attribution.referrer,
    landingPage: attribution.landingPage,
    submittedPage: attribution.submittedPage,

    firstTouchChannel: attribution.firstTouchChannel,
    firstTouchSource: attribution.firstTouchSource,
    firstTouchCampaign: attribution.firstTouchCampaign,
    firstTouchReferrer: attribution.firstTouchReferrer,
    firstTouchLandingPage: attribution.firstTouchLandingPage,
    firstTouchAt: attribution.firstTouchAt,
    visitCount: attribution.visitCount,

    deviceType: attribution.deviceType,
    screenSize: attribution.screenSize,
    language: attribution.language,
    timezone: attribution.timezone,

    userAgent: serverMeta.userAgent,
    ipCountry: serverMeta.ipCountry,
    ipRegion: serverMeta.ipRegion,
    ipCity: serverMeta.ipCity,
    requestReferer: serverMeta.requestReferer,
  };

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  let response: Response;
  try {
    response = await fetch(url, {
      method: "POST",
      // text/plain dodges the CORS preflight Apps Script won't answer, and the
      // script parses the raw body as JSON regardless of this header.
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
      signal: controller.signal,
      // A Web App deployed for "Anyone" answers with a 302 to
      // script.googleusercontent.com — fetch follows it by default.
      redirect: "follow",
      cache: "no-store",
    });
  } finally {
    clearTimeout(timeout);
  }

  if (!response.ok) {
    throw new Error(`Apps Script responded with HTTP ${response.status}`);
  }

  // Apps Script returns HTTP 200 even for handled failures, so the body is the
  // real status signal.
  const text = await response.text();
  let result: { success?: boolean; message?: string };
  try {
    result = JSON.parse(text) as { success?: boolean; message?: string };
  } catch {
    throw new Error(`Apps Script returned a non-JSON response: ${text.slice(0, 200)}`);
  }

  if (!result.success) {
    throw new Error(`Apps Script rejected the lead: ${result.message ?? "unknown error"}`);
  }
}
