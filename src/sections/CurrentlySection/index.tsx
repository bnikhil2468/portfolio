import { Section, type Item } from "@/components/Section";

const current: Item[] = [
  {
    title: "CEO / Co-Founder @ Phonetic Labs (YC W27)",
    subtitle: "Biotechnology Research Company",
  },
  {
    title: "Electrical Engineering @ Brown (PLME)",
    subtitle: "On leave",
  },
];

export const CurrentlySection = () => <Section title="Currently" items={current} />;
