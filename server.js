require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const YouTubeService = require('./services/youtubeService');
const SheetsService = require('./services/sheetsService');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Initialize services
const youtubeService = new YouTubeService(process.env.YOUTUBE_API_KEY);
const sheetsService = new SheetsService(
  process.env.GOOGLE_SHEETS_CREDENTIALS_FILE,
  process.env.GOOGLE_SHEET_ID
);

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/api/trends', async (req, res) => {
  try {
    const { searchQuery, maxResults = 50, order = 'viewCount' } = req.body;

    if (!searchQuery) {
      return res.status(400).json({ 
        error: 'Search query is required' 
      });
    }

    console.log(`Fetching trends for: "${searchQuery}" with order: "${order}"`);

    // Get videos from YouTube
    const videos = await youtubeService.getTrendingVideos(searchQuery, maxResults, order);
    
    // Get video statistics
    const videoIds = videos.map(video => video.videoId);
    const statistics = await youtubeService.getVideoStatistics(videoIds);
    
    // Merge videos with statistics
    const videosWithStats = videos.map(video => {
      const stats = statistics.find(stat => stat.videoId === video.videoId);
      return {
        ...video,
        viewCount: stats?.viewCount || 0,
        likeCount: stats?.likeCount || 0,
        commentCount: stats?.commentCount || 0
      };
    });

    // Save to Google Sheets
    await sheetsService.writeVideosToSheet(videosWithStats, searchQuery);

    res.json({
      success: true,
      searchQuery,
      count: videosWithStats.length,
      videos: videosWithStats
    });

  } catch (error) {
    console.error('Error in /api/trends:', error);
    res.status(500).json({ 
      error: error.message || 'Internal server error' 
    });
  }
});

app.get('/api/sheet-data', async (req, res) => {
  try {
    const data = await sheetsService.getSheetData();
    res.json({
      success: true,
      data: data
    });
  } catch (error) {
    console.error('Error in /api/sheet-data:', error);
    res.status(500).json({ 
      error: error.message || 'Failed to fetch sheet data' 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString() 
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ 
    error: 'Internal server error' 
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Make sure to set up your environment variables:');
  console.log('- YOUTUBE_API_KEY');
  console.log('- GOOGLE_SHEETS_CREDENTIALS_FILE');
  console.log('- GOOGLE_SHEET_ID');
});
