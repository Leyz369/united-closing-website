import { useState } from 'react';
import { useAuth } from '../lib/authContext';
import { Mail, Lock, Eye, EyeOff, AlertCircle, ArrowRight } from 'lucide-react';

interface PortalLoginProps {
  onSuccess: () => void;
}

export default function PortalLogin({ onSuccess }: PortalLoginProps) {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) {
      setError('Anmeldung fehlgeschlagen. Bitte pruefen Sie Ihre Zugangsdaten.');
    } else {
      onSuccess();
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', background: '#232a31', border: '1px solid #3a4551', borderRadius: '0.35rem',
    padding: '11px 14px 11px 40px', color: '#aab8c5', fontSize: '14px',
    fontFamily: "'Plus Jakarta Sans', sans-serif", outline: 'none',
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 16px', background: '#191e23' }}>
      <div style={{ width: '100%', maxWidth: '380px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ marginBottom: '16px' }}>
            <img src="/logos/uc-monogram.webp" alt="United Closing" style={{ width: 48, height: 48, objectFit: 'contain' }} />
          </div>
          <h1 style={{ fontSize: '20px', fontWeight: 700, color: '#f1f1f1', marginBottom: '4px' }}>Partner-Portal</h1>
          <p style={{ fontSize: '13px', color: '#687d92' }}>Melden Sie sich an, um fortzufahren</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ background: '#1d2329', border: '1px solid #272f37', borderRadius: '0.5rem', padding: '28px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {error && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(237,50,31,0.1)', border: '1px solid rgba(237,50,31,0.2)', borderRadius: '0.35rem', padding: '10px 12px', color: '#ed321f', fontSize: '13px' }}>
                <AlertCircle size={15} />{error}
              </div>
            )}
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#aab8c5', marginBottom: '0.4rem' }}>E-Mail-Adresse</label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} style={{ position: 'absolute', left: '13px', top: '50%', transform: 'translateY(-50%)', color: '#687d92', pointerEvents: 'none' }} />
                <input type="email" placeholder="name@firma.de" value={email} onChange={e => setEmail(e.target.value)} required autoComplete="email" style={inputStyle} />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#aab8c5', marginBottom: '0.4rem' }}>Passwort</label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} style={{ position: 'absolute', left: '13px', top: '50%', transform: 'translateY(-50%)', color: '#687d92', pointerEvents: 'none' }} />
                <input type={showPassword ? 'text' : 'password'} placeholder="Passwort" value={password} onChange={e => setPassword(e.target.value)} required style={inputStyle} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '13px', top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', color: '#687d92', cursor: 'pointer', padding: 0 }}>
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading} style={{ background: loading ? 'rgba(122,162,255,0.4)' : '#7AA2FF', color: '#0a1628', fontWeight: 700, fontSize: '14px', padding: '12px', borderRadius: '0.35rem', border: 'none', cursor: loading ? 'default' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              {loading ? 'Anmeldung...' : (<>Anmelden <ArrowRight size={16} /></>)}
            </button>
          </div>
        </form>

        <div style={{ textAlign: 'center', marginTop: '16px' }}>
          <a href="/portal/register" style={{ fontSize: '13px', color: '#7AA2FF', textDecoration: 'none' }} onClick={(e) => { e.preventDefault(); window.history.pushState({}, '', '/portal/register'); window.dispatchEvent(new PopStateEvent('popstate')); }}>
            Noch kein Konto? Registrieren
          </a>
        </div>
        <div style={{ textAlign: 'center', marginTop: '12px' }}>
          <a href="/" style={{ fontSize: '13px', color: '#687d92', textDecoration: 'none' }}>Zur Website</a>
        </div>
      </div>
    </div>
  );
}
