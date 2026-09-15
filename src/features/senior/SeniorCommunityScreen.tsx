import React, { useState } from 'react';
import { useSangamStore } from '../../core/storage/useSangamStore';
import { SeniorFlatLayout } from '../../design-system/layouts/SeniorFlatLayout';
import { TouchCard } from '../../design-system/components/TouchCard';
import { SeniorSOSModal } from './SeniorSOSModal';
import { SeniorChatView } from '../chat/SeniorChatView';
import { 
  Play, 
  Pause, 
  Mic, 
  Sparkles, 
  MessageSquare, 
  Users, 
  Check, 
  Headphones 
} from 'lucide-react';
import { audioService } from '../../core/services/audioService';

export const SeniorCommunityScreen: React.FC = () => {
  const { 
    state, 
    setSeniorTab, 
    setSeniorCommunitySubTab, 
    addVoiceReply,
    logAnalyticsEvent 
  } = useSangamStore();

  const [isSOSOpen, setIsSOSOpen] = useState(false);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [submittedReply, setSubmittedReply] = useState(false);

  const subTab = state.activeSeniorCommunitySubTab || 'COMMUNITY';

  const curatedMemories = [
    {
      id: 'mem-01',
      authorName: 'Meena ji',
      location: 'Bengaluru',
      duration: '42 sec',
      snippet: 'Monsoon always reminds me of hot ginger chai and paper boats with my brother in Malleshwaram.',
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
    },
    {
      id: 'mem-02',
      authorName: 'Suresh Kumar',
      location: 'Pune',
      duration: '35 sec',
      snippet: 'Walking under large black umbrellas with my grandfather to fetch fresh jalebis on rainy Sundays.',
      avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80',
    },
    {
      id: 'mem-03',
      authorName: 'Anita ji',
      location: 'Delhi',
      duration: '28 sec',
      snippet: 'The scent of wet earth — mitti ki khushboo — from our courtyard garden after months of dry summer.',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
    },
  ];

  const handleTogglePlay = (id: string, text: string) => {
    if (playingId === id) {
      audioService.stop();
      setPlayingId(null);
    } else {
      audioService.speak(text);
      setPlayingId(id);
      logAnalyticsEvent('VOICE_MEMORY_PLAYED', `Played voice memory ${id}`);
    }
  };

  const handleStartRecord = () => {
    setIsRecording(true);
    setRecordingSeconds(0);
    logAnalyticsEvent('VOICE_MEMORY_RECORDING_STARTED', 'Recording community memory');
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
    const simulatedMemory = 'The sound of rain falling on the leaves in our verandah while listening to Akashvani radio.';
    addVoiceReply(simulatedMemory, recordingSeconds || 18);
    logAnalyticsEvent('VOICE_MEMORY_SHARED', 'Shared community memory');
    setSubmittedReply(true);
    setTimeout(() => setSubmittedReply(false), 4500);
  };

  return (
    <SeniorFlatLayout
      title="Talk to Someone"
      showBack={true}
      onBack={() => setSeniorTab('HOME')}
      onTriggerSOS={() => setIsSOSOpen(true)}
    >
      {/* Editorial Subtab Switcher: Community vs Chat */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          backgroundColor: '#E2DDD5',
          borderRadius: '16px',
          padding: '4px',
          gap: '4px',
          marginBottom: '20px',
        }}
      >
        <button
          type="button"
          onClick={() => {
            setSeniorCommunitySubTab('COMMUNITY');
            logAnalyticsEvent('COMMUNITY_OPENED', 'Opened Community feed');
          }}
          style={{
            padding: '12px 0',
            borderRadius: '12px',
            border: 'none',
            backgroundColor: subTab === 'COMMUNITY' ? '#FFFFFF' : 'transparent',
            color: subTab === 'COMMUNITY' ? '#17324D' : '#4A5A66',
            fontWeight: 800,
            fontSize: '16px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            boxShadow: subTab === 'COMMUNITY' ? '0 2px 4px rgba(0,0,0,0.06)' : 'none',
          }}
        >
          <Users size={20} color={subTab === 'COMMUNITY' ? '#197278' : '#4A5A66'} />
          <span>Community</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setSeniorCommunitySubTab('CHAT');
            logAnalyticsEvent('CHAT_OPENED', 'Opened private Chat list');
          }}
          style={{
            padding: '12px 0',
            borderRadius: '12px',
            border: 'none',
            backgroundColor: subTab === 'CHAT' ? '#FFFFFF' : 'transparent',
            color: subTab === 'CHAT' ? '#17324D' : '#4A5A66',
            fontWeight: 800,
            fontSize: '16px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            boxShadow: subTab === 'CHAT' ? '0 2px 4px rgba(0,0,0,0.06)' : 'none',
          }}
        >
          <MessageSquare size={20} color={subTab === 'CHAT' ? '#197278' : '#4A5A66'} />
          <span>Private Chat</span>
        </button>
      </div>

      {subTab === 'CHAT' ? (
        <SeniorChatView />
      ) : (
        /* COMMUNITY VIEW — Human, Editorial, Clean, Non-Cluttered */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
          {/* Supporting line */}
          <div style={{ padding: '0 4px' }}>
            <p style={{ fontSize: '16px', color: '#4A5A66', margin: 0, lineHeight: 1.4 }}>
              Listen, share and connect with people who understand.
            </p>
          </div>

          {/* 1. TODAY'S DISCUSSION — Large Editorial Community Card */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              padding: '24px',
              boxShadow: '0 4px 12px rgba(23, 50, 77, 0.05)',
              border: '1px solid #E2DDD5',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Subtle background accent */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '120px',
                height: '120px',
                background: 'radial-gradient(circle, rgba(234, 244, 244, 0.8) 0%, rgba(255, 255, 255, 0) 70%)',
                pointerEvents: 'none',
              }}
            />

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#197278', fontWeight: 800, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              <Sparkles size={16} />
              <span>Today's Topic</span>
            </div>

            <h2 style={{ fontSize: `calc(26px * ${state.fontScale})`, fontWeight: 800, color: '#17324D', marginTop: '10px', marginBottom: '8px', lineHeight: 1.25 }}>
              Monsoon Memories & Childhood Rains
            </h2>

            <p style={{ fontSize: '17px', color: '#172026', lineHeight: 1.5, marginBottom: '20px' }}>
              "What's one rainy-day memory you still remember from your younger years?"
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
              <button
                type="button"
                onClick={() => handleTogglePlay('editorial', 'Monsoon Memories: What is one rainy day memory you still remember? Meena ji from Bengaluru shares her story.')}
                style={{
                  minHeight: '52px',
                  backgroundColor: '#EAF4F4',
                  color: '#197278',
                  border: 'none',
                  borderRadius: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  fontSize: '16px',
                  fontWeight: 800,
                  cursor: 'pointer',
                }}
              >
                <Headphones size={20} />
                <span>LISTEN</span>
              </button>

              <button
                type="button"
                onClick={handleStartRecord}
                style={{
                  minHeight: '52px',
                  backgroundColor: '#197278',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  fontSize: '16px',
                  fontWeight: 800,
                  cursor: 'pointer',
                }}
              >
                <Mic size={20} />
                <span>SHARE</span>
              </button>
            </div>
          </div>

          {/* 2. FEATURED VOICE MEMORY — Single Elegant Media Card */}
          <div>
            <div style={{ fontSize: '14px', fontWeight: 800, color: '#4A5A66', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '10px' }}>
              Featured Voice Memory
            </div>

            <TouchCard
              variant="sand"
              padding="18px"
              style={{ borderLeft: '6px solid #197278' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img
                    src={curatedMemories[0].avatarUrl}
                    alt={curatedMemories[0].authorName}
                    style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div>
                    <div style={{ fontSize: '17px', fontWeight: 800, color: '#17324D' }}>
                      {curatedMemories[0].authorName}
                    </div>
                    <div style={{ fontSize: '13px', color: '#4A5A66' }}>
                      {curatedMemories[0].location} • {curatedMemories[0].duration}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleTogglePlay(curatedMemories[0].id, curatedMemories[0].snippet)}
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    backgroundColor: '#197278',
                    color: '#FFFFFF',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                  aria-label="Play featured memory from Meena ji"
                >
                  {playingId === curatedMemories[0].id ? <Pause size={22} /> : <Play size={22} style={{ marginLeft: '2px' }} />}
                </button>
              </div>

              <div style={{ fontSize: '16px', color: '#172026', lineHeight: 1.5, fontStyle: 'italic' }}>
                "{curatedMemories[0].snippet}"
              </div>
            </TouchCard>
          </div>

          {/* 3. COMMUNITY MEMORIES — Clean, Curated Audio Feed */}
          <div>
            <div style={{ fontSize: '14px', fontWeight: 800, color: '#4A5A66', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '10px' }}>
              Community Memories
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {curatedMemories.slice(1).map((mem) => {
                const isPlaying = playingId === mem.id;
                return (
                  <div
                    key={mem.id}
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '16px',
                      padding: '14px 16px',
                      border: '1px solid #E2DDD5',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '12px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                      <img
                        src={mem.avatarUrl}
                        alt={mem.authorName}
                        style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
                      />
                      <div>
                        <div style={{ fontSize: '16px', fontWeight: 800, color: '#17324D' }}>
                          {mem.authorName}
                        </div>
                        <div style={{ fontSize: '13px', color: '#4A5A66', marginTop: '2px' }}>
                          {mem.snippet.substring(0, 52)}...
                        </div>
                        <div style={{ fontSize: '11px', color: '#197278', fontWeight: 700, marginTop: '2px' }}>
                          {mem.location} • {mem.duration}
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleTogglePlay(mem.id, mem.snippet)}
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '50%',
                        backgroundColor: isPlaying ? '#17324D' : '#EAF4F4',
                        color: isPlaying ? '#FFFFFF' : '#197278',
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        flexShrink: 0,
                      }}
                      aria-label={`Play memory from ${mem.authorName}`}
                    >
                      {isPlaying ? <Pause size={18} /> : <Play size={18} style={{ marginLeft: '2px' }} />}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 4. SHARE YOUR MEMORY — Premium Microphone Action */}
          <div style={{ paddingBottom: '16px' }}>
            {submittedReply ? (
              <div
                style={{
                  backgroundColor: '#ECFDF3',
                  border: '1px solid #A6F4C5',
                  borderRadius: '16px',
                  padding: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  color: '#027A48',
                  fontSize: '17px',
                  fontWeight: 800,
                }}
              >
                <Check size={26} strokeWidth={3} />
                <span>Your voice memory was shared with community friends!</span>
              </div>
            ) : isRecording ? (
              <div
                style={{
                  backgroundColor: '#FEF3F2',
                  border: '1px solid #FECDCA',
                  borderRadius: '18px',
                  padding: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#B42318', fontWeight: 800, fontSize: '16px' }}>
                  <span className="pulse-emergency" style={{ width: '14px', height: '14px', borderRadius: '50%', backgroundColor: '#B42318', display: 'inline-block' }} />
                  <span>Recording... {recordingSeconds}s (Speak your memory)</span>
                </div>

                <button
                  type="button"
                  onClick={handleFinishAndSubmit}
                  style={{
                    backgroundColor: '#197278',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '24px',
                    padding: '12px 20px',
                    fontSize: '15px',
                    fontWeight: 800,
                    cursor: 'pointer',
                  }}
                >
                  DONE • SHARE
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleStartRecord}
                style={{
                  width: '100%',
                  minHeight: '68px',
                  backgroundColor: '#FFFFFF',
                  border: '2px dashed #197278',
                  borderRadius: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '14px',
                  cursor: 'pointer',
                  padding: '12px 20px',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
                }}
              >
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    backgroundColor: '#EAF4F4',
                    color: '#197278',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Mic size={24} />
                </div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '18px', fontWeight: 800, color: '#17324D' }}>
                    Share a memory
                  </div>
                  <div style={{ fontSize: '13px', color: '#4A5A66' }}>
                    Tap and speak • Friends love listening
                  </div>
                </div>
              </button>
            )}
          </div>
        </div>
      )}

      {/* SOS Modal */}
      {isSOSOpen && <SeniorSOSModal isOpen={isSOSOpen} onClose={() => setIsSOSOpen(false)} />}
    </SeniorFlatLayout>
  );
};
