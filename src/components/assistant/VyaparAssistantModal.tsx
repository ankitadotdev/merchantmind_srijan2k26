import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  X,
  Send,
  Sparkles,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  Package,
  BookOpen,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Minimize2,
  Maximize2,
  PhoneCall,
  Languages,
} from 'lucide-react';
import { useMerchant } from '../../context/MerchantContext';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import {
  generateVyaparAssistantResponse,
  type AssistantReply,
  type MerchantContextSnapshot,
} from '../../services/vyaparAiService';
import {
  speakText,
  stopSpeech,
  startVoiceRecognition,
  isSpeechRecognitionSupported,
  type SpeechRecognitionController,
  playSoundboxChime,
} from '../../utils/speechUtils';

interface ChatMessageItem {
  id: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  text: string;
  metricsCard?: AssistantReply['metricsCard'];
  suggestedActions?: AssistantReply['suggestedActions'];
  audioSpeech?: string;
}

export const VyaparAssistantModal: React.FC = () => {
  const {
    isAssistantOpen,
    setIsAssistantOpen,
    assistantInitialPrompt,
    language,
    setLanguage,
    profile,
    financialHealth,
    cashflow,
    payables,
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
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognitionController | null>(null);

  const proprietorName = profile?.proprietor ? profile.proprietor.split(' ')[0] : 'Abhishek';

  // Seed welcome message
  useEffect(() => {
    if (messages.length === 0) {
      const initialGreeting: ChatMessageItem = {
        id: 'msg-init',
        sender: 'assistant',
        timestamp: 'Just now',
        text:
          language === 'hi'
            ? `Ram Ram ${proprietorName} bhai! Main hoon aapka Paytm Vyapar AI Sahayak. Dukan ke SBI khate me ₹40,607 cash hai aur aaj ₹8,450 Paytm QR se aaya hai. Lekin 5 din baad Sharma Telecom ka ₹45,000 ka bill due hai (-₹4,393 gap). Mujhse dukan ki bikri, bills ya cashflow ke bare me poochiye!`
            : `Hello ${proprietorName}! I'm your Paytm Vyapar AI Sahayak. Abhishek Mobile has ₹40,607 cash, with ₹8,450 settled from today's Paytm QR. However, Sharma Telecom's ₹45,000 bill is due in 5 days (-₹4,393 gap). Ask me anything about your cashflow, supplier bills, or repeat sales!`,
        metricsCard: {
          title: '5-Day Cash Runway & Cliff Alert',
          value: '-₹4,393 Deficit Risk',
          subtext: 'Cash ₹40,607 vs Bill ₹45,000 (Sharma Telecom)',
          type: 'payable',
        },
        suggestedActions: [
          { label: '🤝 Sharma Telecom Bill 2-Kiston me Bantein', type: 'action', actionId: 'act_03', variant: 'emerald' },
          { label: '📊 14-Din ka Cashflow Radar Dekhein', type: 'tab', payload: 'cashflow', variant: 'indigo' },
          { label: '🔍 Sharma Telecom Bill Proof', type: 'evidence', payload: 'evi_01', variant: 'amber' },
        ],
        audioSpeech:
          language === 'hi'
            ? `Ram Ram ${proprietorName} bhai. Khate me ₹40,607 cash hai aur 5 din baad Sharma Telecom ko ₹45,000 dene hain. Chaliye supplier bill ko do kiston me baantte hain.`
            : `Hello ${proprietorName}. You have ₹40,607 cash and a ₹45,000 supplier bill due in 5 days. Let's restructure the supplier payment today.`,
      };
      setMessages([initialGreeting]);
    }
  }, [language, proprietorName, messages.length]);

  // Handle initial prompt if triggered externally
  useEffect(() => {
    if (assistantInitialPrompt && isAssistantOpen) {
      handleSend(assistantInitialPrompt);
    }
  }, [assistantInitialPrompt, isAssistantOpen]);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || inputQuery).trim();
    if (!query) return;

    // Add user message
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
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    playSoundboxChime();
    setIsListening(true);
    const controller = startVoiceRecognition(
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
    recognitionRef.current = controller;
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
            ? `✅ Shabaash! Action execute ho gaya hai. Sharma Telecom ko ₹25,000 upfront aur ₹20,000 7-din ke deferral ka proposal dispatch ho chuka hai. Dukan par +₹15,607 ka safe cash buffer banta hai!`
            : `✅ Great action taken! Payment split proposal (₹25,000 upfront + ₹20,000 deferred by 7 days) dispatched to Sharma Telecom. Your cash buffer is now secured at +₹15,607!`,
      };
      setMessages((prev) => [...prev, followUpMsg]);
    } else if (action.type === 'tab' && action.payload) {
      setActiveAppTab(action.payload);
      setIsMinimized(true);
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
      labelHi: '🤝 Sharma bill split?',
      labelEn: '🤝 Split Supplier Bill?',
      query: language === 'hi' ? 'Sharma Telecom ke bill ko 2 kiston me kaise baantein?' : 'How do we split Sharma Telecom bill into 2 payments to avoid cash crunch?',
    },
    {
      labelHi: '👥 Grahak analytics?',
      labelEn: '👥 Customer Analytics?',
      query: language === 'hi' ? 'Dukan ke repeat grahak aur top khareeddar kaun hain?' : 'Who are our top repeat customers and what is our customer repeat rate?',
    },
  ];

  // If floating trigger when modal is closed
  if (!isAssistantOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => {
            playSoundboxChime();
            setIsAssistantOpen(true);
            setIsMinimized(false);
          }}
          className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-cyan-600 via-indigo-600 to-indigo-700 text-white font-semibold text-xs shadow-2xl hover:shadow-cyan-500/30 hover:scale-105 active:scale-95 transition-all duration-200 border border-white/20"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-300 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400"></span>
          </span>
          <span className="text-sm">🤖</span>
          <span className="tracking-wide">
            {language === 'hi' ? 'Paytm Vyapar AI Sahayak' : 'Paytm Vyapar AI Co-Pilot'}
          </span>
          <span className="px-1.5 py-0.5 rounded bg-white/20 text-[10px] font-mono">
            🎙️ VOICE ACTIVE
          </span>
        </button>
      </div>
    );
  }

  // Minimized floating bubble
  if (isMinimized) {
    return (
      <div className="fixed bottom-6 right-6 z-40">
        <div className="bg-slate-900/95 border border-slate-700 p-2.5 rounded-2xl shadow-2xl backdrop-blur-md flex items-center gap-3 text-white text-xs">
          <div className="w-8 h-8 rounded-full bg-cyan-600 flex items-center justify-center text-sm shadow-inner">
            🤖
          </div>
          <div>
            <p className="font-bold text-[11px] text-cyan-300">Paytm Vyapar Sahayak</p>
            <p className="text-[10px] text-slate-400">Monitoring Abhishek Mobile live</p>
          </div>
          <button
            onClick={() => setIsMinimized(false)}
            className="p-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
            title="Expand Assistant"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => {
              stopSpeech();
              setIsAssistantOpen(false);
            }}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-full max-w-[440px] h-[640px] max-h-[88vh] bg-white rounded-3xl shadow-2xl border border-slate-200/90 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-200">
      {/* Top Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white px-4 py-3 flex items-center justify-between border-b border-indigo-900/40 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-cyan-600 to-indigo-600 flex items-center justify-center text-lg shadow-inner border border-white/20">
              🤖
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-slate-900 animate-pulse"></span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-xs tracking-wide">Paytm Vyapar AI Sahayak</span>
              <Badge variant="cyan" size="sm" className="text-[9px] py-0 px-1 border-none bg-cyan-900/80 text-cyan-200">
                PS-02 ACTIVE
              </Badge>
            </div>
            <p className="text-[10px] text-slate-300">
              Abhishek Mobile • {language === 'hi' ? 'Dukan ka AI Partner' : 'AI Business Partner'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Language Switcher Button */}
          <button
            onClick={() => setLanguage(language === 'hi' ? 'en' : 'hi')}
            className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[10px] font-semibold text-slate-200 border border-white/10 transition-colors"
            title="Toggle Language"
          >
            <Languages className="w-3 h-3 text-cyan-400" />
            <span>{language === 'hi' ? 'हिंदी (Hinglish)' : 'English'}</span>
          </button>

          {/* Minimize Button */}
          <button
            onClick={() => setIsMinimized(true)}
            className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <Minimize2 className="w-3.5 h-3.5" />
          </button>

          {/* Close Button */}
          <button
            onClick={() => {
              stopSpeech();
              setIsAssistantOpen(false);
            }}
            className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* WhatsApp Morning Briefing Banner Link */}
      <div className="bg-emerald-50 px-3.5 py-1.5 border-b border-emerald-100 flex items-center justify-between text-[11px] text-emerald-900 shrink-0">
        <span className="flex items-center gap-1.5 font-medium">
          <span className="text-xs">📱</span>
          <span>{language === 'hi' ? 'Subah 8:00 AM ka WhatsApp Voice Briefing' : 'Morning 8:00 AM WhatsApp Voice Briefing'}</span>
        </span>
        <button
          onClick={() => setIsBriefingOpen(true)}
          className="font-bold text-emerald-700 hover:text-emerald-800 underline text-[10px] flex items-center gap-0.5"
        >
          Kholein <ArrowRight className="w-2.5 h-2.5" />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-3.5 overflow-y-auto space-y-3 bg-slate-50/60 text-xs">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} space-y-1.5`}
          >
            <div
              className={`max-w-[90%] p-3 rounded-2xl shadow-xs leading-relaxed text-xs ${
                msg.sender === 'user'
                  ? 'bg-indigo-600 text-white rounded-br-xs font-medium'
                  : 'bg-white text-slate-800 border border-slate-200/90 rounded-bl-xs'
              }`}
            >
              <p className="whitespace-pre-line">{msg.text}</p>

              {/* Metrics Card in Chat */}
              {msg.metricsCard && (
                <div className="mt-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <div className="flex justify-between items-center text-[10px] font-bold text-slate-600">
                    <span>{msg.metricsCard.title}</span>
                    <Badge variant={msg.metricsCard.type === 'payable' ? 'rose' : 'emerald'} size="sm">
                      LIVE RADAR
                    </Badge>
                  </div>
                  <p className="text-sm font-bold font-mono text-slate-900">{msg.metricsCard.value}</p>
                  <p className="text-[10px] text-slate-500">{msg.metricsCard.subtext}</p>
                </div>
              )}

              {/* Action Buttons in Chat */}
              {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                <div className="mt-2.5 pt-2 border-t border-slate-100 flex flex-wrap gap-1.5">
                  {msg.suggestedActions.map((action, idx) => (
                    <Button
                      key={idx}
                      size="sm"
                      variant="primary"
                      onClick={() => handleActionClick(action)}
                      className="text-[10.5px] py-1 px-2.5 gap-1 shadow-xs font-semibold"
                    >
                      {action.label}
                    </Button>
                  ))}
                </div>
              )}

              {/* Audio Speaker Listen Button */}
              {msg.sender === 'assistant' && msg.audioSpeech && (
                <div className="mt-2 pt-1.5 border-t border-slate-100/80 flex items-center justify-between text-[10px] text-slate-400">
                  <button
                    onClick={() => handlePlayVoice(msg.id, msg.audioSpeech)}
                    className="flex items-center gap-1 font-semibold text-cyan-700 hover:text-cyan-800 transition-colors"
                  >
                    {isPlayingAudio === msg.id ? (
                      <>
                        <VolumeX className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
                        <span className="text-amber-600">Stop Voice Note</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Suniye (Soundbox Audio) 🔊</span>
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

      {/* Quick Prompt Chips */}
      <div className="px-3 py-2 bg-slate-100/80 border-t border-slate-200/80 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
        <span className="text-[10px] font-bold text-slate-500 uppercase shrink-0">Quick:</span>
        {quickChips.map((chip, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(chip.query)}
            className="px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-700 text-[10.5px] font-medium whitespace-nowrap transition-colors shadow-2xs shrink-0"
          >
            {language === 'hi' ? chip.labelHi : chip.labelEn}
          </button>
        ))}
      </div>

      {/* Input Field with Mic */}
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
            {isListening ? <Mic className="w-4 h-4 animate-bounce" /> : <Mic className="w-4 h-4" />}
          </button>

          {/* Text Input */}
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

          {/* Send Button */}
          <button
            type="submit"
            disabled={!inputQuery.trim()}
            className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:hover:bg-indigo-600 text-white transition-colors shrink-0 shadow-xs"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-1.5 flex items-center justify-between text-[10px] text-slate-400 px-1">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-600" />
            100% Deterministic Financial Arithmetic
          </span>
          <span>Web Speech & Soundbox Ready</span>
        </div>
      </div>
    </div>
  );
};