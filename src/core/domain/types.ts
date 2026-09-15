// SANGAM Core Domain Types
// Strictly modeled for multi-role separation, clinical safety, and privacy

export type UserRole = 'FAMILY_MEMBER' | 'OLDER_ADULT' | 'CAREGIVER';

export interface User {
  id: string;
  phone: string;
  fullName: string;
  role: UserRole;
  avatarUrl?: string;
  relationToSenior?: string; // e.g. "Daughter", "Primary Caregiver"
  createdAt: string;
}

export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

export interface SeniorProfile {
  id: string;
  fullName: string;
  preferredName: string; // e.g. "Kavita ji", "Mom"
  age: number;
  birthYear: number;
  avatarUrl: string;
  bloodGroup: BloodGroup;
  allergies: string[];
  chronicConditions: string[];
  pairingCode: string; // 6-digit code e.g. "582-914"
  isPaired: boolean;
  address: {
    line1: string;
    city: string;
    state: string;
    postalCode: string;
    latitude: number;
    longitude: number;
  };
  emergencyContactIds: string[];
  ayushmanCardNumber?: string;
  primaryDoctorId: string;
}

export type RelationType = 'DAUGHTER' | 'SON' | 'SPOUSE' | 'SIBLING' | 'RELATIVE' | 'PROFESSIONAL_CAREGIVER';

export interface Relationship {
  id: string;
  seniorId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  relationType: RelationType;
  displayName: string; // e.g. "Priya (Daughter)"
  phone: string;
  isPrimaryContact: boolean;
  canManageMedications: boolean;
  canViewHealthRecords: boolean;
  canReceiveSOS: boolean;
  accessGrantedAt: string;
}

export type PillShape = 'ROUND' | 'OVAL' | 'CAPSULE' | 'LIQUID';

export interface Medication {
  id: string;
  seniorId: string;
  name: string;
  dosage: string; // e.g. "5mg", "1 Tablet"
  timingLabel: string; // e.g. "Morning (After Breakfast)"
  scheduledTime: string; // "08:30"
  instructions: string; // "Take with warm water"
  purpose?: string;
  shape: PillShape;
  colorCode: string; // e.g. "#197278"
  stockCount: number;
  refillThreshold: number; // e.g. 5 days remaining
  prescribedBy: string; // Doctor name
}

export type MedicationStatus = 'PENDING' | 'TAKEN' | 'SNOOZED' | 'MISSED';

export interface MedicationEvent {
  id: string;
  medicationId: string;
  seniorId: string;
  medicationName: string;
  scheduledTime: string;
  timestamp?: string;
  status: MedicationStatus;
  recordedByRole: UserRole;
  recordedByName: string;
  snoozeUntil?: string;
  note?: string;
}

export type CheckInMood = 'GOOD' | 'OKAY' | 'NOT_GREAT' | 'NEED_HELP';

export interface DailyCheckIn {
  id: string;
  seniorId: string;
  date: string; // YYYY-MM-DD
  timestamp: string;
  mood: CheckInMood;
  moodLabel: string; // "Feeling Good 😊"
  voiceNoteUrl?: string;
  respondedByRole: UserRole;
}

export type SOSStatus = 'CONFIRMING' | 'ACTIVE' | 'RESOLVED' | 'FALSE_ALARM';

export interface SOSIncident {
  id: string;
  seniorId: string;
  seniorName: string;
  triggeredAt: string;
  resolvedAt?: string;
  status: SOSStatus;
  location: {
    latitude: number;
    longitude: number;
    addressDescription: string;
  };
  notifiedContacts: {
    name: string;
    phone: string;
    status: 'NOTIFIED' | 'ACKNOWLEDGED';
  }[];
  notes?: string;
}

export interface Doctor {
  id: string;
  fullName: string;
  specialty: string; // e.g. "Cardiologist", "Geriatrician"
  hospitalName: string;
  phone: string;
  availableDays: string;
}

export interface Appointment {
  id: string;
  seniorId: string;
  doctorId: string;
  doctorName: string;
  specialty: string;
  hospitalName: string;
  dateTime: string; // ISO format
  purpose: string;
  accompaniedBy?: string; // e.g. "Son Rohan"
  isCompleted: boolean;
}

export interface HospitalPharmacy {
  id: string;
  name: string;
  type: 'HOSPITAL' | 'PHARMACY';
  address: string;
  distanceKm: number;
  phone: string;
  openHours: string;
  isEmergency24x7: boolean;
}

export interface CommunityPost {
  id: string;
  date: string;
  topicTitle: string; // e.g. "Monsoon Chai & Childhood Rains"
  topicPrompt: string; // "What is your favorite memory of monsoon with family?"
  category: 'MEMORIES' | 'GARDENING' | 'COOKING' | 'SPIRITUALITY' | 'MUSIC';
  audioDurationSec: number;
  featuredStoryBy: string; // "Meena ji (Bengaluru)"
  featuredStoryAudioText: string;
  voiceRepliesCount: number;
}

export interface VoiceReply {
  id: string;
  postId: string;
  authorName: string;
  authorCity: string;
  durationSec: number;
  createdAt: string;
  transcription?: string;
  audioSimulatedUrl?: string;
}

export interface FamilyMessage {
  id: string;
  seniorId: string;
  senderName: string;
  senderRelation: string;
  senderAvatar: string;
  type: 'VOICE_NOTE' | 'PHOTO' | 'TEXT';
  contentUrl?: string;
  textMessage?: string;
  durationSec?: number;
  sentAt: string;
  listenedBySenior: boolean;
  listenedAt?: string;
}

export interface CaregiverAssignment {
  id: string;
  caregiverId: string;
  caregiverName: string;
  seniorId: string;
  seniorName: string;
  status: 'ACTIVE' | 'ENDED';
  assignedAt: string;
  endedAt?: string;
}

export type TaskCategory = 'MEDICATION' | 'VITALS' | 'MEAL' | 'MOBILITY' | 'HYGIENE' | 'APPOINTMENT';
export type TaskStatus = 'PENDING' | 'DUE_NOW' | 'COMPLETED' | 'FLAGGED';

export interface CareTask {
  id: string;
  seniorId: string;
  caregiverId: string;
  title: string;
  description?: string;
  category: TaskCategory;
  scheduledTime: string;
  status: TaskStatus;
  completedAt?: string;
  vitalsData?: {
    bloodPressure?: string; // e.g. "126/80"
    bloodSugar?: number; // e.g. 110 mg/dL
    spO2?: number; // e.g. 98%
    pulse?: number; // e.g. 72 bpm
    weightKg?: number; // e.g. 64.5 kg
  };
  concernNote?: string;
}

export interface HandoverReport {
  id: string;
  shiftName: string; // e.g. "Day Shift (08:00 – 16:00)"
  date: string;
  seniorName: string;
  outgoingCaregiverName: string;
  incomingCaregiverName?: string;
  completedCount: number;
  pendingCount: number;
  concernsCount: number;
  completedItems: string[];
  pendingItems: string[];
  concernsObserved: string[];
  escalationsMade: string[];
  isSignedOut: boolean;
  signedAt?: string;
}

export interface ChatMessage {
  id: string;
  threadId: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  type: 'TEXT' | 'VOICE_NOTE';
  textMessage?: string;
  audioDurationSec?: number;
  timestamp: string;
}

export interface ChatThread {
  id: string;
  seniorId: string;
  contactId: string;
  contactName: string;
  contactRole: string; // e.g. "Daughter", "Son", "Caregiver", "Doctor"
  contactAvatar: string;
  contactPhone: string;
  unreadCount: number;
  lastMessageText: string;
  lastMessageTime: string;
}

export type AuditAction = 
  | 'ROLE_SWITCHED'
  | 'MEDICATION_TAKEN'
  | 'MEDICATION_SNOOZED'
  | 'CHECK_IN_COMPLETED'
  | 'SOS_TRIGGERED'
  | 'SOS_CANCELLED'
  | 'SOS_RESOLVED'
  | 'PERMISSION_REVOKED'
  | 'TASK_COMPLETED'
  | 'HANDOVER_SIGNED'
  | 'CAREGIVER_STATS_OPENED'
  | 'CAREGIVER_STAT_PERIOD_CHANGED'
  | 'CAREGIVER_TASK_COMPLETED'
  | 'CAREGIVER_ALERT_OPENED'
  | 'CAREGIVER_HANDOVER_OPENED'
  | 'COMMUNITY_OPENED'
  | 'COMMUNITY_TOPIC_OPENED'
  | 'VOICE_MEMORY_PLAYED'
  | 'VOICE_MEMORY_RECORDING_STARTED'
  | 'VOICE_MEMORY_SHARED'
  | 'CHAT_OPENED'
  | 'CHAT_MESSAGE_SENT'
  | 'CHAT_VOICE_MESSAGE_SENT';

export interface AuditEvent {
  id: string;
  timestamp: string;
  actorName: string;
  actorRole: UserRole;
  action: AuditAction;
  details: string;
}
