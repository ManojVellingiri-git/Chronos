'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'

interface SimulatorProps {
  isOpen: boolean;
  onClose: () => void;
  data: { day_1: string; day_3: string; day_7: string } | null;
  loading: boolean;
  error?: string;
}

export function ConsequenceSimulator({ isOpen, onClose, data, loading, error }: SimulatorProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEsc);
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
        animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
        role="dialog"
        aria-modal="true"
        aria-label="Consequence Simulator"
      >
        <div className="max-w-4xl w-full p-8 max-h-[90vh] overflow-y-auto pb-12">
          <h2 className="text-center text-red-500 font-mono text-sm tracking-widest uppercase mb-12 animate-pulse">
            Simulation Running
          </h2>
          
          {loading ? (
            <div className="flex justify-center text-red-500 animate-pulse font-mono">
              [ SYNTHESIZING FUTURE CONSEQUENCES... ]
            </div>
          ) : error ? (
            <div className="text-center text-red-400">{error}</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <TimelineCard delay={0.2} title="Tomorrow" desc={data?.day_1 || ""} />
              <TimelineCard delay={0.6} title="In 3 Days" desc={data?.day_3 || ""} />
              <TimelineCard delay={1.0} title="Next Week" desc={data?.day_7 || ""} />
            </div>
          )}

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="mt-16 flex flex-col md:flex-row justify-center gap-6"
          >
            <button onClick={onClose} className="px-6 py-3 text-neutral-400 hover:text-white transition-colors">
              Accept Fate & Snooze
            </button>
            <button onClick={onClose} className="px-8 py-3 bg-white text-black font-semibold rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-105 transition-transform">
              Reject Timeline (Start Working)
            </button>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

function TimelineCard({ title, desc, delay }: { title: string, desc: string, delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, type: "spring", bounce: 0.4 }}
      className="p-6 rounded-xl border border-white/10 bg-white/5"
    >
      <h3 className="text-lg font-semibold mb-4 text-white">{title}</h3>
      <p className="text-neutral-400 text-sm leading-relaxed">{desc}</p>
    </motion.div>
  )
}
