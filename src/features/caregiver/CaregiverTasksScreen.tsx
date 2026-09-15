import React, { useState } from 'react';
import { useSangamStore } from '../../core/storage/useSangamStore';
import { TouchCard } from '../../design-system/components/TouchCard';
import { CareTask } from '../../core/domain/types';
import { Check, AlertCircle, CheckCircle2, ChevronRight, X } from 'lucide-react';
import { SangamButton } from '../../design-system/components/SangamButton';

export const CaregiverTasksScreen: React.FC = () => {
  const { state, completeTask } = useSangamStore();
  const [filter, setFilter] = useState<'DUE' | 'UPCOMING' | 'COMPLETED'>('DUE');
  const [selectedTask, setSelectedTask] = useState<CareTask | null>(null);
  const [bpValue, setBpValue] = useState('126/80');
  const [sugarValue, setSugarValue] = useState('114');
  const [concernText, setConcernText] = useState('');

  const dueTasks = state.careTasks.filter((t) => t.status === 'DUE_NOW');
  const upcomingTasks = state.careTasks.filter((t) => t.status === 'PENDING');
  const completedTasks = state.careTasks.filter((t) => t.status === 'COMPLETED' || t.status === 'FLAGGED');

  const activeTaskList = filter === 'DUE' ? dueTasks : filter === 'UPCOMING' ? upcomingTasks : completedTasks;

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
      {/* Header */}
      <div style={{ marginBottom: '18px' }}>
        <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#17324D', margin: 0 }}>
          Care Tasks
        </h2>
        <div style={{ fontSize: '13px', color: '#4A5A66', marginTop: '2px' }}>
          Daily protocol for {state.senior.fullName}
        </div>
      </div>

      {/* Filter Tabs */}
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
          onClick={() => setFilter('DUE')}
          style={{
            padding: '10px 0',
            borderRadius: '12px',
            border: 'none',
            backgroundColor: filter === 'DUE' ? '#FFFFFF' : 'transparent',
            color: filter === 'DUE' ? '#17324D' : '#4A5A66',
            fontWeight: 800,
            fontSize: '13px',
            cursor: 'pointer',
            boxShadow: filter === 'DUE' ? '0 2px 4px rgba(0,0,0,0.06)' : 'none',
          }}
        >
          Due ({dueTasks.length})
        </button>

        <button
          type="button"
          onClick={() => setFilter('UPCOMING')}
          style={{
            padding: '10px 0',
            borderRadius: '12px',
            border: 'none',
            backgroundColor: filter === 'UPCOMING' ? '#FFFFFF' : 'transparent',
            color: filter === 'UPCOMING' ? '#17324D' : '#4A5A66',
            fontWeight: 800,
            fontSize: '13px',
            cursor: 'pointer',
            boxShadow: filter === 'UPCOMING' ? '0 2px 4px rgba(0,0,0,0.06)' : 'none',
          }}
        >
          Upcoming ({upcomingTasks.length})
        </button>

        <button
          type="button"
          onClick={() => setFilter('COMPLETED')}
          style={{
            padding: '10px 0',
            borderRadius: '12px',
            border: 'none',
            backgroundColor: filter === 'COMPLETED' ? '#FFFFFF' : 'transparent',
            color: filter === 'COMPLETED' ? '#17324D' : '#4A5A66',
            fontWeight: 800,
            fontSize: '13px',
            cursor: 'pointer',
            boxShadow: filter === 'COMPLETED' ? '0 2px 4px rgba(0,0,0,0.06)' : 'none',
          }}
        >
          Completed ({completedTasks.length})
        </button>
      </div>

      {/* Task List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {activeTaskList.length === 0 ? (
          <TouchCard variant="white" padding="20px" style={{ textAlign: 'center' }}>
            <CheckCircle2 size={36} color="#027A48" style={{ margin: '0 auto 8px' }} />
            <div style={{ fontSize: '16px', fontWeight: 800, color: '#17324D' }}>
              No {filter.toLowerCase()} tasks
            </div>
            <div style={{ fontSize: '13px', color: '#4A5A66', marginTop: '4px' }}>
              All actions in this category are clear.
            </div>
          </TouchCard>
        ) : (
          activeTaskList.map((task) => {
            const isDone = task.status === 'COMPLETED' || task.status === 'FLAGGED';
            const isDueNow = task.status === 'DUE_NOW';

            return (
              <TouchCard
                key={task.id}
                variant="white"
                padding="16px"
                onClick={() => setSelectedTask(task)}
                style={{
                  borderLeft: `6px solid ${isDueNow ? '#197278' : isDone ? '#027A48' : '#D0D5DD'}`,
                  cursor: 'pointer',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                  <div style={{ flex: 1, paddingRight: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span
                        style={{
                          backgroundColor: '#F4F1E9',
                          color: '#17324D',
                          padding: '2px 6px',
                          borderRadius: '4px',
                          fontSize: '11px',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                        }}
                      >
                        {task.category}
                      </span>
                      <span style={{ fontSize: '12px', color: '#4A5A66' }}>
                        {task.scheduledTime}
                      </span>
                    </div>

                    <div style={{ fontSize: '16px', fontWeight: 800, color: '#17324D' }}>
                      {task.title}
                    </div>
                    <div style={{ fontSize: '13px', color: '#4A5A66', marginTop: '2px' }}>
                      {task.description}
                    </div>

                    {task.concernNote && (
                      <div style={{ marginTop: '8px', fontSize: '12px', color: '#B42318', backgroundColor: '#FEF3F2', padding: '6px 8px', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <AlertCircle size={14} />
                        <span>Flagged: {task.concernNote}</span>
                      </div>
                    )}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {isDone ? (
                      <div
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          backgroundColor: '#ECFDF3',
                          color: '#027A48',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Check size={18} strokeWidth={2.5} />
                      </div>
                    ) : (
                      <div
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          backgroundColor: '#EAF4F4',
                          color: '#197278',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <ChevronRight size={18} />
                      </div>
                    )}
                  </div>
                </div>
              </TouchCard>
            );
          })
        )}
      </div>

      {/* Task Completion Modal */}
      {selectedTask && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(23, 50, 77, 0.65)',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderTopLeftRadius: '24px',
              borderTopRightRadius: '24px',
              width: '100%',
              maxWidth: '430px',
              padding: '24px',
              maxHeight: '85vh',
              overflowY: 'auto',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#197278', textTransform: 'uppercase' }}>
                  {selectedTask.category} Task
                </span>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#17324D', margin: '2px 0 0 0' }}>
                  {selectedTask.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedTask(null)}
                style={{ background: 'none', border: 'none', color: '#4A5A66', cursor: 'pointer' }}
              >
                <X size={24} />
              </button>
            </div>

            <p style={{ fontSize: '14px', color: '#4A5A66', marginBottom: '18px' }}>
              {selectedTask.description}
            </p>

            {/* Vitals inputs if relevant */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#17324D', marginBottom: '6px' }}>
                Blood Pressure Reading (optional)
              </label>
              <input
                type="text"
                value={bpValue}
                onChange={(e) => setBpValue(e.target.value)}
                placeholder="e.g. 126/80"
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  border: '1px solid #E2DDD5',
                  fontSize: '15px',
                }}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#17324D', marginBottom: '6px' }}>
                Fasting / Post-meal Blood Sugar (optional)
              </label>
              <input
                type="number"
                value={sugarValue}
                onChange={(e) => setSugarValue(e.target.value)}
                placeholder="mg/dL"
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  border: '1px solid #E2DDD5',
                  fontSize: '15px',
                }}
              />
            </div>

            <div style={{ marginBottom: '22px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#17324D', marginBottom: '6px' }}>
                Caregiver Clinical Note or Flag
              </label>
              <textarea
                value={concernText}
                onChange={(e) => setConcernText(e.target.value)}
                placeholder="e.g. Mild appetite noted at lunch, or administered with warm milk"
                rows={3}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  border: '1px solid #E2DDD5',
                  fontSize: '14px',
                  fontFamily: 'inherit',
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <SangamButton
                variant="sand"
                onClick={() => setSelectedTask(null)}
                style={{ flex: 1 }}
              >
                Cancel
              </SangamButton>
              <SangamButton
                variant="primary"
                onClick={handleFinishTask}
                style={{ flex: 2 }}
              >
                Sign Off & Mark Done
              </SangamButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
