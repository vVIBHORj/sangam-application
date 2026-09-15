import React, { useState } from 'react';
import { useSangamStore } from '../../core/storage/useSangamStore';
import { TouchCard } from '../../design-system/components/TouchCard';
import { AlertTriangle, Clock } from 'lucide-react';

export const CaregiverAlertsScreen: React.FC = () => {
  const { state } = useSangamStore();
  const [activeTab, setActiveTab] = useState<'ACTIVE' | 'RESOLVED' | 'HISTORY'>('ACTIVE');

  const activeAlerts = [
    {
      id: 'al-01',
      title: 'Hydration Intake Advisory',
      description: '1.4L consumed by 3:00 PM. Target is 2.0L before evening rest.',
      time: '3:15 PM',
      severity: 'MEDIUM',
      actionNeeded: 'Offer fresh fruit juice or coconut water during evening tea.',
    },
  ];

  return (
    <div className="scroll-container" style={{ padding: '20px' }}>
      {/* Header */}
      <div style={{ marginBottom: '18px' }}>
        <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#17324D', margin: 0 }}>
          Alerts & Notifications
        </h2>
        <div style={{ fontSize: '13px', color: '#4A5A66', marginTop: '2px' }}>
          Monitoring alerts for {state.senior.fullName}
        </div>
      </div>

      {/* Tabs */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          backgroundColor: '#E2DDD5',
          borderRadius: '16px',
          padding: '4px',
          gap: '4px',
          marginBottom: '20px',
        }}
      >
        <button
          type="button"
          onClick={() => setActiveTab('ACTIVE')}
          style={{
            padding: '10px 0',
            borderRadius: '12px',
            border: 'none',
            backgroundColor: activeTab === 'ACTIVE' ? '#FFFFFF' : 'transparent',
            color: activeTab === 'ACTIVE' ? '#17324D' : '#4A5A66',
            fontWeight: 800,
            fontSize: '13px',
            cursor: 'pointer',
            boxShadow: activeTab === 'ACTIVE' ? '0 2px 4px rgba(0,0,0,0.06)' : 'none',
          }}
        >
          Active ({activeAlerts.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('RESOLVED')}
          style={{
            padding: '10px 0',
            borderRadius: '12px',
            border: 'none',
            backgroundColor: activeTab === 'RESOLVED' ? '#FFFFFF' : 'transparent',
            color: activeTab === 'RESOLVED' ? '#17324D' : '#4A5A66',
            fontWeight: 800,
            fontSize: '13px',
            cursor: 'pointer',
            boxShadow: activeTab === 'RESOLVED' ? '0 2px 4px rgba(0,0,0,0.06)' : 'none',
          }}
        >
          Resolved (2)
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('HISTORY')}
          style={{
            padding: '10px 0',
            borderRadius: '12px',
            border: 'none',
            backgroundColor: activeTab === 'HISTORY' ? '#FFFFFF' : 'transparent',
            color: activeTab === 'HISTORY' ? '#17324D' : '#4A5A66',
            fontWeight: 800,
            fontSize: '13px',
            cursor: 'pointer',
            boxShadow: activeTab === 'HISTORY' ? '0 2px 4px rgba(0,0,0,0.06)' : 'none',
          }}
        >
          History ({state.alertHistory.length})
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'ACTIVE' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {activeAlerts.map((alert) => (
            <TouchCard
              key={alert.id}
              variant="white"
              padding="18px"
              style={{ borderLeft: '6px solid #F79009' }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#FEF0C7', color: '#B54708', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <AlertTriangle size={18} />
                  </div>
                  <span style={{ fontSize: '15px', fontWeight: 800, color: '#17324D' }}>
                    {alert.title}
                  </span>
                </div>
                <span style={{ fontSize: '12px', color: '#4A5A66', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={14} />
                  {alert.time}
                </span>
              </div>

              <div style={{ fontSize: '13px', color: '#4A5A66', marginBottom: '10px' }}>
                {alert.description}
              </div>

              <div style={{ backgroundColor: '#F7F4EE', padding: '10px 12px', borderRadius: '8px', fontSize: '12px', color: '#17324D' }}>
                <strong>Caregiver Action:</strong> {alert.actionNeeded}
              </div>
            </TouchCard>
          ))}
        </div>
      )}

      {activeTab === 'RESOLVED' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <TouchCard variant="white" padding="16px" style={{ borderLeft: '6px solid #027A48' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ fontSize: '14px', fontWeight: 800, color: '#17324D' }}>
                Morning Walk Check-in
              </span>
              <span style={{ fontSize: '12px', color: '#027A48', fontWeight: 700 }}>Resolved</span>
            </div>
            <div style={{ fontSize: '13px', color: '#4A5A66' }}>
              Resolved at 9:10 AM • Checked in with Meena and completed morning garden walk.
            </div>
          </TouchCard>

          <TouchCard variant="white" padding="16px" style={{ borderLeft: '6px solid #027A48' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ fontSize: '14px', fontWeight: 800, color: '#17324D' }}>
                SOS System Monthly Test
              </span>
              <span style={{ fontSize: '12px', color: '#027A48', fontWeight: 700 }}>Resolved</span>
            </div>
            <div style={{ fontSize: '13px', color: '#4A5A66' }}>
              Cleared by Rohan Sharma (Family Admin) • 2-way audio and GPS verified.
            </div>
          </TouchCard>
        </div>
      )}

      {activeTab === 'HISTORY' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {state.alertHistory.map((item) => (
            <TouchCard key={item.id} variant="white" padding="16px">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontSize: '14px', fontWeight: 800, color: '#17324D' }}>
                  {item.title}
                </span>
                <span style={{ fontSize: '11px', color: '#4A5A66' }}>
                  {item.date} • {item.time}
                </span>
              </div>
              <div style={{ fontSize: '12px', color: '#4A5A66' }}>
                Severity: <strong>{item.severity}</strong> • Status: <strong style={{ color: '#027A48' }}>{item.status}</strong>
              </div>
              <div style={{ fontSize: '12px', color: '#17324D', marginTop: '4px' }}>
                Resolution: {item.resolution}
              </div>
            </TouchCard>
          ))}
        </div>
      )}
    </div>
  );
};
