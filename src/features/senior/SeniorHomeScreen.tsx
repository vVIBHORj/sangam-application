import React, { useState } from 'react';
import { useSangamStore } from '../../core/storage/useSangamStore';
import { SeniorFlatLayout } from '../../design-system/layouts/SeniorFlatLayout';
import { MoodSelector } from '../../design-system/components/MoodSelector';
import { MedicationNudgeCard } from '../../design-system/components/MedicationNudgeCard';
import { TouchCard } from '../../design-system/components/TouchCard';
import { SeniorSOSModal } from './SeniorSOSModal';
import { Heart, Users, MessageCircle, ShieldCheck, ChevronRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export const SeniorHomeScreen: React.FC = () => {
  const { 
    state, 
    setSeniorTab, 
    markMedicationTaken, 
    snoozeMedication, 
    submitCheckIn 
  } = useSangamStore();
  const [isSOSOpen, setIsSOSOpen] = useState(false);

  // Next upcoming medication
  const nextMedication = state.medications[0];
  const nextEvent = state.medicationEvents.find((e) => e.medicationId === nextMedication?.id);

  const handleTakeMed = (medId: string) => {
    markMedicationTaken(medId);
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#197278', '#17324D', '#EAF4F4'],
      });
    } catch {
      // Confetti fallback
    }
  };

  return (
    <SeniorFlatLayout onTriggerSOS={() => setIsSOSOpen(true)}>
      {/* Warm Dignified Greeting */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ fontSize: '15px', color: '#197278', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
          Tuesday, 15 September
        </div>
        <h1 className="senior-headline" style={{ fontSize: `calc(30px * ${state.fontScale})`, marginTop: '2px' }}>
          Namaste, {state.senior.fullName.split(' ')[0]} ji
        </h1>
      </div>

      {/* Section 1: How are you feeling today? */}
      <div style={{ marginBottom: '22px' }}>
        <div style={{ fontSize: `calc(19px * ${state.fontScale})`, fontWeight: 700, color: '#17324D', marginBottom: '10px' }}>
          How are you feeling today?
        </div>
        <MoodSelector
          selectedMood={state.checkIn.mood}
          onSelectMood={(mood) => submitCheckIn(mood)}
        />
      </div>

      {/* Section 2: Next Medicine Nudge */}
      {nextMedication && (
        <div style={{ marginBottom: '24px' }}>
          <div style={{ fontSize: `calc(19px * ${state.fontScale})`, fontWeight: 700, color: '#17324D', marginBottom: '10px' }}>
            Next Medicine
          </div>
          <MedicationNudgeCard
            medication={nextMedication}
            event={nextEvent}
            onMarkTaken={handleTakeMed}
            onSnooze={snoozeMedication}
            isSeniorView={true}
          />
        </div>
      )}

      {/* Section 3: The Three Master Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
        {/* 1. Health */}
        <TouchCard
          variant="white"
          padding="20px 22px"
          onClick={() => setSeniorTab('HEALTH')}
          ariaLabel="Go to my health, medicines, doctors and hospital"
          style={{ borderLeft: '8px solid #197278' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div
                style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '16px',
                  backgroundColor: '#EAF4F4',
                  color: '#197278',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Heart size={30} strokeWidth={2.5} />
              </div>
              <div>
                <div style={{ fontSize: `calc(22px * ${state.fontScale})`, fontWeight: 700, color: '#17324D' }}>
                  Health
                </div>
                <div style={{ fontSize: '15px', color: '#4A5A66', marginTop: '2px' }}>
                  Medicines, Doctors & Clinic
                </div>
              </div>
            </div>
            <ChevronRight size={28} color="#197278" strokeWidth={2.5} />
          </div>
        </TouchCard>

        {/* 2. Family */}
        <TouchCard
          variant="white"
          padding="20px 22px"
          onClick={() => setSeniorTab('FAMILY')}
          ariaLabel="Go to family messages and photos"
          style={{ borderLeft: '8px solid #17324D' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div
                style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '16px',
                  backgroundColor: '#F4F1E9',
                  color: '#17324D',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Users size={30} strokeWidth={2.5} />
              </div>
              <div>
                <div style={{ fontSize: `calc(22px * ${state.fontScale})`, fontWeight: 700, color: '#17324D' }}>
                  Family
                </div>
                <div style={{ fontSize: '15px', color: '#4A5A66', marginTop: '2px' }}>
                  Messages & Photos from Children
                </div>
              </div>
            </div>
            <ChevronRight size={28} color="#17324D" strokeWidth={2.5} />
          </div>
        </TouchCard>

        {/* 3. Talk to Someone */}
        <TouchCard
          variant="white"
          padding="20px 22px"
          onClick={() => setSeniorTab('COMMUNITY')}
          ariaLabel="Talk to someone. Today's community discussion"
          style={{ borderLeft: '8px solid #197278' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div
                style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '16px',
                  backgroundColor: '#EAF4F4',
                  color: '#197278',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <MessageCircle size={30} strokeWidth={2.5} />
              </div>
              <div>
                <div style={{ fontSize: `calc(22px * ${state.fontScale})`, fontWeight: 700, color: '#17324D' }}>
                  Talk to Someone
                </div>
                <div style={{ fontSize: '15px', color: '#4A5A66', marginTop: '2px' }}>
                  Today: Monsoon Memories
                </div>
              </div>
            </div>
            <ChevronRight size={28} color="#197278" strokeWidth={2.5} />
          </div>
        </TouchCard>
      </div>

      {/* Visible Privacy & Permissions Footer */}
      <div style={{ textAlign: 'center', marginTop: '12px' }}>
        <button
          type="button"
          onClick={() => setSeniorTab('PERMISSIONS')}
          style={{
            background: 'none',
            border: 'none',
            color: '#197278',
            fontSize: '16px',
            fontWeight: 700,
            textDecoration: 'underline',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            cursor: 'pointer',
            padding: '10px',
          }}
        >
          <ShieldCheck size={18} />
          <span>Who can see my information?</span>
        </button>
      </div>

      {/* SOS Modal Component */}
      <SeniorSOSModal isOpen={isSOSOpen} onClose={() => setIsSOSOpen(false)} />
    </SeniorFlatLayout>
  );
};
