import React, { useState } from 'react';
import {
  X,
  Play,
  Pause,
  MessageCircle,
  ExternalLink,
  Volume2,
  CheckCheck,
  Send,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { useMerchant } from '../../context/MerchantContext';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { playSoundboxChime, speakText, stopSpeech } from '../../utils/speechUtils';

export const WhatsAppBriefingModal: React.FC = () => {
  const { isBriefingOpen, setIsBriefingOpen, profile, language, approveAction, openEvidenceDrawer } = useMerchant();
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [hasDispatched, setHasDispatched] = useState(false);

  if (!isBriefingOpen) return null;

  const proprietorName = profile?.proprietor ? profile.proprietor.split(' ')[0] : 'Abhishek';

  const audioNoteText =
    language === 'hi'
      ? `Ram Ram ${proprietorName} bhai! Aaj subah 8 baje ka dukan briefing: Kal dukan par 42 Paytm transactions hue, ₹8,450 SBI khate me credit ho chuka hai. Dhyan rahe, 5 din me Sharma Telecom ko ₹45,000 ka wholesale payment karna hai, jabki khate me theek ₹40,607 cash hai (-₹4,393 ka gap). Aaj sabse pehle Amit Verma aur Neha Sharma ko WhatsApp payment link bhejiye taaki ₹3,700 counter par turant aa jaye.`
      : `Good morning ${proprietorName}! Morning 8:00 AM briefing for Abhishek Mobile: Yesterday registered 42 Paytm QR transactions, and ₹8,450 settled into your SBI current account. Important note: Sharma Telecom's ₹45,000 invoice is due in 5 days with a -₹4,393 gap against your ₹40,607 cash. First priority today: collect ₹3,700 overdue Khata credit from Amit Verma and Neha Sharma.`;

  const handleToggleAudio = () => {
    if (isPlayingAudio) {
      stopSpeech();
      setIsPlayingAudio(false);
    } else {
      setIsPlayingAudio(true);
      playSoundboxChime();
      speakText(audioNoteText, language, () => {
        setIsPlayingAudio(false);
      });
    }
  };

  const handleQuickDispatch = async () => {
    await approveAction('act-001');
    setHasDispatched(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#efeae2] rounded-3xl shadow-2xl overflow-hidden border border-emerald-800/30 flex flex-col max-h-[90vh]">
        {/* WhatsApp Green Top Header */}
        <div className="bg-[#075e54] text-white px-5 py-3.5 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-700/80 border border-emerald-400/40 flex items-center justify-center text-white font-bold text-base shadow-inner">
              🤖
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm tracking-wide">Paytm Vyapar Sahayak</span>
                <Badge variant="emerald" size="sm" className="bg-emerald-600 text-[10px] text-white border-none py-0">
                  OFFICIAL BOT
                </Badge>
              </div>
              <p className="text-[11px] text-emerald-200/90 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Daily Morning Briefing • 8:00 AM
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              stopSpeech();
              setIsBriefingOpen(false);
            }}
            className="p-1.5 rounded-full hover:bg-emerald-800 text-emerald-100 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Body */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs">
          {/* Date stamp */}
          <div className="flex justify-center">
            <span className="bg-white/80 text-slate-600 text-[11px] font-medium px-3 py-1 rounded-lg shadow-xs">
              TODAY • 8:00 AM IST
            </span>
          </div>

          {/* Incoming Voice Note Bubble */}
          <div className="max-w-[88%] bg-white rounded-2xl rounded-tl-sm p-3.5 shadow-sm border border-slate-200/80 space-y-2.5">
            <div className="flex items-center justify-between text-[11px] text-emerald-800 font-bold">
              <span className="flex items-center gap-1.5">
                <Volume2 className="w-4 h-4 text-emerald-600" />
                🎙️ Morning Audio Briefing (0:42)
              </span>
              <span className="text-[10px] text-slate-400 font-mono">08:00 AM</span>
            </div>

            {/* Audio Wave Bar */}
            <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <button
                onClick={handleToggleAudio}
                className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-transform shadow-md ${
                  isPlayingAudio
                    ? 'bg-amber-500 text-white animate-pulse'
                    : 'bg-[#128c7e] text-white hover:scale-105'
                }`}
              >
                {isPlayingAudio ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
              </button>
              <div className="flex-1 space-y-1">
                <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
                  <div
                    className={`h-full bg-emerald-600 transition-all duration-300 ${
                      isPlayingAudio ? 'w-3/4 animate-pulse' : 'w-1/4'
                    }`}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>{isPlayingAudio ? 'Listening Live...' : 'Tap to Listen'}</span>
                  <span>Paytm Soundbox Voice</span>
                </div>
              </div>
            </div>

            <p className="text-slate-700 leading-relaxed text-[11.5px] italic bg-emerald-50/50 p-2.5 rounded-lg border border-emerald-100/60">
              "{audioNoteText}"
            </p>
          </div>

          {/* Actionable Card inside WhatsApp */}
          <div className="max-w-[92%] bg-white rounded-2xl rounded-tl-sm p-3.5 shadow-sm border border-slate-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                Abhishek Mobile — 3 Morning Actions
              </span>
              <Badge variant="rose" size="sm">
                CRITICAL
              </Badge>
            </div>

            <div className="space-y-2">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1">
                <div className="flex justify-between items-center text-[11px] font-semibold text-slate-800">
                  <span>1. Sharma Telecom Wholesale Bill</span>
                  <span className="text-rose-600 font-mono font-bold">₹45,000 Due in 5d</span>
                </div>
                <p className="text-[11px] text-slate-600">
                  Current cash: ₹40,607. Immediate cliff deficit: <strong className="text-rose-600">-₹4,393</strong>.
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-emerald-50/80 border border-emerald-200 space-y-1.5">
                <div className="flex justify-between items-center text-[11px] font-semibold text-emerald-900">
                  <span>2. Overdue Customer Udhaar Recovery</span>
                  <span className="text-emerald-700 font-mono font-bold">+₹3,700 Unlocked</span>
                </div>
                <p className="text-[11px] text-emerald-800/90 leading-tight">
                  Amit Verma (₹2,200) & Neha Sharma (₹1,500) owe money past 30 days. Send WhatsApp paylink with 2% discount.
                </p>

                {hasDispatched ? (
                  <div className="p-2 rounded-lg bg-emerald-100 text-emerald-800 text-[11px] font-semibold flex items-center gap-1.5">
                    <CheckCheck className="w-4 h-4 text-emerald-600" />
                    <span>WhatsApp paylinks dispatched to customers!</span>
                  </div>
                ) : (
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={handleQuickDispatch}
                    className="w-full text-xs font-semibold py-1.5 gap-1.5 shadow-sm"
                  >
                    <Send className="w-3.5 h-3.5" />
                    1-Click Dispatch WhatsApp Paylinks
                  </Button>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[10px] text-slate-500">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                100% Verifiable Math • Zero Hallucination
              </span>
              <button
                onClick={() => {
                  setIsBriefingOpen(false);
                  openEvidenceDrawer('EVI-CLIFF-001');
                }}
                className="text-indigo-600 hover:underline flex items-center gap-0.5 font-semibold"
              >
                Inspect Proof <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* WhatsApp Footer */}
        <div className="bg-[#f0f2f5] px-4 py-2.5 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
          <span className="text-[11px] text-slate-500">
            Delivered directly to Abhishek Kumar's registered phone
          </span>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              stopSpeech();
              setIsBriefingOpen(false);
            }}
            className="text-xs py-1"
          >
            Close Briefing
          </Button>
        </div>
      </div>
    </div>
  );
};