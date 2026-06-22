'use client'
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export function TaskDecomposition() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [steps, setSteps] = useState<any[]>([]);

  const handleDecompose = () => {
    if (!input.trim()) return;
    setLoading(true);
    setSteps([]);
    // Mock Demo Mode response
    setTimeout(() => {
      setSteps([
        { title: "Research company recent news", estimated_minutes: 15, psychological_barrier: "Fear of not knowing enough" },
        { title: "Outline top 3 stories", estimated_minutes: 10, psychological_barrier: "Perfectionism in writing" },
        { title: "Practice answers out loud", estimated_minutes: 15, psychological_barrier: "Feeling awkward" },
        { title: "Do a mock interview", estimated_minutes: 15, psychological_barrier: "Anxiety of evaluation" },
        { title: "Review notes and sleep", estimated_minutes: 5, psychological_barrier: "Overthinking" },
      ]);
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g. Prepare for YC Interview"
          className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors"
          onKeyDown={(e) => e.key === 'Enter' && handleDecompose()}
        />
        <button 
          onClick={handleDecompose}
          disabled={loading || !input}
          className="px-6 py-3 bg-white text-black font-medium rounded-lg disabled:opacity-50 hover:bg-neutral-200 transition-colors flex items-center justify-center min-w-[140px]"
        >
          {loading ? <Loader2 className="animate-spin" size={20} /> : "Decompose"}
        </button>
      </div>

      <AnimatePresence>
        {steps.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            {steps.map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="p-4 rounded-lg bg-white/5 border border-white/5 flex items-start gap-4"
              >
                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs font-mono shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <div>
                  <h4 className="font-medium text-white">{step.title}</h4>
                  <div className="flex items-center gap-3 mt-1 text-xs text-neutral-400">
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      {step.estimated_minutes} min
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                      Barrier: {step.psychological_barrier}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
