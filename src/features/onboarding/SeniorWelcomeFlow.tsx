import React, { useState } from 'react';
import { useSangamStore } from '../../core/storage/useSangamStore';
import { SangamLogo } from '../../assets/doodles/SangamDoodles';
import { SangamButton } from '../../design-system/components/SangamButton';
import { Heart, Volume2, Sparkles, Check, ArrowRight } from 'lucide-react';
import { audioService } from '../../core/services/audioService';
import confetti from 'canvas-confetti';

export const SeniorWelcomeFlow: React.FC = () => {
  const { state, setOnboardingStep, setRole } = useSangamStore();
  const [hasPlayedAudio, setHasPlayedAudio] = useState(false);

  const handlePlayFamilyMessage = () => {
    setHasPlayedAudio(true);
    audioService.speak(
      `Good morning Mom! Aarav and I are so happy you are here. We love you and we are always here for you.`
    );
    try {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#197278', '#17324D', '#F4F1E9'],
      });
    } catch {
      // Confetti fallback
    }
  };

  const handleFinishToSeniorHome = () => {
    setRole('OLDER_ADULT');
  };

  // Screen 1: Trust Before Competence
  if (state.onboardingStep === 'SENIOR_WELCOME_1') {
    return (
      <div
        className="scroll-container"
        style={{
          padding: '36px 24px',
          backgroundColor: 'var(--color-background-cream)',
          minHeight: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
            <SangamLogo size={48} />
          </div>

          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#17324D', lineHeight: 1.25 }}>
              Welcome, {state.senior.fullName.split(' ')[0]} ji.
            </h1>
            <p style={{ fontSize: '20px', color: '#172026', marginTop: '14px', lineHeight: 1.5, fontWeight: 500 }}>
              Your family added you so they can help take care of you.
            </p>
          </div>

          {/* Warm Family Portrait Illustration */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '2px solid #E2DDD5',
              borderRadius: '24px',
              padding: '16px',
              textAlign: 'center',
              boxShadow: 'var(--shadow-card)',
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80"
              alt="Mom Kavita"
              style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', margin: '0 auto 12px auto', border: '4px solid #197278' }}
            />
            <div style={{ fontSize: '18px', fontWeight: 700, color: '#17324D' }}>
              Connected with Priya Sharma
            </div>
            <div style={{ fontSize: '14px', color: '#197278', fontWeight: 600 }}>
              Daughter • Primary Contact
            </div>
          </div>
        </div>

        <div style={{ marginTop: '32px' }}>
          <SangamButton
            variant="primary"
            size="senior-critical"
            onClick={() => setOnboardingStep('SENIOR_WELCOME_2')}
            ariaLabel="Continue to family message"
          >
            CONTINUE →
          </SangamButton>
        </div>
      </div>
    );
  }

  // Screen 2: Early Win & Emotional Connection
  if (state.onboardingStep === 'SENIOR_WELCOME_2') {
    return (
      <div
        className="scroll-container"
        style={{
          padding: '36px 24px',
          backgroundColor: 'var(--color-background-cream)',
          minHeight: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: '#FEF3F2',
                color: '#B42318',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Heart size={36} fill="#B42318" />
            </div>
          </div>

          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#17324D', lineHeight: 1.3 }}>
              Your daughter Priya left you a message.
            </h1>
            <p style={{ fontSize: '18px', color: '#4A5A66', marginTop: '10px' }}>
              Tap the button below to listen to her voice.
            </p>
          </div>

          {/* Voice Action Card */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: hasPlayedAudio ? '3px solid #197278' : '2px solid #E2DDD5',
              borderRadius: '24px',
              padding: '24px',
              textAlign: 'center',
              boxShadow: 'var(--shadow-card)',
            }}
          >
            {hasPlayedAudio ? (
              <div>
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    backgroundColor: '#EAF4F4',
                    color: '#197278',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 12px auto',
                  }}
                >
                  <Check size={32} strokeWidth={3} />
                </div>
                <div style={{ fontSize: '20px', fontWeight: 700, color: '#17324D' }}>
                  "We love you Mom, have a wonderful day!"
                </div>
                <div style={{ fontSize: '15px', color: '#197278', fontWeight: 600, marginTop: '4px' }}>
                  Message played successfully ✓
                </div>
              </div>
            ) : (
              <div>
                <SangamButton
                  variant="secondary"
                  size="senior-critical"
                  icon={<Volume2 size={26} />}
                  onClick={handlePlayFamilyMessage}
                  ariaLabel="Listen to Priya's voice message"
                >
                  SEE MY FAMILY'S MESSAGE
                </SangamButton>
              </div>
            )}
          </div>
        </div>

        <div style={{ marginTop: '32px' }}>
          <SangamButton
            variant="primary"
            size="senior-critical"
            onClick={() => setOnboardingStep('SENIOR_WELCOME_3')}
            ariaLabel="Continue to home overview"
          >
            CONTINUE →
          </SangamButton>
        </div>
      </div>
    );
  }

  // Screen 3: Gentle Landing on 3-Icon Home
  return (
    <div
      className="scroll-container"
      style={{
        padding: '36px 24px',
        backgroundColor: 'var(--color-background-cream)',
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <div>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <div
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              backgroundColor: '#EAF4F4',
              color: '#197278',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Sparkles size={32} />
          </div>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#17324D', lineHeight: 1.3 }}>
            Everything is Ready
          </h1>
          <p style={{ fontSize: '18px', color: '#4A5A66', marginTop: '8px' }}>
            Your home has only 3 simple choices:
          </p>
        </div>

        {/* 3 Icons Preview */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '14px 18px', border: '2px solid #E2DDD5', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <span style={{ fontSize: '24px' }}>🩺</span>
            <div>
              <strong style={{ fontSize: '17px', color: '#17324D' }}>Health:</strong> Today's medicines & doctor numbers
            </div>
          </div>

          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '14px 18px', border: '2px solid #E2DDD5', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <span style={{ fontSize: '24px' }}>👨‍👩‍👧</span>
            <div>
              <strong style={{ fontSize: '17px', color: '#17324D' }}>Family:</strong> Messages and photos from children
            </div>
          </div>

          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '14px 18px', border: '2px solid #E2DDD5', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <span style={{ fontSize: '24px' }}>💬</span>
            <div>
              <strong style={{ fontSize: '17px', color: '#17324D' }}>Talk to Someone:</strong> Daily community discussion
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '32px' }}>
        <SangamButton
          variant="secondary"
          size="senior-critical"
          icon={<ArrowRight size={24} />}
          onClick={handleFinishToSeniorHome}
          ariaLabel="Go to my home screen"
        >
          GO TO MY HOME
        </SangamButton>
      </div>
    </div>
  );
};
