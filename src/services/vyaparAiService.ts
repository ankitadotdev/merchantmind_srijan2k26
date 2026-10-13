// ============================================================================
// MERCHANTMIND — PAYTM VYAPAR AI SAHAYAK (CONVERSATIONAL ENGINE)
// ============================================================================
// Deterministic business partner tailored for Bharat retail merchants.
// Supports both English & colloquial Hinglish/Hindi shopkeeper dialogue.
// Strictly non-regulated operational advice (Supplier restructuring, cashflow cliff warnings).

import type {
  FinancialHealthMetrics,
  CashflowDatapoint,
  PayableRecord,
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
  type: 'cash' | 'payable' | 'health';
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
      textEn: `Hello ${name}! Today Abhishek Mobile has ₹${cash.toLocaleString('en-IN')} available cash. Your Paytm Soundbox registered 42 counter sales, but Sharma Telecom's ₹45,000 wholesale bill is due in 5 days with a -₹4,393 cash gap. We recommend splitting the bill into 2 tranches to keep a safe +₹15,607 buffer.`,
      textHi: `Ram Ram ${name} bhai! Dukan ke SBI khate me abhi ₹${cash.toLocaleString('en-IN')} cash hai aur Paytm QR se lagatar grahak payment kar rahe hain. Lekin 5 din baad Sharma Telecom ko ₹45,000 ka bill dena hai aur khate me ₹4,393 kam pad rahe hain. Sharma Telecom ke bill ko 2 kiston me baant kar hum dukan ko safe rakh sakte hain.`,
      audioSpeechEn: `Hello ${name}. You have ₹40,607 cash, but Sharma Telecom's ₹45,000 bill is due in 5 days. Let's restructure the supplier bill into 2 payments.`,
      audioSpeechHi: `${name} bhai, dukan par ₹40,607 cash hai. 5 din baad Sharma Telecom ko ₹45,000 dene hain. Chaliye bill ko do kiston me baantte hain.`,
      metricsCard: {
        title: '5-Day Cash Runway & Cliff Alert',
        value: '-₹4,393 Deficit Risk',
        subtext: 'Cash ₹40,607 vs Bill ₹45,000',
        type: 'payable',
      },
      suggestedActions: [
        { label: '🤝 Sharma Telecom Bill 2-Kiston me Bantein', type: 'action', actionId: 'act_03', variant: 'emerald' },
        { label: '📊 14-Din ka Cashflow Radar Dekhein', type: 'tab', payload: 'cashflow', variant: 'indigo' },
        { label: '🔍 Sharma Telecom Bill Proof', type: 'evidence', payload: 'evi_01', variant: 'amber' },
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
      textEn: `Urgent supplier alert: Sharma Telecom's distributor bill (BILL-SUP-201) of ₹45,000 falls due on Oct 9 (5 days away). With current liquid reserves of ₹${cash.toLocaleString('en-IN')}, Abhishek Mobile faces an acute deficit of -₹4,393. We recommend proposing a 2-part tranche: ₹25,000 on Oct 9 and ₹20,000 on Oct 16 to maintain a +₹15,607 cushion.`,
      textHi: `Zaroori Bill Alert: Sharma Telecom ka ₹45,000 ka invoice (BILL-SUP-201) 5 din baad due hai. Hamare khate me abhi ₹${cash.toLocaleString('en-IN')} hai, jisse theek -₹4,393 kam pad rahe hain. Agar hum ₹25,000 turant aur ₹20,000 7 din baad dene ka schedule bhejein, toh dukan ke paas ₹15,607 ka safe cushion bana rahega.`,
      audioSpeechEn: `Sharma Telecom's ₹45,000 bill is due in 5 days. You have a -₹4,393 shortfall. Split into 2 tranches to stay safe.`,
      audioSpeechHi: `Sharma Telecom ko 5 din me ₹45,000 dene hain. ₹4,393 ki kami hai. 7-din ka payment split karke buffer banayein.`,
      metricsCard: {
        title: 'Sharma Telecom Due (5 Days)',
        value: '₹45,000 Due',
        subtext: 'Cash Gap: -₹4,393 (Deficit Risk)',
        type: 'payable',
      },
      suggestedActions: [
        { label: '🤝 Split Payment (₹25K + ₹20K)', type: 'action', actionId: 'act_03', variant: 'emerald' },
        { label: '🔍 Inspect Bill Invoice Proof', type: 'evidence', payload: 'evi_01', variant: 'amber' },
        { label: '🏢 View Supplier Payables', type: 'tab', payload: 'payables', variant: 'indigo' },
      ],
    };
  }

  // 4. CUSTOMER INTELLIGENCE / REPEAT PATTERNS / FOOTFALL
  if (
    query.includes('customer') ||
    query.includes('grahak') ||
    query.includes('repeat') ||
    query.includes('loyal') ||
    query.includes('vip') ||
    query.includes('rfm')
  ) {
    return {
      textEn: `Customer Intelligence: Abhishek Mobile has 5 registered high-value customer profiles with total lifetime spend exceeding ₹4.8 Lakhs. Top customer Amit Verma has visited 34 times, while Vikram Singh has 42 repeat orders. Overall repeat purchase rate is 64%.`,
      textHi: `Grahak Analytics: Abhishek Mobile ke paas 5 high-value verified grahak hain jinka total kharch ₹4.8 Lakh se zyada hai. Amit Verma 34 baar aur Vikram Singh 42 baar dukan par aaye hain. Aapka repeat grahak rate 64% hai jo bazar se kaafi behtar hai.`,
      audioSpeechEn: `You have strong repeat customer engagement with 64% repeat rate and ₹4.8 Lakh lifetime spend across top customers.`,
      audioSpeechHi: `Aapka repeat customer rate 64% hai. Top grahako ka total purchase ₹4.8 Lakh se zyada hai.`,
      metricsCard: {
        title: 'Repeat Customer Intelligence',
        value: '64% Repeat Rate',
        subtext: 'Top: Amit Verma (34 visits), Vikram (42 visits)',
        type: 'health',
      },
      suggestedActions: [
        { label: '👥 Open Customer Directory', type: 'tab', payload: 'customers', variant: 'indigo' },
        { label: '📈 Check Sales Overview', type: 'tab', payload: 'overview', variant: 'slate' },
      ],
    };
  }

  // 5. HEALTH / SCORE / PROFIT / RUNWAY
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
      textEn: `Abhishek Mobile's business health score is ${healthScore}/100. Your current working capital runway is ${runway} days. While customer footfall and gross margin (28.4%) are healthy, your liquidity coverage ratio is under pressure from the ₹45,000 supplier bill. Executing the 7-day payment split restores your runway to 22.5 safe days.`,
      textHi: `Abhishek Mobile ka business health score ${healthScore}/100 hai aur dukan ka working capital runway ${runway} din ka hai. Grahak footfall aur munafa (28.4%) accha hai, par Sharma Telecom ke bill ki wajah se cash par dabav hai. Supplier split approve karne se runway safe 22.5 din ho jayega.`,
      audioSpeechEn: `Your health score is ${healthScore}/100 with ${runway} days of runway. Restructuring the bill will boost your liquidity.`,
      audioSpeechHi: `Aapka health score ${healthScore}/100 hai aur ${runway} din ka runway hai. Supplier split se cash balance safe ho jayega.`,
      metricsCard: {
        title: 'Financial Health Score',
        value: `${healthScore}/100`,
        subtext: `Runway: ${runway} Days • Margin: 28.4%`,
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
    textEn: `I'm your Paytm Vyapar AI Sahayak, ${name}! I monitor your Paytm QR transactions, Soundbox voice telemetry, cashflow runway, and wholesale supplier dues. Ask me about your cash balance, upcoming distributor bills, or repeat customer footfall.`,
    textHi: `Main hoon aapka Paytm Vyapar AI Sahayak, ${name} bhai! Main aapke Paytm QR, Soundbox audio payments, cashflow runway aur wholesale supplier bills par 24/7 nazar rakhta hoon. Mujhse dukan ki bikri, Sharma Telecom ke bill ya grahako ke bare me poochiye!`,
    audioSpeechEn: `I am your Paytm Vyapar AI Sahayak. Ask me about today's collection, Sharma Telecom's bill, or cashflow radar.`,
    audioSpeechHi: `Main aapka Paytm Vyapar Sahayak hoon. Mujhse dukan ki bikri, supplier bill ya cashflow radar ke bare me poochiye.`,
    suggestedActions: [
      { label: '🚨 Sharma Telecom Bill & Cash Gap', type: 'evidence', payload: 'evi_01', variant: 'amber' },
      { label: '🤝 Split ₹45K Supplier Payment', type: 'action', actionId: 'act_03', variant: 'emerald' },
      { label: '📊 14-Day Cashflow Radar', type: 'tab', payload: 'cashflow', variant: 'indigo' },
    ],
  };
}