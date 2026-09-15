import React from 'react';
import { useSangamStore } from '../../core/storage/useSangamStore';
import { CaregiverTodayScreen } from './CaregiverTodayScreen';
import { CaregiverStatsScreen } from './CaregiverStatsScreen';
import { CaregiverTasksScreen } from './CaregiverTasksScreen';
import { CaregiverAlertsScreen } from './CaregiverAlertsScreen';
import { CaregiverProfileScreen } from './CaregiverProfileScreen';
import { 
  CalendarDays, 
  BarChart3, 
  CheckSquare, 
  Bell, 
  User 
} from 'lucide-react';
import { SangamLogo } from '../../assets/doodles/SangamDoodles';

export const CaregiverShell: React.FC = () => {
  const { state, setCaregiverTab } = useSangamStore();

  const tabs = [
    { id: 'TODAY' as const, label: 'Today', icon: CalendarDays },
    { id: 'STATS' as const, label: 'Stats', icon: BarChart3 },
    { id: 'TASKS' as const, label: 'Tasks', icon: CheckSquare },
    { id: 'ALERTS' as const, label: 'Alerts', icon: Bell },
    { id: 'PROFILE' as const, label: 'Profile', icon: User },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: 'var(--color-background-cream)' }}>
      {/* Top Header with Sangam Logo and Senior Identification */}
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
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
            Caregiver Portal
          </span>
        </div>
      </header>

      {/* Main View Render */}
      <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
        {state.activeCaregiverTab === 'TODAY' && <CaregiverTodayScreen />}
        {state.activeCaregiverTab === 'STATS' && <CaregiverStatsScreen />}
        {state.activeCaregiverTab === 'TASKS' && <CaregiverTasksScreen />}
        {state.activeCaregiverTab === 'ALERTS' && <CaregiverAlertsScreen />}
        {state.activeCaregiverTab === 'PROFILE' && <CaregiverProfileScreen />}
      </div>

      {/* Modern Operational Bottom Navigation Tabs (5 Tabs) */}
      <nav
        style={{
          height: '64px',
          backgroundColor: '#FFFFFF',
          borderTop: '2px solid #E2DDD5',
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          alignItems: 'center',
          flexShrink: 0,
        }}
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = state.activeCaregiverTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setCaregiverTab(tab.id)}
              style={{
                background: 'none',
                border: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '3px',
                color: isActive ? '#197278' : '#4A5A66',
                cursor: 'pointer',
                padding: '6px 0',
                transition: 'color 0.15s ease',
              }}
            >
              <Icon size={20} strokeWidth={isActive ? 2.5 : 1.8} />
              <span style={{ fontSize: '11px', fontWeight: isActive ? 800 : 600 }}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
