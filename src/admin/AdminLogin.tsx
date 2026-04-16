import { useState } from 'react';
import { Lock, Mail, AlertCircle, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../lib/authContext';

interface AdminLoginProps {
  onSuccess: () => void;
}

export default function AdminLogin({ onSuccess }: AdminLoginProps) {
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
      setError('E-Mail oder Passwort falsch.');
    } else {
      onSuccess();
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: '#232a31',
    border: '1px solid #3a4551',
    borderRadius: '0.35rem',
    padding: '11px 14px 11px 40px',
    color: '#aab8c5',
    fontSize: '14px',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    outline: 'none',
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 16px',
        background: '#191e23',
      }}
    >
      <div style={{ width: '100%', maxWidth: '380px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ marginBottom: '16px' }}>
            <img
              src="/logos/uc-monogram.webp"
              alt="United Closing"
              style={{ width: 64, height: 64, objectFit: 'contain' }}
            />
          </div>
          <h1 style={{ fontSize: '20px', fontWeight: 700, color: '#f1f1f1', marginBottom: '4px' }}>United Closing Admin</h1>
          <p style={{ fontSize: '13px', color: '#687d92' }}>Bitte mit Admin-Zugangsdaten anmelden</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div
            style={{
              background: '#1d2329',
              border: '1px solid #272f37',
              borderRadius: '0.5rem',
              padding: '28px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            {error && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'rgba(237,50,31,0.1)',
                  border: '1px solid rgba(237,50,31,0.2)',
                  borderRadius: '0.35rem',
                  padding: '10px 12px',
                  color: '#ed321f',
                  fontSize: '13px',
                }}
              >
                <AlertCircle size={15} />
                {error}
              </div>
            )}

            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#aab8c5', marginBottom: '0.4rem' }}>
                E-Mail-Adresse
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} style={{ position: 'absolute', left: '13px', top: '50%', transform: 'translateY(-50%)', color: '#687d92', pointerEvents: 'none' }} />
                <input
                  type="email"
                  placeholder="name@firma.de"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  style={inputStyle}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#aab8c5', marginBottom: '0.4rem' }}>
                Passwort
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} style={{ position: 'absolute', left: '13px', top: '50%', transform: 'translateY(-50%)', color: '#687d92', pointerEvents: 'none' }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Passwort"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  style={inputStyle}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute', right: '13px', top: '50%', transform: 'translateY(-50%)',
                    background: 'transparent', border: 'none', color: '#687d92', cursor: 'pointer', padding: 0,
                  }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                background: loading ? 'rgba(122,162,255,0.4)' : '#7AA2FF',
                color: '#0a1628',
                fontWeight: 700,
                fontSize: '14px',
                padding: '12px',
                borderRadius: '0.35rem',
                border: 'none',
                cursor: loading ? 'default' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                transition: 'opacity 0.15s',
              }}
            >
              {loading ? 'Anmeldung...' : (<>Anmelden <ArrowRight size={16} /></>)}
            </button>
          </div>
        </form>

        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <a href="/" style={{ fontSize: '13px', color: '#687d92', textDecoration: 'none' }}>
            Zur Website
          </a>
        </div>
      </div>
    </div>
  );
}
