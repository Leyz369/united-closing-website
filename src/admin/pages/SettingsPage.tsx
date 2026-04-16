import AdminHeader from './AdminHeader';
import { Settings, Mail, Inbox, Building2, Bell, Lock, Globe } from 'lucide-react';

const settingsCategories = [
  { title: 'E-Mail-Vorlagen', description: 'E-Mail-Vorlagen fuer automatische Benachrichtigungen verwalten', icon: Mail, href: '/admin/email-templates', available: true },
  { title: 'Posteingang', description: 'IMAP-Posteingang und automatische Zuordnung konfigurieren', icon: Inbox, href: '/admin/inbox', available: true },
  { title: 'Unternehmensdaten', description: 'Firmenname, Adresse und Kontaktdaten bearbeiten', icon: Building2, href: '#', available: false },
  { title: 'Benachrichtigungen', description: 'Benachrichtigungseinstellungen und E-Mail-Praeferenzen', icon: Bell, href: '#', available: false },
  { title: 'Sicherheit', description: 'Passwort aendern, 2FA und Zugriffsrechte', icon: Lock, href: '#', available: false },
  { title: 'API & Integrationen', description: 'SignWell, Resend und externe Dienste konfigurieren', icon: Globe, href: '#', available: false },
];

export default function SettingsPage() {
  return (
    <>
      <AdminHeader title="Einstellungen" />
      <div style={{ padding: 'calc(var(--header-height) + 24px) 24px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
          {settingsCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <a
                key={cat.title}
                href={cat.available ? cat.href : undefined}
                onClick={(e) => { if (cat.available) { e.preventDefault(); window.history.pushState({}, '', cat.href); window.dispatchEvent(new PopStateEvent('popstate')); } }}
                style={{ textDecoration: 'none' }}
              >
                <div className="card" style={{ padding: 24, opacity: cat.available ? 1 : 0.5, cursor: cat.available ? 'pointer' : 'default', transition: 'all 0.2s' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ width: 48, height: 48, borderRadius: 'var(--radius)', background: 'rgba(122,162,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon size={20} style={{ color: 'var(--primary)' }} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--text)', marginBottom: 4 }}>{cat.title}</div>
                      <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{cat.description}</div>
                    </div>
                  </div>
                  {!cat.available && <span className="badge badge-info" style={{ marginTop: 12 }}>Demnachst</span>}
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </>
  );
}
