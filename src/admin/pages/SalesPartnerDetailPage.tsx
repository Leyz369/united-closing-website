import { useState } from 'react';
import AdminHeader from './AdminHeader';
import { ArrowLeft, User, Mail, Phone, MapPin, Building2, FileText, Receipt, BookOpen, Shield, Settings, History, Users, Handshake, Globe } from 'lucide-react';

type Tab = 'uebersicht' | 'stammdaten' | 'kommunikation' | 'vertraege' | 'kunden' | 'provisionen' | 'abrechnungen' | 'vereinbarungen' | 'buchungen' | 'konten' | 'abrechnung_settings' | 'portal' | 'historie' | 'dokumente';

const TABS: { key: Tab; label: string }[] = [
  { key: 'uebersicht', label: 'Uebersicht' }, { key: 'stammdaten', label: 'Stammdaten' },
  { key: 'kommunikation', label: 'Kommunikation' }, { key: 'vertraege', label: 'Vertraege' },
  { key: 'kunden', label: 'Kunden' }, { key: 'provisionen', label: 'Provisionen' },
  { key: 'abrechnungen', label: 'Abrechnungen' }, { key: 'vereinbarungen', label: 'Vereinbarungen' },
  { key: 'buchungen', label: 'Buchungen' }, { key: 'konten', label: 'Konten' },
  { key: 'abrechnung_settings', label: 'Abr.-Einstellungen' }, { key: 'portal', label: 'Portal' },
  { key: 'historie', label: 'Historie' }, { key: 'dokumente', label: 'Dokumente' },
];

const demoPartner = {
  id: 'vp-1', first_name: 'Michael', last_name: 'Hartmann', email: 'hartmann@dge24.de', phone: '+49 170 1234567',
  company_name: 'DGE24 Vertrieb GmbH', city: 'Berlin', street: 'Unter den Linden 42', postal_code: '10117',
  is_active: true, career_level: 'Direktor', partner_number: 10000, role_name: 'Direktor',
  commission_type: 'percentage', commission_value: 12, tax_id: '12/345/67890',
  iban: 'DE89 3704 0044 0532 0130 00', bic: 'COBADEFFXXX', bank_name: 'Commerzbank',
};

const demoContracts = [
  { id: '1', title: 'Vertriebspartnervertrag', status: 'signed', signed_at: '2025-01-15', valid_until: '2026-01-15' },
  { id: '2', title: 'Zusatzvereinbarung Provision', status: 'draft', signed_at: null, valid_until: null },
];

const demoCustomers = [
  { id: '1', name: 'Hausverwaltung Wiesemeyer GmbH', city: 'Hamburg', contracts: 3, status: 'active' },
  { id: '2', name: 'Flexschlauch Produktions GmbH', city: 'Luebeck', contracts: 2, status: 'active' },
];

const demoCommissions = [
  { id: '1', period: 'Maerz 2026', amount: 2450, status: 'pending', contracts: 5 },
  { id: '2', period: 'Februar 2026', amount: 1820, status: 'paid', contracts: 4 },
  { id: '3', period: 'Januar 2026', amount: 3100, status: 'paid', contracts: 7 },
];

const demoHistory = [
  { id: '1', action: 'Provisionsabrechnung erstellt', date: '2026-03-15 14:23', user: 'System' },
  { id: '2', action: 'Vertrag versendet', date: '2026-03-10 10:45', user: 'Max Hopff' },
  { id: '3', action: 'Stammdaten aktualisiert', date: '2026-03-05 09:12', user: 'Michael Hartmann' },
  { id: '4', action: 'Partner angelegt', date: '2025-01-01 08:00', user: 'System' },
];

interface Props { partnerId: string; }

export default function SalesPartnerDetailPage({ partnerId }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>('uebersicht');
  const p = demoPartner;

  const s: Record<string, React.CSSProperties> = {
    page: { padding: 'calc(var(--header-height) + 24px) 24px 24px' },
    backBtn: { display: 'inline-flex', alignItems: 'center', gap: 8, background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: 14, marginBottom: 20, fontFamily: 'var(--font)' },
    tabBar: { display: 'flex', gap: 2, overflowX: 'auto', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 4, marginBottom: 24 },
    tab: { padding: '8px 14px', borderRadius: 'var(--radius-sm)', border: 'none', background: 'transparent', color: 'var(--text-secondary)', fontSize: '0.8125rem', fontWeight: 500, cursor: 'pointer', fontFamily: 'var(--font)', whiteSpace: 'nowrap' as const },
    tabActive: { background: 'var(--primary)', color: '#0a1628' },
    infoGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 },
    infoItem: { marginBottom: 0 },
    infoLabel: { fontSize: 12, color: 'var(--text-muted)', marginBottom: 4 },
    infoValue: { fontSize: 14, fontWeight: 600, color: 'var(--text)' },
  };

  const renderTab = () => {
    switch (activeTab) {
      case 'uebersicht':
        return (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            <div className="card">
              <div className="card-header"><span className="card-title"><User size={16} /> Partnerdaten</span></div>
              <div className="card-body">
                <div style={s.infoGrid}>
                  <div><div style={s.infoLabel}>Name</div><div style={s.infoValue}>{p.first_name} {p.last_name}</div></div>
                  <div><div style={s.infoLabel}>Firma</div><div style={s.infoValue}>{p.company_name || '-'}</div></div>
                  <div><div style={s.infoLabel}>E-Mail</div><div style={s.infoValue}>{p.email}</div></div>
                  <div><div style={s.infoLabel}>Telefon</div><div style={s.infoValue}>{p.phone}</div></div>
                  <div><div style={s.infoLabel}>Karrierestufe</div><div style={s.infoValue}>{p.career_level}</div></div>
                  <div><div style={s.infoLabel}>Partnernummer</div><div style={s.infoValue}>{p.partner_number}</div></div>
                  <div><div style={s.infoLabel}>Provision</div><div style={s.infoValue}>{p.commission_value}%</div></div>
                  <div><div style={s.infoLabel}>Status</div><div><span className="badge badge-success">Aktiv</span></div></div>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-header"><span className="card-title"><Receipt size={16} /> Provisionen</span></div>
              <div className="card-body" style={{ padding: 0 }}>
                <table className="table">
                  <thead><tr><th>Periode</th><th>Betrag</th><th>Status</th></tr></thead>
                  <tbody>
                    {demoCommissions.map(c => (
                      <tr key={c.id}>
                        <td>{c.period}</td>
                        <td style={{ fontWeight: 600 }}>{'\u20AC'}{c.amount.toLocaleString('de-DE')}</td>
                        <td><span className={`badge ${c.status === 'paid' ? 'badge-success' : 'badge-warning'}`}>{c.status === 'paid' ? 'Bezahlt' : 'Ausstehend'}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      case 'stammdaten':
        return (
          <div className="card">
            <div className="card-header"><span className="card-title"><Building2 size={16} /> Stammdaten</span></div>
            <div className="card-body">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                <div><div style={s.infoLabel}>Vorname</div><div style={s.infoValue}>{p.first_name}</div></div>
                <div><div style={s.infoLabel}>Nachname</div><div style={s.infoValue}>{p.last_name}</div></div>
                <div><div style={s.infoLabel}>Firma</div><div style={s.infoValue}>{p.company_name || '-'}</div></div>
                <div><div style={s.infoLabel}>E-Mail</div><div style={s.infoValue}>{p.email}</div></div>
                <div><div style={s.infoLabel}>Telefon</div><div style={s.infoValue}>{p.phone}</div></div>
                <div><div style={s.infoLabel}>Stadt</div><div style={s.infoValue}>{p.city}</div></div>
                <div><div style={s.infoLabel}>Strasse</div><div style={s.infoValue}>{p.street}</div></div>
                <div><div style={s.infoLabel}>PLZ</div><div style={s.infoValue}>{p.postal_code}</div></div>
                <div><div style={s.infoLabel}>Steuernummer</div><div style={s.infoValue}>{p.tax_id}</div></div>
                <div><div style={s.infoLabel}>IBAN</div><div style={s.infoValue}>{p.iban}</div></div>
                <div><div style={s.infoLabel}>BIC</div><div style={s.infoValue}>{p.bic}</div></div>
                <div><div style={s.infoLabel}>Bank</div><div style={s.infoValue}>{p.bank_name}</div></div>
              </div>
            </div>
          </div>
        );
      case 'vertraege':
        return (
          <div className="card">
            <div className="card-header"><span className="card-title"><FileText size={16} /> Vertraege</span></div>
            <div className="card-body" style={{ padding: 0 }}>
              <table className="table">
                <thead><tr><th>Titel</th><th>Status</th><th>Unterschrieben</th><th>Gueltig bis</th></tr></thead>
                <tbody>
                  {demoContracts.map(c => (
                    <tr key={c.id}>
                      <td style={{ fontWeight: 600 }}>{c.title}</td>
                      <td><span className={`badge ${c.status === 'signed' ? 'badge-success' : 'badge-info'}`}>{c.status === 'signed' ? 'Unterschrieben' : 'Entwurf'}</span></td>
                      <td>{c.signed_at || '-'}</td>
                      <td>{c.valid_until || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'kunden':
        return (
          <div className="card">
            <div className="card-header"><span className="card-title"><Users size={16} /> Zugewiesene Kunden</span></div>
            <div className="card-body" style={{ padding: 0 }}>
              <table className="table">
                <thead><tr><th>Kunde</th><th>Ort</th><th>Vertraege</th><th>Status</th></tr></thead>
                <tbody>
                  {demoCustomers.map(c => (
                    <tr key={c.id}>
                      <td style={{ fontWeight: 600 }}>{c.name}</td>
                      <td>{c.city}</td>
                      <td>{c.contracts}</td>
                      <td><span className="badge badge-success">Aktiv</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'provisionen':
        return (
          <div className="card">
            <div className="card-header"><span className="card-title"><Receipt size={16} /> Provisionen</span></div>
            <div className="card-body" style={{ padding: 0 }}>
              <table className="table">
                <thead><tr><th>Periode</th><th>Vertraege</th><th>Betrag</th><th>Status</th></tr></thead>
                <tbody>
                  {demoCommissions.map(c => (
                    <tr key={c.id}>
                      <td>{c.period}</td>
                      <td>{c.contracts}</td>
                      <td style={{ fontWeight: 600 }}>{'\u20AC'}{c.amount.toLocaleString('de-DE')}</td>
                      <td><span className={`badge ${c.status === 'paid' ? 'badge-success' : 'badge-warning'}`}>{c.status === 'paid' ? 'Bezahlt' : 'Ausstehend'}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'historie':
        return (
          <div className="card">
            <div className="card-header"><span className="card-title"><History size={16} /> Aenderungsverlauf</span></div>
            <div className="card-body" style={{ padding: 0 }}>
              <table className="table">
                <thead><tr><th>Aktion</th><th>Datum</th><th>Benutzer</th></tr></thead>
                <tbody>
                  {demoHistory.map(h => (
                    <tr key={h.id}>
                      <td style={{ fontWeight: 500 }}>{h.action}</td>
                      <td style={{ color: 'var(--text-muted)', fontSize: 13 }}>{h.date}</td>
                      <td>{h.user}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      default:
        return (
          <div className="card">
            <div className="card-body">
              <div className="empty-state">
                <div className="empty-state-title">{TABS.find(t => t.key === activeTab)?.label}</div>
                <div className="empty-state-text">Diese Ansicht wird geladen...</div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <>
      <AdminHeader title={`${p.first_name} ${p.last_name}`} subtitle={`${p.company_name || ''} - ${p.role_name}`} />
      <div style={s.page}>
        <button style={s.backBtn} onClick={() => { window.history.pushState({}, '', '/admin/sales-partners'); window.dispatchEvent(new PopStateEvent('popstate')); }}>
          <ArrowLeft size={16} /> Zurueck zur Partnerliste
        </button>

        <div style={s.tabBar}>
          {TABS.map(t => (
            <button key={t.key} style={{ ...s.tab, ...(activeTab === t.key ? s.tabActive : {}) }} onClick={() => setActiveTab(t.key)}>
              {t.label}
            </button>
          ))}
        </div>

        {renderTab()}
      </div>
    </>
  );
}
