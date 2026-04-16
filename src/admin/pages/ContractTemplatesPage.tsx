import AdminHeader from './AdminHeader';
import { FileSignature, Plus, Download, Edit2 } from 'lucide-react';

const demoTemplates = [
  { id: '1', name: 'Vertriebspartnervertrag Standard', version: 'v2.1', lastUpdated: '2026-02-15', usageCount: 24 },
  { id: '2', name: 'Zusatzvereinbarung Provision', version: 'v1.3', lastUpdated: '2026-01-20', usageCount: 8 },
  { id: '3', name: 'NDA / Geheimhaltung', version: 'v1.0', lastUpdated: '2025-12-01', usageCount: 15 },
];

export default function ContractTemplatesPage() {
  return (
    <>
      <AdminHeader title="Vertragsvorlagen" subtitle={`${demoTemplates.length} Vorlagen`} />
      <div style={{ padding: 'calc(var(--header-height) + 24px) 24px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 20 }}>
          <button className="btn-primary"><Plus size={16} /> Neue Vorlage</button>
        </div>
        <div className="card">
          <table className="table">
            <thead><tr><th>Vorlage</th><th>Version</th><th>Aktualisiert</th><th>Verwendet</th><th></th></tr></thead>
            <tbody>
              {demoTemplates.map(t => (
                <tr key={t.id}>
                  <td style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 10 }}><FileSignature size={16} style={{ color: 'var(--primary)' }} /> {t.name}</td>
                  <td><span className="badge badge-primary">{t.version}</span></td>
                  <td style={{ color: 'var(--text-muted)' }}>{t.lastUpdated}</td>
                  <td>{t.usageCount}x</td>
                  <td><div style={{ display: 'flex', gap: 8 }}><button className="btn-ghost"><Edit2 size={14} /></button><button className="btn-ghost"><Download size={14} /></button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
