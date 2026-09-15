import React from 'react';
import { useSangamStore } from './core/storage/useSangamStore';
import { MobileFrame } from './design-system/layouts/MobileFrame';
import { RoleSelectionScreen } from './features/role-gate/RoleSelectionScreen';
import { CaregiverSetupScreen } from './features/onboarding/CaregiverSetupScreen';
import { PairingCodeScreen } from './features/onboarding/PairingCodeScreen';
import { SeniorWelcomeFlow } from './features/onboarding/SeniorWelcomeFlow';
import { SeniorHomeScreen } from './features/senior/SeniorHomeScreen';
import { SeniorHealthHub } from './features/senior/SeniorHealthHub';
import { SeniorFamilyHub } from './features/senior/SeniorFamilyHub';
import { SeniorCommunityScreen } from './features/senior/SeniorCommunityScreen';
import { SeniorPermissionsScreen } from './features/senior/SeniorPermissionsScreen';
import { FamilyShell } from './features/family/FamilyShell';
import { CaregiverShell } from './features/caregiver/CaregiverShell';

export const App: React.FC = () => {
  const { state } = useSangamStore();

  const renderCurrentView = () => {
    // 1. Shared Gateway
    if (state.currentView === 'GATEWAY') {
      return <RoleSelectionScreen />;
    }

    // 2. Onboarding Flow
    if (state.currentView === 'ONBOARDING') {
      if (state.onboardingStep === 'CAREGIVER_FORM') {
        return <CaregiverSetupScreen />;
      }
      if (state.onboardingStep === 'PAIRING_DISPLAY') {
        return <PairingCodeScreen />;
      }
      return <SeniorWelcomeFlow />;
    }

    // 3. Role 2: Older Adult (Flat Navigation Architecture)
    if (state.activeRole === 'OLDER_ADULT') {
      if (state.activeSeniorTab === 'HEALTH') {
        return <SeniorHealthHub />;
      }
      if (state.activeSeniorTab === 'FAMILY') {
        return <SeniorFamilyHub />;
      }
      if (state.activeSeniorTab === 'COMMUNITY') {
        return <SeniorCommunityScreen />;
      }
      if (state.activeSeniorTab === 'PERMISSIONS') {
        return <SeniorPermissionsScreen />;
      }
      return <SeniorHomeScreen />;
    }

    // 4. Role 1: Family Member (Reassurance & Coordination)
    if (state.activeRole === 'FAMILY_MEMBER') {
      return <FamilyShell />;
    }

    // 5. Role 3: Professional Caregiver (Operational Shift Management)
    if (state.activeRole === 'CAREGIVER') {
      return <CaregiverShell />;
    }

    return <RoleSelectionScreen />;
  };

  return <MobileFrame>{renderCurrentView()}</MobileFrame>;
};

export default App;
