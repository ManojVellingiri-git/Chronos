'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { Copy, Check, Loader2 } from 'lucide-react'

export function RescueProtocol({ data, loading, error }: { data: any, loading: boolean, error?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!data) return;
    navigator.clipboard.writeText(`Subject: ${data.subject}\n\n${data.body}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <motion.div 
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      className="p-6 border border-red-500/30 bg-red-500/5 rounded-2xl relative overflow-hidden mt-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-red-500 font-bold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            Rescue Protocol Engaged
          </h3>
          <p className="text-xs text-neutral-400 mt-1">Failure imminent. Recovery email drafted.</p>
        </div>
        <button 
          onClick={handleCopy}
          disabled={loading || !!error}
          className="px-4 py-2 bg-red-500/10 text-red-500 rounded-md text-sm hover:bg-red-500/20 transition-colors flex items-center gap-2 disabled:opacity-50"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
          {copied ? 'Copied!' : 'Copy to Clipboard'}
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-8 text-red-500 gap-3 font-mono">
          <Loader2 className="animate-spin" size={20} />
          [ DRAFTING EXTENSION REQUEST... ]
        </div>
      ) : error ? (
        <div className="text-red-400 text-sm text-center py-4">{error}</div>
      ) : data ? (
        <>
          <div className="p-4 bg-black/50 border border-white/5 rounded-lg font-mono text-sm text-neutral-300">
            <p className="mb-2"><span className="text-neutral-500">Subject:</span> {data.subject}</p>
            <p className="whitespace-pre-wrap">{data.body}</p>
          </div>
          
          <div className="mt-4 text-xs text-neutral-500 border-t border-white/5 pt-4">
            <strong>Next Step:</strong> {data.recovery_action}
          </div>
        </>
      ) : null}
    </motion.div>
  )
}
