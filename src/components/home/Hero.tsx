'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Magnetic from '../common/Magnetic';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power4.out', duration: 1.6 }
      });

      // 1. Zoom and reveal background image
      tl.fromTo(
        bgImageRef.current,
        { scale: 1.15, clipPath: 'inset(10% 12% 10% 12% round 30px)', opacity: 0 },
        { scale: 1, clipPath: 'inset(0% 0% 0% 0% round 0px)', opacity: 0.65, duration: 2.2 }
      );

      // 2. Kinetic typography character reveal for title
      if (titleRef.current) {
        const chars = titleRef.current.querySelectorAll('.char-trigger');
        tl.fromTo(
          chars,
          { y: '110%' },
          { y: '0%', stagger: 0.04, duration: 1.4 },
          '-=1.5' // Overlap with background reveal
        );
      }

      // 3. Subtitle and CTA slide up
      tl.fromTo(
        [subtitleRef.current, ctaRef.current],
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.15, duration: 1.2 },
        '-=1.0'
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-english-blue flex items-center justify-center px-6 md:px-16"
    >
      {/* Background Draped Couture Image */}
      <div
        ref={bgImageRef}
        className="absolute inset-0 w-full h-full bg-cover bg-center pointer-events-none"
        style={{
          backgroundImage: `url('/assets/hero_bg.jpg')`
        }}
      />
      
      {/* Gradient Overlay for luxury feel and reading contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-english-blue via-english-blue/50 to-transparent pointer-events-none z-0" />

      {/* Hero Content */}
      <div className="relative z-10 text-center flex flex-col items-center justify-center max-w-5xl mt-12">
        {/* Subheader Monogram */}
        <span className="text-peach/70 tracking-[0.45em] text-[10px] md:text-xs font-semibold mb-6 uppercase">
          N I S H R A S &bull; N S
        </span>

        {/* Title with hidden overflow mask for slide reveal */}
        <h1
          ref={titleRef}
          className="font-serif text-5xl md:text-8xl lg:text-9xl text-peach tracking-tight leading-none mb-8 overflow-hidden py-4 select-none"
        >
          <span className="inline-block overflow-hidden relative pb-1">
            {Array.from('Luxury').map((char, index) => (
              <span key={index} className="char-trigger inline-block origin-bottom">
                {char}
              </span>
            ))}
          </span>{' '}
          <span className="inline-block overflow-hidden relative pb-1">
            {Array.from('Redefined').map((char, index) => (
              <span key={index} className="char-trigger inline-block origin-bottom">
                {char}
              </span>
            ))}
          </span>
        </h1>

        <p
          ref={subtitleRef}
          className="font-sans text-xs md:text-sm text-peach/70 max-w-lg font-light tracking-widest leading-relaxed mb-12 uppercase"
        >
          A curated collection of modern silhouettes, tailored using premium local materials and Awwwards-grade digital craftsmanship.
        </p>

        {/* Magnetic Shop Button */}
        <div ref={ctaRef}>
          <Magnetic>
            <a 
              href="#lookbook" 
              className="inline-block px-10 py-5 border border-peach/30 text-peach font-sans text-[10px] tracking-[0.25em] uppercase rounded-full bg-english-blue/40 backdrop-blur-sm hover:bg-peach hover:text-english-blue hover:border-peach transition-all duration-500 transform hover:scale-105"
            >
              Explore Lookbook
            </a>
          </Magnetic>
        </div>
      </div>

      {/* Elegant Scroll Down Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 hover:opacity-100 transition-opacity duration-300">
        <span className="text-[8px] tracking-[0.3em] uppercase text-peach/70">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-peach to-transparent animate-pulse" />
      </div>
    </section>
  );
}
