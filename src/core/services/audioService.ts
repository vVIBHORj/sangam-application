// Audio Confirmation Service for SANGAM
// Uses Web Speech API (speechSynthesis) with graceful chimes and cancellation

class AudioConfirmationService {
  private isMuted: boolean = false;
  private isSpeechSupported: boolean = false;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.isSpeechSupported = true;
    }
  }

  public setMuted(muted: boolean): void {
    this.isMuted = muted;
    if (muted && this.isSpeechSupported) {
      window.speechSynthesis.cancel();
    }
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public speak(message: string, priority: 'HIGH' | 'NORMAL' = 'NORMAL'): void {
    if (this.isMuted || !this.isSpeechSupported) {
      this.playChimeTone(priority === 'HIGH' ? 'urgent' : 'success');
      return;
    }

    try {
      // Cancel previous speech if running to prevent speech pile-up
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(message);
      utterance.rate = 0.9; // Slightly slower, clearer rate for older adults
      utterance.pitch = 1.0;
      utterance.lang = 'en-IN'; // Indian English cadence if supported

      // Fallback voice selection for high clarity
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(
        (v) => (v.lang.includes('en-IN') || v.lang.includes('en-GB') || v.lang.includes('en-US')) && !v.name.includes('Google')
      ) || voices[0];
      
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      window.speechSynthesis.speak(utterance);
    } catch {
      // Fallback to synthetic web audio chime
      this.playChimeTone(priority === 'HIGH' ? 'urgent' : 'success');
    }
  }

  public stop(): void {
    if (this.isSpeechSupported) {
      window.speechSynthesis.cancel();
    }
  }

  public playChimeTone(type: 'success' | 'urgent' | 'tap' = 'tap'): void {
    if (this.isMuted || typeof window === 'undefined') return;
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;
      
      const ctx = new AudioContextClass();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'success') {
        // Harmonious major chord chime (523Hz -> 659Hz)
        osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        osc.frequency.exponentialRampToValueAtTime(659.25, ctx.currentTime + 0.15); // E5
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
        osc.start();
        osc.stop(ctx.currentTime + 0.35);
      } else if (type === 'urgent') {
        // Low urgent alert tone
        osc.frequency.setValueAtTime(880, ctx.currentTime);
        osc.frequency.setValueAtTime(440, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.25, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
        osc.start();
        osc.stop(ctx.currentTime + 0.4);
      } else {
        // Soft tactile tap feedback
        osc.frequency.setValueAtTime(300, ctx.currentTime);
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
        osc.start();
        osc.stop(ctx.currentTime + 0.08);
      }
    } catch {
      // Ignore audio context errors silently
    }
  }
}

export const audioService = new AudioConfirmationService();
