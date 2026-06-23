const illustrations = [
  { src: "/images/medical-illustrations/alzheimers.png", alt: "Alzheimer's Disease" },
  { src: "/images/medical-illustrations/depression.png", alt: "Depression" },
  { src: "/images/medical-illustrations/vertigo.png", alt: "Vertigo" },
  { src: "/images/medical-illustrations/sleep-walking.png", alt: "Sleep Walking" },
  { src: "/images/medical-illustrations/illustration-2.avif", alt: "Medical Illustration" },
  { src: "/images/medical-illustrations/chinese-simplified.png", alt: "Medical Comic (Chinese)" },
  { src: "/images/medical-illustrations/spanish.png", alt: "Medical Comic (Spanish)" },
  { src: "/images/medical-illustrations/swahili.png", alt: "Medical Comic (Swahili)" },
];

export const IllustrationsSection = () => {
  return (
    <div className="box-border caret-transparent blur-0">
      <h2 className="text-lg font-medium box-border caret-transparent leading-7 dark:text-zinc-50">
        Medical Illustrations
      </h2>
      <p className="text-zinc-500 dark:text-zinc-400 box-border caret-transparent mb-4">
        A few of my medical illustrations, created in collaboration with hospitals and patients at the VA, aimed at breaking down complex healthcare concepts and procedures to improve patient understanding in medicine.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {illustrations.map((ill) => (
          <div key={ill.src} className="overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-800">
            <img
              src={ill.src}
              alt={ill.alt}
              className="w-full h-full object-contain aspect-square transition-transform duration-300 hover:scale-105"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
