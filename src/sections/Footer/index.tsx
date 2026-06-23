import { useState, useEffect } from "react";

export const Footer = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const hours = time.getHours() % 12;
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const hourAngle = (hours + minutes / 60) * 30;
  const minuteAngle = minutes * 6;
  const secondAngle = seconds * 6;

  const hourX = 12 + 4 * Math.sin((hourAngle * Math.PI) / 180);
  const hourY = 12 - 4 * Math.cos((hourAngle * Math.PI) / 180);
  const minX = 12 + 6 * Math.sin((minuteAngle * Math.PI) / 180);
  const minY = 12 - 6 * Math.cos((minuteAngle * Math.PI) / 180);
  const secX = 12 + 7 * Math.sin((secondAngle * Math.PI) / 180);
  const secY = 12 - 7 * Math.cos((secondAngle * Math.PI) / 180);

  return (
    <footer className="w-full mt-24">
      <div className="flex items-center justify-between mx-auto max-w-lg md:max-w-4xl px-4 py-4">
        <p className="text-sm text-zinc-400">
          Carpe diem.
        </p>
        <div className="flex items-center gap-2 text-sm text-zinc-400">
          <span>{time.getFullYear()}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
            <line x1="12" y1="12" x2={hourX} y2={hourY} strokeWidth="2" />
            <line x1="12" y1="12" x2={minX} y2={minY} strokeWidth="1.5" />
            <line x1="12" y1="12" x2={secX} y2={secY} strokeWidth="0.75" stroke="currentColor" opacity="0.6" />
          </svg>
        </div>
      </div>
    </footer>
  );
};
