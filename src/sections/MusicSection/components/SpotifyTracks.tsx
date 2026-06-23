import { useEffect, useState } from "react";
import { fetchTopTracks, SpotifyTrack } from "@/services/spotify";

interface SpotifyTracksProps {
  onLoaded?: (date: Date) => void;
}

export const SpotifyTracks = ({ onLoaded }: SpotifyTracksProps) => {
  const [tracks, setTracks] = useState<SpotifyTrack[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTracks = async () => {
      setLoading(true);
      const data = await fetchTopTracks(6);
      setTracks(data);
      setLoading(false);
      onLoaded?.(new Date());
    };
    loadTracks();
  }, []);

  if (loading) {
    return (
      <div className="box-border caret-transparent gap-x-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-y-6 mt-4">
        <div className="text-zinc-500 text-sm col-span-full">Loading top tracks...</div>
      </div>
    );
  }

  if (tracks.length === 0) {
    return (
      <div className="box-border caret-transparent gap-x-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-y-6 mt-4">
        <div className="text-zinc-500 text-sm col-span-full">No top tracks available</div>
      </div>
    );
  }

  return (
    <div className="box-border caret-transparent gap-x-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-y-6 mt-4">
      {tracks.map((track) => (
        <div key={track.id} className="box-border caret-transparent blur-0">
          <a
            href={track.external_urls.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="relative bg-transparent box-border caret-transparent flex flex-col gap-y-2 w-full transition-transform hover:scale-105"
          >
            <div className="relative aspect-square box-border caret-transparent block w-full overflow-hidden rounded-lg">
              <img
                alt={track.album.name}
                src={track.album.images[0]?.url || track.album.images[1]?.url || ''}
                className="absolute text-transparent box-border h-full max-w-full object-cover w-full rounded-lg inset-0"
              />
            </div>
            <div className="box-border caret-transparent flex flex-col gap-y-1">
              <div className="text-zinc-950 dark:text-zinc-50 text-sm font-medium box-border caret-transparent block leading-5 line-clamp-2">
                {track.name}
              </div>
              <div className="text-zinc-600 dark:text-zinc-400 text-sm box-border caret-transparent flow-root leading-5 text-ellipsis overflow-hidden line-clamp-1">
                {track.artists.map((artist, index) => (
                  <span key={index}>
                    {index > 0 && ', '}
                    {artist.name}
                  </span>
                ))}
              </div>
            </div>
          </a>
        </div>
      ))}
    </div>
  );
};

