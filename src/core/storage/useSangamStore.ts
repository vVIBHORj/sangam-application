import { useState, useEffect } from 'react';
import { 
  UserRole, 
  SeniorProfile, 
  Relationship, 
  Medication, 
  MedicationEvent, 
  DailyCheckIn, 
  SOSIncident, 
  Doctor, 
  Appointment, 
  HospitalPharmacy, 
  CommunityPost, 
  VoiceReply, 
  FamilyMessage, 
  CareTask, 
  HandoverReport, 
  AuditEvent,
  CheckInMood
} from '../domain/types';
import { 
  initialSeniorProfile, 
  initialRelationships, 
  initialMedications, 
  initialMedicationEvents, 
  initialCheckIn, 
  initialDoctors, 
  initialAppointments, 
  initialHospitalsPharmacies, 
  initialCommunityPost, 
  initialVoiceReplies, 
  initialFamilyMessages, 
  initialCareTasks, 
  initialHandoverReport, 
  initialAuditEvents 
} from './seedData';
import { audioService } from '../services/audioService';
import { geoService } from '../services/geoService';
import { inactivityEngine } from '../services/inactivityEngine';

export type AppView = 'GATEWAY' | 'ONBOARDING' | 'APP';

export interface SangamState {
  // Navigation & Role State
  currentView: AppView;
  activeRole: UserRole;
  onboardingStep: 'CAREGIVER_FORM' | 'PAIRING_DISPLAY' | 'SENIOR_WELCOME_1' | 'SENIOR_WELCOME_2' | 'SENIOR_WELCOME_3';
  activeSeniorTab: 'HOME' | 'HEALTH' | 'FAMILY' | 'COMMUNITY' | 'PERMISSIONS' | 'SETTINGS';
  activeFamilyTab: 'DASHBOARD' | 'HEALTH' | 'ACTIVITY' | 'COORDINATION' | 'PROFILE';
  activeCaregiverTab: 'SHIFT' | 'RESIDENTS' | 'HANDOVER' | 'ALERTS';
  
  // Domain State
  senior: SeniorProfile;
  relationships: Relationship[];
  medications: Medication[];
  medicationEvents: MedicationEvent[];
  checkIn: DailyCheckIn;
  sosIncident: SOSIncident | null;
  doctors: Doctor[];
  appointments: Appointment[];
  hospitalsPharmacies: HospitalPharmacy[];
  communityPost: CommunityPost;
  voiceReplies: VoiceReply[];
  familyMessages: FamilyMessage[];
  careTasks: CareTask[];
  handoverReport: HandoverReport;
  auditEvents: AuditEvent[];
  
  // Accessibility & Preferences
  fontScale: number; // 1.0 to 1.35
  isAudioMuted: boolean;
}

const STORAGE_KEY = 'sangam_state_v1';

const getInitialState = (): SangamState => {
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...parsed,
          // Always ensure healthy defaults
          currentView: parsed.currentView || 'GATEWAY',
          activeRole: parsed.activeRole || 'OLDER_ADULT',
        };
      }
    } catch {
      // Fallback
    }
  }

  return {
    currentView: 'GATEWAY',
    activeRole: 'OLDER_ADULT',
    onboardingStep: 'CAREGIVER_FORM',
    activeSeniorTab: 'HOME',
    activeFamilyTab: 'DASHBOARD',
    activeCaregiverTab: 'SHIFT',

    senior: initialSeniorProfile,
    relationships: initialRelationships,
    medications: initialMedications,
    medicationEvents: initialMedicationEvents,
    checkIn: initialCheckIn,
    sosIncident: null,
    doctors: initialDoctors,
    appointments: initialAppointments,
    hospitalsPharmacies: initialHospitalsPharmacies,
    communityPost: initialCommunityPost,
    voiceReplies: initialVoiceReplies,
    familyMessages: initialFamilyMessages,
    careTasks: initialCareTasks,
    handoverReport: initialHandoverReport,
    auditEvents: initialAuditEvents,

    fontScale: 1.0,
    isAudioMuted: false,
  };
};

let globalState: SangamState = getInitialState();
const listeners = new Set<(state: SangamState) => void>();

function notifyListeners() {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(globalState));
    } catch {
      // Storage quota or privacy mode
    }
  }
  listeners.forEach((listener) => listener(globalState));
}

export function updateSangamState(updater: (prev: SangamState) => Partial<SangamState>) {
  const updates = updater(globalState);
  globalState = { ...globalState, ...updates };
  notifyListeners();
}

export function useSangamStore() {
  const [state, setState] = useState<SangamState>(globalState);

  useEffect(() => {
    const listener = (newState: SangamState) => setState(newState);
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  // Action methods
  const setRole = (role: UserRole) => {
    updateSangamState((prev) => {
      audioService.playChimeTone('tap');
      return {
        activeRole: role,
        currentView: 'APP',
        auditEvents: [
          {
            id: `aud-${Date.now()}`,
            timestamp: new Date().toISOString(),
            actorName: role === 'OLDER_ADULT' ? prev.senior.preferredName : role === 'FAMILY_MEMBER' ? 'Priya Sharma' : 'Nurse Sunita',
            actorRole: role,
            action: 'ROLE_SWITCHED',
            details: `Switched view to ${role}`,
          },
          ...prev.auditEvents,
        ],
      };
    });
  };

  const goToGateway = () => {
    updateSangamState(() => ({ currentView: 'GATEWAY' }));
  };

  const startOnboarding = () => {
    updateSangamState(() => ({
      currentView: 'ONBOARDING',
      onboardingStep: 'CAREGIVER_FORM',
    }));
  };

  const setOnboardingStep = (step: SangamState['onboardingStep']) => {
    updateSangamState(() => ({ onboardingStep: step }));
  };

  const setSeniorTab = (tab: SangamState['activeSeniorTab']) => {
    audioService.playChimeTone('tap');
    updateSangamState(() => ({ activeSeniorTab: tab }));
  };

  const setFamilyTab = (tab: SangamState['activeFamilyTab']) => {
    audioService.playChimeTone('tap');
    updateSangamState(() => ({ activeFamilyTab: tab }));
  };

  const setCaregiverTab = (tab: SangamState['activeCaregiverTab']) => {
    audioService.playChimeTone('tap');
    updateSangamState(() => ({ activeCaregiverTab: tab }));
  };

  // Senior Medication Actions
  const markMedicationTaken = (medicationId: string) => {
    const med = state.medications.find((m) => m.id === medicationId);
    const medName = med ? med.name : 'Medicine';

    updateSangamState((prev) => {
      const now = new Date().toISOString();
      const updatedEvents = prev.medicationEvents.map((ev) => {
        if (ev.medicationId === medicationId && ev.status !== 'TAKEN') {
          return {
            ...ev,
            status: 'TAKEN' as const,
            timestamp: now,
            recordedByRole: prev.activeRole,
            recordedByName: prev.activeRole === 'OLDER_ADULT' ? prev.senior.fullName : 'Nurse Sunita',
          };
        }
        return ev;
      });

      // Spoken voice confirmation
      audioService.speak(`${medName} marked as taken. Good job, ${prev.senior.preferredName}.`);

      return {
        medicationEvents: updatedEvents,
        auditEvents: [
          {
            id: `aud-${Date.now()}`,
            timestamp: now,
            actorName: prev.senior.fullName,
            actorRole: 'OLDER_ADULT',
            action: 'MEDICATION_TAKEN',
            details: `Marked ${medName} as taken`,
          },
          ...prev.auditEvents,
        ],
      };
    });
  };

  const snoozeMedication = (medicationId: string, minutes: number = 15) => {
    const med = state.medications.find((m) => m.id === medicationId);
    const medName = med ? med.name : 'Medicine';

    updateSangamState((prev) => {
      const snoozeTime = new Date(Date.now() + minutes * 60000).toISOString();
      audioService.speak(`Reminder set for ${medName} in ${minutes} minutes.`);

      return {
        medicationEvents: prev.medicationEvents.map((ev) => {
          if (ev.medicationId === medicationId) {
            return {
              ...ev,
              status: 'SNOOZED' as const,
              snoozeUntil: snoozeTime,
            };
          }
          return ev;
        }),
        auditEvents: [
          {
            id: `aud-${Date.now()}`,
            timestamp: new Date().toISOString(),
            actorName: prev.senior.fullName,
            actorRole: 'OLDER_ADULT',
            action: 'MEDICATION_SNOOZED',
            details: `Snoozed ${medName} for ${minutes} minutes`,
          },
          ...prev.auditEvents,
        ],
      };
    });
  };

  // Senior Check-in Action
  const submitCheckIn = (mood: CheckInMood) => {
    let label = 'Feeling Good 😊';
    let voiceMessage = 'Glad to hear you are feeling good today!';
    if (mood === 'OKAY') {
      label = 'Feeling Okay 🙂';
      voiceMessage = 'Thank you for checking in. Have a peaceful day!';
    } else if (mood === 'NOT_GREAT') {
      label = 'Not Great 😐';
      voiceMessage = 'We notified your family so they can call you soon.';
    } else if (mood === 'NEED_HELP') {
      label = 'Need Help 😟';
      voiceMessage = 'Your family has been alerted that you need help.';
    }

    audioService.speak(voiceMessage);

    updateSangamState((prev) => {
      const newCheckIn: DailyCheckIn = {
        id: `chk-${Date.now()}`,
        seniorId: prev.senior.id,
        date: new Date().toISOString().split('T')[0],
        timestamp: new Date().toISOString(),
        mood,
        moodLabel: label,
        respondedByRole: 'OLDER_ADULT',
      };

      return {
        checkIn: newCheckIn,
        auditEvents: [
          {
            id: `aud-${Date.now()}`,
            timestamp: new Date().toISOString(),
            actorName: prev.senior.fullName,
            actorRole: 'OLDER_ADULT',
            action: 'CHECK_IN_COMPLETED',
            details: `Checked in as: ${label}`,
          },
          ...prev.auditEvents,
        ],
      };
    });
  };

  // SOS Flow Actions
  const triggerSOS = async () => {
    const loc = await geoService.getCurrentLocation();
    audioService.speak(
      `Help alert sent to your family. Priya and Rohan are notified. Stay calm, help is on the way.`,
      'HIGH'
    );

    updateSangamState((prev) => {
      const incident: SOSIncident = {
        id: `sos-${Date.now()}`,
        seniorId: prev.senior.id,
        seniorName: prev.senior.fullName,
        triggeredAt: new Date().toISOString(),
        status: 'ACTIVE',
        location: loc,
        notifiedContacts: prev.relationships.map((r) => ({
          name: r.displayName,
          phone: r.phone,
          status: 'NOTIFIED',
        })),
        notes: 'Emergency SOS button triggered from Senior Home screen.',
      };

      return {
        sosIncident: incident,
        auditEvents: [
          {
            id: `aud-${Date.now()}`,
            timestamp: new Date().toISOString(),
            actorName: prev.senior.fullName,
            actorRole: 'OLDER_ADULT',
            action: 'SOS_TRIGGERED',
            details: `SOS Emergency Alert triggered at ${loc.addressDescription}`,
          },
          ...prev.auditEvents,
        ],
      };
    });
  };

  const resolveSOS = () => {
    audioService.speak('Emergency alert has been marked as resolved.');
    updateSangamState((prev) => ({
      sosIncident: prev.sosIncident
        ? {
            ...prev.sosIncident,
            status: 'RESOLVED',
            resolvedAt: new Date().toISOString(),
          }
        : null,
      auditEvents: [
        {
          id: `aud-${Date.now()}`,
          timestamp: new Date().toISOString(),
          actorName: prev.activeRole === 'OLDER_ADULT' ? prev.senior.fullName : 'Family / Caregiver',
          actorRole: prev.activeRole,
          action: 'SOS_RESOLVED',
          details: 'SOS incident resolved and marked safe',
        },
        ...prev.auditEvents,
      ],
    }));
  };

  const cancelSOS = () => {
    audioService.speak('No alert was sent. You are on the home screen.');
    updateSangamState((prev) => ({
      sosIncident: null,
      auditEvents: [
        {
          id: `aud-${Date.now()}`,
          timestamp: new Date().toISOString(),
          actorName: prev.senior.fullName,
          actorRole: 'OLDER_ADULT',
          action: 'SOS_CANCELLED',
          details: 'SOS confirmation cancelled (false alarm prevention)',
        },
        ...prev.auditEvents,
      ],
    }));
  };

  // Autonomous Permission Revocation
  const revokeRelationship = (relationshipId: string) => {
    const rel = state.relationships.find((r) => r.id === relationshipId);
    const relName = rel ? rel.displayName : 'Contact';

    audioService.speak(`Access removed for ${relName}.`);

    updateSangamState((prev) => ({
      relationships: prev.relationships.filter((r) => r.id !== relationshipId),
      auditEvents: [
        {
          id: `aud-${Date.now()}`,
          timestamp: new Date().toISOString(),
          actorName: prev.senior.fullName,
          actorRole: 'OLDER_ADULT',
          action: 'PERMISSION_REVOKED',
          details: `Autonomous revocation: removed access for ${relName}`,
        },
        ...prev.auditEvents,
      ],
    }));
  };

  // Community Voice Post
  const addVoiceReply = (transcription: string, durationSec: number) => {
    audioService.speak('Your memory was shared with the Sangam community.');
    updateSangamState((prev) => {
      const newReply: VoiceReply = {
        id: `reply-${Date.now()}`,
        postId: prev.communityPost.id,
        authorName: prev.senior.fullName,
        authorCity: prev.senior.address.city,
        durationSec,
        createdAt: new Date().toISOString(),
        transcription,
      };

      return {
        voiceReplies: [newReply, ...prev.voiceReplies],
        communityPost: {
          ...prev.communityPost,
          voiceRepliesCount: prev.communityPost.voiceRepliesCount + 1,
        },
      };
    });
  };

  // Caregiver Task Management
  const completeTask = (taskId: string, vitals?: CareTask['vitalsData'], concernNote?: string) => {
    updateSangamState((prev) => ({
      careTasks: prev.careTasks.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            status: concernNote ? 'FLAGGED' : 'COMPLETED',
            completedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            vitalsData: vitals || task.vitalsData,
            concernNote: concernNote || task.concernNote,
          };
        }
        return task;
      }),
      auditEvents: [
        {
          id: `aud-${Date.now()}`,
          timestamp: new Date().toISOString(),
          actorName: 'Nurse Sunita',
          actorRole: 'CAREGIVER',
          action: 'TASK_COMPLETED',
          details: `Completed task: ${taskId}${concernNote ? ` (Flagged: ${concernNote})` : ''}`,
        },
        ...prev.auditEvents,
      ],
    }));
  };

  // Caregiver Handover Sign-off
  const signHandover = (outgoingName: string, incomingName: string) => {
    audioService.speak('Shift handover report signed and submitted.');
    updateSangamState((prev) => ({
      handoverReport: {
        ...prev.handoverReport,
        outgoingCaregiverName: outgoingName,
        incomingCaregiverName: incomingName,
        isSignedOut: true,
        signedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
      auditEvents: [
        {
          id: `aud-${Date.now()}`,
          timestamp: new Date().toISOString(),
          actorName: outgoingName,
          actorRole: 'CAREGIVER',
          action: 'HANDOVER_SIGNED',
          details: `Shift handover completed to ${incomingName}`,
        },
        ...prev.auditEvents,
      ],
    }));
  };

  // Accessibility Controls
  const setFontScale = (scale: number) => {
    updateSangamState(() => ({ fontScale: scale }));
  };

  const toggleAudioMute = () => {
    const nextMuted = !state.isAudioMuted;
    audioService.setMuted(nextMuted);
    updateSangamState(() => ({ isAudioMuted: nextMuted }));
  };

  // Reset to Seed
  const resetToSeed = () => {
    localStorage.removeItem(STORAGE_KEY);
    globalState = getInitialState();
    notifyListeners();
  };

  // Derived Inactivity Status
  const inactivityStatus = inactivityEngine.calculateStatus(state.checkIn.timestamp);

  // Derived Medication Adherence % (Taken / Total scheduled)
  const totalEvents = state.medicationEvents.length;
  const takenEvents = state.medicationEvents.filter((e) => e.status === 'TAKEN').length;
  const adherencePercentage = totalEvents > 0 ? Math.round((takenEvents / totalEvents) * 100) : 100;

  return {
    state,
    setRole,
    goToGateway,
    startOnboarding,
    setOnboardingStep,
    setSeniorTab,
    setFamilyTab,
    setCaregiverTab,
    markMedicationTaken,
    snoozeMedication,
    submitCheckIn,
    triggerSOS,
    resolveSOS,
    cancelSOS,
    revokeRelationship,
    addVoiceReply,
    completeTask,
    signHandover,
    setFontScale,
    toggleAudioMute,
    resetToSeed,
    inactivityStatus,
    adherencePercentage,
  };
}
