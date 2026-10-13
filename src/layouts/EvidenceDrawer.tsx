import React from 'react';
import {
  FileCheck2,
  Calculator,
  Database,
  History,
  AlertTriangle,
  ArrowRight,
  ShieldAlert,
  CheckCircle2,
} from 'lucide-react';
import { useMerchant } from '../context/MerchantContext';
import { Drawer } from '../components/ui/Drawer';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { formatINR } from '../utils/formatters';

export const EvidenceDrawer: React.FC = () => {
  const {
    selectedEvidenceId,
    selectedEvidence,
    closeEvidenceDrawer,
    actions,
    approveAction,
    setActiveAppTab,
    isTourOpen,
  } = useMerchant();

  if (!selectedEvidence) return null;

  // Find linked action for this opportunity
  const linkedAction = actions.find(
    (a) => a.opportunityId === selectedEvidence.opportunityId
  );

  return (
    <Drawer
      isOpen={Boolean(selectedEvidenceId)}
      onClose={closeEvidenceDrawer}
      title="Audit & Evidence Explorer"
      subtitle={`Deterministic Proof Engine • ID: ${selectedEvidence.id}`}
      width="xl"
      noBlur={isTourOpen}
    >
      <div id="tour-evidence-drawer" className="space-y-6">
        {/* Title & Anomaly Header */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
          <div className="flex items-center gap-2 mb-1.5">
            <ShieldAlert className="w-5 h-5 text-rose-600" />
            <span className="text-xs font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
              Verified Signal
            </span>
          </div>
          <h3 className="text-base font-semibold text-slate-900 leading-snug">
            {selectedEvidence.title}
          </h3>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
            {selectedEvidence.whatWasDetected}
          </p>
        </div>

        {/* Why it Matters */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            <span>Why This Demands Attention</span>
          </div>
          <p className="text-xs text-slate-700 bg-amber-50/60 p-3.5 rounded-xl border border-amber-200/80 leading-relaxed">
            {selectedEvidence.whyItMatters}
          </p>
        </div>

        {/* Deterministic Calculation Breakdown */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider">
            <Calculator className="w-4 h-4 text-indigo-600" />
            <span>Deterministic Math & Formula</span>
          </div>
          <div
            id="tour-evidence-tree"
            className="bg-slate-900 text-slate-100 p-4 rounded-xl border border-slate-800 space-y-3 font-mono text-xs"
          >
            <div className="text-[11px] text-indigo-300 font-sans font-semibold">
              Formula: {selectedEvidence.calculationBreakdown.formula}
            </div>
            <div className="space-y-1.5 border-t border-slate-800 pt-2.5">
              {selectedEvidence.calculationBreakdown.stepDetails.map((step, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs">
                  <span className="text-slate-300 font-sans">{step.label}</span>
                  <span
                    className={`font-semibold tabular-nums ${
                      step.isNegative ? 'text-rose-400' : 'text-slate-100'
                    }`}
                  >
                    {step.value}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center border-t border-slate-700/80 pt-2 font-bold text-sm">
              <span className="text-white font-sans">
                {selectedEvidence.calculationBreakdown.resultLabel}
              </span>
              <span className="text-rose-400 tabular-nums">
                {selectedEvidence.calculationBreakdown.resultValue}
              </span>
            </div>
          </div>
        </div>

        {/* Source Verified Records */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider">
            <Database className="w-4 h-4 text-slate-700" />
            <span>Contributing Source Records</span>
          </div>
          <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
            <table className="min-w-full divide-y divide-slate-200 text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold">
                <tr>
                  <th className="px-3.5 py-2.5 text-left">Record ID</th>
                  <th className="px-3 py-2.5 text-left">Entity</th>
                  <th className="px-3 py-2.5 text-right">Amount</th>
                  <th className="px-3 py-2.5 text-left">Timing / Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {selectedEvidence.sourceRecords.map((rec, i) => (
                  <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-3.5 py-2.5 font-mono font-semibold text-slate-900">
                      {rec.referenceId}
                    </td>
                    <td className="px-3 py-2.5 text-slate-700">{rec.entityName}</td>
                    <td className="px-3 py-2.5 text-right font-mono font-bold text-slate-900">
                      {formatINR(rec.amount)}
                    </td>
                    <td className="px-3 py-2.5 text-slate-500">{rec.dateOrDueDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Audit Timeline */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider">
            <History className="w-4 h-4 text-slate-600" />
            <span>Telemetry & Audit Trail</span>
          </div>
          <div className="p-3.5 bg-slate-50/70 border border-slate-200 rounded-xl space-y-2.5">
            {selectedEvidence.auditTimeline.map((item, i) => (
              <div key={i} className="flex items-start gap-2.5 text-xs">
                <span className="w-2 h-2 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                <div className="flex-1">
                  <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
                    <span>{item.source}</span>
                    <span className="font-mono">{item.timestamp}</span>
                  </div>
                  <p className="text-slate-800 font-medium mt-0.5 leading-snug">{item.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trade-offs & Strategic Impact */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Trade-Offs & Business Implications
          </h4>
          <ul className="space-y-1.5 text-xs text-slate-600">
            {selectedEvidence.risksAndTradeoffs.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-slate-400 font-bold">•</span>
                <span className="leading-snug">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Call to Action Footer */}
        {linkedAction && (
          <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-indigo-700 tracking-wider">
                  Recommended Next Step
                </span>
                <h4 className="text-xs font-bold text-slate-900 mt-0.5">{linkedAction.title}</h4>
              </div>
              <Badge variant="indigo" size="sm">
                +{formatINR(linkedAction.expectedImpactAmount)} Impact
              </Badge>
            </div>
            <p className="text-xs text-slate-600">{linkedAction.description}</p>
            <div className="flex items-center gap-2 pt-1">
              {linkedAction.status === 'AWAITING_APPROVAL' && (
                <Button
                  size="sm"
                  variant="primary"
                  onClick={async () => {
                    await approveAction(linkedAction.id);
                    closeEvidenceDrawer();
                    setActiveAppTab('actions');
                  }}
                  className="w-full"
                >
                  Approve This Action in Demo Mode &rarr;
                </Button>
              )}
              {linkedAction.status === 'COMPLETED' && (
                <div className="flex items-center gap-1.5 text-emerald-700 text-xs font-semibold py-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Action Already Completed & Measured</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Drawer>
  );
};
