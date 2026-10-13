import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Sparkles,
  ChevronRight,
  ChevronLeft,
  X,
  ShieldAlert,
  Calculator,
  CheckSquare,
  Network,
  Activity,
  Zap,
  CheckCircle2,
  LayoutDashboard,
} from 'lucide-react';
import { useMerchant } from '../context/MerchantContext';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { formatINR } from '../utils/formatters';

interface TourStep {
  title: string;
  badge: string;
  icon: React.ComponentType<{ className?: string }>;
  targetId: string;
  targetName: string;
  preferredPlacement: 'top' | 'bottom' | 'left' | 'right' | 'center';
  keyMetricLabel: string;
  keyMetricValue: string;
  metricVariant?: 'default' | 'rose' | 'amber' | 'emerald' | 'indigo' | 'cyan';
  content: React.ReactNode;
  actionLabel: string;
  onApply: () => void;
}

interface PopoverCoords {
  top: number;
  left: number;
  placement: 'top' | 'bottom' | 'left' | 'right' | 'center';
  arrowOffset: number;
}

export const GuidedTourModal: React.FC = () => {
  const {
    isTourOpen,
    closeTour,
    setActiveWorld,
    setActiveAppTab,
    openEvidenceDrawer,
    closeEvidenceDrawer,
  } = useMerchant();

  const [currentStep, setCurrentStep] = useState(0);
  const [coords, setCoords] = useState<PopoverCoords | null>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const steps: TourStep[] = [
    {
      title: '1. The Problem: Working Capital Blindspots',
      badge: 'MSME Reality',
      icon: LayoutDashboard,
      targetId: 'tour-merchant-header',
      targetName: 'Executive Command Center & Store Header',
      preferredPlacement: 'bottom',
      keyMetricLabel: 'The Core Challenge',
      keyMetricValue: 'Rolling Liquidity Squeeze',
      metricVariant: 'rose',
      content: (
        <div className="space-y-2 text-xs text-slate-700">
          <p className="font-semibold text-slate-900">
            India’s 63M+ retail merchants lack real-time runway visibility:
          </p>
          <ul className="space-y-1 text-slate-600 list-disc list-inside text-[11px]">
            <li>Wholesale supplier payment maturities collide with daily operational cashflow</li>
            <li>No dedicated CFO, accounting staff, or real-time runway tools</li>
            <li>Forced into emergency high-interest credit or supplier relationship strain</li>
          </ul>
          <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg text-[11px] text-slate-600">
            <strong className="text-slate-800">MerchantMind&rsquo;s Mission:</strong> Connect everyday business signals into explainable, automated foresight before capital cliffs occur.
          </div>
        </div>
      ),
      actionLabel: 'Meet the Merchant',
      onApply: () => {
        setActiveWorld('app');
        setActiveAppTab('command-center');
        closeEvidenceDrawer();
      },
    },
    {
      title: '2. Merchant Scenario: Abhishek Mobile',
      badge: 'Simulated Persona',
      icon: LayoutDashboard,
      targetId: 'tour-merchant-header',
      targetName: 'Executive Command Center & Store Header',
      preferredPlacement: 'bottom',
      keyMetricLabel: 'Store Scale',
      keyMetricValue: '40+ Daily Txns • ₹1,42,800/mo',
      metricVariant: 'indigo',
      content: (
        <div className="space-y-2 text-xs text-slate-700">
          <p>
            <strong>Abhishek Kumar</strong> runs <em>Abhishek Mobile & Accessories</em> in Hazratganj Market, Lucknow.
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <div className="p-2 bg-indigo-50/60 border border-indigo-200 rounded-lg">
              <span className="text-[10px] text-indigo-800 block font-sans font-medium">Monthly Revenue:</span>
              <strong className="text-slate-900 text-sm">₹1,42,800</strong>
            </div>
            <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="text-[10px] text-slate-500 block font-sans font-medium">Gross Margin:</span>
              <strong className="text-slate-900 text-sm">24.5% (+8.4% MoM)</strong>
            </div>
          </div>
          <p className="text-slate-500 text-[11px]">
            Profitable on paper, but upcoming wholesale supplier obligations create acute cashflow cliffs.
          </p>
        </div>
      ),
      actionLabel: 'Inspect Cash Reality',
      onApply: () => {
        setActiveWorld('app');
        setActiveAppTab('command-center');
        closeEvidenceDrawer();
      },
    },
    {
      title: '3. Financial Squeeze: Available Cash',
      badge: 'Financial Health',
      icon: Activity,
      targetId: 'tour-kpi-cash',
      targetName: 'Available Operating Cash Card',
      preferredPlacement: 'bottom',
      keyMetricLabel: 'Liquid Cash vs Safe Minimum',
      keyMetricValue: '₹40,607 (Buffer: 90% • 11d Runway)',
      metricVariant: 'amber',
      content: (
        <div className="space-y-2 text-xs text-slate-700">
          <p>
            Operating cash balance in SBI Current Account ending in 4910 is dangerously thin:
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <div className="p-2 bg-amber-50/60 border border-amber-200 rounded-lg">
              <span className="text-[10px] text-amber-800 block font-sans font-medium">Available Cash:</span>
              <strong className="text-slate-900 text-sm">{formatINR(40607)}</strong>
            </div>
            <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="text-[10px] text-slate-500 block font-sans font-medium">Safe Reserve:</span>
              <strong className="text-slate-900 text-sm">{formatINR(45000)}</strong>
            </div>
          </div>
          <p className="text-slate-600 text-[11px] leading-relaxed">
            Abhishek holds <strong>₹40,607</strong> in liquid funds with only 11.4 days of operational runway.
          </p>
        </div>
      ),
      actionLabel: 'Inspect 5-Day Cliff',
      onApply: () => {
        setActiveWorld('app');
        setActiveAppTab('command-center');
        closeEvidenceDrawer();
      },
    },
    {
      title: '4. Detection: Impending Liquidity Cliff',
      badge: 'Cashflow Radar',
      icon: ShieldAlert,
      targetId: 'tour-supplier-cliff',
      targetName: 'Impending 5-Day Supplier Cliff Alert',
      preferredPlacement: 'bottom',
      keyMetricLabel: 'Liquidity Deficit Detected',
      keyMetricValue: '-₹4,393 Gap (Due in 5 Days)',
      metricVariant: 'rose',
      content: (
        <div className="space-y-2 text-xs text-slate-700">
          <p>
            In 5 days, wholesale bill <strong>BILL-SUP-201</strong> from Sharma Telecom Distributor falls due for <strong>₹45,000</strong>:
          </p>
          <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-xl space-y-1 font-mono text-xs">
            <div className="flex justify-between">
              <span className="text-rose-900 font-sans">Operating Cash Available:</span>
              <span className="font-bold text-slate-900">{formatINR(40607)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-rose-900 font-sans">Wholesale Bill Due:</span>
              <span className="font-bold text-rose-700">{formatINR(45000)}</span>
            </div>
            <div className="flex justify-between pt-1 border-t border-rose-200 font-bold text-rose-950">
              <span className="font-sans">Immediate Cash Deficit:</span>
              <span>-₹4,393</span>
            </div>
          </div>
          <p className="text-slate-600 text-[11px] leading-relaxed">
            Detected autonomously 5 days in advance, completely avoiding bounced payments or emergency debt.
          </p>
        </div>
      ),
      actionLabel: 'Inspect Evidence',
      onApply: () => {
        setActiveWorld('app');
        setActiveAppTab('command-center');
        closeEvidenceDrawer();
      },
    },
    {
      title: '5. Evidence: Forensic Audit Lineage',
      badge: 'Audit Lineage',
      icon: Calculator,
      targetId: 'tour-evidence-tree',
      targetName: 'Audit & Evidence Explorer (Deterministic Formula)',
      preferredPlacement: 'left',
      keyMetricLabel: 'Forensic Evidence Grounding',
      keyMetricValue: '100% Deterministic Arithmetic',
      metricVariant: 'indigo',
      content: (
        <div className="space-y-2 text-xs text-slate-700">
          <p>
            Every flagged anomaly is backed by immutable source ledger records:
          </p>
          <div className="p-2.5 bg-slate-900 text-slate-100 rounded-xl space-y-1 text-[11px] font-mono">
            <div className="text-indigo-300 font-sans font-semibold">Canonical Source Records:</div>
            <ul className="space-y-0.5 text-slate-300">
              <li>• <strong>BILL-SUP-201:</strong> ₹45,000 Sharma Telecom distributor invoice due in 5 days.</li>
              <li>• <strong>SBI-OP-BAL:</strong> ₹40,607 available operational cash reserve.</li>
              <li>• <strong>PAYTM-DAILY-AVG:</strong> ₹8,450 daily counter inflow run-rate.</li>
            </ul>
          </div>
          <p className="text-slate-600 text-[11px]">
            Zero black-box hallucinations. Verifiable proof at every step.
          </p>
        </div>
      ),
      actionLabel: 'Review Recommendation',
      onApply: () => {
        setActiveWorld('app');
        setActiveAppTab('command-center');
        openEvidenceDrawer('evi_01');
      },
    },
    {
      title: '6. Recommendation: Supplier Payment Restructuring',
      badge: 'Opportunity Engine',
      icon: Zap,
      targetId: 'tour-opportunities-top',
      targetName: 'Ranked Opportunities List',
      preferredPlacement: 'bottom',
      keyMetricLabel: 'Liquidity Buffer Unlocked',
      keyMetricValue: '+₹20,000 Deferral Cushion',
      metricVariant: 'emerald',
      content: (
        <div className="space-y-2 text-xs text-slate-700">
          <p>
            MerchantMind formulates a deterministic operational lever:
          </p>
          <div className="space-y-1.5">
            <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg flex justify-between items-center text-xs">
              <div>
                <strong className="text-slate-900 block">1. 7-Day Payment Split:</strong>
                <span className="text-[10px] text-slate-500">Pay ₹25,000 on Oct 9 + Defer ₹20,000 to Oct 16</span>
              </div>
              <span className="font-mono font-bold text-emerald-700">+₹20,000 Buffer</span>
            </div>
            <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg flex justify-between items-center text-xs">
              <div>
                <strong className="text-slate-900 block">2. Distributor Volume Rebate:</strong>
                <span className="text-[10px] text-slate-500">Quarterly handset tier-2 eligible incentive claim</span>
              </div>
              <span className="font-mono font-bold text-emerald-700">+₹11,200 Rebate</span>
            </div>
          </div>
          <p className="text-emerald-800 font-semibold text-[11px]">
            Restructuring creates an instant <strong>+₹15,607</strong> safe operational cushion without expensive debt!
          </p>
        </div>
      ),
      actionLabel: 'Go to Action Approval',
      onApply: () => {
        closeEvidenceDrawer();
        setActiveWorld('app');
        setActiveAppTab('opportunities');
      },
    },
    {
      title: '7. Action: Human-in-the-Loop Gate',
      badge: 'Decision Matrix',
      icon: CheckSquare,
      targetId: 'tour-action-card',
      targetName: 'Proprietor Action Approval Gate',
      preferredPlacement: 'bottom',
      keyMetricLabel: 'Proprietor Governance',
      keyMetricValue: 'Mandatory Merchant Consent',
      metricVariant: 'indigo',
      content: (
        <div className="space-y-2 text-xs text-slate-700">
          <p>
            Zero unilateral execution: Actions require explicit proprietor consent before dispatch.
          </p>
          <div className="p-2.5 bg-indigo-50/70 border border-indigo-200 rounded-xl space-y-1 text-xs">
            <div className="flex justify-between items-center font-bold text-slate-900 text-xs">
              <span>Action: Sharma Telecom 7-Day Split Proposal</span>
              <Badge variant="indigo" size="sm">Low Friction</Badge>
            </div>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Dispatches formal payment rescheduling terms (₹25K upfront + ₹20K deferred by 7 days) to distributor accounts.
            </p>
          </div>
          <p className="text-slate-600 text-[11px]">
            Click &ldquo;Approve Action&rdquo; to launch the professional confirmation and simulation flow.
          </p>
        </div>
      ),
      actionLabel: 'View Measured Outcome',
      onApply: () => {
        closeEvidenceDrawer();
        setActiveWorld('app');
        setActiveAppTab('actions');
      },
    },
    {
      title: '8. Outcome: Measured Business Delta',
      badge: 'Outcome Verification',
      icon: CheckCircle2,
      targetId: 'tour-outcome-card',
      targetName: 'Closed-Loop Telemetry Verification Panel',
      preferredPlacement: 'top',
      keyMetricLabel: 'Net Transformation',
      keyMetricValue: '-₹4,393 Deficit → +₹15,607 Surplus',
      metricVariant: 'emerald',
      content: (
        <div className="space-y-2 text-xs text-slate-700">
          <p>
            Closed-loop telemetry measures downstream cashflow updates:
          </p>
          <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1.5 text-xs">
            <span className="font-bold text-emerald-950 block text-[11px] uppercase tracking-wider">
              Financial Transformation Measured:
            </span>
            <div className="flex justify-between font-mono font-semibold text-xs">
              <span className="text-slate-700">Starting Operating Cash:</span>
              <span className="text-slate-900">₹40,607</span>
            </div>
            <div className="flex justify-between font-mono font-semibold text-xs">
              <span className="text-slate-700">Upfront Supplier Payment (Tranche 1):</span>
              <span className="text-rose-700">-₹25,000</span>
            </div>
            <div className="flex justify-between pt-1 border-t border-emerald-200 font-mono font-bold text-emerald-950 text-xs">
              <span>Resulting Operating Balance:</span>
              <span>+₹15,607 Safe Surplus!</span>
            </div>
          </div>
          <p className="text-slate-600 text-[11px]">
            The -₹4,393 crisis was averted with no debt taken, recorded to the immutable audit log.
          </p>
        </div>
      ),
      actionLabel: 'Inspect Architecture',
      onApply: () => {
        closeEvidenceDrawer();
        setActiveWorld('app');
        setActiveAppTab('actions');
      },
    },
    {
      title: '9. Architecture: Deterministic Core',
      badge: 'Technical Rigor',
      icon: Network,
      targetId: 'tour-architecture-pipeline',
      targetName: 'Paytm Ingestion & System Architecture',
      preferredPlacement: 'bottom',
      keyMetricLabel: 'Decoupled Topology',
      keyMetricValue: 'Deterministic Core vs AI Copilot',
      metricVariant: 'indigo',
      content: (
        <div className="space-y-2 text-xs text-slate-700">
          <p>
            MerchantMind’s architecture maintains strict boundaries across three layers:
          </p>
          <div className="p-2.5 bg-slate-900 text-slate-100 rounded-xl font-mono text-[11px] space-y-1">
            <p className="text-cyan-300">1. External Integration Boundary (Paytm, SBI, Tally)</p>
            <p className="text-slate-400">   &darr; Canonical Deduplication & Normalization</p>
            <p className="text-amber-300">2. Deterministic Financial Core (100% Verifiable)</p>
            <p className="text-slate-400">   &darr; Audit Lineage & Decision Matrix</p>
            <p className="text-emerald-400">3. AI Copilot Overlay (Explanation only, not math)</p>
          </div>
          <p className="text-slate-500 text-[11px]">
            All financial arithmetic is deterministic. Zero model hallucinations in financial statements.
          </p>
        </div>
      ),
      actionLabel: 'Complete Product Tour 🚀',
      onApply: () => {
        closeTour();
        closeEvidenceDrawer();
        setActiveWorld('app');
        setActiveAppTab('command-center');
      },
    },
  ];

  const current = steps[currentStep];

  // Helper to calculate exact anchored coordinates next to target element
  const calculateAnchoredPosition = useCallback(() => {
    if (!isTourOpen) return;
    const step = steps[currentStep];

    if (!step?.targetId) return;

    const el = document.getElementById(step.targetId);
    if (!el) {
      // Fallback position if element not yet in DOM
      setCoords({
        top: window.innerHeight - 360,
        left: Math.max(16, window.innerWidth / 2 - 190),
        placement: 'top',
        arrowOffset: 190,
      });
      return;
    }

  // Highlight target element with active spotlight ring
  document.querySelectorAll('.tour-spotlight-active').forEach((node) => {
    if (node !== el) node.classList.remove('tour-spotlight-active');
  });
  el.classList.add('tour-spotlight-active');

  const rect = el.getBoundingClientRect();
  const tooltipWidth = Math.min(390, window.innerWidth - 32);
  const popoverEl = popoverRef.current;
  const tooltipHeight = popoverEl ? popoverEl.offsetHeight : 320;
  const margin = 14;

  let placement = step.preferredPlacement;

  // Check if placement fits on screen, otherwise adapt intelligently
  if (placement === 'left') {
    if (rect.left < tooltipWidth + margin + 16) {
      placement = rect.bottom + tooltipHeight + margin < window.innerHeight ? 'bottom' : 'top';
    }
  } else if (placement === 'bottom') {
    if (rect.bottom + tooltipHeight + margin > window.innerHeight) {
      if (rect.top > tooltipHeight + margin) {
        placement = 'top';
      }
    }
  } else if (placement === 'top') {
    if (rect.top < tooltipHeight + margin) {
      if (window.innerHeight - rect.bottom > tooltipHeight + margin) {
        placement = 'bottom';
      }
    }
  }

  let top = 0;
  let left = 0;
  let arrowOffset = tooltipWidth / 2;

  if (placement === 'bottom') {
    top = Math.min(window.innerHeight - tooltipHeight - 16, rect.bottom + margin);
    const idealLeft = rect.left + rect.width / 2 - tooltipWidth / 2;
    left = Math.max(16, Math.min(window.innerWidth - tooltipWidth - 16, idealLeft));
    const targetCenterX = rect.left + rect.width / 2;
    arrowOffset = Math.max(28, Math.min(tooltipWidth - 28, targetCenterX - left));
  } else if (placement === 'top') {
    top = Math.max(16, rect.top - tooltipHeight - margin);
    const idealLeft = rect.left + rect.width / 2 - tooltipWidth / 2;
    left = Math.max(16, Math.min(window.innerWidth - tooltipWidth - 16, idealLeft));
    const targetCenterX = rect.left + rect.width / 2;
    arrowOffset = Math.max(28, Math.min(tooltipWidth - 28, targetCenterX - left));
  } else if (placement === 'left') {
    left = Math.max(16, rect.left - tooltipWidth - margin);
    const idealTop = rect.top + Math.min(100, rect.height / 2) - tooltipHeight / 2;
    top = Math.max(70, Math.min(window.innerHeight - tooltipHeight - 16, idealTop));
    const targetCenterY = rect.top + Math.min(100, rect.height / 2);
    arrowOffset = Math.max(28, Math.min(tooltipHeight - 28, targetCenterY - top));
  } else if (placement === 'right') {
    left = Math.min(window.innerWidth - tooltipWidth - 16, rect.right + margin);
    const idealTop = rect.top + Math.min(100, rect.height / 2) - tooltipHeight / 2;
    top = Math.max(70, Math.min(window.innerHeight - tooltipHeight - 16, idealTop));
    const targetCenterY = rect.top + Math.min(100, rect.height / 2);
    arrowOffset = Math.max(28, Math.min(tooltipHeight - 28, targetCenterY - top));
  }

  setCoords({
    top,
    left,
    placement,
    arrowOffset,
  });
}, [isTourOpen, currentStep, steps]);

// Handle step change & smooth scroll to target
useEffect(() => {
  if (!isTourOpen) {
    document.querySelectorAll('.tour-spotlight-active').forEach((node) => {
      node.classList.remove('tour-spotlight-active');
    });
    setCoords(null);
    return;
  }

    const step = steps[currentStep];
    // Final step: ensure we are on the architecture tab for inspecting the pipeline
    if (currentStep === steps.length - 1) {
      closeEvidenceDrawer();
      setActiveWorld('app');
      setActiveAppTab('architecture');
    } else if (step?.onApply) {
      step.onApply();
    }

    const timer = setTimeout(() => {
      if (step?.targetId) {
        const el = document.getElementById(step.targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
      calculateAnchoredPosition();
    }, 200);

    return () => clearTimeout(timer);
  }, [currentStep, isTourOpen, calculateAnchoredPosition, closeEvidenceDrawer, setActiveWorld, setActiveAppTab]);

  // Window scroll and resize listeners to keep anchored popover tightly locked to target
  useEffect(() => {
    if (!isTourOpen) return;

    const handleUpdate = () => {
      requestAnimationFrame(calculateAnchoredPosition);
    };

    window.addEventListener('scroll', handleUpdate, { passive: true });
    window.addEventListener('resize', handleUpdate);

    return () => {
      window.removeEventListener('scroll', handleUpdate);
      window.removeEventListener('resize', handleUpdate);
    };
  }, [isTourOpen, calculateAnchoredPosition]);

  const handleClose = useCallback(() => {
    document.querySelectorAll('.tour-spotlight-active').forEach((node) => {
      node.classList.remove('tour-spotlight-active');
    });
    closeEvidenceDrawer();
    closeTour();
  }, [closeEvidenceDrawer, closeTour]);

  const handleNext = useCallback(() => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      if (current.onApply) {
        current.onApply();
      } else {
        handleClose();
      }
    }
  }, [currentStep, steps.length, current, handleClose]);

  const handlePrev = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep]);

  const handleJumpToStep = (index: number) => {
    setCurrentStep(index);
  };

  // Keyboard navigation
  useEffect(() => {
    if (!isTourOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isTourOpen, handleNext, handlePrev, handleClose]);

  if (!isTourOpen || !coords) return null;

  return (
    <>
      {/* ========================================================
            ON-PAGE ANCHORED TUTORIAL POPOVER (Travels to each section/button)
            ZERO BACKDROP BLUR • NO MODAL OVERLAY • 100% Page Visible!
           ======================================================== */}
      <aside
        ref={popoverRef}
        aria-label="Interactive Onboarding Walkthrough"
        style={{
          position: 'fixed',
          top: coords.top,
          left: coords.left,
          zIndex: 60,
          width: Math.min(390, window.innerWidth - 32),
        }}
        className="transition-all duration-300 ease-out select-none"
      >
        <div className="relative bg-white/98 rounded-2xl shadow-2xl backdrop-blur-md overflow-visible text-slate-900 animate-in fade-in zoom-in-95 duration-200 border border-slate-200/90">
        {/* ====================================================
              ARROW BEAK POINTER (Connects Tooltip directly to Target)
              (Rendered for Steps 1-8 where anchored)
             ==================================================== */}
        {coords.placement === 'bottom' && (
          <>
            {/* Arrow Square rotated 45deg on Top Edge pointing UP */}
            <div
              style={{ left: coords.arrowOffset }}
              className="absolute -top-2 -translate-x-1/2 w-4 h-4 rotate-45 bg-white border-t border-l border-slate-200/90 shadow-xs z-20 pointer-events-none"
            />
            {/* Pulsing beacon dot at arrow tip */}
            <span
              style={{ left: coords.arrowOffset }}
              className="absolute -top-3.5 -translate-x-1/2 flex h-2 w-2 z-30 pointer-events-none"
            >
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600" />
            </span>
          </>
        )}

        {coords.placement === 'top' && (
          <>
            {/* Arrow Square rotated 45deg on Bottom Edge pointing DOWN */}
            <div
              style={{ left: coords.arrowOffset }}
              className="absolute -bottom-2 -translate-x-1/2 w-4 h-4 rotate-45 bg-white border-b border-r border-slate-200/90 shadow-xs z-20 pointer-events-none"
            />
            {/* Pulsing beacon dot at arrow tip */}
            <span
              style={{ left: coords.arrowOffset }}
              className="absolute -bottom-3.5 -translate-x-1/2 flex h-2 w-2 z-30 pointer-events-none"
            >
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600" />
            </span>
          </>
        )}

        {coords.placement === 'left' && (
          <>
            {/* Arrow Square rotated 45deg on Right Edge pointing RIGHT */}
            <div
              style={{ top: coords.arrowOffset }}
              className="absolute -right-2 -translate-y-1/2 w-4 h-4 rotate-45 bg-white border-t border-r border-slate-200/90 shadow-xs z-20 pointer-events-none"
            />
            {/* Pulsing beacon dot at arrow tip */}
            <span
              style={{ top: coords.arrowOffset }}
              className="absolute -right-3.5 -translate-y-1/2 flex h-2 w-2 z-30 pointer-events-none"
            >
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600" />
            </span>
          </>
        )}

        {coords.placement === 'right' && (
          <>
            {/* Arrow Square rotated 45deg on Left Edge pointing LEFT */}
            <div
              style={{ top: coords.arrowOffset }}
              className="absolute -left-2 -translate-y-1/2 w-4 h-4 rotate-45 bg-white border-b border-l border-slate-200/90 shadow-xs z-20 pointer-events-none"
            />
            {/* Pulsing beacon dot at arrow tip */}
            <span
              style={{ top: coords.arrowOffset }}
              className="absolute -left-3.5 -translate-y-1/2 flex h-2 w-2 z-30 pointer-events-none"
            >
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600" />
            </span>
          </>
        )}

        {/* Top Decorative Gradient Accent Bar */}
        <div className="h-1.5 w-full rounded-t-2xl bg-gradient-to-r from-indigo-600 via-cyan-500 to-emerald-500" />

        {/* Main Popover Content */}
        <div className="p-4 sm:p-4.5 space-y-3">
          {/* Header: Step Indicator & Badges */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 bg-indigo-50 border border-indigo-200 text-indigo-700">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider block text-indigo-600">
                  {`Tutorial Guide • Step ${currentStep + 1} of ${steps.length}`}
                </span>
                <h4 className="text-xs font-bold text-slate-900 leading-tight">
                  {current.title}
                </h4>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <Badge variant="indigo" size="sm">
                {current.badge}
              </Badge>
              <button
                onClick={handleClose}
                className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors cursor-pointer"
                title="Exit Tour"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Target Element Name Tag */}
          <div className="px-2.5 py-1 bg-slate-50 border border-slate-200/80 rounded-lg flex items-center justify-between text-[11px]">
            <span className="text-slate-500">Inspecting:</span>
            <strong className="text-slate-900 font-semibold truncate max-w-[220px]">
              {current.targetName}
            </strong>
          </div>

          {/* Step Body Explanation */}
          <div className="py-0.5">{current.content}</div>

          {/* Key Metric Snapshot */}
          <div className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between text-xs">
            <span className="text-[11px] font-medium text-slate-500">
              {current.keyMetricLabel}:
            </span>
            <span
              className={`font-mono font-bold text-xs ${current.metricVariant === 'rose'
                ? 'text-rose-700'
                : current.metricVariant === 'emerald'
                  ? 'text-emerald-700'
                  : current.metricVariant === 'amber'
                    ? 'text-amber-800'
                    : current.metricVariant === 'cyan'
                      ? 'text-cyan-700'
                      : 'text-indigo-700'
                }`}
            >
              {current.keyMetricValue}
            </span>
          </div>

          {/* Quick Jump Step Pills (1 to 9) */}
          <div className="space-y-1 pt-0.5">
            <div className="flex items-center justify-between text-[9px] text-slate-400 font-bold uppercase tracking-wider">
              <span>Jump to Step:</span>
              <span>{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
            </div>
            <div className="grid grid-cols-9 gap-1">
              {steps.map((s, idx) => {
                const isCurrent = idx === currentStep;
                const isPast = idx < currentStep;
                return (
                  <button
                    key={idx}
                    onClick={() => handleJumpToStep(idx)}
                    className={`h-6 rounded-md text-[11px] font-bold transition-all cursor-pointer flex items-center justify-center ${isCurrent
                      ? 'bg-indigo-600 text-white shadow-xs ring-2 ring-indigo-400 ring-offset-1'
                      : isPast
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
                        : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                      }`}
                    title={s.title}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mini Progress Bar */}
          <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
            <div
              className="h-full transition-all duration-300 bg-indigo-600"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-1 border-t border-slate-100">
            <Button
              variant="ghost"
              size="sm"
              onClick={handlePrev}
              disabled={currentStep === 0}
              className="text-slate-500 text-xs px-2.5 h-7.5"
            >
              <ChevronLeft className="w-3.5 h-3.5 mr-0.5" />
              <span>Prev</span>
            </Button>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleClose}
                className="text-xs px-2.5 h-7.5 text-slate-600"
              >
                Exit
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleNext}
                className="text-xs px-3 h-7.5 bg-indigo-600 hover:bg-indigo-700 shadow-sm"
              >
                <span>{current.actionLabel || 'Next'}</span>
                <ChevronRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  </>
);
};
