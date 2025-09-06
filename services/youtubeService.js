const { google } = require('googleapis');

class YouTubeService {
  constructor(apiKey) {
    this.youtube = google.youtube({
      version: 'v3',
      auth: apiKey
    });
  }

  async getTrendingVideos(searchQuery, maxResults = 50, order = 'viewCount') {
    try {
      const response = await this.youtube.search.list({
        part: 'snippet',
        q: searchQuery,
        type: 'video',
        order: order, // Критерий сортировки
        maxResults: maxResults,
        publishedAfter: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString() // Last 7 days
      });

      const videos = response.data.items.map(item => ({
        videoId: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        channelTitle: item.snippet.channelTitle,
        publishedAt: item.snippet.publishedAt,
        thumbnail: item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default?.url,
        url: `https://www.youtube.com/watch?v=${item.id.videoId}`
      }));

      return videos;
    } catch (error) {
      console.error('Error fetching YouTube videos:', error);
      throw new Error(`Failed to fetch YouTube videos: ${error.message}`);
    }
  }

  async getVideoStatistics(videoIds) {
    try {
      const response = await this.youtube.videos.list({
        part: 'statistics',
        id: videoIds.join(',')
      });

      return response.data.items.map(item => ({
        videoId: item.id,
        viewCount: parseInt(item.statistics.viewCount) || 0,
        likeCount: parseInt(item.statistics.likeCount) || 0,
        commentCount: parseInt(item.statistics.commentCount) || 0
      }));
    } catch (error) {
      console.error('Error fetching video statistics:', error);
      throw new Error(`Failed to fetch video statistics: ${error.message}`);
    }
  }
}

module.exports = YouTubeService;
