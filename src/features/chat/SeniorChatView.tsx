import React, { useState } from 'react';
import { useSangamStore } from '../../core/storage/useSangamStore';
import { Phone, Mic, Send, Volume2 } from 'lucide-react';
import { audioService } from '../../core/services/audioService';

export const SeniorChatView: React.FC = () => {
  const { 
    state, 
    sendChatMessage, 
    setActiveChatThread,
    logAnalyticsEvent 
  } = useSangamStore();

  const [activeContactId, setActiveContactId] = useState<string | null>('thread-family');
  const [typedMessage, setTypedMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordDuration, setRecordDuration] = useState(0);
  const [callAlert, setCallAlert] = useState<string | null>(null);

  const activeThread = state.chatThreads.find((t) => t.id === activeContactId) || state.chatThreads[0];
  const messages = state.chatMessages.filter((m) => m.threadId === (activeThread ? activeThread.id : 'thread-family'));

  const handleStartVoiceRecording = () => {
    setIsRecording(true);
    setRecordDuration(0);
    logAnalyticsEvent('VOICE_MEMORY_RECORDING_STARTED', 'Started voice message');
    const interval = setInterval(() => {
      setRecordDuration((prev) => {
        if (prev >= 60) {
          clearInterval(interval);
          return 60;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const handleFinishVoiceRecording = () => {
    setIsRecording(false);
    if (activeThread) {
      sendChatMessage(activeThread.id, undefined, recordDuration || 8);
    }
  };

  const handleSendText = () => {
    if (!typedMessage.trim() || !activeThread) return;
    sendChatMessage(activeThread.id, typedMessage.trim());
    setTypedMessage('');
  };

  const handleCallContact = (contactName: string, phone: string) => {
    audioService.speak(`Calling ${contactName} at ${phone}`);
    setCallAlert(`Connecting call to ${contactName} (${phone})...`);
    logAnalyticsEvent('CHAT_OPENED', `Initiated phone call to ${contactName}`);
    setTimeout(() => setCallAlert(null), 4000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Contact Selector Bar (Family, Caregiver, Doctor) */}
      <div
        style={{
          display: 'flex',
          gap: '10px',
          overflowX: 'auto',
          paddingBottom: '12px',
          marginBottom: '12px',
          borderBottom: '1px solid #E2DDD5',
        }}
      >
        {state.chatThreads.map((thread) => {
          const isSelected = activeThread?.id === thread.id;
          return (
            <button
              key={thread.id}
              type="button"
              onClick={() => {
                setActiveContactId(thread.id);
                setActiveChatThread(thread.id);
                logAnalyticsEvent('CHAT_OPENED', `Opened chat with ${thread.contactName}`);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 14px',
                borderRadius: '16px',
                border: isSelected ? '2px solid #197278' : '1px solid #E2DDD5',
                backgroundColor: isSelected ? '#EAF4F4' : '#FFFFFF',
                cursor: 'pointer',
                flexShrink: 0,
              }}
            >
              <img
                src={thread.contactAvatar}
                alt={thread.contactName}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                }}
              />
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '15px', fontWeight: 800, color: '#17324D' }}>
                  {thread.contactName}
                </div>
                <div style={{ fontSize: '12px', color: isSelected ? '#197278' : '#4A5A66', fontWeight: 600 }}>
                  {thread.contactRole}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Call Alert Notification */}
      {callAlert && (
        <div
          style={{
            backgroundColor: '#ECFDF3',
            border: '1px solid #A6F4C5',
            borderRadius: '12px',
            padding: '12px 16px',
            marginBottom: '12px',
            color: '#027A48',
            fontSize: '15px',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <Phone size={18} />
          <span>{callAlert}</span>
        </div>
      )}

      {/* Contact Header with Primary Call Action */}
      {activeThread && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#FFFFFF',
            padding: '12px 16px',
            borderRadius: '14px',
            marginBottom: '14px',
            border: '1px solid #E2DDD5',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img
              src={activeThread.contactAvatar}
              alt={activeThread.contactName}
              style={{ width: '46px', height: '46px', borderRadius: '50%', objectFit: 'cover' }}
            />
            <div>
              <div style={{ fontSize: '17px', fontWeight: 800, color: '#17324D' }}>
                {activeThread.contactName}
              </div>
              <div style={{ fontSize: '13px', color: '#4A5A66' }}>
                {activeThread.contactRole} • {activeThread.contactPhone}
              </div>
            </div>
          </div>

          {/* Primary Call Action */}
          <button
            type="button"
            onClick={() => handleCallContact(activeThread.contactName, activeThread.contactPhone)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#197278',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '24px',
              padding: '10px 18px',
              fontSize: '15px',
              fontWeight: 800,
              cursor: 'pointer',
              minHeight: '44px',
            }}
          >
            <Phone size={18} />
            <span>Call</span>
          </button>
        </div>
      )}

      {/* Messages Thread (Large Readable Messages) */}
      <div
        style={{
          minHeight: '240px',
          maxHeight: '360px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          padding: '4px 0 16px 0',
        }}
      >
        {messages.map((msg) => {
          const isMe = msg.senderRole === 'OLDER_ADULT';
          return (
            <div
              key={msg.id}
              style={{
                alignSelf: isMe ? 'flex-end' : 'flex-start',
                maxWidth: '85%',
                backgroundColor: isMe ? '#17324D' : '#FFFFFF',
                color: isMe ? '#FFFFFF' : '#172026',
                padding: '14px 18px',
                borderRadius: '18px',
                borderBottomRightRadius: isMe ? '4px' : '18px',
                borderBottomLeftRadius: isMe ? '18px' : '4px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                border: isMe ? 'none' : '1px solid #E2DDD5',
              }}
            >
              <div style={{ fontSize: '12px', color: isMe ? '#C4DEDB' : '#4A5A66', marginBottom: '4px', fontWeight: 700 }}>
                {isMe ? 'You' : msg.senderName} • {msg.timestamp}
              </div>

              {msg.type === 'VOICE_NOTE' ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <button
                    type="button"
                    onClick={() => audioService.speak(msg.textMessage || 'Playing voice note.')}
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundColor: isMe ? '#197278' : '#EAF4F4',
                      color: isMe ? '#FFFFFF' : '#197278',
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    <Volume2 size={20} />
                  </button>
                  <div style={{ fontSize: '16px', fontWeight: 700 }}>
                    Voice Note ({msg.audioDurationSec || 8}s)
                  </div>
                </div>
              ) : (
                <div style={{ fontSize: '17px', lineHeight: 1.4, fontWeight: 500 }}>
                  {msg.textMessage}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Input Section (Voice-First, Large Touch Targets, Call/Speak/Send) */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderTop: '2px solid #E2DDD5',
          padding: '14px 16px',
          borderRadius: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          flexShrink: 0,
        }}
      >
        {isRecording ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#FEF3F2', padding: '12px 16px', borderRadius: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#B42318', fontWeight: 800, fontSize: '16px' }}>
              <span className="pulse-emergency" style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#B42318', display: 'inline-block' }} />
              <span>Recording... {recordDuration}s</span>
            </div>
            <button
              type="button"
              onClick={handleFinishVoiceRecording}
              style={{
                backgroundColor: '#197278',
                color: '#FFFFFF',
                border: 'none',
                padding: '10px 18px',
                borderRadius: '20px',
                fontWeight: 800,
                fontSize: '15px',
                cursor: 'pointer',
              }}
            >
              SEND VOICE
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {/* Primary Large Voice Action: Speak */}
            <button
              type="button"
              onClick={handleStartVoiceRecording}
              style={{
                flex: 1,
                minHeight: '52px',
                backgroundColor: '#EAF4F4',
                color: '#197278',
                border: '2px solid #197278',
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
              <Mic size={22} />
              <span>Speak Message</span>
            </button>

            {/* Optional text input */}
            <input
              type="text"
              value={typedMessage}
              onChange={(e) => setTypedMessage(e.target.value)}
              placeholder="Or type a short note..."
              style={{
                flex: 1.4,
                minHeight: '50px',
                padding: '0 14px',
                borderRadius: '12px',
                border: '1px solid #E2DDD5',
                fontSize: '15px',
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendText();
              }}
            />

            <button
              type="button"
              onClick={handleSendText}
              disabled={!typedMessage.trim()}
              style={{
                width: '52px',
                minHeight: '52px',
                borderRadius: '12px',
                backgroundColor: typedMessage.trim() ? '#17324D' : '#E2DDD5',
                color: '#FFFFFF',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: typedMessage.trim() ? 'pointer' : 'not-allowed',
              }}
            >
              <Send size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
