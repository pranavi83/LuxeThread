'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronRight, Package, Sparkles, Shirt } from 'lucide-react';

type Step = 1 | 2 | 3;

interface Item {
  id: string;
  name: string;
  price: number;
  description: string;
}

const BASE_GARMENTS: Item[] = [
  { id: 'g1', name: 'Elysian Silk Dress', price: 1200, description: 'Hand-woven raw silk with asymmetric drape.' },
  { id: 'g2', name: 'Aether Tailored Blazer', price: 950, description: 'Structured wool-blend with satin lapels.' },
  { id: 'g3', name: 'Imperial Trench', price: 1500, description: 'Double-breasted trench in weather-treated gabardine.' },
];

const ACCESSORIES: Item[] = [
  { id: 'a1', name: 'Woven Leather Belt', price: 250, description: 'Artisan-crafted waist cincher.' },
  { id: 'a2', name: 'Silk Pocket Square', price: 120, description: 'Hand-rolled edges, abstract print.' },
  { id: 'a3', name: 'None', price: 0, description: 'Keep it minimalist.' },
];

const PACKAGING: Item[] = [
  { id: 'p1', name: 'Signature NS Box', price: 0, description: 'Our complimentary luxury unboxing experience.' },
  { id: 'p2', name: 'Heritage Wooden Trunk', price: 300, description: 'Keepsake mahogany box with velvet lining.' },
];

export default function ClothingBouquet() {
  const [step, setStep] = useState<Step>(1);
  const [selectedGarment, setSelectedGarment] = useState<Item | null>(null);
  const [selectedAccessory, setSelectedAccessory] = useState<Item | null>(null);
  const [selectedPackaging, setSelectedPackaging] = useState<Item | null>(null);

  const calculateTotal = () => {
    return (selectedGarment?.price || 0) + (selectedAccessory?.price || 0) + (selectedPackaging?.price || 0);
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3) as Step);
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1) as Step);

  const renderOptions = (items: Item[], selected: Item | null, onSelect: (item: Item) => void) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
      {items.map((item) => {
        const isSelected = selected?.id === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onSelect(item)}
            className={`text-left p-6 border transition-all duration-300 ${
              isSelected 
                ? 'border-peach bg-peach/5' 
                : 'border-peach/10 hover:border-peach/30 hover:bg-peach/5'
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-serif text-xl text-peach">{item.name}</h4>
              {isSelected && <Check size={18} className="text-peach" />}
            </div>
            <p className="text-peach/60 text-sm font-light mb-4">{item.description}</p>
            <p className="text-peach tracking-widest text-xs uppercase">
              {item.price === 0 ? 'Complimentary' : `$${item.price}`}
            </p>
          </button>
        );
      })}
    </div>
  );

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 text-peach">
      {/* Main Builder Area */}
      <div className="flex-1">
        <div className="mb-12">
          <h2 className="font-serif text-3xl md:text-5xl mb-4 text-peach tracking-wide">
            Curate Your Bouquet
          </h2>
          <p className="text-peach/60 font-light text-sm max-w-md">
            Assemble your bespoke ensemble. Each element is meticulously chosen to complement the next.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center justify-between mb-12 relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-px bg-peach/10 -z-10" />
          <div 
            className="absolute left-0 top-1/2 -translate-y-1/2 h-px bg-peach transition-all duration-500 ease-in-out -z-10" 
            style={{ width: `${((step - 1) / 2) * 100}%` }}
          />
          
          {[1, 2, 3].map((s) => (
            <div 
              key={s} 
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs transition-colors duration-300 ${
                step >= s ? 'bg-peach text-english-blue' : 'bg-english-blue border border-peach/20 text-peach/40'
              }`}
            >
              {s === 1 ? <Shirt size={14} /> : s === 2 ? <Sparkles size={14} /> : <Package size={14} />}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="w-full"
              >
                <div className="text-[10px] tracking-[0.3em] uppercase text-peach/60 mb-2">Step 01</div>
                <h3 className="font-serif text-2xl text-peach mb-6">The Foundation</h3>
                {renderOptions(BASE_GARMENTS, selectedGarment, (item) => {
                  setSelectedGarment(item);
                  setTimeout(nextStep, 400);
                })}
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="w-full"
              >
                <div className="text-[10px] tracking-[0.3em] uppercase text-peach/60 mb-2">Step 02</div>
                <h3 className="font-serif text-2xl text-peach mb-6">Complementary Accents</h3>
                {renderOptions(ACCESSORIES, selectedAccessory, (item) => {
                  setSelectedAccessory(item);
                  setTimeout(nextStep, 400);
                })}
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="w-full"
              >
                <div className="text-[10px] tracking-[0.3em] uppercase text-peach/60 mb-2">Step 03</div>
                <h3 className="font-serif text-2xl text-peach mb-6">Presentation</h3>
                {renderOptions(PACKAGING, selectedPackaging, setSelectedPackaging)}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-8 pt-8 border-t border-peach/10">
          <button 
            onClick={prevStep}
            className={`text-xs tracking-widest uppercase transition-opacity ${step === 1 ? 'opacity-0 pointer-events-none' : 'opacity-100 hover:text-white'}`}
          >
            ← Previous
          </button>
          
          {step === 3 && selectedPackaging ? (
            <button className="flex items-center gap-2 text-xs tracking-widest uppercase bg-peach text-english-blue px-6 py-3 hover:bg-white transition-colors">
              Confirm Bouquet <ChevronRight size={14} />
            </button>
          ) : (
            <button 
              onClick={nextStep}
              className={`text-xs tracking-widest uppercase transition-opacity flex items-center gap-2 ${
                (step === 1 && !selectedGarment) || (step === 2 && !selectedAccessory) 
                  ? 'opacity-30 pointer-events-none' 
                  : 'opacity-100 hover:text-white'
              }`}
            >
              Next →
            </button>
          )}
        </div>
      </div>

      {/* Summary Panel */}
      <div className="lg:w-80 border-l border-peach/10 pl-0 lg:pl-12 flex flex-col pt-2 lg:pt-0 mt-12 lg:mt-0 border-t lg:border-t-0">
        <h3 className="font-serif text-2xl mb-8">Summary</h3>
        
        <div className="flex-1 flex flex-col gap-6">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-[9px] tracking-[0.2em] uppercase text-peach/40 mb-1">Garment</div>
              <div className="text-sm">{selectedGarment?.name || '—'}</div>
            </div>
            <div className="text-sm">{selectedGarment ? `$${selectedGarment.price}` : ''}</div>
          </div>
          
          <div className="flex justify-between items-start">
            <div>
              <div className="text-[9px] tracking-[0.2em] uppercase text-peach/40 mb-1">Accessory</div>
              <div className="text-sm">{selectedAccessory?.name || '—'}</div>
            </div>
            <div className="text-sm">{selectedAccessory ? `$${selectedAccessory.price}` : ''}</div>
          </div>
          
          <div className="flex justify-between items-start">
            <div>
              <div className="text-[9px] tracking-[0.2em] uppercase text-peach/40 mb-1">Packaging</div>
              <div className="text-sm">{selectedPackaging?.name || '—'}</div>
            </div>
            <div className="text-sm">{selectedPackaging ? (selectedPackaging.price === 0 ? 'Complimentary' : `$${selectedPackaging.price}`) : ''}</div>
          </div>
        </div>

        <div className="pt-6 border-t border-peach/10 mt-8 flex justify-between items-end">
          <div className="text-[10px] tracking-[0.2em] uppercase text-peach/60">Estimated Total</div>
          <div className="font-serif text-3xl">${calculateTotal()}</div>
        </div>
      </div>
    </div>
  );
}
