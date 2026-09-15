import React, { useState } from 'react';
import { useSangamStore } from '../../core/storage/useSangamStore';
import { TouchCard } from '../../design-system/components/TouchCard';
import { 
  Pill, 
  Utensils, 
  Droplet, 
  Activity, 
  Calendar, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  ChevronRight,
  ShieldCheck,
  Clock
} from 'lucide-react';
import { SangamButton } from '../../design-system/components/SangamButton';

export const CaregiverTodayScreen: React.FC = () => {
  const { state, completeTask, setCaregiverTab, logAnalyticsEvent } = useSangamStore();
  const [markedTaskSuccess, setMarkedTaskSuccess] = useState(false);

  const completedCount = state.careTasks.filter((t) => t.status === 'COMPLETED').length;
  const totalCount = state.careTasks.length;

  // Find next pending or due task
  const nextTask = state.careTasks.find((t) => t.status === 'DUE_NOW' || t.status === 'PENDING');

  const handleMarkNextTask = () => {
    if (nextTask) {
      completeTask(nextTask.id);
      setMarkedTaskSuccess(true);
      logAnalyticsEvent('CAREGIVER_TASK_COMPLETED', `Completed next task: ${nextTask.title}`);
      setTimeout(() => setMarkedTaskSuccess(false), 3000);
    }
  };

  const careCategories = [
    { title: 'Medication', count: '3 / 3 taken', icon: Pill, color: '#197278', bg: '#EAF4F4' },
    { title: 'Meals', count: 'Lunch logged', icon: Utensils, color: '#17324D', bg: '#F4F1E9' },
    { title: 'Hydration', count: '1.4L of 2.0L', icon: Droplet, color: '#0969DA', bg: '#EDF5FD' },
    { title: 'Mobility', count: 'Evening walk pending', icon: Activity, color: '#854D0E', bg: '#FEF9C3' },
    { title: 'Appointments', count: 'Dr. Anjali (Fri)', icon: Calendar, color: '#17324D', bg: '#F4F1E9' },
    { title: 'Check-in', count: 'Feeling Good', icon: CheckCircle2, color: '#027A48', bg: '#ECFDF3' },
  ];

  return (
    <div className="scroll-container" style={{ padding: '20px' }}>
      {/* 1. Senior Profile Card */}
      <TouchCard variant="white" padding="18px" style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <img
              src={state.senior.avatarUrl}
              alt={state.senior.fullName}
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '3px solid #197278',
              }}
            />
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#17324D', margin: 0 }}>
                {state.senior.fullName}
              </h2>
              <div style={{ fontSize: '13px', color: '#4A5A66', marginTop: '2px' }}>
                Age {state.senior.age} • Room 102
              </div>
              <div style={{ fontSize: '12px', color: '#197278', fontWeight: 700, marginTop: '2px' }}>
                Assigned Caregiver: Nurse Sunita Devi
              </div>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#ECFDF3',
              color: '#027A48',
              padding: '6px 12px',
              borderRadius: '20px',
              fontWeight: 800,
              fontSize: '12px',
              border: '1px solid #A6F4C5',
            }}
          >
            <ShieldCheck size={16} />
            <span>SAFE</span>
          </div>
        </div>
      </TouchCard>

      {/* 2. Today's Care Summary */}
      <section style={{ marginBottom: '22px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#17324D', margin: 0 }}>
            Today's Care
          </h3>
          <span style={{ fontSize: '14px', fontWeight: 700, color: '#197278', backgroundColor: '#EAF4F4', padding: '4px 10px', borderRadius: '12px' }}>
            {completedCount} / {totalCount} tasks completed
          </span>
        </div>

        {/* Progress Bar */}
        <div style={{ width: '100%', height: '8px', backgroundColor: '#E2DDD5', borderRadius: '4px', overflow: 'hidden', marginBottom: '14px' }}>
          <div
            style={{
              width: `${(completedCount / totalCount) * 100}%`,
              height: '100%',
              backgroundColor: '#197278',
              borderRadius: '4px',
              transition: 'width 0.4s ease',
            }}
          />
        </div>

        {/* Category Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
          {careCategories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div
                key={idx}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  padding: '14px',
                  border: '1px solid #E2DDD5',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '12px',
                    backgroundColor: cat.bg,
                    color: cat.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Icon size={20} strokeWidth={2.2} />
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#17324D' }}>
                    {cat.title}
                  </div>
                  <div style={{ fontSize: '12px', color: '#4A5A66', marginTop: '2px' }}>
                    {cat.count}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Next Task — with One Obvious Primary Action */}
      <section style={{ marginBottom: '22px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#17324D', marginBottom: '12px' }}>
          Next Task
        </h3>

        {nextTask ? (
          <TouchCard
            variant="sand"
            padding="18px"
            style={{ borderLeft: '6px solid #197278' }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div>
                <span
                  style={{
                    backgroundColor: '#197278',
                    color: '#FFFFFF',
                    padding: '3px 8px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                  }}
                >
                  {nextTask.category}
                </span>
                <h4 style={{ fontSize: '18px', fontWeight: 800, color: '#17324D', marginTop: '8px', marginBottom: '4px' }}>
                  {nextTask.title}
                </h4>
                <div style={{ fontSize: '14px', color: '#4A5A66' }}>
                  {nextTask.description}
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  backgroundColor: '#FFFFFF',
                  padding: '6px 10px',
                  borderRadius: '10px',
                  fontSize: '13px',
                  fontWeight: 700,
                  color: '#17324D',
                }}
              >
                <Clock size={16} color="#197278" />
                <span>{nextTask.scheduledTime}</span>
              </div>
            </div>

            {markedTaskSuccess ? (
              <div
                style={{
                  backgroundColor: '#ECFDF3',
                  color: '#027A48',
                  padding: '12px',
                  borderRadius: '12px',
                  textAlign: 'center',
                  fontWeight: 700,
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}
              >
                <CheckCircle2 size={18} />
                Task completed successfully!
              </div>
            ) : (
              <SangamButton
                variant="primary"
                onClick={handleMarkNextTask}
                style={{ width: '100%', minHeight: '50px', fontSize: '16px', fontWeight: 800 }}
              >
                MARK COMPLETE
              </SangamButton>
            )}
          </TouchCard>
        ) : (
          <TouchCard variant="white" padding="16px" style={{ textAlign: 'center' }}>
            <CheckCircle2 size={32} color="#027A48" style={{ margin: '0 auto 8px' }} />
            <div style={{ fontSize: '16px', fontWeight: 800, color: '#17324D' }}>
              All today's tasks completed!
            </div>
            <div style={{ fontSize: '13px', color: '#4A5A66', marginTop: '4px' }}>
              Great work. Shift tasks are up to date for {state.senior.preferredName}.
            </div>
          </TouchCard>
        )}
      </section>

      {/* 4. Meaningful Alerts */}
      <section style={{ marginBottom: '22px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#17324D', marginBottom: '12px' }}>
          Alerts
        </h3>

        <div
          onClick={() => {
            setCaregiverTab('ALERTS');
            logAnalyticsEvent('CAREGIVER_ALERT_OPENED', 'Opened alert details');
          }}
          style={{
            backgroundColor: '#FFF8F0',
            border: '1px solid #FEDF89',
            borderRadius: '16px',
            padding: '14px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                backgroundColor: '#FEF0C7',
                color: '#B54708',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <AlertTriangle size={20} />
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 800, color: '#17324D' }}>
                Hydration Intake Notice
              </div>
              <div style={{ fontSize: '12px', color: '#4A5A66', marginTop: '2px' }}>
                1.4L consumed by 3:00 PM • Goal: 2.0L before 7:00 PM
              </div>
            </div>
          </div>
          <ChevronRight size={18} color="#B54708" />
        </div>
      </section>

      {/* 5. Handover Notes for THIS Senior */}
      <section style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#17324D', margin: 0 }}>
            Handover Notes
          </h3>
          <button
            type="button"
            onClick={() => {
              setCaregiverTab('STATS');
              logAnalyticsEvent('CAREGIVER_HANDOVER_OPENED', 'Reviewed handover summary');
            }}
            style={{
              background: 'none',
              border: 'none',
              color: '#197278',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <FileText size={16} />
            <span>Shift Log</span>
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E2DDD5',
              borderRadius: '12px',
              padding: '12px 14px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px',
            }}
          >
            <span style={{ color: '#197278', fontWeight: 800, fontSize: '16px', lineHeight: 1 }}>•</span>
            <div style={{ fontSize: '14px', color: '#17324D' }}>
              <strong>Evening medication:</strong> Telmisartan 40mg scheduled for 8:00 PM after dinner.
            </div>
          </div>

          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E2DDD5',
              borderRadius: '12px',
              padding: '12px 14px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px',
            }}
          >
            <span style={{ color: '#197278', fontWeight: 800, fontSize: '16px', lineHeight: 1 }}>•</span>
            <div style={{ fontSize: '14px', color: '#17324D' }}>
              <strong>Family notified:</strong> Rohan confirmed Friday cardiologist appointment transport.
            </div>
          </div>

          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E2DDD5',
              borderRadius: '12px',
              padding: '12px 14px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px',
            }}
          >
            <span style={{ color: '#B54708', fontWeight: 800, fontSize: '16px', lineHeight: 1 }}>•</span>
            <div style={{ fontSize: '14px', color: '#17324D' }}>
              <strong>Nutrition note:</strong> Mild appetite noted at lunch; enjoyed warm vegetable soup.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
