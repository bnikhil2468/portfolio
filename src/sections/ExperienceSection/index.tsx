import { Section, type Item } from "@/components/Section";

const experiences: Item[] = [
  {
    title: "Columbia University Medical School",
    subtitle: "Neurobiology and Public Health Researcher",
  },
  {
    title: "OSU Medical Center / NCH",
    subtitle: "Computational Neuroscience and Neuroimaging Researcher",
  },
  {
    title: "Columbus VA Hospital",
    subtitle: "Urgent Care Assistant",
  },
  {
    title: "Simply Neuroscience / BMC",
    subtitle: "Medical Cartoonist",
  },
];

export const ExperienceSection = () => <Section title="Recently" items={experiences} />;
