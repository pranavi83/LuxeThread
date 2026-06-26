'use client';

import { useState } from 'react';
import ClothingBouquet from '@/components/bespoke/ClothingBouquet';
import DigitalAtelier from '@/components/bespoke/DigitalAtelier';
import DigitalPassport from '@/components/bespoke/DigitalPassport';

export default function BespokePage() {
  const [isPassportOpen, setIsPassportOpen] = useState(false);

  return (
    <div className="min-h-screen bg-english-blue text-peach font-sans selection:bg-peach selection:text-english-blue pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-6xl mx-auto space-y-32">
        
        {/* Page Header */}
        <header className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="font-serif text-4xl md:text-6xl tracking-wide mb-6">Bespoke Experiences</h1>
          <p className="text-sm font-light text-peach/60 leading-relaxed uppercase tracking-widest">
            A digital consultation to craft your custom garment, perfectly tailored to your anatomical topography.
          </p>
        </header>

        {/* Feature 1: Digital Atelier */}
        <section>
          <div className="mb-12 text-center">
            <h2 className="text-[10px] tracking-[0.3em] uppercase text-peach/40 mb-2">Step 01</h2>
            <h3 className="font-serif text-3xl">Virtual Sizing</h3>
          </div>
          <DigitalAtelier />
        </section>

        {/* Feature 2: Clothing Bouquet */}
        <section>
          <div className="mb-12 text-center">
            <h2 className="text-[10px] tracking-[0.3em] uppercase text-peach/40 mb-2">Step 02</h2>
            <h3 className="font-serif text-3xl">The Clothing Bouquet</h3>
          </div>
          <ClothingBouquet />
        </section>

        {/* Feature 3: Digital Product Passport */}
        <section className="text-center py-16 border-t border-peach/10">
          <h2 className="text-[10px] tracking-[0.3em] uppercase text-peach/40 mb-2">Aftercare & Provenance</h2>
          <h3 className="font-serif text-3xl mb-8">Digital Product Passport</h3>
          <p className="text-sm font-light text-peach/60 max-w-md mx-auto mb-8">
            View the complete lifecycle, materials, and artisan details of a bespoke garment.
          </p>
          <button 
            onClick={() => setIsPassportOpen(true)}
            className="text-xs tracking-widest uppercase bg-peach text-english-blue px-8 py-4 hover:bg-white transition-colors inline-flex"
          >
            View Provenance
          </button>
        </section>

      </div>

      <DigitalPassport 
        isOpen={isPassportOpen} 
        onClose={() => setIsPassportOpen(false)}
        productName="Elysian Silk Dress"
      />
    </div>
  );
}
