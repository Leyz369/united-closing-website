import AdminHeader from './AdminHeader';
import { CreditCard } from 'lucide-react';

export default function BillingPage() {
  return (
    <>
      <AdminHeader title="Abrechnung" subtitle="Rechnungen und Zahlungen" />
      <div style={{ padding: 'calc(var(--header-height) + 24px) 24px 24px' }}>
        <div className="card">
          <div className="card-body">
            <div className="empty-state">
              <CreditCard size={48} style={{ opacity: 0.3, marginBottom: 16 }} />
              <div className="empty-state-title">Abrechnung</div>
              <div className="empty-state-text">Abrechnungsmodul wird eingerichtet...</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
