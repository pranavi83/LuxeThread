'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Award, Clock, MapPin, QrCode } from 'lucide-react';

interface DigitalPassportProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
}

export default function DigitalPassport({ isOpen, onClose, productName }: DigitalPassportProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-english-blue/80 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 w-full md:w-[500px] h-full bg-english-blue border-l border-peach/10 z-50 overflow-y-auto"
          >
            <div className="p-8">
              {/* Header */}
              <div className="flex justify-between items-center mb-12">
                <div>
                  <h2 className="font-serif text-2xl text-peach">Provenance</h2>
                  <div className="text-[9px] tracking-[0.2em] uppercase text-peach/60 mt-1">Digital Product Passport</div>
                </div>
                <button 
                  onClick={onClose}
                  className="p-2 text-peach/60 hover:text-peach transition-colors rounded-full hover:bg-peach/5"
                >
                  <X size={20} strokeWidth={1.5} />
                </button>
              </div>

              {/* Certificate Card */}
              <div className="border border-peach/20 bg-gradient-to-br from-peach/5 to-transparent p-8 mb-12 relative overflow-hidden">
                <div className="absolute -right-6 -bottom-6 opacity-5">
                  <Award size={160} strokeWidth={0.5} />
                </div>
                
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-full border border-peach/30 flex items-center justify-center font-serif text-xl text-peach">
                    NS
                  </div>
                  <div>
                    <div className="text-[8px] tracking-[0.3em] uppercase text-peach/40">Certificate of Authenticity</div>
                    <div className="text-sm text-peach font-medium mt-1">No. 000491-A</div>
                  </div>
                </div>
                
                <h3 className="font-serif text-3xl text-peach leading-tight mb-2">{productName}</h3>
                <p className="text-peach/60 text-xs font-light leading-relaxed">
                  This garment has been authenticated and recorded on the NS Luxe Thread ledger. It is guaranteed to be hand-crafted from ethically sourced materials.
                </p>

                <div className="mt-8 pt-6 border-t border-peach/10 flex justify-between items-center">
                  <QrCode size={32} className="text-peach/40" strokeWidth={1} />
                  <div className="text-right">
                    <div className="text-[9px] tracking-[0.2em] uppercase text-peach/40">Minted</div>
                    <div className="text-xs text-peach">October 24, 2026</div>
                  </div>
                </div>
              </div>

              {/* Lifecycle Details */}
              <div className="space-y-8 text-peach">
                <h4 className="text-[10px] tracking-[0.2em] uppercase text-peach/40 mb-4 border-b border-peach/10 pb-2">
                  Garment Lifecycle
                </h4>

                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-peach/5 flex items-center justify-center shrink-0">
                    <MapPin size={14} className="text-peach/80" />
                  </div>
                  <div>
                    <h5 className="font-medium text-sm mb-1">Fabric Sourcing</h5>
                    <p className="text-xs text-peach/60 font-light leading-relaxed">
                      Woven by a multi-generational artisan cooperative in Varanasi, India. The raw Ahimsa silk was cultivated without harming the silkworms.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-peach/5 flex items-center justify-center shrink-0">
                    <Clock size={14} className="text-peach/80" />
                  </div>
                  <div>
                    <h5 className="font-medium text-sm mb-1">Craftsmanship</h5>
                    <p className="text-xs text-peach/60 font-light leading-relaxed">
                      120 hours of intricate Zardozi hand-embroidery and precision tailoring.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-peach/5 flex items-center justify-center shrink-0">
                    <Award size={14} className="text-peach/80" />
                  </div>
                  <div>
                    <h5 className="font-medium text-sm mb-1">The Artisan</h5>
                    <p className="text-xs text-peach/60 font-light leading-relaxed">
                      Lead Tailor: Master Rahim Khan. Embroidery Lead: Aisha Begum.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
