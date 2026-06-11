export interface SpotifyTrack {
  id: string;
  name: string;
  artists: Array<{ name: string }>;
  album: {
    name: string;
    images: Array<{ url: string }>;
  };
  external_urls: {
    spotify: string;
  };
}

export interface SpotifyTopTracksResponse {
  items: SpotifyTrack[];
}

export const fetchTopTracks = async (limit: number = 6): Promise<SpotifyTrack[]> => {
  try {
    const response = await fetch(`/api/spotify/top-tracks?limit=${limit}`);
    if (!response.ok) {
      throw new Error('Failed to fetch top tracks');
    }
    const data: SpotifyTopTracksResponse = await response.json();
    return data.items;
  } catch (error) {
    console.error('Error fetching Spotify top tracks:', error);
    return [];
  }
};

