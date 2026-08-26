import { Heart } from 'lucide-react';

interface EngagementFloorProps {
  onDonate: () => void;
}

export function EngagementFloor({ onDonate }: EngagementFloorProps) {
  return (
    <section className="section-pad py-16 md:py-24">
      <div className="relative rounded-3xl bg-gradient-to-r from-ink-900 via-ink-800 to-ink-900 border border-ink-600/40 p-8 md:p-14 overflow-hidden">
        {/* Glow accents */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-lime/10 rounded-full blur-[80px]" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-sky/10 rounded-full blur-[80px]" />

        <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="text-center lg:text-left max-w-2xl">
            <h2 className="font-display font-bold text-white text-2xl md:text-3xl lg:text-4xl leading-tight">
              Be part of the transformation in{' '}
              <span className="gradient-text">Eldoret.</span>
            </h2>
            <p className="mt-3 text-gray-400 text-sm md:text-base">
              Your support fuels mentorship, studio sessions, safehouse operations,
              and community clean-ups. Every contribution goes straight to the streets.
            </p>
          </div>
          <button
            onClick={onDonate}
            className="flex-shrink-0 bg-lime text-ink-950 font-bold text-base md:text-lg px-8 py-4 rounded-full animate-pulse-glow hover:scale-105 transition-transform flex items-center gap-2"
          >
            <Heart className="w-5 h-5" fill="currentColor" />
            Support Our Work
          </button>
        </div>
      </div>
    </section>
  );
}
