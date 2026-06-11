// Vercel serverless function for Spotify API
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

  const limit = req.query.limit || '6';

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

    const tracksResponse = await fetch(`https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=${limit}`, {
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
    res.status(200).json(tracksData);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
}
