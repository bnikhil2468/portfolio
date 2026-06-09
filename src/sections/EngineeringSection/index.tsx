import { ProjectGrid } from "@/sections/EngineeringSection/components/ProjectGrid";

export const EngineeringSection = () => {
  return (
    <div className="box-border caret-transparent blur-0 mt-2">
      <h2 className="text-lg font-medium box-border caret-transparent leading-7 dark:text-zinc-50">
        Projects
      </h2>
      <p className="text-zinc-500 dark:text-zinc-400 box-border caret-transparent mb-4">
        Building at the intersection of medicine and technology.
      </p>
      <ProjectGrid />
    </div>
  );
};
