import { Section, type Item } from "@/components/Section";

const contacts: Item[] = [
  {
    title: "Email",
    subtitle: "nikhil_bhimireddy@brown.edu",
    copy: "nikhil_bhimireddy@brown.edu",
  },
  {
    title: "Book a call",
    subtitle: "cal.com/nikhil-bhimireddy",
    href: "https://cal.com/nikhil-bhimireddy",
  },
];

export const ConnectSection = () => <Section title="Connect" items={contacts} delay={320} />;
