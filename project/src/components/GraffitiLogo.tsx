import { Sprout } from 'lucide-react';

interface GraffitiLogoProps {
  className?: string;
}

export function GraffitiLogo({ className = 'h-10 w-10' }: GraffitiLogoProps) {
  return (
    <div
      className={`${className} rounded-lg bg-ink-950 border border-ink-600/50 flex items-center justify-center relative overflow-hidden group`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-lime/20 via-transparent to-sky/20 opacity-60 group-hover:opacity-100 transition-opacity" />
      <div className="absolute -top-1 -left-1 w-4 h-4 bg-lime/40 rounded-full blur-sm" />
      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-sky/40 rounded-full blur-sm" />
      <Sprout className="w-1/2 h-1/2 text-lime relative z-10" strokeWidth={2.5} />
    </div>
  );
}
