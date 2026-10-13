// ============================================================================
// MERCHANTMIND — CORE DOMAIN TYPE CONTRACTS
// ============================================================================

export type Currency = 'INR';

export type BusinessScenarioId =
  | 'abhishek-mobile-crisis'
  | 'healthy-business'
  | 'cash-pressure'
  | 'supplier-cliff'
  | 'liquidity-pressure'
  | 'healthy-growth';

export interface MerchantActivityEvent {
  id: string;
  time: string;
  category: 'SYNC' | 'SIGNAL' | 'RISK' | 'TRANSACTION' | 'PAYMENT';
  title: string;
  description: string;
  status: 'SUCCESS' | 'WARNING' | 'ALERT' | 'INFO';
}

export interface MerchantProfile {
  id: string;
  businessName: string;
  tradeName: string;
  proprietor: string;
  gstin: string;
  category: string;
  subCategory: string;
  address: {
    line1: string;
    market: string;
    city: string;
    state: string;
    pincode: string;
  };
  phone: string;
  email: string;
  primaryBank: string;
  primaryAccountMasked: string;
  currency: Currency;
  activeScenario: BusinessScenarioId;
  createdAt: string;
  lastDataSync: string;
}

export interface FinancialHealthMetrics {
  totalRevenueMonthly: number;
  totalRevenueMoMDelta: number; // percentage
  grossProfitMargin: number; // percentage
  totalExpensesMonthly: number;
  netOperatingCashflow: number;
  availableCash: number;
  safeCashBuffer: number;
  cashRunwayDays: number;
  liquidityCoverageRatio: number;
  totalPayables: number;
  urgentPayablesNext7Days: number;
  netImmediateLiquidityGap: number; // negative indicates deficit
  healthScore: number; // 0 to 100
  healthStatus: 'CRITICAL_RISK' | 'CAUTION' | 'STABLE' | 'EXCELLENT';
}

export interface CashflowDatapoint {
  date: string;
  dayLabel: string;
  inflow: number;
  outflow: number;
  netDaily: number;
  actualBalance?: number;
  projectedBalance: number;
  safeBufferLine: number;
  isForecast: boolean;
  annotation?: string;
  isCliff?: boolean;
}

export interface PayableRecord {
  id: string;
  supplierId: string;
  supplierName: string;
  supplierCategory: string;
  supplierPhone: string;
  billNumber: string;
  billDate: string;
  dueDate: string;
  amount: number;
  paidAmount: number;
  balanceDue: number;
  daysUntilDue: number;
  isOverdue: boolean;
  isCliff: boolean; // Flagged when cash shortfall prevents full payment
  priority: 'URGENT' | 'HIGH' | 'NORMAL';
  status: 'PENDING' | 'SCHEDULED' | 'PAID' | 'DISPUTED';
  earlyPaymentDiscountDays?: number;
  earlyPaymentDiscountPercent?: number;
}

export interface CustomerProfile {
  id: string;
  name: string;
  phone: string;
  segment: 'HIGH_VALUE' | 'GROWING' | 'STABLE' | 'AT_RISK' | 'DORMANT';
  totalLifetimeSpend: number;
  totalOrders: number;
  lastPurchaseDate: string;
}

export type SignalSeverity = 'CRITICAL' | 'WARNING' | 'OPPORTUNITY' | 'INFO';

export interface BusinessSignal {
  id: string;
  code: string;
  title: string;
  description: string;
  severity: SignalSeverity;
  category: 'LIQUIDITY' | 'SUPPLIER' | 'REVENUE';
  detectedAt: string;
  metricImpact: string;
  confidenceScore: number;
  triggerCondition: string;
  linkedEntityIds: string[];
}

export type OpportunityCategory =
  | 'CASH_PRESSURE'
  | 'SUPPLIER_PAYMENT'
  | 'SUPPLIER_DISCOUNT'
  | 'PRICING_OPTIMIZATION'
  | 'CUSTOMER_CHURN'
  | 'MARGIN_LEAKAGE';

export type OpportunityStatus =
  | 'OPEN'
  | 'ACTION_PROPOSED'
  | 'IN_PROGRESS'
  | 'RESOLVED'
  | 'DISMISSED';

export interface Opportunity {
  id: string;
  title: string;
  category: OpportunityCategory;
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  urgencyDays: number;
  financialExposure: number; // Current money at risk or trapped
  potentialGain: number; // Money recoverable
  confidence: number; // e.g. 98%
  status: OpportunityStatus;
  detectedAt: string;
  summary: string;
  whyExplanation: string;
  calculationExplanation: string;
  tradeOffSummary: string;
  evidenceRecordId: string;
  recommendedActionIds: string[];
  resolvedAt?: string;
}

export interface EvidenceSourceRecord {
  type: 'SUPPLIER_BILL' | 'BANK_STATEMENT' | 'CASH_METRIC' | 'PAYMENT_VELOCITY';
  referenceId: string;
  entityName: string;
  amount: number;
  dateOrDueDate: string;
  relevanceNote: string;
}

export interface EvidenceRecord {
  id: string;
  opportunityId: string;
  title: string;
  whatWasDetected: string;
  whyItMatters: string;
  calculationBreakdown: {
    formula: string;
    stepDetails: { label: string; value: string; isNegative?: boolean }[];
    resultLabel: string;
    resultValue: string;
  };
  sourceRecords: EvidenceSourceRecord[];
  auditTimeline: {
    timestamp: string;
    event: string;
    source: string;
  }[];
  financialImpactSummary: string;
  risksAndTradeoffs: string[];
}

export type ActionStatus =
  | 'DRAFT'
  | 'REVIEW'
  | 'AWAITING_APPROVAL'
  | 'APPROVED'
  | 'EXECUTING_SIMULATED'
  | 'COMPLETED'
  | 'REJECTED';

export interface RecommendedAction {
  id: string;
  opportunityId: string;
  title: string;
  description: string;
  actionType: 'SEND_REMINDER' | 'RESCHEDULE_SUPPLIER' | 'REDUCE_EXPENSE' | 'EXPEDITE_INVOICE' | 'CLAIM_REBATE';
  priorityOrder: number; // 1 = highest recommendation
  expectedImpactAmount: number;
  impactDescription: string;
  implementationEffort: 'LOW' | 'MEDIUM' | 'HIGH';
  relationshipRisk: 'NEGLIGIBLE' | 'LOW' | 'MODERATE' | 'SIGNIFICANT';
  tradeOff: string;
  status: ActionStatus;
  isSimulatedExecution: boolean;
  approvalRequiredBy: string;
  approvedAt?: string;
  executedAt?: string;
  simulatedLogs?: { step: string; timestamp: string; status: 'SUCCESS' | 'RUNNING' | 'QUEUED' }[];
  measuredOutcome?: {
    metric: string;
    projectedDelta: string;
    actualSimulatedDelta: string;
    verified: boolean;
  };
}

export type ConnectionStatus =
  | 'CONNECTED'
  | 'DEMO_CONNECTED'
  | 'CONNECTOR_READY'
  | 'COMING_SOON'
  | 'NEEDS_ATTENTION'
  | 'NOT_CONNECTED';

export interface DataConnection {
  id: string;
  name: string;
  category: 'PAYMENTS' | 'BANKING' | 'ACCOUNTING' | 'POS' | 'MANUAL';
  provider: string;
  description: string;
  status: ConnectionStatus;
  connectionType: 'SIMULATED_DEMO' | 'PLANNED_INTEGRATION' | 'PRODUCTION_CAPABLE';
  lastSyncedAt: string;
  recordsIngestedTotal: number;
  dataHealthScore: number; // 0-100%
  supportedEntities: string[];
  notes?: string;
}

export interface IngestionJobLog {
  id: string;
  timestamp: string;
  source: string;
  recordsReceived: number;
  recordsValidated: number;
  recordsQuarantined: number;
  duplicatesRemoved: number;
  durationMs: number;
  status: 'SUCCESS' | 'WARNING' | 'FAILED';
  quarantineReason?: string;
}

export interface AuditEvent {
  id: string;
  timestamp: string;
  category: 'SIGNAL_DETECTED' | 'ACTION_APPROVED' | 'ACTION_EXECUTED' | 'SYNC_COMPLETED' | 'SCENARIO_CHANGED';
  actor: string;
  actionTitle: string;
  entityId: string;
  summary: string;
  metadata?: Record<string, unknown>;
}

export interface TransactionRecord {
  id: string;
  date: string;
  time: string;
  type: 'INFLOW_SALE' | 'OUTFLOW_SUPPLIER' | 'OUTFLOW_EXPENSE';
  channel: 'PAYTM_QR' | 'PAYTM_EDC' | 'UPI' | 'CASH' | 'NETBANKING';
  counterparty: string;
  amount: number;
  status: 'SETTLED' | 'PENDING' | 'FAILED';
  referenceId: string;
  category: string;
}
