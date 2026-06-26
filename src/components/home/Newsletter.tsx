'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubmitted(true);
      setEmail('');
      // Reset after animation
      setTimeout(() => setIsSubmitted(false), 4000);
    }
  };

  return (
    <section className="w-full py-28 md:py-36 bg-slate-950 relative overflow-hidden">
      {/* Decorative background text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="text-[12vw] font-serif font-black text-peach/[0.015] tracking-tighter whitespace-nowrap">
          STAY INSPIRED
        </span>
      </div>

      {/* Subtle gold gradient line at top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[1px] bg-gradient-to-r from-transparent via-gold-accent/30 to-transparent" />

      <div className="relative z-10 max-w-2xl mx-auto px-6 md:px-12 flex flex-col items-center text-center">
        {/* Icon badge */}
        <div className="w-12 h-12 rounded-full border border-gold-accent/20 flex items-center justify-center mb-8 bg-gold-accent/5">
          <Sparkles size={18} className="text-gold-accent" strokeWidth={1.5} />
        </div>

        <span className="text-[10px] tracking-[0.45em] uppercase text-gold-accent/70 mb-4 block font-semibold">
          The Inner Circle
        </span>
        <h2 className="font-serif text-3xl md:text-5xl text-peach leading-relaxed font-light mb-6 select-none">
          Exclusive Runway Updates
        </h2>
        <p className="font-sans text-xs md:text-sm text-peach/50 max-w-md font-light tracking-widest leading-loose uppercase mb-12">
          First access to limited collections, behind-the-scenes atelier stories, and private sale invitations.
        </p>

        {/* Email Form */}
        <form onSubmit={handleSubmit} className="w-full max-w-md relative">
          {!isSubmitted ? (
            <motion.div
              initial={false}
              className="flex items-center border border-peach/15 rounded-full bg-english-blue/60 backdrop-blur-sm overflow-hidden focus-within:border-gold-accent/40 transition-colors duration-500"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-grow bg-transparent px-6 py-4 text-xs text-peach font-sans tracking-widest placeholder:text-peach/25 focus:outline-none"
                aria-label="Email address"
              />
              <button
                type="submit"
                className="flex-shrink-0 mr-2 w-10 h-10 rounded-full bg-gold-accent text-english-blue flex items-center justify-center hover:bg-peach transition-colors duration-300 hover:scale-105 active:scale-95"
                aria-label="Subscribe"
              >
                <ArrowRight size={14} strokeWidth={2} />
              </button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center gap-3 py-4"
            >
              <div className="w-8 h-8 rounded-full bg-gold-accent/20 flex items-center justify-center">
                <Sparkles size={14} className="text-gold-accent" />
              </div>
              <span className="text-xs tracking-[0.2em] uppercase text-gold-accent font-light">
                Welcome to the Inner Circle
              </span>
            </motion.div>
          )}
        </form>

        <span className="text-[8px] tracking-[0.2em] uppercase text-peach/25 mt-6 font-light">
          No spam — Only curated luxury.
        </span>
      </div>
    </section>
  );
}
