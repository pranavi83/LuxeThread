'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function RunwayTicker() {
  const tickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = tickerRef.current;
    if (!el) return;

    // Duplicated loops to ensure seamless infinite scroll
    const progress = { value: 0 };
    const loop = gsap.to(progress, {
      value: 100,
      duration: 25,
      ease: 'none',
      repeat: -1,
      onUpdate: () => {
        if (el) {
          el.style.transform = `translate3d(-${progress.value}%, 0, 0)`;
        }
      }
    });

    // Speed up scrolling slightly on mouse scroll wheel interaction
    const handleScroll = () => {
      gsap.to(loop, { timeScale: 2.5, duration: 0.1, overwrite: 'auto' });
      gsap.to(loop, { timeScale: 1.0, duration: 1.2, delay: 0.1 });
    };

    window.addEventListener('wheel', handleScroll);
    return () => {
      loop.kill();
      window.removeEventListener('wheel', handleScroll);
    };
  }, []);

  return (
    <div className="w-full overflow-hidden bg-slate-950 py-10 border-y border-peach/5 relative select-none">
      <div className="flex whitespace-nowrap" style={{ width: '200%' }}>
        {/* First Text Train */}
        <div ref={tickerRef} className="flex gap-16 pr-16 text-6xl md:text-8xl font-serif font-light text-transparent tracking-widest uppercase" style={{ WebkitTextStroke: '0.8px rgba(247, 237, 226, 0.15)' }}>
          <span>Nishras Atelier</span>
          <span className="text-peach/25">&bull;</span>
          <span>Bespoke Couture</span>
          <span className="text-peach/25">&bull;</span>
          <span>Limited Runway</span>
          <span className="text-peach/25">&bull;</span>
          <span>Handwoven Silks</span>
          <span className="text-peach/25">&bull;</span>
        </div>

        {/* Duplicated Text Train for seamless wrap-around */}
        <div className="flex gap-16 pr-16 text-6xl md:text-8xl font-serif font-light text-transparent tracking-widest uppercase" style={{ WebkitTextStroke: '0.8px rgba(247, 237, 226, 0.15)' }}>
          <span>Nishras Atelier</span>
          <span className="text-peach/25">&bull;</span>
          <span>Bespoke Couture</span>
          <span className="text-peach/25">&bull;</span>
          <span>Limited Runway</span>
          <span className="text-peach/25">&bull;</span>
          <span>Handwoven Silks</span>
          <span className="text-peach/25">&bull;</span>
        </div>
      </div>
    </div>
  );
}
