import Link from 'next/link';

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-[#0A0A0A]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-500/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="z-10 text-center space-y-6 max-w-3xl px-4">
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white">
          Execution, <br/><span className="text-neutral-500">Not Organization.</span>
        </h1>
        <p className="text-xl text-neutral-400 max-w-xl mx-auto font-light">
          Chronos is an Active Execution Agent that predicts failure, intervenes psychologically, and does the work with you.
        </p>
        <div className="pt-8 flex gap-4 justify-center">
          <Link href="/dashboard" className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:scale-105 transition-transform inline-flex items-center gap-2">
            Initialize Agent
          </Link>
        </div>
      </div>
    </main>
  );
}
