import { useState } from 'react';
import AdminHeader from './AdminHeader';
import { ArrowLeft, Zap, Flame, MapPin, Building2, User, Phone, Mail } from 'lucide-react';

const mockCustomerData: Record<string, any> = {
  '1': {
    id: '1', company_name: 'Flexschlauch Produktions GmbH', type: 'gewerbe', street: 'Roggenhorster Str. 9', postal_code: '23556', city: 'Luebeck', industry: 'Produktion / Industrie', status: 'active',
    contacts: [{ id: '1', first_name: 'Thomas', last_name: 'Mueller', email: 'mueller@flexschlauch.de', phone: '0451-123456', is_primary: true }],
    supply_points: [
      { id: '1', type: 'gas', name: 'Hauptgebaeude', street: 'Roggenhorster Str.', house_number: '9', postal_code: '23556', city: 'Luebeck', meter_number: 'G-2847561', annual_consumption_kwh: 30250, current_supplier: '1-2-3energie' },
      { id: '2', type: 'gas', name: 'Lagerhalle', street: 'Roggenhorster Str.', house_number: '11', postal_code: '23556', city: 'Luebeck', meter_number: 'G-2847562', annual_consumption_kwh: 53750, current_supplier: 'Vattenfall' },
    ],
  },
  '2': {
    id: '2', company_name: 'Hausverwaltung Wiesemeyer GmbH', type: 'gewerbe', street: 'Hamburger Str. 12', postal_code: '20095', city: 'Hamburg', industry: 'Immobilien / WEG', status: 'active',
    contacts: [{ id: '1', first_name: 'Maria', last_name: 'Wiesemeyer', email: 'info@wiesemeyer.de', phone: '040-987654', is_primary: true }],
    supply_points: [
      { id: '1', type: 'electricity', name: 'Buero', street: 'Hamburger Str.', house_number: '12', postal_code: '20095', city: 'Hamburg', meter_number: 'S-123456', annual_consumption_kwh: 45000, current_supplier: 'Vattenfall' },
    ],
  },
};

interface CustomerDetailPageProps { customerId: string; }

export default function CustomerDetailPage({ customerId }: CustomerDetailPageProps) {
  const customer = mockCustomerData[customerId] || { id: customerId, company_name: 'Unbekannter Kunde', contacts: [], supply_points: [], status: 'active', city: '', industry: '' };
  const [activeTab, setActiveTab] = useState<'overview' | 'supply' | 'contacts'>('overview');

  const s: Record<string, React.CSSProperties> = {
    page: { padding: 'calc(var(--header-height) + 24px) 24px 24px' },
    backBtn: { display: 'inline-flex', alignItems: 'center', gap: 8, background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: 14, marginBottom: 20, fontFamily: 'var(--font)' },
    tabs: { display: 'flex', gap: 4, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 4, marginBottom: 24 },
    tab: { padding: '8px 20px', borderRadius: 'var(--radius-sm)', border: 'none', background: 'transparent', color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: 500, cursor: 'pointer', fontFamily: 'var(--font)' },
    tabActive: { background: 'var(--primary)', color: '#0a1628' },
    infoGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginBottom: 24 },
    infoItem: { display: 'flex', alignItems: 'center', gap: 10 },
    infoLabel: { fontSize: 12, color: 'var(--text-muted)', marginBottom: 4 },
    infoValue: { fontSize: 14, fontWeight: 600, color: 'var(--text)' },
  };

  return (
    <>
      <AdminHeader title={customer.company_name} subtitle={`${customer.city} - ${customer.industry}`} />
      <div style={s.page}>
        <button style={s.backBtn} onClick={() => { window.history.pushState({}, '', '/admin/customers'); window.dispatchEvent(new PopStateEvent('popstate')); }}>
          <ArrowLeft size={16} /> Zurueck zur Kundenliste
        </button>

        <div style={s.tabs}>
          {(['overview', 'supply', 'contacts'] as const).map(t => (
            <button key={t} style={{ ...s.tab, ...(activeTab === t ? s.tabActive : {}) }} onClick={() => setActiveTab(t)}>
              {t === 'overview' ? 'Uebersicht' : t === 'supply' ? 'Lieferstellen' : 'Kontakte'}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="card">
            <div className="card-header"><span className="card-title"><Building2 size={16} /> Unternehmensdaten</span></div>
            <div className="card-body">
              <div style={s.infoGrid}>
                <div><div style={s.infoLabel}>Firma</div><div style={s.infoValue}>{customer.company_name}</div></div>
                <div><div style={s.infoLabel}>Status</div><div><span className={`badge ${customer.status === 'active' ? 'badge-success' : 'badge-warning'}`}>{customer.status === 'active' ? 'Aktiv' : 'In Bearbeitung'}</span></div></div>
                <div><div style={s.infoLabel}>Adresse</div><div style={s.infoValue}>{customer.street}, {customer.postal_code} {customer.city}</div></div>
                <div><div style={s.infoLabel}>Branche</div><div style={s.infoValue}>{customer.industry}</div></div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'supply' && (
          <div className="card">
            <div className="card-header"><span className="card-title"><MapPin size={16} /> Lieferstellen ({customer.supply_points.length})</span></div>
            <div className="card-body" style={{ padding: 0 }}>
              <table className="table">
                <thead><tr><th>Name</th><th>Typ</th><th>Adresse</th><th>Zaehler</th><th>Verbrauch</th><th>Lieferant</th></tr></thead>
                <tbody>
                  {customer.supply_points.map((sp: any) => (
                    <tr key={sp.id}>
                      <td style={{ fontWeight: 600 }}>{sp.name}</td>
                      <td><span className={`badge ${sp.type === 'gas' ? 'badge-gas' : 'badge-strom'}`}>{sp.type === 'gas' ? <><Flame size={12} /> Gas</> : <><Zap size={12} /> Strom</>}</span></td>
                      <td>{sp.street} {sp.house_number}, {sp.postal_code} {sp.city}</td>
                      <td style={{ fontFamily: 'monospace', fontSize: 12 }}>{sp.meter_number}</td>
                      <td style={{ fontWeight: 600, color: 'var(--primary)' }}>{(sp.annual_consumption_kwh / 1000).toFixed(1)} MWh/a</td>
                      <td>{sp.current_supplier}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'contacts' && (
          <div className="card">
            <div className="card-header"><span className="card-title"><User size={16} /> Kontakte ({customer.contacts.length})</span></div>
            <div className="card-body" style={{ padding: 0 }}>
              <table className="table">
                <thead><tr><th>Name</th><th>E-Mail</th><th>Telefon</th><th>Primaer</th></tr></thead>
                <tbody>
                  {customer.contacts.map((c: any) => (
                    <tr key={c.id}>
                      <td style={{ fontWeight: 600 }}>{c.first_name} {c.last_name}</td>
                      <td><Mail size={12} style={{ display: 'inline', marginRight: 6 }} />{c.email}</td>
                      <td><Phone size={12} style={{ display: 'inline', marginRight: 6 }} />{c.phone}</td>
                      <td>{c.is_primary ? <span className="badge badge-success">Ja</span> : '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
