import AdminHeader from './AdminHeader';
import { Trophy, Plus } from 'lucide-react';

const demoBadges = [
  { id: '1', name: 'Erster Vertrag', description: 'Ersten Vertrag abgeschlossen', icon: '🎯', tier: 'bronze', awarded: 12 },
  { id: '2', name: '10 Vertraege', description: '10 Vertraege abgeschlossen', icon: '🔥', tier: 'silver', awarded: 5 },
  { id: '3', name: 'Top Closer', description: '50 Vertraege in einem Monat', icon: '🏆', tier: 'gold', awarded: 1 },
  { id: '4', name: 'Team Player', description: '5 Teammitglieder geworben', icon: '🤝', tier: 'silver', awarded: 3 },
];

export default function BadgesPage() {
  return (
    <>
      <AdminHeader title="Badges" subtitle="Abzeichen und Gamification" />
      <div style={{ padding: 'calc(var(--header-height) + 24px) 24px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 20 }}>
          <button className="btn-primary"><Plus size={16} /> Neues Badge</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
          {demoBadges.map(b => (
            <div key={b.id} className="card" style={{ padding: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
                <div style={{ fontSize: 32 }}>{b.icon}</div>
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--text)', marginBottom: 2 }}>{b.name}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{b.description}</div>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className={`badge ${b.tier === 'gold' ? 'badge-warning' : b.tier === 'silver' ? 'badge-info' : 'badge-primary'}`}>{b.tier}</span>
                <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{b.awarded}x vergeben</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
