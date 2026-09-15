# SANGAM: Testing & Quality Assurance Strategy
## Multi-Role Accessibility, Clinical Safety & Geriatric Validation
*Version 1.0 — September 2026*

---

## 1. Testing Philosophy

Testing an elder-care application requires moving beyond typical software testing. A bug in SANGAM can cause:
- Severe anxiety for an adult child living thousands of miles away.
- Dangerous confusion or fear of "breaking something" for an older adult.
- Missed clinical doses or unrecorded shifts for a professional caregiver.

Our testing pyramid is organized into four distinct layers:
1. **Unit & Domain Logic Tests:** Pure calculation of medication adherence, scheduled event triggers, role permission evaluations.
2. **Geriatric Accessibility & UI Rigor Tests:** Automated contrast verification, touch target geometric audits, screen-reader semantics.
3. **Multi-Role Integration Tests:** Cross-role data flow (e.g. Senior marks medication taken -> Family member dashboard updates adherence % immediately).
4. **Resilience & Forgiveness Tests:** Offline queue persistence, accidental SOS prevention, blame-free error recovery.

---

## 2. Test Suites & Coverage Matrix

### 2.1 Domain & Business Logic (Unit Tests)
- **`adherence.test.ts`:**
  - Accurate calculation of weekly adherence % across multiple doses per day.
  - Correct categorization of Missed vs Snoozed vs Taken states.
- **`pairing.test.ts`:**
  - 6-digit numeric pairing code entropy and collision resistance.
  - Senior profile activation and relationship establishment.
- **`permissions.test.ts`:**
  - Senior autonomous revocation immediately terminates family/caregiver read access.
  - Caregiver cannot access family document vault or personal photos.
- **`handover.test.ts`:**
  - Correct aggregation of Completed, Pending, Concerns, and Escalations into the final handover report.

### 2.2 Geriatric Accessibility Audits (Automated & Manual)
- **Contrast Ratio Validation:**
  - Background `#F7F4EE` against Primary Deep Blue `#17324D` must exceed 7.0:1 (WCAG AAA).
  - Body text `#172026` against `#F7F4EE` must exceed 7.0:1.
  - Urgent Red `#B42318` must meet AA minimum and be paired with text + iconography.
- **Touch Target Audits:**
  - Senior buttons must be $\ge 44 \times 44\text{px}$ in computed bounding box.
  - Critical action buttons (SOS, Taken, Call Doctor) must exceed $\ge 56\text{px}$ height.
  - Spatial clearance between SOS and adjacent elements must be $\ge 32\text{px}$.
- **Screen Reader & ARIA Validation:**
  - Every button has an explicit, plain-English `aria-label`.
  - Check-in mood emojis have clear descriptive speech labels (`aria-label="Feeling good today"`).
  - Live regions (`aria-live="polite"`) for audio status announcements.

### 2.3 Role-Specific Scenario Verification

#### Scenario A: The Morning Routine (Senior + Family)
1. Senior opens app at 08:30 AM.
2. Taps "😊 Good" on *"How are you feeling today?"*.
3. Taps "TAKEN" on *"Amlodipine 5mg"*.
4. System triggers checkmark animation and speaks: *"Medicine marked as taken. Good job, Kavita ji."*
5. Family dashboard switches from "Checked in yesterday" to "Checked in 2 min ago — Feeling Good 😊", and adherence updates to 100% for today.

#### Scenario B: The Accidental SOS Prevention Test
1. Senior accidentally brushes the SOS region.
2. System displays large modal: *"This will alert your family and share your current location. Do you want to get help?"*
3. Senior taps *"NO, GO BACK"*.
4. System logs zero false emergency alerts, emits calm audio: *"No alert was sent. You are on the home screen."*

#### Scenario C: Professional Caregiver Handover
1. Caregiver completes 8 tasks during shift.
2. Caregiver flags concern on Resident 3: *"Low appetite at lunch"*.
3. Navigates to Handover tab -> verifies 8 completed, 2 pending, 1 concern automatically grouped.
4. Signs digitally and submits report.

---

## 3. Automation Framework & Tooling

- **Test Runner:** `Vitest` for ultra-fast, modern ESM unit and component testing.
- **Component Testing:** `@testing-library/react` with `@testing-library/user-event`.
- **Accessibility Engine:** `axe-core` / `vitest-axe` for automated WCAG 2.2 AA/AAA rule assertions.
- **E2E Browser Validation:** Playwright / Puppeteer for multi-tab family-to-senior live synchronization testing.
