import { describe, it, expect } from 'vitest';
import { 
  initialCaregiverAssignment, 
  initialCareTasks, 
  initialSeniorProfile,
  initialChatThreads,
  initialChatMessages,
  initialAlertHistory,
  initialCommunityPost
} from '../../storage/seedData';

describe('SANGAM 1:1 Caregiver Assignment, Stats & Chat Verification', () => {
  it('enforces 1:1 Caregiver Assignment to exactly ONE Senior', () => {
    // Caregiver is assigned to exactly one senior profile
    expect(initialCaregiverAssignment.caregiverId).toBe('user-sunita');
    expect(initialCaregiverAssignment.seniorId).toBe(initialSeniorProfile.id);
    expect(initialCaregiverAssignment.status).toBe('ACTIVE');

    // All care tasks belong to the single assigned senior
    const allAssignedToSingleSenior = initialCareTasks.every(
      (task) => task.seniorId === initialSeniorProfile.id
    );
    expect(allAssignedToSingleSenior).toBe(true);
  });

  it('verifies "8 / 10 tasks completed" state for today\'s shift', () => {
    expect(initialCareTasks.length).toBe(10);
    const completedTasks = initialCareTasks.filter(
      (t) => t.status === 'COMPLETED' || t.status === 'FLAGGED'
    );
    expect(completedTasks.length).toBe(8);

    const pendingOrDue = initialCareTasks.filter(
      (t) => t.status === 'DUE_NOW' || t.status === 'PENDING'
    );
    expect(pendingOrDue.length).toBe(2);
  });

  it('validates Caregiver Stats baseline data and verified vitals', () => {
    expect(initialSeniorProfile.chronicConditions).toContain('Hypertension');
    expect(initialSeniorProfile.chronicConditions).toContain('Type 2 Diabetes');
    expect(initialSeniorProfile.bloodGroup).toBe('B+');

    // Alert history items are properly recorded with severity and status
    expect(initialAlertHistory.length).toBeGreaterThanOrEqual(2);
    expect(initialAlertHistory.every((a) => a.status === 'RESOLVED')).toBe(true);
    expect(initialAlertHistory[0].title.toLowerCase()).toContain('morning walk');
    expect(initialAlertHistory[1].title.toLowerCase()).toContain('sos');
  });

  it('verifies Private Chat isolation and contacts', () => {
    expect(initialChatThreads.length).toBeGreaterThanOrEqual(3);

    // Primary contacts: Family, Caregiver, Doctor
    const roles = initialChatThreads.map((t) => t.contactRole);
    expect(roles).toContain('Son');
    expect(roles).toContain('Caregiver');
    expect(roles).toContain('Doctor');

    // Messages exist for the thread
    const familyMessages = initialChatMessages.filter((m) => m.threadId === 'thread-rohan');
    expect(familyMessages.length).toBeGreaterThan(0);
  });

  it('verifies editorial community discussion configuration', () => {
    expect(initialCommunityPost.topicTitle).toBe('Monsoon Memories & Childhood Rains');
    expect(initialCommunityPost.topicPrompt).toContain('rainy-day memory');
  });
});
