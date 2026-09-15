import React, { useState } from 'react';
import { useSangamStore } from '../../core/storage/useSangamStore';
import { SeniorFlatLayout } from '../../design-system/layouts/SeniorFlatLayout';
import { TouchCard } from '../../design-system/components/TouchCard';
import { AudioPlayer } from '../../design-system/components/AudioPlayer';
import { SeniorSOSModal } from './SeniorSOSModal';
import { PhoneCall, Mic, Heart, Send, Check } from 'lucide-react';
import { SangamButton } from '../../design-system/components/SangamButton';

export const SeniorFamilyHub: React.FC = () => {
  const { state, setSeniorTab } = useSangamStore();
  const [isSOSOpen, setIsSOSOpen] = useState(false);
  const [isRecordingReply, setIsRecordingReply] = useState(false);
  const [replySent, setReplySent] = useState(false);

  const handleSendVoiceReply = () => {
    setIsRecordingReply(false);
    setReplySent(true);
    setTimeout(() => setReplySent(false), 4000);
  };

  return (
    <SeniorFlatLayout
      title="Family Connection"
      showBack={true}
      onBack={() => setSeniorTab('HOME')}
      onTriggerSOS={() => setIsSOSOpen(true)}
    >
      {/* 1. Voice Notes from Children */}
      <section style={{ marginBottom: '26px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <Heart size={22} color="#B42318" strokeWidth={2.5} />
          <h2 style={{ fontSize: `calc(22px * ${state.fontScale})`, fontWeight: 700, color: '#17324D' }}>
            Messages from Children
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {state.familyMessages
            .filter((m) => m.type === 'VOICE_NOTE')
            .map((msg) => (
              <TouchCard key={msg.id} variant="white" padding="18px 20px">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <img
                    src={msg.senderAvatar}
                    alt={msg.senderName}
                    style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #197278' }}
                  />
                  <div>
                    <div style={{ fontSize: '18px', fontWeight: 700, color: '#17324D' }}>
                      {msg.senderName}
                    </div>
                    <div style={{ fontSize: '14px', color: '#197278', fontWeight: 600 }}>
                      {msg.senderRelation} • Today at 7:45 AM
                    </div>
                  </div>
                </div>

                <AudioPlayer
                  title="Morning voice message"
                  authorName={msg.senderName}
                  durationSec={msg.durationSec || 18}
                  speechText={msg.textMessage}
                />
              </TouchCard>
            ))}
        </div>
      </section>

      {/* Send a Voice Message Back */}
      <section style={{ marginBottom: '28px' }}>
        <TouchCard variant="sage" padding="20px">
          <div style={{ fontSize: '20px', fontWeight: 700, color: '#17324D', marginBottom: '4px' }}>
            Send Voice Message to Priya
          </div>
          <p style={{ fontSize: '15px', color: '#4A5A66', marginBottom: '16px' }}>
            Tap the button below and speak. No typing needed!
          </p>

          {replySent ? (
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                padding: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                color: '#197278',
                fontWeight: 700,
                fontSize: '17px',
              }}
            >
              <Check size={24} strokeWidth={3} />
              <span>Voice message sent to Priya!</span>
            </div>
          ) : isRecordingReply ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#B42318', fontWeight: 700 }}>
                <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#B42318', display: 'inline-block' }} />
                <span>Listening... Speak your message</span>
              </div>
              <SangamButton
                variant="secondary"
                size="senior-primary"
                icon={<Send size={20} />}
                onClick={handleSendVoiceReply}
              >
                Done • Send to Priya
              </SangamButton>
            </div>
          ) : (
            <SangamButton
              variant="secondary"
              size="senior-primary"
              icon={<Mic size={22} />}
              onClick={() => setIsRecordingReply(true)}
              ariaLabel="Record voice message for Priya"
            >
              TAP TO SPEAK
            </SangamButton>
          )}
        </TouchCard>
      </section>

      {/* 2. Family Photos (Grandson Aarav) */}
      <section style={{ marginBottom: '28px' }}>
        <div style={{ fontSize: `calc(22px * ${state.fontScale})`, fontWeight: 700, color: '#17324D', marginBottom: '12px' }}>
          Family Photographs
        </div>

        {state.familyMessages
          .filter((m) => m.type === 'PHOTO')
          .map((photo) => (
            <TouchCard key={photo.id} variant="white" padding="16px">
              <img
                src={photo.contentUrl}
                alt="Painting from Grandson Aarav"
                style={{ width: '100%', height: '220px', borderRadius: '14px', objectFit: 'cover', marginBottom: '12px' }}
              />
              <div style={{ fontSize: '18px', fontWeight: 700, color: '#17324D' }}>
                {photo.textMessage}
              </div>
              <div style={{ fontSize: '14px', color: '#197278', fontWeight: 600, marginTop: '2px' }}>
                From {photo.senderName} ({photo.senderRelation})
              </div>
            </TouchCard>
          ))}
      </section>

      {/* 3. Direct Phone Calls to Children */}
      <section style={{ marginBottom: '20px' }}>
        <div style={{ fontSize: `calc(22px * ${state.fontScale})`, fontWeight: 700, color: '#17324D', marginBottom: '12px' }}>
          Call My Children
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {state.relationships
            .filter((r) => r.relationType === 'DAUGHTER' || r.relationType === 'SON')
            .map((rel) => (
              <TouchCard key={rel.id} variant="white" padding="16px 20px">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <img
                      src={rel.userAvatar}
                      alt={rel.displayName}
                      style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <div>
                      <div style={{ fontSize: '19px', fontWeight: 700, color: '#17324D' }}>
                        {rel.displayName}
                      </div>
                      <div style={{ fontSize: '14px', color: '#4A5A66' }}>{rel.phone}</div>
                    </div>
                  </div>

                  <a
                    href={`tel:${rel.phone}`}
                    aria-label={`Call ${rel.displayName}`}
                    className="touch-target-senior"
                    style={{
                      backgroundColor: '#197278',
                      color: '#FFFFFF',
                      borderRadius: '14px',
                      padding: '10px 18px',
                      fontSize: '16px',
                      fontWeight: 700,
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <PhoneCall size={18} /> Call
                  </a>
                </div>
              </TouchCard>
            ))}
        </div>
      </section>

      <SeniorSOSModal isOpen={isSOSOpen} onClose={() => setIsSOSOpen(false)} />
    </SeniorFlatLayout>
  );
};
