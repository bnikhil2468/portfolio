export const StatusList = () => {
  return (
    <div className="box-border caret-transparent gap-x-2 flex flex-col gap-y-2 mt-0.5">
      <div className="items-start box-border caret-transparent gap-x-2 flex blur-0 gap-y-2">
        <span className="relative box-border caret-transparent flex h-2 w-2 mt-2">
          <span className="absolute bg-emerald-400 box-border caret-transparent flex h-full opacity-75 w-full rounded-full"></span>
          <span className="relative bg-emerald-400 box-border caret-transparent flex h-2 w-2 rounded-full"></span>
        </span>
        <p className="box-border caret-transparent">
          Incoming PLME student at{" "}
          <a
            href="https://plme.med.brown.edu/"
            className="box-border caret-transparent decoration-emerald-400 underline"
          >
            Brown University (PLME)
          </a>
          , Fall 2026.
        </p>
      </div>
      <div className="items-start box-border caret-transparent gap-x-2 flex blur-0 gap-y-2">
        <span className="relative box-border caret-transparent flex h-2 w-2 mt-2">
          <span className="absolute bg-sky-400 box-border caret-transparent flex h-full opacity-75 w-full rounded-full"></span>
          <span className="relative bg-sky-400 box-border caret-transparent flex h-2 w-2 rounded-full"></span>
        </span>
        <p className="box-border caret-transparent">
          Creating medical illustrations at{" "}
          <a
            href="https://www.simplyneuroscience.org/"
            className="box-border caret-transparent decoration-sky-400 underline"
          >
            Simply Neuroscience
          </a>
          .
        </p>
      </div>
      <div className="items-start box-border caret-transparent gap-x-2 flex blur-0 gap-y-2">
        <span className="relative box-border caret-transparent flex h-2 w-2 mt-2">
          <span className="absolute bg-violet-400 box-border caret-transparent flex h-full opacity-75 w-full rounded-full"></span>
          <span className="relative bg-violet-400 box-border caret-transparent flex h-2 w-2 rounded-full"></span>
        </span>
        <p className="box-border caret-transparent">
          Advocating for student equity at SELAC.
        </p>
      </div>
    </div>
  );
};
