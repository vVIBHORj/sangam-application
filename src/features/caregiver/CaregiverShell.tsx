import React from 'react';
import { useSangamStore } from '../../core/storage/useSangamStore';
import { CaregiverShiftDashboard } from './CaregiverShiftDashboard';
import { ResidentRosterScreen } from './ResidentRosterScreen';
import { ShiftHandoverScreen } from './ShiftHandoverScreen';
import { ClipboardList, Users, FileCheck } from 'lucide-react';
import { SangamLogo } from '../../assets/doodles/SangamDoodles';

export const CaregiverShell: React.FC = () => {
  const { state, setCaregiverTab } = useSangamStore();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: 'var(--color-background-cream)' }}>
      {/* Top Header */}
      <header
        style={{
          padding: '12px 20px',
          backgroundColor: '#FFFFFF',
          borderBottom: '2px solid #E2DDD5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0,
        }}
      >
        <SangamLogo size={32} showTagline={false} />
        <span
          style={{
            backgroundColor: '#FEF3F2',
            color: '#B42318',
            borderRadius: '20px',
            padding: '4px 10px',
            fontSize: '12px',
            fontWeight: 800,
          }}
        >
          Caregiver Shift Portal
        </span>
      </header>

      {/* Main View Render */}
      <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
        {state.activeCaregiverTab === 'SHIFT' && <CaregiverShiftDashboard />}
        {state.activeCaregiverTab === 'RESIDENTS' && <ResidentRosterScreen />}
        {state.activeCaregiverTab === 'HANDOVER' && <ShiftHandoverScreen />}
      </div>

      {/* Operational Bottom Navigation Tabs */}
      <nav
        style={{
          height: '62px',
          backgroundColor: '#FFFFFF',
          borderTop: '2px solid #E2DDD5',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          alignItems: 'center',
          flexShrink: 0,
        }}
      >
        <button
          type="button"
          onClick={() => setCaregiverTab('SHIFT')}
          style={{
            background: 'none',
            border: 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '3px',
            color: state.activeCaregiverTab === 'SHIFT' ? '#197278' : '#4A5A66',
            cursor: 'pointer',
          }}
        >
          <ClipboardList size={20} strokeWidth={state.activeCaregiverTab === 'SHIFT' ? 2.5 : 1.8} />
          <span style={{ fontSize: '11px', fontWeight: state.activeCaregiverTab === 'SHIFT' ? 800 : 500 }}>
            Today's Shift
          </span>
        </button>

        <button
          type="button"
          onClick={() => setCaregiverTab('RESIDENTS')}
          style={{
            background: 'none',
            border: 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '3px',
            color: state.activeCaregiverTab === 'RESIDENTS' ? '#197278' : '#4A5A66',
            cursor: 'pointer',
          }}
        >
          <Users size={20} strokeWidth={state.activeCaregiverTab === 'RESIDENTS' ? 2.5 : 1.8} />
          <span style={{ fontSize: '11px', fontWeight: state.activeCaregiverTab === 'RESIDENTS' ? 800 : 500 }}>
            Residents
          </span>
        </button>

        <button
          type="button"
          onClick={() => setCaregiverTab('HANDOVER')}
          style={{
            background: 'none',
            border: 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '3px',
            color: state.activeCaregiverTab === 'HANDOVER' ? '#197278' : '#4A5A66',
            cursor: 'pointer',
          }}
        >
          <FileCheck size={20} strokeWidth={state.activeCaregiverTab === 'HANDOVER' ? 2.5 : 1.8} />
          <span style={{ fontSize: '11px', fontWeight: state.activeCaregiverTab === 'HANDOVER' ? 800 : 500 }}>
            Handover
          </span>
        </button>
      </nav>
    </div>
  );
};
