import React from 'react';
import { RotateCcw, ShieldCheck, Sparkles, ExternalLink } from 'lucide-react';
import { useMerchant } from '../context/MerchantContext';
import { Badge } from '../components/ui/Badge';

export const DemoModeBanner: React.FC = () => {
  const { activeScenario, switchScenario, resetDemo, activeWorld, setActiveWorld, openTour } = useMerchant();

  return (
    <aside
      aria-label="Demo Environment Notice"
      className="bg-slate-900 text-slate-200 text-xs border-b border-slate-800 z-40 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap items-center justify-between gap-2 sm:gap-2.5">
        {/* Left: Persona & Environment Indicator */}
        <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
          <span className="flex h-2 w-2 relative shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-semibold text-white tracking-wide uppercase text-[10px] sm:text-[11px] bg-slate-800 px-2 py-0.5 rounded border border-slate-700/80 shrink-0">
            Demo Sandbox
          </span>
          <div className="text-slate-400 text-[11px] truncate flex items-center gap-1.5 min-w-0">
            <span className="hidden sm:inline">Simulation Persona:</span>
            <strong className="text-slate-200 font-semibold truncate">Abhishek Mobile & Accessories</strong>
            <span className="text-slate-500 hidden md:inline">• Lucknow MSME Cluster #14</span>
          </div>
        </div>

        {/* Right: Quick Judge & Sandbox Controller Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2 ml-auto shrink-0">
          {/* Quick Scenario Selector */}
          <div className="flex items-center gap-1.5 bg-slate-800/90 rounded-lg px-2 py-1 border border-slate-700/70 shadow-xs h-7 sm:h-7.5">
            <span className="text-slate-400 text-[11px] hidden lg:inline font-medium">Scenario:</span>
            <select
              value={activeScenario}
              onChange={(e) => switchScenario(e.target.value as any)}
              className="bg-transparent text-white text-[11px] sm:text-xs font-semibold focus:outline-none cursor-pointer pr-1 max-w-[130px] sm:max-w-[190px] md:max-w-none truncate"
            >
              <option value="abhishek-mobile-crisis" className="bg-slate-900 text-white">
                ⚠️ Working-Capital Squeeze (-₹4.3K)
              </option>
              <option value="healthy-growth" className="bg-slate-900 text-white">
                ✅ Healthy Growth & Stable Cash
              </option>
              <option value="inventory-lockup" className="bg-slate-900 text-white">
                📦 Stagnant Stock Buffer Squeeze
              </option>
            </select>
          </div>

          {/* 90s Judge Tour Trigger */}
          <button
            onClick={openTour}
            className="flex items-center gap-1.5 px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white rounded-lg font-semibold text-[11px] sm:text-xs transition-all shadow-xs cursor-pointer h-7 sm:h-7.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
            <span>Judge Tour</span>
          </button>

          {/* Switch World View */}
          <button
            onClick={() => setActiveWorld(activeWorld === 'showcase' ? 'app' : 'showcase')}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 active:bg-slate-850 text-slate-200 hover:text-white rounded-lg font-medium text-[11px] sm:text-xs border border-slate-700/80 transition-all cursor-pointer shadow-xs h-7 sm:h-7.5"
          >
            <span>{activeWorld === 'showcase' ? 'Enter App' : 'Public Showcase'}</span>
            <ExternalLink className="w-3 h-3 text-slate-400 shrink-0" />
          </button>

          {/* Reset Demo State Button */}
          <button
            onClick={resetDemo}
            title="Reset simulated data back to initial state"
            className="flex items-center gap-1 px-2 py-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg text-xs transition-colors cursor-pointer h-7 sm:h-7.5"
          >
            <RotateCcw className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden lg:inline text-[11px] font-medium">Reset</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
