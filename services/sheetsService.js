const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

class SheetsService {
  constructor(credentialsFile, sheetId) {
    this.sheetId = sheetId;
    this.credentials = this.loadCredentials(credentialsFile);
    this.sheets = null;
  }

  loadCredentials(credentialsFile) {
    try {
      const credentialsPath = path.resolve(credentialsFile);
      const credentials = JSON.parse(fs.readFileSync(credentialsPath, 'utf8'));
      return credentials;
    } catch (error) {
      console.error('Error loading Google Sheets credentials:', error);
      throw new Error(`Failed to load credentials: ${error.message}`);
    }
  }

  async initialize() {
    try {
      const auth = new google.auth.GoogleAuth({
        credentials: this.credentials,
        scopes: ['https://www.googleapis.com/auth/spreadsheets']
      });

      this.sheets = google.sheets({ version: 'v4', auth });
    } catch (error) {
      console.error('Error initializing Google Sheets:', error);
      throw new Error(`Failed to initialize Google Sheets: ${error.message}`);
    }
  }

  async clearSheet(range = 'A:Z') {
    try {
      await this.sheets.spreadsheets.values.clear({
        spreadsheetId: this.sheetId,
        range: range
      });
    } catch (error) {
      console.error('Error clearing sheet:', error);
      throw new Error(`Failed to clear sheet: ${error.message}`);
    }
  }

  async writeVideosToSheet(videos, searchQuery) {
    try {
      if (!this.sheets) {
        await this.initialize();
      }

      // Prepare headers
      const headers = [
        'Search Query',
        'Video Title',
        'Channel',
        'Published Date',
        'Views',
        'Likes',
        'Comments',
        'Video URL',
        'Thumbnail URL'
      ];

      // Prepare data rows
      const dataRows = videos.map(video => [
        searchQuery,
        video.title,
        video.channelTitle,
        new Date(video.publishedAt).toLocaleDateString(),
        video.viewCount || 0,
        video.likeCount || 0,
        video.commentCount || 0,
        video.url,
        video.thumbnail || ''
      ]);

      // Combine headers and data
      const values = [headers, ...dataRows];

      // Write to sheet
      await this.sheets.spreadsheets.values.update({
        spreadsheetId: this.sheetId,
        range: 'A1',
        valueInputOption: 'RAW',
        resource: {
          values: values
        }
      });

      console.log(`Successfully wrote ${videos.length} videos to Google Sheets`);
      return { success: true, count: videos.length };
    } catch (error) {
      console.error('Error writing to Google Sheets:', error);
      throw new Error(`Failed to write to Google Sheets: ${error.message}`);
    }
  }

  async getSheetData(range = 'A1:Z1000') {
    try {
      if (!this.sheets) {
        await this.initialize();
      }

      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: this.sheetId,
        range: range
      });

      return response.data.values || [];
    } catch (error) {
      console.error('Error reading from Google Sheets:', error);
      throw new Error(`Failed to read from Google Sheets: ${error.message}`);
    }
  }
}

module.exports = SheetsService;
