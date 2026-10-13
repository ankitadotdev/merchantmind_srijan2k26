// ============================================================================
// MERCHANTMIND — PAYTM VYAPAR AI SAHAYAK (CONVERSATIONAL ENGINE)
// ============================================================================
// Deterministic business partner tailored for Bharat retail merchants.
// Supports both English & colloquial Hinglish/Hindi shopkeeper dialogue.
// Strictly non-regulated operational advice (Udhaar recovery, inventory velocity, cashflow cliff warnings).

import type {
  FinancialHealthMetrics,
  CashflowDatapoint,
  ReceivableRecord,
  PayableRecord,
  InventoryItem,
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
  receivables: ReceivableRecord[];
  payables: PayableRecord[];
  inventory: InventoryItem[];
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
  const overdueKhata = context.receivables.filter(r => r.status === 'OVERDUE');
  const totalOverdue = overdueKhata.reduce((acc, r) => acc + r.outstandingAmount, 0);
  const deadStock = context.inventory.filter(i => i.status === 'DEAD_STOCK');
  const deadStockValue = deadStock.reduce((acc, i) => acc + i.totalLockedCapital, 0);

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
      textEn: `Hello ${name}! Today Abhishek Mobile has ₹${cash.toLocaleString('en-IN')} available cash. Your Paytm Soundbox registered 42 counter sales, but Sharma Telecom's ₹45,000 wholesale bill is due in 5 days with a -₹4,393 cash gap. We have ₹3,700 in overdue customer Udhaar ready to recover via WhatsApp.`,
      textHi: `Ram Ram ${name} bhai! Dukan ke SBI khate me abhi ₹${cash.toLocaleString('en-IN')} cash hai aur Paytm QR se lagatar grahak payment kar rahe hain. Lekin 5 din baad Sharma Telecom ko ₹45,000 ka bill dena hai aur khate me ₹4,393 kam pad rahe hain. Amit Verma aur Neha Sharma se ₹3,700 udhaar mangne ka link tayar hai.`,
      audioSpeechEn: `Hello ${name}. You have ₹40,607 cash, but Sharma Telecom's ₹45,000 bill is due in 5 days. Let's recover ₹3,700 from overdue Khata today.`,
      audioSpeechHi: `${name} bhai, dukan par ₹40,607 cash hai. 5 din baad Sharma Telecom ko ₹45,000 dene hain. Chaliye Amit Verma se udhaar mangte hain.`,
      metricsCard: {
        title: '5-Day Cash Runway & Cliff Alert',
        value: '-₹4,393 Deficit Risk',
        subtext: 'Cash ₹40,607 vs Bill ₹45,000',
        type: 'payable',
      },
      suggestedActions: [
        { label: '🚀 Dispatch WhatsApp Udhaar Paylinks', type: 'action', actionId: 'act-001', variant: 'emerald' },
        { label: '📊 View 14-Day Cashflow Radar', type: 'tab', payload: 'cashflow', variant: 'indigo' },
        { label: '🔍 Inspect Bill Evidence', type: 'evidence', payload: 'EVI-CLIFF-001', variant: 'amber' },
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
      textEn: `Urgent supplier alert: Sharma Telecom's distributor bill (BILL-SUP-201) of ₹45,000 falls due on the 12th (5 days away). With current liquid reserves of ₹${cash.toLocaleString('en-IN')}, Abhishek Mobile faces an acute deficit of -₹4,393. If left unaddressed, the payment will bounce or drain all cash reserves.`,
      textHi: `Zaroori Bill Alert: Sharma Telecom ka ₹45,000 ka invoice (BILL-SUP-201) 5 din baad due hai. Hamare khate me abhi ₹${cash.toLocaleString('en-IN')} hai, jisse theek -₹4,393 kam pad rahe hain. Agar abhi se intezam nahi kiya toh supplier ka cheque fas sakta hai.`,
      audioSpeechEn: `Sharma Telecom's ₹45,000 bill is due in 5 days. You have a -₹4,393 shortfall. Recover Udhaar to cover the gap.`,
      audioSpeechHi: `Sharma Telecom ko 5 din me ₹45,000 dene hain. ₹4,393 ki kami hai. Chaliye grahako se udhaar recover karte hain.`,
      metricsCard: {
        title: 'Sharma Telecom Due (5 Days)',
        value: '₹45,000 Due',
        subtext: 'Cash Gap: -₹4,393 (Deficit Risk)',
        type: 'payable',
      },
      suggestedActions: [
        { label: '🚀 Dispatch WhatsApp Recovery Paylinks', type: 'action', actionId: 'act-001', variant: 'emerald' },
        { label: '🔍 Inspect Bill Invoice Proof', type: 'evidence', payload: 'EVI-CLIFF-001', variant: 'amber' },
        { label: '🏢 View Supplier Payables', type: 'tab', payload: 'payables', variant: 'indigo' },
      ],
    };
  }

  // 4. UDHAAR / KHATA / AMIT VERMA / NEHA SHARMA / RECEIVABLES
  if (
    query.includes('udhaar') ||
    query.includes('khata') ||
    query.includes('amit') ||
    query.includes('neha') ||
    query.includes('receivable') ||
    query.includes('customer') ||
    query.includes('recover') ||
    query.includes('vasooli') ||
    query.includes('whatsapp')
  ) {
    return {
      textEn: `Abhishek Mobile has ₹${totalOverdue.toLocaleString('en-IN')} in high-risk customer Udhaar pending past 30 days. Specifically, Amit Verma owes ₹2,200 (pending 38 days) and Neha Sharma owes ₹1,500. MerchantMind has prepared polite WhatsApp payment requests with dynamic 1-tap Paytm UPI links offering a 2% early clearing discount.`,
      textHi: `Dukan ka ₹${totalOverdue.toLocaleString('en-IN')} ka Udhaar 30 din se zyada purana hai. Amit Verma ke ₹2,200 (38 din purana) aur Neha Sharma ke ₹1,500 atke hain. Humne WhatsApp par bhejane ke liye polite payment reminder aur 2% discount wala Paytm UPI link taiyar kar diya hai.`,
      audioSpeechEn: `You have ₹3,700 in overdue Udhaar from Amit Verma and Neha Sharma. Tap below to send 1-click WhatsApp paylinks.`,
      audioSpeechHi: `Amit Verma aur Neha Sharma se ₹3,700 udhaar lena hai. Niche click karke turant WhatsApp link bhej sakte hain.`,
      metricsCard: {
        title: 'Trapped Customer Khata Credit',
        value: `₹${totalOverdue.toLocaleString('en-IN')} Overdue`,
        subtext: 'Amit Verma (₹2,200) + Neha Sharma (₹1,500)',
        type: 'receivable',
      },
      suggestedActions: [
        { label: '📲 1-Click WhatsApp Paylink Dispatch', type: 'action', actionId: 'act-001', variant: 'emerald' },
        { label: '📖 Open Khata Receivables Ledger', type: 'tab', payload: 'khata', variant: 'indigo' },
        { label: '👥 Inspect Customer Credit Profiles', type: 'tab', payload: 'customers', variant: 'slate' },
      ],
    };
  }

  // 5. INVENTORY / DEAD STOCK / PHASA MAAL / TEMPERED GLASS
  if (
    query.includes('stock') ||
    query.includes('inventory') ||
    query.includes('maal') ||
    query.includes('dead') ||
    query.includes('glass') ||
    query.includes('cover') ||
    query.includes('stagnant') ||
    query.includes('clearance')
  ) {
    return {
      textEn: `We detected ₹${deadStockValue.toLocaleString('en-IN')} locked in slow-moving accessory inventory (e.g. 14 units of Edge-to-Edge 9D Tempered Glass and Armor Cases unsold for >45 days). We recommend launching a 48-Hour Weekend Flash Sale with a 25% discount to unlock ₹7,800 in instant counter liquidity.`,
      textHi: `Dukan ke shelf par ₹${deadStockValue.toLocaleString('en-IN')} ka accessory stock 45 din se nahi bika hai (9D Tempered Glass aur Shockproof Covers). Humne 48-ghante ki Weekend Flash Sale taiyar ki hai jisme 25% chhoot dekar counter par ₹7,800 turant cash unlock ho jayega.`,
      audioSpeechEn: `₹7,800 is locked in slow-moving tempered glass and phone covers. Launch a 48-hour flash sale to convert stock to cash.`,
      audioSpeechHi: `Tempered glass aur covers me ₹7,800 ka maal atka hai. 48-ghante ki flash sale shuru karke cash nikal sakte hain.`,
      metricsCard: {
        title: 'Stagnant Stock Value',
        value: `₹${deadStockValue.toLocaleString('en-IN')} Stalled`,
        subtext: 'Zero movement >45 days (Covers & Glass)',
        type: 'inventory',
      },
      suggestedActions: [
        { label: '⚡ Launch 48-Hr Stock Clearance Sale', type: 'action', actionId: 'act-002', variant: 'emerald' },
        { label: '📦 Open Inventory Velocity Dashboard', type: 'tab', payload: 'inventory', variant: 'indigo' },
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
      textEn: `Abhishek Mobile's business health score is ${healthScore}/100. Your current working capital runway is ${runway} days. While customer footfall and gross margin (28.4%) are healthy, your liquidity coverage ratio is 0.90x due to the impending supplier bill. Recovering trapped Khata will restore your runway to 22.5 safe days.`,
      textHi: `Abhishek Mobile ka business health score ${healthScore}/100 hai aur dukan ka working capital runway ${runway} din ka hai. Grahak footfall aur munafa (28.4%) accha hai, par Sharma Telecom ke bill ki wajah se cash coverage 0.90x par hai. Udhaar recover karte hi runway safe 22.5 din ho jayega.`,
      audioSpeechEn: `Your health score is ${healthScore}/100 with ${runway} days of runway. Recovering Udhaar will boost your liquidity.`,
      audioSpeechHi: `Aapka health score ${healthScore}/100 hai aur ${runway} din ka runway hai. Udhaar recover karte hi cash balance safe ho jayega.`,
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
    textEn: `I'm your Paytm Vyapar AI Sahayak, ${name}! I monitor your Paytm QR transactions, Soundbox voice telemetry, customer Udhaar, and wholesale supplier dues. Ask me about your cashflow, impending distributor bills, recovering customer Khata, or clearing dead stock.`,
    textHi: `Main hoon aapka Paytm Vyapar AI Sahayak, ${name} bhai! Main aapke Paytm QR, Soundbox audio payments, grahako ke Udhaar aur wholesale bills par 24/7 nazar rakhta hoon. Mujhse dukan ki bikri, Sharma Telecom ke bill, Amit Verma ke Udhaar, ya dead stock ke bare me poochiye!`,
    audioSpeechEn: `I am your Paytm Vyapar AI Sahayak. Ask me about today's collection, Sharma Telecom's bill, or recovering Udhaar.`,
    audioSpeechHi: `Main aapka Paytm Vyapar Sahayak hoon. Mujhse dukan ki bikri, supplier bill ya Udhaar recovery ke bare me poochiye.`,
    suggestedActions: [
      { label: '🚨 Sharma Telecom Bill & Cash Gap', type: 'evidence', payload: 'EVI-CLIFF-001', variant: 'amber' },
      { label: '📲 Recover ₹3,700 Customer Udhaar', type: 'action', actionId: 'act-001', variant: 'emerald' },
      { label: '⚡ Clear ₹7,800 Dead Stock', type: 'action', actionId: 'act-002', variant: 'indigo' },
    ],
  };
}