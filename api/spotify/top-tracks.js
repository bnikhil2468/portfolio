// Vercel serverless function for Spotify API
const SOUTH_ASIAN_GENRE_KEYWORDS = [
  'bollywood', 'filmi', 'desi', 'indian', 'punjabi', 'bhangra',
  'tamil', 'telugu', 'hindi', 'bengali', 'gujarati', 'marathi',
  'kannada', 'malayalam', 'hindustani', 'carnatic', 'ghazal',
  'qawwali', 'bhojpuri', 'kollywood', 'tollywood',
  'south indian', 'desi pop', 'desi trap', 'desi hip hop',
  'tamil pop', 'telugu pop', 'hindi pop', 'hindi indie',
];

// Devanagari, Bengali, Gurmukhi, Gujarati, Oriya, Tamil, Telugu, Kannada, Malayalam, Sinhala
const SOUTH_ASIAN_SCRIPT_RE = /[ऀ-෿]/;

function isSouthAsianTrack(track, genreMap) {
  if (track.artists.some(a => {
    const genres = genreMap[a.id] || [];
    return genres.some(g => SOUTH_ASIAN_GENRE_KEYWORDS.some(kw => g.toLowerCase().includes(kw)));
  })) return true;
  const textsToCheck = [
    track.name,
    track.album.name,
    ...track.artists.map(a => a.name),
  ];
  if (textsToCheck.some(t => SOUTH_ASIAN_SCRIPT_RE.test(t))) return true;
  return false;
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } = process.env;

  if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET || !SPOTIFY_REFRESH_TOKEN) {
    res.status(500).json({ error: 'Spotify credentials not configured' });
    return;
  }

  const limit = parseInt(req.query.limit) || 6;
  // Fetch a larger pool so we still have enough tracks after filtering
  const fetchLimit = Math.min(limit * 8, 50);

  try {
    const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64'),
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: SPOTIFY_REFRESH_TOKEN,
      }),
    });

    if (!tokenResponse.ok) {
      const error = await tokenResponse.text();
      console.error('Failed to refresh access token:', error);
      res.status(500).json({ error: 'Failed to refresh access token' });
      return;
    }

    const { access_token } = await tokenResponse.json();

    const tracksResponse = await fetch(`https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=${fetchLimit}`, {
      headers: {
        'Authorization': `Bearer ${access_token}`,
      },
    });

    if (!tracksResponse.ok) {
      const error = await tracksResponse.text();
      console.error('Failed to fetch top tracks:', error);
      res.status(500).json({ error: 'Failed to fetch top tracks' });
      return;
    }

    const tracksData = await tracksResponse.json();
    const tracks = tracksData.items || [];

    // Collect unique artist IDs (Spotify artists endpoint accepts up to 50)
    const artistIds = [...new Set(tracks.flatMap(t => t.artists.map(a => a.id)))].slice(0, 50);

    const artistsResponse = await fetch(`https://api.spotify.com/v1/artists?ids=${artistIds.join(',')}`, {
      headers: { 'Authorization': `Bearer ${access_token}` },
    });

    const genreMap = {};
    if (artistsResponse.ok) {
      const artistsData = await artistsResponse.json();
      for (const artist of artistsData.artists || []) {
        genreMap[artist.id] = artist.genres || [];
      }
    }

    const filtered = tracks
      .filter(track => !isSouthAsianTrack(track, genreMap))
      .slice(0, limit);

    res.status(200).json({ ...tracksData, items: filtered });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
}
