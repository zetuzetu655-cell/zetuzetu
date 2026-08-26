import { useEffect, useState } from 'react';
import { MapPin, Clock, ArrowRight, Target, Sparkles } from 'lucide-react';
import type { Program } from '@/types';
import { useRouter } from '@/context/RouterContext';
import { GraffitiLogo } from '@/components/GraffitiLogo';

export function ProgramsPage() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const { navigate } = useRouter();

  useEffect(() => {
    fetch('/data/programs.json')
      .then((res) => res.json())
      .then((data: Program[]) => setPrograms(data))
      .catch(() => setPrograms([]));
  }, []);

  return (
    <div className="pt-24 md:pt-32 pb-10">
      {/* Header */}
      <section className="section-pad mb-12 text-center">
        <span className="inline-block px-4 py-1.5 rounded-full bg-lime/10 text-lime text-xs font-semibold tracking-wider uppercase mb-4">
          The Form Catalogue
        </span>
        <h1 className="font-display font-bold text-white text-3xl md:text-4xl lg:text-5xl mb-4">
          Active <span className="gradient-text">Programs</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg">
          Three tracks running now in Langas. Each one channels street energy into
          structure, purpose, and real skills.
        </p>
      </section>

      {/* Program cards */}
      <div className="section-pad space-y-6">
        {programs.map((program, idx) => (
          <article
            key={program.id}
            className="bg-ink-900 rounded-2xl border border-ink-600/50 overflow-hidden card-glow animate-slide-up"
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 p-4 border-b border-ink-700/40">
              <GraffitiLogo className="h-11 w-11 flex-shrink-0" />
              <div className="flex-1 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-lime/10 border border-lime/30 text-lime text-xs font-bold tracking-wider">
                  <Sparkles className="w-3 h-3" />
                  TRACK: {program.track.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Image */}
            <div className="relative w-full aspect-video overflow-hidden bg-ink-800">
              <img
                src={program.image}
                alt={program.title}
                loading="lazy"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent" />
            </div>

            {/* Content */}
            <div className="p-5 md:p-6">
              <h2 className="font-display font-bold text-white text-xl md:text-2xl mb-3">
                {program.title}
              </h2>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-5">
                {program.summary}
              </p>

              {/* Meta info */}
              <div className="flex flex-wrap gap-4 mb-5">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Target className="w-4 h-4 text-sky" />
                  <span>
                    Target Audience: <span className="text-gray-300">{program.targetAudience}</span>
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock className="w-4 h-4 text-lime" />
                  <span className="text-gray-300">{program.schedule}</span>
                </div>
              </div>

              {/* Action button */}
              <button
                onClick={() => navigate('volunteer')}
                className="btn-lime inline-flex items-center gap-2"
              >
                {program.actionLabel}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Bottom callout */}
      <section className="section-pad mt-16">
        <div className="relative rounded-3xl p-[2px] bg-gradient-to-r from-sky via-lime to-sky">
          <div className="rounded-3xl bg-ink-950 p-8 md:p-12 text-center">
            <MapPin className="w-10 h-10 text-lime mx-auto mb-4" />
            <h3 className="font-display font-bold text-white text-xl md:text-2xl mb-3">
              Want to bring a workshop or tournament to your zone?
            </h3>
            <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto mb-6">
              We mobilize teams, equipment, and mentors to activate neighborhoods across
              Eldoret. Tell us where you are and what you need.
            </p>
            <button
              onClick={() => navigate('contacts')}
              className="bg-lime text-ink-950 font-bold px-8 py-3.5 rounded-full hover:bg-lime-glow hover:scale-105 transition-all inline-flex items-center gap-2"
            >
              Request an Activation
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
