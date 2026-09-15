# SANGAM: Project Engineering & Design Rules
## Operational Directives for Development & Pair Programming
*Version 1.0 — September 2026*

---

## 1. Architecture Rules
1. **One App, Three Experiences:** Never collapse the three roles (Family Member, Older Adult, Professional Caregiver) into a single generic interface with permission toggles. The UI layouts, information densities, and interaction models must remain intentionally distinct.
2. **Domain Decoupling:** Business logic (medication scheduling, adherence math, SOS event handling, shift handovers) must reside in `/src/core/domain/` and `/src/core/services/`, never inlined into UI presentation components.
3. **Repository Pattern:** State and data mutations must flow through defined stores or repository interfaces. Hardcoded mock fixtures in UI components are strictly forbidden.
4. **Offline Resilience:** Local operations (marking a medication taken, viewing emergency contacts, viewing shift tasks) must succeed even when offline and persist to local storage.

---

## 2. UI & Aesthetic Rules
1. **Dignity Over Pity:** Never use sad, frail, hospital-clinical stereotypes, or childish infantalizing motifs. Seniors must be depicted as active, respected, capable, and dignified.
2. **Strict Color Palette Compliance:**
   - Deep Blue: `#17324D`
   - Teal: `#197278`
   - Warm Cream: `#F7F4EE` (Anti-glare base canvas)
   - Soft Sage: `#EAF4F4`
   - Warm Sand: `#F4F1E9`
   - Ink: `#172026`
   - Urgent Red: `#B42318`
   - White: `#FFFFFF`
3. **No Color-Only Signaling:** Every status must feature: `Color + Accessible Icon + Plain Text Label`.
4. **No Blue-Green Confusion:** Never place blue and green side-by-side as contrasting options.
5. **No Decorative Distractions:** Do not use gratuitous bouncing animations, auto-rotating carousels, or noisy glassmorphism. Motion is exclusively functional (feedback, confirmation, state change).

---

## 3. Accessibility Rules (WCAG 2.2 AAA Target)
1. **Touch Target Dimensions:**
   - Universal minimum: $44 \times 44\text{px}$.
   - Senior action buttons: Minimum height $\ge 56\text{px}$.
   - SOS emergency button: Minimum size $\ge 72 \times 72\text{px}$ with $\ge 32\text{px}$ spatial isolation.
2. **Typography Rules:**
   - Default body text $\ge 16\text{px}$ (senior body recommended $18\text{px}$ – $20\text{px}$).
   - Headings: $24\text{px}$ to $32\text{px}$.
   - Line height: Generous $1.4$ to $1.6$.
   - Must support dynamic in-app font scaling slider.
3. **Multi-Modal Confirmation:** Critical senior actions (Medication Taken, SOS Trigger, Message Sent) must emit both visual badges and spoken audio feedback via Web Speech / TTS.
4. **Error Handling:** Blame-free error copy. Never use accusatory red banners ("You failed to enter"). Use helpful, next-step guidance ("That code didn't match. Let's try scanning again.").

---

## 4. Role Separation & Permissions
1. **Senior Autonomy:** The older adult must always have access to *"Who can see my information?"* and have the autonomous ability to revoke access.
2. **Zero Covert Surveillance:** Never query background GPS continuously. Location is strictly event-driven (during an active SOS or explicit check-in).
3. **Caregiver Scope Isolation:** Professional caregivers can view clinical care plans, vitals, and tasks, but cannot access family private messages, personal photo albums, or financial/insurance paperwork.

---

## 5. Naming Conventions & Code Quality
1. **Components:** PascalCase (e.g., `SeniorMedicationCard.tsx`, `FamilyReassuranceHeader.tsx`).
2. **Hooks:** camelCase with `use` prefix (e.g., `useMedicationAdherence.ts`, `useSpokenFeedback.ts`).
3. **Domains/Types:** PascalCase for interfaces/types (e.g., `SeniorProfile`, `MedicationEvent`).
4. **CSS Tokens:** kebab-case with `--` prefix (e.g., `--color-primary-deep-blue`, `--font-senior-headline`).
5. **Plain English UI Labels:** Use crystallized vocabulary (e.g., "Take Medicine" NOT "Log Adherence"; "Call Doctor" NOT "Initiate Teleconsult").

---

## 6. Testing & Quality Requirements
1. Every domain calculation (adherence rate, shift task aggregation) must have unit test coverage.
2. Every interactive button must possess an accessible text label or `aria-label`.
3. SOS triggering must require a 2-step confirmation to verify accidental mis-tap prevention.
4. Shift handovers must be validated for zero data loss across shift transitions.
