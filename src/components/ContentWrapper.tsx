import { Header } from "@/sections/Header";
import { ExperienceSection } from "@/sections/ExperienceSection";
import { EngineeringSection } from "@/sections/EngineeringSection";
import { MusicSection } from "@/sections/MusicSection";
export const ContentWrapper = () => {
  return (
    <div className="box-border caret-transparent gap-x-10 flex flex-col justify-start max-w-lg gap-y-10 w-full pt-8 md:max-w-4xl md:pt-24">
      <Header />
      <ExperienceSection />
      <EngineeringSection />
      <MusicSection />
    </div>
  );
};
