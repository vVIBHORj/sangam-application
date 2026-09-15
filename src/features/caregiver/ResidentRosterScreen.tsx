import React from 'react';
import { useSangamStore } from '../../core/storage/useSangamStore';
import { TouchCard } from '../../design-system/components/TouchCard';
import { PhoneCall } from 'lucide-react';

export const ResidentRosterScreen: React.FC = () => {
  const { state } = useSangamStore();

  const residents = [
    {
      id: 'res-01',
      name: 'Mrs. Kavita Sharma',
      room: 'Room 402',
      age: 72,
      avatar: state.senior.avatarUrl,
      precautions: ['Hypertension', 'Penicillin Allergy'],
      careFocus: 'Morning BP check • Amlodipine 5mg • Knee exercises',
      familyContact: 'Priya Sharma (Daughter)',
      familyPhone: '+91 98112 34567',
    },
    {
      id: 'res-02',
      name: 'Mr. R. K. Verma',
      room: 'Room 405',
      age: 78,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=180&auto=format&fit=crop&q=80',
      precautions: ['Fall Risk', 'Mild Dementia'],
      careFocus: 'Assisted garden walk • Hydration tracking',
      familyContact: 'Amit Verma (Son)',
      familyPhone: '+91 98200 11223',
    },
    {
      id: 'res-03',
      name: 'Mrs. Malti Rao',
      room: 'Room 408',
      age: 75,
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=180&auto=format&fit=crop&q=80',
      precautions: ['Diabetic Type-2', 'Postural Dizziness'],
      careFocus: 'Pre-lunch fasting glucose check • Low sodium diet',
      familyContact: 'Deepa Rao (Daughter)',
      familyPhone: '+91 98300 44556',
    },
  ];

  return (
    <div className="scroll-container" style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#17324D' }}>
          Assigned Residents ({residents.length})
        </h2>
        <div style={{ fontSize: '14px', color: '#4A5A66' }}>
          Facility care plans, precautions, and family contact access
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {residents.map((res) => (
          <TouchCard key={res.id} variant="white" padding="18px">
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div style={{ display: 'flex', gap: '12px' }}>
                <img
                  src={res.avatar}
                  alt={res.name}
                  style={{ width: '54px', height: '54px', borderRadius: '16px', objectFit: 'cover', border: '2px solid #197278' }}
                />
                <div>
                  <div style={{ fontSize: '18px', fontWeight: 800, color: '#17324D' }}>
                    {res.name}
                  </div>
                  <div style={{ fontSize: '13px', color: '#197278', fontWeight: 700 }}>
                    {res.room} • Age {res.age}
                  </div>
                </div>
              </div>

              <a
                href={`tel:${res.familyPhone}`}
                aria-label={`Call family for ${res.name}`}
                style={{
                  backgroundColor: '#F4F1E9',
                  color: '#17324D',
                  border: '1.5px solid #E2DDD5',
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
                <PhoneCall size={14} /> Family
              </a>
            </div>

            {/* Precautions Badges */}
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '10px' }}>
              {res.precautions.map((prec, i) => (
                <span
                  key={i}
                  style={{
                    backgroundColor: prec.includes('Fall') || prec.includes('Allergy') ? '#FEF3F2' : '#EAF4F4',
                    color: prec.includes('Fall') || prec.includes('Allergy') ? '#B42318' : '#197278',
                    border: '1px solid currentColor',
                    borderRadius: '8px',
                    padding: '2px 8px',
                    fontSize: '12px',
                    fontWeight: 700,
                  }}
                >
                  ⚠ {prec}
                </span>
              ))}
            </div>

            {/* Today's Care Focus */}
            <div
              style={{
                backgroundColor: '#F7F4EE',
                borderRadius: '12px',
                padding: '10px 12px',
                fontSize: '13px',
                color: '#172026',
                lineHeight: 1.4,
              }}
            >
              <strong style={{ color: '#17324D' }}>Care Plan: </strong>
              {res.careFocus}
            </div>
          </TouchCard>
        ))}
      </div>
    </div>
  );
};
