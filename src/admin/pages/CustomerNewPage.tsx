import { useState } from 'react';
import AdminHeader from './AdminHeader';
import { ArrowLeft, Building2, User } from 'lucide-react';

export default function CustomerNewPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    company_name: '', street: '', house_number: '', postal_code: '', city: '', industry: '', notes: '',
    contact_first_name: '', contact_last_name: '', contact_email: '', contact_phone: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    // Demo: just navigate back
    setTimeout(() => {
      window.history.pushState({}, '', '/admin/customers');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }, 500);
  };

  const s: Record<string, React.CSSProperties> = {
    page: { padding: 'calc(var(--header-height) + 24px) 24px 24px' },
    backBtn: { display: 'inline-flex', alignItems: 'center', gap: 8, background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: 14, marginBottom: 20, fontFamily: 'var(--font)' },
    formGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 },
    formFull: { gridColumn: '1 / -1' },
  };

  return (
    <>
      <AdminHeader title="Neuer Kunde" subtitle="Kundendaten erfassen" />
      <div style={s.page}>
        <button style={s.backBtn} onClick={() => { window.history.pushState({}, '', '/admin/customers'); window.dispatchEvent(new PopStateEvent('popstate')); }}>
          <ArrowLeft size={16} /> Zurueck
        </button>

        <form onSubmit={handleSubmit}>
          {error && <div style={{ background: 'rgba(237,50,31,0.1)', border: '1px solid rgba(237,50,31,0.2)', borderRadius: 'var(--radius)', padding: '12px 16px', color: '#ed321f', fontSize: 13, marginBottom: 20 }}>{error}</div>}

          <div className="card" style={{ marginBottom: 24 }}>
            <div className="card-header"><span className="card-title"><Building2 size={16} /> Unternehmensdaten</span></div>
            <div className="card-body">
              <div style={s.formGrid}>
                <div style={s.formFull}><label className="label">Firmenname *</label><input name="company_name" className="input" value={formData.company_name} onChange={handleChange} required /></div>
                <div><label className="label">Strasse</label><input name="street" className="input" value={formData.street} onChange={handleChange} /></div>
                <div><label className="label">Hausnummer</label><input name="house_number" className="input" value={formData.house_number} onChange={handleChange} /></div>
                <div><label className="label">PLZ</label><input name="postal_code" className="input" value={formData.postal_code} onChange={handleChange} /></div>
                <div><label className="label">Stadt</label><input name="city" className="input" value={formData.city} onChange={handleChange} /></div>
                <div style={s.formFull}><label className="label">Branche</label><input name="industry" className="input" value={formData.industry} onChange={handleChange} /></div>
                <div style={s.formFull}><label className="label">Notizen</label><textarea name="notes" className="textarea" value={formData.notes} onChange={handleChange} /></div>
              </div>
            </div>
          </div>

          <div className="card" style={{ marginBottom: 24 }}>
            <div className="card-header"><span className="card-title"><User size={16} /> Ansprechpartner</span></div>
            <div className="card-body">
              <div style={s.formGrid}>
                <div><label className="label">Vorname</label><input name="contact_first_name" className="input" value={formData.contact_first_name} onChange={handleChange} /></div>
                <div><label className="label">Nachname</label><input name="contact_last_name" className="input" value={formData.contact_last_name} onChange={handleChange} /></div>
                <div><label className="label">E-Mail</label><input name="contact_email" className="input" type="email" value={formData.contact_email} onChange={handleChange} /></div>
                <div><label className="label">Telefon</label><input name="contact_phone" className="input" value={formData.contact_phone} onChange={handleChange} /></div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
            <button type="button" className="btn-secondary" onClick={() => { window.history.pushState({}, '', '/admin/customers'); window.dispatchEvent(new PopStateEvent('popstate')); }}>Abbrechen</button>
            <button type="submit" className="btn-primary" disabled={isSubmitting}>{isSubmitting ? 'Speichere...' : 'Kunde anlegen'}</button>
          </div>
        </form>
      </div>
    </>
  );
}
