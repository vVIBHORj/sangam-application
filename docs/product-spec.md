# SANGAM: Elder Care & Community Platform
## Comprehensive Product Specification (v1.0)
*Prepared by Lead Product Architect & Senior UX Team — September 2026*

---

## 1. Executive Summary & Product Vision

### 1.1 Vision & Emotional Positioning
**SANGAM** ("Confluence / Meeting Place") is a production-quality, mobile-first platform designed to serve as a trusted digital bridge connecting an older adult, their family, and professional caregivers. 

Unlike fragmented market solutions that treat health monitoring and elder loneliness as separate problems, SANGAM combines:
- **Elder Health & Medication Management** (prescriptions, vitals, doctor visits, hospital/pharmacy finder)
- **Safety Net & Emergency Operations** (one-tap SOS with geo-location, emergency contacts)
- **Loneliness Reduction & Curated Community** (daily prompt discussions, voice notes, local events)
- **Family Coordination & Reassurance** (adherence stats, check-in history, sibling task coordination)
- **Professional Caregiver Operations** (shift handovers, vitals logs, resident status tracking)

### 1.2 Core Emotional Axiom
**DIGNITY + SAFETY + CONNECTION + REASSURANCE**
*Never pity-first or fear-first design.*

- **Older Adult:** *"I am in control, respected, and capable."*
- **Family Member:** *"I know my parent is safe and well without hovering."*
- **Caregiver:** *"I know what I need to do next, clearly and accountably."*

---

## 2. Market Context & Evidence-Based Foundation
Derived from LASI Wave-1, UNFPA India Ageing Report 2023, and global geriatric research:
1. **Demographic Shift:** India's 60+ population will nearly double from 149M (2022) to 347M (2050). 20% of urban elderly and 10% of rural elderly live alone; >70% do not live with an adult child.
2. **Multimorbidity:** 32.1% of older Indians suffer 2+ chronic conditions (CVD, hypertension, diabetes).
3. **Loneliness Prevalence:** Pooled meta-analytic prevalence of elder loneliness in India is 27.6% (~30M elderly). Loneliness accelerates cognitive and cardiovascular decline.
4. **Digital Literacy Constraint:** Smartphone penetration among Indians 55+ is 5–11%, with digital literacy as low as 11%. Therefore, **Caregiver-Led Onboarding** is the primary acquisition and setup path.

---

## 3. The Three Distinct User Archetypes

| Dimension | Role 1: Family Member | Role 2: Older Adult | Role 3: Professional Caregiver |
| :--- | :--- | :--- | :--- |
| **Primary User** | Adult son/daughter, NRI relative, sibling | Senior citizen (60–85+ yrs) | In-home nurse, assisted-living staff, attendant |
| **Psychological State** | Guilt, anxiety, physical distance, love | Fear of making mistakes, desire for independence | Time pressure, shift accountability, heavy workload |
| **Core Question** | *"Is my parent okay?"* | *"What do I do today? Am I connected?"* | *"What do I need to do next?"* |
| **Interface Density** | High (fitness/banking style dashboard) | Minimalist (3 primary icons, high contrast, zero clutter) | High / Operational (task lists, countdowns, handover logs) |
| **Interaction Mode** | Multi-touch, graphs, calendars, deep lists | One large tap (>=44px), voice inputs, audio confirmations | Rapid 1–2 tap checks, quick notes, barcode/timestamps |
| **Primary Navigation** | Home, Health, Activity, Family, Profile | Health, Family, Talk to Someone (+ prominent SOS) | Today (Shift), Residents, Tasks, Alerts, Profile |

---

## 4. Feature Specifications by Domain

### 4.1 Role Selection & Shared Gateway
- **Splash & Role Gate:**
  - Headline: *"Care, connection and peace of mind — in one place."*
  - Subhead: *"Who are you joining as?"*
  - 3 large, warm, human interactive cards with distinct iconography:
    1. **Family Member:** *"Stay connected and know how they're doing."*
    2. **Older Adult:** *"Manage your health, stay connected and get help."*
    3. **Caregiver:** *"Manage today's care safely and efficiently."*
  - Helper link: *"Need help choosing?"* (plain-language explanation modal).

### 4.2 Onboarding Architecture
#### A. Primary Path: Caregiver-Led Setup (Recommended)
1. Adult child downloads app, signs up via Phone + OTP.
2. Creates Senior Profile: Name, photo, birth year, blood group, emergency contacts, conditions.
3. App generates:
   - High-contrast QR Code
   - 6-digit numeric pairing code (e.g., `582-914`)
   - Deep-link shareable via WhatsApp/SMS.
4. Senior opens app on their device:
   - **Screen 1:** *"Welcome, [Name]. Your family added you so they can help take care of you."*
   - **Screen 2:** Large CTA: *"See my family's message"* (Early achievement win).
   - **Screen 3:** Transitions to Senior Home (3 large cards).

#### B. Secondary Path: Senior-Led Setup
- Direct phone number + OTP login.
- Every optional field has a clear *"Ask family to help with this later"* bypass.
- Immediate prompt post-signup: *"Invite a family member"*.

---

### 4.3 Older Adult Experience (Role 2)
1. **Design System & Physiology Rules:**
   - Background: Warm Cream (`#F7F4EE`) to mitigate lens yellowing and blue-light glare.
   - Contrast: High-contrast ink text (`#172026`) with deep saturated blue (`#17324D`).
   - Touch targets: Minimum 44×44px, critical actions 64×64px or full-width buttons.
   - Typography: Atkinson Hyperlegible or humanist sans-serif, default >=16px, headings 24–32px. Adjustable in-app text size slider.
   - No color-only signaling: Every status has color + icon + clear text label.
2. **Senior Home Layout (3 Major Touchpoints):**
   - Greeting & Daily Check-in: *"How are you feeling today?"* with 4 large emoji-text options:
     - 😊 Good | 🙂 Okay | 😐 Not great | 😟 I need help
   - Upcoming Medication Card: Medicine name, dose, scheduled time, with two clear actions: **TAKEN** (checkmark + voice confirmation "Medicine marked as taken") and **SNOOZE** (15 mins).
   - Three Primary Navigation Cards:
     1. 🩺 **Health:** Today's medicines, next appointment, doctor directory, nearest hospital/pharmacy.
     2. 👨‍👩‍👧‍👦 **Family:** Family messages, photos, voice notes, contact family button.
     3. 💬 **Talk to Someone:** Curated daily community discussion and peer audio feed.
   - **Persistent SOS Button:** Spatially isolated, top/bottom corner.
     - 2-step confirmation modal: *"This will alert your family and share your current location. Do you want to get help?"* -> [YES, GET HELP] / [NO, GO BACK].
     - Once triggered: Audio feedback, SMS/Push dispatched to all emergency contacts, location timestamped.
3. **Senior Community Layer:**
   - 1 curated daily topic (e.g., *"What is your favorite monsoon memory?", "Sharing traditional home remedies"*).
   - No unrestricted private direct messaging (prevents scams and financial grooming).
   - Voice-first response: Senior taps large mic button, records audio note, hears playback, submits.
   - Listen to peer responses with audio player.

---

### 4.4 Family Member Experience (Role 1)
1. **Reassurance Dashboard ("Is my parent okay?"):**
   - Senior Status Header: Photo, name, safety badge ("Everything looks good" / "Needs attention").
   - Real-time signals: "Checked in 34 min ago", "Last medicine taken at 08:30 AM".
   - Adherence Metric: Weekly medication adherence bar (e.g., 94% this week).
   - Next Appointment: Doctor name, specialty, date, time, clinic location.
   - Action Items Card: "1 medication missed — Morning Amlodipine 5mg".
   - Emotional Connection Signal: "Mom listened to your voice message today at 11:15 AM".
2. **Tabbed Navigation:**
   - **Home:** Overview & quick actions (Send message, Log vitals, Call senior).
   - **Health:** Complete medication schedule, health vault (allergies, surgical history, insurance policies, Ayushman Bharat card), vitals history charts.
   - **Activity:** Real-time chronological audit trail of check-ins, medication events, SOS logs.
   - **Family:** Shared sibling coordinator, caregiver assignments, photo & audio message inbox.
   - **Profile:** Account management, senior settings, emergency contact order.

---

### 4.5 Professional Caregiver Experience (Role 3)
1. **Operational Dashboard ("What do I need to do next?"):**
   - Shift Bar: Current shift (e.g., "08:00 – 16:00 Day Shift").
   - Summary Metrics: 12 Tasks (8 completed, 2 due now, 2 upcoming), 1 Urgent Alert, 6 Assigned Residents.
   - Shift Handover Banner: 3 handover items pending review from previous shift.
2. **Resident Quick Roster:**
   - Card for each resident with photo, room/bed, precautions (e.g., "Fall Risk", "Diabetic").
   - One-tap access to resident's care plan.
3. **Task Execution Workflow:**
   - Tap task -> View clinical context & instructions -> 1-tap "Complete" with auto-timestamp.
   - Optional voice/text note and "Flag Concern" button.
4. **Shift Handover Protocol:**
   - Formally organized into: **Completed**, **Pending**, **Concern**, **Escalated**.
   - Example:
     - *Completed:* Morning BP checked (128/82 mmHg) at 09:05 AM.
     - *Pending:* Physio exercise scheduled for 15:00 PM.
     - *Concern:* Low appetite noticed at breakfast (ate 25%).
     - *Escalated:* Family notified via call at 10:20 AM.
   - Digital sign-off with outgoing and incoming caregiver signatures.

---

## 5. Security, Permissions & Privacy

### 5.1 Transparency & Senior Autonomy
- Privacy is a visible UX feature, never buried in fine print.
- Senior can view: *"Who can see my information?"*
  - Shows each linked user, their relationship, and their granted permissions (Health, Location, Community).
  - Senior has the autonomous right to revoke any member's access at any time.
- **No Covert Surveillance:** Location is only queried on explicit SOS or check-in, never stealth-tracked in background.

### 5.2 Regulatory Alignment
- Built to align with India's **Digital Personal Data Protection Act (DPDPA 2023)** and National Digital Health Mission (ABDM/NDHM) standards:
  - Explicit purpose limitation and consent artifacts.
  - End-to-end encrypted storage for health records and prescriptions.
  - Comprehensive immutable Audit Log (`AuditEvent`).

---

## 6. Key Performance Indicators & Retention Loops

### 6.1 Retention Loops
- **Senior Loop:** Morning Check-in -> Next Medication Nudge -> Listen to Family Message/Community -> Reassurance & Belonging.
- **Family Loop:** Open App -> Instant Reassurance ("All good") -> Resolve Attention Item if any -> Send Love (photo/voice) -> Exit calm.
- **Caregiver Loop:** Shift Start -> Handover Review -> Task Execution -> Concern Escalation -> Handover Sign-off -> Shift End.

### 6.2 Target Metrics
- Onboarding completion rate: >85% for caregiver-led pairing.
- Day-7 Senior Retention: >60% (via check-ins and medication marks).
- Accidental SOS rate: <2% of total triggers.
- Time-to-first-success for seniors: <90 seconds from first app launch.
