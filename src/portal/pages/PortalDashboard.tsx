import { Users, FileSignature, Receipt, TrendingUp, Clock } from 'lucide-react';

const stats = [
  { label: 'Meine Kunden', value: '24', icon: Users, color: '#7AA2FF' },
  { label: 'Aktive Vertraege', value: '38', icon: FileSignature, color: '#2EE9C6' },
  { label: 'Offene Provision', value: '\u20AC2.740,50', icon: Receipt, color: '#fbbf24' },
  { label: 'Offene Abrechnungen', value: '2', icon: TrendingUp, color: '#A78BFA' },
];

const activities = [
  { id: '1', text: 'Neuer Kunde "Mueller Baeckerei GmbH" registriert', date: '2026-03-15', type: 'success' },
  { id: '2', text: 'Provisionsabrechnung Maerz bereit', date: '2026-03-14', type: 'info' },
  { id: '3', text: 'Vertrag fuer Schmidt Metallbau AG abgeschlossen', date: '2026-03-12', type: 'success' },
  { id: '4', text: '2 Vertraege laufen im April aus', date: '2026-03-10', type: 'warning' },
];

export default function PortalDashboard() {
  return (
    <div style={{ padding: '24px' }}>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>Willkommen zurueck!</h2>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Hier ist Ihre Uebersicht</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="stat-card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>{s.label}</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text)', marginTop: 4 }}>{s.value}</div>
                </div>
                <div style={{ width: 48, height: 48, borderRadius: 'var(--radius)', background: `${s.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={20} style={{ color: s.color }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="card">
        <div className="card-header"><span className="card-title"><Clock size={16} /> Letzte Aktivitaeten</span></div>
        <div className="card-body">
          {activities.map(a => (
            <div key={a.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: a.type === 'success' ? 'var(--success)' : a.type === 'warning' ? 'var(--warning)' : 'var(--info)', flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, color: 'var(--text)' }}>{a.text}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{a.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
