import React from 'react';
import { Medication, MedicationEvent } from '../../core/domain/types';
import { TouchCard } from './TouchCard';
import { SangamButton } from './SangamButton';
import { Check, Clock, Bell } from 'lucide-react';

interface MedicationNudgeCardProps {
  medication: Medication;
  event?: MedicationEvent;
  onMarkTaken: (medId: string) => void;
  onSnooze: (medId: string) => void;
  isSeniorView?: boolean;
}

export const MedicationNudgeCard: React.FC<MedicationNudgeCardProps> = ({
  medication,
  event,
  onMarkTaken,
  onSnooze,
  isSeniorView = true,
}) => {
  const isTaken = event?.status === 'TAKEN';
  const isSnoozed = event?.status === 'SNOOZED';

  if (isTaken) {
    return (
      <TouchCard variant="sage" padding="20px">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: '#197278',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Check size={28} strokeWidth={3} />
            </div>
            <div>
              <div style={{ fontSize: '20px', fontWeight: 700, color: '#17324D' }}>
                {medication.name}
              </div>
              <div style={{ fontSize: '15px', color: '#197278', fontWeight: 600, marginTop: '2px' }}>
                Taken at {event?.timestamp ? new Date(event.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Today'}
              </div>
            </div>
          </div>
          <span
            style={{
              backgroundColor: '#FFFFFF',
              color: '#197278',
              padding: '6px 12px',
              borderRadius: '20px',
              fontSize: '14px',
              fontWeight: 700,
              border: '1.5px solid #197278',
            }}
          >
            Done ✓
          </span>
        </div>
      </TouchCard>
    );
  }

  return (
    <TouchCard variant="white" padding="22px">
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#197278', fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            <Clock size={16} />
            <span>Scheduled for {medication.scheduledTime} AM</span>
          </div>
          <h3 style={{ fontSize: '24px', fontWeight: 700, color: '#17324D', marginTop: '4px' }}>
            {medication.name}
          </h3>
          <p style={{ fontSize: '16px', color: '#4A5A66', marginTop: '2px' }}>
            {medication.dosage} • {medication.instructions}
          </p>
        </div>
        {isSnoozed && (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              backgroundColor: '#FEF0C7',
              color: '#B54708',
              padding: '4px 10px',
              borderRadius: '12px',
              fontSize: '13px',
              fontWeight: 700,
            }}
          >
            <Bell size={14} /> Snoozed
          </span>
        )}
      </div>

      {isSeniorView ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '12px', alignItems: 'center' }}>
          <SangamButton
            variant="secondary"
            size="senior-primary"
            icon={<Check size={22} strokeWidth={2.8} />}
            onClick={() => onMarkTaken(medication.id)}
            ariaLabel={`Mark ${medication.name} as taken`}
          >
            TAKE MEDICINE
          </SangamButton>

          <SangamButton
            variant="sand"
            size="senior-primary"
            onClick={() => onSnooze(medication.id)}
            ariaLabel={`Remind me in 15 minutes for ${medication.name}`}
            style={{ padding: '14px 18px', fontSize: '16px' }}
          >
            Snooze 15m
          </SangamButton>
        </div>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <SangamButton variant="secondary" size="normal" onClick={() => onMarkTaken(medication.id)}>
            Mark Taken
          </SangamButton>
        </div>
      )}
    </TouchCard>
  );
};
