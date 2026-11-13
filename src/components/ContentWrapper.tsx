import { Header } from "@/sections/Header";
import { CurrentlySection } from "@/sections/CurrentlySection";
import { ExperienceSection } from "@/sections/ExperienceSection";
import { EngineeringSection } from "@/sections/EngineeringSection";
import { ConnectSection } from "@/sections/ConnectSection";

export const ContentWrapper = () => {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-y-12 pt-14 pb-16 sm:gap-y-14 sm:pt-20 sm:pb-24 md:pt-24">
      <Header />
      <CurrentlySection />
      <ExperienceSection />
      <EngineeringSection />
      <ConnectSection />
    </div>
  );
};
