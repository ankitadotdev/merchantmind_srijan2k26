// ============================================================================
// MERCHANTMIND — SPEECH & PAYTM SOUNDBOX AUDIO UTILITIES
// ============================================================================
// Web Speech API wrapper for speech recognition + text-to-speech
// Synthesizes authentic Paytm Soundbox chime via Web Audio API without external mp3s.

/**
 * Plays a cheerful, recognizable 2-tone chime resembling a merchant soundbox.
 */
export function playSoundboxChime(): void {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();

    const now = ctx.currentTime;
    
    // Note 1: 587.33 Hz (D5)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(587.33, now);
    gain1.gain.setValueAtTime(0.15, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.2);

    // Note 2: 880 Hz (A5)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(880, now + 0.15);
    gain2.gain.setValueAtTime(0.2, now + 0.15);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.15);
    osc2.stop(now + 0.5);
  } catch (err) {
    console.warn('Web Audio chime not supported or blocked:', err);
  }
}

/**
 * Speaks text using browser SpeechSynthesis with language selection.
 */
export function speakText(
  text: string,
  language: 'en' | 'hi' = 'hi',
  onEnd?: () => void
): void {
  if (typeof window === 'undefined' || !window.speechSynthesis) {
    if (onEnd) onEnd();
    return;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  // Play chime first
  playSoundboxChime();

  setTimeout(() => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
    utterance.rate = 0.95; // Slightly measured, clear rate for shopkeeper clarity
    utterance.pitch = 1.0;

    // Try finding an Indian English / Hindi voice if available
    const voices = window.speechSynthesis.getVoices();
    const matchVoice = voices.find(
      (v) =>
        v.lang === (language === 'hi' ? 'hi-IN' : 'en-IN') ||
        (language === 'hi' && v.name.toLowerCase().includes('hindi')) ||
        (language === 'en' && v.name.toLowerCase().includes('india'))
    );
    if (matchVoice) {
      utterance.voice = matchVoice;
    }

    if (onEnd) {
      utterance.onend = onEnd;
      utterance.onerror = onEnd;
    }

    window.speechSynthesis.speak(utterance);
  }, 250);
}

/**
 * Stops ongoing speech.
 */
export function stopSpeech(): void {
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
}

/**
 * Check if speech recognition is available in the browser.
 */
export function isSpeechRecognitionSupported(): boolean {
  if (typeof window === 'undefined') return false;
  return Boolean(
    (window as unknown as { SpeechRecognition: unknown }).SpeechRecognition ||
    (window as unknown as { webkitSpeechRecognition: unknown }).webkitSpeechRecognition
  );
}

export interface SpeechRecognitionController {
  start: () => void;
  stop: () => void;
}

/**
 * Creates a speech recognition listener.
 */
export function startVoiceRecognition(
  language: 'en' | 'hi',
  onResult: (transcript: string) => void,
  onError: (err: unknown) => void,
  onEnd: () => void
): SpeechRecognitionController | null {
  if (typeof window === 'undefined') return null;

  const SpeechRecognitionClass =
    (window as unknown as { SpeechRecognition: new () => SpeechRecognitionInstance }).SpeechRecognition ||
    (window as unknown as { webkitSpeechRecognition: new () => SpeechRecognitionInstance }).webkitSpeechRecognition;

  if (!SpeechRecognitionClass) {
    onError(new Error('Speech recognition not supported in this browser.'));
    return null;
  }

  const recognition = new SpeechRecognitionClass();
  recognition.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
  recognition.continuous = false;
  recognition.interimResults = false;

  recognition.onresult = (event: SpeechRecognitionEvent) => {
    if (event.results && event.results[0] && event.results[0][0]) {
      const text = event.results[0][0].transcript;
      onResult(text);
    }
  };

  recognition.onerror = (event: unknown) => {
    onError(event);
  };

  recognition.onend = () => {
    onEnd();
  };

  try {
    recognition.start();
    return {
      start: () => recognition.start(),
      stop: () => recognition.stop(),
    };
  } catch (e) {
    onError(e);
    return null;
  }
}

// Minimal types for browser recognition instances
interface SpeechRecognitionEvent {
  results: {
    [index: number]: {
      [index: number]: {
        transcript: string;
      };
    };
  };
}

interface SpeechRecognitionInstance {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: unknown) => void) | null;
  onend: (() => void) | null;
}