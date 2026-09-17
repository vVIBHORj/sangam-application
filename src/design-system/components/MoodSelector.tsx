import React from 'react';
import { CheckInMood } from '../../core/domain/types';

interface MoodSelectorProps {
  selectedMood?: CheckInMood;
  onSelectMood: (mood: CheckInMood) => void;
}

interface MoodOption {
  mood: CheckInMood;
  icon: string;
  label: string;
  ariaDesc: string;
}

const options: MoodOption[] = [
  { mood: 'GOOD', icon: '/Good.png', label: 'Good', ariaDesc: 'Feeling good today' },
  { mood: 'OKAY', icon: '/Okay.png', label: 'Okay', ariaDesc: 'Feeling okay today' },
  { mood: 'NOT_GREAT', icon: '/Not_great.png', label: 'Not great', ariaDesc: 'Feeling not so great' },
  { mood: 'NEED_HELP', icon: '/Need_help.png', label: 'Need help', ariaDesc: 'I need some help' },
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
              padding: '10px 4px 12px 4px',
              minHeight: '110px',
              boxShadow: isSelected ? 'var(--shadow-card)' : 'var(--shadow-subtle)',
              cursor: 'pointer',
              transition: 'transform 0.15s ease, background-color 0.15s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                width: '56px',
                height: '56px',
                marginBottom: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '12px',
                backgroundColor: isSelected ? 'rgba(255, 255, 255, 0.2)' : '#F7F4EE',
                padding: '6px',
                overflow: 'hidden',
              }}
            >
              <img
                src={opt.icon}
                alt={opt.label}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  display: 'block',
                }}
              />
            </div>
            <span style={{ fontSize: '15px', fontWeight: 700, textAlign: 'center', lineHeight: 1.2 }}>
              {opt.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};

