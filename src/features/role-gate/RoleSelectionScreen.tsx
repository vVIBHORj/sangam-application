import React, { useState } from 'react';
import { useSangamStore } from '../../core/storage/useSangamStore';
import { SangamLogo } from '../../assets/doodles/SangamDoodles';
import { TouchCard } from '../../design-system/components/TouchCard';
import { Users, Heart, ClipboardList, HelpCircle, X, Sparkles, ArrowRight } from 'lucide-react';
import { SangamButton } from '../../design-system/components/SangamButton';

export const RoleSelectionScreen: React.FC = () => {
  const { setRole, startOnboarding } = useSangamStore();
  const [showHelpModal, setShowHelpModal] = useState(false);

  return (
    <div
      className="scroll-container"
      style={{
        padding: '28px 24px 36px 24px',
        backgroundColor: 'var(--color-background-cream)',
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <div>
        {/* Logo & Brand Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <SangamLogo size={42} showTagline={true} />
        </div>

        {/* Vision Statement Headline */}
        <div style={{ marginBottom: '28px' }}>
          <h1
            className="font-brand"
            style={{
              fontSize: '28px',
              fontWeight: 700,
              color: '#17324D',
              lineHeight: 1.25,
            }}
          >
            Care, connection and peace of mind — in one place.
          </h1>
          <p style={{ fontSize: '17px', color: '#4A5A66', marginTop: '8px', lineHeight: 1.4 }}>
            Who are you joining as?
          </p>
        </div>

        {/* The 3 Core Role Selection Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
          {/* 1. Family Member */}
          <TouchCard
            variant="white"
            padding="20px"
            onClick={() => setRole('FAMILY_MEMBER')}
            ariaLabel="Join as Family Member. Stay connected and know how they are doing"
            style={{
              borderLeft: '8px solid #17324D',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '16px',
                  backgroundColor: '#F4F1E9',
                  color: '#17324D',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Users size={28} strokeWidth={2.4} />
              </div>
              <div>
                <div style={{ fontSize: '20px', fontWeight: 700, color: '#17324D' }}>
                  Family Member
                </div>
                <div style={{ fontSize: '15px', color: '#4A5A66', marginTop: '2px' }}>
                  Stay connected and know how they're doing.
                </div>
              </div>
            </div>
            <ArrowRight size={22} color="#17324D" />
          </TouchCard>

          {/* 2. Older Adult */}
          <TouchCard
            variant="white"
            padding="20px"
            onClick={() => setRole('OLDER_ADULT')}
            ariaLabel="Join as Older Adult. Manage your health, stay connected and get help"
            style={{
              borderLeft: '8px solid #197278',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '16px',
                  backgroundColor: '#EAF4F4',
                  color: '#197278',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Heart size={28} strokeWidth={2.4} />
              </div>
              <div>
                <div style={{ fontSize: '20px', fontWeight: 700, color: '#17324D' }}>
                  Older Adult
                </div>
                <div style={{ fontSize: '15px', color: '#4A5A66', marginTop: '2px' }}>
                  Manage your health, stay connected and get help.
                </div>
              </div>
            </div>
            <ArrowRight size={22} color="#197278" />
          </TouchCard>

          {/* 3. Professional Caregiver */}
          <TouchCard
            variant="white"
            padding="20px"
            onClick={() => setRole('CAREGIVER')}
            ariaLabel="Join as Caregiver. Manage today's care safely and efficiently"
            style={{
              borderLeft: '8px solid #B42318',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '16px',
                  backgroundColor: '#FEF3F2',
                  color: '#B42318',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <ClipboardList size={28} strokeWidth={2.4} />
              </div>
              <div>
                <div style={{ fontSize: '20px', fontWeight: 700, color: '#17324D' }}>
                  Professional Caregiver
                </div>
                <div style={{ fontSize: '15px', color: '#4A5A66', marginTop: '2px' }}>
                  Manage today's care safely and efficiently.
                </div>
              </div>
            </div>
            <ArrowRight size={22} color="#B42318" />
          </TouchCard>
        </div>
      </div>

      {/* Footer & Secondary Flows */}
      <div>
        {/* Onboarding Callout */}
        <div
          style={{
            backgroundColor: '#EAF4F4',
            border: '2px solid #C4DEDB',
            borderRadius: '16px',
            padding: '16px',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Sparkles size={20} color="#197278" />
            <div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: '#17324D' }}>
                Setting up for a parent?
              </div>
              <div style={{ fontSize: '13px', color: '#4A5A66' }}>
                Generate QR code & pairing code
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={startOnboarding}
            style={{
              backgroundColor: '#197278',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '10px',
              padding: '8px 12px',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Start Setup
          </button>
        </div>

        {/* Need Help Choosing Link */}
        <div style={{ textAlign: 'center' }}>
          <button
            type="button"
            onClick={() => setShowHelpModal(true)}
            style={{
              background: 'none',
              border: 'none',
              color: '#197278',
              fontSize: '15px',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              padding: '8px',
            }}
          >
            <HelpCircle size={18} />
            <span>Need help choosing?</span>
          </button>
        </div>
      </div>

      {/* Need Help Choosing Modal */}
      {showHelpModal && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(23, 32, 38, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            zIndex: 999,
          }}
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              padding: '24px',
              maxWidth: '380px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#17324D' }}>
                Which Role is Right for You?
              </h3>
              <button
                type="button"
                onClick={() => setShowHelpModal(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <X size={24} color="#4A5A66" />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '15px', color: '#172026', lineHeight: 1.4 }}>
              <div>
                <strong style={{ color: '#17324D' }}>👨‍👩‍👧 Family Member:</strong> Choose this if you are a daughter, son, or relative checking on an elderly parent. Gives you peace of mind with adherence stats and doctor schedules.
              </div>
              <div>
                <strong style={{ color: '#197278' }}>👴 Older Adult:</strong> Choose this if you want simple, large buttons with zero clutter, medication reminders, community discussions, and easy emergency help.
              </div>
              <div>
                <strong style={{ color: '#B42318' }}>🩺 Professional Caregiver:</strong> Choose this if you are an attendant, nurse, or care manager logging daily resident vitals, medicines, and shift handovers.
              </div>
            </div>

            <SangamButton
              variant="primary"
              size="normal"
              onClick={() => setShowHelpModal(false)}
              style={{ marginTop: '20px', width: '100%' }}
            >
              Got it
            </SangamButton>
          </div>
        </div>
      )}
    </div>
  );
};
