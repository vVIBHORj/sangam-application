import React, { useState } from 'react';
import { useSangamStore } from '../../core/storage/useSangamStore';
import { TouchCard } from '../../design-system/components/TouchCard';
import { Pill, Plus, FileText } from 'lucide-react';
import { SangamButton } from '../../design-system/components/SangamButton';

export const FamilyHealthVault: React.FC = () => {
  const { state } = useSangamStore();
  const [showAddMed, setShowAddMed] = useState(false);
  const [newMedName, setNewMedName] = useState('');
  const [newDose, setNewDose] = useState('');

  const handleAddMed = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMedName) return;
    alert(`Prescription for ${newMedName} (${newDose}) added to Mom's schedule.`);
    setShowAddMed(false);
    setNewMedName('');
    setNewDose('');
  };

  return (
    <div className="scroll-container" style={{ padding: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#17324D' }}>
            Health Vault & Meds
          </h2>
          <div style={{ fontSize: '14px', color: '#4A5A66' }}>
            {state.senior.fullName}'s prescriptions & clinical records
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowAddMed(true)}
          style={{
            backgroundColor: '#197278',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '12px',
            padding: '8px 12px',
            fontSize: '13px',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            cursor: 'pointer',
          }}
        >
          <Plus size={16} /> Add Med
        </button>
      </div>

      {/* 1. Medication Schedule List */}
      <section style={{ marginBottom: '24px' }}>
        <div style={{ fontSize: '16px', fontWeight: 700, color: '#17324D', marginBottom: '10px' }}>
          Active Prescriptions ({state.medications.length})
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {state.medications.map((med) => {
            const isLowStock = med.stockCount <= med.refillThreshold;
            return (
              <TouchCard key={med.id} variant="white" padding="16px">
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <div
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '12px',
                        backgroundColor: '#EAF4F4',
                        color: '#197278',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Pill size={22} />
                    </div>
                    <div>
                      <div style={{ fontSize: '18px', fontWeight: 700, color: '#17324D' }}>
                        {med.name}
                      </div>
                      <div style={{ fontSize: '14px', color: '#4A5A66', marginTop: '2px' }}>
                        {med.dosage} • {med.timingLabel}
                      </div>
                      <div style={{ fontSize: '13px', color: '#197278', fontWeight: 600, marginTop: '2px' }}>
                        Prescribed by {med.prescribedBy}
                      </div>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <span
                      style={{
                        backgroundColor: isLowStock ? '#FEF3F2' : '#F4F1E9',
                        color: isLowStock ? '#B42318' : '#17324D',
                        padding: '4px 8px',
                        borderRadius: '8px',
                        fontSize: '12px',
                        fontWeight: 700,
                        display: 'inline-block',
                      }}
                    >
                      {med.stockCount} pills left
                    </span>
                    {isLowStock && (
                      <div style={{ fontSize: '11px', color: '#B42318', fontWeight: 700, marginTop: '4px' }}>
                        Refill due!
                      </div>
                    )}
                  </div>
                </div>
              </TouchCard>
            );
          })}
        </div>
      </section>

      {/* 2. Medical Conditions & Allergies */}
      <section style={{ marginBottom: '24px' }}>
        <div style={{ fontSize: '16px', fontWeight: 700, color: '#17324D', marginBottom: '10px' }}>
          Clinical Profile
        </div>

        <TouchCard variant="sand" padding="16px">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
            <div>
              <div style={{ fontSize: '12px', color: '#4A5A66', textTransform: 'uppercase', fontWeight: 700 }}>
                Blood Group
              </div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#17324D', marginTop: '2px' }}>
                {state.senior.bloodGroup}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '12px', color: '#4A5A66', textTransform: 'uppercase', fontWeight: 700 }}>
                Ayushman PM-JAY
              </div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: '#197278', marginTop: '4px' }}>
                {state.senior.ayushmanCardNumber}
              </div>
            </div>
          </div>

          <div style={{ marginBottom: '12px' }}>
            <div style={{ fontSize: '12px', color: '#4A5A66', textTransform: 'uppercase', fontWeight: 700 }}>
              Chronic Conditions
            </div>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '6px' }}>
              {state.senior.chronicConditions.map((cond, i) => (
                <span
                  key={i}
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #DCD6CC',
                    borderRadius: '8px',
                    padding: '4px 10px',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#17324D',
                  }}
                >
                  {cond}
                </span>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '12px', color: '#B42318', textTransform: 'uppercase', fontWeight: 700 }}>
              Documented Allergies
            </div>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '6px' }}>
              {state.senior.allergies.map((all, i) => (
                <span
                  key={i}
                  style={{
                    backgroundColor: '#FEF3F2',
                    border: '1px solid #FECDCA',
                    color: '#B42318',
                    borderRadius: '8px',
                    padding: '4px 10px',
                    fontSize: '13px',
                    fontWeight: 700,
                  }}
                >
                  ⚠ {all}
                </span>
              ))}
            </div>
          </div>
        </TouchCard>
      </section>

      {/* 3. Document Vault */}
      <section style={{ marginBottom: '16px' }}>
        <div style={{ fontSize: '16px', fontWeight: 700, color: '#17324D', marginBottom: '10px' }}>
          Health Documents
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ backgroundColor: '#FFFFFF', border: '1.5px solid #E2DDD5', borderRadius: '12px', padding: '12px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <FileText size={20} color="#197278" />
              <div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: '#17324D' }}>Cardiology ECG Report.pdf</div>
                <div style={{ fontSize: '12px', color: '#4A5A66' }}>Max Hospital • 14 March 2026</div>
              </div>
            </div>
            <button type="button" onClick={() => alert('Viewing ECG Report')} style={{ background: 'none', border: 'none', color: '#197278', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>
              View
            </button>
          </div>

          <div style={{ backgroundColor: '#FFFFFF', border: '1.5px solid #E2DDD5', borderRadius: '12px', padding: '12px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <FileText size={20} color="#197278" />
              <div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: '#17324D' }}>Ayushman Bharat Card.pdf</div>
                <div style={{ fontSize: '12px', color: '#4A5A66' }}>Govt of India • Senior 70+ Plan</div>
              </div>
            </div>
            <button type="button" onClick={() => alert('Viewing Ayushman Card')} style={{ background: 'none', border: 'none', color: '#197278', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>
              View
            </button>
          </div>
        </div>
      </section>

      {/* Add Medication Modal */}
      {showAddMed && (
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
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', padding: '24px', width: '100%', maxWidth: '360px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#17324D', marginBottom: '14px' }}>
              Add Prescription
            </h3>
            <form onSubmit={handleAddMed} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 700, color: '#17324D', marginBottom: '4px' }}>
                  Medicine Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Metformin"
                  value={newMedName}
                  onChange={(e) => setNewMedName(e.target.value)}
                  style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1.5px solid #E2DDD5' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 700, color: '#17324D', marginBottom: '4px' }}>
                  Dosage
                </label>
                <input
                  type="text"
                  placeholder="e.g. 500mg, 1 tablet"
                  value={newDose}
                  onChange={(e) => setNewDose(e.target.value)}
                  style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1.5px solid #E2DDD5' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <SangamButton type="submit" variant="primary" size="normal" style={{ flex: 1 }}>
                  Save
                </SangamButton>
                <SangamButton type="button" variant="sand" size="normal" onClick={() => setShowAddMed(false)}>
                  Cancel
                </SangamButton>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
