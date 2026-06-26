'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only initialize custom cursor on devices that support hover (desktops)
    if (!window.matchMedia('(hover: hover)').matches) return;

    document.documentElement.classList.add('custom-cursor-active');

    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;

    if (!dot || !ring) return;

    // Use GSAP quickTo for lag-less trailing effect
    const setDotX = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'power3.out' });
    const setDotY = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'power3.out' });

    const setRingX = gsap.quickTo(ring, 'x', { duration: 0.35, ease: 'power3.out' });
    const setRingY = gsap.quickTo(ring, 'y', { duration: 0.35, ease: 'power3.out' });

    const onMouseMove = (e: MouseEvent) => {
      // Center the dot (8px diameter => offset by 4px)
      setDotX(e.clientX - 4);
      setDotY(e.clientY - 4);

      // Center the ring (32px diameter => offset by 16px)
      setRingX(e.clientX - 16);
      setRingY(e.clientY - 16);
    };

    window.addEventListener('mousemove', onMouseMove);

    // Hover effects on interactive elements
    const onMouseEnterInteractive = () => {
      gsap.to(ring, { 
        scale: 1.6, 
        backgroundColor: 'rgba(255, 211, 182, 0.15)', 
        borderColor: '#FFD3B6', 
        duration: 0.3,
        ease: 'power3.out'
      });
      gsap.to(dot, { 
        scale: 0.5, 
        backgroundColor: '#FFD3B6',
        duration: 0.3,
        ease: 'power3.out'
      });
    };

    const onMouseLeaveInteractive = () => {
      gsap.to(ring, { 
        scale: 1, 
        backgroundColor: 'transparent', 
        borderColor: 'rgba(255, 211, 182, 0.4)', 
        duration: 0.3,
        ease: 'power3.out'
      });
      gsap.to(dot, { 
        scale: 1, 
        backgroundColor: '#FFD3B6',
        duration: 0.3,
        ease: 'power3.out'
      });
    };

    const addHoverListeners = () => {
      const targets = document.querySelectorAll('button, a, [data-hover-magnetic]');
      targets.forEach((target) => {
        // Prevent duplicate event listeners
        target.removeEventListener('mouseenter', onMouseEnterInteractive);
        target.removeEventListener('mouseleave', onMouseLeaveInteractive);
        
        target.addEventListener('mouseenter', onMouseEnterInteractive);
        target.addEventListener('mouseleave', onMouseLeaveInteractive);
      });
    };

    addHoverListeners();

    // Use MutationObserver to bind events to dynamic elements (e.g. Lookbook loaded items)
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      observer.disconnect();
      document.documentElement.classList.remove('custom-cursor-active');
    };
  }, []);

  return (
    <>
      {/* Small active dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-peach z-[9999] pointer-events-none mix-blend-difference hidden md:block"
        style={{ transform: 'translate3d(0, 0, 0)' }}
      />
      {/* Sleek outer ring */}
      <div
        ref={cursorRingRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-peach/40 z-[9998] pointer-events-none hidden md:block"
        style={{ transform: 'translate3d(0, 0, 0)' }}
      />
    </>
  );
}
