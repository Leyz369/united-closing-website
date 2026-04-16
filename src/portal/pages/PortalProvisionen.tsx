import { Receipt, Download, TrendingUp } from 'lucide-react';

const demoProvisionen = [
  { id: '1', period: 'Maerz 2026', contracts: 5, amount: 1280, status: 'pending' },
  { id: '2', period: 'Februar 2026', contracts: 4, amount: 960, status: 'paid' },
  { id: '3', period: 'Januar 2026', contracts: 7, amount: 1540, status: 'paid' },
  { id: '4', period: 'Dezember 2025', contracts: 3, amount: 720, status: 'paid' },
];

const total = demoProvisionen.reduce((sum, p) => sum + p.amount, 0);
const pending = demoProvisionen.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0);

export default function PortalProvisionen() {
  return (
    <div style={{ padding: '24px' }}>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>Provisionen</h2>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Ihre Provisionsabrechnungen</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
        <div className="stat-card">
          <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>Gesamt</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text)', marginTop: 4 }}>{'\u20AC'}{total.toLocaleString('de-DE')}</div>
        </div>
        <div className="stat-card">
          <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>Ausstehend</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fbbf24', marginTop: 4 }}>{'\u20AC'}{pending.toLocaleString('de-DE')}</div>
        </div>
        <div className="stat-card">
          <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>Vertraege gesamt</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text)', marginTop: 4 }}>{demoProvisionen.reduce((sum, p) => sum + p.contracts, 0)}</div>
        </div>
      </div>

      <div className="card">
        <table className="table">
          <thead><tr><th>Periode</th><th>Vertraege</th><th>Betrag</th><th>Status</th><th></th></tr></thead>
          <tbody>
            {demoProvisionen.map(p => (
              <tr key={p.id}>
                <td style={{ fontWeight: 600 }}>{p.period}</td>
                <td>{p.contracts}</td>
                <td style={{ fontWeight: 600 }}>{'\u20AC'}{p.amount.toLocaleString('de-DE')}</td>
                <td><span className={`badge ${p.status === 'paid' ? 'badge-success' : 'badge-warning'}`}>{p.status === 'paid' ? 'Bezahlt' : 'Ausstehend'}</span></td>
                <td>{p.status === 'paid' && <button className="btn-ghost"><Download size={14} /></button>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
