import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  Mic,
  Volume2,
  VolumeX,
  Send,
  Sparkles,
  TrendingUp,
  AlertTriangle,
  Package,
  BookOpen,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Languages,
  QrCode,
  Radio,
  Zap,
  ArrowRight,
  Clock,
  Building2,
} from 'lucide-react';
import { useMerchant } from '../context/MerchantContext';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import {
  generateVyaparAssistantResponse,
  type AssistantReply,
  type MerchantContextSnapshot,
} from '../services/vyaparAiService';
import {
  speakText,
  stopSpeech,
  startVoiceRecognition,
  playSoundboxChime,
} from '../utils/speechUtils';

interface ChatMessageItem {
  id: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  text: string;
  metricsCard?: AssistantReply['metricsCard'];
  suggestedActions?: AssistantReply['suggestedActions'];
  audioSpeech?: string;
}

export const VyaparAssistantView: React.FC = () => {
  const {
    language,
    setLanguage,
    profile,
    financialHealth,
    cashflow,
    payables,
    customers,
    signals,
    actions,
    approveAction,
    setActiveAppTab,
    openEvidenceDrawer,
    setIsBriefingOpen,
  } = useMerchant();

  const [inputQuery, setInputQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessageItem[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const proprietorName = profile?.proprietor ? profile.proprietor.split(' ')[0] : 'Abhishek';

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 'init-view-msg',
          sender: 'assistant',
          timestamp: 'Just now',
          text:
            language === 'hi'
              ? `Ram Ram ${proprietorName} bhai! Main hoon aapka Paytm Vyapar AI Sahayak. Dukan ke SBI khate me ₹40,607 cash hai aur aaj ₹8,450 Paytm QR se aa chuka hai. Lekin 5 din baad Sharma Telecom ka ₹45,000 ka bill due hai (-₹4,393 deficit). Sharma Telecom ke sath 7-din ka payment split (+₹20,000 buffer) ka prastav bhein?`
              : `Hello ${proprietorName}! I am your Paytm Vyapar AI Business Partner. Abhishek Mobile holds ₹40,607 in cash, with ₹8,450 settled today via Paytm QR. However, Sharma Telecom's ₹45,000 wholesale invoice is due in 5 days (-₹4,393 cash gap). Would you like to dispatch the 7-day payment split proposal (+₹20,000 buffer) to bridge the gap?`,
          metricsCard: {
            title: '5-Day Cash Runway & Cliff Alert',
            value: '-₹4,393 Deficit Risk',
            subtext: 'Cash ₹40,607 vs Bill ₹45,000 (Sharma Telecom)',
            type: 'payable',
          },
          suggestedActions: [
            { label: '🚀 Sharma Telecom Payment Split (+₹20K)', type: 'action', actionId: 'act_03', variant: 'emerald' },
            { label: '📊 14-Day Cashflow Projection', type: 'tab', payload: 'cashflow', variant: 'indigo' },
            { label: '🔍 Sharma Telecom Bill Evidence', type: 'evidence', payload: 'evi_01', variant: 'amber' },
          ],
          audioSpeech:
            language === 'hi'
              ? `Ram Ram ${proprietorName} bhai. Khate me ₹40,607 cash hai. 5 din baad Sharma Telecom ko ₹45,000 dene hain. Chaliye bill split karke buffer banate hain.`
              : `Hello ${proprietorName}. You have ₹40,607 cash and a ₹45,000 bill in 5 days. Let's restructure the supplier payment today.`,
        },
      ]);
    }
  }, [language, proprietorName, messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || inputQuery).trim();
    if (!query) return;

    const userMsg: ChatMessageItem = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: query,
    };

    const contextSnapshot: MerchantContextSnapshot = {
      profile,
      financialHealth,
      cashflow,
      payables,
      customers,
      signals,
      actions,
    };

    const reply = generateVyaparAssistantResponse(query, contextSnapshot);

    const assistantMsg: ChatMessageItem = {
      id: `asst-${Date.now() + 1}`,
      sender: 'assistant',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: language === 'hi' ? reply.textHi : reply.textEn,
      metricsCard: reply.metricsCard,
      suggestedActions: reply.suggestedActions,
      audioSpeech: language === 'hi' ? reply.audioSpeechHi : reply.audioSpeechEn,
    };

    setMessages((prev) => [...prev, userMsg, assistantMsg]);
    setInputQuery('');
  };

  const handlePlayVoice = (msgId: string, speechText?: string) => {
    if (isPlayingAudio === msgId) {
      stopSpeech();
      setIsPlayingAudio(null);
      return;
    }

    if (!speechText) return;
    setIsPlayingAudio(msgId);
    playSoundboxChime();
    speakText(speechText, language, () => {
      setIsPlayingAudio(null);
    });
  };

  const handleVoiceInput = () => {
    if (isListening) {
      setIsListening(false);
      return;
    }

    playSoundboxChime();
    setIsListening(true);
    startVoiceRecognition(
      language,
      (transcript) => {
        setIsListening(false);
        setInputQuery(transcript);
        handleSend(transcript);
      },
      (err) => {
        console.warn('Voice recognition error:', err);
        setIsListening(false);
      },
      () => {
        setIsListening(false);
      }
    );
  };

  const handleActionClick = async (action: AssistantReply['suggestedActions'][0]) => {
    if (action.type === 'action' && action.actionId) {
      await approveAction(action.actionId);
      const followUpMsg: ChatMessageItem = {
        id: `asst-act-${Date.now()}`,
        sender: 'assistant',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text:
          language === 'hi'
            ? `✅ Shabaash! Action execute ho gaya hai. Amit Verma (₹2,200) aur Neha Sharma (₹1,500) ko WhatsApp paylink dispatch ho chuka hai. Counter par +₹3,700 aate hi cash buffer safe ho jayega!`
            : `✅ Action executed! WhatsApp payment links dispatched to Amit Verma (₹2,200) and Neha Sharma (₹1,500). Once recovered, cash buffer rises to safe +₹7,107!`,
      };
      setMessages((prev) => [...prev, followUpMsg]);
    } else if (action.type === 'tab' && action.payload) {
      setActiveAppTab(action.payload);
    } else if (action.type === 'evidence' && action.payload) {
      openEvidenceDrawer(action.payload);
    }
  };

  const quickChips = [
    {
      labelHi: '📊 Aaj ka collection?',
      labelEn: "📊 Today's Collection?",
      query: language === 'hi' ? 'Aaj kitna collection hua aur settlement kab aayega?' : "What is today's collection and settlement status?",
    },
    {
      labelHi: '🚨 Sharma Telecom bill?',
      labelEn: '🚨 Sharma Telecom Bill?',
      query: language === 'hi' ? 'Sharma Telecom ka bill kab dena hai aur paise kitne kam hain?' : "When is Sharma Telecom's bill due and what is the cash deficit?",
    },
    {
      labelHi: '💬 Amit Verma ka Udhaar?',
      labelEn: '💬 Recover Amit Udhaar?',
      query: language === 'hi' ? 'Amit Verma ka udhaar recover karne ke liye WhatsApp link bhejo' : 'How do we recover overdue Udhaar from Amit Verma via WhatsApp?',
    },
    {
      labelHi: '📦 Phasa hua stock?',
      labelEn: '📦 Dead Stock Clearance?',
      query: language === 'hi' ? 'Dukan me kaunsa maal phasa hua hai jise bechna hai?' : 'What inventory is dead stock and how do we unlock cash from it?',
    },
  ];

  return (
    <div className="space-y-6">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl border border-indigo-900/50">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-cyan-600/30 border border-cyan-400/40 flex items-center justify-center text-lg">
              🤖
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold tracking-tight text-white">
                  Paytm Vyapar AI Sahayak
                </h1>
                <Badge variant="cyan" size="sm" className="bg-cyan-900/80 text-cyan-200 border-none font-mono text-[10px]">
                  PS-02 CORE MVP
                </Badge>
              </div>
              <p className="text-xs text-slate-300">
                {language === 'hi'
                  ? 'Abhishek Mobile ke liye 24/7 Voice & Chat Business Partner'
                  : 'AI Business Partner & Operational Co-Pilot for Abhishek Mobile'}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* WhatsApp Morning Briefing Trigger */}
          <Button
            size="sm"
            variant="primary"
            onClick={() => setIsBriefingOpen(true)}
            className="text-xs font-semibold gap-1.5 shadow-sm"
          >
            <span>📱</span>
            <span>{language === 'hi' ? 'WhatsApp Morning Briefing' : 'WhatsApp Morning Briefing'}</span>
          </Button>

          {/* Language Switcher */}
          <button
            onClick={() => setLanguage(language === 'hi' ? 'en' : 'hi')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-slate-200 border border-white/10 transition-colors"
          >
            <Languages className="w-3.5 h-3.5 text-cyan-400" />
            <span>{language === 'hi' ? 'हिंदी (Hinglish)' : 'English'}</span>
          </button>
        </div>
      </div>

      {/* Grid: Left Chat Stream (60%), Right Live Telemetry Radar (40%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Conversational Console */}
        <div className="lg:col-span-7 flex flex-col bg-white rounded-2xl shadow-sm border border-slate-200/90 h-[650px] overflow-hidden">
          {/* Chat Stream Header */}
          <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-semibold text-slate-700">
                {language === 'hi' ? 'Live Vyapar Conversation' : 'Live Interactive Dialogue'}
              </span>
            </div>
            <span className="text-[11px] text-slate-500 font-mono">
              Web Speech API • Non-Regulated Guardrails Active
            </span>
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/50 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} space-y-1.5`}
              >
                <div
                  className={`max-w-[88%] p-3.5 rounded-2xl shadow-xs leading-relaxed text-xs ${
                    msg.sender === 'user'
                      ? 'bg-indigo-600 text-white rounded-br-xs font-medium'
                      : 'bg-white text-slate-800 border border-slate-200/90 rounded-bl-xs'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>

                  {/* Metrics Card */}
                  {msg.metricsCard && (
                    <div className="mt-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                      <div className="flex justify-between items-center text-[10px] font-bold text-slate-600">
                        <span>{msg.metricsCard.title}</span>
                        <Badge variant={msg.metricsCard.type === 'payable' ? 'rose' : 'emerald'} size="sm">
                          VERIFIED MATH
                        </Badge>
                      </div>
                      <p className="text-sm font-bold font-mono text-slate-900">{msg.metricsCard.value}</p>
                      <p className="text-[10px] text-slate-500">{msg.metricsCard.subtext}</p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                    <div className="mt-2.5 pt-2 border-t border-slate-100 flex flex-wrap gap-1.5">
                      {msg.suggestedActions.map((action, idx) => (
                        <Button
                          key={idx}
                          size="sm"
                          variant="primary"
                          onClick={() => handleActionClick(action)}
                          className="text-[11px] py-1 px-3 gap-1.5 shadow-xs font-semibold"
                        >
                          {action.label}
                        </Button>
                      ))}
                    </div>
                  )}

                  {/* Voice Playback Button */}
                  {msg.sender === 'assistant' && msg.audioSpeech && (
                    <div className="mt-2 pt-1.5 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                      <button
                        onClick={() => handlePlayVoice(msg.id, msg.audioSpeech)}
                        className="flex items-center gap-1 font-semibold text-cyan-700 hover:text-cyan-800 transition-colors"
                      >
                        {isPlayingAudio === msg.id ? (
                          <>
                            <VolumeX className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
                            <span className="text-amber-600">Stop Voice Output</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3.5 h-3.5" />
                            <span>Suniye (Paytm Soundbox Voice) 🔊</span>
                          </>
                        )}
                      </button>
                      <span className="font-mono text-[9px]">{msg.timestamp}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          <div className="px-3.5 py-2 bg-slate-100/90 border-t border-slate-200 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0">
            <span className="text-[10px] font-bold text-slate-500 uppercase shrink-0">Prompt Chips:</span>
            {quickChips.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(chip.query)}
                className="px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-700 text-[11px] font-medium whitespace-nowrap transition-colors shadow-2xs shrink-0"
              >
                {language === 'hi' ? chip.labelHi : chip.labelEn}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-white border-t border-slate-200 shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              {/* Mic Button */}
              <button
                type="button"
                onClick={handleVoiceInput}
                className={`p-2.5 rounded-xl border transition-all duration-200 shrink-0 ${
                  isListening
                    ? 'bg-rose-500 text-white border-rose-600 animate-pulse shadow-md ring-2 ring-rose-300'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
                title={isListening ? 'Listening... Tap to stop' : 'Tap to speak query'}
              >
                <Mic className="w-4 h-4" />
              </button>

              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder={
                  isListening
                    ? (language === 'hi' ? 'Aapki aawaz sun rahe hain...' : 'Listening to voice...')
                    : (language === 'hi' ? 'Dukan, cash ya bill ke bare me poochiye...' : 'Ask about sales, cash gap, bills...')
                }
                className="flex-1 px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              />

              <Button
                type="submit"
                disabled={!inputQuery.trim()}
                className="py-2.5 px-4 text-xs font-semibold gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send</span>
              </Button>
            </form>
          </div>
        </div>

        {/* Right Column: Live Context & Deterministic Proof Cards */}
        <div className="lg:col-span-5 space-y-4">
          {/* Card 1: Live Telemetry */}
          <Card className="bg-white border-slate-200">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-bold flex items-center gap-2">
                  <QrCode className="w-4 h-4 text-cyan-600" />
                  <span>Abhishek Mobile Telemetry</span>
                </CardTitle>
                <Badge variant="cyan" size="sm">
                  LIVE INGESTION
                </Badge>
              </div>
              <CardDescription className="text-xs">
                Real-time transaction feeds monitored by AI Sahayak
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2.5">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">Liquid Cash</span>
                  <span className="text-base font-bold font-mono text-slate-900">₹40,607</span>
                  <span className="text-[10px] text-emerald-600 block mt-0.5">SBI Current A/c</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">Today's Paytm QR</span>
                  <span className="text-base font-bold font-mono text-cyan-700">₹8,450</span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">42 Tx • Settled</span>
                </div>
              </div>

              {/* Cliff Warning Alert */}
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-rose-900 text-xs flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-rose-600" />
                    Impending Cliff: Day 12
                  </span>
                  <span className="text-[10px] font-mono font-bold text-rose-700 bg-rose-100 px-1.5 py-0.5 rounded">
                    5 DAYS AWAY
                  </span>
                </div>
                <p className="text-[11px] text-rose-800 leading-tight">
                  Sharma Telecom's bill is <strong>₹45,000</strong>. Available liquid cash is ₹40,607.
                  Immediate deficit: <strong className="font-mono text-rose-900">-₹4,393</strong>.
                </p>
                <button
                  onClick={() => openEvidenceDrawer('EVI-CLIFF-001')}
                  className="text-rose-700 font-semibold text-[11px] hover:underline flex items-center gap-1 mt-1"
                >
                  Inspect Invoice BILL-SUP-201 in Evidence Drawer <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              {/* Recovery Action Levers */}
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 space-y-2">
                <span className="font-bold text-emerald-900 text-xs block">
                  AI Sahayak Recommended Levers (+₹11,500)
                </span>
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-[11px] text-emerald-800">
                    <span>1. WhatsApp Paylinks (Amit & Neha)</span>
                    <span className="font-mono font-bold">+₹3,700</span>
                  </div>
                  <div className="flex justify-between items-center text-[11px] text-emerald-800">
                    <span>2. Dead Stock Clearance (9D Glass)</span>
                    <span className="font-mono font-bold">+₹7,800</span>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => approveAction('act-001')}
                  className="w-full text-xs font-semibold py-1.5 gap-1.5 mt-1"
                >
                  <Zap className="w-3.5 h-3.5" />
                  1-Click Trigger Udhaar WhatsApp Recovery
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Card 2: PS-02 Compliance Card */}
          <Card className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white border-indigo-900">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-bold uppercase tracking-wider text-cyan-300">
                PS-02 Specification Adherence
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Conversational NLP for shopkeeper Hindi/English</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Web Speech API voice input + Soundbox playback</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Proactive morning 8:00 AM WhatsApp audio briefing</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>100% deterministic arithmetic (zero hallucinations)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Strictly non-regulated operational advice guardrails</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};