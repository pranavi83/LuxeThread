'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/components/common/Toast';
import { PRODUCTS } from '@/utils/products';
import Magnetic from '../common/Magnetic';
import Link from 'next/link';
import { Plus, ArrowRight } from 'lucide-react';

// Register ScrollTrigger client-side
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Lookbook() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { addItem } = useCart();
  const { showToast } = useToast();

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const items = containerRef.current?.querySelectorAll('.lookbook-item');
      
      items?.forEach((item) => {
        const image = item.querySelector('.lookbook-image');
        const text = item.querySelector('.lookbook-details');

        // Create Parallax on the image inside its container
        if (image) {
          gsap.fromTo(
            image,
            { yPercent: -15 },
            {
              yPercent: 15,
              ease: 'none',
              scrollTrigger: {
                trigger: item,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              }
            }
          );
        }

        // Smooth text reveals
        if (text) {
          gsap.fromTo(
            text,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 1.2,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
              }
            }
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Use only first two products for the home lookbook page layout
  const lookbookLooks = PRODUCTS.slice(0, 2);

  return (
    <section 
      id="lookbook" 
      ref={containerRef}
      className="w-full min-h-screen py-32 bg-english-blue flex flex-col items-center justify-center px-6 md:px-12"
    >
      <div className="max-w-7xl w-full">
        {/* Lookbook Header */}
        <div className="mb-24 md:mb-32 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-peach/10 pb-12">
          <div>
            <span className="text-[10px] tracking-[0.4em] uppercase text-gold-accent/70 mb-2 block">
              Curated Silhouette
            </span>
            <h2 className="font-serif text-4xl md:text-6xl text-peach font-light">
              Interactive Lookbook
            </h2>
          </div>
          <p className="font-sans text-xs md:text-sm text-peach/50 max-w-sm tracking-wide leading-relaxed font-light">
            Each garment represents an individual work of digital and physical sculpture, crafted specifically for the modern editorial aesthetic.
          </p>
        </div>

        {/* Lookbook Grid (Alternating Layouts) */}
        <div className="flex flex-col gap-32 md:gap-48">
          {lookbookLooks.map((look, index) => (
            <div 
              key={look.id}
              className={`lookbook-item flex flex-col md:flex-row items-center gap-12 md:gap-24 ${
                index % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Image Container with Parallax Effect */}
              <div className="w-full md:w-3/5 aspect-[2/3] overflow-hidden relative group bg-slate-950 rounded-sm">
                <Link href={`/shop/${look.handle}`}>
                  <div 
                    className="lookbook-image absolute inset-0 w-full h-[130%] bg-cover bg-center opacity-70 group-hover:opacity-90 transition-opacity duration-700"
                    style={{ backgroundImage: `url('${look.image}')` }}
                  />
                </Link>
                
                {/* Image Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-english-blue/50 to-transparent pointer-events-none" />

                {/* Corner Label */}
                <span className="absolute top-6 left-6 text-[9px] tracking-[0.3em] uppercase text-peach/80 bg-english-blue/70 backdrop-blur-md px-4 py-2 border border-peach/10 rounded-full">
                  Look {index + 1} &bull; {look.category}
                </span>

                {/* Hover Add-to-Cart Circle Trigger */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <Magnetic>
                    <button 
                      onClick={() => {
                        addItem({
                          id: look.id,
                          name: look.name,
                          price: look.price,
                          image: look.image
                        });
                        showToast(`${look.name} added to bag`, 'success');
                      }}
                      className="w-20 h-20 rounded-full bg-gold-accent text-english-blue flex flex-col items-center justify-center gap-1 border border-gold-accent shadow-2xl transform scale-75 group-hover:scale-100 transition-transform duration-500 hover:bg-english-blue hover:text-gold-accent"
                    >
                      <Plus size={16} strokeWidth={2.5} />
                      <span className="text-[7px] tracking-[0.1em] uppercase font-bold">Acquire</span>
                    </button>
                  </Magnetic>
                </div>
              </div>

              {/* Outfit details */}
              <div className="lookbook-details w-full md:w-2/5 flex flex-col items-start text-left">
                <span className="text-[10px] tracking-[0.35em] uppercase text-gold-accent/60 mb-3 font-semibold">
                  {look.category}
                </span>
                <h3 className="font-serif text-3xl md:text-4xl text-peach mb-6 font-medium tracking-tight">
                  <Link href={`/shop/${look.handle}`} className="hover:text-peach/80 transition-colors">
                    {look.name}
                  </Link>
                </h3>
                <p className="font-sans text-xs md:text-sm text-peach/70 font-light tracking-wide leading-relaxed mb-8">
                  {look.description}
                </p>
                <div className="flex items-center gap-8 mb-8">
                  <span className="font-serif text-xl md:text-2xl text-peach">
                    ₹{look.price.toLocaleString('en-IN')}
                  </span>
                </div>
                
                <div className="flex gap-4">
                  {/* View Details Link */}
                  <Link 
                    href={`/shop/${look.handle}`}
                    className="flex items-center gap-2 px-6 py-3 border border-peach/30 rounded-full text-[10px] tracking-[0.2em] uppercase text-peach hover:bg-peach hover:text-english-blue transition-colors duration-300"
                  >
                    View Bespoke Details <ArrowRight size={12} />
                  </Link>

                  {/* Fallback button for tap-only mobile devices */}
                  <button 
                    onClick={() => {
                      addItem({
                        id: look.id,
                        name: look.name,
                        price: look.price,
                        image: look.image
                      });
                      showToast(`${look.name} added to bag`, 'success');
                    }}
                    className="md:hidden flex items-center gap-2 px-6 py-3 bg-gold-accent text-english-blue rounded-full text-[10px] tracking-[0.2em] uppercase hover:bg-transparent hover:text-gold-accent transition-colors duration-300 border border-gold-accent"
                  >
                    <Plus size={12} /> Acquire
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
