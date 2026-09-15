import React from 'react';
import { useSangamStore } from '../../core/storage/useSangamStore';
import { TouchCard } from '../../design-system/components/TouchCard';
import { CheckCircle2, AlertCircle, Heart, Shield } from 'lucide-react';

export const FamilyActivityFeed: React.FC = () => {
  const { state } = useSangamStore();

  return (
    <div className="scroll-container" style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#17324D' }}>
          Activity & Safety Audit
        </h2>
        <div style={{ fontSize: '14px', color: '#4A5A66' }}>
          Real-time chronological timeline of all care actions
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {state.auditEvents.map((event) => {
          let icon = <CheckCircle2 size={20} color="#197278" />;
          let bg = '#FFFFFF';

          if (event.action === 'SOS_TRIGGERED') {
            icon = <AlertCircle size={20} color="#B42318" />;
            bg = '#FEF3F2';
          } else if (event.action === 'CHECK_IN_COMPLETED') {
            icon = <Heart size={20} color="#197278" />;
          } else if (event.action === 'PERMISSION_REVOKED') {
            icon = <Shield size={20} color="#17324D" />;
          }

          const time = new Date(event.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

          return (
            <TouchCard key={event.id} variant="white" padding="14px 16px" style={{ backgroundColor: bg }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{ marginTop: '2px', flexShrink: 0 }}>
                  {icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '15px', fontWeight: 700, color: '#17324D' }}>
                      {event.details}
                    </span>
                    <span style={{ fontSize: '12px', color: '#4A5A66', fontWeight: 600 }}>
                      {time}
                    </span>
                  </div>
                  <div style={{ fontSize: '13px', color: '#197278', fontWeight: 600, marginTop: '2px' }}>
                    By {event.actorName} ({event.actorRole.replace('_', ' ')})
                  </div>
                </div>
              </div>
            </TouchCard>
          );
        })}
      </div>
    </div>
  );
};
