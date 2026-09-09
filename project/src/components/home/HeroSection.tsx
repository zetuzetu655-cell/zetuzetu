import { ArrowRight, Users } from 'lucide-react';
import { useRouter } from '@/context/RouterContext';
import { useSettings } from '@/context/SettingsContext';

interface HeroSectionProps {
  onJoin: () => void;
}

export function HeroSection({ onJoin }: HeroSectionProps) {
  const { navigate } = useRouter();
  const { settings } = useSettings();

  return (
    <section className="relative pt-24 md:pt-32 pb-16 md:pb-20 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid opacity-50" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-lime/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sky/10 rounded-full blur-[120px]" />

      <div className="section-pad relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left column */}
          <div className="text-center lg:text-left animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-ink-800/60 border border-ink-600/50 mb-6">
              <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
              <span className="text-xs font-medium text-gray-300 tracking-wide">
                {settings.location}
              </span>
            </div>

            <h1 className="font-display font-bold text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl uppercase leading-[1.05] tracking-tight">
              We Are the
              <br />
              <span className="gradient-text">New Breed</span>
            </h1>

            <p className="mt-6 text-gray-400 text-base md:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
              A grassroots youth initiative born in Langas, Eldoret. We redirect street
              energy into music, mentorship, leadership, and community action —
              choosing purpose over crime, unity over division.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <button
                onClick={() => navigate('programs')}
                className="btn-lime inline-flex items-center justify-center gap-2"
              >
                Explore Our Forms
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={onJoin}
                className="btn-outline-sky inline-flex items-center justify-center gap-2"
              >
                <Users className="w-5 h-5" />
                Join the Group
              </button>
            </div>
          </div>

          {/* Right column - image container */}
          <div className="relative animate-scale-in">
            <div className="relative rounded-3xl overflow-hidden border-2 border-ink-600/40 shadow-[0_0_60px_-12px_rgba(34,197,94,0.3)] group">
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/60 via-transparent to-transparent z-10" />
              {settings.heroImageUrl ? (
                <img
                  src={settings.heroImageUrl}
                  alt="Zetu Zetu Form youth in action"
                  className="w-full h-[320px] sm:h-[400px] lg:h-[480px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
              ) : (
                <img
                  src="https://images.pexels.com/photos/12896306/pexels-photo-12896306.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                  alt="Youth in action at Zetu Zetu Form"
                  className="w-full h-[320px] sm:h-[400px] lg:h-[480px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
              )}
              {/* Floating badge */}
              <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 px-3 py-2 rounded-full bg-ink-950/80 backdrop-blur-sm border border-lime/30">
                <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
                <span className="text-xs text-white font-medium">Live from Langas</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
