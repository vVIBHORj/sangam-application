import React, { useState } from 'react';
import { useSangamStore } from '../../core/storage/useSangamStore';
import { TouchCard } from '../../design-system/components/TouchCard';
import { ClipboardCheck, CheckCircle2, Clock, AlertTriangle, PhoneForwarded } from 'lucide-react';
import { SangamButton } from '../../design-system/components/SangamButton';

export const ShiftHandoverScreen: React.FC = () => {
  const { state, signHandover } = useSangamStore();
  const [outgoingName, setOutgoingName] = useState(state.handoverReport.outgoingCaregiverName);
  const [incomingName, setIncomingName] = useState(state.handoverReport.incomingCaregiverName || 'Nurse Rajesh Yadav');

  const report = state.handoverReport;

  const handleSign = (e: React.FormEvent) => {
    e.preventDefault();
    signHandover(outgoingName, incomingName);
  };

  return (
    <div className="scroll-container" style={{ padding: '20px' }}>
      <div style={{ marginBottom: '18px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#17324D' }}>
          Shift Handover Report
        </h2>
        <div style={{ fontSize: '14px', color: '#4A5A66' }}>
          {report.shiftName} • {report.date}
        </div>
      </div>

      {report.isSignedOut && (
        <div
          style={{
            backgroundColor: '#EAF4F4',
            border: '2px solid #197278',
            borderRadius: '16px',
            padding: '14px 18px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <CheckCircle2 size={24} color="#197278" />
          <div>
            <div style={{ fontSize: '16px', fontWeight: 800, color: '#17324D' }}>
              Handover Signed & Submitted ✓
            </div>
            <div style={{ fontSize: '13px', color: '#197278', fontWeight: 600 }}>
              Transferred from {report.outgoingCaregiverName} to {report.incomingCaregiverName} at {report.signedAt}
            </div>
          </div>
        </div>
      )}

      {/* 1. Completed Items Accordion */}
      <section style={{ marginBottom: '18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
          <CheckCircle2 size={20} color="#197278" />
          <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#17324D' }}>
            Completed Care Items ({report.completedItems.length})
          </h3>
        </div>

        <TouchCard variant="sage" padding="14px 16px">
          <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {report.completedItems.map((item, i) => (
              <li key={i} style={{ fontSize: '14px', color: '#172026', lineHeight: 1.4 }}>
                {item}
              </li>
            ))}
          </ul>
        </TouchCard>
      </section>

      {/* 2. Pending Tasks for Incoming Shift */}
      <section style={{ marginBottom: '18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
          <Clock size={20} color="#17324D" />
          <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#17324D' }}>
            Pending Items for Next Shift ({report.pendingItems.length})
          </h3>
        </div>

        <TouchCard variant="white" padding="14px 16px" style={{ borderLeft: '6px solid #17324D' }}>
          <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {report.pendingItems.map((item, i) => (
              <li key={i} style={{ fontSize: '14px', color: '#172026', lineHeight: 1.4 }}>
                {item}
              </li>
            ))}
          </ul>
        </TouchCard>
      </section>

      {/* 3. Clinical Concerns Observed */}
      <section style={{ marginBottom: '18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
          <AlertTriangle size={20} color="#B42318" />
          <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#B42318' }}>
            Concerns Observed ({report.concernsObserved.length})
          </h3>
        </div>

        <TouchCard variant="urgent" padding="14px 16px">
          <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {report.concernsObserved.map((item, i) => (
              <li key={i} style={{ fontSize: '14px', color: '#172026', lineHeight: 1.4 }}>
                {item}
              </li>
            ))}
          </ul>
        </TouchCard>
      </section>

      {/* 4. Escalations Made to Family / Doctors */}
      <section style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
          <PhoneForwarded size={20} color="#197278" />
          <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#17324D' }}>
            Escalations & Family Contacts ({report.escalationsMade.length})
          </h3>
        </div>

        <TouchCard variant="sand" padding="14px 16px">
          <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {report.escalationsMade.map((item, i) => (
              <li key={i} style={{ fontSize: '14px', color: '#172026', lineHeight: 1.4 }}>
                {item}
              </li>
            ))}
          </ul>
        </TouchCard>
      </section>

      {/* 5. Digital Sign-off Form */}
      {!report.isSignedOut ? (
        <form onSubmit={handleSign} style={{ backgroundColor: '#FFFFFF', border: '2px solid #E2DDD5', borderRadius: '18px', padding: '18px' }}>
          <div style={{ fontSize: '16px', fontWeight: 800, color: '#17324D', marginBottom: '12px' }}>
            Digital Handover Sign-off
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#17324D', marginBottom: '4px' }}>
                Outgoing Shift Lead
              </label>
              <input
                type="text"
                required
                value={outgoingName}
                onChange={(e) => setOutgoingName(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1.5px solid #E2DDD5' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#17324D', marginBottom: '4px' }}>
                Incoming Shift Lead
              </label>
              <input
                type="text"
                required
                value={incomingName}
                onChange={(e) => setIncomingName(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1.5px solid #E2DDD5' }}
              />
            </div>
          </div>

          <SangamButton
            type="submit"
            variant="secondary"
            size="normal"
            icon={<ClipboardCheck size={18} />}
            style={{ width: '100%' }}
          >
            SIGN & SUBMIT SHIFT HANDOVER
          </SangamButton>
        </form>
      ) : (
        <div style={{ textAlign: 'center', padding: '10px' }}>
          <span style={{ fontSize: '14px', color: '#4A5A66' }}>
            Handover protocol closed for Day Shift.
          </span>
        </div>
      )}
    </div>
  );
};
