import React from 'react';
import { useSangamStore } from '../../core/storage/useSangamStore';
import { FamilyDashboard } from './FamilyDashboard';
import { FamilyHealthVault } from './FamilyHealthVault';
import { FamilyActivityFeed } from './FamilyActivityFeed';
import { FamilyCoordination } from './FamilyCoordination';
import { Home, Pill, Clock, Users } from 'lucide-react';
import { SangamLogo } from '../../assets/doodles/SangamDoodles';

export const FamilyShell: React.FC = () => {
  const { state, setFamilyTab } = useSangamStore();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: 'var(--color-background-cream)' }}>
      {/* Top App Bar */}
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
              backgroundColor: '#EAF4F4',
              color: '#197278',
              borderRadius: '20px',
              padding: '4px 10px',
              fontSize: '12px',
              fontWeight: 700,
            }}
          >
            Family Portal
          </span>
        </div>
      </header>

      {/* Main View Render */}
      <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
        {state.activeFamilyTab === 'DASHBOARD' && <FamilyDashboard />}
        {state.activeFamilyTab === 'HEALTH' && <FamilyHealthVault />}
        {state.activeFamilyTab === 'ACTIVITY' && <FamilyActivityFeed />}
        {state.activeFamilyTab === 'COORDINATION' && <FamilyCoordination />}
      </div>

      {/* Bottom Navigation Tabs */}
      <nav
        style={{
          height: '62px',
          backgroundColor: '#FFFFFF',
          borderTop: '2px solid #E2DDD5',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          alignItems: 'center',
          flexShrink: 0,
        }}
      >
        <button
          type="button"
          onClick={() => setFamilyTab('DASHBOARD')}
          style={{
            background: 'none',
            border: 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '3px',
            color: state.activeFamilyTab === 'DASHBOARD' ? '#197278' : '#4A5A66',
            cursor: 'pointer',
          }}
        >
          <Home size={20} strokeWidth={state.activeFamilyTab === 'DASHBOARD' ? 2.5 : 1.8} />
          <span style={{ fontSize: '11px', fontWeight: state.activeFamilyTab === 'DASHBOARD' ? 800 : 500 }}>
            Home
          </span>
        </button>

        <button
          type="button"
          onClick={() => setFamilyTab('HEALTH')}
          style={{
            background: 'none',
            border: 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '3px',
            color: state.activeFamilyTab === 'HEALTH' ? '#197278' : '#4A5A66',
            cursor: 'pointer',
          }}
        >
          <Pill size={20} strokeWidth={state.activeFamilyTab === 'HEALTH' ? 2.5 : 1.8} />
          <span style={{ fontSize: '11px', fontWeight: state.activeFamilyTab === 'HEALTH' ? 800 : 500 }}>
            Health
          </span>
        </button>

        <button
          type="button"
          onClick={() => setFamilyTab('ACTIVITY')}
          style={{
            background: 'none',
            border: 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '3px',
            color: state.activeFamilyTab === 'ACTIVITY' ? '#197278' : '#4A5A66',
            cursor: 'pointer',
          }}
        >
          <Clock size={20} strokeWidth={state.activeFamilyTab === 'ACTIVITY' ? 2.5 : 1.8} />
          <span style={{ fontSize: '11px', fontWeight: state.activeFamilyTab === 'ACTIVITY' ? 800 : 500 }}>
            Activity
          </span>
        </button>

        <button
          type="button"
          onClick={() => setFamilyTab('COORDINATION')}
          style={{
            background: 'none',
            border: 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '3px',
            color: state.activeFamilyTab === 'COORDINATION' ? '#197278' : '#4A5A66',
            cursor: 'pointer',
          }}
        >
          <Users size={20} strokeWidth={state.activeFamilyTab === 'COORDINATION' ? 2.5 : 1.8} />
          <span style={{ fontSize: '11px', fontWeight: state.activeFamilyTab === 'COORDINATION' ? 800 : 500 }}>
            Siblings
          </span>
        </button>
      </nav>
    </div>
  );
};
