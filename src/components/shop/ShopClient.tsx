'use client';

import { useState } from 'react';
import { PRODUCTS } from '@/utils/products';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/components/common/Toast';
import Magnetic from '@/components/common/Magnetic';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import Breadcrumbs from '@/components/common/Breadcrumbs';

export default function ShopClient() {
  const { addItem } = useCart();
  const { showToast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Summer Couture', 'Outerwear', 'Tailoring'];

  const filteredProducts = selectedCategory === 'All'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === selectedCategory);

  return (
    <div className="w-full min-h-screen bg-english-blue pt-32 pb-24 px-6 md:px-12 flex flex-col items-center">
      <div className="max-w-7xl w-full">

        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Collections' },
          ]}
        />
        
        {/* Title Header */}
        <div className="mb-16 border-b border-peach/10 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-[10px] tracking-[0.45em] uppercase text-gold-accent/70 mb-2 block font-semibold">
              The Catalog
            </span>
            <h1 className="font-serif text-4xl md:text-6xl text-peach font-light">
              Curated Collection
            </h1>
          </div>
          <p className="font-sans text-xs md:text-sm text-peach/60 max-w-xs font-light tracking-wide leading-relaxed">
            Silhouettes constructed using raw handspun fibers, finished in our local ateliers.
          </p>
        </div>

        {/* Categories Filter bar */}
        <div className="flex gap-4 md:gap-8 overflow-x-auto pb-6 mb-12 border-b border-peach/5 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-[10px] tracking-[0.25em] uppercase pb-2 transition-all duration-300 font-light border-b whitespace-nowrap ${
                selectedCategory === cat
                  ? 'text-gold-accent border-gold-accent'
                  : 'text-peach/40 border-transparent hover:text-peach/70'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {filteredProducts.map((prod) => (
            <div 
              key={prod.id} 
              className="group flex flex-col items-start bg-slate-950/20 border border-peach/5 rounded-sm p-4 hover:border-peach/20 transition-all duration-500"
            >
              {/* Product Image Link */}
              <Link 
                href={`/shop/${prod.handle}`}
                className="w-full aspect-[3/4] overflow-hidden bg-slate-950 relative block rounded-sm"
              >
                <Image 
                  src={prod.image} 
                  alt={`${prod.name} — ${prod.category} by NS Luxe Thread`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700"
                />
                
                {/* Visual Accent Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-english-blue/40 to-transparent pointer-events-none" />
                
                {/* Detail Page Hover Trigger */}
                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-10 h-10 rounded-full bg-gold-accent/90 text-english-blue flex items-center justify-center border border-gold-accent">
                    <ArrowRight size={16} />
                  </div>
                </div>
              </Link>

              {/* Product Info */}
              <div className="w-full mt-6 flex justify-between items-start gap-4">
                <div>
                  <span className="text-[8px] tracking-[0.3em] uppercase text-gold-accent/50 font-semibold mb-1 block">
                    {prod.category}
                  </span>
                  <Link 
                    href={`/shop/${prod.handle}`}
                    className="font-serif text-lg md:text-xl text-peach hover:text-peach/85 transition-colors block"
                  >
                    {prod.name}
                  </Link>
                </div>
                <span className="font-serif text-base md:text-lg text-peach/95">
                  ₹{prod.price.toLocaleString('en-IN')}
                </span>
              </div>

              <p className="font-sans text-[11px] text-peach/60 font-light mt-3 leading-relaxed tracking-wide min-h-[44px]">
                {prod.description}
              </p>

              {/* Action Buttons */}
              <div className="w-full flex gap-3 mt-6">
                <Link 
                  href={`/shop/${prod.handle}`}
                  className="flex-grow text-center py-3 border border-peach/20 hover:border-gold-accent/60 rounded-full text-[9px] tracking-[0.2em] uppercase text-peach transition-colors duration-300 font-light"
                >
                  View Details
                </Link>

                <Magnetic>
                  <button
                    onClick={() => {
                      addItem({
                        id: prod.id,
                        name: prod.name,
                        price: prod.price,
                        image: prod.image
                      });
                      showToast(`${prod.name} added to bag`, 'success');
                    }}
                    className="p-3 bg-gold-accent text-english-blue rounded-full border border-gold-accent hover:bg-transparent hover:text-gold-accent transition-all duration-300 flex-shrink-0"
                    aria-label={`Add ${prod.name} to cart`}
                  >
                    <ShoppingBag size={13} />
                  </button>
                </Magnetic>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
