import { useState } from 'react';
import { Sparkles, ShoppingCart } from 'lucide-react';
import type { Merchandise } from '@/types';
import { GraffitiLogo } from '@/components/GraffitiLogo';
import { CheckoutModal } from '@/components/CheckoutModal';
import { fetchMerchandise } from '@/lib/content';

export function StorePage() {
  const products = fetchMerchandise();
  const [checkoutProduct, setCheckoutProduct] = useState<Merchandise | null>(null);

  return (
    <div className="pt-24 md:pt-32 pb-10">
      {/* Header */}
      <section className="section-pad mb-12 text-center">
        <span className="inline-block px-4 py-1.5 rounded-full bg-lime/10 text-lime text-xs font-semibold tracking-wider uppercase mb-4">
          New Breed Merchandise
        </span>
        <h1 className="font-display font-bold text-white text-3xl md:text-4xl lg:text-5xl mb-4">
          The <span className="gradient-text">Store</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg">
          Every purchase directly funds studio sessions, safehouse operations,
          and community programs across Langas. Wear the initiative with pride.
        </p>
      </section>

      {/* Product cards */}
      <div className="section-pad space-y-6">
        {products.map((product, idx) => (
          <article
            key={product.id}
            className="bg-ink-900 rounded-2xl border border-ink-600/50 overflow-hidden card-glow animate-slide-up"
            style={{ animationDelay: `${idx * 80}ms` }}
          >
            {/* Header with category tag */}
            <div className="flex items-center gap-3 p-4 border-b border-ink-700/40">
              <GraffitiLogo className="h-11 w-11 flex-shrink-0" />
              <div className="flex-1 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-lime/10 border border-lime/30 text-lime text-xs font-bold tracking-wider">
                  <Sparkles className="w-3 h-3" />
                  CATEGORY: {product.category.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Full-width image */}
            <div className="relative w-full aspect-video overflow-hidden bg-ink-800">
              <img
                src={product.image}
                alt={product.title}
                loading="lazy"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent" />
            </div>

            {/* Content */}
            <div className="p-5 md:p-6">
              <h2 className="font-display font-bold text-white text-xl md:text-2xl mb-3">
                {product.title}
              </h2>
              <div className="text-2xl md:text-3xl font-display font-bold text-lime mb-3">
                Price: KES {product.price.toLocaleString()}
              </div>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-5">
                {product.description}
              </p>

              {/* Buy button */}
              <button
                onClick={() => setCheckoutProduct(product)}
                className="btn-lime inline-flex items-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                BUY NOW
              </button>
            </div>
          </article>
        ))}
      </div>

      <CheckoutModal
        product={checkoutProduct}
        onClose={() => setCheckoutProduct(null)}
      />
    </div>
  );
}
