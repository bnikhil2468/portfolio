import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Spotify API credentials - set these in your environment variables
const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const SPOTIFY_REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

let accessToken = null;
let tokenExpiry = null;

// Spotify genre labels for Hindi, Tamil, and Telugu songs
const BLOCKED_GENRE_KEYWORDS = [
  // Hindi / Bollywood
  'bollywood', 'filmi', 'hindi', 'hindustani', 'bhojpuri',
  'desi pop', 'desi trap', 'desi hip hop', 'ghazal', 'qawwali',
  // Tamil / Kollywood
  'kollywood', 'tamil', 'carnatic',
  // Telugu / Tollywood
  'tollywood', 'telugu',
];

// Devanagari (Hindi U+0900–U+097F), Tamil (U+0B80–U+0BFF), Telugu (U+0C00–U+0C7F)
const HINDI_TAMIL_TELUGU_SCRIPT_RE = /[ऀ-ॿ஀-௿ఀ-౿]/;

function isBlockedTrack(track, genreMap) {
  if (track.artists.some(a => {
    const genres = genreMap[a.id] || [];
    return genres.some(g => BLOCKED_GENRE_KEYWORDS.some(kw => g.toLowerCase().includes(kw)));
  })) return true;
  const textsToCheck = [
    track.name,
    track.album.name,
    ...track.artists.map(a => a.name),
  ];
  return textsToCheck.some(t => HINDI_TAMIL_TELUGU_SCRIPT_RE.test(t));
}

// Function to get Spotify access token
async function getAccessToken() {
  // If we have a valid token, return it
  if (accessToken && tokenExpiry && Date.now() < tokenExpiry) {
    return accessToken;
  }

  // Otherwise, get a new token using refresh token
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + Buffer.from(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET).toString('base64'),
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: SPOTIFY_REFRESH_TOKEN,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to refresh access token');
  }

  const data = await response.json();
  accessToken = data.access_token;
  tokenExpiry = Date.now() + (data.expires_in * 1000);

  return accessToken;
}

// API endpoint to get top tracks
app.get('/api/spotify/top-tracks', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 6;
    // Fetch a larger pool so we still have enough tracks after filtering
    const fetchLimit = Math.min(limit * 8, 50);
    const token = await getAccessToken();

    const response = await fetch(`https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=${fetchLimit}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch top tracks');
    }

    const data = await response.json();
    const tracks = data.items || [];

    // Collect unique artist IDs (Spotify artists endpoint accepts up to 50)
    const artistIds = [...new Set(tracks.flatMap(t => t.artists.map(a => a.id)))].slice(0, 50);

    const artistsResponse = await fetch(`https://api.spotify.com/v1/artists?ids=${artistIds.join(',')}`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });

    const genreMap = {};
    if (artistsResponse.ok) {
      const artistsData = await artistsResponse.json();
      for (const artist of artistsData.artists || []) {
        genreMap[artist.id] = artist.genres || [];
      }
    }

    const filtered = tracks
      .filter(track => !isBlockedTrack(track, genreMap))
      .slice(0, limit);

    res.json({ ...data, items: filtered });
  } catch (error) {
    console.error('Error fetching top tracks:', error);
    res.status(500).json({ error: 'Failed to fetch top tracks' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});




