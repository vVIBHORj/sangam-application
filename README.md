# SANGAM - Multi-Role Elder Care & Community Platform

SANGAM is an accessible, human-centered elder care platform designed to seamlessly connect **Older Adults**, **Family Members**, and **Professional Caregivers**. Built with React 19, TypeScript, Vite, and Lucide Icons, SANGAM prioritizes dignity, clarity, accessible UI/UX, and real-time coordination for senior well-being.

---

## Key Features & Role-Based Experiences

SANGAM provides three distinct UI paradigms tailored to each user role:

### 1. Older Adult Mode (Senior View)
- **Ultra-Simplified Interface**: Large touch targets (>= 56px), high contrast text, accessible color palette.
- **Voice-First & Audio Feedback**: Built-in voice assistant, speech synthesis, and audio prompts.
- **Emergency SOS & Fall Alert**: One-tap SOS button with instant alerts sent to family and assigned caregivers.
- **Daily Essentials**: Medication reminders with visual/audio confirmation, daily mood/health check-ins, and one-touch quick call to assigned caregiver or family contact.
- **Community & Social Connection**: Join virtual activity circles, listening lounges, audio rooms, and community events.

### 2. Family Member View
- **Reassurance Dashboard**: Real-time status updates on medication adherence, mood tracking, and recent activity log.
- **Direct 1:1 Messaging & Voice**: Stay connected with senior loved ones and their primary professional caregiver.
- **Care Coordination**: Set reminders, manage care plans, monitor emergency alerts, and inspect location sharing (active only during SOS/check-in with senior approval).

### 3. Professional Caregiver View
- **Resident Roster**: Comprehensive overview of assigned senior residents, vital trends, and care schedules.
- **Shift Tasks & Handover Notes**: Digital task checklists, shift logs, medical compliance verification, and handover reporting.
- **Care Analytics & Insights**: Interactive stats page tracking adherence trends, activity history, and health indicators.

---

## Design System & Accessibility

- **Color Palette**: Deep Blue (`#17324D`), Teal (`#197278`), Warm Cream (`#F7F4EE`), Soft Sage (`#EAF4F4`), Ink (`#172026`), and Urgent Red (`#B42318`).
- **Typography & Touch**: Accessible typography with high contrast, scalable font sizing, and touch targets exceeding WCAG guidelines.
- **Privacy First**: Strict adherence to privacy-first principles. Senior users maintain full visibility and control over shared data and permissions.

---

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn / pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/vVIBHORj/SANGAM-APP.git
   cd SANGAM-APP
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173`.

---

## Scripts & Commands

- **`npm run dev`**: Starts Vite development server with Hot Module Replacement (HMR).
- **`npm run build`**: Compiles TypeScript and builds production bundles into `/dist`.
- **`npm run test`**: Runs unit tests with Vitest.
- **`npm run preview`**: Previews the production build locally.

---

## Project Structure

```
SANGAM/
├── docs/                 # Architectural specifications, screen maps, permissions, design tokens
├── src/
│   ├── assets/           # Logos, audio samples, static assets
│   ├── core/             # State management (Zustand/store), domain models, types, utilities
│   ├── design-system/    # Accessible design system components (buttons, cards, audio players, modals)
│   ├── features/         # Role-specific modules (Senior, Family, Caregiver)
│   ├── App.tsx           # Main app shell & role switching
│   └── main.tsx          # Application entry point
├── package.json
└── vite.config.ts
```

---


