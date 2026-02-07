const { google } = require('googleapis');

/**
 * Extracts the YouTube Video ID from various URL formats.
 * @param {string} url The YouTube URL.
 * @returns {string|null} The video ID or null if not found.
 */
function extractVideoId(url) {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

/**
 * Fetches comments for a given YouTube URL using official YouTube Data API.
 * @param {string} url The YouTube URL to fetch comments from.
 * @returns {Promise<string[]>} A list of comment texts.
 */
async function fetchComments(url) {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) {
    throw new Error("YOUTUBE_API_KEY is not set in environment variables.");
  }

  const videoId = extractVideoId(url);
  if (!videoId) {
    throw new Error("Invalid YouTube URL. Could not extract Video ID.");
  }

  console.log(`[YouTubeService] Fetching real comments for Video ID: ${videoId}`);

  const youtube = google.youtube({
    version: 'v3',
    auth: apiKey
  });

  try {
    const response = await youtube.commentThreads.list({
      part: 'snippet',
      videoId: videoId,
      maxResults: 50,
      textFormat: 'plainText'
    });

    const comments = response.data.items.map(item =>
      item.snippet.topLevelComment.snippet.textDisplay
    );

    console.log(`[YouTubeService] Successfully fetched ${comments.length} comments.`);
    return comments;
  } catch (error) {
    console.error("YouTube API Error:", error.message);
    if (error.response && error.response.data && error.response.data.error) {
      const details = error.response.data.error.errors.map(e => e.message).join(', ');
      throw new Error(`YouTube API Error: ${details}`);
    }
    throw new Error(`Failed to fetch comments from YouTube: ${error.message}`);
  }
}

module.exports = {
  fetchComments
};
