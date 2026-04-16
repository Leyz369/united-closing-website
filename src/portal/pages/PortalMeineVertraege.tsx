import { FileSignature, Zap, Flame } from 'lucide-react';

const demoVertraege = [
  { id: '1', customer: 'Mueller Baeckerei GmbH', type: 'Strom', status: 'active', start: '2026-01-01', end: '2027-12-31', consumption: 45000 },
  { id: '2', customer: 'Mueller Baeckerei GmbH', type: 'Gas', status: 'active', start: '2026-01-01', end: '2027-12-31', consumption: 28000 },
  { id: '3', customer: 'Schmidt Metallbau AG', type: 'Strom', status: 'active', start: '2025-10-01', end: '2027-09-30', consumption: 120000 },
  { id: '4', customer: 'WEG Lindenallee 5', type: 'Gas', status: 'expiring', start: '2024-04-01', end: '2026-03-31', consumption: 85000 },
  { id: '5', customer: 'Fitness Studio XL', type: 'Strom', status: 'pending', start: null, end: null, consumption: 35000 },
];

export default function PortalMeineVertraege() {
  return (
    <div style={{ padding: '24px' }}>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>Meine Vertraege</h2>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{demoVertraege.length} Vertraege</p>
      </div>

      <div className="card">
        <table className="table">
          <thead><tr><th>Kunde</th><th>Typ</th><th>Verbrauch</th><th>Laufzeit</th><th>Status</th></tr></thead>
          <tbody>
            {demoVertraege.map(v => (
              <tr key={v.id}>
                <td style={{ fontWeight: 600 }}>{v.customer}</td>
                <td><span className={`badge ${v.type === 'Strom' ? 'badge-strom' : 'badge-gas'}`}>{v.type === 'Strom' ? <Zap size={12} /> : <Flame size={12} />} {v.type}</span></td>
                <td style={{ fontWeight: 600, color: 'var(--primary)' }}>{(v.consumption / 1000).toFixed(0)} MWh/a</td>
                <td style={{ color: 'var(--text-muted)', fontSize: 13 }}>{v.start ? `${v.start} - ${v.end}` : 'Ausstehend'}</td>
                <td>
                  <span className={`badge ${v.status === 'active' ? 'badge-success' : v.status === 'expiring' ? 'badge-warning' : 'badge-info'}`}>
                    {v.status === 'active' ? 'Aktiv' : v.status === 'expiring' ? 'Laeuft aus' : 'Ausstehend'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
