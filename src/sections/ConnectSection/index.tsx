import { Section, type Item } from "@/components/Section";

const contacts: Item[] = [
  {
    title: "Email",
    subtitle: "nikhil_bhimireddy@brown.edu",
    href: "mailto:nikhil_bhimireddy@brown.edu",
  },
  {
    title: "Book a call",
    subtitle: "cal.com/nikhil-bhimireddy",
    href: "https://cal.com/nikhil-bhimireddy",
  },
];

export const ConnectSection = () => <Section title="Connect" items={contacts} />;
