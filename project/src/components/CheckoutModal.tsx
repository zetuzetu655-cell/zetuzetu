import { useState, useEffect } from 'react';
import { X, ShoppingCart, ShieldCheck, Smartphone, CreditCard, CheckCircle2, Tag, User, Phone } from 'lucide-react';
import type { Merchandise } from '@/types';
import { useSettings } from '@/context/SettingsContext';

interface CheckoutModalProps {
  product: Merchandise | null;
  onClose: () => void;
}

const collectionHubs = [
  'Langas Main Office (Stage 12)',
  'Eldoret Town CBD Pickup',
  'Kapsaret Drop Point',
  'Delivery via Rider (Eldoret)',
];

export function CheckoutModal({ product, onClose }: CheckoutModalProps) {
  const { settings } = useSettings();
  const [size, setSize] = useState('');
  const [hub, setHub] = useState(collectionHubs[0]);
  const [fullName, setFullName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [stage, setStage] = useState<'form' | 'processing' | 'success'>('form');
  const [invoiceId, setInvoiceId] = useState('');

  useEffect(() => {
    if (product) {
      setStage('form');
      setSize('');
      setHub(collectionHubs[0]);
      setFullName('');
      setWhatsapp('');
      setInvoiceId(`SHOP-${Date.now().toString().slice(-8)}`);
    }
    document.body.style.overflow = product ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [product]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (product) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [product, onClose]);

  if (!product) return null;

  const hasPesapal = Boolean(settings.pesapalMerchantUrl);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !whatsapp.trim()) return;
    setStage('processing');
    setTimeout(() => setStage('success'), 2200);
  };

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-ink-950/80 backdrop-blur-md animate-fade-in"
        onClick={onClose}
      />

      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-ink-900 border border-ink-600/50 rounded-2xl shadow-2xl animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-ink-700/50 sticky top-0 bg-ink-900 z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-lime/10 flex items-center justify-center">
              <ShoppingCart className="w-4 h-4 text-lime" />
            </div>
            <h3 className="font-display font-bold text-white text-lg">Checkout</h3>
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
          {/* Locked product summary */}
          <div className="flex items-center gap-3 bg-ink-800 rounded-xl p-3 mb-5 border border-ink-600/40">
            <img
              src={product.image}
              alt={product.title}
              className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="font-display font-semibold text-white text-sm truncate">
                {product.title}
              </div>
              <div className="text-lime font-bold text-lg">
                Price: KES {product.price.toLocaleString()}
              </div>
            </div>
            <span className="text-[10px] font-mono text-gray-500 flex-shrink-0">
              {invoiceId}
            </span>
          </div>

          {stage === 'form' && (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Size selector */}
              <div>
                <label className="flex items-center gap-1.5 text-sm font-medium text-gray-300 mb-2">
                  <Tag className="w-4 h-4" />
                  Size Selector
                </label>
                <select
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  className="w-full bg-ink-800 border-2 border-ink-500/60 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-lime focus:ring-2 focus:ring-lime/20 transition-all cursor-pointer"
                >
                  <option value="" className="bg-ink-800">Select size...</option>
                  <option value="S" className="bg-ink-800">Small (S)</option>
                  <option value="M" className="bg-ink-800">Medium (M)</option>
                  <option value="L" className="bg-ink-800">Large (L)</option>
                  <option value="XL" className="bg-ink-800">Extra Large (XL)</option>
                  <option value="XXL" className="bg-ink-800">XXL</option>
                  <option value="N/A" className="bg-ink-800">One Size / N/A</option>
                </select>
              </div>

              {/* Delivery hub selection */}
              <div>
                <label className="flex items-center gap-1.5 text-sm font-medium text-gray-300 mb-2">
                  <Tag className="w-4 h-4" />
                  Delivery / Collection Hub
                </label>
                <select
                  value={hub}
                  onChange={(e) => setHub(e.target.value)}
                  className="w-full bg-ink-800 border-2 border-ink-500/60 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-lime focus:ring-2 focus:ring-lime/20 transition-all cursor-pointer"
                >
                  {collectionHubs.map((h) => (
                    <option key={h} value={h} className="bg-ink-800">
                      {h}
                    </option>
                  ))}
                </select>
              </div>

              {/* Full name */}
              <div>
                <label className="flex items-center gap-1.5 text-sm font-medium text-gray-300 mb-2">
                  <User className="w-4 h-4" />
                  Full Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  placeholder="Your full name"
                  className="w-full bg-ink-800 border-2 border-ink-500/60 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-lime focus:ring-2 focus:ring-lime/20 transition-all"
                />
              </div>

              {/* WhatsApp number */}
              <div>
                <label className="flex items-center gap-1.5 text-sm font-medium text-gray-300 mb-2">
                  <Phone className="w-4 h-4" />
                  WhatsApp Phone Number
                </label>
                <input
                  type="tel"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  required
                  placeholder="+254 7XX XXX XXX"
                  className="w-full bg-ink-800 border-2 border-ink-500/60 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-lime focus:ring-2 focus:ring-lime/20 transition-all"
                />
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
                    className="w-full h-48 rounded-lg bg-white"
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                  />
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center justify-center gap-4 py-3">
                      <div className="flex flex-col items-center gap-1">
                        <div className="w-10 h-10 rounded-lg bg-green-500/10 border border-green-500/30 flex items-center justify-center">
                          <Smartphone className="w-5 h-5 text-green-400" />
                        </div>
                        <span className="text-xs text-gray-500">M-Pesa</span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <div className="w-10 h-10 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center justify-center">
                          <Smartphone className="w-5 h-5 text-red-400" />
                        </div>
                        <span className="text-xs text-gray-500">Airtel</span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center">
                          <CreditCard className="w-5 h-5 text-blue-400" />
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
                <ShoppingCart className="w-5 h-5" />
                Pay KES {product.price.toLocaleString()}
              </button>
            </form>
          )}

          {stage === 'processing' && (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="w-16 h-16 border-4 border-ink-600 border-t-lime rounded-full animate-spin mb-6" />
              <p className="text-white font-medium text-lg">Processing your order...</p>
              <p className="text-gray-500 text-sm mt-2">Invoice: {invoiceId}</p>
            </div>
          )}

          {stage === 'success' && (
            <div className="flex flex-col items-center justify-center py-16 text-center animate-slide-up">
              <div className="w-20 h-20 rounded-full bg-lime/10 border-2 border-lime flex items-center justify-center mb-6 animate-pulse-glow">
                <CheckCircle2 className="w-10 h-10 text-lime" />
              </div>
              <h3 className="font-display font-bold text-white text-xl mb-2">
                Order Confirmed!
              </h3>
              <p className="text-gray-400 text-sm max-w-xs">
                Your order for <span className="text-white font-semibold">{product.title}</span> at{' '}
                <span className="text-lime font-semibold">KES {product.price.toLocaleString()}</span> has been received.
              </p>
              <p className="text-gray-500 text-xs mt-3">
                Invoice: {invoiceId} · We'll confirm via WhatsApp shortly.
              </p>
              <button onClick={onClose} className="mt-8 btn-outline-lime">
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
