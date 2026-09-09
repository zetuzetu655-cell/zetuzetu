import { Instagram, Youtube, Mail, Send, Facebook, Twitter, MessageCircle } from 'lucide-react';
import { useSettings } from '@/context/SettingsContext';
import { useRouter } from '@/context/RouterContext';
import { GraffitiLogo } from '@/components/GraffitiLogo';
import { TikTokIcon } from '@/components/icons/TikTokIcon';

export function Footer() {
  const { settings } = useSettings();
  const { navigate } = useRouter();

  const socialLinks = [
    { url: settings.social.instagram, icon: Instagram, label: 'Instagram' },
    { url: settings.social.tiktok, icon: TikTokIcon, label: 'TikTok' },
    { url: settings.social.youtube, icon: Youtube, label: 'YouTube' },
    { url: settings.social.whatsapp, icon: MessageCircle, label: 'WhatsApp' },
    { url: settings.social.facebook, icon: Facebook, label: 'Facebook' },
    { url: settings.social.twitter, icon: Twitter, label: 'Twitter (X)' },
  ];

  return (
    <footer className="bg-ink-900 border-t border-ink-700/50 mt-20">
      <div className="section-pad py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              {settings.logoUrl ? (
                <img
                  src={settings.logoUrl}
                  alt={settings.siteName}
                  className="h-10 w-10 rounded-lg object-cover"
                />
              ) : (
                <GraffitiLogo className="h-10 w-10" />
              )}
              <div>
                <div className="font-display font-bold text-white">ZETUZETUform</div>
                <div className="text-lime text-xs font-medium tracking-wider">
                  #NISISI
                </div>
              </div>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              A grassroots youth initiative based in {settings.location}. Building peace,
              nurturing talent, and reclaiming futures — one young person at a time.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4 text-sm tracking-wider uppercase">
              Navigate
            </h4>
            <div className="flex flex-col gap-2">
              {[
                { key: 'home', label: 'Home' },
                { key: 'programs', label: 'Active Programs' },
                { key: 'impact', label: 'Our Impact' },
                { key: 'media', label: 'Media Hub' },
                { key: 'store', label: 'Store' },
                { key: 'volunteer', label: 'Volunteer' },
                { key: 'contacts', label: 'Contacts' },
              ].map((link) => (
                <button
                  key={link.key}
                  onClick={() => navigate(link.key as never)}
                  className="text-gray-500 hover:text-lime text-sm transition-colors text-left w-fit"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Newsletter + Socials */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4 text-sm tracking-wider uppercase">
              Stay Connected
            </h4>
            <form
              name="newsletter"
              method="POST"
              data-netlify="true"
              className="flex gap-2 mb-6"
            >
              <input type="hidden" name="form-name" value="newsletter" />
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="email"
                  name="email"
                  placeholder="Your email"
                  required
                  className="w-full bg-ink-800 border-2 border-lime/40 rounded-full pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-lime transition-colors"
                />
              </div>
              <button
                type="submit"
                className="bg-lime text-ink-950 rounded-full p-2.5 hover:bg-lime-glow transition-colors flex-shrink-0"
                aria-label="Subscribe"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <div className="grid grid-cols-3 gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-1.5 p-2 rounded-xl bg-ink-800 border border-ink-600/50 text-gray-400 hover:text-lime hover:border-lime/50 transition-all"
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
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-ink-700/50 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-600 text-sm">
            &copy; {new Date().getFullYear()} Langas Youth — Zetu Zetu Form. All rights reserved.
          </p>
          <p className="text-gray-600 text-sm">
            Built with purpose in {settings.location}
          </p>
        </div>
      </div>
    </footer>
  );
}
