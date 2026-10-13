# MERCHANTMIND — MASTER PRODUCT & ARCHITECTURE BLUEPRINT

**Platform:** MerchantMind (Intelligent Financial Operating System & Decision Support Platform)  
**Target:** Hackathon Presentation & Serious B2B Fintech SaaS  
**Version:** 1.0.0-alpha (Frontend-First Architecture)  
**Primary Persona:** Abhishek Kumar — *Abhishek Mobile & Accessories* (Retail Electronics & Telecom Accessories, Hazratganj Market, Lucknow, Uttar Pradesh)  
**Currency:** INR (₹)  

---

## 1. PRODUCT VISION
MerchantMind eliminates the merchant's daily cognitive burden of spreadsheet wrangling, manual Khata reconciliations, and metric guesswork. 
Instead of a passive reporting dashboard ("Upload CSV → see charts"), MerchantMind operates on an autonomous intelligence pipeline:
$$\text{CONNECT} \longrightarrow \text{UNDERSTAND} \longrightarrow \text{MONITOR} \longrightarrow \text{DETECT} \longrightarrow \text{EXPLAIN} \longrightarrow \text{RECOMMEND} \longrightarrow \text{APPROVE} \longrightarrow \text{ACT} \longrightarrow \text{MEASURE}$$

The system answers five fundamental merchant questions continuously:
1. **What is happening?** (Real-time operational cash, receivables, sales, inventory velocity)
2. **What is going wrong / at risk?** (Impending liquidity cliff, dead stock lockup, overdue khata)
3. **Why is it happening?** (Transparent deterministic financial attribution with exact source records)
4. **How much money is affected?** (Quantified exposure: e.g., ₹45,000 supplier cliff vs ₹40,607 cash gap)
5. **What should the merchant do next?** (Ranked, actionable options with trade-offs, executable in 1 click)

---

## 2. USER JOURNEY (MERCHANT)
1. **Morning Briefing:** Alok opens MerchantMind on mobile or desktop; sees executive summary ("Short-term liquidity pressure detected within 5 days").
2. **Contextual Clarity:** Sees his ₹40,607 cash deficit linked directly to a ₹45,000 Sharma Telecom distributor invoice due on Friday.
3. **Evidence Drilldown:** Clicks "Inspect Evidence" to view the supplier bill, current cash trajectory, and ₹3,700 trapped in 38-day overdue customer khata.
4. **Actionable Resolution:** Reviews three ranked actions:
   - Action A: Send automated WhatsApp payment reminders with instant UPI paylinks to 2 overdue customers (Expected: ₹3,700 recovered).
   - Action B: Run a 48-hour flash clearance on dead stock (iPhone 11 cases & legacy tempered glass, unlock ₹10,660).
   - Action C: Request supplier bill split / 7-day payment extension.
5. **Simulated Execution:** Alok approves Action A and B; watches execution status transition to "Executing" -> "Active" -> "Simulated Outcome Measured".
6. **Audit & Closure:** Audit trail records approval timestamp, simulated delivery, and balance adjustment.

---

## 3. JUDGE JOURNEY (HACKATHON EVALUATION IN < 3 MINUTES)
- **0:00 - 0:30 (World A - Public Showcase):** Judge lands on Hero; sees the problem statement, live capability flow, interactive architecture diagram, and Paytm ecosystem integration blueprint.
- **0:30 - 1:00 (Guided 90-Second Demo):** Judge clicks **"Launch Interactive Demo"** or **"Start Guided Tour"**.
- **1:00 - 1:45 (World B - Command Center):** Tour highlights:
  - Financial health header (₹1,42,800 monthly revenue, cash reserve cliff).
  - High-priority Intelligence Banner: "₹45,000 supplier invoice due in 5 days with ₹4,393 liquid deficit".
  - One-click trigger for "Inspect Proof".
- **1:45 - 2:30 (Evidence & Decision Flow):**
  - Side drawer opens: Judge sees deterministic calculation: `(Current Operating Balance ₹40,607) - (Payable ₹45,000) = Deficit ₹4,393`.
  - Source invoices and Khata ledgers are directly verifiable.
  - Action comparison matrix: Expected Recovery, Risk, Effort, Trade-off.
- **2:30 - 3:00 (Architecture, Paytm Synergy & System Health):**
  - Judge inspects Data Connection Center showing simulated Paytm QR / POS / All-in-One Gateway sync.
  - Reviews Technical Architecture: Canonical Data Store $\rightarrow$ Deterministic Signal Engine $\rightarrow$ Future LLM/ML Layer.

---

## 4. INFORMATION ARCHITECTURE
The product is partitioned cleanly into **World A (Public Product & Architecture Showcase)** and **World B (Merchant Operational Application)** with a unified top-bar switcher and contextual quick-launch.

```
MERCHANTMIND PLATFORM
├── WORLD A: PUBLIC SHOWCASE & ARCHITECTURE
│   ├── Hero & Value Proposition
│   ├── The Merchant Problem
│   ├── The MerchantMind Solution & 8-Stage Lifecycle
│   ├── How It Works (Step-by-Step Flow)
│   ├── Interactive Live Demo Preview
│   ├── Enterprise Architecture & Canonical Data Pipeline
│   ├── Paytm & Commerce Ecosystem Integration Blueprint
│   ├── Security, Privacy & Compliance (DPDP Act, Bank-Grade)
│   └── Interactive Guided Tour Hub
│
└── WORLD B: MERCHANT COMMAND CENTER (Fintech SaaS Shell)
    ├── 1. Command Center (Executive Overview & Top Priorities)
    ├── 2. Financial Intelligence
    │   ├── Financial Health & P&L Indicators
    │   ├── Cashflow & Liquidity Forecast (Cliff Detection)
    │   └── Unified Transaction Ledger
    ├── 3. Operations & Working Capital
    │   ├── Khata & Receivables (Ageing Buckets: 0-7, 8-30, 31-60, 61-90, 90+)
    │   ├── Payables & Supplier Exposure (Due today, week, cliffs)
    │   └── Inventory Intelligence (Velocity, Dead Stock capital lockup)
    ├── 4. Customer Intelligence
    │   └── Segments (High-Value, Growing, At Risk, Dormant), RFM, Credit Risk
    ├── 5. Intelligence Engine
    │   ├── Signal Radar (Deterministic anomaly & threshold alerts)
    │   ├── Opportunity Center (Categorized, ranked financial opportunities)
    │   ├── Evidence Explorer (Drawer/Modal with verifiable audit logs)
    │   └── Action Center & Decision Matrix (Draft -> Approved -> Executing -> Measured)
    ├── 6. Ecosystem & Data Ingestion
    │   ├── Connection Center (Paytm QR/EDC, Banking, Tally, Zoho, CSV)
    │   ├── Ingestion Pipeline & Quality Quarantine (Raw -> Valid -> Canonical)
    │   └── System & Sync Health Monitor
    └── 7. Platform Governance
        ├── Audit Trail & Event Logs
        ├── Business Settings & Merchant Profile
        └── Interactive Help, Tutorials & Scenario Switcher
```

---

## 5. NAVIGATION STRUCTURE
- **Global Header:**
  - Active World Switcher (`Public Showcase` $\leftrightarrow$ `Merchant App`)
  - Scenario Selector (`Liquidity Pressure (Default)` | `Healthy Growth` | `Inventory Lockup`)
  - Guided Demo Launcher (`Start 90s Tour`)
  - Simulated Sync Status (`Last synced: 2 mins ago` • Green pulse)
  - Merchant Profile Badge (`Alok Mobile Shop • GSTIN: 08AABCR1234M1Z5`)
  - Notification Popover & Quick Search (`Cmd+K / Ctrl+K`)
- **App Sidebar (World B):**
  - Section 1: COMMAND (Executive Command Center, Financial Health, Cashflow, Transactions)
  - Section 2: WORKING CAPITAL (Khata / Receivables, Supplier Payables, Inventory Intelligence, Customers)
  - Section 3: DECISION INTELLIGENCE (Signals & Alerts, Opportunities, Action Center & Approval)
  - Section 4: DATA & ECOSYSTEM (Connections & Paytm, Ingestion Pipeline, Audit Trail)
  - Section 5: SETTINGS & HELP (Settings, Architecture & How It Works, Guided Tour)
- **Responsive Drawer:** Collapsible sidebar for tablet/mobile with persistent touch targets and quick-action bottom bar.

---

## 6. COMPLETE PAGE / SCREEN INVENTORY
1. `ShowcaseLanding`: Public hero, problem/solution, interactive feature showcase, tech stack.
2. `ShowcaseArchitecture`: Visual data flow, pipeline tiers, canonical model, deterministic vs ML engine.
3. `ShowcasePaytmEcosystem`: Paytm QR/Soundbox/POS/EDC telemetry ingestion, reconciliation flow, UPI switch integration concept.
4. `ShowcaseHowItWorks`: 7-step interactive story with live card state updates.
5. `CommandCenter`: Executive dashboard, 8 top financial KPIs, urgent priority alerts, working capital snapshot.
6. `FinancialHealth`: Inflow vs Outflow, operational margin, burn rate, liquidity coverage ratio, 30-day runway.
7. `CashflowPlanner`: Daily cash projection curve, payment cliff warnings, scenario simulation.
8. `KhataReceivables`: Ageing buckets, customer balances, WhatsApp reminder trigger, credit limits.
9. `SupplierPayables`: Supplier invoices, payment schedules, critical due dates, early-payment discount flags.
10. `InventoryIntelligence`: SKU velocity, stockout predictions, dead-stock capital recovery candidates.
11. `CustomerIntelligence`: Customer profiles, recency/frequency/monetary metrics, churn risk indicators.
12. `OpportunityCenter`: Filterable board (Critical/High/Medium, Cash Pressure, Inventory, Khata) with financial impact tags.
13. `EvidenceModalDrawer`: The core differentiator — breakdown of exact formulas, contributing invoices, customer history, and confidence score.
14. `ActionCenter`: Approval queue, execution simulator with step-by-step progress, outcome measurement verification.
15. `DataConnections`: Integration hub with Paytm (Demo connected), HDFC Netbanking (Connected), Tally Prime (Simulated), CSV Dropzone.
16. `IngestionMonitor`: Ingestion telemetry, quarantined dirty records, schema validation status, canonical mapping logs.
17. `AuditTrail`: Immutable event timeline of all detected signals, approved actions, and data syncs.
18. `ScenarioManager`: Interactive toolbar to swap between merchant business states deterministically.
19. `GuidedTourModal`: Interactive 8-step step-by-step product walkthrough with spotlighting.
20. `SystemDocumentation`: In-app knowledge base explaining deterministic heuristics vs AI roadmap.

---

## 7. COMPONENT ARCHITECTURE
- **Foundation UI Tokens:**
  - `Button`, `Badge`, `Card`, `StatCard`, `Input`, `Select`, `Modal`, `Drawer`, `Tabs`, `Table`, `Tooltip`, `Progress`
- **Domain Widgets:**
  - `KpiWidget`: Number with trend, baseline comparison, and confidence badge.
  - `OpportunityCard`: Visual priority, category icon, financial impact pill, action CTA.
  - `EvidenceSheet`: Drawer displaying the calculation tree, source invoice table, timeline, and risk trade-off.
  - `ActionWorkflowCard`: Lifecycle stepper (Recommended $\rightarrow$ In Review $\rightarrow$ Approved $\rightarrow$ Executing $\rightarrow$ Measured).
  - `CashflowCliffChart`: Area/Line visual with safe liquidity threshold and impending deficit zone.
  - `AgeingDistributionBar`: Color-coded horizontal segmented bar for Khata ageing.
  - `IngestionPipelineFlow`: Visual node graph showing raw transaction ingestion into canonical records.
  - `EcosystemCard`: Integration card with live sync badge, protocol type, and simulated reconnect/sync actions.
  - `DemoModeBanner`: Subtle persistent top ribbon confirming demo mode and allowing instant reset.

---

## 8. DOMAIN MODEL FOR FRONTEND (TypeScript Contracts)
- `MerchantProfile`: ID, businessName, tradeName, gstin, category, address, primaryBank, currency, activeScenario.
- `FinancialSummary`: totalRevenue, totalExpenses, netCashflow, operatingCash, totalReceivables, overdueReceivables, totalPayables, urgentPayables, deadStockCapital, liquidityGap.
- `CashflowPoint`: date, inflow, outflow, netBalance, projectedBalance, isForecast, flags.
- `ReceivableRecord`: id, customerId, customerName, phone, invoiceNumber, amount, dueDate, daysOverdue, ageingBucket, status, riskLevel.
- `PayableRecord`: id, supplierId, supplierName, billNumber, amount, dueDate, daysUntilDue, category, status, isCliff.
- `InventoryItem`: sku, name, category, stockQuantity, costPrice, sellingPrice, daysInStock, velocity, lockedCapital, status.
- `BusinessSignal`: id, type, title, description, timestamp, severity, metricKey, deltaValue, confidenceScore.
- `Opportunity`: id, title, category, priority, urgency, financialExposure, potentialGain, confidence, status, detectedAt, whyExplanation, calculationBreakdown, evidenceItemIds, recommendedActionIds.
- `EvidenceRecord`: id, opportunityId, title, summary, formula, sourceRecords, auditTimeline, tradeOffs.
- `RecommendedAction`: id, opportunityId, title, description, type, expectedImpact, effort, risk, status, approvedAt, executedAt, outcomeMetrics.
- `DataConnection`: id, name, category, provider, icon, status, lastSyncedAt, recordsCount, healthScore, isDemo.
- `AuditLogEntry`: id, timestamp, actor, actionType, entityType, entityId, details.

---

## 9. DEMO-DATA ARCHITECTURE
- Single Source of Truth: `src/mock/demoData.ts`
- Deterministic Math Verification:
  - Total Receivables = $\sum$ `ReceivableRecord.amount` = ₹43,200
  - Overdue Receivables (>30 days) = ₹3,700 (INV-REC-101: ₹2,200 + INV-REC-103: ₹1,500)
  - Upcoming Supplier Cliff (Next 5 days) = ₹45,000 (Sharma Telecom Distributor, BILL-SUP-201)
  - Current Available Cash = ₹40,607
  - Liquidity Gap = $₹40,607 - ₹45,000 = -₹4,393$
  - Dead Stock Capital Locked = ₹10,660 (iPhone 11 rugged cases: ₹6,000 + OnePlus 7 screen protectors: ₹4,660)
  - Potential Capital Recovery through Recommended Actions = $₹3,700 (\text{Khata recovery}) + ₹7,800 (\text{Discounted Dead Stock}) = ₹11,500$, turning deficit -₹4,393 into surplus +₹7,107!
- All domain services read from this unified immutable store or cloned reactive state for actions.

---

## 10. DEMO MERCHANT SCENARIO
- **Store Name:** Abhishek Mobile & Accessories
- **Location:** Hazratganj Market, Lucknow, Uttar Pradesh
- **Profile:** Retailer selling smartphones, accessories (cases, screen guards, chargers), smartwatches, and repair services.
- **Monthly Gross Revenue:** ₹1,42,800
- **Daily Volume:** 28–45 transactions via Paytm QR, UPI, Cash, and Card.
- **Current Business State:** High operational activity, but facing acute cash squeeze due to customer credit delays coinciding with bulk accessory restocking payment due.

---

## 11. PAYTM / PAYMENT ECOSYSTEM PRESENTATION STRATEGY
- **Honest Framing:** "Designed for Next-Generation Integration with Merchant Payment Ecosystems such as Paytm."
- **Visible Artifacts:**
  - Connected Ecosystem Source: "Paytm All-In-One QR & EDC Terminal" (Status: Active Simulated Feed).
  - Telemetry Ingestion: Soundbox voice alerts & UPI transactions aggregated into real-time ledger.
  - Value-Add Story: Shows how transaction velocity captured via Paytm feeds cashflow forecasting 4 days ahead of bank statement reconciliations.
  - Explicit Badge: "Simulated Integration • Production Ready Architecture".

---

## 12. OPPORTUNITY / ACTION LIFECYCLE
$$\text{Detected} \longrightarrow \text{Reviewed} \longrightarrow \text{Action Proposed} \longrightarrow \text{Awaiting Approval} \longrightarrow \text{Approved} \longrightarrow \text{Executing (Simulated)} \longrightarrow \text{Completed} \longrightarrow \text{Outcome Measured}$$
- Each state change is tracked in local reactive state with simulated execution logs and before/after metric deltas.

---

## 13. TUTORIAL & HELP STRUCTURE
- **Interactive Tour:** Step-by-step spotlight on:
  1. Executive Summary $\rightarrow$ 2. Liquidity Cliff $\rightarrow$ 3. Opportunity Card $\rightarrow$ 4. Evidence Inspection $\rightarrow$ 5. Action Approval $\rightarrow$ 6. Data Ingestion Pipeline.
- **Knowledge Base:** 6 short guide cards on working capital ratios, Khata recovery tips, inventory turnover, and data privacy.

---

## 14. ARCHITECTURE VISUALIZATION PLAN
- Interactive SVG / Canvas-quality CSS diagram illustrating:
  - Ingestion Layer (Payment Gateways, POS, Accounting, Khata)
  - Canonical Data Engine (Normalization, Deduplication, Validation Quarantine)
  - Deterministic Intelligence Layer (Ratios, Working Capital Cliff, Ageing Rules)
  - Action & Decision Layer (Risk/Reward evaluation, Approval Guardrails)
  - Future Extensible AI/ML Node (Propensity scoring, Seasonal sales forecasting)

---

## 15. RESPONSIVE STRATEGY
- Breakpoints: Desktop (`1280px+`), Laptop (`1024px-1279px`), Tablet (`768px-1023px`), Mobile (`<768px`).
- Tables feature horizontal scroll wrappers with sticky headers or transform into touch-friendly cards on mobile.
- Modals scale to full-height sheets on mobile screens.

---

## 16. DESIGN SYSTEM
- **Visual Aesthetic:** Premium B2B Fintech SaaS (Stripe/Mercury precision, clean borders, high data density, zero tacky AI neon).
- **Backgrounds:** Slate-50 / Gray-50 neutral base, pure white `#FFFFFF` cards, crisp `#E2E8F0` borders.
- **Radius:** `rounded-lg` (8px) for buttons/inputs, `rounded-xl` (12px) for cards, `rounded-2xl` for modals.
- **Shadows:** Subtle layered shadows (`shadow-sm`, `shadow-md` on hover).

---

## 17. TYPOGRAPHY
- **Primary Font:** Inter / Outfit system font stack with fallback to standard modern sans-serif.
- **Financial Numerals:** Tabular numbers (`font-mono` / `tabular-nums`) for currency, percentages, invoice amounts, and tables.
- **Hierarchy:** H1 (24-28px SemiBold), H2 (18-20px SemiBold), Subheading (14px Medium Slate-500), Body (13-14px Slate-700), Micro (11-12px Slate-500).

---

## 18. COLOR SYSTEM
- **Neutral:** Slate-900 (Headings), Slate-700 (Body), Slate-500 (Muted), Slate-200 (Borders), Slate-100 (Secondary BG), Slate-50 (App Canvas).
- **Primary Brand:** Indigo-600 `#4F46E5` / Blue-600 `#2563EB` (Actionable elements, active tabs).
- **Success / Positive:** Emerald-600 `#059669` / Emerald-50 (Healthy cashflow, completed actions, verified data).
- **Warning / Caution:** Amber-600 `#D97706` / Amber-50 (Expiring stock, ageing receivables).
- **Critical / Risk:** Rose-600 `#E11D48` / Rose-50 (Cash deficit, overdue cliff, supplier payment pressure).
- **Paytm Accent:** Cyan-600 `#0284C7` (Used cleanly within the ecosystem connection badges).

---

## 19. CHART STRATEGY
- Clean, performant, SVG/Canvas based charts using lightweight Recharts or custom reactive SVG charts.
- Cashflow Line + Area chart with shaded threshold baseline.
- Khata Ageing horizontal distribution bar.
- Inventory Velocity vs Capital scatter/bar breakdown.
- Always include tooltips with exact currency formatted values (`₹X,XXX`).

---

## 20. ANIMATION STRATEGY
- Micro-interactions only: 150-200ms ease-out transitions for buttons, card hovers, drawer slide-ins, and modal fades.
- No distracting continuous loops or heavy 3D transforms.

---

## 21. LOADING / ERROR / EMPTY STATES
- Standardized `SkeletonCard`, `SkeletonTable`, `EmptyState` with illustration and direct call-to-action, and `ErrorBanner` with retry button.

---

## 22. FRONTEND-TO-BACKEND REPLACEMENT STRATEGY
- Every page queries abstract service interfaces (`IMerchantService`, `IOpportunityService`, `IConnectionService`).
- Services are injected via React Context (`DataProvider`).
- When backend is ready, swapping `new MockOpportunityService()` with `new HttpOpportunityService('/api/v1')` requires zero changes to UI components.

---

## 23. SCREENSHOT & DEMO STRATEGY FOR HACKATHON
- High-contrast, beautifully balanced layouts designed for presentation slides.
- Pre-loaded with rich, realistic Indian retail merchant data (real phone accessories, realistic GST numbers, authentic names).

---

## 24. IMPLEMENTATION PHASES
- **Phase 1:** Project Scaffolding, Design System Foundation, App Shell, Domain Types, Mock Data Store & Provider.
- **Phase 2:** Public Showcase & Product Story (Hero, Architecture, Paytm Ecosystem, How It Works).
- **Phase 3:** Executive Command Center & Priority Highlights.
- **Phase 4:** Financial Modules (Financial Health, Cashflow Cliff Planner, Khata/Receivables, Payables, Inventory, Customers).
- **Phase 5:** Intelligence Engine, Opportunity Center & Evidence Explorer Drawer.
- **Phase 6:** Action Center, Workflow Simulator & Outcome Measurement.
- **Phase 7:** Data Connections & Ingestion Pipeline Telemetry.
- **Phase 8:** Architecture & Technical Documentation Views.
- **Phase 9:** Guided 90-Second Judge Tour & Tutorial System.
- **Phase 10:** Responsive Polish, Keyboard Accessibility, Edge States.
- **Phase 11:** Full QA Audit, `npm run build` verification, Project State Finalization.

---

## 25. DEFINITION OF DONE
- All 20+ view screens interactive and navigable.
- Unified deterministic data reconciles across every single screen.
- Evidence drawer opens and computes exact formulas from source records.
- Actions can be approved and simulated through their lifecycle.
- Guided 90-second tour walks through the entire judge story smoothly.
- Zero TypeScript or build errors on `npm run build`.
- 100% compliant with anti-hallucination and security directives.

---

## 26. RISKS / THINGS WE MUST NOT DO
- ❌ Do NOT connect real external banking or payment APIs.
- ❌ Do NOT claim live Paytm partnership or active production API calls.
- ❌ Do NOT make the user upload files to see data.
- ❌ Do NOT make a generic purple AI dashboard with floating glowing neon cards.
- ❌ Do NOT hardcode random disconnected numbers in individual components.
- ❌ Do NOT use generic placeholder screens ("Coming Soon").
