import React, { useState } from 'react';
import { RotateCcw, Sparkles, ExternalLink, X } from 'lucide-react';
import { useMerchant } from '../context/MerchantContext';

export const DemoModeBanner: React.FC = () => {
  const { activeScenario, switchScenario, resetDemo, activeWorld, setActiveWorld, openTour } = useMerchant();
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) {
    return null;
  }

  return (
    <aside
      aria-label="Demo Environment Notice"
      className="bg-slate-900 text-slate-200 text-xs border-b border-slate-800 z-40 transition-colors w-full shrink-0"
    >
      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 h-7.5 sm:h-8 flex items-center justify-between gap-1.5 sm:gap-2">
        {/* Left: Persona & Environment Indicator */}
        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 shrink">
          <span className="flex h-2 w-2 relative shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-semibold text-white tracking-wide uppercase text-[9px] sm:text-[10px] bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700/80 shrink-0">
            Demo Sandbox
          </span>
          <div className="text-slate-400 text-[10px] sm:text-[11px] truncate flex items-center gap-1 min-w-0">
            <span className="hidden sm:inline text-slate-500">Persona:</span>
            <strong className="text-slate-200 font-semibold truncate">Abhishek Mobile & Accessories</strong>
            <span className="text-slate-500 hidden xl:inline">• Lucknow MSME Cluster #14</span>
          </div>
        </div>

        {/* Right: Quick Judge & Sandbox Controller Actions */}
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          {/* Quick Scenario Selector */}
          <div className="hidden sm:flex items-center gap-1 bg-slate-800/90 rounded px-1.5 py-0.5 border border-slate-700/70 shadow-xs h-6 sm:h-6.5">
            <span className="text-slate-400 text-[10px] hidden lg:inline font-medium">Scenario:</span>
            <select
              value={activeScenario}
              onChange={(e) => switchScenario(e.target.value as any)}
              className="bg-transparent text-white text-[10px] sm:text-[11px] font-semibold focus:outline-none cursor-pointer pr-1 max-w-[110px] sm:max-w-[160px] lg:max-w-none truncate"
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
            className="flex items-center gap-1 px-2 py-0.5 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white rounded font-semibold text-[10px] sm:text-xs transition-all shadow-xs cursor-pointer h-6 sm:h-6.5 shrink-0"
            title="Start 90-second Guided Judge Tour"
          >
            <Sparkles className="w-3 h-3 text-amber-300 shrink-0" />
            <span>Judge Tour</span>
          </button>

          {/* Switch World View */}
          <button
            onClick={() => setActiveWorld(activeWorld === 'showcase' ? 'app' : 'showcase')}
            className="hidden md:flex items-center gap-1 px-2 py-0.5 bg-slate-800 hover:bg-slate-700 active:bg-slate-850 text-slate-200 hover:text-white rounded font-medium text-[10px] sm:text-[11px] border border-slate-700/80 transition-all cursor-pointer shadow-xs h-6 sm:h-6.5 shrink-0"
          >
            <span>{activeWorld === 'showcase' ? 'Enter App' : 'Public Showcase'}</span>
            <ExternalLink className="w-2.5 h-2.5 text-slate-400 shrink-0" />
          </button>

          {/* Reset Demo State Button */}
          <button
            onClick={resetDemo}
            title="Reset simulated data back to initial state"
            className="hidden lg:flex items-center gap-1 px-1.5 py-0.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded text-[10px] transition-colors cursor-pointer h-6 sm:h-6.5 shrink-0"
          >
            <RotateCcw className="w-3 h-3 shrink-0" />
            <span className="font-medium">Reset</span>
          </button>

          {/* Dismiss Banner Button */}
          <button
            onClick={() => setIsDismissed(true)}
            title="Dismiss top demo sandbox notice"
            className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors cursor-pointer shrink-0"
            aria-label="Dismiss banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
