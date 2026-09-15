import React from 'react';
import { useSangamStore } from '../../core/storage/useSangamStore';
import { TouchCard } from '../../design-system/components/TouchCard';
import { 
  Calendar, 
  AlertTriangle, 
  PhoneCall, 
  Mic, 
  Pill, 
  MessageSquareHeart, 
  Activity, 
  ShieldCheck 
} from 'lucide-react';
import { SangamButton } from '../../design-system/components/SangamButton';

export const FamilyDashboard: React.FC = () => {
  const { 
    state, 
    setFamilyTab, 
    adherencePercentage, 
    inactivityStatus 
  } = useSangamStore();

  const nextAppt = state.appointments[0];

  return (
    <div className="scroll-container" style={{ padding: '20px' }}>
      {/* Header: Senior Profile Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img
            src={state.senior.avatarUrl}
            alt={state.senior.fullName}
            style={{ width: '52px', height: '52px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #197278' }}
          />
          <div>
            <div style={{ fontSize: '20px', fontWeight: 800, color: '#17324D' }}>
              {state.senior.preferredName}
            </div>
            <div style={{ fontSize: '13px', color: '#197278', fontWeight: 600 }}>
              {state.senior.fullName} • Age {state.senior.age}
            </div>
          </div>
        </div>

        <a
          href="tel:+919811234567"
          aria-label="Call Mom"
          style={{
            backgroundColor: '#197278',
            color: '#FFFFFF',
            borderRadius: '12px',
            padding: '8px 14px',
            fontSize: '14px',
            fontWeight: 700,
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <PhoneCall size={16} /> Call Mom
        </a>
      </div>

      {/* Safety Reassurance Status Card */}
      <div style={{ marginBottom: '18px' }}>
        <TouchCard
          variant={inactivityStatus.level === 'ATTENTION_ALERT' ? 'urgent' : 'sage'}
          padding="18px 20px"
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ShieldCheck size={26} color={inactivityStatus.level === 'ATTENTION_ALERT' ? '#B42318' : '#197278'} />
              <div>
                <div style={{ fontSize: '18px', fontWeight: 800, color: '#17324D' }}>
                  {inactivityStatus.level === 'ATTENTION_ALERT' ? 'Attention Required' : 'Everything Looks Good'}
                </div>
                <div style={{ fontSize: '14px', color: '#4A5A66', marginTop: '2px' }}>
                  {inactivityStatus.relativeTimeText} • {state.checkIn.moodLabel}
                </div>
              </div>
            </div>
            <span
              style={{
                backgroundColor: '#FFFFFF',
                color: '#197278',
                borderRadius: '12px',
                padding: '4px 10px',
                fontSize: '12px',
                fontWeight: 700,
                border: '1px solid #197278',
              }}
            >
              Verified ✓
            </span>
          </div>
        </TouchCard>
      </div>

      {/* Key Metrics Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '18px' }}>
        {/* Adherence Card */}
        <TouchCard variant="white" padding="16px">
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#197278', fontSize: '13px', fontWeight: 700 }}>
            <Activity size={16} /> Medication
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#17324D', marginTop: '4px' }}>
            {adherencePercentage}%
          </div>
          <div style={{ fontSize: '12px', color: '#4A5A66', marginTop: '2px' }}>
            Weekly adherence rate
          </div>
          <div style={{ height: '6px', backgroundColor: '#EAF4F4', borderRadius: '3px', marginTop: '8px', overflow: 'hidden' }}>
            <div style={{ width: `${adherencePercentage}%`, height: '100%', backgroundColor: '#197278' }} />
          </div>
        </TouchCard>

        {/* Next Appointment Card */}
        <TouchCard variant="white" padding="16px">
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#17324D', fontSize: '13px', fontWeight: 700 }}>
            <Calendar size={16} /> Next Visit
          </div>
          <div style={{ fontSize: '18px', fontWeight: 800, color: '#17324D', marginTop: '6px' }}>
            Thursday
          </div>
          <div style={{ fontSize: '13px', color: '#197278', fontWeight: 600 }}>
            11:00 AM • Cardiology
          </div>
          <div style={{ fontSize: '12px', color: '#4A5A66', marginTop: '2px' }}>
            {nextAppt?.doctorName}
          </div>
        </TouchCard>
      </div>

      {/* Attention / Action Required Notice */}
      <div style={{ marginBottom: '18px' }}>
        <TouchCard variant="urgent" padding="16px">
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
            <AlertTriangle size={22} color="#B42318" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <div style={{ fontSize: '16px', fontWeight: 800, color: '#B42318' }}>
                Refill Alert • 5 Days Left
              </div>
              <p style={{ fontSize: '14px', color: '#172026', marginTop: '2px', lineHeight: 1.4 }}>
                Telmisartan 40mg stock is down to 6 tablets. Apollo Pharmacy delivery is available with 1 tap.
              </p>
              <button
                type="button"
                onClick={() => setFamilyTab('HEALTH')}
                style={{
                  marginTop: '8px',
                  backgroundColor: '#FFFFFF',
                  color: '#B42318',
                  border: '1.5px solid #FECDCA',
                  borderRadius: '8px',
                  padding: '5px 10px',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                Order Refill Now →
              </button>
            </div>
          </div>
        </TouchCard>
      </div>

      {/* Emotional Connection Signal */}
      <div style={{ marginBottom: '22px' }}>
        <TouchCard variant="sand" padding="16px">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <MessageSquareHeart size={24} color="#17324D" />
            <div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: '#17324D' }}>
                Connection Reassurance
              </div>
              <div style={{ fontSize: '13px', color: '#4A5A66', marginTop: '2px' }}>
                Mom listened to your morning voice message at 08:15 AM today.
              </div>
            </div>
          </div>
        </TouchCard>
      </div>

      {/* Quick Actions */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        <SangamButton
          variant="secondary"
          size="normal"
          icon={<Mic size={18} />}
          onClick={() => setFamilyTab('COORDINATION')}
        >
          Send Voice Note
        </SangamButton>

        <SangamButton
          variant="sand"
          size="normal"
          icon={<Pill size={18} />}
          onClick={() => setFamilyTab('HEALTH')}
        >
          Manage Meds
        </SangamButton>
      </div>
    </div>
  );
};
