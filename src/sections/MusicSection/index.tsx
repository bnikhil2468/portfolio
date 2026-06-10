import { useState } from "react";
import { SpotifyTracks } from "@/sections/MusicSection/components/SpotifyTracks";

export const MusicSection = () => {
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const formatLastUpdated = (date: Date | null): string => {
    if (!date) return "Never";

    const datePart = date.toLocaleDateString(undefined, {
      month: "2-digit",
      day: "2-digit",
    });

    const timePart = date.toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "2-digit",
    });

    return `${datePart}, ${timePart}`;
  };

  return (
    <div className="box-border caret-transparent blur-0">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2 gap-2">
        <div>
          <div className="text-lg font-medium box-border caret-transparent leading-7">
            Music
          </div>
          <p className="text-zinc-500 box-border caret-transparent">
            I like all types of music. These are my recents.
          </p>
        </div>
        <div className="text-zinc-400 text-sm whitespace-nowrap">
          <span className="text-xs sm:text-sm">Last at  {formatLastUpdated(lastUpdated)}</span>
        </div>
      </div>
      <SpotifyTracks onTracksLoaded={setLastUpdated} />
    </div>
  );
};
