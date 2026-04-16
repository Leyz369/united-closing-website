import AdminHeader from './AdminHeader';
import { Gift, Plus, Calendar, Users } from 'lucide-react';

const demoIncentives = [
  { id: '1', name: 'Fruehlings-Challenge', description: 'Meiste Vertraege im Maerz', prize: '500\u20AC Bonus', startDate: '2026-03-01', endDate: '2026-03-31', participants: 8, status: 'active' },
  { id: '2', name: 'Neukunden-Sprint', description: '5 Neukunden in einer Woche', prize: 'iPad Air', startDate: '2026-03-15', endDate: '2026-03-22', participants: 12, status: 'active' },
  { id: '3', name: 'Q1 Top Performer', description: 'Hoechster Umsatz Q1', prize: 'Reise', startDate: '2026-01-01', endDate: '2026-03-31', participants: 15, status: 'active' },
];

export default function IncentivesPage() {
  return (
    <>
      <AdminHeader title="Incentives" subtitle="Wettbewerbe und Anreize" />
      <div style={{ padding: 'calc(var(--header-height) + 24px) 24px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 20 }}>
          <button className="btn-primary"><Plus size={16} /> Neues Incentive</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: 16 }}>
          {demoIncentives.map(inc => (
            <div key={inc.id} className="card" style={{ padding: 24 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--text)', fontSize: 16, marginBottom: 4 }}>{inc.name}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{inc.description}</div>
                </div>
                <span className="badge badge-success">Aktiv</span>
              </div>
              <div style={{ display: 'flex', gap: 16, fontSize: 13, color: 'var(--text-muted)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Gift size={14} /> {inc.prize}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Users size={14} /> {inc.participants}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Calendar size={14} /> {inc.endDate}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
