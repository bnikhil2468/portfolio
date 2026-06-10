const ProjectCard = ({
  href,
  image,
  title,
  description,
  className = "",
}: {
  href: string;
  image: string;
  title: string;
  description: string;
  className?: string;
}) => (
  <div className={`box-border caret-transparent blur-0 ${className}`}>
    <div className="box-border caret-transparent flex flex-col">
      <div className="box-border caret-transparent flex flex-col">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="aspect-video box-border caret-transparent block overflow-hidden mb-3 rounded-lg bg-zinc-200 dark:bg-zinc-800 cursor-pointer group"
        >
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </a>
        <div className="relative font-medium items-baseline box-border caret-transparent flex justify-between mb-1">
          <div className="relative box-border caret-transparent block">{title}</div>
        </div>
      </div>
      <div className="text-zinc-500 box-border caret-transparent leading-[19.2px] max-w-[687.441px]">
        <p className="box-border caret-transparent">{description}</p>
      </div>
    </div>
  </div>
);

export const ProjectGrid = () => {
  return (
    <div className="box-border caret-transparent gap-x-6 grid grid-cols-[repeat(1,minmax(0px,1fr))] gap-y-6 md:grid-cols-[repeat(2,minmax(0px,1fr))]">
      <ProjectCard
        href="https://www.aol.com/articles/meet-olentangy-orange-senior-developed-100218000.html"
        image="/images/projects/fnirs.png"
        title="Adjustable fNIRS Neuroimaging Cap"
        description="Patented neuroimaging cap designed for darker skin tones and textured hair. Reduced unit cost from $500+ to $10 and setup time from 30 min to 30 sec."
      />
      <ProjectCard
        href="#"
        image="/images/projects/scent.png"
        title="SCENT"
        description="Handheld breath analyzer using gas sensors and ML to detect VOC biomarker patterns for early-stage disease screening. 1st Place, Open Track at OSU Make OHI/O (Mar 2026)."
      />
      <ProjectCard
        href="https://github.com/bnikhil2468/medimoji-2"
        image="/images/projects/medimoji.png"
        title="MediMoji"
        description="Platform reducing healthcare language and literacy barriers through live translation, interactive 3D pain mapping, and AI-powered patient support. Most Technical Project at OSU Hack OHI/O (Oct 2025)."
      />
      <ProjectCard
        href="https://www.patientsafetytech.com/past-competitions/make-ohio"
        image="/images/projects/tablet.png"
        title="Timeley Tablet"
        description="IoT-enabled smart pill dispenser with automated scheduling and alerts engineered to prevent accidental overdoses. Best Consumer-Driven Patient Safety Award at OSU Make OHI/O (Mar 2025)."
      />
      <ProjectCard
        href="https://github.com/Shubham-Gupta-coder/sheruta"
        image="/images/projects/sheruta.png"
        title="Sheruta.space"
        description="First integrated mental wellness platform for the Olentangy School District — AI-powered emotional support, journaling, mood tracking, and direct counselor access. 20,000+ users in pilot testing."
        className="md:col-span-2 md:max-w-[calc(50%-0.75rem)] md:mx-auto"
      />
    </div>
  );
};
