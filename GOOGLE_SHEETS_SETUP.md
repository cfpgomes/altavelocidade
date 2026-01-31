# Google Sheets Integration Setup Guide

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet called "LAV Tracker Suggestions"
3. Add these column headers in the first row:
   - A: `Timestamp`
   - B: `Username`
   - C: `Headline`
   - D: `Section`
   - E: `Source Link`
   - F: `Submitted At`
   - G: `Source`
  - H: `Visibility`
  - I: `Status`

## Step 2: Create a Google Apps Script

1. In your Google Sheet, go to **Tools** → **Apps Script**
2. Delete any default code
3. Copy and paste the code below:

```javascript
// Handle GET requests (return suggestions list)
function doGet(e) {
  const sheet = SpreadsheetApp.getActiveSheet();
  const values = sheet.getDataRange().getValues();
  
  let items = [];
  if (values.length >= 2) {
    const headers = values.shift().map(h => String(h).trim().toLowerCase());
    const idx = (name) => headers.indexOf(name);

    const visibilityIndex = idx('visibility');
    const statusIndex = idx('status');

    items = values
      .filter((row) => {
        const visibility = visibilityIndex >= 0 ? String(row[visibilityIndex] || '').toLowerCase() : '';
        return visibility !== 'hidden';
      })
      .map((row) => ({
        timestamp: row[idx('timestamp')] || '',
        username: row[idx('username')] || '',
        headline: row[idx('headline')] || '',
        section: row[idx('section')] || '',
        sourceLink: row[idx('source link')] || '',
        submittedAt: row[idx('submitted at')] || '',
        source: row[idx('source')] || '',
        status: statusIndex >= 0 ? row[statusIndex] || '' : ''
      }));
  }

  const data = { items: items };
  const callback = e.parameter.callback;
  
  return ContentService
    .createTextOutput(callback + "(" + JSON.stringify(data) + ")")
    .setMimeType(ContentService.MimeType.JAVASCRIPT);
}

// Handle POST requests from the form
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    // Add new row with form data
    sheet.appendRow([
      new Date().toLocaleString(),
      data.username || '',
      data.headline || '',
      data.section || '',
      data.sourceLink || '',
      data.submittedAt || new Date().toISOString(),
      data.source || 'lav-tracker',
      data.visibility || 'hidden',
      data.status || 'analysis'
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: 'Data saved' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. Save the script (Ctrl+S or Cmd+S)
5. Name it "LAV Tracker Form Handler"

## Step 3: Deploy as Web App

1. Click **Deploy** → **New deployment**
2. Select **Type**: Web app
3. Set **Execute as**: Your Google account
4. Set **Who has access**: Anyone
5. Click **Deploy**
6. A dialog will appear with your deployment URL. Copy it.
   - It looks like: `https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/usercalledFunction`

**Security Note**: "Anyone" access means anyone can *call* the web app (submit data), but only you can *edit* the script. The script is in your Google account and only you have editor access. Data is saved only to your spreadsheet.

## Step 4: Configure Your Application

1. In your project root, create a `.env.local` file:
```
VITE_SUGGESTIONS_ENDPOINT=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/usercalledFunction
```

2. Replace `YOUR_DEPLOYMENT_ID` with the actual ID from Step 3

3. Restart your dev server:
```
npm run dev
```

## Step 5: Test

1. Go to the Submit Updates page
2. Fill out and submit a form
3. Check your Google Sheet to verify the data was added

## Troubleshooting

- **CORS errors**: The current implementation uses JSONP (JSON with Padding), which avoids CORS issues entirely by wrapping the response in a callback function and loading it as a script
- **Script not working**: Check the Apps Script logs (View → Logs)
- **Data not appearing**: Verify the sheet columns match the script
- **Updated script**: After changing the Apps Script, redeploy (Deploy → Manage deployments → Edit → New version)

## Technical Notes

**Why JSONP?** Instead of dealing with CORS headers, we use JSONP which wraps the JSON response in a callback function. This is served as JavaScript rather than JSON, allowing cross-origin requests without any CORS configuration needed. The frontend creates a dynamic `<script>` tag that loads the data, with a callback function that receives the data once loaded.

## Optional: Make Sheet Public for Reading

If you want to display suggestions dynamically from the sheet (instead of hardcoded data):

1. Go to your Google Sheet
2. Click **Share**
3. Set to "Anyone with the link can view"
4. You can then use the Sheet ID to fetch data via API

However, the current setup uses hardcoded data in `src/data.js`, so this is optional.
