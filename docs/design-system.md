# SANGAM: Design System & Geriatric UX Specification
## Grounded in the Psychology & Physiology of Aging
*Version 1.0 — September 2026*

---

## 1. Core Design Philosophy
SANGAM does not treat accessibility as an afterthought or a "mode". It is built from the foundational biology of the aging eye, brain, and hand:
1. **Vision:** Crystalline lens yellowing filters blue/violet light; contrast sensitivity degrades past age 50; older eyes require ~3× more lumens to resolve details.
2. **Cognition:** Fluid intelligence (processing novel abstract patterns) declines while crystallized intelligence (vocabulary, familiar rituals) remains strong. Working memory is reduced by ~23%.
3. **Motor Dexterity:** Grip strength declines, joint stiffness and physiological tremors increase, making small, closely grouped touch targets a primary source of accidental taps and subsequent technology anxiety.
4. **Emotion & Self-Efficacy:** Anxiety about "breaking something" causes avoidance. The interface must provide immediate early wins, clear confirmations, and blame-free error recovery.

---

## 2. Color System & Contrast Ratios

### 2.1 Color Palette
| Token Name | Hex Code | Semantic Role | Contrast with #F7F4EE (Warm Cream) |
| :--- | :--- | :--- | :--- |
| `--color-primary-deep-blue` | `#17324D` | Brand primary, headings, key navigational anchors | **11.8:1** (Exceeds WCAG AAA) |
| `--color-secondary-teal` | `#197278` | Interactive accents, action buttons, progress bars | **4.9:1** (Exceeds WCAG AA) |
| `--color-background-cream` | `#F7F4EE` | Primary app background (warm, anti-glare) | N/A (Base Canvas) |
| `--color-surface-sand` | `#F4F1E9` | Card surfaces, container groupings | Subtle separation |
| `--color-surface-sage` | `#EAF4F4` | Reassurance cards, success states, health badges | 1.2:1 (with cream) |
| `--color-text-ink` | `#172026` | Body text, critical numbers, high-contrast labels | **14.2:1** (WCAG AAA Max) |
| `--color-urgent-red` | `#B42318` | Urgent alerts, missed medications, SOS signals | **5.8:1** (WCAG AAA) |
| `--color-white` | `#FFFFFF` | Crisp card elevations, icon backgrounds | High luminosity |

### 2.2 Strict Color Rules
- **No Color-Only Signaling:** Never communicate state via color alone. Every status indicator must feature:
  $$\text{Color} + \text{Recognizable Icon} + \text{Explicit Text Label}$$
- **Anti-Yellow-Blue Confusion:** Never place green and blue in proximity as binary choices (e.g., "Confirm" vs "Cancel"). Older eyes experience high error rates distinguishing blue from green along the tritanopia axis.
- **Warm Backgrounds Over Stark White:** Stark white screens cause glare and appear washed out due to lens opacification. Warm Cream (`#F7F4EE`) provides superior visual comfort.

---

## 3. Typography Hierarchy

### 3.1 Typeface Selection
- **Primary Typeface:** `Atkinson Hyperlegible` (Braille Institute designed for maximum letterform distinction) or Humanist Sans (`Inter` / system-ui fallback).
- **Key Characteristics:** Distinct shapes for letters commonly confused by low-vision readers (e.g., `I`, `l`, `1`; `0` vs `O`).

### 3.2 Type Scale (Standard Senior Scale)
```css
:root {
  --font-senior-headline: 700 28px/1.35 'Atkinson Hyperlegible', sans-serif;
  --font-senior-subhead: 600 22px/1.4 'Atkinson Hyperlegible', sans-serif;
  --font-senior-body: 400 18px/1.6 'Atkinson Hyperlegible', sans-serif;
  --font-senior-body-large: 500 20px/1.5 'Atkinson Hyperlegible', sans-serif;
  --font-senior-caption: 400 15px/1.5 'Atkinson Hyperlegible', sans-serif;
  --font-senior-action: 700 20px/1.2 'Atkinson Hyperlegible', sans-serif;
  
  /* Dynamic text scale multiplier (default 1.0, scalable up to 1.35) */
  --font-scale-multiplier: 1.0;
}
```

### 3.3 Plain Language Dictionary (Crystallized Intelligence)
| Prohibited UI Jargon | Mandatory Human Term | Context |
| :--- | :--- | :--- |
| "Initiate Contact" / "Sync" | **"Call Doctor"** | Healthcare communication |
| "Log Medication" / "Submit" | **"Take Medicine"** | Daily adherence action |
| "Share Content" / "Broadcast" | **"Send Message"** | Family interaction |
| "Authenticate" / "Credentials" | **"Enter your 6-digit code"** | Pairing and login |
| "Error 404 / Invalid Entry" | **"That didn't match. Let's try again."** | Blame-free error handling |

---

## 4. Spacing, Touch Targets & Layout Rules

### 4.1 Touch Target Floor
- **Universal Minimum:** All tappable controls must be $\ge 44 \times 44\text{px}$.
- **Senior Core Actions:** Buttons such as "TAKEN", "SNOOZE", "CALL FAMILY", "TALK" must be $\ge 56\text{px}$ in height, with generous horizontal padding ($\ge 24\text{px}$).
- **SOS Button:** $\ge 72 \times 72\text{px}$, spatially isolated by $\ge 32\text{px}$ from any other tappable control to prevent catastrophic mis-taps.

### 4.2 Spacing & Visual Rhythm
- **Spacing Scale:**
  - `--space-xs`: 4px
  - `--space-sm`: 8px
  - `--space-md`: 16px
  - `--space-lg`: 24px
  - `--space-xl`: 32px
  - `--space-xxl`: 48px
- **Card Padding:** Minimum 20px on mobile viewports.
- **Maximum Cognitive Choices:** Senior screens must present at most **3 to 4 primary interactive choices** at any single moment. Never bury actions in nested drop-down drawers.

---

## 5. Multi-Modal Interaction: Audio, Voice & Feedback

### 5.1 Dual-Channel Confirmation
Every critical senior action emits both visual and auditory feedback:
1. **Medication Marked Taken:**
   - Visual: Checkmark smoothly transitions to green badge (`#197278`) with "Taken at 08:30 AM".
   - Spoken Audio (Web Speech / Native TTS): *"Medicine marked as taken. Good job!"*
2. **SOS Triggered:**
   - Visual: High-visibility pulsing status showing: *"Alert sent to Priya and Rohan"*.
   - Spoken Audio: *"Help alert sent to your family. Help is on the way."*
3. **Voice Community Note:**
   - Visual: Large waveform recording state + playback review button.
   - Spoken Audio: *"Recording complete. Tap Send to share."*

---

## 6. Functional Motion & Animation Guidelines

Animation in SANGAM is purely functional — never gratuitous or ornamental:
- **Duration:** 150ms to 250ms for transitions; ease-in-out curve.
- **Prohibited:** Bouncing modals, auto-spinning carousels, rapid flashing, decorative motion anywhere near the SOS button.
- **Accessibility:** Fully honors `@media (prefers-reduced-motion: reduce)`. When reduced motion is requested, all transitions resolve instantaneously (`duration: 0ms`).

---

## 7. Sangam Doodle & Visual Identity System

### 7.1 Line Illustration Style
- **Style:** Warm, elegant, single-weight hand-drawn line art (1.5px – 2px stroke, Deep Blue `#17324D`).
- **Contextual Objects:**
  - Brass teacup / Chai saucer (Warmth & hospitality)
  - Interlocking hands (Caregiver bridge)
  - Traditional medicine box (*Dabba*)
  - Walking stick & shaded park bench (Active aging)
  - Family framed photograph on bedside table
  - Speaking soundwaves / Voice bubble (Oral culture)
- **Zero Stereotyping:** No hunched, helpless caricatures. Seniors are depicted as dignified, active, and socially engaged.
