import AdminHeader from './AdminHeader';
import { UserCheck, Check, X } from 'lucide-react';

const demoRegistrations = [
  { id: '1', name: 'Peter Weber', email: 'peter.weber@gmail.de', company: 'Weber Consulting', date: '2026-03-14', status: 'pending' },
  { id: '2', name: 'Julia Braun', email: 'j.braun@braun-energie.de', company: 'Braun Energie GmbH', date: '2026-03-12', status: 'pending' },
  { id: '3', name: 'Stefan Koch', email: 'koch@partner.de', company: null, date: '2026-03-10', status: 'approved' },
];

export default function PortalRegistrationsPage() {
  return (
    <>
      <AdminHeader title="Portal-Registrierungen" subtitle="Neue Registrierungen pruefen" />
      <div style={{ padding: 'calc(var(--header-height) + 24px) 24px 24px' }}>
        <div className="card">
          <table className="table">
            <thead><tr><th>Name</th><th>E-Mail</th><th>Firma</th><th>Datum</th><th>Status</th><th>Aktionen</th></tr></thead>
            <tbody>
              {demoRegistrations.map(r => (
                <tr key={r.id}>
                  <td style={{ fontWeight: 600 }}>{r.name}</td>
                  <td>{r.email}</td>
                  <td>{r.company || '-'}</td>
                  <td style={{ color: 'var(--text-muted)' }}>{r.date}</td>
                  <td><span className={`badge ${r.status === 'approved' ? 'badge-success' : 'badge-warning'}`}>{r.status === 'approved' ? 'Genehmigt' : 'Ausstehend'}</span></td>
                  <td>
                    {r.status === 'pending' && (
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button className="btn-ghost" style={{ color: 'var(--success)' }}><Check size={16} /></button>
                        <button className="btn-ghost" style={{ color: 'var(--error)' }}><X size={16} /></button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
