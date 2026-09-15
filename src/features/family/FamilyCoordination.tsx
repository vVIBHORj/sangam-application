import React, { useState } from 'react';
import { useSangamStore } from '../../core/storage/useSangamStore';
import { TouchCard } from '../../design-system/components/TouchCard';
import { Send, PhoneCall, Check } from 'lucide-react';
import { SangamButton } from '../../design-system/components/SangamButton';

export const FamilyCoordination: React.FC = () => {
  const { state } = useSangamStore();
  const [familyNotes, setFamilyNotes] = useState([
    { id: '1', author: 'Rohan (Son)', text: 'I am taking Mom for her cardiology ECG checkup this Thursday at 11:00 AM.', date: 'Today at 09:00 AM' },
    { id: '2', author: 'Priya (Daughter)', text: 'Ordered fresh groceries and almonds for Mom via Blinkit. Will arrive by 2 PM.', date: 'Yesterday at 04:30 PM' },
  ]);
  const [newNote, setNewNote] = useState('');
  const [messageToMom, setMessageToMom] = useState('');
  const [sentNotice, setSentNotice] = useState(false);

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    setFamilyNotes([
      { id: Date.now().toString(), author: 'Priya (Daughter)', text: newNote, date: 'Just now' },
      ...familyNotes,
    ]);
    setNewNote('');
  };

  const handleSendMessageToMom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageToMom.trim()) return;
    setSentNotice(true);
    setMessageToMom('');
    setTimeout(() => setSentNotice(false), 3500);
  };

  return (
    <div className="scroll-container" style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#17324D' }}>
          Sibling Coordination
        </h2>
        <div style={{ fontSize: '14px', color: '#4A5A66' }}>
          Care circle collaboration & direct messages to Mom
        </div>
      </div>

      {/* 1. Care Circle Members */}
      <section style={{ marginBottom: '24px' }}>
        <div style={{ fontSize: '16px', fontWeight: 700, color: '#17324D', marginBottom: '10px' }}>
          Care Circle Members ({state.relationships.length})
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {state.relationships.map((rel) => (
            <TouchCard key={rel.id} variant="white" padding="14px 16px">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img
                    src={rel.userAvatar}
                    alt={rel.displayName}
                    style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div>
                    <div style={{ fontSize: '16px', fontWeight: 700, color: '#17324D' }}>
                      {rel.displayName}
                    </div>
                    <div style={{ fontSize: '13px', color: '#197278', fontWeight: 600 }}>
                      {rel.isPrimaryContact ? 'Primary Emergency Contact' : 'Care Circle Member'}
                    </div>
                  </div>
                </div>

                <a
                  href={`tel:${rel.phone}`}
                  style={{
                    backgroundColor: '#F4F1E9',
                    color: '#17324D',
                    border: '1px solid #E2DDD5',
                    borderRadius: '10px',
                    padding: '6px 10px',
                    fontSize: '13px',
                    fontWeight: 700,
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <PhoneCall size={14} /> Call
                </a>
              </div>
            </TouchCard>
          ))}
        </div>
      </section>

      {/* 2. Send Message / Audio to Mom */}
      <section style={{ marginBottom: '26px' }}>
        <TouchCard variant="sage" padding="18px">
          <div style={{ fontSize: '18px', fontWeight: 800, color: '#17324D', marginBottom: '6px' }}>
            Send Message to Mom's App
          </div>
          <p style={{ fontSize: '14px', color: '#4A5A66', marginBottom: '14px' }}>
            Appears on Mom's large Family screen as a spoken voice note or greeting.
          </p>

          {sentNotice ? (
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '12px',
                padding: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#197278',
                fontWeight: 700,
                fontSize: '15px',
              }}
            >
              <Check size={20} strokeWidth={3} />
              <span>Delivered to Mom's phone!</span>
            </div>
          ) : (
            <form onSubmit={handleSendMessageToMom} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <input
                type="text"
                placeholder="Type a loving morning message..."
                value={messageToMom}
                onChange={(e) => setMessageToMom(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '12px',
                  border: '1.5px solid #C4DEDB',
                  fontSize: '15px',
                  outline: 'none',
                }}
              />
              <div style={{ display: 'flex', gap: '10px' }}>
                <SangamButton type="submit" variant="secondary" size="normal" icon={<Send size={16} />}>
                  Send to Mom
                </SangamButton>
              </div>
            </form>
          )}
        </TouchCard>
      </section>

      {/* 3. Shared Sibling Family Notes */}
      <section style={{ marginBottom: '18px' }}>
        <div style={{ fontSize: '16px', fontWeight: 700, color: '#17324D', marginBottom: '10px' }}>
          Shared Sibling Coordination Notes
        </div>

        <form onSubmit={handleAddNote} style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
          <input
            type="text"
            placeholder="Add note for siblings..."
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            style={{
              flex: 1,
              padding: '10px 14px',
              borderRadius: '12px',
              border: '1.5px solid #E2DDD5',
              fontSize: '14px',
            }}
          />
          <button
            type="submit"
            style={{
              backgroundColor: '#17324D',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '12px',
              padding: '0 16px',
              fontSize: '14px',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Post
          </button>
        </form>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {familyNotes.map((note) => (
            <TouchCard key={note.id} variant="white" padding="14px">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontSize: '14px', fontWeight: 700, color: '#17324D' }}>{note.author}</span>
                <span style={{ fontSize: '12px', color: '#4A5A66' }}>{note.date}</span>
              </div>
              <p style={{ fontSize: '14px', color: '#172026', lineHeight: 1.4 }}>
                {note.text}
              </p>
            </TouchCard>
          ))}
        </div>
      </section>
    </div>
  );
};
