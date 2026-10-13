import React from 'react';
import {
  Clock,
  Radio,
  AlertTriangle,
  RefreshCw,
  BookOpen,
  Package,
  Volume2,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { Badge } from '../ui/Badge';
import { useMerchant } from '../../context/MerchantContext';
import type { MerchantActivityEvent } from '../../types';

interface MerchantActivityTimelineProps {
  limit?: number;
  className?: string;
  showCardHeader?: boolean;
}

export const MerchantActivityTimeline: React.FC<MerchantActivityTimelineProps> = ({
  limit = 8,
  className = '',
  showCardHeader = true,
}) => {
  const { activityTimeline, setActiveAppTab } = useMerchant();

  const getEventIcon = (category: MerchantActivityEvent['category']) => {
    switch (category) {
      case 'SYNC':
        return <RefreshCw className="w-3.5 h-3.5 text-emerald-600" />;
      case 'SIGNAL':
        return <Radio className="w-3.5 h-3.5 text-rose-600" />;
      case 'RISK':
        return <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />;
      case 'KHATA':
        return <BookOpen className="w-3.5 h-3.5 text-indigo-600" />;
      case 'INVENTORY':
        return <Package className="w-3.5 h-3.5 text-amber-600" />;
      case 'TRANSACTION':
        return <Volume2 className="w-3.5 h-3.5 text-sky-600" />;
      default:
        return <Clock className="w-3.5 h-3.5 text-slate-500" />;
    }
  };

  const getEventBadge = (status: MerchantActivityEvent['status']) => {
    switch (status) {
      case 'SUCCESS':
        return <Badge variant="emerald" size="sm">SYNCED</Badge>;
      case 'ALERT':
        return <Badge variant="rose" size="sm">ALERT</Badge>;
      case 'WARNING':
        return <Badge variant="amber" size="sm">RISK</Badge>;
      default:
        return <Badge variant="slate" size="sm">INFO</Badge>;
    }
  };

  const displayedEvents = activityTimeline.slice(0, limit);

  return (
    <div className={`bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden ${className}`}>
      {showCardHeader && (
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              MerchantMind Activity Timeline
            </h4>
          </div>
          <span className="text-[10px] font-mono text-slate-400">
            Continuous Daemon Monitoring
          </span>
        </div>
      )}

      <div className="p-4 divide-y divide-slate-100">
        {displayedEvents.map((evt, idx) => (
          <div key={evt.id || idx} className="py-2.5 first:pt-0 last:pb-0 flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0 mt-0.5">
              {getEventIcon(evt.category)}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-xs font-semibold text-slate-900 truncate">
                  {evt.title}
                </span>
                <span className="text-[10px] font-mono font-medium text-slate-400 shrink-0">
                  {evt.time}
                </span>
              </div>
              <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">
                {evt.description}
              </p>
            </div>

            <div className="shrink-0 self-center hidden sm:block">
              {getEventBadge(evt.status)}
            </div>
          </div>
        ))}
      </div>

      <div className="p-2.5 bg-slate-50/80 border-t border-slate-100 text-center">
        <button
          onClick={() => setActiveAppTab('audit')}
          className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 transition-colors inline-flex items-center gap-1 cursor-pointer"
        >
          <span>View Complete Audit Trail & Ingestion Logs</span>
          <ExternalLink className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
