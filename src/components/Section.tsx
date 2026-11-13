import type { ReactNode } from "react";

export type Item = {
  title: string;
  subtitle: string;
  href?: string;
};

const rowClass = "flex flex-col gap-1 px-4 py-4 sm:px-5";

const Row = ({ title, subtitle, href }: Item) => {
  const content = (
    <>
      <h3 className="text-[15px] font-medium leading-snug text-balance text-zinc-950 sm:text-base dark:text-zinc-100">
        {/* keep "@" on the same line as the name that follows it */}
        {title.replace(/@ /g, "@ ")}
      </h3>
      <p className="text-sm leading-relaxed text-pretty break-words text-zinc-500 dark:text-zinc-400">{subtitle}</p>
    </>
  );

  if (!href) return <div className={rowClass}>{content}</div>;

  const external = href.startsWith("http");
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`${rowClass} transition-colors hover:bg-zinc-100/70 active:bg-zinc-100 dark:hover:bg-zinc-800/40 dark:active:bg-zinc-800/60`}
    >
      {content}
    </a>
  );
};

export const Section = ({ title, items, children }: { title: string; items?: Item[]; children?: ReactNode }) => (
  <section>
    <h2 className="mb-4 text-center text-lg font-medium leading-7 text-zinc-950 dark:text-zinc-50">{title}</h2>
    <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white/50 divide-y divide-zinc-200 dark:border-zinc-800 dark:bg-zinc-900/50 dark:divide-zinc-800">
      {items?.map((item) => <Row key={item.title} {...item} />)}
      {children}
    </div>
  </section>
);
