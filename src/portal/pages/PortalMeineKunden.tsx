import { useState } from 'react';
import { Search, Users, Zap, Flame } from 'lucide-react';

const demoKunden = [
  { id: '1', name: 'Mueller Baeckerei GmbH', city: 'Berlin', contracts: 3, strom: 2, gas: 1, status: 'active' },
  { id: '2', name: 'Schmidt Metallbau AG', city: 'Hamburg', contracts: 2, strom: 1, gas: 1, status: 'active' },
  { id: '3', name: 'WEG Lindenallee 5', city: 'Muenchen', contracts: 5, strom: 3, gas: 2, status: 'active' },
  { id: '4', name: 'Fitness Studio XL', city: 'Koeln', contracts: 1, strom: 1, gas: 0, status: 'pending' },
];

export default function PortalMeineKunden() {
  const [search, setSearch] = useState('');
  const filtered = demoKunden.filter(k => k.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>Meine Kunden</h2>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{demoKunden.length} Kunden insgesamt</p>
      </div>

      <div style={{ position: 'relative', width: 300, marginBottom: 20 }}>
        <Search size={14} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }} />
        <input className="input" style={{ paddingLeft: 40 }} placeholder="Kunde suchen..." value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      <div className="card">
        <table className="table">
          <thead><tr><th>Kunde</th><th>Ort</th><th>Lieferstellen</th><th>Vertraege</th><th>Status</th></tr></thead>
          <tbody>
            {filtered.map(k => (
              <tr key={k.id}>
                <td style={{ fontWeight: 600 }}>{k.name}</td>
                <td>{k.city}</td>
                <td>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {k.strom > 0 && <span className="badge badge-strom"><Zap size={12} /> {k.strom}</span>}
                    {k.gas > 0 && <span className="badge badge-gas"><Flame size={12} /> {k.gas}</span>}
                  </div>
                </td>
                <td>{k.contracts}</td>
                <td><span className={`badge ${k.status === 'active' ? 'badge-success' : 'badge-warning'}`}>{k.status === 'active' ? 'Aktiv' : 'In Bearbeitung'}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
