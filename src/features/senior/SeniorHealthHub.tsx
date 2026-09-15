import React, { useState } from 'react';
import { useSangamStore } from '../../core/storage/useSangamStore';
import { SeniorFlatLayout } from '../../design-system/layouts/SeniorFlatLayout';
import { MedicationNudgeCard } from '../../design-system/components/MedicationNudgeCard';
import { TouchCard } from '../../design-system/components/TouchCard';
import { SeniorSOSModal } from './SeniorSOSModal';
import { PhoneCall, Calendar, MapPin, Pill, Building2, Check } from 'lucide-react';

export const SeniorHealthHub: React.FC = () => {
  const { 
    state, 
    setSeniorTab, 
    markMedicationTaken, 
    snoozeMedication 
  } = useSangamStore();
  const [isSOSOpen, setIsSOSOpen] = useState(false);

  return (
    <SeniorFlatLayout
      title="My Health"
      showBack={true}
      onBack={() => setSeniorTab('HOME')}
      onTriggerSOS={() => setIsSOSOpen(true)}
    >
      {/* 1. Today's Medicines Schedule */}
      <section style={{ marginBottom: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <Pill size={22} color="#197278" strokeWidth={2.5} />
          <h2 style={{ fontSize: `calc(22px * ${state.fontScale})`, fontWeight: 700, color: '#17324D' }}>
            Today's Medicines
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {state.medications.map((med) => {
            const ev = state.medicationEvents.find((e) => e.medicationId === med.id);
            return (
              <MedicationNudgeCard
                key={med.id}
                medication={med}
                event={ev}
                onMarkTaken={markMedicationTaken}
                onSnooze={snoozeMedication}
                isSeniorView={true}
              />
            );
          })}
        </div>
      </section>

      {/* 2. Next Doctor Appointment */}
      <section style={{ marginBottom: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <Calendar size={22} color="#17324D" strokeWidth={2.5} />
          <h2 style={{ fontSize: `calc(22px * ${state.fontScale})`, fontWeight: 700, color: '#17324D' }}>
            Next Doctor Visit
          </h2>
        </div>

        {state.appointments.map((appt) => (
          <TouchCard key={appt.id} variant="sand" padding="20px">
            <div style={{ fontSize: '15px', fontWeight: 700, color: '#197278', textTransform: 'uppercase' }}>
              Thursday, 17 September • 11:00 AM
            </div>
            <div style={{ fontSize: '22px', fontWeight: 700, color: '#17324D', marginTop: '4px' }}>
              {appt.doctorName}
            </div>
            <div style={{ fontSize: '16px', color: '#4A5A66', marginTop: '2px' }}>
              {appt.specialty} • {appt.hospitalName}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#17324D', fontSize: '15px', fontWeight: 600, marginTop: '8px' }}>
              <Check size={18} color="#197278" />
              <span>Son {appt.accompaniedBy} is taking you</span>
            </div>
          </TouchCard>
        ))}
      </section>

      {/* 3. Call Doctor Directory */}
      <section style={{ marginBottom: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <PhoneCall size={22} color="#197278" strokeWidth={2.5} />
          <h2 style={{ fontSize: `calc(22px * ${state.fontScale})`, fontWeight: 700, color: '#17324D' }}>
            Call My Doctor
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {state.doctors.map((doc) => (
            <TouchCard key={doc.id} variant="white" padding="16px 20px">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '19px', fontWeight: 700, color: '#17324D' }}>
                    {doc.fullName}
                  </div>
                  <div style={{ fontSize: '15px', color: '#4A5A66' }}>
                    {doc.specialty}
                  </div>
                </div>

                <a
                  href={`tel:${doc.phone}`}
                  aria-label={`Call ${doc.fullName}`}
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

      {/* 4. Nearest Hospital & Pharmacy */}
      <section style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <Building2 size={22} color="#17324D" strokeWidth={2.5} />
          <h2 style={{ fontSize: `calc(22px * ${state.fontScale})`, fontWeight: 700, color: '#17324D' }}>
            Nearby Hospital & Medical
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {state.hospitalsPharmacies.map((hp) => (
            <TouchCard key={hp.id} variant="white" padding="16px 20px">
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div style={{ flex: 1, paddingRight: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span
                      style={{
                        backgroundColor: hp.type === 'HOSPITAL' ? '#FEF3F2' : '#EAF4F4',
                        color: hp.type === 'HOSPITAL' ? '#B42318' : '#197278',
                        padding: '3px 8px',
                        borderRadius: '8px',
                        fontSize: '12px',
                        fontWeight: 700,
                      }}
                    >
                      {hp.type}
                    </span>
                    <span style={{ fontSize: '13px', color: '#197278', fontWeight: 600 }}>
                      <MapPin size={13} style={{ display: 'inline', verticalAlign: 'text-bottom' }} /> {hp.distanceKm} km away
                    </span>
                  </div>

                  <div style={{ fontSize: '18px', fontWeight: 700, color: '#17324D', marginTop: '4px' }}>
                    {hp.name}
                  </div>
                  <div style={{ fontSize: '14px', color: '#4A5A66', marginTop: '2px' }}>
                    {hp.openHours}
                  </div>
                </div>

                <a
                  href={`tel:${hp.phone}`}
                  aria-label={`Call ${hp.name}`}
                  className="touch-target-senior"
                  style={{
                    backgroundColor: '#17324D',
                    color: '#FFFFFF',
                    borderRadius: '14px',
                    padding: '10px 16px',
                    fontSize: '15px',
                    fontWeight: 700,
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    flexShrink: 0,
                  }}
                >
                  <PhoneCall size={16} /> Call
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
