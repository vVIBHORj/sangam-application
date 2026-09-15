import React, { useState } from 'react';
import { useSangamStore } from '../../core/storage/useSangamStore';
import { SeniorFlatLayout } from '../../design-system/layouts/SeniorFlatLayout';
import { TouchCard } from '../../design-system/components/TouchCard';
import { AudioPlayer } from '../../design-system/components/AudioPlayer';
import { SeniorSOSModal } from './SeniorSOSModal';
import { Mic, Send, Sparkles, MessageCircle, ShieldCheck, Check } from 'lucide-react';
import { SangamButton } from '../../design-system/components/SangamButton';
import confetti from 'canvas-confetti';

export const SeniorCommunityScreen: React.FC = () => {
  const { state, setSeniorTab, addVoiceReply } = useSangamStore();
  const [isSOSOpen, setIsSOSOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [submittedReply, setSubmittedReply] = useState(false);

  const post = state.communityPost;

  const handleStartRecord = () => {
    setIsRecording(true);
    setRecordingSeconds(0);
    const interval = setInterval(() => {
      setRecordingSeconds((prev) => {
        if (prev >= 60) {
          clearInterval(interval);
          return 60;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const handleFinishAndSubmit = () => {
    setIsRecording(false);
    const simulatedMemory = 'I remember the rain on our tin roof in Shimla. We would make hot ginger tea and listen to the radio together with the whole family.';
    addVoiceReply(simulatedMemory, recordingSeconds || 14);
    setSubmittedReply(true);

    try {
      confetti({
        particleCount: 35,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#197278', '#17324D', '#EAF4F4'],
      });
    } catch {
      // Ignore
    }

    setTimeout(() => setSubmittedReply(false), 4000);
  };

  return (
    <SeniorFlatLayout
      title="Talk to Someone"
      showBack={true}
      onBack={() => setSeniorTab('HOME')}
      onTriggerSOS={() => setIsSOSOpen(true)}
    >
      {/* 1. Today's Curated Topic Banner */}
      <div style={{ marginBottom: '22px' }}>
        <TouchCard variant="sage" padding="22px">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#197278', fontWeight: 700, fontSize: '14px', textTransform: 'uppercase' }}>
            <Sparkles size={16} />
            <span>Today's Discussion</span>
          </div>

          <h2 style={{ fontSize: `calc(24px * ${state.fontScale})`, fontWeight: 800, color: '#17324D', marginTop: '6px', lineHeight: 1.3 }}>
            {post.topicTitle}
          </h2>

          <p style={{ fontSize: '16px', color: '#172026', marginTop: '8px', lineHeight: 1.5 }}>
            {post.topicPrompt}
          </p>

          <div style={{ marginTop: '16px' }}>
            <AudioPlayer
              title="Featured Memory"
              authorName={post.featuredStoryBy}
              durationSec={post.audioDurationSec}
              speechText={post.featuredStoryAudioText}
            />
          </div>
        </TouchCard>
      </div>

      {/* 2. Share Your Voice Memory */}
      <section style={{ marginBottom: '28px' }}>
        <TouchCard variant="white" padding="20px">
          <div style={{ fontSize: '20px', fontWeight: 700, color: '#17324D', marginBottom: '4px' }}>
            Share Your Memory
          </div>
          <p style={{ fontSize: '15px', color: '#4A5A66', marginBottom: '16px' }}>
            Friends across India are listening. Tap the mic and speak!
          </p>

          {submittedReply ? (
            <div
              style={{
                backgroundColor: '#EAF4F4',
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
              <span>Your story was shared with friends!</span>
            </div>
          ) : isRecording ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#B42318', fontWeight: 700 }}>
                <span className="pulse-emergency" style={{ width: '14px', height: '14px', borderRadius: '50%', backgroundColor: '#B42318', display: 'inline-block' }} />
                <span>Recording... {recordingSeconds}s / 60s (Speak clearly)</span>
              </div>
              <SangamButton
                variant="secondary"
                size="senior-primary"
                icon={<Send size={20} />}
                onClick={handleFinishAndSubmit}
              >
                DONE • SHARE WITH FRIENDS
              </SangamButton>
            </div>
          ) : (
            <SangamButton
              variant="secondary"
              size="senior-primary"
              icon={<Mic size={22} />}
              onClick={handleStartRecord}
              ariaLabel="Tap to speak and record your memory"
            >
              TAP TO SPEAK YOUR MEMORY
            </SangamButton>
          )}
        </TouchCard>
      </section>

      {/* 3. Listen to Friends' Memories */}
      <section style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
          <MessageCircle size={22} color="#17324D" />
          <h3 style={{ fontSize: `calc(20px * ${state.fontScale})`, fontWeight: 700, color: '#17324D' }}>
            Friends Who Shared ({state.voiceReplies.length})
          </h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {state.voiceReplies.map((reply) => (
            <TouchCard key={reply.id} variant="white" padding="16px 18px">
              <AudioPlayer
                title={`Memory from ${reply.authorName}`}
                authorName={`${reply.authorName} (${reply.authorCity})`}
                durationSec={reply.durationSec}
                speechText={reply.transcription}
              />
              {reply.transcription && (
                <p style={{ fontSize: '15px', color: '#4A5A66', marginTop: '10px', fontStyle: 'italic', lineHeight: 1.4 }}>
                  "{reply.transcription}"
                </p>
              )}
            </TouchCard>
          ))}
        </div>
      </section>

      {/* Safety & Moderation Reassurance */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          backgroundColor: '#F4F1E9',
          borderRadius: '14px',
          padding: '12px 16px',
          fontSize: '14px',
          color: '#17324D',
          fontWeight: 600,
        }}
      >
        <ShieldCheck size={20} color="#197278" style={{ flexShrink: 0 }} />
        <span>A safe space curated for seniors. No advertisements or unwanted messages.</span>
      </div>

      <SeniorSOSModal isOpen={isSOSOpen} onClose={() => setIsSOSOpen(false)} />
    </SeniorFlatLayout>
  );
};
