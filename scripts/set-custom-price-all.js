// Mark all items as "custom price" (participation libre) in Google Sheets
// This sets column K (IsCustomPrice) to TRUE for all rows with data.
//
// Usage:
//   node scripts/set-custom-price-all.js
//
// Requirements:
// - service_account.json present at project root OR GOOGLE_SERVICE_ACCOUNT_JSON env var set
// - Spreadsheet ID available via either:
//    - SPREADSHEET_ID env var, or
//    - config.js export with `export const config = { spreadsheetId: '...' }`

const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

async function loadServiceAccount() {
  if (process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
    return JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
  }
  const serviceAccountPath = path.resolve(process.cwd(), 'service_account.json');
  if (!fs.existsSync(serviceAccountPath)) {
    throw new Error(
      'Missing service_account.json and GOOGLE_SERVICE_ACCOUNT_JSON is not set.'
    );
  }
  const content = fs.readFileSync(serviceAccountPath, 'utf8');
  return JSON.parse(content);
}

async function loadSpreadsheetId() {
  if (process.env.SPREADSHEET_ID && process.env.SPREADSHEET_ID.trim().length > 0) {
    return process.env.SPREADSHEET_ID.trim();
  }
  try {
    // Dynamically import ESM config.js from CJS script
    const mod = await import(pathToFileUrl(path.resolve(__dirname, '..', 'config.js')).href);
    if (mod && mod.config && mod.config.spreadsheetId) {
      return mod.config.spreadsheetId;
    }
  } catch {
    // ignore and fall through
  }
  throw new Error('SPREADSHEET_ID not found. Set env var or define it in config.js.');
}

function pathToFileUrl(filePath) {
  const { pathToFileURL } = require('url');
  return pathToFileURL(filePath);
}

async function main() {
  try {
    const serviceAccount = await loadServiceAccount();
    const spreadsheetId = await loadSpreadsheetId();

    const auth = new google.auth.GoogleAuth({
      credentials: serviceAccount,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    const sheets = google.sheets({ version: 'v4', auth });

    // Determine the number of data rows by checking column A from row 2 downward
    const readResp = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Sheet1!A2:A',
    });
    const rows = readResp.data.values || [];
    const numRows = rows.length;

    if (numRows === 0) {
      console.log('No rows found. Nothing to update.');
      return;
    }

    // Prepare TRUE for every row
    const values = Array.from({ length: numRows }, () => ['true']);

    const startRow = 2;
    const endRow = startRow + numRows - 1;
    const range = `Sheet1!K${startRow}:K${endRow}`;

    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range,
      valueInputOption: 'USER_ENTERED',
      resource: { values },
    });

    console.log(`Updated ${numRows} rows in column K (IsCustomPrice) to TRUE.`);
  } catch (err) {
    console.error('Failed to set custom price for all items:', err?.message || err);
    process.exitCode = 1;
  }
}

main();


