'use client';

import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import FadingVideo from '@/components/common/FadingVideo';
import Floating from '@/components/common/Floating';

const Navbar = () => (
  <nav className="fixed top-6 left-0 w-full px-8 lg:px-16 z-50 flex items-center justify-between">
    <div className="font-heading text-2xl text-white tracking-wide">Aero.</div>
    <div className="zero-g-glass rounded-full px-6 py-2 hidden md:flex gap-8">
      {['Concept', 'Design', 'Physics', 'Launch'].map((link) => (
        <a key={link} href={`#${link.toLowerCase()}`} className="text-xs uppercase tracking-widest text-white/80 hover:text-white transition-colors">
          {link}
        </a>
      ))}
    </div>
    <a href="#explore" className="text-white/80 hover:text-white transition-colors flex items-center gap-2 text-sm">
      <span className="hidden sm:inline">Explore</span>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <line x1="5" y1="12" x2="19" y2="12"></line>
        <polyline points="12 5 19 12 12 19"></polyline>
      </svg>
    </a>
  </nav>
);

const HeroText = () => {
  const text = "Weightless.";
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.4 * i },
    }),
  };
  const child: Variants = {
    visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 12, stiffness: 100 } },
    hidden: { opacity: 0, y: 40 },
  };

  return (
    <motion.h1 
      className="text-7xl md:text-[10rem] font-heading text-white tracking-tighter leading-none"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {text.split("").map((char, index) => (
        <motion.span variants={child} key={index} className="inline-block">
          {char}
        </motion.span>
      ))}
    </motion.h1>
  );
};

export default function Home() {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -150]);

  return (
    <div className="bg-[#141f2d] min-h-screen text-white font-sans selection:bg-peach selection:text-english-blue">
      <Navbar />

      {/* Section 1 — Hero */}
      <section className="relative h-screen w-full flex flex-col items-center justify-center px-4 overflow-hidden bg-english-blue">
        <FadingVideo 
          src="https://videos.pexels.com/video-files/853889/853889-hd_1920_1080_25fps.mp4"
          className="absolute left-1/2 top-0 -translate-x-1/2 min-w-full min-h-full object-cover object-top z-0 opacity-40 mix-blend-screen pointer-events-none"
        />
        
        <div className="relative z-10 flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <Floating>
              <div className="zero-g-glass rounded-full px-5 py-2 mb-10 flex gap-2 items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFDAB9] animate-pulse" />
                <span className="text-[10px] tracking-widest uppercase text-[#FFDAB9]/90">State 001 | Zero-Gravity Engineering</span>
              </div>
            </Floating>
          </motion.div>

          <HeroText />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
          >
            <p className="text-[#FFDAB9] font-light max-w-md mx-auto text-center mt-8 text-sm tracking-widest leading-relaxed uppercase">
              Transcend the pull. A design system built for the void, stripping away the unnecessary to reveal pure form.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Section 2 — The Void / Features */}
      <section className="relative min-h-screen w-full bg-[#141f2d] py-32 px-8 lg:px-16 overflow-hidden">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-12 gap-6 relative">
          
          {/* Card 1 */}
          <motion.div style={{ y: y1 }} className="col-span-12 md:col-span-4 mt-20">
            <Floating>
              <div className="zero-g-glass rounded-[2rem] p-10 h-80 flex flex-col justify-end">
                <h3 className="font-heading text-4xl mb-4 text-white">Frictionless</h3>
                <p className="text-white/60 font-light text-sm">Interactions that glide without resistance.</p>
              </div>
            </Floating>
          </motion.div>

          {/* Empty column for space */}
          <div className="hidden md:block col-span-1" />

          {/* Card 2 */}
          <motion.div style={{ y: y2 }} className="col-span-12 md:col-span-3 flex justify-center mt-40">
            <Floating>
              <div className="zero-g-glass rounded-full w-64 h-64 flex items-center justify-center">
                <h3 className="font-heading text-3xl text-white">Suspension</h3>
              </div>
            </Floating>
          </motion.div>

          {/* Empty column for space */}
          <div className="hidden md:block col-span-1" />

          {/* Card 3 */}
          <motion.div style={{ y: y3 }} className="col-span-12 md:col-span-3 mt-10">
            <Floating>
              <div className="zero-g-glass rounded-[2.5rem] p-8 h-96 flex flex-col justify-start">
                <h3 className="font-heading text-4xl mb-4 text-white mt-8">Ascent</h3>
                <p className="text-white/60 font-light text-sm">Breaking the baseline grid.</p>
              </div>
            </Floating>
          </motion.div>

        </div>
      </section>
    </div>
  );
}
