import AdminHeader from './AdminHeader';
import { Inbox, Mail, RefreshCw } from 'lucide-react';

const demoEmails = [
  { id: '1', from: 'mueller@flexschlauch.de', subject: 'Neue Abrechnung angehaengt', received: '2026-03-15 14:23', matched: 'Flexschlauch Produktions GmbH', status: 'processed' },
  { id: '2', from: 'info@vattenfall.de', subject: 'Jahresabrechnung 2025', received: '2026-03-14 09:45', matched: null, status: 'unmatched' },
  { id: '3', from: 'wiesemeyer@mail.de', subject: 'RE: Vertragsuebersicht', received: '2026-03-13 16:12', matched: 'Hausverwaltung Wiesemeyer GmbH', status: 'processed' },
];

export default function InboxPage() {
  return (
    <>
      <AdminHeader title="Posteingang" subtitle="IMAP E-Mail Zuordnung" />
      <div style={{ padding: 'calc(var(--header-height) + 24px) 24px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 20 }}>
          <button className="btn-secondary"><RefreshCw size={16} /> E-Mails abrufen</button>
        </div>
        <div className="card">
          <table className="table">
            <thead><tr><th>Von</th><th>Betreff</th><th>Empfangen</th><th>Zugeordnet</th><th>Status</th></tr></thead>
            <tbody>
              {demoEmails.map(e => (
                <tr key={e.id}>
                  <td style={{ fontWeight: 600 }}><Mail size={14} style={{ display: 'inline', marginRight: 8 }} />{e.from}</td>
                  <td>{e.subject}</td>
                  <td style={{ color: 'var(--text-muted)' }}>{e.received}</td>
                  <td>{e.matched || <span style={{ color: 'var(--text-dim)' }}>Nicht zugeordnet</span>}</td>
                  <td><span className={`badge ${e.status === 'processed' ? 'badge-success' : 'badge-warning'}`}>{e.status === 'processed' ? 'Verarbeitet' : 'Offen'}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
