/**
 * Haldiram's Hampers — lead capture endpoint.
 *
 * Paste this into Extensions → Apps Script on the target spreadsheet, set
 * SHARED_SECRET below, then deploy as a Web App (Execute as: Me, Who has
 * access: Anyone). The /exec URL it hands back goes into the site's
 * GOOGLE_APPS_SCRIPT_URL environment variable.
 *
 * The script runs as the sheet's owner, so no API key, service account, or
 * OAuth setup is involved anywhere.
 */

/** Must match GOOGLE_APPS_SCRIPT_SECRET in the site's .env.local / Vercel env. */
var SHARED_SECRET = 'CHANGE_ME_TO_A_LONG_RANDOM_STRING';

/** Tab the leads are appended to. Created automatically if missing. */
var SHEET_NAME = 'Leads';

/**
 * Column order, top to bottom = left to right in the sheet.
 * `key` is the field name sent by the site; `label` is the header text.
 * Add a pair here and the new column starts filling itself — no other change.
 */
var COLUMNS = [
  { key: '_receivedAt',           label: 'Received At' },
  { key: 'fullName',              label: 'Full Name' },
  { key: 'contactNumber',         label: 'Contact Number' },
  { key: 'email',                 label: 'Email' },
  { key: 'designation',           label: 'Designation' },
  { key: 'company',               label: 'Company' },
    { key: 'city',                  label: 'City' },
  { key: 'numberOfHampers',       label: 'No. of Hampers' },

  { key: 'channel',               label: 'Channel' },
  { key: 'source',                label: 'UTM Source' },
  { key: 'medium',                label: 'UTM Medium' },
  { key: 'campaign',              label: 'UTM Campaign' },
  { key: 'term',                  label: 'UTM Term' },
  { key: 'content',               label: 'UTM Content' },
  { key: 'clickId',               label: 'Click ID' },
  { key: 'clickIdType',           label: 'Click ID Type' },
  { key: 'referrer',              label: 'Referrer' },
  { key: 'landingPage',           label: 'Landing Page' },
  { key: 'submittedPage',         label: 'Submitted From Page' },

  { key: 'firstTouchChannel',     label: 'First Touch Channel' },
  { key: 'firstTouchSource',      label: 'First Touch Source' },
  { key: 'firstTouchCampaign',    label: 'First Touch Campaign' },
  { key: 'firstTouchReferrer',    label: 'First Touch Referrer' },
  { key: 'firstTouchLandingPage', label: 'First Touch Landing Page' },
  { key: 'firstTouchAt',          label: 'First Touch At' },
  { key: 'visitCount',            label: 'Visit Count' },

  { key: 'deviceType',            label: 'Device' },
  { key: 'screenSize',            label: 'Screen Size' },
  { key: 'language',              label: 'Language' },
  { key: 'timezone',              label: 'Browser Timezone' },

  { key: 'ipCountry',             label: 'Country' },
  { key: 'ipRegion',              label: 'Region' },
  { key: 'ipCity',                label: 'City (from IP)' },
  { key: 'userAgent',             label: 'User Agent' },
  { key: 'requestReferer',        label: 'Request Referer' },
  { key: 'submittedAt',           label: 'Submitted At (ISO)' },

  // Added after the first deployment. New columns must be appended here,
  // never inserted mid-list: existing rows were written in the old order and
  // would end up one column out of step with a re-written header.

];

/** Browser health check — open the /exec URL directly to confirm it's live. */
function doGet() {
  return jsonResponse_({ success: true, message: 'Haldiram lead endpoint is live.' });
}

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return jsonResponse_({ success: false, message: 'Empty request body.' });
    }

    var data = JSON.parse(e.postData.contents);

    if (SHARED_SECRET && data.secret !== SHARED_SECRET) {
      return jsonResponse_({ success: false, message: 'Unauthorized.' });
    }

    // Concurrent submissions would otherwise race for the same next row and
    // overwrite each other.
    var lock = LockService.getScriptLock();
    lock.waitLock(20000);

    try {
      var sheet = getSheet_();
      ensureHeader_(sheet);

      data._receivedAt = Utilities.formatDate(
        new Date(),
        Session.getScriptTimeZone(),
        'yyyy-MM-dd HH:mm:ss'
      );

      var row = COLUMNS.map(function (column) {
        return sanitizeCell_(data[column.key]);
      });

      sheet.appendRow(row);
    } finally {
      lock.releaseLock();
    }

    return jsonResponse_({ success: true });
  } catch (error) {
    return jsonResponse_({ success: false, message: String(error) });
  }
}

function getSheet_() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
  }

  return sheet;
}

/** Writes (or repairs) the header row and freezes it. Idempotent. */
function ensureHeader_(sheet) {
  var labels = COLUMNS.map(function (column) {
    return column.label;
  });

  // Adding a COLUMNS entry doesn't widen the sheet's grid, and getRange() past
  // the last column throws — so make room before reading or writing row 1.
  var maxColumns = sheet.getMaxColumns();
  if (maxColumns < labels.length) {
    sheet.insertColumnsAfter(maxColumns, labels.length - maxColumns);
  }

  if (!headerNeedsWriting_(sheet, labels)) return;

  sheet
    .getRange(1, 1, 1, labels.length)
    .setValues([labels])
    .setFontWeight('bold')
    .setBackground('#7A1F2B')
    .setFontColor('#FFFFFF');

  sheet.setFrozenRows(1);
}

/**
 * True when row 1 is empty or no longer matches COLUMNS — compared cell by
 * cell rather than by joining into one string, so no separator character can
 * ever collide with a label's own text.
 */
function headerNeedsWriting_(sheet, labels) {
  if (sheet.getLastRow() === 0) return true;

  var current = sheet.getRange(1, 1, 1, labels.length).getValues()[0];

  for (var i = 0; i < labels.length; i++) {
    if (String(current[i]) !== labels[i]) return true;
  }

  return false;
}

/**
 * Google Sheets treats a leading =, +, -, or @ as the start of a formula — so
 * a phone number like "+919876543210" would be evaluated as arithmetic, and a
 * hostile "=IMPORTXML(...)" would execute on open. A leading apostrophe pins
 * the value as text; Sheets stores it without displaying the apostrophe.
 */
function sanitizeCell_(value) {
  if (value === null || value === undefined) return '';

  var text = String(value);
  if (/^[=+\-@\t\r]/.test(text)) {
    return "'" + text;
  }

  return text;
}

function jsonResponse_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON
  );
}

/**
 * Optional: run once from the Apps Script editor to create the tab and header
 * row up front, so the sheet looks right before the first real lead arrives.
 */
function setup() {
  ensureHeader_(getSheet_());
}
