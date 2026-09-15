# SANGAM: Technical & System Architecture Specification
## Multi-Role Elder Care & Community Platform
*Version 1.0 — September 2026*

---

## 1. Architectural Philosophy & Strategy

### 1.1 One System, Three Experiences
SANGAM is engineered not as three disparate applications, but as **one unified digital care ecosystem** exposing three strictly decoupled user experiences over a robust, shared domain engine.

```
+-------------------------------------------------------------------------------+
|                               SANGAM CLIENT LAYER                             |
|  +---------------------+  +----------------------+  +----------------------+  |
|  |   OLDER ADULT UI    |  |  FAMILY MEMBER UI    |  |  CAREGIVER WORKFLOW  |  |
|  | - 3-Icon Home       |  | - Reassurance Hub    |  | - Shift Manager      |  |
|  | - Senior Health     |  | - Health Vault       |  | - Resident Roster    |  |
|  | - Voice Community   |  | - Sibling Coord      |  | - Task Execution     |  |
|  | - One-Tap SOS       |  | - Adherence Trends   |  | - Shift Handover     |  |
|  +---------------------+  +----------------------+  +----------------------+  |
+-------------------------------------------------------------------------------+
|                           ROLE & PRESENTATION CONTROLLER                      |
|             (Role-based Routing, Progressive Disclosure, Accessibility)       |
+-------------------------------------------------------------------------------+
|                            SHARED DOMAIN & LOGIC LAYER                        |
|  +-------------+  +-------------+  +-------------+  +-----------------------+ |
|  | Health & Rx |  | Safety & SOS|  | Community   |  | Care Coordination     | |
|  +-------------+  +-------------+  +-------------+  +-----------------------+ |
|  +--------------------------+  +-------------------+  +---------------------+ |
|  | Senior-Caregiver Pairing |  | Permission Engine |  | Audit Event Stream  | |
|  +--------------------------+  +-------------------+  +---------------------+ |
+-------------------------------------------------------------------------------+
|                            INFRASTRUCTURE & DATA LAYER                        |
|  +--------------------------+  +--------------------------------------------+ |
|  | Repositories (Rx, SOS)   |  | Local Storage Cache / Offline Sync Manager | |
|  +--------------------------+  +--------------------------------------------+ |
|  +--------------------------+  +--------------------------------------------+ |
|  | TTS & Web Speech Drivers |  | Geo-Location Provider (SOS-only)           | |
|  +--------------------------+  +--------------------------------------------+ |
+-------------------------------------------------------------------------------+
```

---

## 2. Core Domain Models & Entity Relationships

The system is defined around typed domain entities with strict referential integrity.

### 2.1 Entity Relationship Diagram (ERD)
```
[User] (id, phone, name, role)
   |
   +--- 1:1 --- [CaregiverProfile] (qualifications, shiftSchedule, currentResidents)
   |
   +--- 1:N --- [Relationship] (seniorId, userId, relationType, accessLevel)
                   |
                   v
           [SeniorProfile] (id, name, dob, bloodGroup, allergies, emergencyOrder)
                   |
     +-------------+-------------+-------------+-------------+
     |             |             |             |             |
  1:N|          1:N|          1:N|          1:N|          1:N|
     v             v             v             v             v
[Medication]  [CheckIn]     [SOSIncident] [Appointment] [CareTask]
     |             |             |             |             |
  1:N|             |             |             |             |
     v             v             v             v             v
[MedEvent]    [AuditLog]    [AlertEvent]  [Doctor]      [Handover]
```

### 2.2 TypeScript Domain Definitions

#### User & Role
```typescript
export type UserRole = 'OLDER_ADULT' | 'FAMILY_MEMBER' | 'CAREGIVER';

export interface User {
  id: string;
  phone: string;
  fullName: string;
  avatarUrl?: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}
```

#### Senior Profile & Relationships
```typescript
export interface SeniorProfile {
  id: string;
  userId?: string; // May be unlinked until paired
  fullName: string;
  preferredName: string;
  birthYear: number;
  gender: 'MALE' | 'FEMALE' | 'OTHER' | 'PREFER_NOT_TO_SAY';
  avatarUrl: string;
  bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  allergies: string[];
  chronicConditions: string[];
  pairingCode: string; // 6-digit numeric e.g. "582914"
  isPaired: boolean;
  emergencyContactIds: string[];
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
  };
}

export type RelationType = 'SON' | 'DAUGHTER' | 'SPOUSE' | 'SIBLING' | 'RELATIVE' | 'PROFESSIONAL_CAREGIVER';

export interface Relationship {
  id: string;
  seniorId: string;
  userId: string;
  relationType: RelationType;
  displayName: string;
  isPrimaryCaregiver: boolean;
  canManageMedications: boolean;
  canViewHealthRecords: boolean;
  canReceiveSOS: boolean;
  grantedAt: string;
}
```

#### Health & Medication
```typescript
export interface Medication {
  id: string;
  seniorId: string;
  name: string;
  dosage: string; // e.g. "5mg", "1 tablet"
  instruction: string; // e.g. "Take after breakfast with warm water"
  scheduledTimes: string[]; // ["08:30", "20:30"]
  colorCode: string;
  shape: 'ROUND' | 'OVAL' | 'CAPSULE' | 'LIQUID';
  stockCount: number;
  refillThreshold: number;
  prescribedByDoctorId?: string;
}

export interface MedicationEvent {
  id: string;
  medicationId: string;
  seniorId: string;
  scheduledTime: string;
  timestamp: string;
  status: 'TAKEN' | 'SNOOZED' | 'MISSED' | 'SKIPPED';
  recordedByUserId: string; // Senior or caregiver
  snoozeCount?: number;
  notes?: string;
}
```

#### Emergency, SOS & Check-Ins
```typescript
export interface SOSIncident {
  id: string;
  seniorId: string;
  triggeredAt: string;
  resolvedAt?: string;
  location: {
    latitude: number;
    longitude: number;
    accuracyMeters: number;
    addressDescription?: string;
  };
  notifiedUserIds: string[];
  status: 'TRIGGERED' | 'ACKNOWLEDGED' | 'RESOLVED' | 'FALSE_ALARM';
  acknowledgedByUserId?: string;
  notes?: string;
}

export type CheckInMood = 'GOOD' | 'OKAY' | 'NOT_GREAT' | 'NEED_HELP';

export interface DailyCheckIn {
  id: string;
  seniorId: string;
  date: string; // YYYY-MM-DD
  timestamp: string;
  mood: CheckInMood;
  voiceNoteUrl?: string;
  respondedBy: 'SENIOR' | 'ASSISTED';
}
```

#### Professional Caregiver & Handover
```typescript
export interface CareTask {
  id: string;
  seniorId: string;
  caregiverId: string;
  title: string;
  description: string;
  category: 'MEDICATION' | 'VITALS' | 'MEAL' | 'MOBILITY' | 'HYGIENE' | 'APPOINTMENT';
  dueTime: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'FLAGGED';
  completedAt?: string;
  concernNote?: string;
}

export interface HandoverReport {
  id: string;
  shiftId: string;
  caregiverId: string;
  date: string;
  shiftName: string; // "Day Shift (08:00 - 16:00)"
  completedSummary: string[];
  pendingTasks: string[];
  concernsObserved: string[];
  escalationsMade: string[];
  signedByOut: string;
  signedByIn?: string;
}
```

---

## 3. Technology Stack & Architectural Decision Records (ADR)

### ADR-01: Framework & Client Engine
- **Decision:** React 19 + TypeScript + Vite with a modular mobile-first architecture.
- **Rationale:** Ensures immediate local previewing, high-speed HMR, clean mobile emulation, zero build friction, and seamless packaging to Capacitor / React Native Web.

### ADR-02: State Management & Reactive Data Layer
- **Decision:** Zustand store with persistence adapters.
- **Rationale:** Zustand provides minimal boilerplate, distinct role-based slice isolation (`useSeniorStore`, `useFamilyStore`, `useCaregiverStore`), and automatic synchronization with `localStorage` for offline survivability.

### ADR-03: Multi-Modal Audio & Voice Integration
- **Decision:** Native Web Speech API (`window.speechSynthesis` for spoken feedback; `webkitSpeechRecognition` / MediaRecorder for voice notes).
- **Rationale:** Zero external network latency, complete privacy (audio synthesized on device), and full compatibility across standard modern mobile browsers.

---

## 4. Folder Structure (Feature-Based Architecture)

```
/src
  ├── /assets
  │     ├── /icons          # Hand-crafted accessible SVG icons
  │     ├── /doodles        # Sangam minimal line-art illustrations
  │     └── /sounds         # Subtle audio feedback tokens
  ├── /core
  │     ├── /domain         # Typed entities (Senior, Meds, SOS, Tasks)
  │     ├── /services       # TTS Service, Speech-to-Text, Geolocation
  │     ├── /storage        # Repository implementations & mock seeds
  │     └── /utils          # Date helpers, contrast calculators, formatters
  ├── /design-system
  │     ├── /tokens         # Colors, typography, spacing, elevations
  │     ├── /components     # Accessible Button, Card, Icon, Modal, AudioPlayer
  │     └── /layouts        # RoleAppShell, MobileFrame, SeniorLayout
  ├── /features
  │     ├── /role-gate      # Role selection screen & "Need Help Choosing"
  │     ├── /onboarding     # Dual pairing flow (Caregiver-Led & Senior 3-Screen)
  │     ├── /senior         # Older adult experience (3-icon home, health, family, talk, SOS)
  │     ├── /family         # Family reassurance dashboard, health vault, sibling coordination
  │     ├── /caregiver      # Caregiver task manager, resident roster, shift handover
  │     └── /shared         # Permission viewer, emergency contact modal, settings
  ├── App.tsx               # Root role router & theme provider
  ├── index.css             # Foundational design tokens & WCAG reset
  └── main.tsx              # React mounting entry point
```
