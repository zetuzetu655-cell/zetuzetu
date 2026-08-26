import { useState, useEffect } from 'react';
import { X, Heart, CheckCircle2, ShieldCheck, Smartphone, CreditCard } from 'lucide-react';
import { useSettings } from '@/context/SettingsContext';

interface DonationModalProps {
  open: boolean;
  onClose: () => void;
}

const purposes = [
  'General Support / Where Needed Most',
  'Youth Mentorship & Safehouse Operations',
  'Talent Nurturing (Studio & Sports)',
  'Community Peace & Anti-Crime Advocacy',
  'Environmental & Sanitation Campaigns',
];

export function DonationModal({ open, onClose }: DonationModalProps) {
  const { settings } = useSettings();
  const [amount, setAmount] = useState('');
  const [purpose, setPurpose] = useState(purposes[0]);
  const [stage, setStage] = useState<'form' | 'processing' | 'success'>('form');

  useEffect(() => {
    if (open) {
      setStage('form');
      setAmount('');
      setPurpose(purposes[0]);
    }
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || Number(amount) < 1) return;
    setStage('processing');
    setTimeout(() => setStage('success'), 2200);
  };

  const hasPesapal = Boolean(settings.pesapalMerchantUrl);

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      {/* Blurred backdrop */}
      <div
        className="absolute inset-0 bg-ink-950/80 backdrop-blur-md animate-fade-in"
        onClick={onClose}
      />

      {/* Modal panel */}
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-ink-900 border border-ink-600/50 rounded-2xl shadow-2xl animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-ink-700/50 sticky top-0 bg-ink-900 z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-lime/10 flex items-center justify-center">
              <Heart className="w-4 h-4 text-lime" fill="currentColor" />
            </div>
            <h3 className="font-display font-bold text-white text-lg">Support the New Breed</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-ink-700/50 rounded-lg transition-all"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5">
          {stage === 'form' && (
            <form onSubmit={handleSubmit} className="space-y-5">
              <p className="text-gray-400 text-sm">
                Your contribution powers mentorship, studio sessions, safehouse operations,
                and community clean-ups across Langas. Every shilling goes to the streets.
              </p>

              {/* Custom amount */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Amount (KES)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium text-sm">
                    KSh
                  </span>
                  <input
                    type="number"
                    min="1"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter any amount"
                    required
                    className="w-full bg-ink-800 border-2 border-ink-500/60 rounded-xl pl-14 pr-4 py-4 text-white text-lg font-semibold placeholder-gray-600 focus:outline-none focus:border-lime focus:ring-2 focus:ring-lime/20 transition-all"
                  />
                </div>
                <div className="flex gap-2 mt-3 flex-wrap">
                  {[500, 1000, 2500, 5000].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setAmount(String(preset))}
                      className="px-3 py-1.5 rounded-full text-xs font-medium bg-ink-700/50 text-gray-400 border border-ink-600/50 hover:border-lime/50 hover:text-lime transition-all"
                    >
                      KSh {preset.toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Purpose dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Contribution Purpose
                </label>
                <select
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  className="w-full bg-ink-800 border-2 border-ink-500/60 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-lime focus:ring-2 focus:ring-lime/20 transition-all cursor-pointer"
                >
                  {purposes.map((p) => (
                    <option key={p} value={p} className="bg-ink-800">
                      {p}
                    </option>
                  ))}
                </select>
              </div>

              {/* PesaPal iframe slot */}
              <div className="rounded-xl border-2 border-dashed border-ink-600/50 p-4 bg-ink-950/50">
                <div className="flex items-center gap-2 mb-3">
                  <ShieldCheck className="w-4 h-4 text-lime" />
                  <span className="text-sm font-medium text-gray-300">
                    Secure Payment via PesaPal
                  </span>
                </div>
                {hasPesapal ? (
                  <iframe
                    src={settings.pesapalMerchantUrl}
                    title="PesaPal Checkout"
                    className="w-full h-64 rounded-lg bg-white"
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                  />
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center justify-center gap-4 py-4">
                      <div className="flex flex-col items-center gap-1">
                        <div className="w-12 h-12 rounded-lg bg-green-500/10 border border-green-500/30 flex items-center justify-center">
                          <Smartphone className="w-6 h-6 text-green-400" />
                        </div>
                        <span className="text-xs text-gray-500">M-Pesa</span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <div className="w-12 h-12 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center justify-center">
                          <Smartphone className="w-6 h-6 text-red-400" />
                        </div>
                        <span className="text-xs text-gray-500">Airtel</span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <div className="w-12 h-12 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center">
                          <CreditCard className="w-6 h-6 text-blue-400" />
                        </div>
                        <span className="text-xs text-gray-500">Visa / MC</span>
                      </div>
                    </div>
                    <p className="text-center text-xs text-gray-600">
                      Secure checkout widget loads here once the PesaPal Merchant URL is
                      configured in the admin dashboard.
                    </p>
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-lime text-ink-950 font-bold py-4 rounded-xl hover:bg-lime-glow transition-all hover:shadow-[0_0_30px_-4px_rgba(34,197,94,0.6)] hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
              >
                <Heart className="w-5 h-5" fill="currentColor" />
                Donate KSh {amount ? Number(amount).toLocaleString() : '0'}
              </button>
            </form>
          )}

          {stage === 'processing' && (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="w-16 h-16 border-4 border-ink-600 border-t-lime rounded-full animate-spin mb-6" />
              <p className="text-white font-medium text-lg">Processing your donation...</p>
              <p className="text-gray-500 text-sm mt-2">
                Securely connecting to PesaPal
              </p>
            </div>
          )}

          {stage === 'success' && (
            <div className="flex flex-col items-center justify-center py-16 text-center animate-slide-up">
              <div className="w-20 h-20 rounded-full bg-lime/10 border-2 border-lime flex items-center justify-center mb-6 animate-pulse-glow">
                <CheckCircle2 className="w-10 h-10 text-lime" />
              </div>
              <h3 className="font-display font-bold text-white text-xl mb-2">
                Thank You, New Breed!
              </h3>
              <p className="text-gray-400 text-sm max-w-xs">
                Your contribution of <span className="text-lime font-semibold">KSh {Number(amount).toLocaleString()}</span> for{' '}
                <span className="text-white">{purpose}</span> is powering real change in Langas.
              </p>
              <button
                onClick={onClose}
                className="mt-8 btn-outline-lime"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
