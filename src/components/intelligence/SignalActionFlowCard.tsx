import React from 'react';
import {
  Database,
  Radio,
  Lightbulb,
  Sparkles,
  CheckCircle2,
  Send,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useMerchant } from '../../context/MerchantContext';
import { formatINR } from '../../utils/formatters';

interface SignalActionFlowCardProps {
  onInspectEvidence?: (id: string) => void;
  onTakeAction?: () => void;
  compact?: boolean;
}

export const SignalActionFlowCard: React.FC<SignalActionFlowCardProps> = ({
  onInspectEvidence,
  onTakeAction,
  compact = false,
}) => {
  const { openEvidenceDrawer, setActiveAppTab } = useMerchant();

  const handleInspect = () => {
    if (onInspectEvidence) {
      onInspectEvidence('evi_01');
    } else {
      openEvidenceDrawer('evi_01');
    }
  };

  const handleAction = () => {
    if (onTakeAction) {
      onTakeAction();
    } else {
      setActiveAppTab('actions');
    }
  };

  const steps = [
    {
      num: 1,
      label: 'RAW DATA',
      title: 'Payable BILL-SUP-201',
      desc: 'Tally & Bank feed: ₹45,000 due to Sharma Telecom in 5 days against ₹40,607 cash',
      icon: Database,
      badge: 'Connected Sources',
      color: 'slate',
    },
    {
      num: 2,
      label: 'SIGNAL',
      title: 'Liquidity Cliff Signal',
      desc: 'SIG-LIQ-CLIFF: Deficit of -₹4,393 detected 5 days prior to default maturity',
      icon: Radio,
      badge: 'Autonomous Radar',
      color: 'rose',
    },
    {
      num: 3,
      label: 'OPPORTUNITY',
      title: 'Bridge Working Capital',
      desc: 'Identify trapped internal liquidity before turning to high-interest merchant debt',
      icon: Lightbulb,
      badge: 'Synthesized Insight',
      color: 'amber',
    },
    {
      num: 4,
      label: 'RECOMMENDATION',
      title: 'Dual Recovery Package',
      desc: 'Recover ₹3,700 overdue Khata + liquidate ₹7,800 dead stock (+₹11,500 total)',
      icon: Sparkles,
      badge: 'Quantified Plan',
      color: 'indigo',
    },
    {
      num: 5,
      label: 'APPROVAL',
      title: 'Merchant Sign-Off',
      desc: 'Proprietor one-click approval required. No unauthorized automated transactions',
      icon: ShieldCheck,
      badge: 'Human in the Loop',
      color: 'emerald',
    },
    {
      num: 6,
      label: 'ACTION',
      title: 'Multi-Channel Execution',
      desc: 'WhatsApp UPI payment reminders dispatched + in-store clearance discount standee',
      icon: Send,
      badge: 'Automated Dispatch',
      color: 'indigo',
    },
    {
      num: 7,
      label: 'MEASURED RESULT',
      title: '+₹11,500 Recovered',
      desc: 'Cash position transformed from -₹4,393 deficit to +₹7,107 safe working cushion',
      icon: TrendingUp,
      badge: 'Closed-Loop Verification',
      color: 'emerald',
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      {/* Header bar */}
      <div className="p-4 sm:p-5 border-b border-slate-100 bg-gradient-to-r from-slate-50 via-white to-indigo-50/30 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 border border-indigo-200/80 px-2 py-0.5 rounded font-mono">
              Continuous Intelligence Loop
            </span>
            <Badge variant="indigo" size="sm">
              Deterministic Closed-Loop
            </Badge>
          </div>
          <h3 className="text-base font-bold text-slate-900 mt-1">
            From Raw Business Telemetry to Measured Cash Recovery
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            How MerchantMind transforms real-time data into approved business outcomes without guesswork
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleInspect} className="text-xs h-8">
            <span>Inspect Evidence</span>
            <ChevronRight className="w-3.5 h-3.5 ml-1" />
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={handleAction}
            className="text-xs h-8 bg-indigo-600 hover:bg-indigo-700"
          >
            <span>Review Actions</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </div>
      </div>

      {/* Process Chain */}
      <div className="p-4 sm:p-6">
        <div className="grid grid-cols-1 md:grid-cols-7 gap-3 relative">
          {steps.map((st, i) => {
            const Icon = st.icon;

            return (
              <div
                key={st.num}
                className="relative flex flex-col p-3 rounded-xl border border-slate-200/90 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-300 transition-colors"
              >
                {/* Step indicator */}
                <div className="flex items-center justify-between mb-2">
                  <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[10px] font-bold font-mono flex items-center justify-center shrink-0">
                    {st.num}
                  </span>
                  <span className="text-[9px] font-bold font-mono tracking-wider text-slate-400 uppercase">
                    {st.label}
                  </span>
                </div>

                {/* Icon & Title */}
                <div className="flex items-center gap-1.5 mb-1.5">
                  <div
                    className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 ${
                      st.color === 'rose'
                        ? 'bg-rose-100 text-rose-700'
                        : st.color === 'amber'
                        ? 'bg-amber-100 text-amber-700'
                        : st.color === 'indigo'
                        ? 'bg-indigo-100 text-indigo-700'
                        : st.color === 'emerald'
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 leading-tight truncate">
                    {st.title}
                  </h4>
                </div>

                {/* Description */}
                <p className="text-[11px] text-slate-600 leading-snug line-clamp-3 mb-2 flex-1">
                  {st.desc}
                </p>

                {/* Badge */}
                <div className="pt-2 border-t border-slate-200/60 mt-auto">
                  <span className="text-[9px] font-medium text-slate-500 block truncate">
                    {st.badge}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom mathematical summary banner */}
        <div className="mt-4 p-3 rounded-xl bg-gradient-to-r from-rose-50 via-amber-50/50 to-emerald-50 border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-900">End-to-End Mathematical Resolution:</span>
            <span className="text-rose-700 font-mono font-bold">-₹4,393 Deficit</span>
            <span className="text-slate-400 font-bold">&rarr;</span>
            <span className="text-indigo-700 font-mono font-bold">+₹3,700 Khata</span>
            <span className="text-slate-400 font-bold">+</span>
            <span className="text-indigo-700 font-mono font-bold">+₹7,800 Clearance</span>
            <span className="text-slate-400 font-bold">=</span>
            <span className="text-emerald-700 font-mono font-bold">+₹7,107 Protected Cushion</span>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Zero uncollateralized high-cost debt required</span>
          </div>
        </div>
      </div>
    </div>
  );
};
