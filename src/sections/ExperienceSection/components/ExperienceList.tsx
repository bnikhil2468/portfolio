export const ExperienceList = () => {
  return (
    <div className="box-border caret-transparent gap-x-4 flex flex-col gap-y-4 mt-4">
      <div className="box-border caret-transparent border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors max-w-2xl bg-white/50 dark:bg-zinc-900/50">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4 flex-1">
            <div className="box-border caret-transparent flex items-center justify-center h-16 w-16 rounded-xl shrink-0 overflow-hidden border border-zinc-200 dark:border-zinc-700 shadow-sm hover:scale-110 transition-transform">
              <img src="/images/nch.png" alt="Nationwide Children's Hospital" className="h-full w-full object-cover" />
            </div>
            <div className="flex flex-col gap-1 flex-1">
              <h3 className="text-base font-medium box-border caret-transparent leading-6 dark:text-zinc-100">
                Nationwide Children's Hospital
              </h3>
              <p className="text-zinc-500 dark:text-zinc-400 box-border caret-transparent text-sm">
                Computational Neuroscience and Neuroimaging Researcher
              </p>
            </div>
          </div>
          <div className="text-zinc-500 dark:text-zinc-400 text-sm box-border caret-transparent text-right shrink-0">
            Dec 2023 – Dec 2025
          </div>
        </div>
      </div>

      <div className="box-border caret-transparent border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors max-w-2xl bg-white/50 dark:bg-zinc-900/50">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4 flex-1">
            <div className="box-border caret-transparent flex items-center justify-center h-16 w-16 rounded-xl shrink-0 overflow-hidden border border-zinc-200 dark:border-zinc-700 shadow-sm hover:scale-110 transition-transform">
              <img src="/images/columbia.png" alt="Columbia University Medical School" className="h-full w-full object-cover" />
            </div>
            <div className="flex flex-col gap-1 flex-1">
              <h3 className="text-base font-medium box-border caret-transparent leading-6 dark:text-zinc-100">
                Columbia University Medical School
              </h3>
              <p className="text-zinc-500 dark:text-zinc-400 box-border caret-transparent text-sm">
                Neurobiology and Public Health Researcher
              </p>
            </div>
          </div>
          <div className="text-zinc-500 dark:text-zinc-400 text-sm box-border caret-transparent text-right shrink-0">
            May 2023 – Jan 2025
          </div>
        </div>
      </div>

      <div className="box-border caret-transparent border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors max-w-2xl bg-white/50 dark:bg-zinc-900/50">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4 flex-1">
            <div className="box-border caret-transparent flex items-center justify-center h-16 w-16 rounded-xl shrink-0 overflow-hidden border border-zinc-200 dark:border-zinc-700 shadow-sm hover:scale-110 transition-transform">
              <img src="/images/simply-neuro.png" alt="Simply Neuroscience" className="h-full w-full object-cover" />
            </div>
            <div className="flex flex-col gap-1 flex-1">
              <h3 className="text-base font-medium box-border caret-transparent leading-6 dark:text-zinc-100">
                Simply Neuroscience
              </h3>
              <p className="text-zinc-500 dark:text-zinc-400 box-border caret-transparent text-sm">
                Medical Cartoonist
              </p>
            </div>
          </div>
          <div className="text-zinc-500 dark:text-zinc-400 text-sm box-border caret-transparent text-right shrink-0">
            Nov 2023 – Present
          </div>
        </div>
      </div>

      <div className="box-border caret-transparent border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors max-w-2xl bg-white/50 dark:bg-zinc-900/50">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4 flex-1">
            <div className="box-border caret-transparent flex items-center justify-center h-16 w-16 rounded-xl shrink-0 overflow-hidden border border-zinc-200 dark:border-zinc-700 shadow-sm hover:scale-110 transition-transform">
              <img src="/images/olsd.png" alt="Olentangy Local School District" className="h-full w-full object-cover" />
            </div>
            <div className="flex flex-col gap-1 flex-1">
              <h3 className="text-base font-medium box-border caret-transparent leading-6 dark:text-zinc-100">
                Olentangy Local School District
              </h3>
              <p className="text-zinc-500 dark:text-zinc-400 box-border caret-transparent text-sm">
                Student Body Representative
              </p>
            </div>
          </div>
          <div className="text-zinc-500 dark:text-zinc-400 text-sm box-border caret-transparent text-right shrink-0">
            Aug 2023 – May 2026
          </div>
        </div>
      </div>
    </div>
  );
};
