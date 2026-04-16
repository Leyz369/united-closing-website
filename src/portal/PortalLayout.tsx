import { useState, useEffect } from 'react';
import {
  LayoutDashboard, Building2, MapPin, FileText, TrendingDown, Bell, Inbox,
  LogOut, ChevronLeft, ChevronRight, Receipt, Users, FileSignature,
  MessageCircle, BarChart3, Trophy, Gift, FolderOpen, UserCircle, Network, Wallet,
} from 'lucide-react';
import { useAuth } from '../lib/authContext';

interface PortalLayoutProps {
  children: React.ReactNode;
  currentPath: string;
  onNavigate: (path: string) => void;
}

const partnerNavItems = [
  { href: '/portal/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/portal/statistiken', label: 'Statistiken', icon: BarChart3 },
  { href: '/portal/provisionen', label: 'Provisionen', icon: Receipt },
  { href: '/portal/abrechnungen', label: 'Abrechnungen', icon: Building2 },
  { href: '/portal/konto', label: 'Mein Konto', icon: Wallet },
  { href: '/portal/team', label: 'Mein Team', icon: Network },
  { href: '/portal/meine-kunden', label: 'Meine Kunden', icon: Users },
  { href: '/portal/meine-vertraege', label: 'Meine Vertraege', icon: FileSignature },
  { href: '/portal/messenger', label: 'Messenger', icon: MessageCircle },
  { href: '/portal/badges', label: 'Badges', icon: Trophy },
  { href: '/portal/incentives', label: 'Incentives', icon: Gift },
  { href: '/portal/dokumente', label: 'Dokumente', icon: FolderOpen },
  { href: '/portal/mein-profil', label: 'Mein Profil', icon: UserCircle },
];

export default function PortalLayout({ children, currentPath, onNavigate }: PortalLayoutProps) {
  const { signOut } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const checkScreen = () => { if (window.innerWidth <= 1140) setCollapsed(true); };
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  const handleLogout = async () => { await signOut(); onNavigate('/portal/login'); };

  return (
    <div className="admin-root">
      <aside className={`admin-sidebar ${collapsed ? 'collapsed' : ''}`}>
        <div className="admin-sidebar-logo">
          <div className="admin-sidebar-logo-icon">
            <img src="/logos/uc-monogram.webp" alt="United Closing" style={{ width: 36, height: 36, objectFit: 'contain' }} />
          </div>
          {!collapsed && (
            <div>
              <span className="admin-logo-big" style={{ fontSize: 16 }}>Portal</span>
              <span className="admin-logo-small">Vertriebspartner</span>
            </div>
          )}
        </div>

        <nav className="admin-sidebar-nav">
          <div className="admin-nav-section">
            {!collapsed && <span className="admin-nav-section-title">Navigation</span>}
            {partnerNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPath === item.href || currentPath.startsWith(item.href + '/');
              return (
                <button key={item.href} onClick={() => onNavigate(item.href)} className={`admin-nav-item ${isActive ? 'active' : ''}`} title={collapsed ? item.label : undefined}>
                  <Icon size={20} />{!collapsed && <span>{item.label}</span>}
                </button>
              );
            })}
          </div>
        </nav>

        {!collapsed && (
          <div className="admin-sidebar-user">
            <div className="admin-user-info">
              <div className="admin-user-avatar">DP</div>
              <div><span className="admin-user-name">Demo Partner</span><span className="admin-user-role">Vertriebspartner</span></div>
            </div>
            <button className="admin-logout-btn" title="Abmelden" onClick={handleLogout}><LogOut size={18} /></button>
          </div>
        )}

        <button className="admin-sidebar-toggle" onClick={() => setCollapsed(!collapsed)} title={collapsed ? 'Menu erweitern' : 'Menu minimieren'}>
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </aside>

      <div className="admin-main-content">{children}</div>
    </div>
  );
}
