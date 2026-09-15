import React, { useState } from 'react';
import { useSangamStore } from '../../core/storage/useSangamStore';
import { TouchCard } from '../../design-system/components/TouchCard';
import { ClipboardList, Check } from 'lucide-react';
import { SangamButton } from '../../design-system/components/SangamButton';
import { CareTask } from '../../core/domain/types';

export const CaregiverShiftDashboard: React.FC = () => {
  const { state, completeTask, setCaregiverTab } = useSangamStore();
  const [selectedTask, setSelectedTask] = useState<CareTask | null>(null);
  const [bpValue, setBpValue] = useState('128/82');
  const [sugarValue, setSugarValue] = useState('114');
  const [concernText, setConcernText] = useState('');

  const completedCount = state.careTasks.filter((t) => t.status === 'COMPLETED').length;
  const dueNowCount = state.careTasks.filter((t) => t.status === 'DUE_NOW' || t.status === 'PENDING').length;

  const handleFinishTask = () => {
    if (!selectedTask) return;
    completeTask(
      selectedTask.id,
      {
        bloodPressure: bpValue || undefined,
        bloodSugar: sugarValue ? Number(sugarValue) : undefined,
      },
      concernText.trim() || undefined
    );
    setSelectedTask(null);
    setConcernText('');
  };

  return (
    <div className="scroll-container" style={{ padding: '20px' }}>
      {/* 1. Shift Banner */}
      <div
        style={{
          backgroundColor: '#17324D',
          color: '#FFFFFF',
          borderRadius: '20px',
          padding: '18px 20px',
          marginBottom: '20px',
          boxShadow: 'var(--shadow-card)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '13px', color: '#EAF4F4', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Facility: Shanti Vihar Residence
            </div>
            <h2 style={{ fontSize: '22px', fontWeight: 800, marginTop: '2px' }}>
              Day Shift: 08:00 – 16:00
            </h2>
            <div style={{ fontSize: '14px', color: '#C4DEDB', marginTop: '4px' }}>
              Logged in: Nurse Sunita Devi (Shift Lead)
            </div>
          </div>
          <div
            style={{
              backgroundColor: '#197278',
              color: '#FFFFFF',
              padding: '6px 12px',
              borderRadius: '12px',
              fontSize: '13px',
              fontWeight: 700,
            }}
          >
            ACTIVE
          </div>
        </div>
      </div>

      {/* 2. Operations KPI Bar */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '20px' }}>
        <TouchCard variant="white" padding="14px">
          <div style={{ fontSize: '12px', color: '#4A5A66', fontWeight: 700 }}>COMPLETED</div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#197278', marginTop: '2px' }}>
            {completedCount}
          </div>
          <div style={{ fontSize: '11px', color: '#4A5A66' }}>of {state.careTasks.length} tasks</div>
        </TouchCard>

        <TouchCard variant="sand" padding="14px">
          <div style={{ fontSize: '12px', color: '#4A5A66', fontWeight: 700 }}>DUE NOW</div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#17324D', marginTop: '2px' }}>
            {dueNowCount}
          </div>
          <div style={{ fontSize: '11px', color: '#4A5A66' }}>Action needed</div>
        </TouchCard>

        <TouchCard variant="urgent" padding="14px">
          <div style={{ fontSize: '12px', color: '#B42318', fontWeight: 700 }}>CONCERNS</div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#B42318', marginTop: '2px' }}>
            1
          </div>
          <div style={{ fontSize: '11px', color: '#B42318' }}>Appetite note</div>
        </TouchCard>
      </div>

      {/* 3. Handover Alert Banner */}
      <div
        onClick={() => setCaregiverTab('HANDOVER')}
        style={{
          backgroundColor: '#EAF4F4',
          border: '2px solid #C4DEDB',
          borderRadius: '16px',
          padding: '14px 16px',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <ClipboardList size={22} color="#197278" />
          <div>
            <div style={{ fontSize: '15px', fontWeight: 800, color: '#17324D' }}>
              Shift Handover Protocol
            </div>
            <div style={{ fontSize: '13px', color: '#4A5A66' }}>
              Review 8 completed, 2 pending & sign shift report
            </div>
          </div>
        </div>
        <span style={{ fontSize: '13px', fontWeight: 700, color: '#197278' }}>
          Review →
        </span>
      </div>

      {/* 4. Shift Task Execution List */}
      <section style={{ marginBottom: '20px' }}>
        <div style={{ fontSize: '17px', fontWeight: 800, color: '#17324D', marginBottom: '12px' }}>
          Today's Task Queue
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {state.careTasks.map((task) => {
            const isDone = task.status === 'COMPLETED' || task.status === 'FLAGGED';
            const isDueNow = task.status === 'DUE_NOW';

            return (
              <TouchCard
                key={task.id}
                variant={task.status === 'FLAGGED' ? 'urgent' : isDone ? 'sage' : 'white'}
                padding="16px"
                style={{ borderLeft: isDueNow ? '6px solid #197278' : undefined }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 700, color: '#197278', textTransform: 'uppercase' }}>
                        {task.scheduledTime}
                      </span>
                      <span style={{ fontSize: '12px', color: '#4A5A66' }}>• {task.roomNumber}</span>
                      <span style={{ fontSize: '13px', fontWeight: 800, color: '#17324D' }}>
                        ({task.residentName})
                      </span>
                    </div>

                    <div style={{ fontSize: '16px', fontWeight: 700, color: '#17324D' }}>
                      {task.title}
                    </div>

                    {task.vitalsData && (
                      <div style={{ fontSize: '13px', color: '#197278', fontWeight: 600, marginTop: '4px' }}>
                        Logged: BP {task.vitalsData.bloodPressure} mmHg
                        {task.vitalsData.bloodSugar && ` • Fasting Glucose ${task.vitalsData.bloodSugar} mg/dL`}
                      </div>
                    )}

                    {task.concernNote && (
                      <div style={{ fontSize: '13px', color: '#B42318', fontWeight: 600, marginTop: '4px' }}>
                        ⚠ Concern: {task.concernNote}
                      </div>
                    )}
                  </div>

                  <div>
                    {isDone ? (
                      <span
                        style={{
                          backgroundColor: '#FFFFFF',
                          color: task.status === 'FLAGGED' ? '#B42318' : '#197278',
                          padding: '4px 10px',
                          borderRadius: '10px',
                          fontSize: '12px',
                          fontWeight: 700,
                          border: '1px solid currentColor',
                        }}
                      >
                        Done ✓
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setSelectedTask(task)}
                        style={{
                          backgroundColor: '#197278',
                          color: '#FFFFFF',
                          border: 'none',
                          borderRadius: '10px',
                          padding: '8px 14px',
                          fontSize: '14px',
                          fontWeight: 700,
                          cursor: 'pointer',
                        }}
                      >
                        Action
                      </button>
                    )}
                  </div>
                </div>
              </TouchCard>
            );
          })}
        </div>
      </section>

      {/* 1-Tap Task Action & Vitals Logging Modal */}
      {selectedTask && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(23, 32, 38, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            zIndex: 999,
          }}
        >
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '24px', padding: '24px', width: '100%', maxWidth: '380px' }}>
            <div style={{ fontSize: '13px', color: '#197278', fontWeight: 700, textTransform: 'uppercase' }}>
              {selectedTask.roomNumber} • {selectedTask.residentName}
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#17324D', marginTop: '2px', marginBottom: '16px' }}>
              {selectedTask.title}
            </h3>

            {/* Optional Vitals Fields */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#17324D', marginBottom: '4px' }}>
                  BP (mmHg)
                </label>
                <input
                  type="text"
                  value={bpValue}
                  onChange={(e) => setBpValue(e.target.value)}
                  placeholder="120/80"
                  style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1.5px solid #E2DDD5' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#17324D', marginBottom: '4px' }}>
                  Sugar (mg/dL)
                </label>
                <input
                  type="text"
                  value={sugarValue}
                  onChange={(e) => setSugarValue(e.target.value)}
                  placeholder="110"
                  style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1.5px solid #E2DDD5' }}
                />
              </div>
            </div>

            {/* Flag Concern Note */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#B42318', marginBottom: '4px' }}>
                Flag Clinical Concern (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Low appetite, reported mild headache..."
                value={concernText}
                onChange={(e) => setConcernText(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1.5px solid #E2DDD5' }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <SangamButton
                variant="secondary"
                size="normal"
                icon={<Check size={18} />}
                onClick={handleFinishTask}
              >
                1-TAP COMPLETE & LOG TIMESTAMP
              </SangamButton>

              <SangamButton
                variant="sand"
                size="normal"
                onClick={() => setSelectedTask(null)}
              >
                Cancel
              </SangamButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
