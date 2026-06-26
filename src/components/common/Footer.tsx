'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full py-16 bg-english-blue border-t border-peach/10 flex flex-col items-center justify-center px-6 md:px-12">
      <div className="max-w-7xl w-full flex flex-col md:flex-row items-center justify-between gap-8 border-b border-peach/5 pb-12 mb-8">
        <div className="flex flex-col items-center md:items-start">
          <Link href="/" className="group flex flex-col items-center md:items-start">
            <span className="font-serif text-2xl text-peach tracking-widest group-hover:text-gold-accent transition-colors duration-500">NS</span>
            <span className="text-[7px] tracking-[0.4em] uppercase text-peach/40 mt-1 font-light">
              Luxe Thread Boutique
            </span>
          </Link>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-0">
          {/* Navigation Links */}
          <div className="flex gap-8 text-[9px] tracking-[0.2em] uppercase text-peach/60 font-light">
            <Link href="/shop" className="hover:text-gold-accent transition-colors duration-300 relative group">
              Collections
              <span className="absolute -bottom-1 left-0 w-0 h-[0.5px] bg-gold-accent group-hover:w-full transition-all duration-500" />
            </Link>
            <Link href="/#lookbook" className="hover:text-gold-accent transition-colors duration-300 relative group">
              Lookbook
              <span className="absolute -bottom-1 left-0 w-0 h-[0.5px] bg-gold-accent group-hover:w-full transition-all duration-500" />
            </Link>
            <Link href="/#story" className="hover:text-gold-accent transition-colors duration-300 relative group">
              Our Story
              <span className="absolute -bottom-1 left-0 w-0 h-[0.5px] bg-gold-accent group-hover:w-full transition-all duration-500" />
            </Link>
          </div>

          {/* Divider */}
          <div className="hidden md:block w-[1px] h-4 bg-peach/10 mx-8" />

          {/* Social / Legal */}
          <div className="flex gap-8 text-[9px] tracking-[0.2em] uppercase text-peach/40 font-light">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-peach transition-colors duration-300">
              Instagram
            </a>
            <Link href="/#contact" className="hover:text-peach transition-colors duration-300">
              Contact
            </Link>
          </div>
        </div>
      </div>

      <div className="w-full max-w-7xl flex flex-col sm:flex-row justify-between items-center text-[8px] tracking-[0.25em] uppercase text-peach/30 gap-4">
        <span>&copy; {new Date().getFullYear()} NS Luxe Thread. All Rights Reserved.</span>
        <span className="text-gold-accent/40">₹10L CUSTOM RUNWAY COLLECTIVE</span>
      </div>
    </footer>
  );
}
