'use client';

import { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, AlertCircle, X } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info';

type Toast = {
  id: string;
  message: string;
  type: ToastType;
};

type ToastContextType = {
  showToast: (message: string, type?: ToastType) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType = 'success') => {
    const id = `toast_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
    setToasts((prev) => [...prev, { id, message, type }]);

    // Auto-dismiss after 3.5 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Toast Container */}
      <div className="fixed bottom-8 right-8 z-[9999] flex flex-col gap-3 pointer-events-none max-w-sm">
        <AnimatePresence mode="popLayout">
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 60, scale: 0.9 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="pointer-events-auto"
            >
              <div className={`flex items-center gap-3 px-5 py-4 rounded-xl border backdrop-blur-xl shadow-2xl ${
                toast.type === 'success'
                  ? 'bg-english-blue/90 border-gold-accent/30 text-peach'
                  : toast.type === 'error'
                  ? 'bg-english-blue/90 border-red-500/30 text-peach'
                  : 'bg-english-blue/90 border-peach/20 text-peach'
              }`}>
                {/* Icon */}
                <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center ${
                  toast.type === 'success'
                    ? 'bg-gold-accent/20 text-gold-accent'
                    : toast.type === 'error'
                    ? 'bg-red-500/20 text-red-400'
                    : 'bg-peach/10 text-peach/80'
                }`}>
                  {toast.type === 'success' && <Check size={14} strokeWidth={2.5} />}
                  {toast.type === 'error' && <AlertCircle size={14} strokeWidth={2} />}
                  {toast.type === 'info' && <AlertCircle size={14} strokeWidth={2} />}
                </div>

                {/* Message */}
                <span className="text-xs font-sans tracking-wide font-light leading-snug flex-grow">
                  {toast.message}
                </span>

                {/* Dismiss */}
                <button
                  onClick={() => dismissToast(toast.id)}
                  className="flex-shrink-0 p-1 text-peach/40 hover:text-peach transition-colors"
                  aria-label="Dismiss notification"
                >
                  <X size={12} strokeWidth={2} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
