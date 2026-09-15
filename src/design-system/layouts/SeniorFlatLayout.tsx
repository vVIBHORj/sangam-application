import React from 'react';
import { useSangamStore } from '../../core/storage/useSangamStore';
import { AlertCircle, ChevronLeft } from 'lucide-react';
import { SangamLogo } from '../../assets/doodles/SangamDoodles';

interface SeniorFlatLayoutProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  children: React.ReactNode;
  onTriggerSOS: () => void;
}

export const SeniorFlatLayout: React.FC<SeniorFlatLayoutProps> = ({
  title,
  showBack = false,
  onBack,
  children,
  onTriggerSOS,
}) => {
  const { state } = useSangamStore();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: 'var(--color-background-cream)' }}>
      {/* Top Header */}
      <header
        style={{
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#FFFFFF',
          borderBottom: '2px solid #E2DDD5',
          flexShrink: 0,
        }}
      >
        {showBack ? (
          <button
            type="button"
            onClick={onBack}
            aria-label="Go back to home screen"
            className="touch-target-senior"
            style={{
              backgroundColor: '#F4F1E9',
              color: '#17324D',
              border: '2px solid #17324D',
              borderRadius: '16px',
              padding: '10px 18px',
              minHeight: '52px',
              fontSize: '18px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
            }}
          >
            <ChevronLeft size={24} strokeWidth={3} />
            <span>Home</span>
          </button>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <SangamLogo size={36} />
          </div>
        )}

        {/* Spatially Isolated SOS Emergency Trigger */}
        <button
          type="button"
          onClick={onTriggerSOS}
          aria-label="Emergency SOS button. Tap to get immediate help from family"
          className="touch-target-senior"
          style={{
            backgroundColor: '#B42318',
            color: '#FFFFFF',
            border: '3px solid #7A170F',
            borderRadius: '18px',
            minHeight: '54px',
            minWidth: '84px',
            padding: '10px 16px',
            boxShadow: 'var(--shadow-urgent)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            cursor: 'pointer',
            marginLeft: '16px', // Clear spatial clearance
          }}
        >
          <AlertCircle size={22} strokeWidth={2.8} />
          <span style={{ fontSize: '20px', fontWeight: 800, letterSpacing: '0.04em' }}>SOS</span>
        </button>
      </header>

      {/* Screen Title Bar if present */}
      {title && (
        <div style={{ padding: '16px 20px 8px 20px', backgroundColor: 'var(--color-background-cream)' }}>
          <h1 className="senior-headline" style={{ fontSize: `calc(26px * ${state.fontScale})` }}>
            {title}
          </h1>
        </div>
      )}

      {/* Main Content Area */}
      <main className="scroll-container" style={{ padding: '16px 20px 32px 20px' }}>
        {children}
      </main>
    </div>
  );
};
