import React, { useState } from 'react';
import { useSangamStore } from '../../core/storage/useSangamStore';
import { SeniorFlatLayout } from '../../design-system/layouts/SeniorFlatLayout';
import { TouchCard } from '../../design-system/components/TouchCard';
import { SeniorSOSModal } from './SeniorSOSModal';
import { ShieldCheck, UserX, AlertTriangle, Lock } from 'lucide-react';
import { SangamButton } from '../../design-system/components/SangamButton';

export const SeniorPermissionsScreen: React.FC = () => {
  const { state, setSeniorTab, revokeRelationship } = useSangamStore();
  const [isSOSOpen, setIsSOSOpen] = useState(false);
  const [confirmRevokeId, setConfirmRevokeId] = useState<string | null>(null);

  const selectedRel = state.relationships.find((r) => r.id === confirmRevokeId);

  return (
    <SeniorFlatLayout
      title="Who Can See My Information"
      showBack={true}
      onBack={() => setSeniorTab('HOME')}
      onTriggerSOS={() => setIsSOSOpen(true)}
    >
      {/* Reassurance Banner */}
      <div
        style={{
          backgroundColor: '#EAF4F4',
          border: '2px solid #C4DEDB',
          borderRadius: '18px',
          padding: '16px 20px',
          marginBottom: '22px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#197278', fontWeight: 700, fontSize: '15px' }}>
          <ShieldCheck size={20} />
          <span>You Are Always in Control</span>
        </div>
        <p style={{ fontSize: '15px', color: '#17324D', marginTop: '4px', lineHeight: 1.5 }}>
          Your details are only shared with family and caregivers you approve, so they can help care for you.
        </p>
      </div>

      {/* List of Connected Care Circle Members */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '28px' }}>
        {state.relationships.map((rel) => (
          <TouchCard key={rel.id} variant="white" padding="18px 20px">
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img
                  src={rel.userAvatar}
                  alt={rel.displayName}
                  style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #197278' }}
                />
                <div>
                  <div style={{ fontSize: '19px', fontWeight: 700, color: '#17324D' }}>
                    {rel.displayName}
                  </div>
                  <div style={{ fontSize: '14px', color: '#197278', fontWeight: 600 }}>
                    {rel.relationType === 'PROFESSIONAL_CAREGIVER' ? 'Professional Caregiver' : 'Family Member'}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setConfirmRevokeId(rel.id)}
                aria-label={`Remove access for ${rel.displayName}`}
                style={{
                  backgroundColor: '#FEF3F2',
                  color: '#B42318',
                  border: '1.5px solid #FECDCA',
                  borderRadius: '12px',
                  padding: '8px 12px',
                  fontSize: '14px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  cursor: 'pointer',
                }}
              >
                <UserX size={16} /> Stop Sharing
              </button>
            </div>

            {/* What this person can see */}
            <div
              style={{
                backgroundColor: '#F7F4EE',
                borderRadius: '12px',
                padding: '10px 14px',
                fontSize: '14px',
                color: '#4A5A66',
                lineHeight: 1.4,
              }}
            >
              <strong style={{ color: '#17324D' }}>Can see: </strong>
              {rel.canManageMedications && 'Medicines, '}
              {rel.canViewHealthRecords && 'Doctor visits, '}
              {rel.canReceiveSOS && 'Location during emergency SOS.'}
            </div>
          </TouchCard>
        ))}
      </div>

      {/* Non-Surveillance Guarantee */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          border: '2px solid #E2DDD5',
          borderRadius: '18px',
          padding: '16px 18px',
          display: 'flex',
          gap: '12px',
        }}
      >
        <Lock size={22} color="#17324D" style={{ flexShrink: 0, marginTop: '2px' }} />
        <div style={{ fontSize: '14px', color: '#17324D', lineHeight: 1.5 }}>
          <strong>No Covert Surveillance:</strong> SANGAM never tracks your location in the background. Location is only shared when you press the red SOS button.
        </div>
      </div>

      {/* Confirmation Modal for Autonomous Revocation */}
      {confirmRevokeId && selectedRel && (
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
            padding: '20px',
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#B42318', marginBottom: '12px' }}>
              <AlertTriangle size={26} strokeWidth={2.5} />
              <h3 style={{ fontSize: '20px', fontWeight: 800 }}>Stop Sharing?</h3>
            </div>

            <p style={{ fontSize: '16px', color: '#172026', lineHeight: 1.5, marginBottom: '20px' }}>
              Are you sure you want to stop sharing your medicine and emergency updates with <strong>{selectedRel.displayName}</strong>?
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <SangamButton
                variant="urgent"
                size="senior-primary"
                onClick={() => {
                  revokeRelationship(confirmRevokeId);
                  setConfirmRevokeId(null);
                }}
              >
                YES, STOP SHARING
              </SangamButton>

              <SangamButton
                variant="sand"
                size="normal"
                onClick={() => setConfirmRevokeId(null)}
                style={{ border: '2px solid #17324D' }}
              >
                Cancel, Keep Sharing
              </SangamButton>
            </div>
          </div>
        </div>
      )}

      <SeniorSOSModal isOpen={isSOSOpen} onClose={() => setIsSOSOpen(false)} />
    </SeniorFlatLayout>
  );
};
