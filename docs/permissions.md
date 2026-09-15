# SANGAM: Role-Based Access Control & Permissions Matrix
## Data Governance, Transparency & Senior Autonomy
*Version 1.0 — September 2026*

---

## 1. Principles of Permission Design

1. **Senior Autonomy First:** Privacy is not a static checkbox; it is a visible, active right. An older adult has sovereign authority to inspect who has access to their data and revoke permissions at will.
2. **No Covert Surveillance:** Location tracking is strictly event-driven. Background GPS tracking without active trigger is strictly prohibited by design. Location is accessed solely during an active SOS event or an explicit check-in.
3. **Least Privilege Operation:** Professional caregivers receive operational access to daily care tasks and vitals logs, but do not possess access to financial documents, insurance claim paperwork, or unrestricted family chat.
4. **Immutable Audit Trail:** Every single permission grant, data view, medication status update, and SOS trigger is logged with a cryptographic timestamp and identity signature.

---

## 2. Role-Based Access Matrix (CRUDL)

| Domain Resource | Older Adult (Self) | Family (Primary) | Family (Secondary) | Professional Caregiver | System / Emergency |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Senior Profile** | View / Self-Edit | Create / View / Edit | View | View (Care context only) | View |
| **Medications (View)** | Full Access | Full Access | Full Access | Full Access (Assigned) | Read-only |
| **Medication (Mark Taken)** | Full Access | View Only | View Only | Full Access (Assigned) | System Auto-flag |
| **Medication (Add/Edit/Delete)**| Assisted / Add | Full Access | Request Only | View / Propose | Audit Logged |
| **Daily Check-In** | Create / View | View / Alerts | View | View | Alert on 24h gap |
| **Health Vault & Records** | View / Assisted | Full Access | View Only | Read-only Vitals | Read-only |
| **Vitals Logging** | Log / View | Log / View | View Only | Log / View | Range Alerting |
| **Appointments** | View / Confirm | Create / Edit | View | View Scheduled | Push Reminders |
| **Location Data** | Self Visible | SOS / Check-in only | SOS only | During SOS (Assigned) | Geo-dispatched |
| **SOS Trigger** | 1-Tap Trigger | View / Ack / Call | View / Ack / Call | View / Ack / Escalate | Auto-SMS & Push |
| **Community Voice Post** | Record / Listen | View Activity | View Activity | No Access | Moderation Filter |
| **Care Tasks & Handover** | View summary | View Summary | View Summary | Create / Complete / Sign | Audit Logged |
| **Permission Revocation** | **Autonomous Revoke**| Manage Circle | None | None | Immutable Log |

---

## 3. Visible Permission Interface ("Who Can See My Info?")

The Senior interface features a dedicated, plainly phrased screen accessible from the home header or profile:

### 3.1 UX Content & Interaction Model
```
+-------------------------------------------------------------+
|  < Go Back to Home                                          |
|                                                             |
|  Who Can See My Information?                                |
|  You are always in control. Your information is only shared |
|  with the people you choose so they can help care for you.  |
|                                                             |
|  [Photo] Priya Sharma (Daughter • Primary Contact)          |
|  Can see: Medicines, Doctor Visits, Emergency Location      |
|  [ Remove Priya's Access ]                                  |
|                                                             |
|  [Photo] Nurse Sunita (Caregiver • Shanti Care)             |
|  Can see: Today's Medicines, Blood Pressure, Meals          |
|  [ Remove Sunita's Access ]                                 |
|                                                             |
|  ---------------------------------------------------------  |
|  Privacy Guarantee: SANGAM never sells your personal or     |
|  health information to advertisers or insurance brokers.    |
+-------------------------------------------------------------+
```

### 3.2 Autonomous Revocation Protocol
When the senior taps **[ Remove Access ]**:
1. A clear, calm confirmation is presented:
   *"Are you sure you want to stop sharing your health updates with [Name]?"*
2. Upon confirmation:
   - Access token is revoked instantly.
   - An immutable `AuditEvent` is generated (`PERMISSION_REVOKED`).
   - A respectful notification is delivered to the affected party: *"[Senior Name] has adjusted their sharing preferences."*

---

## 4. DPDPA (Digital Personal Data Protection Act) & Security Compliance

- **Consent Artifacts:** Every relationship linking generates an explicit consent artifact with scope, expiration, and purpose specification.
- **Data Minimization:** APIs returning senior data filter fields server-side according to the querying user's active relationship scope.
- **Zero Sensitive Data in Logs:** PII (names, phone numbers, exact addresses, health diagnostic terms) is masked in application logging layers.
