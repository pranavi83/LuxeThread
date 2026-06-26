'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ShieldCheck, ArrowLeft, CreditCard, Smartphone, Banknote, Landmark, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

type PaymentMethod = 'card' | 'upi' | 'emi' | 'netbanking';

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const router = useRouter();
  
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing delay
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      if (clearCart) clearCart();
    }, 2500);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-english-blue text-peach flex flex-col items-center justify-center p-6 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 20 }}
          className="flex flex-col items-center"
        >
          <div className="w-24 h-24 bg-peach/10 rounded-full flex items-center justify-center mb-8">
            <CheckCircle2 size={48} className="text-peach" />
          </div>
          <h1 className="font-serif text-4xl md:text-5xl mb-4">Order Confirmed</h1>
          <p className="text-peach/60 font-light max-w-md mx-auto mb-12">
            Your bespoke garments will be handcrafted and shipped within 14 business days. A receipt has been sent to your email.
          </p>
          <Link 
            href="/"
            className="text-[10px] tracking-[0.25em] uppercase border border-peach px-8 py-4 hover:bg-peach hover:text-english-blue transition-colors duration-300"
          >
            Return to Runway
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-english-blue text-peach font-sans selection:bg-peach selection:text-english-blue pt-24 pb-12 px-6">
      <div className="max-w-6xl mx-auto">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-[10px] tracking-widest uppercase text-peach/60 hover:text-peach transition-colors mb-12"
        >
          <ArrowLeft size={14} /> Back
        </button>

        <h1 className="font-serif text-4xl mb-12">Secure Checkout</h1>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          
          {/* Left Column: Forms */}
          <div className="flex-1 space-y-12">
            {/* Shipping Info */}
            <section>
              <h2 className="text-[10px] tracking-[0.3em] uppercase text-peach/40 mb-6 border-b border-peach/10 pb-4">Shipping Information</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <input type="text" placeholder="First Name" className="w-full bg-transparent border-b border-peach/20 py-3 text-sm focus:outline-none focus:border-peach transition-colors placeholder:text-peach/30" required />
                  <input type="text" placeholder="Last Name" className="w-full bg-transparent border-b border-peach/20 py-3 text-sm focus:outline-none focus:border-peach transition-colors placeholder:text-peach/30" required />
                </div>
                <input type="email" placeholder="Email Address" className="w-full bg-transparent border-b border-peach/20 py-3 text-sm focus:outline-none focus:border-peach transition-colors placeholder:text-peach/30" required />
                <input type="text" placeholder="Shipping Address" className="w-full bg-transparent border-b border-peach/20 py-3 text-sm focus:outline-none focus:border-peach transition-colors placeholder:text-peach/30" required />
                <div className="grid grid-cols-2 gap-6">
                  <input type="text" placeholder="City" className="w-full bg-transparent border-b border-peach/20 py-3 text-sm focus:outline-none focus:border-peach transition-colors placeholder:text-peach/30" required />
                  <input type="text" placeholder="Postal Code" className="w-full bg-transparent border-b border-peach/20 py-3 text-sm focus:outline-none focus:border-peach transition-colors placeholder:text-peach/30" required />
                </div>
              </form>
            </section>

            {/* Payment Options */}
            <section>
              <h2 className="text-[10px] tracking-[0.3em] uppercase text-peach/40 mb-6 border-b border-peach/10 pb-4">Payment Method</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <button 
                  onClick={() => setPaymentMethod('card')}
                  className={`flex flex-col items-center gap-3 p-4 border transition-colors ${paymentMethod === 'card' ? 'border-peach bg-peach/5' : 'border-peach/10 hover:border-peach/30'}`}
                >
                  <CreditCard size={20} strokeWidth={1.5} />
                  <span className="text-[9px] tracking-widest uppercase">Card</span>
                </button>
                <button 
                  onClick={() => setPaymentMethod('upi')}
                  className={`flex flex-col items-center gap-3 p-4 border transition-colors ${paymentMethod === 'upi' ? 'border-peach bg-peach/5' : 'border-peach/10 hover:border-peach/30'}`}
                >
                  <Smartphone size={20} strokeWidth={1.5} />
                  <span className="text-[9px] tracking-widest uppercase">UPI</span>
                </button>
                <button 
                  onClick={() => setPaymentMethod('emi')}
                  className={`flex flex-col items-center gap-3 p-4 border transition-colors ${paymentMethod === 'emi' ? 'border-peach bg-peach/5' : 'border-peach/10 hover:border-peach/30'}`}
                >
                  <Banknote size={20} strokeWidth={1.5} />
                  <span className="text-[9px] tracking-widest uppercase">EMI</span>
                </button>
                <button 
                  onClick={() => setPaymentMethod('netbanking')}
                  className={`flex flex-col items-center gap-3 p-4 border transition-colors ${paymentMethod === 'netbanking' ? 'border-peach bg-peach/5' : 'border-peach/10 hover:border-peach/30'}`}
                >
                  <Landmark size={20} strokeWidth={1.5} />
                  <span className="text-[9px] tracking-widest uppercase">Net Banking</span>
                </button>
              </div>

              {/* Dynamic Payment Fields */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={paymentMethod}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {paymentMethod === 'card' && (
                    <div className="space-y-6">
                      <input type="text" placeholder="Card Number" className="w-full bg-transparent border-b border-peach/20 py-3 text-sm focus:outline-none focus:border-peach transition-colors placeholder:text-peach/30" />
                      <div className="grid grid-cols-2 gap-6">
                        <input type="text" placeholder="MM/YY" className="w-full bg-transparent border-b border-peach/20 py-3 text-sm focus:outline-none focus:border-peach transition-colors placeholder:text-peach/30" />
                        <input type="text" placeholder="CVV" className="w-full bg-transparent border-b border-peach/20 py-3 text-sm focus:outline-none focus:border-peach transition-colors placeholder:text-peach/30" />
                      </div>
                      <input type="text" placeholder="Name on Card" className="w-full bg-transparent border-b border-peach/20 py-3 text-sm focus:outline-none focus:border-peach transition-colors placeholder:text-peach/30" />
                    </div>
                  )}

                  {paymentMethod === 'upi' && (
                    <div className="space-y-6">
                      <p className="text-sm font-light text-peach/60 mb-4">Enter your UPI ID to receive a payment request on your UPI app.</p>
                      <input type="text" placeholder="example@upi" className="w-full bg-transparent border-b border-peach/20 py-3 text-sm focus:outline-none focus:border-peach transition-colors placeholder:text-peach/30" />
                    </div>
                  )}

                  {paymentMethod === 'emi' && (
                    <div className="space-y-6">
                      <p className="text-sm font-light text-peach/60 mb-4">Select your bank for EMI options.</p>
                      <select className="w-full bg-english-blue border-b border-peach/20 py-3 text-sm focus:outline-none focus:border-peach transition-colors text-peach">
                        <option>HDFC Bank EMI</option>
                        <option>ICICI Bank EMI</option>
                        <option>SBI Card EMI</option>
                        <option>Axis Bank EMI</option>
                      </select>
                    </div>
                  )}

                  {paymentMethod === 'netbanking' && (
                    <div className="space-y-6">
                      <p className="text-sm font-light text-peach/60 mb-4">Select your bank for Net Banking.</p>
                      <select className="w-full bg-english-blue border-b border-peach/20 py-3 text-sm focus:outline-none focus:border-peach transition-colors text-peach">
                        <option>State Bank of India</option>
                        <option>HDFC Bank</option>
                        <option>ICICI Bank</option>
                        <option>Axis Bank</option>
                        <option>Kotak Mahindra Bank</option>
                      </select>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </section>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:w-96 border border-peach/10 bg-peach/5 p-8 h-fit sticky top-32">
            <h2 className="font-serif text-2xl mb-8">Order Summary</h2>
            
            <div className="space-y-6 mb-8 max-h-[40vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-peach/20">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="relative w-16 h-20 bg-slate-900 shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="64px"
                      className="object-cover opacity-80"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <h3 className="font-serif text-sm line-clamp-1">{item.name}</h3>
                    <p className="text-[10px] text-peach/60 uppercase tracking-widest mt-1">Qty {item.quantity}</p>
                    <p className="text-xs font-medium tracking-widest mt-2">${item.price * item.quantity}</p>
                  </div>
                </div>
              ))}
              
              {cart.length === 0 && (
                <p className="text-peach/60 text-sm font-light italic">Your cart is empty.</p>
              )}
            </div>

            <div className="border-t border-peach/10 pt-6 space-y-4 text-sm font-light">
              <div className="flex justify-between">
                <span className="text-peach/60">Subtotal</span>
                <span>${cartTotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-peach/60">Shipping (Global)</span>
                <span>Complimentary</span>
              </div>
              <div className="flex justify-between pt-4 border-t border-peach/10 items-end">
                <span className="text-[10px] tracking-[0.2em] uppercase text-peach/60">Total</span>
                <span className="font-serif text-3xl">${cartTotal}</span>
              </div>
            </div>

            <button 
              onClick={handlePlaceOrder}
              disabled={cart.length === 0 || isProcessing}
              className="w-full mt-10 py-4 bg-peach text-english-blue text-[10px] tracking-[0.25em] uppercase font-bold hover:bg-white transition-colors disabled:opacity-50 flex items-center justify-center"
            >
              {isProcessing ? (
                <span className="animate-pulse">Processing...</span>
              ) : (
                'Place Order'
              )}
            </button>

            <div className="mt-6 flex items-center justify-center gap-2 text-peach/40 text-[9px] tracking-widest uppercase">
              <ShieldCheck size={12} /> SSL Encrypted Checkout
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
