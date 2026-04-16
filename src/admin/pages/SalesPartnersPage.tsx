import { useState } from 'react';
import AdminHeader from './AdminHeader';
import { Search, Handshake, ChevronRight, Users, Plus } from 'lucide-react';

interface Partner {
  id: string;
  first_name: string;
  last_name: string;
  company_name: string | null;
  email: string;
  city: string | null;
  is_active: boolean;
  career_level: string | null;
  partner_number: number | null;
  role_name: string;
  commission_display: string;
}

const demoPartners: Partner[] = [
  { id: 'vp-1', first_name: 'Michael', last_name: 'Hartmann', company_name: 'DGE24 Vertrieb GmbH', email: 'hartmann@dge24.de', city: 'Berlin', is_active: true, career_level: 'Direktor', partner_number: 10000, role_name: 'Direktor', commission_display: '12%' },
  { id: 'vp-2', first_name: 'Sarah', last_name: 'Wagner', company_name: 'Wagner Energie GmbH', email: 'sarah.wagner@partner.de', city: 'Hamburg', is_active: true, career_level: 'Branch Manager', partner_number: 10001, role_name: 'Branch Manager', commission_display: '0,35 ct/kWh' },
  { id: 'vp-3', first_name: 'Thomas', last_name: 'Mueller', company_name: null, email: 'thomas.mueller@partner.de', city: 'Koeln', is_active: true, career_level: 'Senior Berater', partner_number: 10002, role_name: 'Vertriebspartner', commission_display: '0,35 ct/kWh' },
  { id: 'vp-4', first_name: 'Lisa', last_name: 'Schmidt', company_name: null, email: 'lisa.schmidt@partner.de', city: 'Muenchen', is_active: true, career_level: 'Berater', partner_number: 10003, role_name: 'Vertriebspartner', commission_display: '0,30 ct/kWh' },
  { id: 'vp-5', first_name: 'Markus', last_name: 'Klein', company_name: 'Klein & Partner', email: 'markus.klein@partner.de', city: 'Frankfurt', is_active: false, career_level: 'Teamleiter', partner_number: 10004, role_name: 'Closer', commission_display: '0,20 ct/kWh' },
  { id: 'vp-6', first_name: 'Anna', last_name: 'Becker', company_name: 'Becker Solutions', email: 'anna.becker@partner.de', city: 'Stuttgart', is_active: true, career_level: 'Berater', partner_number: 10005, role_name: 'Vertriebspartner', commission_display: '0,30 ct/kWh' },
];

export default function SalesPartnersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = demoPartners.filter(p => {
    const name = `${p.first_name} ${p.last_name} ${p.company_name || ''}`.toLowerCase();
    const matchesSearch = name.includes(searchQuery.toLowerCase()) || p.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || (statusFilter === 'active' ? p.is_active : !p.is_active);
    return matchesSearch && matchesStatus;
  });

  return (
    <>
      <AdminHeader title="Vertriebspartner" subtitle={`${demoPartners.length} Partner insgesamt`} />
      <div style={{ padding: 'calc(var(--header-height) + 24px) 24px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ position: 'relative', width: 300 }}>
              <Search size={14} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }} />
              <input type="text" placeholder="Partner suchen..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="input" style={{ paddingLeft: 40 }} />
            </div>
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="select" style={{ width: 180 }}>
              <option value="all">Alle Status</option>
              <option value="active">Aktiv</option>
              <option value="inactive">Inaktiv</option>
            </select>
          </div>
          <button className="btn-primary"><Plus size={16} /> Neuer Partner</button>
        </div>

        <div className="card">
          <table className="table">
            <thead><tr><th>Nr.</th><th>Partner</th><th>Ort</th><th>Rolle</th><th>Karrierestufe</th><th>Provision</th><th>Status</th><th></th></tr></thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id}>
                  <td style={{ fontFamily: 'monospace', fontSize: 12, color: 'var(--text-muted)' }}>{p.partner_number}</td>
                  <td>
                    <a href={`/admin/sales-partners/${p.id}`} style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}
                      onClick={(e) => { e.preventDefault(); window.history.pushState({}, '', `/admin/sales-partners/${p.id}`); window.dispatchEvent(new PopStateEvent('popstate')); }}>
                      <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(122,162,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#7AA2FF' }}>
                        {p.first_name[0]}{p.last_name[0]}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, color: 'var(--text)' }}>{p.first_name} {p.last_name}</div>
                        {p.company_name && <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{p.company_name}</div>}
                      </div>
                    </a>
                  </td>
                  <td>{p.city}</td>
                  <td><span className="badge badge-primary">{p.role_name}</span></td>
                  <td>{p.career_level}</td>
                  <td style={{ fontWeight: 600 }}>{p.commission_display}</td>
                  <td><span className={`badge ${p.is_active ? 'badge-success' : 'badge-error'}`}>{p.is_active ? 'Aktiv' : 'Inaktiv'}</span></td>
                  <td>
                    <a href={`/admin/sales-partners/${p.id}`} className="btn-ghost"
                      onClick={(e) => { e.preventDefault(); window.history.pushState({}, '', `/admin/sales-partners/${p.id}`); window.dispatchEvent(new PopStateEvent('popstate')); }}>
                      <ChevronRight size={16} />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="empty-state">
              <Users size={32} style={{ opacity: 0.5, marginBottom: 16 }} />
              <p className="empty-state-title">Keine Partner gefunden</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
