'use client';

import { useState } from 'react';
import Hero from '@/components/home/Hero';
import Lookbook from '@/components/home/Lookbook';
import CartDrawer from '@/components/cart/CartDrawer';
import Preloader from '@/components/common/Preloader';
import RunwayTicker from '@/components/home/RunwayTicker';
import Newsletter from '@/components/home/Newsletter';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}

      <div className={`relative w-full transition-opacity duration-1000 ${isLoading ? 'opacity-0 h-screen overflow-hidden' : 'opacity-100'}`}>
        {/* Immersive Hero Section */}
        {!isLoading && <Hero />}

        {/* Infinite Runway Ticker */}
        {!isLoading && <RunwayTicker />}

      {/* Brand Story (High Negative Space Editorial Section) */}
      <section id="story" className="w-full py-40 md:py-56 bg-slate-950 flex flex-col items-center justify-center px-6 md:px-12 border-t border-peach/5">
        <div className="max-w-4xl text-center flex flex-col items-center">
          <span className="text-[10px] tracking-[0.45em] uppercase text-gold-accent/70 mb-8 block font-semibold">
            Philosophy
          </span>
          <h2 className="font-serif text-3xl md:text-6xl text-peach leading-relaxed md:leading-normal font-light mb-12 select-none">
            &ldquo;Craftsmanship that honors heritage, silhouette designed for the digital avant-garde.&rdquo;
          </h2>
          <p className="font-sans text-xs md:text-sm text-peach/60 max-w-xl font-light tracking-widest leading-loose uppercase">
            NS Luxe Thread combines local Indian handloom excellence with global high-fashion designs. Each pattern is digitally mapped and custom-tailored on demand.
          </p>
        </div>
      </section>

      {/* Interactive Scroll-Driven Lookbook */}
      <Lookbook />

      {/* Newsletter / Email Capture */}
      <Newsletter />

      {/* Cart Drawer Portal overlay */}
      <CartDrawer />

      {/* Footer is now rendered in layout.tsx for all pages */}
    </div>
    </>
  );
}
