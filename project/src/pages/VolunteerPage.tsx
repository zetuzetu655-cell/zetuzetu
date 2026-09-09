import { useState } from 'react';
import { Handshake, CheckCircle2, Send } from 'lucide-react';

export function VolunteerPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-24 md:pt-32 pb-10">
      {/* Header */}
      <section className="section-pad mb-12 text-center">
        <span className="inline-block px-4 py-1.5 rounded-full bg-lime/10 text-lime text-xs font-semibold tracking-wider uppercase mb-4">
          Join the Initiative
        </span>
        <h1 className="font-display font-bold text-white text-3xl md:text-4xl lg:text-5xl mb-4">
          Become a <span className="gradient-text">Volunteer</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg">
          Mentors, artists, coaches, organizers — whatever your skill, the New Breed
          needs it. Step in and help us redirect energy into purpose.
        </p>
      </section>

      <div className="section-pad">
        <div className="max-w-2xl mx-auto">
          {submitted ? (
            <div className="bg-ink-900 rounded-2xl border border-lime/30 p-10 text-center animate-slide-up">
              <div className="w-16 h-16 rounded-full bg-lime/10 border-2 border-lime flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
                <CheckCircle2 className="w-8 h-8 text-lime" />
              </div>
              <h3 className="font-display font-bold text-white text-xl mb-2">
                Welcome to the New Breed!
              </h3>
              <p className="text-gray-400 text-sm">
                Your volunteer application has been received. Our team in Langas will
                reach out within 48 hours to match you with a track.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 btn-outline-lime"
              >
                Submit Another
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              name="volunteer"
              method="POST"
              data-netlify="true"
              className="bg-ink-900 rounded-2xl border border-ink-600/50 p-6 md:p-8 space-y-5"
            >
              <input type="hidden" name="form-name" value="volunteer" />

              <div className="flex items-center gap-2 mb-2">
                <Handshake className="w-5 h-5 text-lime" />
                <h2 className="font-display font-semibold text-white text-lg">
                  Volunteer Sign-Up
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Your name"
                    className="input-field"
                  />
                </div>
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
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Area / Estate
                  </label>
                  <input
                    type="text"
                    name="area"
                    placeholder="e.g. Langas, Stage 12"
                    className="input-field"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Which track interests you?
                </label>
                <select name="track" className="input-field cursor-pointer">
                  <option className="bg-ink-800">Street to Studio & Stage (Creative Arts)</option>
                  <option className="bg-ink-800">The Safehouse & Peer Network (Advocacy)</option>
                  <option className="bg-ink-800">New Breed Leadership Academy</option>
                  <option className="bg-ink-800">Environmental & Sanitation Campaigns</option>
                  <option className="bg-ink-800">Sports Tournaments & Coaching</option>
                  <option className="bg-ink-800">General Volunteer / Wherever Needed</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  What skills or experience do you bring?
                </label>
                <textarea
                  name="skills"
                  rows={4}
                  placeholder="Tell us about yourself..."
                  className="input-field resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full btn-lime inline-flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                Submit Application
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
