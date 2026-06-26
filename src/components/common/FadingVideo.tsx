'use client';

import { useEffect, useRef } from 'react';

interface FadingVideoProps {
  src: string;
  className?: string;
}

export default function FadingVideo({ src, className = '' }: FadingVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let fadeFrame: number;
    let currentOpacity = 0;
    
    const fadeTo = (targetOpacity: number, durationMs: number) => {
      const startOpacity = currentOpacity;
      const startTime = performance.now();
      
      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / durationMs, 1);
        
        currentOpacity = startOpacity + (targetOpacity - startOpacity) * progress;
        video.style.opacity = currentOpacity.toString();
        
        if (progress < 1) {
          fadeFrame = requestAnimationFrame(animate);
        }
      };
      
      cancelAnimationFrame(fadeFrame);
      fadeFrame = requestAnimationFrame(animate);
    };

    // Fade in when video is ready to play
    const handleCanPlay = () => {
      fadeTo(1, 600); // FADE_MS = 600
    };

    video.addEventListener('canplay', handleCanPlay);

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      cancelAnimationFrame(fadeFrame);
    };
  }, []);

  return (
    <video 
      ref={videoRef}
      src={src}
      className={className}
      autoPlay 
      muted 
      playsInline 
      preload="auto"
      style={{ opacity: 0 }}
      loop
    />
  );
}
