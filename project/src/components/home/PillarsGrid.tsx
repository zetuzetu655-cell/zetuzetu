import { Heart, Users, Brain, Music, Handshake, Leaf, Shield } from 'lucide-react';

export const pillars = [
  {
    icon: Users,
    title: 'Youth Empowerment',
    description: 'Equipping young people with the tools, confidence, and networks to lead their own transformation.',
  },
  {
    icon: Brain,
    title: 'Self-Awareness',
    description: 'Guiding youth to understand their identity, worth, and potential beyond the streets.',
  },
  {
    icon: Music,
    title: 'Talent Nurturing',
    description: 'Channeling raw energy into music, sports, digital media, and creative arts skills.',
  },
  {
    icon: Handshake,
    title: 'Unity & Hope',
    description: 'Bridging divided neighborhoods through shared purpose and collective action.',
  },
  {
    icon: Leaf,
    title: 'Environmental Care',
    description: 'Leading sanitation drives and reclaiming public spaces for community pride.',
  },
  {
    icon: Shield,
    title: 'Anti-Crime & Advocacy',
    description: 'Proactive outreach, peer counseling, and advocacy for peace over conflict.',
  },
];

interface PillarsGridProps {
  onJoin: () => void;
}

export function PillarsGrid({ onJoin }: PillarsGridProps) {
  return (
    <section className="section-pad py-16 md:py-24">
      <div className="text-center mb-12">
        <span className="inline-block px-4 py-1.5 rounded-full bg-lime/10 text-lime text-xs font-semibold tracking-wider uppercase mb-4">
          What We Stand On
        </span>
        <h2 className="font-display font-bold text-white text-3xl md:text-4xl lg:text-5xl mb-4">
          Six Pillars of the <span className="gradient-text">New Breed</span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg">
          Every program, every session, and every interaction is rooted in these
          foundational commitments to the youth of Langas.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {pillars.map((pillar, idx) => (
          <div
            key={pillar.title}
            className="card-glow bg-ink-900 rounded-2xl p-6 group animate-slide-up"
            style={{ animationDelay: `${idx * 80}ms` }}
          >
            <div className="w-12 h-12 rounded-xl bg-lime/10 border border-lime/20 flex items-center justify-center mb-5 group-hover:bg-lime/20 group-hover:scale-110 transition-all">
              <pillar.icon className="w-6 h-6 text-lime" />
            </div>
            <h3 className="font-display font-bold text-white text-lg mb-2">
              {pillar.title}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {pillar.description}
            </p>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <button onClick={onJoin} className="btn-lime inline-flex items-center gap-2">
          <Heart className="w-5 h-5" fill="currentColor" />
          Join the Initiative
        </button>
      </div>
    </section>
  );
}
