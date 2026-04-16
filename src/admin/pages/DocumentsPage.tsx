import { useState } from 'react';
import AdminHeader from './AdminHeader';
import { FileText, Upload, Search, Flame, Zap, Eye } from 'lucide-react';

const existingDocuments = [
  { id: '1', filename: 'Ihre_Abrechnung.PDF', supplier: '1-2-3energie', type: 'Gas', customer: 'Flexschlauch Produktions GmbH', consumption: 30250, uploaded_at: '2026-03-12 14:23', status: 'completed' },
  { id: '2', filename: 'CMW_Vattenfall_836536849909_Gas.pdf', supplier: 'Vattenfall', type: 'Gas', customer: 'WEG Compesmuhlenweg', consumption: 260176, uploaded_at: '2026-03-11 09:45', status: 'completed' },
  { id: '3', filename: 'Haus_2a_Vattenfall_170239007.pdf', supplier: 'Vattenfall', type: 'Strom', customer: 'WEG Heinrich-Heine-Gaerten', consumption: 24500, uploaded_at: '2026-03-10 16:12', status: 'completed' },
  { id: '4', filename: 'Wiesemeyer_EnBW_Strom.pdf', supplier: 'EnBW', type: 'Strom', customer: 'Hausverwaltung Wiesemeyer GmbH', consumption: 185000, uploaded_at: '2026-03-08 11:30', status: 'completed' },
];

export default function DocumentsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [dragOver, setDragOver] = useState(false);

  const filtered = existingDocuments.filter(d =>
    d.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.customer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <AdminHeader title="Dokumente" subtitle={`${existingDocuments.length} Dokumente`} />
      <div style={{ padding: 'calc(var(--header-height) + 24px) 24px 24px' }}>
        {/* Upload Zone */}
        <div className="upload-zone" style={{ marginBottom: 24, ...(dragOver ? { borderColor: 'var(--primary)', background: 'rgba(122,162,255,0.03)' } : {}) }}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => { e.preventDefault(); setDragOver(false); }}>
          <Upload size={40} style={{ marginBottom: 12, opacity: 0.5, color: 'var(--primary)' }} />
          <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-heading)', marginBottom: 6 }}>Dokumente hier ablegen</div>
          <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>oder klicken zum Hochladen (PDF, max. 10MB)</div>
        </div>

        {/* Toolbar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <div style={{ position: 'relative', width: 300 }}>
            <Search size={14} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }} />
            <input type="text" placeholder="Dokument suchen..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="input" style={{ paddingLeft: 40 }} />
          </div>
        </div>

        {/* Documents Table */}
        <div className="card">
          <table className="table">
            <thead><tr><th>Datei</th><th>Typ</th><th>Lieferant</th><th>Kunde</th><th>Verbrauch</th><th>Hochgeladen</th><th></th></tr></thead>
            <tbody>
              {filtered.map(doc => (
                <tr key={doc.id}>
                  <td style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <FileText size={16} style={{ color: 'var(--primary)', flexShrink: 0 }} />
                    <span style={{ fontWeight: 600 }}>{doc.filename}</span>
                  </td>
                  <td><span className={`badge ${doc.type === 'Gas' ? 'badge-gas' : 'badge-strom'}`}>{doc.type === 'Gas' ? <Flame size={12} /> : <Zap size={12} />} {doc.type}</span></td>
                  <td>{doc.supplier}</td>
                  <td>{doc.customer}</td>
                  <td style={{ fontWeight: 600, color: 'var(--primary)' }}>{(doc.consumption / 1000).toFixed(0)} MWh</td>
                  <td style={{ color: 'var(--text-muted)', fontSize: 13 }}>{doc.uploaded_at}</td>
                  <td><button className="btn-ghost"><Eye size={14} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
