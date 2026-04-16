import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../lib/authContext';

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

export default function AdminHeader({ title, subtitle }: HeaderProps) {
  const { signOut } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [userName, setUserName] = useState('Demo Admin');
  const [userInitials, setUserInitials] = useState('DA');
  const [userRole, setUserRole] = useState('Administrator');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data } = await supabase
            .from('users')
            .select('first_name, last_name, role')
            .eq('id', user.id)
            .single();
          if (data) {
            const name = `${data.first_name || ''} ${data.last_name || ''}`.trim() || user.email || 'User';
            setUserName(name);
            const parts = name.split(' ');
            setUserInitials(parts.map((p: string) => p[0]).join('').toUpperCase().slice(0, 2));
            setUserRole(data.role === 'admin' ? 'Administrator' : data.role === 'manager' ? 'Manager' : data.role || '');
          }
        }
      } catch {
        // Keep demo defaults
      }
    };
    fetchUser();
  }, []);

  return (
    <header className="admin-header">
      <div className="admin-header-title">
        {title && <h4>{title}</h4>}
        {subtitle && <p>{subtitle}</p>}
      </div>
      <div className="admin-header-actions">
        <div className="admin-search-box">
          <svg className="admin-search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="text"
            placeholder="Suchen..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="admin-search-input"
          />
        </div>
        <button className="admin-topbar-button" title="Benachrichtigungen">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
          </svg>
        </button>
        <div style={{ position: 'relative' }}>
          <button className="admin-topbar-button" onClick={() => setShowUserMenu(!showUserMenu)} style={{ padding: 0, width: 38, height: 38 }}>
            <div style={{ width: 32, height: 32, background: 'rgba(122,162,255,0.15)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#7AA2FF' }}>
              {userInitials}
            </div>
          </button>
          {showUserMenu && (
            <div className="admin-user-dropdown">
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px' }}>
                <div style={{ width: 36, height: 36, background: 'rgba(122,162,255,0.15)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#7AA2FF', flexShrink: 0 }}>
                  {userInitials}
                </div>
                <div>
                  <span style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#aab8c5' }}>{userName}</span>
                  <span style={{ display: 'block', fontSize: 11, color: '#687d92' }}>{userRole}</span>
                </div>
              </div>
              <div style={{ height: 1, background: '#272f37', margin: '4px 0' }} />
              <button
                onClick={async () => { await signOut(); window.location.href = '/admin'; }}
                style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '0.375rem 1.5rem', background: 'transparent', border: 'none', color: '#ed321f', fontSize: '0.875rem', fontFamily: 'inherit', cursor: 'pointer' }}
              >
                Abmelden
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
