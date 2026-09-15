import React, { useState } from 'react';
import { useSangamStore } from '../../core/storage/useSangamStore';
import { SangamLogo } from '../../assets/doodles/SangamDoodles';
import { SangamButton } from '../../design-system/components/SangamButton';
import { ChevronLeft, QrCode } from 'lucide-react';

export const CaregiverSetupScreen: React.FC = () => {
  const { setOnboardingStep, goToGateway } = useSangamStore();
  const [parentName, setParentName] = useState('Kavita Sharma');
  const [preferredName, setPreferredName] = useState('Mom');
  const [age, setAge] = useState('72');
  const [bloodGroup, setBloodGroup] = useState('B+');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOnboardingStep('PAIRING_DISPLAY');
  };

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
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <button
            type="button"
            onClick={goToGateway}
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

        <div style={{ marginBottom: '24px' }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#197278', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Caregiver-Led Setup • Step 1 of 2
          </div>
          <h1 style={{ fontSize: '26px', fontWeight: 800, color: '#17324D', marginTop: '4px' }}>
            Set Up Your Parent's Profile
          </h1>
          <p style={{ fontSize: '15px', color: '#4A5A66', marginTop: '6px' }}>
            Enter their details once. Your parent will not have to type anything on their phone.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '15px', fontWeight: 700, color: '#17324D', marginBottom: '6px' }}>
              Parent's Full Name
            </label>
            <input
              type="text"
              required
              value={parentName}
              onChange={(e) => setParentName(e.target.value)}
              style={{
                width: '100%',
                padding: '14px 16px',
                borderRadius: '14px',
                border: '2px solid #E2DDD5',
                fontSize: '17px',
                backgroundColor: '#FFFFFF',
                outline: 'none',
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '15px', fontWeight: 700, color: '#17324D', marginBottom: '6px' }}>
              What do you call them? (e.g. Mom, Dad, Dadi)
            </label>
            <input
              type="text"
              required
              value={preferredName}
              onChange={(e) => setPreferredName(e.target.value)}
              style={{
                width: '100%',
                padding: '14px 16px',
                borderRadius: '14px',
                border: '2px solid #E2DDD5',
                fontSize: '17px',
                backgroundColor: '#FFFFFF',
                outline: 'none',
              }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '15px', fontWeight: 700, color: '#17324D', marginBottom: '6px' }}>
                Age
              </label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  borderRadius: '14px',
                  border: '2px solid #E2DDD5',
                  fontSize: '17px',
                  backgroundColor: '#FFFFFF',
                  outline: 'none',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '15px', fontWeight: 700, color: '#17324D', marginBottom: '6px' }}>
                Blood Group
              </label>
              <select
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  borderRadius: '14px',
                  border: '2px solid #E2DDD5',
                  fontSize: '17px',
                  backgroundColor: '#FFFFFF',
                  outline: 'none',
                }}
              >
                <option value="B+">B+</option>
                <option value="A+">A+</option>
                <option value="O+">O+</option>
                <option value="AB+">AB+</option>
              </select>
            </div>
          </div>

          <div
            style={{
              backgroundColor: '#EAF4F4',
              borderRadius: '14px',
              padding: '14px 16px',
              fontSize: '14px',
              color: '#17324D',
              lineHeight: 1.4,
              marginTop: '4px',
            }}
          >
            ✓ You (Priya Sharma) will be automatically assigned as the <strong>Primary Emergency Contact</strong>.
          </div>

          <div style={{ marginTop: '16px' }}>
            <SangamButton
              type="submit"
              variant="primary"
              size="senior-primary"
              icon={<QrCode size={22} />}
              style={{ width: '100%' }}
            >
              GENERATE PAIRING CODE
            </SangamButton>
          </div>
        </form>
      </div>
    </div>
  );
};
