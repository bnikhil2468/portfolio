import { useState } from "react";
import { SpotifyTracks } from "@/sections/MusicSection/components/SpotifyTracks";

export const MusicSection = () => {
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const formatLastUpdated = (date: Date) => {
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    const displayHour = hours % 12 || 12;
    return `${month}/${day}, ${displayHour}:${minutes} ${ampm}`;
  };

  return (
    <div className="box-border caret-transparent blur-0">
      <div className="mb-2">
        <div className="flex items-center justify-between">
          <div className="text-lg font-medium box-border caret-transparent leading-7">
            Music
          </div>
          {lastUpdated && (
            <span className="text-zinc-500 dark:text-zinc-400 text-sm">
              Last at {formatLastUpdated(lastUpdated)}
            </span>
          )}
        </div>
        <p className="text-zinc-500 box-border caret-transparent">
          I like all types of music. These are my top tracks right now.
        </p>
      </div>
      <SpotifyTracks onLoaded={setLastUpdated} />
    </div>
  );
};
