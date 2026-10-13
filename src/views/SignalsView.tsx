import React from 'react';
import { Radio, ShieldAlert, AlertTriangle, Info, ArrowRight } from 'lucide-react';
import { useMerchant } from '../context/MerchantContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { formatDateTime } from '../utils/formatters';

export const SignalsView: React.FC = () => {
  const { signals, setActiveAppTab } = useMerchant();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Signal Radar & Heuristics</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Continuous deterministic anomaly detection evaluating cashflow thresholds, dead stock, and credit risk
          </p>
        </div>
        <Badge variant="rose" size="md">
          {signals.length} Active Triggers
        </Badge>
      </div>

      <div className="space-y-4">
        {signals.map((sig) => (
          <Card key={sig.id} className="p-5 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <Badge variant={sig.severity === 'CRITICAL' ? 'rose' : 'amber'} size="sm">
                    {sig.severity}
                  </Badge>
                  <span className="font-mono font-bold text-xs text-slate-700">{sig.code}</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-xs text-slate-500">{sig.category}</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-xs text-emerald-700 font-semibold">{sig.confidenceScore}% Confidence</span>
                </div>

                <h3 className="text-base font-bold text-slate-900">{sig.title}</h3>
                <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">{sig.description}</p>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-xs font-mono text-slate-700 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Trigger Rule:</span>
                    <strong className="text-slate-800">{sig.triggerCondition}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Financial Impact:</span>
                    <strong className="text-rose-600">{sig.metricImpact}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Detected At:</span>
                    <span>{formatDateTime(sig.detectedAt)}</span>
                  </div>
                </div>
              </div>

              <div className="sm:self-center shrink-0">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setActiveAppTab('opportunities')}
                  className="text-xs bg-indigo-600 hover:bg-indigo-700"
                >
                  <span>View Formulated Solution</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
