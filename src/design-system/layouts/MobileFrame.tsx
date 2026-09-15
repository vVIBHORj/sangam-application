import React from 'react';
import { useSangamStore } from '../../core/storage/useSangamStore';
import { Volume2, VolumeX, RotateCcw, Type } from 'lucide-react';

interface MobileFrameProps {
  children: React.ReactNode;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({ children }) => {
  const { 
    state, 
    setRole, 
    goToGateway, 
    startOnboarding, 
    setFontScale, 
    toggleAudioMute, 
    resetToSeed 
  } = useSangamStore();

  const handleFontCycle = () => {
    if (state.fontScale === 1.0) setFontScale(1.15);
    else if (state.fontScale === 1.15) setFontScale(1.30);
    else setFontScale(1.0);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        width: '100%',
        padding: '16px',
        backgroundColor: '#EDE8DF',
      }}
    >
      {/* Studio Evaluation Controller Bar */}
      <div
        style={{
          width: '100%',
          maxWidth: '440px',
          backgroundColor: '#17324D',
          color: '#FFFFFF',
          borderRadius: '16px',
          padding: '10px 14px',
          marginBottom: '12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          boxShadow: '0 4px 16px rgba(23, 50, 77, 0.2)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#197278', display: 'inline-block' }} />
            <span style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.04em', color: '#EAF4F4' }}>
              SANGAM PREVIEW FRAME
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              type="button"
              onClick={handleFontCycle}
              title={`Text Scaling: ${Math.round(state.fontScale * 100)}%`}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.12)',
                border: 'none',
                color: '#FFFFFF',
                borderRadius: '8px',
                padding: '4px 8px',
                fontSize: '12px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                cursor: 'pointer',
              }}
            >
              <Type size={14} />
              <span>{Math.round(state.fontScale * 100)}%</span>
            </button>

            <button
              type="button"
              onClick={toggleAudioMute}
              title={state.isAudioMuted ? 'Unmute spoken audio' : 'Mute spoken audio'}
              style={{
                backgroundColor: state.isAudioMuted ? '#B42318' : 'rgba(255, 255, 255, 0.12)',
                border: 'none',
                color: '#FFFFFF',
                borderRadius: '8px',
                padding: '4px 8px',
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
              }}
            >
              {state.isAudioMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
            </button>

            <button
              type="button"
              onClick={resetToSeed}
              title="Reset state to initial seed data"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.12)',
                border: 'none',
                color: '#FFFFFF',
                borderRadius: '8px',
                padding: '4px 8px',
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
              }}
            >
              <RotateCcw size={14} />
            </button>
          </div>
        </div>

        {/* Role Quick Switcher Pills */}
        <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '2px' }}>
          <button
            type="button"
            onClick={goToGateway}
            style={{
              padding: '6px 10px',
              fontSize: '12px',
              fontWeight: 700,
              borderRadius: '8px',
              border: state.currentView === 'GATEWAY' ? '2px solid #F7F4EE' : '1px solid rgba(255,255,255,0.2)',
              backgroundColor: state.currentView === 'GATEWAY' ? '#197278' : 'transparent',
              color: '#FFFFFF',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            🚪 Role Gate
          </button>

          <button
            type="button"
            onClick={startOnboarding}
            style={{
              padding: '6px 10px',
              fontSize: '12px',
              fontWeight: 700,
              borderRadius: '8px',
              border: state.currentView === 'ONBOARDING' ? '2px solid #F7F4EE' : '1px solid rgba(255,255,255,0.2)',
              backgroundColor: state.currentView === 'ONBOARDING' ? '#197278' : 'transparent',
              color: '#FFFFFF',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            ✨ Onboarding
          </button>

          <button
            type="button"
            onClick={() => setRole('OLDER_ADULT')}
            style={{
              padding: '6px 10px',
              fontSize: '12px',
              fontWeight: 700,
              borderRadius: '8px',
              border: state.currentView === 'APP' && state.activeRole === 'OLDER_ADULT' ? '2px solid #F7F4EE' : '1px solid rgba(255,255,255,0.2)',
              backgroundColor: state.currentView === 'APP' && state.activeRole === 'OLDER_ADULT' ? '#197278' : 'transparent',
              color: '#FFFFFF',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            👴 Older Adult
          </button>

          <button
            type="button"
            onClick={() => setRole('FAMILY_MEMBER')}
            style={{
              padding: '6px 10px',
              fontSize: '12px',
              fontWeight: 700,
              borderRadius: '8px',
              border: state.currentView === 'APP' && state.activeRole === 'FAMILY_MEMBER' ? '2px solid #F7F4EE' : '1px solid rgba(255,255,255,0.2)',
              backgroundColor: state.currentView === 'APP' && state.activeRole === 'FAMILY_MEMBER' ? '#197278' : 'transparent',
              color: '#FFFFFF',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            👨‍👩‍👧 Family Member
          </button>

          <button
            type="button"
            onClick={() => setRole('CAREGIVER')}
            style={{
              padding: '6px 10px',
              fontSize: '12px',
              fontWeight: 700,
              borderRadius: '8px',
              border: state.currentView === 'APP' && state.activeRole === 'CAREGIVER' ? '2px solid #F7F4EE' : '1px solid rgba(255,255,255,0.2)',
              backgroundColor: state.currentView === 'APP' && state.activeRole === 'CAREGIVER' ? '#197278' : 'transparent',
              color: '#FFFFFF',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            🩺 Caregiver
          </button>
        </div>
      </div>

      {/* Simulated Mobile Device Shell */}
      <div 
        className="mobile-device-shell"
        style={{ '--font-scale': state.fontScale } as React.CSSProperties}
      >
        {/* Mobile Device Status Bar */}
        <div
          style={{
            height: '32px',
            backgroundColor: '#17324D',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 20px',
            fontSize: '13px',
            fontWeight: 600,
            flexShrink: 0,
          }}
        >
          <span>10:30 AM</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>5G</span>
            <span>100%</span>
          </div>
        </div>

        {/* View Content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, overflow: 'hidden' }}>
          {children}
        </div>
      </div>
    </div>
  );
};
