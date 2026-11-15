const links = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/nikhil-bhimireddy-b688162b5/" },
  { label: "Instagram", href: "https://www.instagram.com/nikhil.bhimireddy/" },
];

export const HeaderContent = () => {
  return (
    <header className="flex flex-col items-center text-center motion-safe:animate-fade-up">
      <h1 className="text-[28px] font-medium leading-tight tracking-tight sm:text-3xl dark:text-zinc-50">
        Nikhil Bhimireddy
      </h1>
      <nav className="mt-2 flex items-center gap-x-1 text-sm text-zinc-500 dark:text-zinc-400">
        {links.map((link, i) => (
          <span key={link.label} className="flex items-center gap-x-1">
            {i > 0 && (
              <span aria-hidden className="text-zinc-300 dark:text-zinc-700">
                ·
              </span>
            )}
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2 py-2 underline decoration-zinc-300 underline-offset-4 transition-colors hover:text-zinc-950 dark:decoration-zinc-600 dark:hover:text-zinc-50"
            >
              {link.label}
            </a>
          </span>
        ))}
      </nav>
    </header>
  );
};
