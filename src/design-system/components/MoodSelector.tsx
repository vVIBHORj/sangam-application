import React from 'react';
import { CheckInMood } from '../../core/domain/types';

interface MoodSelectorProps {
  selectedMood?: CheckInMood;
  onSelectMood: (mood: CheckInMood) => void;
}

interface MoodOption {
  mood: CheckInMood;
  emoji: string;
  label: string;
  ariaDesc: string;
}

const options: MoodOption[] = [
  { mood: 'GOOD', emoji: '😊', label: 'Good', ariaDesc: 'Feeling good today' },
  { mood: 'OKAY', emoji: '🙂', label: 'Okay', ariaDesc: 'Feeling okay today' },
  { mood: 'NOT_GREAT', emoji: '😐', label: 'Not great', ariaDesc: 'Feeling not so great' },
  { mood: 'NEED_HELP', emoji: '😟', label: 'Need help', ariaDesc: 'I need some help' },
];

export const MoodSelector: React.FC<MoodSelectorProps> = ({ selectedMood, onSelectMood }) => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
      {options.map((opt) => {
        const isSelected = selectedMood === opt.mood;
        return (
          <button
            key={opt.mood}
            type="button"
            aria-label={opt.ariaDesc}
            onClick={() => onSelectMood(opt.mood)}
            className="touch-target-senior"
            style={{
              flexDirection: 'column',
              backgroundColor: isSelected ? '#197278' : '#FFFFFF',
              color: isSelected ? '#FFFFFF' : '#17324D',
              border: isSelected ? '3px solid #17324D' : '2px solid #E2DDD5',
              borderRadius: '16px',
              padding: '12px 6px',
              minHeight: '76px',
              boxShadow: isSelected ? 'var(--shadow-card)' : 'var(--shadow-subtle)',
              cursor: 'pointer',
              transition: 'transform 0.15s ease, background-color 0.15s ease',
            }}
          >
            <span style={{ fontSize: '28px', lineHeight: 1, marginBottom: '6px' }} role="img" aria-hidden="true">
              {opt.emoji}
            </span>
            <span style={{ fontSize: '15px', fontWeight: 700, textAlign: 'center', lineHeight: 1.2 }}>
              {opt.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};
