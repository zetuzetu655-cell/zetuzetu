import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Clock, Instagram, Youtube, Facebook, Twitter, MessageCircle } from 'lucide-react';
import { useSettings } from '@/context/SettingsContext';
import { TikTokIcon } from '@/components/icons/TikTokIcon';

export function ContactsPage() {
  const { settings } = useSettings();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const socialLinks = [
    { url: settings.social.instagram, icon: Instagram, label: 'Instagram', hoverClass: 'hover:border-pink-400/50 hover:text-pink-400' },
    { url: settings.social.tiktok, icon: TikTokIcon, label: 'TikTok', hoverClass: 'hover:border-lime/50 hover:text-lime' },
    { url: settings.social.youtube, icon: Youtube, label: 'YouTube', hoverClass: 'hover:border-red-400/50 hover:text-red-400' },
    { url: settings.social.whatsapp, icon: MessageCircle, label: 'WhatsApp', hoverClass: 'hover:border-green-400/50 hover:text-green-400' },
    { url: settings.social.facebook, icon: Facebook, label: 'Facebook', hoverClass: 'hover:border-blue-400/50 hover:text-blue-400' },
    { url: settings.social.twitter, icon: Twitter, label: 'Twitter (X)', hoverClass: 'hover:border-gray-300/50 hover:text-gray-300' },
  ];

  return (
    <div className="pt-24 md:pt-32 pb-10">
      {/* Header */}
      <section className="section-pad mb-12 text-center">
        <span className="inline-block px-4 py-1.5 rounded-full bg-sky/10 text-sky text-xs font-semibold tracking-wider uppercase mb-4">
          Get In Touch
        </span>
        <h1 className="font-display font-bold text-white text-3xl md:text-4xl lg:text-5xl mb-4">
          Contact <span className="gradient-text">Us</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg">
          Questions, partnerships, activation requests, or just want to talk? Reach out
          — the doors at the Langas center are always open.
        </p>
      </section>

      <div className="section-pad">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact info */}
          <div className="space-y-4">
            <div className="bg-ink-900 rounded-2xl border border-ink-600/50 p-6 card-glow">
              <div className="w-12 h-12 rounded-xl bg-lime/10 border border-lime/20 flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-lime" />
              </div>
              <h3 className="font-display font-semibold text-white text-lg mb-1">
                Our Location
              </h3>
              <p className="text-gray-400 text-sm">{settings.location}</p>
            </div>

            <div className="bg-ink-900 rounded-2xl border border-ink-600/50 p-6 card-glow">
              <div className="w-12 h-12 rounded-xl bg-sky/10 border border-sky/20 flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-sky" />
              </div>
              <h3 className="font-display font-semibold text-white text-lg mb-1">
                Email Us
              </h3>
              <a
                href={`mailto:${settings.contactEmail}`}
                className="text-gray-400 text-sm hover:text-lime transition-colors"
              >
                {settings.contactEmail}
              </a>
            </div>

            <div className="bg-ink-900 rounded-2xl border border-ink-600/50 p-6 card-glow">
              <div className="w-12 h-12 rounded-xl bg-lime/10 border border-lime/20 flex items-center justify-center mb-4">
                <Phone className="w-6 h-6 text-lime" />
              </div>
              <h3 className="font-display font-semibold text-white text-lg mb-1">
                Call Us
              </h3>
              <a
                href={`tel:${settings.contactPhone.replace(/\s/g, '')}`}
                className="text-gray-400 text-sm hover:text-lime transition-colors"
              >
                {settings.contactPhone}
              </a>
            </div>

            <div className="bg-ink-900 rounded-2xl border border-ink-600/50 p-6 card-glow">
              <div className="w-12 h-12 rounded-xl bg-sky/10 border border-sky/20 flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-sky" />
              </div>
              <h3 className="font-display font-semibold text-white text-lg mb-1">
                Operating Hours
              </h3>
              <p className="text-gray-400 text-sm">Mon - Sat: 8:00 AM - 6:00 PM</p>
              <p className="text-gray-400 text-sm">Safehouse: Daily, 9:00 AM - 5:00 PM</p>
            </div>

            {/* Social links */}
            <div className="bg-ink-900 rounded-2xl border border-ink-600/50 p-6 card-glow">
              <h3 className="font-display font-semibold text-white text-lg mb-4">
                Follow the Initiative
              </h3>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-11 h-11 rounded-full bg-ink-800 border border-ink-600/50 flex items-center justify-center text-gray-400 ${social.hoverClass} hover:scale-110 transition-all`}
                      aria-label={social.label}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div>
            {submitted ? (
              <div className="bg-ink-900 rounded-2xl border border-lime/30 p-10 text-center h-full flex flex-col items-center justify-center animate-slide-up">
                <div className="w-16 h-16 rounded-full bg-lime/10 border-2 border-lime flex items-center justify-center mb-6 animate-pulse-glow">
                  <CheckCircle2 className="w-8 h-8 text-lime" />
                </div>
                <h3 className="font-display font-bold text-white text-xl mb-2">
                  Message Sent!
                </h3>
                <p className="text-gray-400 text-sm max-w-xs">
                  Thanks for reaching out. We'll get back to you within 48 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 btn-outline-lime"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                name="contact"
                method="POST"
                data-netlify="true"
                className="bg-ink-900 rounded-2xl border border-ink-600/50 p-6 md:p-8 space-y-5"
              >
                <input type="hidden" name="form-name" value="contact" />

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Your name"
                    className="input-field"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="you@email.com"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+254 ..."
                      className="input-field"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Subject
                  </label>
                  <select name="subject" className="input-field cursor-pointer">
                    <option className="bg-ink-800">General Inquiry</option>
                    <option className="bg-ink-800">Partnership / Collaboration</option>
                    <option className="bg-ink-800">Request a Workshop / Activation</option>
                    <option className="bg-ink-800">Media / Press</option>
                    <option className="bg-ink-800">Donation Question</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    required
                    placeholder="Your message..."
                    className="input-field resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full btn-lime inline-flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
