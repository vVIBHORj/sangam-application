# SANGAM: Complete Screen Inventory & Route Map
## Exhaustive Screen Specifications Across All Three Roles
*Version 1.0 — September 2026*

---

## 1. Master Route & Navigation Hierarchy

```
/
├── /role-select                      [Shared Gateway: 3 Roles + Help]
├── /onboarding
│     ├── /caregiver-setup            [Adult Child: Create Senior Profile]
│     ├── /pairing-display            [Adult Child: QR & 6-Digit Code]
│     └── /senior-welcome             [Senior 3-Screen First Run]
│
├── /senior                           [Role 2: Older Adult - Minimalist & Large Tap]
│     ├── /home                       [3 Cards + Mood Check-In + Next Rx + SOS]
│     ├── /health                     [Meds, Doctors, Clinic Finder]
│     ├── /family                     [Messages, Photos, One-Tap Call]
│     ├── /community                  [Daily Curated Discussion + Voice Note]
│     ├── /sos-flow                   [2-Step Confirmation & Trigger State]
│     ├── /permissions                ["Who can see my information?"]
│     └── /settings                   [Text Size Slider & Spoken Feedback]
│
├── /family                           [Role 1: Family Member - High Density Reassurance]
│     ├── /dashboard                  [Safety Badge, Adherence %, Next Appt]
│     ├── /health-vault               [Medication Manager, Health Records]
│     ├── /activity-feed              [Real-time Audit Trail & Check-in History]
│     ├── /coordination               [Sibling Chat, Messages to Senior]
│     └── /profile                    [Pairing Manager, Alert Routing]
│
└── /caregiver                        [Role 3: Caregiver - Operational Shift Workflow]
      ├── /shift-today                [Shift Progress, Tasks Due, Urgent Alert]
      ├── /residents                  [Roster, Precautions, Care Plans]
      ├── /task-flow                  [1-Tap Complete, Vitals Entry, Flag Concern]
      ├── /handover                   [Completed, Pending, Concerns, Sign-Off]
      └── /alerts                     [Clinical Alerts & Escalation Logs]
```

---

## 2. Screen Specifications & Content Inventory

### 2.1 Shared Gateway & Onboarding

#### Screen 0.1: Role Selection Gateway (`/role-select`)
- **Header:** SANGAM Wordmark + tagline: *"Care, connection and peace of mind — in one place."*
- **Instructional Prompt:** *"Who are you joining as?"*
- **Role Cards:**
  1. **Family Member:** *"Stay connected and know how they're doing."* (Deep Blue styling, family icon).
  2. **Older Adult:** *"Manage your health, stay connected and get help."* (Warm Sand styling, high-contrast, large touch area).
  3. **Caregiver:** *"Manage today's care safely and efficiently."* (Teal styling, clipboard/care icon).
- **Secondary Action:** *"Need help choosing?"* -> Opens plain-language explanation modal.
- **Language Switcher:** English / Hindi (toggle preview).

#### Screen ONB-1: Caregiver-Led Senior Setup (`/onboarding/caregiver-setup`)
- **Header:** *"Set up your parent's profile"*
- **Form Fields:**
  - Senior's Full Name (e.g., "Kavita Sharma")
  - What they like to be called (e.g., "Mom")
  - Age / Year of Birth
  - Blood Group (A+, B+, O+, etc.)
  - Known Conditions (Hypertension, Diabetes, Arthritis, Heart Condition)
  - First Emergency Contact (Pre-filled with child's number).
- **CTA:** *"Generate Pairing Code"*

#### Screen ONB-2: Pairing Code & QR Display (`/onboarding/pairing-display`)
- **Headline:** *"Pair your parent's phone"*
- **Display Elements:**
  - Large, high-contrast QR Code.
  - Large 6-digit numeric code: `582 - 914` (spaced for easy reading).
  - Share via WhatsApp / SMS button.
- **Helper text:** *"Open SANGAM on your parent's phone and enter this code."*

#### Screen ONB-3, 4, 5: Senior's 3-Screen First Run (`/onboarding/senior-welcome`)
- **Screen 1 (Trust before Competence):**
  - Text: *"Welcome, Kavita. Your family added you so they can help take care of you."*
  - Photo of adult child + senior.
  - Single large button: *"Continue"*
- **Screen 2 (Early Win / Achievement):**
  - Text: *"Your daughter Priya left you a message."*
  - Single large CTA: *"See my family's message"* -> Plays 5-second warm voice note.
- **Screen 3 (Gentle Landing):**
  - Transitions into the 3-icon home screen with a brief highlight on Health, Family, and Talk.

---

### 2.2 Role 2: Older Adult Interface

#### Screen SNR-1: Senior Home (`/senior/home`)
- **Top Bar:** Greeting: *"Good morning, Kavita ji"* | Date | Isolated SOS Button (Top-Right, 64×64px, distinct crimson border).
- **Section 1: Daily Feeling Check:**
  - Prompt: *"How are you feeling today?"*
  - 4 large options (horizontal row/grid):
    - [ 😊 Good ] [ 🙂 Okay ] [ 😐 Not great ] [ 😟 Need help ]
- **Section 2: Next Medicine Nudge:**
  - Large card: Pill icon | *"Amlodipine 5mg"* | *"Due at 08:30 AM (After Breakfast)"*
  - Actions: **[ TAKEN ]** (Large teal button) | **[ SNOOZE 15m ]** (Ghost button).
- **Section 3: The 3 Master Cards:**
  1. 🩺 **Health** (*"My medicines, doctors & hospital"*)
  2. 👨‍👩‍👧‍👦 **Family** (*"Messages & photos from children"*)
  3. 💬 **Talk to Someone** (*"Today's community discussion"*)
- **Bottom Bar:** Visible Settings & *"Who can see my info?"* link.

#### Screen SNR-2: Medication Action & Confirmation (`/senior/medication-modal`)
- Shows full photo of medicine box/pill.
- Tap "TAKEN" -> Checkmark animation -> Spoken voice: *"Amlodipine marked as taken. Good job, Kavita ji."* -> Card updates to "Taken at 08:32 AM".

#### Screen SNR-3: Senior Health Hub (`/senior/health`)
- **Back Button:** Explicit large button labeled: *"< Go Back to Home"*.
- **Sub-sections:**
  1. *Today's Medicines:* Morning, Afternoon, Evening pill schedule with status.
  2. *Next Appointment:* "Dr. Arvind Mehta (Cardiology) — Thursday, 11:00 AM".
  3. *Call Doctor:* One-tap dialer for registered doctors.
  4. *Emergency Contacts:* One-tap dialers for Priya (Daughter) and Rohan (Son).
  5. *Nearest Hospital & Pharmacy:* Map preview with direct one-tap call & directions.

#### Screen SNR-4: Senior Family Hub (`/senior/family`)
- Back Button: *"< Go Back to Home"*
- Family Member List with large avatars:
  - Priya (Daughter) -> "Call Priya" or "Listen to Priya's voice message".
  - Grandson Aarav -> "Look at Aarav's drawing" (Opens full-screen photo).
- Send Message: One-tap button: *"Record a message for Priya"*.

#### Screen SNR-5: Senior Community — "Talk to Someone" (`/senior/community`)
- Back Button: *"< Go Back to Home"*
- Today's Topic: *"What was your favorite childhood monsoon memory?"*
- Senior Audio Player: Listen to Meena ji (Bengaluru) and Suresh ji (Pune) share memories.
- Big Voice Button: *"Tap to speak your memory"* -> Records audio note -> Confirms playback -> Submits to community.

#### Screen SNR-6: SOS Emergency Trigger Flow (`/senior/sos-flow`)
- **Step 1: Confirmation Prompt (Prevents accidental panic):**
  - Large modal: *"This will alert your family and share your current location. Do you want to get help?"*
  - [ **YES, GET HELP** ] (Large Red Button)
  - [ **NO, GO BACK** ] (Safe Grey Button)
- **Step 2: Activated SOS State:**
  - High-visibility pulsating status: *"Help Alert Sent!"*
  - Audio announcement: *"Help alert has been sent to Priya and Rohan. Stay calm, help is on the way."*
  - Shows dispatched location and active contact list.
  - "I am okay now (Cancel Alert)" button with confirmation.

#### Screen SNR-7: Senior Permissions ("Who Can See My Info") (`/senior/permissions`)
- Plain English explanation: *"These people can see your health details to help take care of you:"*
- Member cards:
  - Priya Sharma (Daughter) — Health, Medicines, Location on SOS. [Remove Access]
  - Nurse Sunita (Caregiver) — Today's Medicines, Vitals. [Remove Access]
- Reassurance note: *"Your information is never shared with advertisers or strangers."*

---

### 2.3 Role 1: Family Member Interface

#### Screen FAM-1: Family Reassurance Dashboard (`/family/dashboard`)
- **Header:** Senior Selector (Mom — Kavita Sharma) | Quick Call button.
- **Safety Card:**
  - Status: *"Everything looks good"* (Sage green badge).
  - Last Check-in: *"Checked in 34 min ago — Feeling Good 😊"*.
- **Key Metrics Grid:**
  - Medication Adherence: 94% this week.
  - Next Appointment: Dr. Mehta • Thursday 11:00 AM.
- **Action Required Alert:**
  - Red warning box: *"1 medication missed yesterday evening (Metformin 500mg)"*. Action: [Call Mom] / [Acknowledge].
- **Emotional Connection Signal:**
  - *"Mom listened to your audio note at 10:15 AM today."*
- **Quick Actions:** Send Audio Note, Add Medication, View Health Vault.

#### Screen FAM-2: Family Health Vault (`/family/health-vault`)
- Medication list with timing, dosage, refill countdowns (e.g. "5 days left of Telmisartan").
- Add/Edit Medication wizard.
- Health Profile: Blood group, allergies, chronic conditions, emergency contacts.
- Digital document storage (Prescription PDFs, Lab test reports, Ayushman card).

#### Screen FAM-3: Family Activity Audit Feed (`/family/activity-feed`)
- Chronological timeline of all events:
  - 08:32 AM: Mom marked Amlodipine 5mg as Taken.
  - 08:00 AM: Morning check-in completed: "Good 😊".
  - Yesterday 09:15 PM: Sibling Rohan sent a family photo.

#### Screen FAM-4: Sibling & Caregiver Coordination (`/family/coordination`)
- Care Circle: Priya (Primary), Rohan (Secondary), Sunita (Caregiver).
- Internal family notes: *"I am taking Mom for her cardiology visit on Thursday"* (Rohan).

---

### 2.4 Role 3: Professional Caregiver Interface

#### Screen CG-1: Caregiver Shift Today (`/caregiver/shift-today`)
- **Shift Banner:** *"Day Shift: 08:00 – 16:00 | Facility: Shanti Vihar Residence"*
- **KPI Bar:** 12 Tasks (8 Completed, 2 Due Now, 2 Upcoming) | 1 Urgent Alert | 6 Residents.
- **Handover Notice:** *"3 Handover items from Night Shift require acknowledgment."*
- **Due Now Task List:**
  - 09:00 AM: Mrs. Kavita Sharma — Administer BP medication & check vitals.
  - 09:30 AM: Mr. R.K. Verma — Assisted morning mobility walk.

#### Screen CG-2: Resident Profile & Care Plan (`/caregiver/resident-profile/:id`)
- Photo, Name, Room/Bed, Age.
- **Critical Precautions:** [FALL RISK] [DIABETIC TYPE-2] [PENICILLIN ALLERGY].
- Today's Checklist: Medication, Meals, Hydration, Mobility, Vitals.
- Family & Doctor emergency contacts with 1-tap call.

#### Screen CG-3: Task Execution & Vitals Logger (`/caregiver/task-modal/:taskId`)
- Task Details & Medical Instructions.
- 1-Tap Action: **[ Complete Task ]** (Automatically records caregiver ID & timestamp).
- Optional Vitals Entry: Systolic/Diastolic BP, Blood Sugar (mg/dL), SpO2.
- **Flag Concern:** Dropdown (Low appetite, dizziness, agitation, pain) + note input.

#### Screen CG-4: Shift Handover Protocol (`/caregiver/handover`)
- **Shift Summary Accordion:**
  - **Completed (8):** Morning medications administered, breakfast intake logged.
  - **Pending (2):** Physio session at 15:00 PM.
  - **Concerns Observed (1):** Mrs. Sharma reported mild knee stiffness.
  - **Escalations Made (1):** Daughter Priya notified at 10:20 AM.
- Digital signature & outgoing caregiver sign-off button.
