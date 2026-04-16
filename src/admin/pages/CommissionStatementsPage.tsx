import AdminHeader from './AdminHeader';
import { Receipt, Download, Search } from 'lucide-react';
import { useState } from 'react';

const demoStatements = [
  { id: '1', partner: 'Michael Hartmann', period: 'Maerz 2026', amount: 4250, contracts: 12, status: 'draft' },
  { id: '2', partner: 'Sarah Wagner', period: 'Maerz 2026', amount: 2180, contracts: 7, status: 'draft' },
  { id: '3', partner: 'Michael Hartmann', period: 'Februar 2026', amount: 3890, contracts: 10, status: 'paid' },
  { id: '4', partner: 'Thomas Mueller', period: 'Februar 2026', amount: 1540, contracts: 5, status: 'paid' },
  { id: '5', partner: 'Lisa Schmidt', period: 'Februar 2026', amount: 920, contracts: 3, status: 'paid' },
];

export default function CommissionStatementsPage() {
  const [search, setSearch] = useState('');
  const filtered = demoStatements.filter(s => s.partner.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
      <AdminHeader title="Provisionsabrechnungen" subtitle={`${demoStatements.length} Abrechnungen`} />
      <div style={{ padding: 'calc(var(--header-height) + 24px) 24px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <div style={{ position: 'relative', width: 300 }}>
            <Search size={14} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }} />
            <input className="input" style={{ paddingLeft: 40 }} placeholder="Partner suchen..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <button className="btn-primary"><Receipt size={16} /> Neue Abrechnung</button>
        </div>
        <div className="card">
          <table className="table">
            <thead><tr><th>Partner</th><th>Periode</th><th>Vertraege</th><th>Betrag</th><th>Status</th><th></th></tr></thead>
            <tbody>
              {filtered.map(s => (
                <tr key={s.id}>
                  <td style={{ fontWeight: 600 }}>{s.partner}</td>
                  <td>{s.period}</td>
                  <td>{s.contracts}</td>
                  <td style={{ fontWeight: 600 }}>{'\u20AC'}{s.amount.toLocaleString('de-DE')}</td>
                  <td><span className={`badge ${s.status === 'paid' ? 'badge-success' : 'badge-warning'}`}>{s.status === 'paid' ? 'Bezahlt' : 'Entwurf'}</span></td>
                  <td><button className="btn-ghost"><Download size={14} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
