// ============================================================================
// MERCHANTMIND — PAYTM VYAPAR AI SAHAYAK (CONVERSATIONAL ENGINE)
// ============================================================================
// Deterministic business partner tailored for Bharat retail merchants.
// Supports both English & colloquial Hinglish/Hindi shopkeeper dialogue.
// Strictly non-regulated operational advice (Supplier payment split, distributor volume rebate, cashflow cliff warnings).

import type {
  FinancialHealthMetrics,
  CashflowDatapoint,
  PayableRecord,
  CustomerProfile,
  BusinessSignal,
  RecommendedAction,
  MerchantProfile,
} from '../types';

export interface AssistantSuggestedAction {
  label: string;
  actionId?: string;
  type: 'action' | 'tab' | 'evidence' | 'modal';
  payload?: string;
  variant?: 'emerald' | 'indigo' | 'amber' | 'slate';
}

export interface AssistantMetricsCard {
  title: string;
  value: string;
  subtext: string;
  type: 'cash' | 'payable' | 'receivable' | 'inventory' | 'health';
}

export interface AssistantReply {
  textEn: string;
  textHi: string;
  suggestedActions: AssistantSuggestedAction[];
  metricsCard?: AssistantMetricsCard;
  audioSpeechEn?: string;
  audioSpeechHi?: string;
}

export interface MerchantContextSnapshot {
  profile: MerchantProfile | null;
  financialHealth: FinancialHealthMetrics | null;
  cashflow: CashflowDatapoint[];
  payables: PayableRecord[];
  customers: CustomerProfile[];
  signals: BusinessSignal[];
  actions: RecommendedAction[];
}

export function generateVyaparAssistantResponse(
  userQuery: string,
  context: MerchantContextSnapshot
): AssistantReply {
  const query = userQuery.toLowerCase().trim();
  const name = context.profile?.proprietor?.split(' ')[0] || 'Abhishek';
  const cash = context.financialHealth?.availableCash || 40607;
  const urgentPayables = context.payables.filter(p => p.isCliff || p.priority === 'URGENT');
  const totalUrgent = urgentPayables.reduce((acc, p) => acc + p.amount, 0);

  // 1. GREETING / GENERAL SUMMARY / 'DUKAN KA HAAL'
  if (
    query.includes('namaste') ||
    query.includes('hello') ||
    query.includes('hi') ||
    query.includes('haal') ||
    query.includes('summary') ||
    query.includes('status') ||
    query.includes('kaisa hai') ||
    query.includes('overview')
  ) {
    return {
      textEn: `Hello ${name}! Today Abhishek Mobile has ₹${cash.toLocaleString('en-IN')} available cash. Your Paytm Soundbox registered 42 counter sales, but Sharma Telecom's ₹45,000 wholesale bill is due in 5 days with a -₹4,393 cash gap. We have an approved 7-day payment split proposal (+₹20,000 buffer) ready to dispatch.`,
      textHi: `Ram Ram ${name} bhai! Dukan ke SBI khate me abhi ₹${cash.toLocaleString('en-IN')} cash hai aur Paytm QR se lagatar grahak payment kar rahe hain. Lekin 5 din baad Sharma Telecom ko ₹45,000 ka bill dena hai aur khate me ₹4,393 kam pad rahe hain. Sharma Telecom ke sath 7-din ka payment split (+₹20,000 safe buffer) ka prastav taiyar hai.`,
      audioSpeechEn: `Hello ${name}. You have ₹40,607 cash, but Sharma Telecom's ₹45,000 bill is due in 5 days. Let's activate the 7-day payment split today.`,
      audioSpeechHi: `${name} bhai, dukan par ₹40,607 cash hai. 5 din baad Sharma Telecom ko ₹45,000 dene hain. Chaliye 7-din ka payment split bhejte hain.`,
      metricsCard: {
        title: '5-Day Cash Runway & Cliff Alert',
        value: '-₹4,393 Deficit Risk',
        subtext: 'Cash ₹40,607 vs Bill ₹45,000',
        type: 'payable',
      },
      suggestedActions: [
        { label: '🚀 Dispatch Supplier Split Proposal', type: 'action', actionId: 'act_03', variant: 'emerald' },
        { label: '📊 View 14-Day Cashflow Radar', type: 'tab', payload: 'cashflow', variant: 'indigo' },
        { label: '🔍 Inspect Bill Evidence', type: 'evidence', payload: 'evi_01', variant: 'amber' },
      ],
    };
  }

  // 2. CASH / COLLECTION / SETTLEMENT / 'AAJ KI BIKRI'
  if (
    query.includes('collection') ||
    query.includes('bikri') ||
    query.includes('sale') ||
    query.includes('settlement') ||
    query.includes('today') ||
    query.includes('aaj') ||
    query.includes('kitna aaya')
  ) {
    return {
      textEn: `Today's counter collection via Paytm QR & Soundbox stands at ₹8,450 across 42 transactions (avg ticket: ₹340). The net batch settlement has successfully reconciled into your SBI Current Account with zero T+0 deduction fees. Total liquid funds stand at ₹${cash.toLocaleString('en-IN')}.`,
      textHi: `Aaj dukan par Paytm QR aur Soundbox se ₹8,450 ka collection hua hai (kul 42 transactions, average ₹340). Pura settlement aapke SBI Current Account me credit ho chuka hai bina kisi hidden charge ke. Abhi dukan ka liquid cash ₹${cash.toLocaleString('en-IN')} hai.`,
      audioSpeechEn: `Today's Paytm collection is ₹8,450 from 42 transactions, credited to your SBI account. Liquid cash is ₹40,607.`,
      audioSpeechHi: `Aaj Paytm se ₹8,450 ka collection hua hai jo SBI account me aa chuka hai. Khate me total ₹40,607 cash hai.`,
      metricsCard: {
        title: 'Paytm Intraday Settlement',
        value: '₹8,450 Settled',
        subtext: '42 Transactions • 100% Reconciled',
        type: 'cash',
      },
      suggestedActions: [
        { label: '💳 Open Paytm Telemetry Feed', type: 'tab', payload: 'paytm-ecosystem', variant: 'indigo' },
        { label: '🧾 Check Live Transactions', type: 'tab', payload: 'transactions', variant: 'slate' },
      ],
    };
  }

  // 3. BILL / SUPPLIER / SHARMA TELECOM / CLIFF
  if (
    query.includes('bill') ||
    query.includes('sharma') ||
    query.includes('supplier') ||
    query.includes('distributor') ||
    query.includes('kharcha') ||
    query.includes('cliff') ||
    query.includes('deficit') ||
    query.includes('due')
  ) {
    return {
      textEn: `Urgent supplier alert: Sharma Telecom's distributor bill (BILL-SUP-201) of ₹45,000 falls due on Oct 9 (5 days away). With current liquid reserves of ₹${cash.toLocaleString('en-IN')}, Abhishek Mobile faces an acute deficit of -₹4,393. MerchantMind recommends splitting the bill: pay ₹25,000 on Oct 9 and defer ₹20,000 for 7 days, securing a safe +₹15,607 cushion.`,
      textHi: `Zaroori Bill Alert: Sharma Telecom ka ₹45,000 ka invoice (BILL-SUP-201) 5 din baad due hai. Hamare khate me abhi ₹${cash.toLocaleString('en-IN')} hai, jisse theek -₹4,393 kam pad rahe hain. MerchantMind ka sujhav hai ki ₹25,000 abhi dein aur ₹20,000 agle hafte (7 din baad) split karein, jisse +₹15,607 ka safe buffer ban jayega.`,
      audioSpeechEn: `Sharma Telecom's ₹45,000 bill is due in 5 days. You have a -₹4,393 shortfall. Split the payment to protect liquidity.`,
      audioSpeechHi: `Sharma Telecom ko 5 din me ₹45,000 dene hain. ₹4,393 ki kami hai. Chaliye bill split karke buffer safe karte hain.`,
      metricsCard: {
        title: 'Sharma Telecom Due (5 Days)',
        value: '₹45,000 Due',
        subtext: 'Cash Gap: -₹4,393 (Deficit Risk)',
        type: 'payable',
      },
      suggestedActions: [
        { label: '🚀 Dispatch 7-Day Payment Split', type: 'action', actionId: 'act_03', variant: 'emerald' },
        { label: '🔍 Inspect Bill Invoice Proof', type: 'evidence', payload: 'evi_01', variant: 'amber' },
        { label: '🏢 View Supplier Payables', type: 'tab', payload: 'payables', variant: 'indigo' },
      ],
    };
  }

  // 4. CUSTOMERS / DIRECTORY / RFM / REPEAT SHOPPERS
  if (
    query.includes('customer') ||
    query.includes('grahak') ||
    query.includes('repeat') ||
    query.includes('directory')
  ) {
    const highValCount = context.customers.filter(c => c.segment === 'HIGH_VALUE').length;
    return {
      textEn: `Abhishek Mobile tracks ${context.customers.length} regular retail shoppers in the directory. You have ${highValCount} High-Value regulars driving top monthly footfall and repeat volume.`,
      textHi: `Abhishek Mobile ki directory me kul ${context.customers.length} grahak registered hain. Inme se ${highValCount} High-Value regulars hain jo lagatar dukan par kharidari karte hain.`,
      audioSpeechEn: `You have ${highValCount} High-Value customers in your directory driving repeat turnover.`,
      audioSpeechHi: `Aapki directory me ${highValCount} High-Value grahak hain jo lagatar dukan aate hain.`,
      metricsCard: {
        title: 'Repeat Customer Retention',
        value: `${highValCount} High Value`,
        subtext: '40% of monthly retail turnover',
        type: 'receivable',
      },
      suggestedActions: [
        { label: '👥 Open Customer Directory', type: 'tab', payload: 'customers', variant: 'indigo' },
        { label: '💳 View Paytm Transactions', type: 'tab', payload: 'transactions', variant: 'slate' },
      ],
    };
  }

  // 5. REBATE / PRICING / DISTRIBUTOR INCENTIVE
  if (
    query.includes('rebate') ||
    query.includes('incentive') ||
    query.includes('discount') ||
    query.includes('chhoot') ||
    query.includes('distributor rebate')
  ) {
    return {
      textEn: `You have an eligible distributor volume rebate of ₹11,200 from wholesale distributor partners against quarterly Tier-2 purchases. Claiming this rebate credits direct liquidity into your account.`,
      textHi: `Aapke pass quarterly Tier-2 target pura karne par ₹11,200 ka wholesale distributor rebate claim karne ka mauka hai. Isse turant direct cash liquidity milegi.`,
      audioSpeechEn: `You have an eligible ₹11,200 distributor rebate to claim.`,
      audioSpeechHi: `Aapke pass ₹11,200 ka distributor rebate claim karne ka mauka hai.`,
      metricsCard: {
        title: 'Eligible Volume Rebate',
        value: '+₹11,200 Credit',
        subtext: 'Quarterly Tier-2 volume incentive',
        type: 'inventory',
      },
      suggestedActions: [
        { label: '💰 Claim ₹11,200 Distributor Rebate', type: 'action', actionId: 'act_04', variant: 'emerald' },
        { label: '🏢 View Supplier Payables', type: 'tab', payload: 'payables', variant: 'indigo' },
      ],
    };
  }

  // 6. HEALTH / SCORE / PROFIT / RUNWAY
  if (
    query.includes('health') ||
    query.includes('score') ||
    query.includes('profit') ||
    query.includes('munafa') ||
    query.includes('runway') ||
    query.includes('kamyabi')
  ) {
    const healthScore = context.financialHealth?.healthScore || 82;
    const runway = context.financialHealth?.cashRunwayDays || 11.4;
    return {
      textEn: `Abhishek Mobile's business health score is ${healthScore}/100. Your current working capital runway is ${runway} days. While customer footfall and gross margin (24.5%) are healthy, your liquidity coverage ratio is 0.90x due to the impending supplier bill. Deferring the ₹20,000 supplier tranche restores your runway to a safe 22.5 days.`,
      textHi: `Abhishek Mobile ka business health score ${healthScore}/100 hai aur dukan ka working capital runway ${runway} din ka hai. Grahak footfall aur munafa (24.5%) accha hai, par Sharma Telecom ke bill ki wajah se cash coverage 0.90x par hai. Supplier payment split karte hi runway safe 22.5 din ho jayega.`,
      audioSpeechEn: `Your health score is ${healthScore}/100 with ${runway} days of runway. Splitting the supplier bill will restore your buffer.`,
      audioSpeechHi: `Aapka health score ${healthScore}/100 hai aur ${runway} din ka runway hai. Supplier bill split karte hi cash balance safe ho jayega.`,
      metricsCard: {
        title: 'Financial Health Score',
        value: `${healthScore}/100`,
        subtext: `Runway: ${runway} Days • Margin: 24.5%`,
        type: 'health',
      },
      suggestedActions: [
        { label: '📈 Open Full Financial Health View', type: 'tab', payload: 'financial-health', variant: 'indigo' },
        { label: '📡 View Autonomous Signal Radar', type: 'tab', payload: 'signals', variant: 'slate' },
      ],
    };
  }

  // DEFAULT / FALLBACK
  return {
    textEn: `I'm your Paytm Vyapar AI Sahayak, ${name}! I monitor your Paytm QR transactions, Soundbox voice telemetry, and wholesale supplier dues. Ask me about your cashflow, impending distributor bills, or payment restructuring options.`,
    textHi: `Main hoon aapka Paytm Vyapar AI Sahayak, ${name} bhai! Main aapke Paytm QR, Soundbox audio payments aur wholesale bills par 24/7 nazar rakhta hoon. Mujhse dukan ki bikri, Sharma Telecom ke bill, ya payment split ke bare me poochiye!`,
    audioSpeechEn: `I am your Paytm Vyapar AI Sahayak. Ask me about today's collection, Sharma Telecom's bill, or supplier payment restructuring.`,
    audioSpeechHi: `Main aapka Paytm Vyapar Sahayak hoon. Mujhse dukan ki bikri, supplier bill ya payment split ke bare me poochiye.`,
    suggestedActions: [
      { label: '🚨 Sharma Telecom Bill & Cash Gap', type: 'evidence', payload: 'evi_01', variant: 'amber' },
      { label: '🚀 7-Day Payment Split Deferral', type: 'action', actionId: 'act_03', variant: 'emerald' },
      { label: '💰 Claim ₹11,200 Distributor Rebate', type: 'action', actionId: 'act_04', variant: 'indigo' },
    ],
  };
}