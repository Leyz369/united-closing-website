import AdminHeader from './AdminHeader';
import { Shield, Plus, Edit2 } from 'lucide-react';

const demoRoles = [
  { id: '1', name: 'Direktor', description: 'Vertriebsdirektor', commissionType: 'percentage', commissionValue: 12, isActive: true, partnersCount: 1 },
  { id: '2', name: 'Branch Manager', description: 'Filialeiter', commissionType: 'fixed_ct_kwh', commissionValue: 0.35, isActive: true, partnersCount: 2 },
  { id: '3', name: 'Vertriebspartner', description: 'Standard VP', commissionType: 'fixed_ct_kwh', commissionValue: 0.30, isActive: true, partnersCount: 8 },
  { id: '4', name: 'Closer', description: 'Abschluss-Spezialist', commissionType: 'fixed_ct_kwh', commissionValue: 0.20, isActive: true, partnersCount: 4 },
];

export default function PartnerRolesPage() {
  return (
    <>
      <AdminHeader title="Partnerrollen" subtitle="Rollen und Provisionsmodelle" />
      <div style={{ padding: 'calc(var(--header-height) + 24px) 24px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 20 }}>
          <button className="btn-primary"><Plus size={16} /> Neue Rolle</button>
        </div>
        <div className="card">
          <table className="table">
            <thead><tr><th>Rolle</th><th>Beschreibung</th><th>Provision</th><th>Partner</th><th>Status</th><th></th></tr></thead>
            <tbody>
              {demoRoles.map(r => (
                <tr key={r.id}>
                  <td style={{ fontWeight: 600 }}>{r.name}</td>
                  <td>{r.description}</td>
                  <td style={{ fontWeight: 600 }}>{r.commissionType === 'percentage' ? `${r.commissionValue}%` : `${r.commissionValue.toFixed(2).replace('.', ',')} ct/kWh`}</td>
                  <td>{r.partnersCount}</td>
                  <td><span className="badge badge-success">Aktiv</span></td>
                  <td><button className="btn-ghost"><Edit2 size={14} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
