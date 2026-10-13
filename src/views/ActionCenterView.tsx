import React, { useState } from 'react';
import {
  CheckSquare,
  Play,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  MessageSquare,
  Edit3,
  Trash2,
  X,
  ShieldCheck,
} from 'lucide-react';
import { useMerchant } from '../context/MerchantContext';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { formatINR } from '../utils/formatters';
import type { RecommendedAction } from '../types';

interface EditActionModalState {
  actionId: string;
  title: string;
  targetCustomer: string;
  amount: number;
  messageText: string;
}

export const ActionCenterView: React.FC = () => {
  const { actions, approveAction, executeActionSimulation, financialHealth, resetDemo } = useMerchant();

  // Action interactive simulation states
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [confirmModal, setConfirmModal] = useState<RecommendedAction | null>(null);
  const [executingStages, setExecutingStages] = useState<Record<string, 'APPROVED' | 'EXECUTING' | 'SENT' | 'AWAITING_PAYMENT' | 'MEASURED'>>({});
  const [dismissedIds, setDismissedIds] = useState<string[]>([]);
  const [editModal, setEditModal] = useState<EditActionModalState | null>(null);
  const [customMessages, setCustomMessages] = useState<Record<string, string>>({});

  const handleConfirmAndExecute = async (act: RecommendedAction) => {
    setConfirmModal(null);
    setLoadingId(act.id);
    try {
      await approveAction(act.id);
      setExecutingStages((prev) => ({ ...prev, [act.id]: 'APPROVED' }));
      await handleSimulateExecutionFlow(act.id);
    } finally {
      setLoadingId(null);
    }
  };

  const handleSimulateExecutionFlow = async (id: string) => {
    setLoadingId(id);
    setExecutingStages((prev) => ({ ...prev, [id]: 'EXECUTING' }));

    // Stage 1: EXECUTING
    setTimeout(() => {
      setExecutingStages((prev) => ({ ...prev, [id]: 'SENT' }));
    }, 800);

    // Stage 2: SENT -> Awaiting Payment
    setTimeout(() => {
      setExecutingStages((prev) => ({ ...prev, [id]: 'AWAITING_PAYMENT' }));
    }, 1800);

    // Stage 3: Customer pays via UPI -> Measured outcome!
    setTimeout(async () => {
      await executeActionSimulation(id);
      setExecutingStages((prev) => ({ ...prev, [id]: 'MEASURED' }));
      setLoadingId(null);
    }, 3200);
  };

  const handleDismiss = (id: string) => {
    setDismissedIds((prev) => [...prev, id]);
  };

  const handleSaveEdit = () => {
    if (editModal) {
      setCustomMessages((prev) => ({
        ...prev,
        [editModal.actionId]: editModal.messageText,
      }));
      setEditModal(null);
    }
  };

  const activeActions = actions.filter((a) => !dismissedIds.includes(a.id));

  return (
    <div className="space-y-6">
      {/* Edit Modal */}
      {editModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full p-5 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-indigo-600" />
                <h3 className="text-sm font-bold text-slate-900">Edit Action Parameters</h3>
              </div>
              <button
                onClick={() => setEditModal(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Target Counterparty</label>
                <input
                  type="text"
                  value={editModal.targetCustomer}
                  disabled
                  className="w-full bg-slate-100 border border-slate-200 rounded-lg p-2 text-slate-600 font-medium"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Recovery Amount</label>
                <input
                  type="text"
                  value={`₹${editModal.amount.toLocaleString('en-IN')}`}
                  disabled
                  className="w-full bg-slate-100 border border-slate-200 rounded-lg p-2 text-slate-600 font-mono font-bold"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">WhatsApp Message Template</label>
                <textarea
                  rows={4}
                  value={editModal.messageText}
                  onChange={(e) =>
                    setEditModal({ ...editModal, messageText: e.target.value })
                  }
                  className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-slate-800 text-xs focus:ring-1 focus:ring-indigo-500 focus:outline-hidden"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Dynamic UPI paylink will be automatically appended to the message.
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEditModal(null)}
                className="text-xs"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleSaveEdit}
                className="text-xs bg-indigo-600 hover:bg-indigo-700"
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {confirmModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-indigo-600" />
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Confirm Action Approval (Demo Sandbox)</h3>
                  <span className="text-[11px] text-slate-400">Proprietor Sign-off • Human-in-the-Loop Governance</span>
                </div>
              </div>
              <button
                onClick={() => setConfirmModal(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Target Action</span>
                <div className="font-bold text-slate-900 text-sm">{confirmModal.title}</div>
                <p className="text-slate-600">{confirmModal.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                  <span className="text-[10px] text-emerald-800 font-bold uppercase block">Target Recovery</span>
                  <span className="text-base font-bold font-mono text-emerald-700">+{formatINR(confirmModal.expectedImpactAmount)}</span>
                </div>
                <div className="p-3 bg-indigo-50 rounded-xl border border-indigo-200">
                  <span className="text-[10px] text-indigo-800 font-bold uppercase block">Projected Balance Delta</span>
                  <span className="text-base font-bold font-mono text-indigo-700">-₹4,393 &rarr; +₹15,607</span>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-600 space-y-1 text-xs">
                <strong className="text-slate-800 text-[11px] uppercase block">Trade-Off & Confidence Basis</strong>
                <p>{confirmModal.tradeOff}</p>
              </div>

              <div className="p-3 bg-amber-50 border border-amber-300 rounded-xl text-amber-900 text-xs flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <strong className="block text-[11px] font-bold uppercase">Simulated Execution Guardrail</strong>
                  <p className="text-[11px] text-amber-800 leading-relaxed">
                    This execution operates inside MerchantMind’s deterministic demo environment. No real funds will move and no external emails or notices will be dispatched.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setConfirmModal(null)}
                className="text-xs"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleConfirmAndExecute(confirmModal)}
                className="text-xs bg-emerald-600 hover:bg-emerald-700 font-bold shadow-sm"
              >
                <Play className="w-3.5 h-3.5 mr-1" />
                <span>Execute in Demo</span>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              Action Center & Decision Support
            </h1>
            <Badge variant="indigo" size="sm">
              Proprietor Approval Required
            </Badge>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Turn deterministic financial signals into verified business recovery through guided merchant sign-off
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="emerald" size="md">
            Simulation Mode Active
          </Badge>
          <Button
            variant="outline"
            size="sm"
            onClick={resetDemo}
            className="text-xs"
          >
            <RotateCcw className="w-3.5 h-3.5 mr-1" />
            <span>Reset Demo State</span>
          </Button>
        </div>
      </div>

      {/* Financial Story Strip */}
      <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
        <div>
          <span className="text-[10px] text-slate-400 block uppercase font-medium">1. Current Cash</span>
          <span className="text-base font-bold font-mono text-slate-900 block mt-0.5">{formatINR(financialHealth?.availableCash ?? 40607)}</span>
          <span className="text-[10px] text-slate-500 font-sans block">SBI Current Account</span>
        </div>
        <div>
          <span className="text-[10px] text-rose-600 block uppercase font-medium">2. Supplier Bill</span>
          <span className="text-base font-bold font-mono text-rose-700 block mt-0.5">{formatINR(financialHealth?.urgentPayablesNext7Days ?? 45000)}</span>
          <span className="text-[10px] text-rose-600 font-sans block">Sharma Telecom (Due Oct 9)</span>
        </div>
        <div>
          <span className="text-[10px] text-rose-800 block uppercase font-bold">3. Immediate Net Gap</span>
          <span className="text-base font-bold font-mono text-rose-700 block mt-0.5">{formatINR(financialHealth?.netImmediateLiquidityGap ?? -4393)}</span>
          <span className="text-[10px] text-rose-800 font-sans block">Coverage Deficit</span>
        </div>
        <div>
          <span className="text-[10px] text-emerald-800 block uppercase font-bold">4. Restructuring Deferral</span>
          <span className="text-base font-bold font-mono text-emerald-700 block mt-0.5">+{formatINR(20000)}</span>
          <span className="text-[10px] text-emerald-800 font-sans block">₹20K Deferred to Oct 16</span>
        </div>
        <div className="p-2.5 bg-slate-900 text-white rounded-xl col-span-2 sm:col-span-1">
          <span className="text-[10px] text-emerald-400 block uppercase font-bold">5. Projected Position</span>
          <span className="text-base font-bold font-mono text-emerald-400 block mt-0.5">+{formatINR(15607)}</span>
          <span className="text-[10px] text-slate-300 font-sans block">Safe Working Cushion</span>
        </div>
      </div>

      {/* 5-Stage Action Lifecycle Banner */}
      <div className="p-4 bg-slate-900 text-slate-100 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs font-mono shadow-xs">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <span className="text-slate-400">1. Pending Approval</span>
          <span className="text-slate-600">&rarr;</span>
          <span className="text-indigo-300 font-bold">2. Approved</span>
          <span className="text-slate-600">&rarr;</span>
          <span className="text-cyan-400 font-bold">3. Executing</span>
          <span className="text-slate-600">&rarr;</span>
          <span className="text-amber-400 font-bold">4. Sent / Awaiting Payment</span>
          <span className="text-slate-600">&rarr;</span>
          <span className="text-emerald-400 font-extrabold">5. Measured Outcome</span>
        </div>
        <span className="text-[11px] text-slate-400 font-sans hidden md:inline">
          Deterministic Guardrail: No funds move without proprietor sign-off.
        </span>
      </div>

      {/* Actions Stack */}
      <div className="space-y-4">
        {activeActions.map((act, index) => {
          const actionCode = act.id === 'act_01' ? 'ACTION #ACT-024' : act.id === 'act_02' ? 'ACTION #ACT-025' : `ACTION #ACT-02${6 + index}`;
          const currentStage = executingStages[act.id] || act.status;
          const isAwaiting = act.status === 'AWAITING_APPROVAL' && !executingStages[act.id];
          const isApproved = currentStage === 'APPROVED';
          const isExecuting = currentStage === 'EXECUTING';
          const isSent = currentStage === 'SENT';
          const isAwaitingPayment = currentStage === 'AWAITING_PAYMENT';
          const isMeasured = currentStage === 'MEASURED' || act.status === 'COMPLETED';

          const targetCustomer = act.id === 'act_03' ? 'Sharma Telecom Distributor' : act.id === 'act_04' ? 'Sharma Telecom (Incentive Portal)' : 'Distributor Partner';
          const defaultMsg = act.id === 'act_03'
            ? 'Rescheduling Request: We propose settling BILL-SUP-201 (₹45,000) in 2 tranches: ₹25,000 upfront on Oct 9 and balance ₹20,000 in 7 days on Oct 16.'
            : 'Distributor Volume Incentive: Claim submission for eligible ₹11,200 quarterly hardware rebate.';
          const messageText = customMessages[act.id] || defaultMsg;

          return (
            <Card
              key={act.id}
              id={act.id === 'act_03' ? 'tour-action-card' : undefined}
              className={`p-5 shadow-xs transition-all ${
                isMeasured
                  ? 'border-emerald-300 bg-emerald-50/20'
                  : isApproved || isExecuting || isSent || isAwaitingPayment
                  ? 'border-indigo-300 bg-indigo-50/20'
                  : 'hover:border-slate-300'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5">
                <div className="space-y-3 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded">
                      {actionCode}
                    </span>

                    {isAwaiting && (
                      <Badge variant="amber" size="sm">
                        Pending Merchant Approval
                      </Badge>
                    )}
                    {isApproved && (
                      <Badge variant="indigo" size="sm">
                        Approved • Ready to Execute
                      </Badge>
                    )}
                    {isExecuting && (
                      <Badge variant="cyan" size="sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-ping mr-1" />
                        Executing Dispatch...
                      </Badge>
                    )}
                    {isSent && (
                      <Badge variant="cyan" size="sm">
                        Proposal Dispatched
                      </Badge>
                    )}
                    {isAwaitingPayment && (
                      <Badge variant="amber" size="sm">
                        Awaiting Partner Confirmation
                      </Badge>
                    )}
                    {isMeasured && (
                      <Badge variant="emerald" size="sm">
                        Restructuring Verified • Measured
                      </Badge>
                    )}

                    <span className="text-[11px] font-semibold text-slate-500">
                      Effort: {act.implementationEffort}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="text-[11px] text-slate-500">
                      Risk: {act.relationshipRisk}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900 leading-snug">
                      {act.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {act.description}
                    </p>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/90 text-xs space-y-2">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-semibold block">Target</span>
                        <strong className="text-slate-800 text-xs">{targetCustomer}</strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-semibold block">Suggested Action</span>
                        <strong className="text-slate-800 text-xs">
                          {act.actionType === 'RESCHEDULE_SUPPLIER' ? '7-Day Tranche Split Proposal' : 'Volume Rebate Claim Submission'}
                        </strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-semibold block">Expected Recovery</span>
                        <strong className="text-emerald-700 font-mono text-xs font-bold">
                          +{formatINR(act.expectedImpactAmount)}
                        </strong>
                      </div>
                    </div>

                    {(act.id === 'act_03' || act.id === 'act_04') && (
                      <div className="pt-2 border-t border-slate-200">
                        <span className="text-[10px] text-slate-500 font-semibold block mb-1 flex items-center gap-1">
                          <MessageSquare className="w-3 h-3 text-indigo-600" />
                          Prepared Dispatch Proposal Payload:
                        </span>
                        <p className="text-[11px] text-slate-700 bg-white p-2.5 rounded-lg border border-slate-200/80 italic font-mono leading-relaxed">
                          "{messageText}"
                        </p>
                      </div>
                    )}
                  </div>

                  {(isApproved || isExecuting || isSent || isAwaitingPayment || isMeasured) && (
                    <div className="p-3 bg-indigo-50/70 rounded-xl border border-indigo-200 text-xs space-y-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-900 block font-mono">
                        Simulated Execution Telemetry
                      </span>
                      <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono">
                        <span className="text-emerald-700 font-bold">✓ APPROVED</span>
                        <span className="text-slate-400">&rarr;</span>
                        <span className={isExecuting || isSent || isAwaitingPayment || isMeasured ? 'text-emerald-700 font-bold' : 'text-slate-400'}>
                          ✓ EXECUTING
                        </span>
                        <span className="text-slate-400">&rarr;</span>
                        <span className={isSent || isAwaitingPayment || isMeasured ? 'text-emerald-700 font-bold' : 'text-slate-400'}>
                          ✓ SENT
                        </span>
                        <span className="text-slate-400">&rarr;</span>
                        <span className={isAwaitingPayment || isMeasured ? 'text-emerald-700 font-bold' : 'text-slate-400'}>
                          ✓ AWAITING PAYMENT
                        </span>
                      </div>

                      {isMeasured && (
                        <div className="p-2.5 bg-emerald-100/90 rounded-lg border border-emerald-300 text-emerald-950 flex flex-wrap items-center justify-between gap-2 mt-2">
                          <div className="flex items-center gap-2 font-semibold">
                            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                            <span>Payment received: <strong>+{formatINR(act.expectedImpactAmount)}</strong></span>
                          </div>
                          <span className="font-mono text-[11px] bg-emerald-200/80 px-2 py-0.5 rounded text-emerald-900 font-bold">
                            Recovery Confirmed • Bank Settled
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="lg:text-right shrink-0 flex flex-col justify-between items-start lg:items-end border-t lg:border-t-0 pt-3 lg:pt-0 border-slate-100 min-w-[200px]">
                  <div>
                    <span className="text-[11px] text-slate-400 font-medium block">
                      Target Capital Recovery
                    </span>
                    <span className="text-2xl font-bold font-mono text-emerald-600 block">
                      +{formatINR(act.expectedImpactAmount)}
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      Auth: {act.approvalRequiredBy}
                    </span>
                  </div>

                  <div className="mt-4 flex flex-col gap-2 w-full sm:w-auto">
                    {isAwaiting && (
                      <div className="flex flex-col gap-2">
                        <Button
                          variant="primary"
                          size="sm"
                          isLoading={loadingId === act.id}
                          onClick={() => setConfirmModal(act)}
                          className="text-xs bg-indigo-600 hover:bg-indigo-700 font-bold h-9"
                        >
                          <CheckSquare className="w-3.5 h-3.5 mr-1.5" />
                          <span>Approve Action</span>
                        </Button>

                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              setEditModal({
                                actionId: act.id,
                                title: act.title,
                                targetCustomer,
                                amount: act.expectedImpactAmount,
                                messageText,
                              })
                            }
                            className="text-xs flex-1 h-8 text-slate-600"
                          >
                            <Edit3 className="w-3 h-3 mr-1" />
                            <span>Edit</span>
                          </Button>

                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDismiss(act.id)}
                            className="text-xs flex-1 h-8 text-rose-600 hover:bg-rose-50 border-rose-200"
                          >
                            <Trash2 className="w-3 h-3 mr-1" />
                            <span>Dismiss</span>
                          </Button>
                        </div>
                      </div>
                    )}

                    {isApproved && (
                      <Button
                        variant="primary"
                        size="sm"
                        isLoading={loadingId === act.id}
                        onClick={() => handleSimulateExecutionFlow(act.id)}
                        className="text-xs bg-emerald-600 hover:bg-emerald-700 shadow-sm h-9 font-bold"
                      >
                        <Play className="w-3.5 h-3.5 mr-1.5" />
                        <span>Execute Simulation</span>
                      </Button>
                    )}

                    {(isExecuting || isSent || isAwaitingPayment) && (
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-lg border border-indigo-200">
                        <span className="w-2 h-2 rounded-full bg-indigo-600 animate-ping" />
                        <span>Simulating Lifecycle...</span>
                      </div>
                    )}

                    {isMeasured && (
                      <Badge variant="emerald" size="md">
                        Measured & Closed
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Outcome Verification Panel */}
      <div
        id="tour-outcome-card"
        className="p-5 bg-gradient-to-br from-emerald-50 via-white to-emerald-50/60 rounded-2xl border-2 border-emerald-200/90 shadow-xs space-y-4"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-emerald-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                Closed-Loop Verification
              </span>
              <h3 className="text-sm font-bold text-slate-900">
                Measured Financial Transformation • Post-Action Telemetry
              </h3>
            </div>
          </div>
          <Badge variant="emerald" size="sm">
            Telemetry Grounded
          </Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs font-mono">
          <div className="p-3 bg-white/80 rounded-xl border border-slate-200">
            <span className="text-slate-400 font-sans block text-[10px] uppercase font-semibold">1. Starting Cash</span>
            <span className="text-sm font-bold text-slate-900">{formatINR(40607)}</span>
            <span className="text-[10px] text-slate-500 font-sans block mt-0.5">Buffer: 90% (Low)</span>
          </div>

          <div className="p-3 bg-white/80 rounded-xl border border-rose-200">
            <span className="text-rose-500 font-sans block text-[10px] uppercase font-semibold">2. Wholesale Cliff</span>
            <span className="text-sm font-bold text-rose-700">{formatINR(-45000)}</span>
            <span className="text-[10px] text-rose-600 font-sans block mt-0.5">Sharma Telecom (Due Friday)</span>
          </div>

          <div className="p-3 bg-white/80 rounded-xl border border-emerald-200">
            <span className="text-emerald-600 font-sans block text-[10px] uppercase font-semibold">3. Actions Deferral</span>
            <span className="text-sm font-bold text-emerald-700">+{formatINR(20000)}</span>
            <span className="text-[10px] text-emerald-600 font-sans block mt-0.5">₹20K Deferred by 7 Days</span>
          </div>

          <div className="p-3 bg-emerald-900 text-white rounded-xl border border-emerald-800 shadow-xs">
            <span className="text-emerald-300 font-sans block text-[10px] uppercase font-semibold">4. Resulting Surplus</span>
            <span className="text-base font-bold text-emerald-300">+{formatINR(15607)}</span>
            <span className="text-[10px] text-emerald-200 font-sans block mt-0.5">Safe Working Buffer Restored!</span>
          </div>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          <strong>Outcome Summary:</strong> The impending <strong>-₹4,393</strong> liquidity crisis was averted without taking emergency short-term debt. Wholesale invoice <strong>BILL-SUP-201</strong> was restructured into 2 tranches, and working capital surplus increased to <strong>+₹15,607</strong>.
        </p>
      </div>
    </div>
  );
};
