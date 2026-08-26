import { useEffect, useState } from 'react';
import { Menu, X, Heart, Rss } from 'lucide-react';
import { useRouter } from '@/context/RouterContext';
import { useSettings } from '@/context/SettingsContext';
import type { PageKey } from '@/types';
import { GraffitiLogo } from '@/components/GraffitiLogo';

interface NavbarProps {
  onDonate: () => void;
}

interface NavLink {
  key: PageKey;
  label: string;
}

const pageLinks: NavLink[] = [
  { key: 'home', label: 'Home' },
  { key: 'programs', label: 'Programs' },
  { key: 'impact', label: 'Our Impact' },
  { key: 'media', label: 'Media' },
  { key: 'store', label: 'Store' },
  { key: 'volunteer', label: 'Volunteer' },
  { key: 'contacts', label: 'Contacts' },
];

export function Navbar({ onDonate }: NavbarProps) {
  const { page, navigate, navigateToFeed } = useRouter();
  const { settings } = useSettings();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const handleNav = (key: PageKey) => {
    navigate(key);
    setMobileOpen(false);
  };

  const handleNewsFeed = () => {
    navigateToFeed();
    setMobileOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-ink-950/95 backdrop-blur-md border-b border-ink-700/50 shadow-lg shadow-black/30'
            : 'bg-transparent'
        }`}
      >
        <div className="section-pad flex items-center justify-between h-16 md:h-20">
          {/* Logo + branding text — always visible on all screen sizes */}
          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-2 sm:gap-3 group flex-shrink-0"
          >
            {settings.logoUrl ? (
              <img
                src={settings.logoUrl}
                alt={settings.siteName}
                className="h-9 w-9 md:h-12 md:w-12 rounded-lg object-cover flex-shrink-0"
              />
            ) : (
              <GraffitiLogo className="h-9 w-9 md:h-12 md:w-12 transition-transform group-hover:scale-110 flex-shrink-0" />
            )}
            <div className="text-left">
              <div className="font-display font-bold text-xs sm:text-sm md:text-base leading-tight whitespace-nowrap gradient-text">
                ZETUZETUFORM
              </div>
              <div className="text-lime text-[9px] sm:text-[10px] md:text-xs font-medium tracking-wider whitespace-nowrap">
                #NISISI
              </div>
            </div>
          </button>

          {/* Center links */}
          <div className="hidden lg:flex items-center gap-1">
            {pageLinks.slice(0, 4).map((link) => (
              <button
                key={link.key}
                onClick={() => handleNav(link.key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  page === link.key
                    ? 'text-lime bg-lime/10'
                    : 'text-gray-400 hover:text-white hover:bg-ink-700/50'
                }`}
              >
                {link.label}
              </button>
            ))}
            {/* Store link */}
            <button
              onClick={() => handleNav('store')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                page === 'store'
                  ? 'text-lime bg-lime/10'
                  : 'text-gray-400 hover:text-white hover:bg-ink-700/50'
              }`}
            >
              Store
            </button>
            {/* News Feed anchor link */}
            <button
              onClick={handleNewsFeed}
              className="px-4 py-2 rounded-full text-sm font-medium text-gray-400 hover:text-lime hover:bg-ink-700/50 transition-all duration-300 flex items-center gap-1.5"
            >
              <Rss className="w-3.5 h-3.5" />
              News Feed
            </button>
            {pageLinks.slice(5).map((link) => (
              <button
                key={link.key}
                onClick={() => handleNav(link.key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  page === link.key
                    ? 'text-lime bg-lime/10'
                    : 'text-gray-400 hover:text-white hover:bg-ink-700/50'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right CTA + mobile toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onDonate}
              className="hidden sm:flex items-center gap-2 bg-lime text-ink-950 font-bold text-sm px-4 sm:px-5 py-2.5 rounded-full animate-pulse-glow hover:scale-105 transition-transform"
            >
              <Heart className="w-4 h-4" fill="currentColor" />
              Donate Now
            </button>
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 text-white hover:text-lime transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div
            className="absolute inset-0 bg-ink-950/80 backdrop-blur-sm animate-fade-in"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-72 max-w-[80vw] bg-ink-900 border-l border-ink-700/50 animate-slide-in-right overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-ink-700/50">
              <div className="flex items-center gap-3">
                <GraffitiLogo className="h-10 w-10" />
                <div>
                  <div className="font-display font-bold text-sm gradient-text">ZETUZETUFORM</div>
                  <div className="text-lime text-[10px] font-medium tracking-wider">#NISISI</div>
                </div>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 text-gray-400 hover:text-lime transition-colors"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex flex-col gap-1 p-4">
              {pageLinks.slice(0, 4).map((link) => (
                <button
                  key={link.key}
                  onClick={() => handleNav(link.key)}
                  className={`px-4 py-3 rounded-xl text-left text-base font-medium transition-all duration-300 ${
                    page === link.key
                      ? 'text-lime bg-lime/10 border border-lime/30'
                      : 'text-gray-400 hover:text-white hover:bg-ink-700/50'
                  }`}
                >
                  {link.label}
                </button>
              ))}
              {/* Store in mobile drawer */}
              <button
                onClick={() => handleNav('store')}
                className={`px-4 py-3 rounded-xl text-left text-base font-medium transition-all duration-300 ${
                  page === 'store'
                    ? 'text-lime bg-lime/10 border border-lime/30'
                    : 'text-gray-400 hover:text-white hover:bg-ink-700/50'
                }`}
              >
                Store
              </button>
              {/* News Feed in mobile drawer */}
              <button
                onClick={handleNewsFeed}
                className="px-4 py-3 rounded-xl text-left text-base font-medium text-gray-400 hover:text-lime hover:bg-ink-700/50 transition-all duration-300 flex items-center gap-2"
              >
                <Rss className="w-4 h-4" />
                News Feed
              </button>
              {pageLinks.slice(5).map((link) => (
                <button
                  key={link.key}
                  onClick={() => handleNav(link.key)}
                  className={`px-4 py-3 rounded-xl text-left text-base font-medium transition-all duration-300 ${
                    page === link.key
                      ? 'text-lime bg-lime/10 border border-lime/30'
                      : 'text-gray-400 hover:text-white hover:bg-ink-700/50'
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => {
                  setMobileOpen(false);
                  onDonate();
                }}
                className="mt-3 flex items-center justify-center gap-2 bg-lime text-ink-950 font-bold px-5 py-3 rounded-full animate-pulse-glow"
              >
                <Heart className="w-4 h-4" fill="currentColor" />
                Donate Now
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
