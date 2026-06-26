'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Ruler, Maximize, UserSquare2, Fingerprint } from 'lucide-react';

export default function DigitalAtelier() {
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [progress, setProgress] = useState(0);

  const startScan = () => {
    setIsScanning(true);
    setScanComplete(false);
    setProgress(0);
  };

  // Simulate scanning progress
  useEffect(() => {
    if (!isScanning) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsScanning(false);
            setScanComplete(true);
          }, 500);
          return 100;
        }
        return prev + 1;
      });
    }, 40); // 4 seconds total

    return () => clearInterval(interval);
  }, [isScanning]);

  return (
    <div className="w-full max-w-4xl mx-auto border border-peach/10 bg-english-blue p-8 md:p-12 relative overflow-hidden text-peach">
      {/* Decorative background grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(var(--color-peach) 1px, transparent 1px), linear-gradient(90deg, var(--color-peach) 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
      />

      <div className="flex justify-between items-start mb-12 relative z-10">
        <div>
          <h2 className="font-serif text-3xl md:text-4xl text-peach">Digital Atelier</h2>
          <p className="text-[10px] tracking-[0.2em] uppercase text-peach/60 mt-2">Bespoke Fit Technology</p>
        </div>
        <div className="w-12 h-12 border border-peach/20 rounded-full flex items-center justify-center bg-peach/5 text-peach">
          <Fingerprint size={20} strokeWidth={1} />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!isScanning && !scanComplete && (
          <motion.div
            key="start"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col items-center justify-center py-20 text-center relative z-10"
          >
            <div className="w-24 h-24 mb-8 border border-peach/20 rounded-full flex items-center justify-center bg-peach/5 text-peach">
              <UserSquare2 size={32} strokeWidth={1} />
            </div>
            <h3 className="font-serif text-2xl mb-4">Initialize Virtual Tailor</h3>
            <p className="text-sm font-light text-peach/60 max-w-sm mb-10">
              Our AI-driven atelier will calculate your precise measurements to ensure a flawless bespoke drape.
            </p>
            <button 
              onClick={startScan}
              className="text-[10px] tracking-[0.3em] uppercase bg-peach text-english-blue px-8 py-4 hover:bg-white transition-colors flex items-center gap-2"
            >
              <Maximize size={14} /> Calculate Measurements
            </button>
          </motion.div>
        )}

        {isScanning && (
          <motion.div
            key="scanning"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-24 relative z-10"
          >
            {/* Animated scanning rings */}
            <div className="relative w-48 h-48 flex items-center justify-center mb-12">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-t-peach border-r-peach border-b-transparent border-l-transparent"
              />
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute inset-4 rounded-full border border-b-peach/50 border-l-peach/50 border-t-transparent border-r-transparent"
              />
              <div className="font-serif text-4xl font-light">{progress}%</div>
            </div>
            
            <h3 className="text-[10px] tracking-[0.3em] uppercase animate-pulse">Scan In Progress</h3>
            <p className="text-xs text-peach/40 mt-2 font-light">Analyzing anatomical topography...</p>
          </motion.div>
        )}

        {scanComplete && (
          <motion.div
            key="complete"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative z-10"
          >
            <div className="bg-peach/5 border border-peach/10 p-8">
              <div className="flex items-center gap-3 mb-8 pb-4 border-b border-peach/10">
                <Ruler size={16} className="text-peach/60" />
                <h3 className="text-xs tracking-[0.2em] uppercase">Bespoke Profile Saved</h3>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div>
                  <div className="text-[9px] tracking-[0.2em] uppercase text-peach/40 mb-1">Shoulders</div>
                  <div className="font-serif text-2xl">42.5<span className="text-sm font-sans text-peach/60 ml-1">cm</span></div>
                </div>
                <div>
                  <div className="text-[9px] tracking-[0.2em] uppercase text-peach/40 mb-1">Chest</div>
                  <div className="font-serif text-2xl">98.0<span className="text-sm font-sans text-peach/60 ml-1">cm</span></div>
                </div>
                <div>
                  <div className="text-[9px] tracking-[0.2em] uppercase text-peach/40 mb-1">Waist</div>
                  <div className="font-serif text-2xl">78.5<span className="text-sm font-sans text-peach/60 ml-1">cm</span></div>
                </div>
                <div>
                  <div className="text-[9px] tracking-[0.2em] uppercase text-peach/40 mb-1">Inseam</div>
                  <div className="font-serif text-2xl">82.0<span className="text-sm font-sans text-peach/60 ml-1">cm</span></div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-peach/10 flex justify-between items-center">
                <p className="text-xs text-peach/60 font-light">
                  Your pattern block has been generated and linked to your client ID.
                </p>
                <button 
                  onClick={() => {
                    setIsScanning(false);
                    setScanComplete(false);
                  }}
                  className="text-[10px] tracking-[0.2em] uppercase text-peach border border-peach/20 px-4 py-2 hover:bg-peach/10 transition-colors"
                >
                  Recalibrate
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
