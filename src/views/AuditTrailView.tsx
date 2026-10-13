import React from 'react';
import { Clock, ShieldCheck, CheckCircle2, AlertTriangle, RefreshCw } from 'lucide-react';
import { useMerchant } from '../context/MerchantContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { formatDateTime } from '../utils/formatters';

export const AuditTrailView: React.FC = () => {
  const { auditLogs } = useMerchant();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Audit Trail & Governance Logs</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Immutable timeline of telemetry syncs, anomaly detections, and merchant approvals
          </p>
        </div>
        <Badge variant="slate" size="md">
          {auditLogs.length} Logged Events
        </Badge>
      </div>

      <div className="space-y-3">
        {auditLogs.map((log) => (
          <Card key={log.id} className="p-4 shadow-xs hover:border-slate-300 transition-colors">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700 shrink-0">
                  <Clock className="w-4 h-4 text-slate-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <Badge variant="indigo" size="sm">
                      {log.category.replace('_', ' ')}
                    </Badge>
                    <span className="text-[11px] font-mono text-slate-400">
                      Actor: <strong>{log.actor}</strong>
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mt-1">{log.actionTitle}</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{log.summary}</p>
                </div>
              </div>

              <span className="text-[11px] font-mono text-slate-400 shrink-0">
                {formatDateTime(log.timestamp)}
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
