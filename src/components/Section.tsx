import { useRef, useState } from "react";

export type Item = {
  title: string;
  subtitle: string;
  href?: string;
  /** Text to copy to the clipboard when the row is clicked. */
  copy?: string;
};

const rowBase =
  "group/row relative flex w-full items-start justify-between gap-4 px-4 py-4 text-left sm:px-5 outline-none";
// Only clickable rows (Connect) get the hover shade, pointer, and press state.
const rowInteractive =
  "cursor-pointer transition-colors duration-150 hover:bg-zinc-100/80 focus-visible:bg-zinc-100 active:bg-zinc-100 dark:hover:bg-white/[0.04] dark:focus-visible:bg-white/[0.06] dark:active:bg-white/[0.07]";

// Small hint on the right of clickable rows; always visible on touch screens, on hover elsewhere.
const Hint = ({ children }: { children: string }) => (
  <span
    aria-hidden
    className="mt-0.5 shrink-0 text-xs text-zinc-400 transition-all duration-200 sm:translate-x-[-4px] sm:opacity-0 sm:group-hover/row:translate-x-0 sm:group-hover/row:opacity-100 sm:group-focus-visible/row:opacity-100 dark:text-zinc-500"
  >
    {children}
  </span>
);

const Text = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <span className="flex min-w-0 flex-col gap-1">
    <span className="text-[15px] font-medium leading-snug text-balance text-zinc-950 sm:text-base dark:text-zinc-100">
      {/* keep "@" on the same line as the name that follows it */}
      {title.replace(/@ /g, "@ ")}
    </span>
    <span className="text-sm leading-relaxed text-pretty break-words text-zinc-500 dark:text-zinc-400">
      {subtitle}
    </span>
  </span>
);

// Older copy method for browsers (and in-app webviews) that block navigator.clipboard.
const legacyCopy = (text: string) => {
  const el = document.createElement("textarea");
  el.value = text;
  el.setAttribute("readonly", "");
  el.style.position = "fixed";
  el.style.opacity = "0";
  document.body.appendChild(el);
  el.select();
  const ok = document.execCommand("copy");
  el.remove();
  return ok;
};

const CopyRow = ({ title, subtitle, copy }: Item & { copy: string }) => {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number>();

  const onClick = async () => {
    let ok = false;
    try {
      await navigator.clipboard.writeText(copy);
      ok = true;
    } catch {
      ok = legacyCopy(copy);
    }
    if (!ok) {
      window.location.href = `mailto:${copy}`;
      return;
    }
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <button type="button" onClick={onClick} className={`${rowBase} ${rowInteractive}`}>
      <Text title={title} subtitle={copied ? "Copied to clipboard" : subtitle} />
      <Hint>{copied ? "✓" : "Copy"}</Hint>
      <span className="sr-only" aria-live="polite">
        {copied ? "Email copied to clipboard" : ""}
      </span>
    </button>
  );
};

const Row = (item: Item) => {
  if (item.copy) return <CopyRow {...item} copy={item.copy} />;

  if (!item.href) {
    return (
      <div className={rowBase}>
        <Text {...item} />
      </div>
    );
  }

  const external = item.href.startsWith("http");
  return (
    <a
      href={item.href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`${rowBase} ${rowInteractive}`}
    >
      <Text {...item} />
      <Hint>↗</Hint>
    </a>
  );
};

export const Section = ({ title, items, delay = 0 }: { title: string; items: Item[]; delay?: number }) => (
  <section className="motion-safe:animate-fade-up" style={{ animationDelay: `${delay}ms` }}>
    <h2 className="mb-4 text-center text-lg font-medium leading-7 text-zinc-950 dark:text-zinc-50">{title}</h2>
    <div className="overflow-hidden rounded-md border border-zinc-200 bg-white/50 divide-y divide-zinc-200 dark:border-zinc-800 dark:bg-zinc-900/50 dark:divide-zinc-800">
      {items.map((item) => (
        <Row key={item.title} {...item} />
      ))}
    </div>
  </section>
);
