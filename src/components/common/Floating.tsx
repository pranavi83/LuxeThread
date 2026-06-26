'use client';
import { motion } from 'framer-motion';
import { ReactNode, useEffect, useState } from 'react';

export default function Floating({ children, className = '' }: { children: ReactNode, className?: string }) {
  const [duration, setDuration] = useState(5);

  useEffect(() => {
    setDuration(Math.random() * 3 + 4);
  }, []);

  return (
    <motion.div
      className={className}
      animate={{ y: [0, -15, 0], rotate: [0, 1, -1, 0] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}
