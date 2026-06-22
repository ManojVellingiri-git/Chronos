'use client'
import { useState, useEffect } from 'react';
import { ConsequenceSimulator } from '../../components/consequence-simulator';
import { RescueProtocol } from '../../components/rescue-protocol';
import { TaskDecomposition } from '../../components/task-decomposition';
import { motion } from 'framer-motion';
import { supabase } from '../../lib/supabase/client';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function DashboardContent() {
  const [showSimulator, setShowSimulator] = useState(false);
  const [simulatorData, setSimulatorData] = useState(null);
  const [simLoading, setSimLoading] = useState(false);
  
  const [showRescue, setShowRescue] = useState(false);
  const [rescueData, setRescueData] = useState(null);
  const [rescueLoading, setRescueLoading] = useState(false);
  
  const [task, setTask] = useState<any>(null);
  const [metrics, setMetrics] = useState({ monitored: 4, rescued: 2, reduced: 43, score: 78 });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const searchParams = useSearchParams();
  const view = searchParams.get('view') || 'active';

  useEffect(() => {
    // Phase 4: Supabase Connection - Fetch Real Task
    const fetchTask = async () => {
      try {
        if (process.env.NEXT_PUBLIC_DEMO_MODE === 'true') {
          setTask({ id: "demo-task", title: "Submit Final Vibe2Ship Codebase", risk_score: 98, missing_prob: 91 });
          return;
        }
        const { data, error } = await supabase.from('tasks').select('*').order('risk_score', { ascending: false }).limit(1).single();
        if (error) throw error;
        if (data) setTask(data);
      } catch (e) {
        console.warn("Supabase fetch failed, falling back to demo task.");
        setTask({ id: "demo-task", title: "Submit Final Vibe2Ship Codebase", risk_score: 98, missing_prob: 91 });
      }
    };
    fetchTask();
  }, []);

  const handleSimulate = async () => {
    setShowSimulator(true);
    if (simulatorData || simLoading) return;
    setSimLoading(true);
    try {
      const res = await fetch(`/api/tasks/${task.id}/simulate`, { method: 'POST' });
      const data = await res.json();
      setSimulatorData(data);
    } catch (e) {} finally {
      setSimLoading(false);
    }
  };

  const handleRescue = async () => {
    setShowRescue(true);
    if (rescueData || rescueLoading) return;
    setRescueLoading(true);
    try {
      const res = await fetch(`/api/tasks/${task.id}/rescue`, { method: 'POST' });
      const data = await res.json();
      setRescueData(data);
    } catch (e) {} finally {
      setRescueLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#050505] overflow-hidden text-white relative">
      {/* Mobile Nav Toggle */}
      <div className="md:hidden absolute top-6 right-6 z-50">
        <button aria-label="Toggle Menu" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 bg-white/10 rounded-md">
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#050505] border-r border-white/10 p-6 flex flex-col justify-between transition-transform transform md:translate-x-0 md:static ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div>
          <h2 className="text-xl font-bold tracking-tight mb-8">Chronos.</h2>
          <nav className="space-y-4 text-sm text-neutral-400">
            <Link href="/dashboard" className="block text-white hover:text-red-400 transition-colors" tabIndex={0}>Active Tasks</Link>
            <Link href="/dashboard?view=risk" className="block hover:text-white transition-colors" tabIndex={0}>High Risk</Link>
            <Link href="/dashboard?view=completed" className="block hover:text-white transition-colors" tabIndex={0}>Completed</Link>
          </nav>
        </div>
      </aside>

      {/* Main Execution Area */}
      <main className="flex-1 bg-[#0A0A0A] p-6 md:p-8 overflow-y-auto w-full">
        <header className="mb-8 flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Today's Protocol</h1>
        </header>

        {view === 'risk' && (
          <div className="max-w-3xl mt-8">
            <h2 className="text-2xl font-semibold mb-6">High Risk Tasks</h2>
            <div className="p-6 rounded-2xl border border-red-500/20 bg-red-500/5">
              <h3 className="text-lg font-semibold text-white">Submit Vibe2Ship Project</h3>
              <p className="text-sm text-neutral-400 mt-1">Risk Score: <span className="text-red-500 font-bold">98%</span></p>
              <p className="text-sm text-neutral-400 mt-4">This task is currently being monitored. Open it in Active Tasks to generate interventions.</p>
            </div>
          </div>
        )}

        {view === 'completed' && (
          <div className="max-w-3xl mt-8 text-center p-12 rounded-2xl border border-white/10 bg-white/5">
            <h3 className="text-lg font-semibold text-white mb-2">No completed tasks yet.</h3>
            <p className="text-sm text-neutral-400">Finish your active tasks to build your execution streak.</p>
          </div>
        )}

        {view === 'active' && (
          <>
            {/* EMOTIONAL OUTCOME METRIC */}
            <div className="mb-8 text-neutral-400 text-sm">
              <span className="inline-flex items-center px-3 py-1.5 bg-green-500/10 text-green-400 border border-green-500/20 rounded-md shadow-sm">
                ✨ Chronos has prevented an estimated 54 hours of deadline-related stress.
              </span>
            </div>

            {/* AI ANALYSIS METRICS */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 max-w-3xl">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <p className="text-[10px] md:text-xs text-neutral-400 font-mono mb-1">TASKS MONITORED</p>
                <p className="text-xl md:text-2xl font-semibold">{metrics.monitored}</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <p className="text-[10px] md:text-xs text-neutral-400 font-mono mb-1">DEADLINES RESCUED</p>
                <p className="text-xl md:text-2xl font-semibold text-green-400">{metrics.rescued}</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <p className="text-[10px] md:text-xs text-neutral-400 font-mono mb-1">RISK REDUCED</p>
                <p className="text-xl md:text-2xl font-semibold text-blue-400">{metrics.reduced}%</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <p className="text-[10px] md:text-xs text-neutral-400 font-mono mb-1">EXECUTION SCORE</p>
                <p className="text-xl md:text-2xl font-semibold text-purple-400">{metrics.score}</p>
              </div>
            </div>
            
            <div className="space-y-8 max-w-3xl">
              {/* High Risk Task */}
              {task && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 md:p-6 rounded-2xl border border-red-500/20 bg-red-500/5 relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-1 h-full bg-red-500" />
                  <div className="flex items-center gap-3 mb-6">
                    <div className="px-3 py-1 bg-red-500 text-white text-[10px] md:text-xs font-bold uppercase tracking-wider rounded-sm animate-pulse">
                      Mission Critical Alert
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                      <p className="text-xs text-neutral-400 font-mono uppercase mb-1">Task</p>
                      <h3 className="text-base md:text-lg font-semibold text-white">{task.title}</h3>
                    </div>
                    <div>
                      <p className="text-xs text-neutral-400 font-mono uppercase mb-1">Current Risk</p>
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-mono text-red-500 font-bold">{task.risk_score}%</span>
                        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-neutral-400 font-mono uppercase mb-1">Probability of Missing Deadline</p>
                      <div className="space-y-1 mt-1">
                        <p className="text-base md:text-lg font-semibold text-red-500">
                          {task.missing_prob || 91}% <span className="text-xs md:text-sm font-normal text-neutral-500">without intervention</span>
                        </p>
                        <p className="text-base md:text-lg font-semibold text-green-400">
                          37% <span className="text-xs md:text-sm font-normal text-neutral-500">with Chronos</span>
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-neutral-400 font-mono uppercase mb-1">Recommended Action</p>
                      <p className="text-xs md:text-sm font-semibold text-white bg-white/10 py-1 px-3 rounded inline-block">Start within 15 minutes.</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <button 
                      onClick={handleSimulate}
                      aria-expanded={showSimulator}
                      className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg text-sm transition-colors text-center"
                    >
                      I'll do it tomorrow
                    </button>
                    <button 
                      onClick={handleRescue}
                      aria-expanded={showRescue}
                      className="px-4 py-2 bg-red-500 text-white font-medium rounded-lg text-sm hover:bg-red-600 transition-colors shadow-[0_0_15px_rgba(239,68,68,0.3)] text-center"
                    >
                      Generate Recovery Plan
                    </button>
                  </div>
                </motion.div>
              )}

              {showRescue && (
                <RescueProtocol data={rescueData} loading={rescueLoading} />
              )}

              <div className="pt-8 border-t border-white/10">
                <h2 className="text-xl font-semibold mb-6">AI Decomposition</h2>
                <TaskDecomposition />
              </div>
            </div>
          </>
        )}
      </main>

      <ConsequenceSimulator 
        isOpen={showSimulator} 
        onClose={() => setShowSimulator(false)} 
        data={simulatorData}
        loading={simLoading}
      />
    </div>
  );
}

export default function Dashboard() {
  return (
    <Suspense fallback={<div className="flex h-screen bg-[#050505] items-center justify-center text-white">Loading...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
