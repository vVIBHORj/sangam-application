import React from 'react';
import { useSangamStore } from '../../core/storage/useSangamStore';
import { TouchCard } from '../../design-system/components/TouchCard';
import { 
  ShieldCheck, 
  Lock, 
  LogOut, 
  Volume2, 
  VolumeX 
} from 'lucide-react';

export const CaregiverProfileScreen: React.FC = () => {
  const { state, goToGateway, toggleAudioMute } = useSangamStore();

  return (
    <div className="scroll-container" style={{ padding: '20px' }}>
      {/* 1. Caregiver Account Info */}
      <TouchCard variant="white" padding="20px" style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              backgroundColor: '#FEF3F2',
              color: '#B42318',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              fontWeight: 800,
            }}
          >
            SD
          </div>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#17324D', margin: 0 }}>
              Nurse Sunita Devi
            </h2>
            <div style={{ fontSize: '13px', color: '#4A5A66', marginTop: '2px' }}>
              Licensed Registered Nurse • Reg #RN-88491
            </div>
            <div style={{ fontSize: '12px', color: '#197278', fontWeight: 700, marginTop: '4px' }}>
              Day Shift • Assigned Professional Caregiver
            </div>
          </div>
        </div>
      </TouchCard>

      {/* 2. Assigned Senior (1:1 Single Senior Relationship) */}
      <section style={{ marginBottom: '22px' }}>
        <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#17324D', marginBottom: '12px' }}>
          Assigned Senior Profile
        </h3>

        <TouchCard variant="sand" padding="18px" style={{ borderLeft: '6px solid #197278' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
            <img
              src={state.senior.avatarUrl}
              alt={state.senior.fullName}
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2px solid #197278',
              }}
            />
            <div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#17324D' }}>
                {state.senior.fullName}
              </div>
              <div style={{ fontSize: '13px', color: '#4A5A66' }}>
                Age {state.senior.age} • Room 102 • Blood Group {state.senior.bloodGroup}
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', fontSize: '12px' }}>
            <div style={{ backgroundColor: '#FFFFFF', padding: '10px', borderRadius: '8px' }}>
              <span style={{ color: '#4A5A66', display: 'block' }}>Primary Family Contact</span>
              <strong style={{ color: '#17324D' }}>Rohan Sharma (Son)</strong>
            </div>
            <div style={{ backgroundColor: '#FFFFFF', padding: '10px', borderRadius: '8px' }}>
              <span style={{ color: '#4A5A66', display: 'block' }}>Assigned Since</span>
              <strong style={{ color: '#17324D' }}>01 Aug 2026</strong>
            </div>
          </div>
        </TouchCard>
      </section>

      {/* 3. Caregiver Scope & Permissions */}
      <section style={{ marginBottom: '22px' }}>
        <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#17324D', marginBottom: '12px' }}>
          Care Permissions & Privacy Safeguards
        </h3>

        <TouchCard variant="white" padding="16px">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <ShieldCheck size={20} color="#027A48" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#17324D' }}>
                  Care Execution & Vitals Recording
                </div>
                <div style={{ fontSize: '12px', color: '#4A5A66' }}>
                  Authorized to administer medications, log BP/sugar vitals, and sign daily tasks.
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <ShieldCheck size={20} color="#027A48" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#17324D' }}>
                  Shift Handover Reports
                </div>
                <div style={{ fontSize: '12px', color: '#4A5A66' }}>
                  Authorized to file operational notes and transfer shift responsibilities.
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <Lock size={20} color="#B42318" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#17324D' }}>
                  Privacy Isolation Protected
                </div>
                <div style={{ fontSize: '12px', color: '#4A5A66' }}>
                  No access to senior's private family messages, personal bank details, or non-care records.
                </div>
              </div>
            </div>
          </div>
        </TouchCard>
      </section>

      {/* 4. Shift & App Controls */}
      <section style={{ marginBottom: '20px' }}>
        <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#17324D', marginBottom: '12px' }}>
          Account Settings
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button
            type="button"
            onClick={toggleAudioMute}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '14px 16px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #E2DDD5',
              borderRadius: '12px',
              cursor: 'pointer',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#17324D', fontWeight: 700, fontSize: '14px' }}>
              {state.isAudioMuted ? <VolumeX size={20} color="#B42318" /> : <Volume2 size={20} color="#197278" />}
              <span>Voice Confirmations & Chimes</span>
            </div>
            <span style={{ fontSize: '13px', fontWeight: 700, color: state.isAudioMuted ? '#B42318' : '#027A48' }}>
              {state.isAudioMuted ? 'Muted' : 'Enabled'}
            </span>
          </button>

          <button
            type="button"
            onClick={goToGateway}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '14px 16px',
              backgroundColor: '#FEF3F2',
              border: '1px solid #FECDCA',
              borderRadius: '12px',
              cursor: 'pointer',
              color: '#B42318',
              fontWeight: 800,
              fontSize: '14px',
            }}
          >
            <LogOut size={18} />
            <span>Switch Role / Return to Gateway</span>
          </button>
        </div>
      </section>
    </div>
  );
};
