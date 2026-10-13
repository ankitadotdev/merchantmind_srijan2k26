import React from 'react';
import { RotateCcw, ShieldCheck, Sparkles, ExternalLink } from 'lucide-react';
import { useMerchant } from '../context/MerchantContext';
import { Badge } from '../components/ui/Badge';

export const DemoModeBanner: React.FC = () => {
  const { activeScenario, switchScenario, resetDemo, activeWorld, setActiveWorld, openTour } = useMerchant();

  return (
    <aside aria-label="Demo Environment Notice" className="bg-slate-900 text-slate-200 text-xs px-4 py-2 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 z-40">
      <div className="flex items-center gap-2.5">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="font-semibold text-white tracking-wide uppercase text-[11px] bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
          Demo Environment
        </span>
        <span className="text-slate-400 hidden sm:inline">
          Deterministic Simulation Persona: <strong className="text-slate-200 font-medium">Abhishek Mobile & Accessories</strong> (Hazratganj, Lucknow)
        </span>
      </div>

      <div className="flex items-center gap-2">
        {/* Scenario Switcher */}
        <div className="flex items-center gap-1.5 bg-slate-800/80 rounded-lg px-2 py-1 border border-slate-700/60">
          <span className="text-slate-400 text-[11px] hidden md:inline">Scenario:</span>
          <select
            value={activeScenario}
            onChange={(e) => switchScenario(e.target.value as any)}
            className="bg-transparent text-white text-xs font-medium focus:outline-none cursor-pointer pr-1"
          >
            <option value="abhishek-mobile-crisis" className="bg-slate-900 text-white">
              ⚠️ Abhishek Mobile Working-Capital Squeeze (Default)
            </option>
            <option value="healthy-growth" className="bg-slate-900 text-white">
              ✅ Healthy Growth & Stable Cash
            </option>
            <option value="inventory-lockup" className="bg-slate-900 text-white">
              📦 Acute Dead Stock Lockup
            </option>
          </select>
        </div>

        {/* Guided Tour Trigger */}
        <button
          onClick={openTour}
          className="flex items-center gap-1 px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium text-xs transition-colors shadow-xs"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>90s Judge Tour</span>
        </button>

        {/* World Switcher Pill */}
        <button
          onClick={() => setActiveWorld(activeWorld === 'showcase' ? 'app' : 'showcase')}
          className="flex items-center gap-1 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg font-medium text-xs border border-slate-700 transition-colors"
        >
          <span>{activeWorld === 'showcase' ? 'Enter App' : 'Public Showcase'}</span>
          <ExternalLink className="w-3 h-3 text-slate-400" />
        </button>

        {/* Reset Demo State Button */}
        <button
          onClick={resetDemo}
          title="Reset simulated data back to initial state"
          className="flex items-center gap-1 px-2 py-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg text-xs transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden lg:inline">Reset</span>
        </button>
      </div>
    </aside>
  );
};
