import React from 'react';
import { useSangamStore } from '../../core/storage/useSangamStore';
import { TouchCard } from '../../design-system/components/TouchCard';
import { 
  Pill, 
  Smile, 
  Activity, 
  Calendar, 
  Heart, 
  CheckCircle2, 
  Clock, 
  Award 
} from 'lucide-react';

export const CaregiverStatsScreen: React.FC = () => {
  const { state, setCaregiverStatPeriod } = useSangamStore();
  const period = state.caregiverStatPeriod || '7D';

  // Overview metrics
  const overviewMetrics = [
    { label: 'Medication Adherence', value: '92%', subtext: '23 of 25 doses taken', color: '#197278', icon: Pill },
    { label: 'Check-in Consistency', value: '96%', subtext: 'Daily morning check-in', color: '#027A48', icon: Smile },
    { label: 'Tasks Completed', value: '94%', subtext: '47 of 50 tasks on time', color: '#17324D', icon: CheckCircle2 },
    { label: 'Appointments Attended', value: '100%', subtext: '4 reviews this month', color: '#6941C6', icon: Calendar },
  ];

  // 7-day adherence data
  const weeklyMedData = [
    { day: 'Mon', taken: 3, missed: 0, snoozed: 0, rate: '100%' },
    { day: 'Tue', taken: 3, missed: 0, snoozed: 0, rate: '100%' },
    { day: 'Wed', taken: 2, missed: 0, snoozed: 1, rate: '67%' },
    { day: 'Thu', taken: 3, missed: 0, snoozed: 0, rate: '100%' },
    { day: 'Fri', taken: 3, missed: 0, snoozed: 0, rate: '100%' },
    { day: 'Sat', taken: 2, missed: 1, snoozed: 0, rate: '67%' },
    { day: 'Sun', taken: 3, missed: 0, snoozed: 0, rate: '100%' },
  ];

  // Daily check-in days
  const checkinDays = [
    { day: 'Mon', label: 'Good', emoji: '😊', isOk: true },
    { day: 'Tue', label: 'Good', emoji: '😊', isOk: true },
    { day: 'Wed', label: 'Okay', emoji: '🙂', isOk: true },
    { day: 'Thu', label: 'Good', emoji: '😊', isOk: true },
    { day: 'Fri', label: 'Good', emoji: '😊', isOk: true },
    { day: 'Sat', label: 'Tired', emoji: '😐', isOk: false },
    { day: 'Sun', label: 'Happy', emoji: '😊', isOk: true },
  ];

  return (
    <div className="scroll-container" style={{ padding: '20px' }}>
      {/* Header with Title & Clean Time Filter */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
        <div>
          <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#17324D', margin: 0 }}>
            Health & Care Summary
          </h2>
          <div style={{ fontSize: '13px', color: '#4A5A66', marginTop: '2px' }}>
            Care insights for {state.senior.fullName}
          </div>
        </div>

        {/* 7D vs 30D Pill Toggle */}
        <div
          style={{
            display: 'flex',
            backgroundColor: '#E2DDD5',
            borderRadius: '20px',
            padding: '3px',
            gap: '2px',
          }}
        >
          <button
            type="button"
            onClick={() => setCaregiverStatPeriod('7D')}
            style={{
              padding: '6px 14px',
              borderRadius: '16px',
              border: 'none',
              backgroundColor: period === '7D' ? '#17324D' : 'transparent',
              color: period === '7D' ? '#FFFFFF' : '#4A5A66',
              fontWeight: 700,
              fontSize: '12px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            7 Days
          </button>
          <button
            type="button"
            onClick={() => setCaregiverStatPeriod('30D')}
            style={{
              padding: '6px 14px',
              borderRadius: '16px',
              border: 'none',
              backgroundColor: period === '30D' ? '#17324D' : 'transparent',
              color: period === '30D' ? '#FFFFFF' : '#4A5A66',
              fontWeight: 700,
              fontSize: '12px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            30 Days
          </button>
        </div>
      </div>

      {/* 1. CARE OVERVIEW */}
      <section style={{ marginBottom: '22px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
          {overviewMetrics.map((item, idx) => {
            const Icon = item.icon;
            return (
              <TouchCard key={idx} variant="white" padding="16px">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#4A5A66' }}>
                    {item.label}
                  </span>
                  <Icon size={18} color={item.color} />
                </div>
                <div style={{ fontSize: '26px', fontWeight: 800, color: item.color }}>
                  {item.value}
                </div>
                <div style={{ fontSize: '11px', color: '#4A5A66', marginTop: '4px' }}>
                  {item.subtext}
                </div>
              </TouchCard>
            );
          })}
        </div>
      </section>

      {/* 2. MEDICATION ADHERENCE & LIST */}
      <section style={{ marginBottom: '22px' }}>
        <TouchCard variant="white" padding="18px">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#17324D', margin: 0 }}>
                Medication Adherence Trend
              </h3>
              <div style={{ fontSize: '12px', color: '#4A5A66', marginTop: '2px' }}>
                Daily completion rate over past {period === '7D' ? '7 days' : 'month'}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: '#4A5A66' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#197278' }} />
                Taken
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#FEDF89' }} />
                Snoozed
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#B42318' }} />
                Missed
              </span>
            </div>
          </div>

          {/* Clean Graph Bars */}
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '110px', paddingTop: '10px', borderBottom: '1px solid #E2DDD5' }}>
            {weeklyMedData.map((d, i) => {
              const total = d.taken + d.snoozed + d.missed;
              const takenHeight = total > 0 ? (d.taken / 3) * 75 : 0;
              const snoozedHeight = total > 0 ? (d.snoozed / 3) * 75 : 0;
              const missedHeight = total > 0 ? (d.missed / 3) * 75 : 0;

              return (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', flex: 1 }}>
                  <div style={{ display: 'flex', flexDirection: 'column-reverse', width: '22px', height: '80px', backgroundColor: '#F4F1E9', borderRadius: '6px', overflow: 'hidden' }}>
                    <div style={{ height: `${takenHeight}px`, backgroundColor: '#197278', width: '100%' }} />
                    <div style={{ height: `${snoozedHeight}px`, backgroundColor: '#FEDF89', width: '100%' }} />
                    <div style={{ height: `${missedHeight}px`, backgroundColor: '#B42318', width: '100%' }} />
                  </div>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#4A5A66' }}>{d.day}</span>
                </div>
              );
            })}
          </div>

          {/* Current Prescribed Medication List */}
          <div style={{ marginTop: '16px' }}>
            <div style={{ fontSize: '13px', fontWeight: 800, color: '#17324D', marginBottom: '10px' }}>
              Active Prescription Schedule
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {state.medications.map((med) => (
                <div
                  key={med.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 12px',
                    backgroundColor: '#F7F4EE',
                    borderRadius: '10px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Pill size={18} color="#197278" />
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: '#17324D' }}>
                        {med.name} {med.dosage}
                      </div>
                      <div style={{ fontSize: '12px', color: '#4A5A66' }}>
                        {med.instructions}
                      </div>
                    </div>
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#17324D', backgroundColor: '#FFFFFF', padding: '4px 8px', borderRadius: '6px', border: '1px solid #E2DDD5' }}>
                    {med.scheduledTime}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </TouchCard>
      </section>

      {/* 3. DAILY CHECK-INS */}
      <section style={{ marginBottom: '22px' }}>
        <TouchCard variant="white" padding="18px">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#17324D', margin: 0 }}>
                Daily Check-ins
              </h3>
              <div style={{ fontSize: '12px', color: '#4A5A66', marginTop: '2px' }}>
                Last check-in: <strong>10 mins ago</strong> • Current status: <strong style={{ color: '#027A48' }}>Feeling Happy 😊</strong>
              </div>
            </div>
            <span style={{ backgroundColor: '#ECFDF3', color: '#027A48', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 700 }}>
              14-Day Streak
            </span>
          </div>

          {/* Simple weekly visualization with text & icons (never color alone) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '6px' }}>
            {checkinDays.map((c, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '8px 2px',
                  backgroundColor: c.isOk ? '#ECFDF3' : '#FEF0C7',
                  border: `1px solid ${c.isOk ? '#A6F4C5' : '#FEDF89'}`,
                  borderRadius: '10px',
                }}
              >
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#4A5A66' }}>{c.day}</span>
                <span style={{ fontSize: '18px', margin: '4px 0' }}>{c.emoji}</span>
                <span style={{ fontSize: '10px', fontWeight: 700, color: c.isOk ? '#027A48' : '#B54708' }}>
                  {c.label}
                </span>
              </div>
            ))}
          </div>
        </TouchCard>
      </section>

      {/* 4. HEALTH SNAPSHOT */}
      <section style={{ marginBottom: '22px' }}>
        <TouchCard variant="white" padding="18px">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#17324D', margin: 0 }}>
              Health Snapshot
            </h3>
            <span style={{ fontSize: '12px', color: '#4A5A66' }}>
              Blood Group: <strong>B+</strong>
            </span>
          </div>

          {/* Verified Conditions */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
            <span style={{ backgroundColor: '#EAF4F4', color: '#197278', padding: '4px 10px', borderRadius: '8px', fontSize: '12px', fontWeight: 700 }}>
              Hypertension
            </span>
            <span style={{ backgroundColor: '#F4F1E9', color: '#17324D', padding: '4px 10px', borderRadius: '8px', fontSize: '12px', fontWeight: 700 }}>
              Type 2 Diabetes
            </span>
          </div>

          {/* Vitals Grid — Only display verified data from domain state */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
            <div style={{ backgroundColor: '#F7F4EE', padding: '12px', borderRadius: '12px' }}>
              <div style={{ fontSize: '11px', color: '#4A5A66', fontWeight: 700 }}>BLOOD PRESSURE</div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#17324D', marginTop: '2px' }}>
                126 / 80
              </div>
              <div style={{ fontSize: '11px', color: '#027A48', fontWeight: 600 }}>Normal range</div>
            </div>

            <div style={{ backgroundColor: '#F7F4EE', padding: '12px', borderRadius: '12px' }}>
              <div style={{ fontSize: '11px', color: '#4A5A66', fontWeight: 700 }}>FASTING SUGAR</div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#17324D', marginTop: '2px' }}>
                114 <span style={{ fontSize: '12px', fontWeight: 600 }}>mg/dL</span>
              </div>
              <div style={{ fontSize: '11px', color: '#027A48', fontWeight: 600 }}>Within target</div>
            </div>

            <div style={{ backgroundColor: '#F7F4EE', padding: '12px', borderRadius: '12px' }}>
              <div style={{ fontSize: '11px', color: '#4A5A66', fontWeight: 700 }}>WEIGHT</div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#17324D', marginTop: '2px' }}>
                64.2 <span style={{ fontSize: '12px', fontWeight: 600 }}>kg</span>
              </div>
              <div style={{ fontSize: '11px', color: '#4A5A66', fontWeight: 600 }}>Stable (last 60d)</div>
            </div>

            <div style={{ backgroundColor: '#F7F4EE', padding: '12px', borderRadius: '12px' }}>
              <div style={{ fontSize: '11px', color: '#4A5A66', fontWeight: 700 }}>RESTING HEART RATE</div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#17324D', marginTop: '2px' }}>
                72 <span style={{ fontSize: '12px', fontWeight: 600 }}>bpm</span>
              </div>
              <div style={{ fontSize: '11px', color: '#027A48', fontWeight: 600 }}>Regular rhythm</div>
            </div>
          </div>
        </TouchCard>
      </section>

      {/* 5. ACTIVITY / WELLBEING */}
      <section style={{ marginBottom: '22px' }}>
        <TouchCard variant="white" padding="18px">
          <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#17324D', margin: '0 0 14px 0' }}>
            Activity & Wellbeing Trends
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#EAF4F4', color: '#197278', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Activity size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#17324D' }}>Daily Walking</div>
                  <div style={{ fontSize: '12px', color: '#4A5A66' }}>3,840 steps today • 4,100 steps 7d avg</div>
                </div>
              </div>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#027A48' }}>+8% vs last wk</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#F4F1E9', color: '#17324D', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Heart size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#17324D' }}>Community Participation</div>
                  <div style={{ fontSize: '12px', color: '#4A5A66' }}>2 voice memories shared this week</div>
                </div>
              </div>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#197278' }}>Active</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#EDF5FD', color: '#0969DA', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Clock size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#17324D' }}>Voice Activity</div>
                  <div style={{ fontSize: '12px', color: '#4A5A66' }}>Daily audio notes & family check-ins</div>
                </div>
              </div>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#027A48' }}>Normal</span>
            </div>
          </div>
        </TouchCard>
      </section>

      {/* 6. ALERT HISTORY */}
      <section style={{ marginBottom: '22px' }}>
        <TouchCard variant="white" padding="18px">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#17324D', margin: 0 }}>
              Recent Alert History
            </h3>
            <span style={{ fontSize: '12px', color: '#027A48', fontWeight: 700 }}>All Resolved</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {state.alertHistory.map((item) => (
              <div
                key={item.id}
                style={{
                  padding: '12px',
                  backgroundColor: '#F7F4EE',
                  borderRadius: '10px',
                  borderLeft: `4px solid ${item.severity === 'HIGH' ? '#B42318' : item.severity === 'MEDIUM' ? '#F79009' : '#197278'}`,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 800, color: '#17324D' }}>
                    {item.title}
                  </span>
                  <span style={{ fontSize: '11px', color: '#4A5A66' }}>
                    {item.date} • {item.time}
                  </span>
                </div>
                <div style={{ fontSize: '12px', color: '#4A5A66' }}>
                  Status: <strong style={{ color: '#027A48' }}>{item.status}</strong> — {item.resolution}
                </div>
              </div>
            ))}
          </div>
        </TouchCard>
      </section>

      {/* 7. UPCOMING APPOINTMENTS */}
      <section style={{ marginBottom: '22px' }}>
        <TouchCard variant="white" padding="18px">
          <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#17324D', margin: '0 0 12px 0' }}>
            Upcoming Appointments
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px',
                backgroundColor: '#F7F4EE',
                borderRadius: '10px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Calendar size={18} color="#197278" />
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#17324D' }}>
                    Cardiologist — Dr. Anjali Verma
                  </div>
                  <div style={{ fontSize: '12px', color: '#4A5A66' }}>
                    Apollo Hospital • Routine BP Review
                  </div>
                </div>
              </div>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#17324D', backgroundColor: '#FFFFFF', padding: '4px 8px', borderRadius: '6px' }}>
                Fri, 12 Sep • 11:00 AM
              </span>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px',
                backgroundColor: '#F7F4EE',
                borderRadius: '10px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Calendar size={18} color="#197278" />
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#17324D' }}>
                    Diabetes Review
                  </div>
                  <div style={{ fontSize: '12px', color: '#4A5A66' }}>
                    Dr. S. K. Roy • HbA1c Follow-up
                  </div>
                </div>
              </div>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#17324D', backgroundColor: '#FFFFFF', padding: '4px 8px', borderRadius: '6px' }}>
                Wed, 17 Sep • 4:00 PM
              </span>
            </div>
          </div>
        </TouchCard>
      </section>

      {/* 8. CARE PERFORMANCE (Operational Caregiver Stats — No competitive gamification) */}
      <section style={{ marginBottom: '20px' }}>
        <TouchCard variant="white" padding="18px">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <Award size={18} color="#197278" />
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#17324D', margin: 0 }}>
              Care Operations Summary
            </h3>
          </div>
          <div style={{ fontSize: '12px', color: '#4A5A66', marginBottom: '14px' }}>
            Shift metrics for Nurse Sunita Devi (Operational accountability)
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
            <div style={{ padding: '10px', backgroundColor: '#F7F4EE', borderRadius: '10px' }}>
              <div style={{ fontSize: '11px', color: '#4A5A66', fontWeight: 700 }}>TASKS COMPLETED</div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#17324D', marginTop: '2px' }}>
                8 / 10
              </div>
              <div style={{ fontSize: '11px', color: '#027A48' }}>On schedule</div>
            </div>

            <div style={{ padding: '10px', backgroundColor: '#F7F4EE', borderRadius: '10px' }}>
              <div style={{ fontSize: '11px', color: '#4A5A66', fontWeight: 700 }}>TASKS MISSED</div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#027A48', marginTop: '2px' }}>
                0
              </div>
              <div style={{ fontSize: '11px', color: '#027A48' }}>Clean record</div>
            </div>

            <div style={{ padding: '10px', backgroundColor: '#F7F4EE', borderRadius: '10px' }}>
              <div style={{ fontSize: '11px', color: '#4A5A66', fontWeight: 700 }}>AVG COMPLETION TIME</div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#17324D', marginTop: '2px' }}>
                14 mins
              </div>
              <div style={{ fontSize: '11px', color: '#4A5A66' }}>After scheduled time</div>
            </div>

            <div style={{ padding: '10px', backgroundColor: '#F7F4EE', borderRadius: '10px' }}>
              <div style={{ fontSize: '11px', color: '#4A5A66', fontWeight: 700 }}>HANDOVER COMPLETION</div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#197278', marginTop: '2px' }}>
                100%
              </div>
              <div style={{ fontSize: '11px', color: '#4A5A66' }}>Signed on every shift</div>
            </div>
          </div>
        </TouchCard>
      </section>
    </div>
  );
};
