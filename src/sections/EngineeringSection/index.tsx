import { Section, type Item } from "@/components/Section";

const projects: Item[] = [
  {
    title: "Kairos",
    subtitle: "ML software that optimizes organ transplant placement",
  },
  {
    title: "Adjustable fNIRS Neuroimaging Cap",
    subtitle: "A more inclusive and efficient neuroimaging alternative",
  },
  {
    title: "SCENT",
    subtitle: "Handheld breath analyzer for early disease screening",
  },
  {
    title: "MediMoji",
    subtitle: "Breaking down language and literacy barriers in healthcare",
  },
  {
    title: "Sheruta.space",
    subtitle: "Mental wellness platform for students in the Olentangy School District",
  },
  {
    title: "Timeley Tablet",
    subtitle: "Pill dispenser that optimizes medication schedules and prevents accidental overdoses",
  },
];

export const EngineeringSection = () => <Section title="Projects" items={projects} />;
