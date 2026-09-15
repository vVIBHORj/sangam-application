import React from 'react';
import { useSangamStore } from '../../core/storage/useSangamStore';
import { SangamLogo } from '../../assets/doodles/SangamDoodles';
import { SangamButton } from '../../design-system/components/SangamButton';
import { ChevronLeft, Share2, Smartphone } from 'lucide-react';

export const PairingCodeScreen: React.FC = () => {
  const { state, setOnboardingStep } = useSangamStore();

  return (
    <div
      className="scroll-container"
      style={{
        padding: '24px 20px',
        backgroundColor: 'var(--color-background-cream)',
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <div>
        {/* Top bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <button
            type="button"
            onClick={() => setOnboardingStep('CAREGIVER_FORM')}
            style={{
              background: 'none',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              color: '#17324D',
              fontSize: '15px',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            <ChevronLeft size={20} /> Back
          </button>
          <SangamLogo size={32} />
        </div>

        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#197278', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Step 2 of 2 • Instant Pairing
          </div>
          <h1 style={{ fontSize: '26px', fontWeight: 800, color: '#17324D', marginTop: '4px' }}>
            Pair Mom's Phone
          </h1>
          <p style={{ fontSize: '15px', color: '#4A5A66', marginTop: '6px' }}>
            Open SANGAM on your parent's phone and scan the QR or enter the 6-digit code.
          </p>
        </div>

        {/* 6-Digit Code Box */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '3px solid #17324D',
            borderRadius: '24px',
            padding: '24px 20px',
            textAlign: 'center',
            marginBottom: '20px',
            boxShadow: 'var(--shadow-card)',
          }}
        >
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#4A5A66', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            6-Digit Numeric Pairing Code
          </div>
          <div
            style={{
              fontSize: '44px',
              fontWeight: 900,
              color: '#17324D',
              letterSpacing: '0.18em',
              margin: '12px 0',
              fontFamily: 'monospace',
            }}
          >
            {state.senior.pairingCode}
          </div>
          <div style={{ fontSize: '13px', color: '#197278', fontWeight: 600 }}>
            Valid for 48 hours • No password required
          </div>
        </div>

        {/* Simulated High-Contrast QR Code */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '2px solid #E2DDD5',
            borderRadius: '20px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: '20px',
          }}
        >
          {/* SVG QR Representation */}
          <svg width="140" height="140" viewBox="0 0 140 140" fill="none">
            <rect width="140" height="140" fill="#FFFFFF" rx="8" />
            <rect x="15" y="15" width="40" height="40" stroke="#17324D" strokeWidth="8" fill="none" />
            <rect x="27" y="27" width="16" height="16" fill="#17324D" />
            <rect x="85" y="15" width="40" height="40" stroke="#17324D" strokeWidth="8" fill="none" />
            <rect x="97" y="27" width="16" height="16" fill="#17324D" />
            <rect x="15" y="85" width="40" height="40" stroke="#17324D" strokeWidth="8" fill="none" />
            <rect x="27" y="97" width="16" height="16" fill="#17324D" />
            {/* Inner data matrix dots */}
            <rect x="65" y="25" width="10" height="10" fill="#197278" />
            <rect x="65" y="45" width="10" height="10" fill="#17324D" />
            <rect x="65" y="65" width="10" height="10" fill="#17324D" />
            <rect x="25" y="65" width="10" height="10" fill="#197278" />
            <rect x="45" y="65" width="10" height="10" fill="#17324D" />
            <rect x="85" y="65" width="10" height="10" fill="#197278" />
            <rect x="105" y="65" width="10" height="10" fill="#17324D" />
            <rect x="65" y="85" width="10" height="10" fill="#17324D" />
            <rect x="85" y="85" width="10" height="10" fill="#17324D" />
            <rect x="65" y="105" width="10" height="10" fill="#197278" />
            <rect x="95" y="105" width="20" height="10" fill="#17324D" />
          </svg>
          <div style={{ fontSize: '14px', color: '#4A5A66', fontWeight: 600, marginTop: '8px' }}>
            Point parent's camera at this QR code
          </div>
        </div>

        <button
          type="button"
          onClick={() => alert(`Share Link: https://sangam.care/pair?code=${state.senior.pairingCode}`)}
          style={{
            width: '100%',
            backgroundColor: '#F4F1E9',
            border: '2px solid #E2DDD5',
            borderRadius: '14px',
            padding: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            fontSize: '15px',
            fontWeight: 700,
            color: '#17324D',
            cursor: 'pointer',
            marginBottom: '16px',
          }}
        >
          <Share2 size={18} /> Share link via WhatsApp or SMS
        </button>
      </div>

      {/* Simulator Transition CTA */}
      <div style={{ marginTop: '12px' }}>
        <SangamButton
          variant="secondary"
          size="senior-primary"
          icon={<Smartphone size={22} />}
          onClick={() => setOnboardingStep('SENIOR_WELCOME_1')}
          style={{ width: '100%' }}
        >
          SIMULATE SENIOR'S FIRST RUN →
        </SangamButton>
      </div>
    </div>
  );
};
