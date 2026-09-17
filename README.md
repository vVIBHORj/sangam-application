<div align="center">

# 🌿 SANGAM

### Multi-Role Elder Care & Community Platform

**Connecting Older Adults, Families, and Professional Caregivers through accessible technology.**

<p>
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React 19"/>
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite"/>
  <img src="https://img.shields.io/badge/Lucide-Icons-F56565?style=for-the-badge" alt="Lucide Icons"/>
</p>

<p>
  <a href="#-overview">Overview</a> •
  <a href="#-features">Features</a> •
  <a href="#-design--accessibility">Design</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-project-structure">Structure</a>
</p>

</div>

---

## 🌱 Overview

**SANGAM** is a human-centered elder care and community platform designed to bring **older adults, family members, and professional caregivers** together through one accessible digital ecosystem.

The platform focuses on:

* 👴 **Senior-friendly experiences**
* 👨‍👩‍👧 **Family reassurance & coordination**
* 🧑‍⚕️ **Professional caregiver workflows**
* 🔔 **Real-time alerts & reminders**
* 🎙️ **Voice-first interaction**
* 🤝 **Social connection & community**
* 🔐 **Privacy and user-controlled data sharing**

> **Design Philosophy:** Technology should adapt to people — especially when users need simplicity, clarity, dignity, and trust the most.

---

## ✨ Key Features

SANGAM provides three role-specific experiences, each designed around the needs and capabilities of its users.

<table>
<tr>
<td width="33%" valign="top">

### 👴 Older Adult

A simplified experience focused on accessibility, independence, and connection.

**Highlights**

* 🔎 Large, readable interface
* 👆 Touch targets ≥ 56px
* 🎙️ Voice-first interaction
* 🔊 Audio feedback
* 🆘 Emergency SOS
* 🛟 Fall alert support
* 💊 Medication reminders
* ❤️ Mood & wellness check-ins
* 📞 One-touch calling
* 👥 Community activities
* 🎧 Listening lounges
* 🎤 Audio rooms
* 📅 Community events

</td>

<td width="33%" valign="top">

### 👨‍👩‍👧 Family Member

A reassurance and coordination interface that helps families stay connected.

**Highlights**

* 📊 Senior status dashboard
* 💊 Medication adherence
* ❤️ Mood tracking
* 📝 Recent activity logs
* 💬 Direct messaging
* 🎙️ Voice communication
* 📋 Care-plan management
* ⏰ Reminder management
* 🚨 Emergency alerts
* 📍 Controlled location sharing
* 🤝 Caregiver coordination

</td>

<td width="33%" valign="top">

### 🧑‍⚕️ Professional Caregiver

A structured workspace for managing multiple residents and daily care operations.

**Highlights**

* 👥 Resident roster
* 📊 Resident overview
* ❤️ Vital trends
* 📅 Care schedules
* ✅ Shift task management
* 📝 Handover notes
* 📋 Digital care logs
* 💊 Compliance verification
* 📈 Care analytics
* 📊 Activity trends
* 🔍 Health indicators

</td>
</tr>
</table>

---

# 🎨 Design & Accessibility

SANGAM is built around the principle that **accessibility is a core product requirement, not an optional feature.**

## 🧩 Design System

<table>
<tr>
<td><b>Primary</b></td>
<td><code>#17324D</code> — Deep Blue</td>
</tr>

<tr>
<td><b>Secondary</b></td>
<td><code>#197278</code> — Teal</td>
</tr>

<tr>
<td><b>Background</b></td>
<td><code>#F7F4EE</code> — Warm Cream</td>
</tr>

<tr>
<td><b>Surface</b></td>
<td><code>#EAF4F4</code> — Soft Sage</td>
</tr>

<tr>
<td><b>Text</b></td>
<td><code>#172026</code> — Ink</td>
</tr>

<tr>
<td><b>Urgent</b></td>
<td><code>#B42318</code> — Urgent Red</td>
</tr>
</table>

### ♿ Accessibility Principles

* **Large touch targets** for easier interaction
* **High-contrast typography**
* **Scalable font sizing**
* **Clear visual hierarchy**
* **Simple navigation**
* **Minimal cognitive load**
* **Large icons and controls**
* **Voice and audio assistance**
* **Accessible color combinations**
* **Consistent interaction patterns**

### 🔐 Privacy First

SANGAM follows a **privacy-first design philosophy**.

Users should have visibility and control over what information is shared and with whom.

For example, location information is designed to be shared only in appropriate situations such as:

> **SOS / Check-in → User approval → Controlled sharing**

---

# 🏗️ Technology Stack

<div align="center">

|         Technology         | Purpose                                |
| :------------------------: | -------------------------------------- |
|       ⚛️ **React 19**      | Frontend UI                            |
|      📘 **TypeScript**     | Type-safe development                  |
|         ⚡ **Vite**         | Development & production build tooling |
|     🎨 **Lucide Icons**    | Accessible iconography                 |
|       🗂️ **Zustand**      | Application state management           |
| 🧩 **CSS / Design Tokens** | UI styling & design system             |
|        🧪 **Vitest**       | Unit testing                           |

</div>

---

# 🚀 Getting Started

## Prerequisites

Make sure you have the following installed:

* **Node.js 18+**
* **npm**, **yarn**, or **pnpm**
* Git

### Verify Node.js

```bash
node --version
```

### Verify npm

```bash
npm --version
```

---

## 📥 Installation

### 1. Clone the repository

```bash
git clone https://github.com/vVIBHORj/SANGAM-APP.git
```

### 2. Navigate to the project

```bash
cd SANGAM-APP
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:3000
```

> **Note:** If Vite selects a different available port, use the URL displayed in your terminal.

---

# 🛠️ Available Scripts

| Command           | Description                                 |
| ----------------- | ------------------------------------------- |
| `npm run dev`     | Starts the Vite development server with HMR |
| `npm run build`   | Builds the production application           |
| `npm run test`    | Runs unit tests with Vitest                 |
| `npm run preview` | Previews the production build locally       |

### Production Build

```bash
npm run build
```

The generated production bundle will be available inside:

```text
/dist
```

---

# 📁 Project Structure

```text
SANGAM/
│
├── 📁 docs/
│   ├── Architecture specifications
│   ├── Screen maps
│   ├── Permission models
│   └── Design tokens
│
├── 📁 src/
│   │
│   ├── 📁 assets/
│   │   ├── Logos
│   │   ├── Audio samples
│   │   └── Static assets
│   │
│   ├── 📁 core/
│   │   ├── State management
│   │   ├── Zustand store
│   │   ├── Domain models
│   │   ├── Types
│   │   └── Utilities
│   │
│   ├── 📁 design-system/
│   │   ├── Buttons
│   │   ├── Cards
│   │   ├── Audio players
│   │   ├── Modals
│   │   └── Accessible components
│   │
│   ├── 📁 features/
│   │   ├── Senior
│   │   ├── Family
│   │   └── Caregiver
│   │
│   ├── App.tsx
│   └── main.tsx
│
├── 📄 package.json
├── 📄 vite.config.ts
└── 📄 README.md
```

---

# 🧠 Product Architecture

SANGAM is structured around three primary roles:

```text
                         ┌──────────────────┐
                         │      SANGAM      │
                         │  Care Ecosystem  │
                         └────────┬─────────┘
                                  │
              ┌───────────────────┼───────────────────┐
              │                   │                   │
              ▼                   ▼                   ▼
       ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
       │ Older Adult │     │    Family   │     │  Caregiver  │
       └──────┬──────┘     └──────┬──────┘     └──────┬──────┘
              │                   │                   │
              └───────────────────┼───────────────────┘
                                  │
                         ┌────────▼────────┐
                         │ Care & Social   │
                         │ Coordination    │
                         └─────────────────┘
```

The goal is to create a shared ecosystem where each role receives **only the information and controls relevant to their responsibilities**.

---

# ❤️ Core Product Principles

<table>
<tr>
<td align="center" width="20%">

### 🧓

**Dignity**

</td>

<td align="center" width="20%">

### 👁️

**Clarity**

</td>

<td align="center" width="20%">

### ♿

**Accessibility**

</td>

<td align="center" width="20%">

### 🤝

**Connection**

</td>

<td align="center" width="20%">

### 🔐

**Privacy**

</td>
</tr>
</table>

### SANGAM is designed around five principles:

**1. Dignity**
Technology should empower older adults rather than make them feel dependent.

**2. Simplicity**
Important actions should be understandable without requiring technical knowledge.

**3. Accessibility**
Interfaces should accommodate changes in vision, hearing, motor control, and digital familiarity.

**4. Connection**
Care extends beyond health monitoring — social connection and community matter too.

**5. Privacy**
Personal information should remain under the user's control.

---

# 🗺️ Roadmap

The platform can evolve toward a broader elder-care ecosystem with capabilities such as:

* [ ] Advanced caregiver analytics
* [ ] AI-powered conversational assistance
* [ ] Personalized activity recommendations
* [ ] Intelligent medication adherence insights
* [ ] Family-caregiver coordination workflows
* [ ] Community activity discovery
* [ ] Multilingual voice interaction
* [ ] Regional Indian language support
* [ ] Wearable / IoT integrations
* [ ] Advanced emergency workflows
* [ ] Expanded accessibility testing

---

# 🇮🇳 Built for India

SANGAM is designed with the **Indian elder-care context** in mind.

The platform aims to account for:

* Multigenerational families
* Family members living in different cities
* Increasing smartphone adoption among older adults
* Regional languages
* Voice-first interaction
* Community-oriented experiences
* Accessibility challenges
* Family-assisted digital services

> **The objective is not simply to digitize elder care — it is to make technology feel natural, trustworthy, and human.**

---

# 🤝 Contributing

Contributions, ideas, feedback, and improvements are welcome.

### Development workflow

```bash
# Create a feature branch
git checkout -b feature/your-feature

# Make your changes

# Stage changes
git add .

# Commit
git commit -m "feat: add your feature"

# Push
git push origin feature/your-feature
```

Then open a Pull Request.

---

<div align="center">

## 🌿 SANGAM

### **Technology that connects. Care that feels human.**

<p>
  Built with ❤️ for better elder care.
</p>

</div>
