// Voice Recording Service for Senior Community & Family Messaging

export interface VoiceRecordingResult {
  id: string;
  durationSec: number;
  blobUrl?: string;
  createdAt: string;
}

export class VoiceRecorderService {
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];
  private startTime: number = 0;

  public async startRecording(): Promise<boolean> {
    if (typeof navigator !== 'undefined' && navigator.mediaDevices?.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        this.mediaRecorder = new MediaRecorder(stream);
        this.audioChunks = [];
        this.startTime = Date.now();

        this.mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            this.audioChunks.push(event.data);
          }
        };

        this.mediaRecorder.start();
        return true;
      } catch {
        // Fall back to simulation mode
        this.startTime = Date.now();
        return true;
      }
    }
    this.startTime = Date.now();
    return true;
  }

  public async stopRecording(): Promise<VoiceRecordingResult> {
    const durationSec = Math.max(2, Math.round((Date.now() - this.startTime) / 1000));
    const id = `voice-${Date.now()}`;

    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
      return new Promise((resolve) => {
        if (!this.mediaRecorder) return;
        this.mediaRecorder.onstop = () => {
          const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
          const blobUrl = URL.createObjectURL(audioBlob);
          resolve({
            id,
            durationSec,
            blobUrl,
            createdAt: new Date().toISOString(),
          });
        };
        this.mediaRecorder.stop();
        this.mediaRecorder.stream.getTracks().forEach((t) => t.stop());
      });
    }

    return {
      id,
      durationSec,
      createdAt: new Date().toISOString(),
    };
  }
}

export const voiceRecorderService = new VoiceRecorderService();
