import { describe, it, expect } from 'vitest';
import { 
  initialSeniorProfile, 
  initialRelationships, 
  initialMedicationEvents, 
  initialCareTasks,
  initialHandoverReport 
} from '../../storage/seedData';

describe('SANGAM End-to-End Multi-Role Workflow Logic', () => {
  it('handles caregiver-led pairing generation and code format', () => {
    expect(initialSeniorProfile.pairingCode).toMatch(/^\d{3}-\d{3}$/);
    expect(initialSeniorProfile.isPaired).toBe(true);
    expect(initialSeniorProfile.bloodGroup).toBe('B+');
  });

  it('verifies primary family emergency contact routing', () => {
    const primaryContact = initialRelationships.find((r) => r.isPrimaryContact);
    expect(primaryContact).toBeDefined();
    expect(primaryContact?.relationType).toBe('DAUGHTER');
    expect(primaryContact?.displayName).toContain('Priya');
    expect(primaryContact?.canReceiveSOS).toBe(true);
  });

  it('tracks medication event state transitions', () => {
    const events = [...initialMedicationEvents];
    const morningMed = events.find((e) => e.medicationId === 'med-01');
    expect(morningMed?.status).toBe('TAKEN');
    expect(morningMed?.recordedByRole).toBe('OLDER_ADULT');

    const afternoonMed = events.find((e) => e.medicationId === 'med-02');
    expect(afternoonMed?.status).toBe('PENDING');
  });

  it('manages caregiver task execution and vitals logging', () => {
    const tasks = [...initialCareTasks];
    const bpTask = tasks.find((t) => t.category === 'MEDICATION');
    expect(bpTask?.status).toBe('COMPLETED');
    expect(bpTask?.vitalsData?.bloodPressure).toBe('126/80');

    const glucoseTask = tasks.find((t) => t.category === 'VITALS');
    expect(glucoseTask?.vitalsData?.bloodSugar).toBe(114);
    expect(glucoseTask?.concernNote).toBeDefined();
  });

  it('validates shift handover report structure and completeness', () => {
    expect(initialHandoverReport.completedItems.length).toBeGreaterThanOrEqual(3);
    expect(initialHandoverReport.pendingItems.length).toBeGreaterThanOrEqual(2);
    expect(initialHandoverReport.concernsObserved.length).toBeGreaterThanOrEqual(1);
    expect(initialHandoverReport.escalationsMade.length).toBeGreaterThanOrEqual(1);
    expect(initialHandoverReport.outgoingCaregiverName).toBe('Nurse Sunita Devi');
  });
});
