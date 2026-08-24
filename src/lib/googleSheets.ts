import { google } from "googleapis";
import type { LeadSubmissionPayload } from "@/types/lead";

/**
 * Server-side only. Reads credentials from environment variables — never
 * hardcode secrets here. Populate these in `.env.local` (see
 * `.env.local.example` for the exact keys):
 *
 *  - GOOGLE_SHEETS_CLIENT_EMAIL  -> the service account's `client_email`
 *  - GOOGLE_SHEETS_PRIVATE_KEY   -> the service account's `private_key`
 *  - GOOGLE_SHEETS_SPREADSHEET_ID -> the target spreadsheet's ID (from its URL)
 */
function getServiceAccountCredentials() {
  const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY;
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

  if (!clientEmail || !privateKey || !spreadsheetId) {
    throw new Error(
      "Google Sheets credentials are not configured. Set GOOGLE_SHEETS_CLIENT_EMAIL, " +
        "GOOGLE_SHEETS_PRIVATE_KEY, and GOOGLE_SHEETS_SPREADSHEET_ID in your environment."
    );
  }

  return {
    clientEmail,
    // Environment variables can't hold literal newlines, so the key is
    // stored with escaped "\n" sequences and unescaped here.
    privateKey: privateKey.replace(/\\n/g, "\n"),
    spreadsheetId,
  };
}

const SHEET_RANGE = "Leads!A:G";

export async function appendLeadToSheet(lead: LeadSubmissionPayload): Promise<void> {
  const { clientEmail, privateKey, spreadsheetId } = getServiceAccountCredentials();

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  const row = [
    new Date().toISOString(),
    lead.fullName,
    lead.contactNumber,
    lead.email,
    lead.designation,
    lead.company,
    lead.numberOfHampers,
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: SHEET_RANGE,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [row],
    },
  });
}
