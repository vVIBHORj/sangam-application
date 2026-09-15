import React, { useState } from 'react';
import { useSangamStore } from '../../core/storage/useSangamStore';
import { AlertCircle, CheckCircle, MapPin, PhoneCall, X } from 'lucide-react';
import { SangamButton } from '../../design-system/components/SangamButton';

interface SeniorSOSModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SeniorSOSModal: React.FC<SeniorSOSModalProps> = ({ isOpen, onClose }) => {
  const { state, triggerSOS, resolveSOS, cancelSOS } = useSangamStore();
  const [step, setStep] = useState<'CONFIRM' | 'ACTIVATED'>('CONFIRM');

  if (!isOpen) return null;

  const handleConfirmSOS = async () => {
    await triggerSOS();
    setStep('ACTIVATED');
  };

  const handleCancelBeforeFire = () => {
    cancelSOS();
    setStep('CONFIRM');
    onClose();
  };

  const handleResolveAlert = () => {
    resolveSOS();
    setStep('CONFIRM');
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="sos-dialog-title"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(23, 32, 38, 0.85)',
        zIndex: 999,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        backdropFilter: 'blur(4px)',
      }}
    >
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderTopLeftRadius: '32px',
          borderTopRightRadius: '32px',
          padding: '28px 24px 36px 24px',
          borderTop: '4px solid #B42318',
          boxShadow: '0 -8px 32px rgba(180, 35, 24, 0.25)',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
        {step === 'CONFIRM' ? (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  backgroundColor: '#FEF3F2',
                  border: '2px solid #B42318',
                  color: '#B42318',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <AlertCircle size={32} strokeWidth={2.5} />
              </div>
              <div>
                <h2 id="sos-dialog-title" style={{ fontSize: '24px', fontWeight: 800, color: '#B42318' }}>
                  Ask for Help?
                </h2>
                <span style={{ fontSize: '15px', color: '#4A5A66', fontWeight: 600 }}>
                  Emergency Assistance
                </span>
              </div>
            </div>

            <div
              style={{
                backgroundColor: '#F7F4EE',
                border: '2px solid #E2DDD5',
                borderRadius: '16px',
                padding: '16px',
                marginBottom: '24px',
                fontSize: '18px',
                lineHeight: 1.5,
                color: '#172026',
              }}
            >
              <p style={{ fontWeight: 700, marginBottom: '6px' }}>
                This will immediately:
              </p>
              <ul style={{ paddingLeft: '22px', fontSize: '16px' }}>
                <li>Call and message your daughter <strong>Priya</strong> and son <strong>Rohan</strong>.</li>
                <li>Share your current home location with them.</li>
              </ul>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <SangamButton
                variant="urgent"
                size="senior-critical"
                icon={<AlertCircle size={26} strokeWidth={3} />}
                onClick={handleConfirmSOS}
                ariaLabel="Yes, get help now"
              >
                YES, GET HELP
              </SangamButton>

              <SangamButton
                variant="sand"
                size="senior-primary"
                icon={<X size={20} />}
                onClick={handleCancelBeforeFire}
                ariaLabel="No, go back to home screen"
                style={{ border: '2px solid #17324D' }}
              >
                NO, GO BACK
              </SangamButton>
            </div>
          </div>
        ) : (
          /* Activated State */
          <div>
            <div
              className="pulse-emergency"
              style={{
                backgroundColor: '#FEF3F2',
                border: '2px solid #B42318',
                borderRadius: '20px',
                padding: '18px',
                textAlign: 'center',
                marginBottom: '20px',
              }}
            >
              <div style={{ fontSize: '24px', fontWeight: 800, color: '#B42318' }}>
                Help Alert Sent!
              </div>
              <div style={{ fontSize: '16px', color: '#172026', marginTop: '4px', fontWeight: 600 }}>
                Stay calm, help is on the way.
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '15px', fontWeight: 700, color: '#17324D', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                People Notified:
              </div>
              {state.relationships.map((rel) => (
                <div
                  key={rel.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: '#F7F4EE',
                    border: '1.5px solid #E2DDD5',
                    borderRadius: '14px',
                    padding: '12px 16px',
                    marginBottom: '8px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <CheckCircle size={20} color="#197278" />
                    <div>
                      <div style={{ fontSize: '17px', fontWeight: 700, color: '#17324D' }}>
                        {rel.displayName}
                      </div>
                      <div style={{ fontSize: '14px', color: '#4A5A66' }}>{rel.phone}</div>
                    </div>
                  </div>
                  <a
                    href={`tel:${rel.phone}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      backgroundColor: '#197278',
                      color: '#FFFFFF',
                      padding: '8px 12px',
                      borderRadius: '12px',
                      fontSize: '14px',
                      fontWeight: 700,
                      textDecoration: 'none',
                    }}
                  >
                    <PhoneCall size={16} /> Call
                  </a>
                </div>
              ))}
            </div>

            {/* Location preview */}
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px',
                backgroundColor: '#EAF4F4',
                border: '1.5px solid #C4DEDB',
                borderRadius: '14px',
                padding: '12px 16px',
                marginBottom: '24px',
                fontSize: '15px',
                color: '#17324D',
              }}
            >
              <MapPin size={20} color="#197278" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <span style={{ fontWeight: 700 }}>Location shared:</span>{' '}
                {state.sosIncident?.location.addressDescription || state.senior.address.line1}
              </div>
            </div>

            <SangamButton
              variant="sand"
              size="senior-primary"
              onClick={handleResolveAlert}
              ariaLabel="I am okay now, cancel emergency alert"
              style={{ width: '100%', border: '2px solid #17324D' }}
            >
              I AM OKAY NOW (CLOSE ALERT)
            </SangamButton>
          </div>
        )}
      </div>
    </div>
  );
};
