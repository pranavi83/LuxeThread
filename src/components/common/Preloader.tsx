'use client';

import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

const WORDS = [
  'COUTURE',
  'TAILORED',
  'HERITAGE',
  'SILHOUETTES',
  'LUCKNOW WEAVE',
  'LUXE THREAD',
  'NS'
];

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    // 1. Cycle through editorial words rapidly
    const wordInterval = setInterval(() => {
      setWordIndex((prev) => {
        if (prev < WORDS.length - 1) {
          return prev + 1;
        }
        clearInterval(wordInterval);
        return prev;
      });
    }, 280);

    return () => clearInterval(wordInterval);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          onComplete();
        }
      });

      // SVG path drawing animation for the NS monogram logo
      if (pathRef.current) {
        const pathLen = pathRef.current.getTotalLength();
        gsap.set(pathRef.current, {
          strokeDasharray: pathLen,
          strokeDashoffset: pathLen,
          opacity: 0
        });

        tl.to(pathRef.current, {
          opacity: 0.9,
          duration: 0.5,
          ease: 'power2.out'
        });

        tl.to(pathRef.current, {
          strokeDashoffset: 0,
          duration: 1.5,
          ease: 'power3.inOut'
        }, '-=0.2');
      }

      // Smooth word fades
      if (wordRef.current) {
        tl.fromTo(
          wordRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' },
          '<=0.2'
        );
      }

      // Exit Animation: Slide up the preloader curtain with a luxury power4 ease
      tl.to(
        containerRef.current,
        {
          yPercent: -100,
          duration: 1.2,
          ease: 'power4.inOut',
          delay: 0.4
        },
        '+=0.2'
      );
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full bg-slate-950 z-[9999] flex flex-col items-center justify-center text-peach select-none"
    >
      {/* Editorial NS Monogram Drawing */}
      <div className="w-24 h-24 mb-10 opacity-80">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full text-peach fill-none stroke-current"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Custom vector path for styled monogram 'NS' */}
          <path
            ref={pathRef}
            d="M 25 75 L 25 25 L 75 75 L 75 25 M 35 25 C 50 10, 50 40, 65 25"
          />
        </svg>
      </div>

      {/* Changing Keyword Text */}
      <div className="h-10 flex items-center justify-center overflow-hidden">
        <span
          ref={wordRef}
          key={wordIndex}
          className="text-xs md:text-sm tracking-[0.4em] uppercase font-light text-peach/85 font-sans"
        >
          {WORDS[wordIndex]}
        </span>
      </div>

      {/* Luxury Loading Border Bar */}
      <div className="absolute bottom-12 w-48 h-[1px] bg-peach/10">
        <div className="h-full bg-peach w-0 animate-[loadingBar_2.2s_ease-in-out_forwards]" />
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes loadingBar {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}} />
    </div>
  );
}
