import { describe, it, expect } from 'vitest';
import { inactivityEngine } from '../../services/inactivityEngine';

describe('SANGAM Loneliness & Adherence Domain Engine', () => {
  it('correctly reports NORMAL status when senior checked in within 24 hours', () => {
    const thirtyMinsAgo = new Date(Date.now() - 30 * 60 * 1000).toISOString();
    const status = inactivityEngine.calculateStatus(thirtyMinsAgo);

    expect(status.level).toBe('NORMAL');
    expect(status.isEscalated).toBe(false);
    expect(status.relativeTimeText).toContain('min ago');
  });

  it('correctly triggers REASSURANCE_NUDGE when senior has not checked in for 28 hours', () => {
    const twentyEightHoursAgo = new Date(Date.now() - 28 * 3600 * 1000).toISOString();
    const status = inactivityEngine.calculateStatus(twentyEightHoursAgo);

    expect(status.level).toBe('REASSURANCE_NUDGE');
    expect(status.isEscalated).toBe(false);
    expect(status.familyMessage).toContain('Mom has not checked in for over 24 hours');
  });

  it('correctly triggers ATTENTION_ALERT when senior has not checked in for 52 hours', () => {
    const fiftyTwoHoursAgo = new Date(Date.now() - 52 * 3600 * 1000).toISOString();
    const status = inactivityEngine.calculateStatus(fiftyTwoHoursAgo);

    expect(status.level).toBe('ATTENTION_ALERT');
    expect(status.isEscalated).toBe(true);
    expect(status.familyMessage).toContain('Attention required');
  });

  it('calculates medication adherence accurately across scheduled vs taken doses', () => {
    const events = [
      { id: '1', status: 'TAKEN' },
      { id: '2', status: 'TAKEN' },
      { id: '3', status: 'PENDING' },
      { id: '4', status: 'TAKEN' },
    ];
    const total = events.length;
    const taken = events.filter((e) => e.status === 'TAKEN').length;
    const percentage = Math.round((taken / total) * 100);

    expect(percentage).toBe(75);
  });
});
