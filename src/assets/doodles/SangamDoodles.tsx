import React from 'react';

interface DoodleProps {
  size?: number;
  color?: string;
  className?: string;
}

// Minimal hand-drawn line art representing warmth, family connection, and Indian context

export const TeacupDoodle: React.FC<DoodleProps> = ({ size = 48, color = '#17324D', className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    {/* Steam lines */}
    <path d="M16 10c0-3 2-4 2-6M24 10c0-3 2-4 2-6M32 10c0-3 2-4 2-6" opacity="0.6" />
    {/* Cup body */}
    <path d="M10 14h28v14a10 10 0 0 1-10 10H20a10 10 0 0 1-10-10V14z" />
    {/* Cup handle */}
    <path d="M38 18h3a4 4 0 0 1 4 4v2a4 4 0 0 1-4 4h-3" />
    {/* Saucer */}
    <path d="M6 42h36" />
  </svg>
);

export const HandsDoodle: React.FC<DoodleProps> = ({ size = 48, color = '#17324D', className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    {/* Interlocking hands of caring & connection */}
    <path d="M8 26c4-4 8-4 12 0l4 4c4 4 8 4 12 0" />
    <path d="M14 20l4-4a6 6 0 0 1 8 0l2 2" />
    <path d="M26 28l4 4a6 6 0 0 0 8 0l4-4" />
    <circle cx="24" cy="14" r="3" fill={color} />
  </svg>
);

export const MedicineBoxDoodle: React.FC<DoodleProps> = ({ size = 48, color = '#17324D', className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    {/* Traditional round or square medicine organiser */}
    <rect x="8" y="12" width="32" height="26" rx="6" />
    <line x1="24" y1="12" x2="24" y2="38" />
    <line x1="8" y1="25" x2="40" y2="25" />
    {/* Gentle plus badge */}
    <circle cx="24" cy="25" r="4" fill="#EAF4F4" stroke={color} />
    <path d="M24 23v4M22 25h4" />
  </svg>
);

export const FamilyPhotoDoodle: React.FC<DoodleProps> = ({ size = 48, color = '#17324D', className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="10" y="8" width="28" height="32" rx="4" />
    <circle cx="20" cy="18" r="3" />
    <path d="M14 30c0-3 3-5 6-5s6 2 6 5" />
    <circle cx="30" cy="20" r="2.5" />
    <path d="M26 30c0-2 2-3.5 4-3.5s4 1.5 4 3.5" />
    <line x1="6" y1="42" x2="42" y2="42" />
  </svg>
);

export const VoiceWavesDoodle: React.FC<DoodleProps> = ({ size = 48, color = '#17324D', className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    {/* Microphone or speech soundwaves */}
    <path d="M10 24c0-6 4-10 10-10h8c6 0 10 4 10 10v4c0 6-4 10-10 10h-4l-8 5v-5c-3.3 0-6-2.7-6-6v-4z" />
    <path d="M20 22v6M24 19v12M28 22v6" />
  </svg>
);

export const SangamLogo: React.FC<{ size?: number; showTagline?: boolean }> = ({ size = 40, showTagline = false }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
      <rect width="44" height="44" rx="14" fill="#17324D" />
      {/* Confluence meeting waves */}
      <path d="M12 28C16 20 22 18 32 18" stroke="#197278" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M12 18C16 26 22 28 32 28" stroke="#EAF4F4" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="22" cy="23" r="3.5" fill="#F7F4EE" />
    </svg>
    <div>
      <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: `${size * 0.55}px`, fontWeight: 700, color: '#17324D', letterSpacing: '0.04em', lineHeight: 1 }}>
        SANGAM
      </div>
      {showTagline && (
        <div style={{ fontSize: '12px', color: '#197278', fontWeight: 600, marginTop: '3px', letterSpacing: '0.02em' }}>
          Elder Care & Community
        </div>
      )}
    </div>
  </div>
);
