import { Sparkles } from 'lucide-react';
import { fetchMilestones } from '@/lib/content';

export function ImpactPage() {
  const milestones = fetchMilestones();

  return (
    <div className="pt-24 md:pt-32 pb-10">
      {/* Header */}
      <section className="section-pad mb-12 text-center">
        <span className="inline-block px-4 py-1.5 rounded-full bg-sky/10 text-sky text-xs font-semibold tracking-wider uppercase mb-4">
          The Community Victory Wall
        </span>
        <h1 className="font-display font-bold text-white text-3xl md:text-4xl lg:text-5xl mb-4">
          Our <span className="gradient-text">Impact</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg">
          Real stories from the ground. Every number represents a life redirected,
          a neighborhood reclaimed, a future rewritten.
        </p>
      </section>

      {/* Milestone cards */}
      <div className="section-pad space-y-8">
        {milestones.map((milestone, idx) => (
          <article
            key={milestone.id}
            className="bg-ink-900 rounded-2xl border border-ink-600/50 overflow-hidden card-glow animate-slide-up"
            style={{ animationDelay: `${idx * 80}ms` }}
          >
            {/* Full-width image */}
            <div className="relative w-full aspect-[21/9] sm:aspect-[16/7] overflow-hidden bg-ink-800">
              <img
                src={milestone.image}
                alt={milestone.headline}
                loading="lazy"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent" />
              {/* Tag overlay */}
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-ink-950/80 backdrop-blur-sm border border-lime/30 text-lime text-xs font-bold tracking-wider uppercase">
                  <Sparkles className="w-3 h-3" />
                  {milestone.tag}
                </span>
              </div>
              {/* Headline overlay on image */}
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8">
                <h2 className="font-display font-bold text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl uppercase tracking-tight leading-tight">
                  {milestone.headline}
                </h2>
              </div>
            </div>

            {/* Summary */}
            <div className="p-5 md:p-8">
              <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-3xl">
                {milestone.summary}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
