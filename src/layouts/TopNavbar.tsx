import React, { useState, useRef, useEffect } from 'react';
import {
  Compass,
  Languages,
  LayoutDashboard,
  Presentation,
  Play,
  Menu,
  X,
  ChevronDown,
  RefreshCw,
  ExternalLink,
  RotateCcw,
  CheckSquare,
} from 'lucide-react';
import { useMerchant } from '../context/MerchantContext';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { DEMO_SCENARIOS } from '../mock/demoData';
import type { BusinessScenarioId } from '../types';

interface TopNavbarProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}) => {
  const {
    activeWorld,
    setActiveWorld,
    profile,
    openTour,
    activeScenario,
    switchScenario,
    resetDemo,
    opportunities,
    actions,
    setActiveAppTab,
    language,
    setLanguage,
    openAssistant,
    setIsBriefingOpen,
  } = useMerchant();

  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [isScenarioOpen, setIsScenarioOpen] = useState(false);
  const statusRef = useRef<HTMLDivElement>(null);
  const scenarioRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (statusRef.current && !statusRef.current.contains(e.target as Node)) {
        setIsStatusOpen(false);
      }
      if (scenarioRef.current && !scenarioRef.current.contains(e.target as Node)) {
        setIsScenarioOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const activeScenarioObj = DEMO_SCENARIOS.find((s) => s.id === activeScenario) || DEMO_SCENARIOS[0];
  const pendingActionsCount = actions.filter((a) => a.status === 'AWAITING_APPROVAL' || a.status === 'DRAFT').length;

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 gap-1.5 sm:gap-3">
          {/* Logo & Brand */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0 shrink">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`inline-flex items-center justify-center w-8 h-8 -ml-1 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer shrink-0 ${
                activeWorld === 'showcase' ? 'lg:hidden' : 'md:hidden'
              }`}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <div
              onClick={() => setActiveWorld('showcase')}
              className="flex items-center gap-2 cursor-pointer group min-w-0 select-none"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-xs group-hover:bg-indigo-700 transition-colors shrink-0">
                <Compass className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1 sm:gap-1.5">
                  <span className="font-bold text-slate-900 tracking-tight text-sm sm:text-base truncate">
                    MerchantMind
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider bg-indigo-50 text-indigo-700 px-1 sm:px-1.5 py-0.2 rounded border border-indigo-200 shrink-0">
                    B2B OS
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 font-medium leading-none hidden xl:block truncate">
                  Fintech Intelligence & Decision Platform
                </p>
              </div>
            </div>
          </div>

          {/* Center: Dual-World Experience Switcher */}
          <div className="hidden lg:flex items-center p-0.5 bg-slate-100/90 rounded-xl border border-slate-200/80 shadow-2xs shrink-0">
            <button
              onClick={() => setActiveWorld('showcase')}
              className={`h-7.5 flex items-center gap-1.5 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeWorld === 'showcase'
                  ? 'bg-white text-indigo-700 shadow-xs border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <Presentation className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
              <span>Public Showcase</span>
            </button>
            <button
              onClick={() => setActiveWorld('app')}
              className={`h-7.5 flex items-center gap-1.5 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeWorld === 'app'
                  ? 'bg-white text-indigo-700 shadow-xs border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
              <span>Command Center</span>
            </button>
          </div>

          {/* Right Actions, Live Telemetry & Scenario Controller */}
          <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 shrink-0">
            {/* Language Switcher */}
            <button
              onClick={() => setLanguage(language === 'hi' ? 'en' : 'hi')}
              className="h-7.5 sm:h-8 inline-flex items-center gap-1 px-1.5 sm:px-2.5 rounded-lg border border-indigo-200 bg-indigo-50/70 hover:bg-indigo-100 text-indigo-800 text-xs font-semibold transition-colors cursor-pointer shadow-2xs shrink-0"
              title="Toggle English / Hindi (Hinglish)"
            >
              <Languages className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
              <span className="font-medium hidden sm:inline">{language === 'hi' ? '🇮🇳 हिंदी' : '🇬🇧 EN'}</span>
              <span className="font-medium sm:hidden text-[11px]">{language === 'hi' ? 'HI' : 'EN'}</span>
            </button>

            {/* AI Vyapar Sahayak Direct Launcher */}
            <button
              onClick={() => openAssistant()}
              className="h-7.5 sm:h-8 inline-flex items-center gap-1 px-2 sm:px-2.5 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-700 hover:to-indigo-700 text-white rounded-lg text-xs font-semibold shadow-xs hover:shadow-cyan-500/20 transition-all cursor-pointer shrink-0"
              title="Open Paytm Vyapar AI Sahayak (Voice & Chat)"
            >
              <span className="shrink-0 text-xs">🤖</span>
              <span className="hidden sm:inline font-medium">{language === 'hi' ? 'AI सहायक' : 'AI Sahayak'}</span>
              <span className="hidden md:inline text-[9px] px-1 py-0.2 bg-white/20 rounded font-mono font-bold leading-none shrink-0">🎙️</span>
            </button>

            {/* 8:00 AM WhatsApp Morning Briefing Modal (Tablet / Desktop) */}
            <button
              onClick={() => setIsBriefingOpen(true)}
              className="hidden md:inline-flex items-center gap-1.5 h-7.5 sm:h-8 px-2 sm:px-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-lg border border-emerald-200 text-xs font-semibold transition-colors cursor-pointer shrink-0"
              title="View 8:00 AM WhatsApp Daily Briefing & Audio Note"
            >
              <span className="shrink-0">📱</span>
              <span className="hidden lg:inline">WhatsApp</span>
              <span className="text-[10px] text-emerald-700 font-mono font-semibold">8 AM</span>
            </button>

            {/* Live Telemetry Indicator & Status Popover */}
            <div className="relative" ref={statusRef}>
              <button
                onClick={() => setIsStatusOpen(!isStatusOpen)}
                className="h-7.5 sm:h-8 inline-flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-2.5 bg-emerald-50 hover:bg-emerald-100/80 text-emerald-800 rounded-lg border border-emerald-200 text-xs font-medium transition-colors cursor-pointer shrink-0"
                title="Click to view live system telemetry status"
              >
                <span className="flex h-2 w-2 relative shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="hidden md:inline font-mono text-[11px] font-semibold">LIVE</span>
                <span className="text-slate-400 hidden md:inline">•</span>
                <span className="text-emerald-700 text-xs font-semibold whitespace-nowrap">6/6</span>
                <ChevronDown className="w-3 h-3 text-emerald-600 shrink-0 hidden sm:inline" />
              </button>

              {/* Compact System Status Dropdown */}
              {isStatusOpen && (
                <div className="absolute right-0 mt-2 w-80 max-w-[calc(100vw-1.5rem)] bg-white rounded-2xl shadow-xl border border-slate-200 p-4 space-y-3 z-50 text-xs animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                      <strong className="text-slate-900 font-bold">SYSTEM TELEMETRY STATUS</strong>
                    </div>
                    <Badge variant="emerald" size="sm">ACTIVE</Badge>
                  </div>

                  <div className="space-y-2 text-slate-600">
                    <div className="flex justify-between items-center py-1 border-b border-slate-50">
                      <span>Merchant Monitoring:</span>
                      <strong className="text-emerald-700 font-semibold font-mono">ACTIVE (Continuous)</strong>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-slate-50">
                      <span>Connected Sources:</span>
                      <strong className="text-slate-900 font-mono">6 / 6 Healthy</strong>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-slate-50">
                      <span>Last Synchronization:</span>
                      <strong className="text-slate-700 font-mono">32 sec ago</strong>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-slate-50">
                      <span>Signals Evaluated:</span>
                      <strong className="text-slate-900 font-mono">24 Heuristics</strong>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-slate-50">
                      <span>Opportunities Detected:</span>
                      <strong className="text-indigo-600 font-mono">{opportunities.length} Active</strong>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span>Actions Awaiting Approval:</span>
                      <strong className="text-amber-600 font-mono">{pendingActionsCount} Pending</strong>
                    </div>
                  </div>

                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/80 text-[11px] text-slate-500 leading-snug">
                    <span className="font-semibold text-slate-700 block mb-0.5">Deterministic Guardrail:</span>
                    All financial values are strictly reconciled against canonical source records with zero probabilistic hallucination.
                  </div>

                  <div className="pt-1 flex items-center justify-between">
                    <button
                      onClick={() => {
                        setIsStatusOpen(false);
                        setActiveWorld('app');
                        setActiveAppTab('connections');
                      }}
                      className="text-indigo-600 hover:text-indigo-800 font-semibold text-[11px] flex items-center gap-1 cursor-pointer"
                    >
                      <span>Manage Connections</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                    <span className="text-[10px] text-slate-400 font-mono">Demo Mode</span>
                  </div>
                </div>
              )}
            </div>

            {/* Demo Scenario Controller Dropdown (Tablet & Desktop) */}
            <div className="relative hidden md:block" ref={scenarioRef}>
              <button
                onClick={() => setIsScenarioOpen(!isScenarioOpen)}
                className="h-7.5 sm:h-8 inline-flex items-center gap-1.5 px-2 sm:px-2.5 bg-slate-100 hover:bg-slate-200/70 text-slate-800 rounded-lg border border-slate-200 text-xs font-medium transition-colors cursor-pointer shrink-0"
                title="Switch demo scenarios"
              >
                <span className="text-slate-500 text-[11px] hidden xl:inline">Scenario:</span>
                <span className="font-semibold text-slate-900 truncate max-w-[85px] lg:max-w-[125px]">
                  {activeScenarioObj.name}
                </span>
                <ChevronDown className="w-3 h-3 text-slate-500 shrink-0" />
              </button>

              {/* Scenario Selector Dropdown */}
              {isScenarioOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 max-w-[calc(100vw-1.5rem)] bg-white rounded-2xl shadow-xl border border-slate-200 p-3 space-y-2 z-50 text-xs animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2 px-1">
                    <div>
                      <strong className="text-slate-900 font-bold block">DEMO MODE CONTROLLER</strong>
                      <span className="text-[11px] text-slate-400">Deterministic presentation controls & recoverable sandbox</span>
                    </div>
                    <Badge variant="indigo" size="sm">Judge Controls</Badge>
                  </div>

                  {/* Judge Quick Action Bar */}
                  <div className="p-2 bg-slate-50 rounded-xl border border-slate-200/80 grid grid-cols-2 gap-1.5 text-[11px]">
                    <button
                      onClick={async () => {
                        await resetDemo();
                        setIsScenarioOpen(false);
                      }}
                      className="p-1.5 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg flex items-center gap-1.5 text-slate-700 font-semibold cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3 text-indigo-600 shrink-0" />
                      <span>Reset Demo</span>
                    </button>

                    <button
                      onClick={async () => {
                        await switchScenario('abhishek-mobile-crisis');
                        setIsScenarioOpen(false);
                      }}
                      className="p-1.5 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg flex items-center gap-1.5 text-slate-700 font-semibold cursor-pointer"
                    >
                      <RefreshCw className="w-3 h-3 text-emerald-600 shrink-0" />
                      <span>Restart Scenario</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsScenarioOpen(false);
                        openTour();
                      }}
                      className="p-1.5 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg flex items-center gap-1.5 text-slate-700 font-semibold cursor-pointer"
                    >
                      <Play className="w-3 h-3 text-indigo-600 shrink-0" />
                      <span>Replay Tour</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsScenarioOpen(false);
                        setActiveWorld('app');
                        setActiveAppTab('actions');
                      }}
                      className="p-1.5 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg flex items-center gap-1.5 text-slate-700 font-semibold cursor-pointer"
                    >
                      <CheckSquare className="w-3 h-3 text-cyan-600 shrink-0" />
                      <span>View Actions</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsScenarioOpen(false);
                        setActiveWorld('showcase');
                      }}
                      className="p-1.5 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg col-span-2 flex items-center justify-center gap-1.5 text-slate-700 font-semibold cursor-pointer"
                    >
                      <ExternalLink className="w-3 h-3 text-slate-500 shrink-0" />
                      <span>Return to Public Showcase</span>
                    </button>
                  </div>

                  <div className="space-y-1.5 max-h-80 overflow-y-auto pr-1">
                    {DEMO_SCENARIOS.map((scen) => {
                      const isSelected = activeScenario === scen.id;
                      return (
                        <button
                          key={scen.id}
                          onClick={async () => {
                            await switchScenario(scen.id as BusinessScenarioId);
                            setIsScenarioOpen(false);
                          }}
                          className={`w-full text-left p-2.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                            isSelected
                              ? 'bg-indigo-50/80 border-indigo-300 shadow-2xs'
                              : 'bg-white border-slate-150 hover:bg-slate-50 hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                              {scen.name}
                              {scen.id === 'abhishek-mobile-crisis' && (
                                <Badge variant="rose" size="sm" className="text-[9px] py-0 px-1">FLAGSHIP</Badge>
                              )}
                            </span>
                            <Badge variant={isSelected ? 'indigo' : 'slate'} size="sm">
                              {scen.badge}
                            </Badge>
                          </div>
                          <p className="text-[11px] text-slate-600 mt-1 leading-snug">
                            {scen.headline} — {scen.description}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Launch Guided Tour (Desktop >= 1280px) */}
            <Button
              variant="outline"
              size="sm"
              onClick={openTour}
              className="hidden xl:inline-flex h-7.5 sm:h-8 border-indigo-200 text-indigo-700 hover:bg-indigo-50 text-xs shrink-0"
            >
              <Play className="w-3 h-3 mr-1 text-indigo-600 fill-indigo-600 shrink-0" />
              <span>Judge Tour</span>
            </Button>

            {/* Merchant Persona Badge */}
            <div className="flex items-center gap-1.5 pl-1.5 sm:pl-2 border-l border-slate-200 shrink-0">
              <div
                title={`${profile?.proprietor || 'Abhishek Kumar'} • ${profile?.businessName || 'Abhishek Mobile'}`}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-900 text-white font-bold text-[10px] sm:text-xs flex items-center justify-center shadow-xs shrink-0 select-none cursor-default"
              >
                AK
              </div>
              <div className="hidden 2xl:block text-left">
                <div className="text-xs font-semibold text-slate-900 leading-tight">
                  {profile?.proprietor || 'Abhishek Kumar'}
                </div>
                <div className="text-[10px] text-slate-500 leading-none truncate max-w-[120px]">
                  {profile?.businessName || 'Abhishek Mobile & Accessories'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer (Active for Public Showcase) */}
      {isMobileMenuOpen && activeWorld === 'showcase' && (
        <div className="lg:hidden border-t border-slate-200 bg-white/98 backdrop-blur-md px-3.5 py-3 space-y-3 animate-in fade-in slide-in-from-top-2 duration-150 shadow-lg">
          {/* World Switcher Cards */}
          <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-xl border border-slate-200/80">
            <button
              onClick={() => {
                setActiveWorld('showcase');
                setIsMobileMenuOpen(false);
              }}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold bg-white text-indigo-700 shadow-xs border border-slate-200/60 cursor-pointer"
            >
              <Presentation className="w-4 h-4 text-indigo-500 shrink-0" />
              <span>Public Showcase</span>
            </button>
            <button
              onClick={() => {
                setActiveWorld('app');
                setIsMobileMenuOpen(false);
              }}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 transition-all cursor-pointer"
            >
              <LayoutDashboard className="w-4 h-4 text-indigo-500 shrink-0" />
              <span>Command Center</span>
            </button>
          </div>

          {/* Quick Action Grid */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                openTour();
              }}
              className="p-2.5 bg-indigo-50 text-indigo-700 font-semibold rounded-xl border border-indigo-200 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-indigo-600 text-indigo-600 shrink-0" />
              <span>Judge Tour (90s)</span>
            </button>

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsBriefingOpen(true);
              }}
              className="p-2.5 bg-emerald-50 text-emerald-800 font-semibold rounded-xl border border-emerald-200 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span className="shrink-0">📱</span>
              <span>Morning Briefing</span>
            </button>
          </div>

          {/* Mobile Scenario Switcher Selector */}
          <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1.5 text-xs">
            <div className="flex items-center justify-between text-slate-700 font-semibold text-[11px]">
              <span>DEMO SCENARIO</span>
              <span className="text-[10px] text-slate-400 font-normal">Switch Simulation</span>
            </div>
            <select
              value={activeScenario}
              onChange={async (e) => {
                await switchScenario(e.target.value as any);
                setIsMobileMenuOpen(false);
              }}
              className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs font-medium text-slate-800 focus:outline-none"
            >
              {DEMO_SCENARIOS.map((scen) => (
                <option key={scen.id} value={scen.id}>
                  {scen.name} — {scen.badge}
                </option>
              ))}
            </select>
          </div>

          {/* Quick Persona Info in Drawer */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-slate-900 text-white font-bold text-[10px] flex items-center justify-center">
                AK
              </div>
              <span className="font-medium text-slate-700">{profile?.proprietor || 'Abhishek Kumar'}</span>
            </div>
            <span className="text-[11px] text-slate-400 truncate max-w-[150px]">
              {profile?.businessName || 'Abhishek Mobile & Accessories'}
            </span>
          </div>
        </div>
      )}
    </header>
  );
};
