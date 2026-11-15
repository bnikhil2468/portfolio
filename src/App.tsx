import { Container } from "@/components/Container";
import { GridBackground } from "@/components/GridBackground";

export const App = () => {
  return (
    <div className="min-h-screen text-base leading-6 text-zinc-950 antialiased font-suisseintl dark:text-zinc-50">
      <GridBackground />
      <Container />
    </div>
  );
};
