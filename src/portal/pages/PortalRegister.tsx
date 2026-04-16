import { useState } from 'react';
import { User, Mail, Lock, Building2, ArrowRight } from 'lucide-react';

export default function PortalRegister() {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', company: '', password: '', passwordConfirm: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { setFormData(prev => ({ ...prev, [e.target.name]: e.target.value })); };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      window.history.pushState({}, '', '/portal/login');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }, 1000);
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', background: '#232a31', border: '1px solid #3a4551', borderRadius: '0.35rem',
    padding: '11px 14px', color: '#aab8c5', fontSize: '14px', fontFamily: "'Plus Jakarta Sans', sans-serif", outline: 'none',
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 16px', background: '#191e23' }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <img src="/logos/uc-monogram.webp" alt="United Closing" style={{ width: 48, height: 48, objectFit: 'contain', marginBottom: 12 }} />
          <h1 style={{ fontSize: '20px', fontWeight: 700, color: '#f1f1f1', marginBottom: '4px' }}>Registrierung</h1>
          <p style={{ fontSize: '13px', color: '#687d92' }}>Erstellen Sie Ihr Partner-Konto</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ background: '#1d2329', border: '1px solid #272f37', borderRadius: '0.5rem', padding: '28px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div><label style={{ display: 'block', fontSize: 13, color: '#aab8c5', marginBottom: 4 }}>Vorname</label><input name="firstName" value={formData.firstName} onChange={handleChange} required style={inputStyle} /></div>
              <div><label style={{ display: 'block', fontSize: 13, color: '#aab8c5', marginBottom: 4 }}>Nachname</label><input name="lastName" value={formData.lastName} onChange={handleChange} required style={inputStyle} /></div>
            </div>
            <div><label style={{ display: 'block', fontSize: 13, color: '#aab8c5', marginBottom: 4 }}>E-Mail</label><input name="email" type="email" value={formData.email} onChange={handleChange} required style={inputStyle} /></div>
            <div><label style={{ display: 'block', fontSize: 13, color: '#aab8c5', marginBottom: 4 }}>Firma (optional)</label><input name="company" value={formData.company} onChange={handleChange} style={inputStyle} /></div>
            <div><label style={{ display: 'block', fontSize: 13, color: '#aab8c5', marginBottom: 4 }}>Passwort</label><input name="password" type="password" value={formData.password} onChange={handleChange} required style={inputStyle} /></div>
            <div><label style={{ display: 'block', fontSize: 13, color: '#aab8c5', marginBottom: 4 }}>Passwort bestaetigen</label><input name="passwordConfirm" type="password" value={formData.passwordConfirm} onChange={handleChange} required style={inputStyle} /></div>
            <button type="submit" disabled={loading} style={{ background: '#7AA2FF', color: '#0a1628', fontWeight: 700, fontSize: 14, padding: 12, borderRadius: '0.35rem', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontFamily: "'Plus Jakarta Sans', sans-serif", marginTop: 8 }}>
              {loading ? 'Registrierung...' : (<>Registrieren <ArrowRight size={16} /></>)}
            </button>
          </div>
        </form>

        <div style={{ textAlign: 'center', marginTop: '16px' }}>
          <a href="/portal/login" style={{ fontSize: '13px', color: '#7AA2FF', textDecoration: 'none' }} onClick={(e) => { e.preventDefault(); window.history.pushState({}, '', '/portal/login'); window.dispatchEvent(new PopStateEvent('popstate')); }}>
            Bereits registriert? Anmelden
          </a>
        </div>
      </div>
    </div>
  );
}
