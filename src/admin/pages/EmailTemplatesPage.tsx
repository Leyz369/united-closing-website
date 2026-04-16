import AdminHeader from './AdminHeader';
import { Mail, Plus, Edit2, Eye } from 'lucide-react';

const demoTemplates = [
  { id: '1', name: 'Partner-Willkommen', subject: 'Willkommen bei United Closing!', trigger: 'Registrierung', lastEdited: '2026-03-01' },
  { id: '2', name: 'Vertrag versendet', subject: 'Ihr Vertrag liegt bereit', trigger: 'Vertragsversand', lastEdited: '2026-02-15' },
  { id: '3', name: 'Provisionsabrechnung', subject: 'Ihre Provisionsabrechnung', trigger: 'Abrechnung erstellt', lastEdited: '2026-02-10' },
  { id: '4', name: 'Portal-Einladung', subject: 'Zugang zum Partner-Portal', trigger: 'Portal aktiviert', lastEdited: '2026-01-20' },
];

export default function EmailTemplatesPage() {
  return (
    <>
      <AdminHeader title="E-Mail-Vorlagen" subtitle={`${demoTemplates.length} Vorlagen`} />
      <div style={{ padding: 'calc(var(--header-height) + 24px) 24px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 20 }}>
          <button className="btn-primary"><Plus size={16} /> Neue Vorlage</button>
        </div>
        <div className="card">
          <table className="table">
            <thead><tr><th>Name</th><th>Betreff</th><th>Trigger</th><th>Aktualisiert</th><th></th></tr></thead>
            <tbody>
              {demoTemplates.map(t => (
                <tr key={t.id}>
                  <td style={{ fontWeight: 600 }}><Mail size={14} style={{ display: 'inline', marginRight: 8, color: 'var(--primary)' }} />{t.name}</td>
                  <td>{t.subject}</td>
                  <td><span className="badge badge-info">{t.trigger}</span></td>
                  <td style={{ color: 'var(--text-muted)' }}>{t.lastEdited}</td>
                  <td><div style={{ display: 'flex', gap: 8 }}><button className="btn-ghost"><Edit2 size={14} /></button><button className="btn-ghost"><Eye size={14} /></button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
