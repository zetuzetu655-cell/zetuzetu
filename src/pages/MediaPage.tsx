import { useEffect, useState } from 'react';
import { Play, Image as ImageIcon, Clock, Instagram, Youtube, Facebook, Twitter, MessageCircle } from 'lucide-react';
import type { MediaItem } from '@/types';
import { useSettings } from '@/context/SettingsContext';
import { TikTokIcon } from '@/components/icons/TikTokIcon';

export function MediaPage() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [filter, setFilter] = useState<'all' | 'video' | 'photo'>('all');
  const { settings } = useSettings();

  useEffect(() => {
    fetch('/data/media.json')
      .then((res) => res.json())
      .then((data: MediaItem[]) => setItems(data))
      .catch(() => setItems([]));
  }, []);

  const filtered = filter === 'all' ? items : items.filter((item) => item.type === filter);

  const headerSocials = [
    { url: settings.social.facebook, icon: Facebook, label: 'Facebook' },
    { url: settings.social.twitter, icon: Twitter, label: 'Twitter' },
    { url: settings.social.whatsapp, icon: MessageCircle, label: 'WhatsApp' },
    { url: settings.social.tiktok, icon: TikTokIcon, label: 'TikTok' },
  ];

  return (
    <div className="pt-24 md:pt-32 pb-10">
      {/* Header */}
      <section className="section-pad mb-10 text-center">
        <span className="inline-block px-4 py-1.5 rounded-full bg-lime/10 text-lime text-xs font-semibold tracking-wider uppercase mb-4">
          Photos & Videos
        </span>
        <h1 className="font-display font-bold text-white text-3xl md:text-4xl lg:text-5xl mb-4">
          Media <span className="gradient-text">Hub</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg">
          Studio sessions, live performances, community drives, and behind-the-scenes
          moments from the New Breed initiative.
        </p>

        {/* Social shortcut row */}
        <div className="flex justify-center gap-3 mt-6">
          {headerSocials.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-ink-800 border border-ink-600/50 text-gray-400 hover:text-lime hover:border-lime/50 transition-all"
                aria-label={social.label}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px] font-medium text-center leading-tight">
                  {social.label}
                </span>
              </a>
            );
          })}
        </div>

        {/* Filter tabs */}
        <div className="flex justify-center gap-2 mt-8">
          {[
            { key: 'all', label: 'All' },
            { key: 'video', label: 'Videos' },
            { key: 'photo', label: 'Photos' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key as never)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                filter === tab.key
                  ? 'bg-lime text-ink-950'
                  : 'bg-ink-800 text-gray-400 border border-ink-600/50 hover:text-lime hover:border-lime/30'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <div className="section-pad">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((item, idx) => (
            <article
              key={item.id}
              className="group bg-ink-900 rounded-2xl border border-ink-600/50 overflow-hidden card-glow animate-slide-up"
              style={{ animationDelay: `${idx * 60}ms` }}
            >
              {/* Thumbnail */}
              <div className="relative w-full aspect-video overflow-hidden bg-ink-800">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/60 to-transparent" />

                {/* Type badge */}
                <div className="absolute top-3 right-3">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-ink-950/80 backdrop-blur-sm text-xs font-medium text-white">
                    {item.type === 'video' ? (
                      <>
                        <Play className="w-3 h-3 text-lime" fill="currentColor" />
                        {item.duration}
                      </>
                    ) : (
                      <>
                        <ImageIcon className="w-3 h-3 text-sky" />
                        Photo
                      </>
                    )}
                  </span>
                </div>

                {/* Play overlay for videos */}
                {item.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-14 h-14 rounded-full bg-lime/90 flex items-center justify-center scale-90 group-hover:scale-100 transition-transform">
                      <Play className="w-6 h-6 text-ink-950" fill="currentColor" />
                    </div>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  {item.platform === 'YouTube' ? (
                    <Youtube className="w-4 h-4 text-red-400" />
                  ) : (
                    <Instagram className="w-4 h-4 text-pink-400" />
                  )}
                  <span className="text-xs text-gray-500">{item.platform}</span>
                </div>
                <h3 className="font-display font-semibold text-white text-base mb-1.5">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Social CTA */}
      <section className="section-pad mt-16">
        <div className="rounded-3xl bg-ink-900 border border-ink-600/40 p-8 md:p-12 text-center">
          <h3 className="font-display font-bold text-white text-xl md:text-2xl mb-3">
            Follow the Initiative
          </h3>
          <p className="text-gray-400 text-sm md:text-base mb-6 max-w-xl mx-auto">
            Catch daily updates, live streams, and behind-the-scenes content on our socials.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <a
              href={settings.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-ink-800 border border-ink-600/50 text-white hover:border-pink-400/50 hover:text-pink-400 transition-all"
            >
              <Instagram className="w-5 h-5" />
              Instagram
            </a>
            <a
              href={settings.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-ink-800 border border-ink-600/50 text-white hover:border-red-400/50 hover:text-red-400 transition-all"
            >
              <Youtube className="w-5 h-5" />
              YouTube
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
