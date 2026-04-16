import AdminHeader from './AdminHeader';
import { BookOpen, Plus } from 'lucide-react';

const demoBookings = [
  { id: '1', partner: 'Michael Hartmann', type: 'Bonus', amount: 500, description: 'Quartalbonus Q1', date: '2026-03-15', status: 'pending' },
  { id: '2', partner: 'Sarah Wagner', type: 'Korrektur', amount: -120, description: 'Storno Vertrag #234', date: '2026-03-12', status: 'booked' },
  { id: '3', partner: 'Thomas Mueller', type: 'Bonus', amount: 250, description: 'Neukundenpraemie', date: '2026-03-10', status: 'booked' },
];

export default function ManualBookingsPage() {
  return (
    <>
      <AdminHeader title="Manuelle Buchungen" subtitle={`${demoBookings.length} Buchungen`} />
      <div style={{ padding: 'calc(var(--header-height) + 24px) 24px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 20 }}>
          <button className="btn-primary"><Plus size={16} /> Neue Buchung</button>
        </div>
        <div className="card">
          <table className="table">
            <thead><tr><th>Partner</th><th>Typ</th><th>Betrag</th><th>Beschreibung</th><th>Datum</th><th>Status</th></tr></thead>
            <tbody>
              {demoBookings.map(b => (
                <tr key={b.id}>
                  <td style={{ fontWeight: 600 }}>{b.partner}</td>
                  <td><span className={`badge ${b.type === 'Bonus' ? 'badge-success' : 'badge-warning'}`}>{b.type}</span></td>
                  <td style={{ fontWeight: 600, color: b.amount >= 0 ? 'var(--success)' : 'var(--error)' }}>{b.amount >= 0 ? '+' : ''}{'\u20AC'}{b.amount.toLocaleString('de-DE')}</td>
                  <td>{b.description}</td>
                  <td style={{ color: 'var(--text-muted)' }}>{b.date}</td>
                  <td><span className={`badge ${b.status === 'booked' ? 'badge-success' : 'badge-info'}`}>{b.status === 'booked' ? 'Gebucht' : 'Ausstehend'}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
