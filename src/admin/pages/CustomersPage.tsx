import { useState, useEffect, useCallback } from 'react';
import AdminHeader from './AdminHeader';
import { Search, Zap, Flame, Pencil, ClipboardList, Users } from 'lucide-react';

interface CustomerListItem {
  id: string;
  company_name: string;
  city: string;
  industry: string;
  electricity_points: number;
  gas_points: number;
  total_consumption_kwh: number;
  status: string;
  assigned_to: string;
}

const mockCustomers: CustomerListItem[] = [
  { id: '1', company_name: 'Hausverwaltung Wiesemeyer GmbH', city: 'Hamburg', industry: 'Immobilien / WEG', electricity_points: 8, gas_points: 4, total_consumption_kwh: 245000, status: 'active', assigned_to: 'Max Hopff' },
  { id: '2', company_name: 'Flexschlauch Produktions GmbH', city: 'Luebeck', industry: 'Produktion / Industrie', electricity_points: 1, gas_points: 2, total_consumption_kwh: 84000, status: 'pending', assigned_to: 'Max Hopff' },
  { id: '3', company_name: 'Friederike K. de Jong Immobilienverwaltung', city: 'Kiel', industry: 'Immobilien / WEG', electricity_points: 5, gas_points: 3, total_consumption_kwh: 156000, status: 'active', assigned_to: 'Lisa Schmidt' },
  { id: '4', company_name: 'WEG Heinrich-Heine-Gaerten 2a', city: 'Duesseldorf', industry: 'Immobilien / WEG', electricity_points: 1, gas_points: 0, total_consumption_kwh: 24500, status: 'active', assigned_to: 'Max Hopff' },
  { id: '5', company_name: 'WEG Compesmuhlenweg 127', city: 'Moenchengladbach', industry: 'Immobilien / WEG', electricity_points: 0, gas_points: 1, total_consumption_kwh: 260000, status: 'active', assigned_to: 'Lisa Schmidt' },
];

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [customers] = useState<CustomerListItem[]>(mockCustomers);

  const filteredCustomers = customers.filter((c) => {
    const matchesSearch = c.company_name.toLowerCase().includes(searchQuery.toLowerCase()) || c.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const s: Record<string, React.CSSProperties> = {
    page: { padding: 'calc(var(--header-height) + 24px) 24px 24px' },
    toolbar: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, gap: 16 },
    toolbarLeft: { display: 'flex', alignItems: 'center', gap: 12 },
    searchField: { position: 'relative', width: 300 },
    searchIcon: { position: 'absolute' as const, left: 14, top: '50%', transform: 'translateY(-50%)', opacity: 0.5 },
    pointBadge: { display: 'inline-flex', alignItems: 'center', gap: 4, padding: '4px 8px', borderRadius: 6, fontSize: 12, fontWeight: 600 },
  };

  return (
    <>
      <AdminHeader title="Kunden" subtitle={`${customers.length} Kunden insgesamt`} />
      <div style={s.page}>
        <div style={s.toolbar}>
          <div style={s.toolbarLeft}>
            <div style={s.searchField}>
              <span style={s.searchIcon}><Search size={14} /></span>
              <input type="text" placeholder="Kunde suchen..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="input" style={{ paddingLeft: 40 }} />
            </div>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="select" style={{ width: 180 }}>
              <option value="all">Alle Status</option>
              <option value="active">Aktiv</option>
              <option value="pending">In Bearbeitung</option>
              <option value="inactive">Inaktiv</option>
            </select>
          </div>
          <div>
            <a href="/admin/customers/new" className="btn-primary" onClick={(e) => { e.preventDefault(); window.history.pushState({}, '', '/admin/customers/new'); window.dispatchEvent(new PopStateEvent('popstate')); }}>
              <span>+</span> Neuer Kunde
            </a>
          </div>
        </div>

        <div className="card">
          <table className="table">
            <thead>
              <tr><th>Kunde</th><th>Ort</th><th>Branche</th><th>Lieferstellen</th><th>Gesamtverbrauch</th><th>Status</th><th>Zustaendig</th><th></th></tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer.id}>
                  <td>
                    <a href={`/admin/customers/${customer.id}`} style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}
                      onClick={(e) => { e.preventDefault(); window.history.pushState({}, '', `/admin/customers/${customer.id}`); window.dispatchEvent(new PopStateEvent('popstate')); }}>
                      <div style={{ width: 36, height: 36, background: 'var(--bg-light)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: 'var(--primary)' }}>
                        {customer.company_name.charAt(0)}
                      </div>
                      <span style={{ fontWeight: 600, color: 'var(--text)' }}>{customer.company_name}</span>
                    </a>
                  </td>
                  <td>{customer.city}</td>
                  <td><span style={{ display: 'inline-block', padding: '4px 10px', background: 'var(--bg-light)', borderRadius: 6, fontSize: 12, color: 'var(--text-muted)' }}>{customer.industry}</span></td>
                  <td>
                    <div style={{ display: 'flex', gap: 8 }}>
                      {customer.electricity_points > 0 && <span style={{ ...s.pointBadge, background: 'rgba(59,130,246,0.15)', color: '#3b82f6' }}><Zap size={14} /> {customer.electricity_points}</span>}
                      {customer.gas_points > 0 && <span style={{ ...s.pointBadge, background: 'rgba(245,158,11,0.15)', color: '#f59e0b' }}><Flame size={14} /> {customer.gas_points}</span>}
                    </div>
                  </td>
                  <td><span style={{ fontWeight: 600, color: 'var(--primary)' }}>{(customer.total_consumption_kwh / 1000).toFixed(0)} MWh/Jahr</span></td>
                  <td>
                    <span className={`badge ${customer.status === 'active' ? 'badge-success' : customer.status === 'pending' ? 'badge-warning' : 'badge-info'}`}>
                      {customer.status === 'active' ? 'Aktiv' : customer.status === 'pending' ? 'In Bearbeitung' : 'Inaktiv'}
                    </span>
                  </td>
                  <td style={{ fontSize: 13, color: 'var(--text-muted)' }}>{customer.assigned_to}</td>
                  <td>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <a href={`/admin/customers/${customer.id}`} style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: '1px solid var(--border)', borderRadius: 8, textDecoration: 'none', color: 'var(--text-body)' }}
                        onClick={(e) => { e.preventDefault(); window.history.pushState({}, '', `/admin/customers/${customer.id}`); window.dispatchEvent(new PopStateEvent('popstate')); }}>
                        <Pencil size={14} />
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredCustomers.length === 0 && (
            <div className="empty-state">
              <Users size={32} style={{ opacity: 0.5, marginBottom: 16 }} />
              <p className="empty-state-title">Keine Kunden gefunden</p>
              <p className="empty-state-text">{searchQuery ? `Keine Ergebnisse fuer "${searchQuery}"` : 'Legen Sie Ihren ersten Kunden an'}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
