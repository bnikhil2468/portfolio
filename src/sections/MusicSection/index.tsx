import { SpotifyTracks } from "@/sections/MusicSection/components/SpotifyTracks";

export const MusicSection = () => {
  return (
    <div className="box-border caret-transparent blur-0">
      <div className="mb-2">
        <div className="text-lg font-medium box-border caret-transparent leading-7">
          Music
        </div>
        <p className="text-zinc-500 box-border caret-transparent">
          I like all types of music. These are my top tracks right now.
        </p>
      </div>
      <SpotifyTracks />
    </div>
  );
};
