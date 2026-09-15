// Proactive Loneliness Detection & Inactivity Escalation Engine
// Grounded in LASI research: flags early withdrawal before crisis

export type InactivityLevel = 'NORMAL' | 'REASSURANCE_NUDGE' | 'ATTENTION_ALERT';

export interface InactivityStatus {
  level: InactivityLevel;
  hoursElapsed: number;
  relativeTimeText: string;
  familyMessage: string;
  isEscalated: boolean;
}

export const inactivityEngine = {
  calculateStatus(lastCheckInIsoString: string): InactivityStatus {
    const lastCheckIn = new Date(lastCheckInIsoString).getTime();
    const now = Date.now();
    const diffMs = Math.max(0, now - lastCheckIn);
    const hoursElapsed = diffMs / (1000 * 60 * 60);

    let relativeTimeText = '';
    if (hoursElapsed < 1) {
      const minutes = Math.max(1, Math.round(diffMs / (1000 * 60)));
      relativeTimeText = `Checked in ${minutes} min ago`;
    } else if (hoursElapsed < 24) {
      const hours = Math.floor(hoursElapsed);
      relativeTimeText = `Checked in ${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    } else {
      const days = Math.floor(hoursElapsed / 24);
      relativeTimeText = `Last checked in ${days} ${days === 1 ? 'day' : 'days'} ago`;
    }

    if (hoursElapsed < 24) {
      return {
        level: 'NORMAL',
        hoursElapsed,
        relativeTimeText,
        familyMessage: 'Everything looks good. Parent has checked in today.',
        isEscalated: false,
      };
    } else if (hoursElapsed < 48) {
      return {
        level: 'REASSURANCE_NUDGE',
        hoursElapsed,
        relativeTimeText,
        familyMessage: 'Mom has not checked in for over 24 hours. Send a warm voice note or call to say hello.',
        isEscalated: false,
      };
    } else {
      return {
        level: 'ATTENTION_ALERT',
        hoursElapsed,
        relativeTimeText,
        familyMessage: 'Attention required: No check-in for 48+ hours. Please verify with local caregiver or call.',
        isEscalated: true,
      };
    }
  },
};
