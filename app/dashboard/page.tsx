'use client'
import { useState } from 'react';
import { ConsequenceSimulator } from '../../components/consequence-simulator';
import { RescueProtocol } from '../../components/rescue-protocol';
import { TaskDecomposition } from '../../components/task-decomposition';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const [showSimulator, setShowSimulator] = useState(false);
  const [showRescue, setShowRescue] = useState(false);

  return (
    <div className="flex h-screen bg-[#050505] overflow-hidden text-white">
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-white/10 p-6 flex flex-col justify-between hidden md:flex">
        <div>
          <h2 className="text-xl font-bold tracking-tight mb-8">Chronos.</h2>
          <nav className="space-y-4 text-sm text-neutral-400">
            <p className="text-white cursor-pointer hover:text-white transition-colors">Active Tasks</p>
            <p className="cursor-pointer hover:text-white transition-colors">High Risk</p>
            <p className="cursor-pointer hover:text-white transition-colors">Completed</p>
          </nav>
        </div>
      </aside>

      {/* Main Execution Area */}
      <main className="flex-1 bg-[#0A0A0A] p-8 overflow-y-auto">
        <header className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-semibold tracking-tight">Today's Protocol</h1>
          <div className="px-3 py-1 rounded-full bg-red-500/10 text-red-500 border border-red-500/20 text-xs font-mono">
            Demo Mode Active
          </div>
        </header>

        {/* EMOTIONAL OUTCOME METRIC */}
        <div className="mb-8 text-neutral-400 text-sm">
          <span className="inline-flex items-center px-3 py-1.5 bg-green-500/10 text-green-400 border border-green-500/20 rounded-md">
            ✨ Chronos has prevented an estimated 54 hours of deadline-related stress.
          </span>
        </div>

        {/* AI ANALYSIS METRICS */}
        <div className="grid grid-cols-4 gap-4 mb-10 max-w-3xl">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <p className="text-xs text-neutral-400 font-mono mb-1">TASKS MONITORED</p>
            <p className="text-2xl font-semibold">4</p>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <p className="text-xs text-neutral-400 font-mono mb-1">DEADLINES RESCUED</p>
            <p className="text-2xl font-semibold text-green-400">2</p>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <p className="text-xs text-neutral-400 font-mono mb-1">RISK REDUCED</p>
            <p className="text-2xl font-semibold text-blue-400">43%</p>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <p className="text-xs text-neutral-400 font-mono mb-1">EXECUTION SCORE</p>
            <p className="text-2xl font-semibold text-purple-400">78</p>
          </div>
        </div>
        
        <div className="space-y-8 max-w-3xl">
          {/* High Risk Task */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-2xl border border-red-500/20 bg-red-500/5 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-red-500" />
            <div className="flex items-center gap-3 mb-6">
              <div className="px-3 py-1 bg-red-500 text-white text-xs font-bold uppercase tracking-wider rounded-sm animate-pulse">
                Mission Critical Alert
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <p className="text-xs text-neutral-400 font-mono uppercase mb-1">Task</p>
                <h3 className="text-lg font-semibold text-white">Submit Final Vibe2Ship Codebase</h3>
              </div>
              <div>
                <p className="text-xs text-neutral-400 font-mono uppercase mb-1">Current Risk</p>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-mono text-red-500 font-bold">98%</span>
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                </div>
              </div>
              <div>
                <p className="text-xs text-neutral-400 font-mono uppercase mb-1">Probability of Missing Deadline</p>
                <div className="space-y-1 mt-1">
                  <p className="text-lg font-semibold text-red-500">91% <span className="text-sm font-normal text-neutral-500">without intervention</span></p>
                  <p className="text-lg font-semibold text-green-400">37% <span className="text-sm font-normal text-neutral-500">with Chronos</span></p>
                </div>
              </div>
              <div>
                <p className="text-xs text-neutral-400 font-mono uppercase mb-1">Recommended Action</p>
                <p className="text-sm font-semibold text-white bg-white/10 py-1 px-3 rounded inline-block">Start within 15 minutes.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={() => setShowSimulator(true)}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg text-sm transition-colors"
              >
                I'll do it tomorrow
              </button>
              <button 
                onClick={() => setShowRescue(true)}
                className="px-4 py-2 bg-red-500 text-white font-medium rounded-lg text-sm hover:bg-red-600 transition-colors shadow-[0_0_15px_rgba(239,68,68,0.3)]"
              >
                Generate Recovery Plan
              </button>
            </div>
          </motion.div>

          {showRescue && (
            <RescueProtocol data={{
              subject: "Extension Request: Vibe2Ship Codebase",
              body: "Hi Team,\n\nI am writing to request a brief 48-hour extension. We encountered an unexpected technical scope increase regarding the AI Agent integration.\n\nI take full ownership and will have it delivered by Friday EOD.",
              recovery_action: "Send this email immediately, then step away from your desk for 15 minutes."
            }} />
          )}

          <div className="pt-8 border-t border-white/10">
            <h2 className="text-xl font-semibold mb-6">AI Decomposition</h2>
            <TaskDecomposition />
          </div>
        </div>
      </main>

      <ConsequenceSimulator 
        isOpen={showSimulator} 
        onClose={() => setShowSimulator(false)} 
        data={{
          day_1: "Immediate anxiety surge. Skipped breakfast to worry. You feel paralyzed.",
          day_3: "Quality drops 40%. Canceled weekend plans to catch up, but still didn't start.",
          day_7: "Deadline missed. Trust fractured with management. Project marked as failed."
        }} 
      />
    </div>
  );
}
