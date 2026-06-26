'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import Magnetic from './Magnetic';
import { ShoppingBag, Search, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const { openCart, cartCount } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-english-blue/40 backdrop-blur-md border-b border-peach/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
          
          {/* Navigation Links (Left - Desktop Only) */}
          <nav className="hidden md:flex items-center gap-8 text-[11px] tracking-[0.25em] uppercase text-peach/80 font-light">
            <Link href="/#lookbook" className="hover:text-peach transition-colors duration-300">
              Lookbook
            </Link>
            <Link href="/shop" className="hover:text-peach transition-colors duration-300">
              Collections
            </Link>
            <Link href="/#story" className="hover:text-peach transition-colors duration-300">
              Our Story
            </Link>
          </nav>

          {/* Brand Monogram / Identity (Center) */}
          <Link href="/" className="flex flex-col items-center group">
            <span className="font-serif text-3xl md:text-4xl text-peach tracking-[0.1em] font-medium leading-none group-hover:scale-105 transition-transform duration-500">
              NS
            </span>
            <span className="text-[7px] tracking-[0.5em] uppercase text-peach/60 mt-1 font-light ml-[0.5em]">
              Luxe Thread
            </span>
          </Link>

          {/* Actions (Right) */}
          <div className="flex items-center gap-6">
            {/* Search (Desktop Only) */}
            <div className="hidden md:block">
              <Magnetic>
                <button 
                  className="p-2 text-peach/80 hover:text-peach transition-colors duration-300 relative"
                  aria-label="Search Catalog"
                >
                  <Search size={18} strokeWidth={1.5} />
                </button>
              </Magnetic>
            </div>

            {/* Cart Bag Trigger */}
            <Magnetic>
              <button 
                onClick={openCart}
                className="p-2 text-peach/80 hover:text-peach transition-colors duration-300 relative flex items-center gap-1 group"
                aria-label="Open Shopping Bag"
              >
                <ShoppingBag size={18} strokeWidth={1.5} />
                <span className="absolute -top-1 -right-1 bg-peach text-english-blue text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center scale-90 group-hover:scale-105 transition-transform duration-300">
                  {cartCount}
                </span>
              </button>
            </Magnetic>

            {/* Mobile Menu Icon Toggle */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-peach/80 hover:text-peach hover:scale-105 transition-transform"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
            </button>
          </div>

        </div>
      </header>

      {/* Full Screen Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 200 }}
            className="fixed inset-0 w-full h-screen bg-slate-950 z-40 flex flex-col justify-center px-8 md:hidden"
          >
            {/* Monogram Overlay Backdrop */}
            <div className="absolute right-0 bottom-0 text-[18vw] font-serif font-black text-peach/[0.02] select-none pointer-events-none tracking-tighter leading-none">
              NS COUTURE
            </div>

            {/* Mobile Navigation List */}
            <nav className="flex flex-col gap-8 text-2xl font-serif text-peach tracking-wide">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
              >
                <Link 
                  href="/#lookbook" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="hover:italic hover:text-peach/80 transition-all block py-2 border-b border-peach/5"
                >
                  Lookbook
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 }}
              >
                <Link 
                  href="/shop" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="hover:italic hover:text-peach/80 transition-all block py-2 border-b border-peach/5"
                >
                  Collections
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 }}
              >
                <Link 
                  href="/#story" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="hover:italic hover:text-peach/80 transition-all block py-2 border-b border-peach/5"
                >
                  Our Story
                </Link>
              </motion.div>
            </nav>

            {/* Bottom details inside menu drawer */}
            <div className="absolute bottom-10 left-8 right-8 flex justify-between text-[8px] tracking-[0.25em] uppercase text-peach/40">
              <span>NS Luxe Thread Boutique</span>
              <span>₹10L Collective</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
