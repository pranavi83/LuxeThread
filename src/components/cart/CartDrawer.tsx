'use client';

import { useCart } from '@/context/CartContext';
import { useToast } from '@/components/common/Toast';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShieldCheck } from 'lucide-react';
import Image from 'next/image';

export default function CartDrawer() {
  const { cart, isOpen, closeCart, updateQuantity, removeItem, cartTotal } = useCart();
  const { showToast } = useToast();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-slate-950 z-[999] cursor-none"
          />

          {/* Cart Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className="fixed right-0 top-0 h-screen w-full sm:w-[450px] bg-english-blue border-l border-peach/10 z-[1000] flex flex-col shadow-2xl p-6 sm:p-8"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-peach/10 pb-6 mb-6">
              <div className="flex items-center gap-2">
                <span className="font-serif text-xl tracking-wider text-peach uppercase">Bag</span>
                <span className="text-[10px] tracking-[0.2em] font-sans font-light bg-peach/10 px-3 py-1 rounded-full text-peach">
                  {cart.length} Outfit{cart.length !== 1 ? 's' : ''}
                </span>
              </div>
              <button 
                onClick={closeCart}
                className="p-2 -mr-2 text-peach/60 hover:text-peach transition-colors duration-300 hover:scale-105"
                aria-label="Close Bag"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-grow overflow-y-auto pr-1 flex flex-col gap-6 scrollbar-thin scrollbar-thumb-peach/20">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center text-peach/40 gap-4">
                  <span className="font-serif text-lg italic">Your bag is empty</span>
                  <button 
                    onClick={closeCart}
                    className="text-[9px] tracking-[0.25em] uppercase text-peach border border-peach/20 px-6 py-3 rounded-full hover:bg-peach hover:text-english-blue transition-colors duration-300"
                  >
                    Return to Runway
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex gap-4 border-b border-peach/5 pb-6">
                    {/* Item Image */}
                    <div className="relative w-20 aspect-[2/3] bg-slate-900 overflow-hidden flex-shrink-0 rounded-sm">
                      <Image 
                        src={item.image} 
                        alt={item.name}
                        width={80}
                        height={120}
                        className="w-full h-full object-cover opacity-80"
                      />
                    </div>

                    {/* Item Details */}
                    <div className="flex-grow flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <h4 className="font-serif text-sm md:text-base text-peach tracking-wide leading-tight">
                            {item.name}
                          </h4>
                          <span className="font-sans text-xs font-semibold text-peach/80">
                            ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                          </span>
                        </div>
                        <span className="text-[9px] tracking-[0.2em] uppercase text-peach/40 mt-1 block">
                          Premium Tailoring
                        </span>
                      </div>

                      {/* Quantity Controller & Delete */}
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center border border-peach/20 rounded-full py-1 px-3 gap-3">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="text-peach/55 hover:text-peach transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={11} strokeWidth={2} />
                          </button>
                          <span className="text-xs font-sans text-peach min-w-[12px] text-center select-none font-medium">
                            {item.quantity}
                          </span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="text-peach/55 hover:text-peach transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus size={11} strokeWidth={2} />
                          </button>
                        </div>

                        <button 
                          onClick={() => {
                            removeItem(item.id);
                            showToast(`${item.name} removed from bag`, 'info');
                          }}
                          className="p-2 text-peach/40 hover:text-red-400 transition-colors duration-300"
                          aria-label="Remove item"
                        >
                          <Trash2 size={14} strokeWidth={1.5} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary & Checkout */}
            {cart.length > 0 && (
              <div className="border-t border-peach/10 pt-6 mt-6 bg-english-blue">
                <div className="flex justify-between items-end mb-6">
                  <div>
                    <span className="text-[9px] tracking-[0.25em] uppercase text-peach/40 block mb-1">
                      Subtotal
                    </span>
                    <span className="text-xs text-peach/55 font-light">Includes Indian local taxes</span>
                  </div>
                  <span className="font-serif text-2xl text-peach tracking-wide">
                    ₹{cartTotal.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="flex flex-col gap-4">
                  {/* Checkout Button */}
                  <button 
                    onClick={() => {
                      closeCart();
                      window.location.href = '/checkout';
                    }}
                    className="w-full py-4 bg-peach text-english-blue text-xs font-sans tracking-[0.25em] uppercase font-bold rounded-full border border-peach hover:bg-transparent hover:text-peach transition-all duration-500 hover:scale-[1.02]"
                  >
                    Proceed to Checkout
                  </button>

                  <div className="flex flex-col items-center justify-center gap-3">
                    <div className="flex items-center gap-2 text-peach/40 text-[9px] tracking-widest uppercase">
                      <ShieldCheck size={12} /> Secure Checkout by Shopify
                    </div>
                    
                    {/* Payment Options */}
                    <div className="flex items-center gap-2 text-peach/30 text-[8px] tracking-[0.2em] uppercase">
                      <span>Credit Card</span> &middot;
                      <span>Debit Card</span> &middot;
                      <span>EMI</span> &middot;
                      <span>UPI</span> &middot;
                      <span>Net Banking</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
