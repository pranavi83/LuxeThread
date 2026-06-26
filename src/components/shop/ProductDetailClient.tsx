'use client';

import { useCart } from '@/context/CartContext';
import { useToast } from '@/components/common/Toast';
import { useState } from 'react';
import { ShoppingBag, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import Magnetic from '@/components/common/Magnetic';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import Image from 'next/image';
import type { Product } from '@/utils/products';

export default function ProductDetailClient({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { showToast } = useToast();
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  // Bespoke Fabric Magnification States
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
  const [lensPos, setLensPos] = useState({ x: 0, y: 0 });
  const [showZoom, setShowZoom] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    
    // Relative position inside the zoom lens
    const xPercent = (x / width) * 100;
    const yPercent = (y / height) * 100;
    
    setZoomPos({ x: xPercent, y: yPercent });
    setLensPos({ x, y });
  };

  return (
    <div className="w-full min-h-screen bg-english-blue pt-32 pb-24 px-6 md:px-12 flex justify-center">
      <div className="max-w-7xl w-full flex flex-col">
        
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: 'Home', href: 'https://luxethread.com' },
            { label: 'Collections', href: 'https://luxethread.com/shop' },
            { label: product.name },
          ]}
        />

        {/* PDP Layout Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Gallery Columns (Left - 7 columns on large desktop) */}
          <div className="lg:col-span-7 flex flex-col md:flex-row gap-6">
            
            {/* Gallery Thumbnails (Side) */}
            <div className="flex md:flex-col gap-3 order-2 md:order-1 overflow-x-auto md:overflow-x-visible">
              {product.gallery.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`w-16 h-20 md:w-20 md:h-28 overflow-hidden border rounded-sm flex-shrink-0 transition-all duration-300 ${
                    activeImageIndex === index 
                      ? 'border-gold-accent opacity-100 scale-95' 
                      : 'border-peach/10 opacity-40 hover:opacity-75'
                  }`}
                >
                  <Image 
                    src={img} 
                    alt={`${product.name} — View ${index + 1}`}
                    width={80}
                    height={112}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Main Stage Image with Interactive Lens Zoom */}
            <div 
              onMouseEnter={() => setShowZoom(true)}
              onMouseLeave={() => setShowZoom(false)}
              onMouseMove={handleMouseMove}
              className="flex-grow aspect-[2/3] overflow-hidden bg-slate-950 rounded-sm relative order-1 md:order-2 cursor-zoom-in group"
            >
              <Image 
                src={product.gallery[activeImageIndex]} 
                alt={`${product.name} — ${product.category} editorial fashion by NS Luxe Thread`}
                fill
                sizes="(max-width: 768px) 100vw, 60vw"
                priority
                className="object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-english-blue/30 to-transparent pointer-events-none" />
              
              {/* Interactive circular magnifying lens (hidden on small touchscreens) */}
              {showZoom && (
                <div 
                  className="absolute rounded-full border border-gold-accent/50 w-48 h-48 pointer-events-none overflow-hidden bg-slate-950 hidden md:block shadow-2xl"
                  style={{
                    left: `${lensPos.x - 96}px`,
                    top: `${lensPos.y - 96}px`,
                    transform: 'translate3d(0, 0, 0)',
                  }}
                >
                  <div 
                    className="absolute bg-cover"
                    style={{
                      backgroundImage: `url('${product.gallery[activeImageIndex]}')`,
                      backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
                      left: 0,
                      top: 0,
                      width: '250%',
                      height: '250%',
                    }}
                  />
                </div>
              )}
            </div>

          </div>

          {/* Product Specifications & Order (Right - 5 columns) */}
          <div className="lg:col-span-5 flex flex-col items-start lg:sticky lg:top-32">
            
            <span className="text-[10px] tracking-[0.4em] uppercase text-gold-accent/70 mb-3 font-semibold">
              {product.category}
            </span>
            <h1 className="font-serif text-3xl md:text-5xl text-peach mb-4 font-medium tracking-tight">
              {product.name}
            </h1>
            
            <span className="font-serif text-2xl text-peach/95 mb-8 block">
              ₹{product.price.toLocaleString('en-IN')}
            </span>

            <p className="font-sans text-xs md:text-sm text-peach/70 font-light tracking-wide leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Size Selector */}
            <div className="w-full mb-8">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[9px] tracking-[0.25em] uppercase text-peach/50 font-semibold">
                  Select Size
                </span>
                <span className="text-[9px] tracking-[0.25em] uppercase text-gold-accent/50 font-light underline cursor-pointer hover:text-gold-accent/80 transition-colors">
                  Size Guide
                </span>
              </div>
              <div className="flex gap-3">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`w-12 h-12 rounded-full border text-xs tracking-wider transition-all duration-300 font-sans ${
                      selectedSize === sz
                        ? 'bg-gold-accent text-english-blue border-gold-accent font-bold'
                        : 'border-peach/20 text-peach/80 hover:border-gold-accent/50'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart CTA */}
            <div className="w-full mb-12">
              <Magnetic>
                <button
                  onClick={() => {
                    if (!selectedSize) {
                      showToast('Please select a bespoke size before acquisition.', 'error');
                      return;
                    }
                    addItem({
                      id: `${product.id}_${selectedSize}`,
                      name: `${product.name} (${selectedSize})`,
                      price: product.price,
                      image: product.image
                    });
                    showToast(`${product.name} (${selectedSize}) added to bag`, 'success');
                  }}
                  className="w-full py-4 bg-gold-accent text-english-blue text-xs font-sans tracking-[0.25em] uppercase font-bold rounded-full border border-gold-accent hover:bg-transparent hover:text-gold-accent transition-all duration-500 flex items-center justify-center gap-2"
                >
                  <ShoppingBag size={14} /> Acquire Garment
                </button>
              </Magnetic>
            </div>

            {/* Premium details bullet points */}
            <div className="w-full border-t border-peach/10 pt-8 mb-8">
              <h3 className="text-[9px] tracking-[0.3em] uppercase text-peach/70 mb-4 font-semibold">
                Garment Anatomy
              </h3>
              <ul className="flex flex-col gap-2">
                {product.details.map((detail, index) => (
                  <li key={index} className="text-[11px] font-sans text-peach/60 font-light tracking-wide flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-gold-accent/50 flex-shrink-0" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>

            {/* Guarantees / Shipping details */}
            <div className="w-full border-t border-peach/5 pt-6 flex flex-col gap-4">
              <div className="flex items-center gap-4 text-peach/40">
                <Truck size={16} strokeWidth={1.5} />
                <span className="text-[9px] tracking-[0.2em] uppercase font-light">
                  Complimentary Local Delivery in 5-7 days
                </span>
              </div>
              <div className="flex items-center gap-4 text-peach/40">
                <RotateCcw size={16} strokeWidth={1.5} />
                <span className="text-[9px] tracking-[0.2em] uppercase font-light">
                  14-Day Bespoke Alterations &amp; Returns
                </span>
              </div>
              <div className="flex items-center gap-4 text-peach/40">
                <ShieldCheck size={16} strokeWidth={1.5} />
                <span className="text-[9px] tracking-[0.2em] uppercase font-light">
                  100% Authenticity Certified
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
