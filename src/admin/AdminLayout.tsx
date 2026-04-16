import { useState, useEffect } from 'react';
import {
  LayoutDashboard, Users, FileText, Settings, LogOut, BarChart3,
  Mail, Inbox, ChevronLeft, ChevronRight, UserCheck, Handshake,
  Shield, Receipt, FileSignature, Trophy, Gift, MessageCircle, BookOpen,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../lib/authContext';
import { supabase } from '../lib/supabase';

interface AdminLayoutProps {
  children: React.ReactNode;
  currentPath: string;
  onNavigate: (path: string) => void;
}

const menuSections = [
  {
    title: 'Uebersicht',
    items: [
      { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { href: '/admin/statistics', label: 'Statistiken', icon: BarChart3 },
      { href: '/admin/messenger', label: 'Messenger', icon: MessageCircle },
    ],
  },
  {
    title: 'CRM',
    items: [
      { href: '/admin/leads', label: 'Leads', icon: Sparkles },
      { href: '/admin/customers', label: 'Kunden', icon: Users },
      { href: '/admin/documents', label: 'Dokumente', icon: FileText },
    ],
  },
  {
    title: 'Partner & Finanzen',
    items: [
      { href: '/admin/sales-partners', label: 'Vertriebspartner', icon: Handshake },
      { href: '/admin/commission-statements', label: 'Provisionen', icon: Receipt },
      { href: '/admin/manual-bookings', label: 'Buchungen', icon: BookOpen },
      { href: '/admin/badges', label: 'Badges', icon: Trophy },
      { href: '/admin/incentives', label: 'Incentives', icon: Gift },
    ],
  },
  {
    title: 'System',
    items: [
      { href: '/admin/portal-registrations', label: 'Registrierungen', icon: UserCheck },
      { href: '/admin/partner-roles', label: 'Partnerrollen', icon: Shield },
      { href: '/admin/contract-templates', label: 'Vertragsvorlagen', icon: FileSignature },
      { href: '/admin/email-templates', label: 'E-Mail-Vorlagen', icon: Mail },
      { href: '/admin/inbox', label: 'Posteingang', icon: Inbox },
      { href: '/admin/settings', label: 'Einstellungen', icon: Settings },
    ],
  },
];

interface UserInfo {
  name: string;
  initials: string;
  role: string;
}

export default function AdminLayout({ children, currentPath, onNavigate }: AdminLayoutProps) {
  const { signOut } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [user, setUser] = useState<UserInfo>({ name: 'Demo User', initials: 'DU', role: 'Administrator' });

  useEffect(() => {
    const checkScreen = () => {
      const small = window.innerWidth <= 1140;
      setIsSmallScreen(small);
      if (small) setCollapsed(true);
    };
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data: { user: authUser } } = await supabase.auth.getUser();
        if (authUser) {
          const { data: profile } = await supabase
            .from('users')
            .select('first_name, last_name, role')
            .eq('id', authUser.id)
            .single();

          if (profile?.first_name || profile?.last_name) {
            const firstName = profile.first_name || '';
            const lastName = profile.last_name || '';
            const name = `${firstName} ${lastName}`.trim();
            const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
            const roleMap: Record<string, string> = { admin: 'Administrator', manager: 'Manager', partner: 'Vertriebspartner', user: 'Benutzer' };
            setUser({ name, initials, role: roleMap[profile.role] || profile.role });
          } else {
            const email = authUser.email || '';
            const namePart = email.split('@')[0];
            setUser({ name: namePart, initials: namePart.substring(0, 2).toUpperCase(), role: 'Benutzer' });
          }
        }
      } catch {
        // Keep demo user
      }
    };
    fetchUser();
  }, []);

  const handleNav = (path: string) => { onNavigate(path); };

  const handleSignOut = async () => {
    await signOut();
    onNavigate('/admin');
  };

  return (
    <div className="admin-root">
      <aside className={`admin-sidebar ${collapsed ? 'collapsed' : ''} ${isSmallScreen && !collapsed ? 'expanded' : ''}`}>
        {/* Logo */}
        <div className={`admin-sidebar-logo ${collapsed ? 'admin-collapsed-logo' : ''}`}>
          <div className="admin-sidebar-logo-icon">
            <img src="/logos/uc-monogram.webp" alt="United Closing" style={{ width: 36, height: 36, objectFit: 'contain' }} />
          </div>
        </div>

        {/* Navigation */}
        <nav className="admin-sidebar-nav">
          {menuSections.map((section) => (
            <div key={section.title} className="admin-nav-section">
              {!collapsed && <span className="admin-nav-section-title">{section.title}</span>}
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = currentPath === item.href || currentPath.startsWith(item.href + '/');
                return (
                  <button
                    key={item.href}
                    onClick={() => handleNav(item.href)}
                    className={`admin-nav-item ${isActive ? 'active' : ''}`}
                    title={collapsed ? item.label : undefined}
                  >
                    <Icon size={20} />
                    {!collapsed && <span>{item.label}</span>}
                  </button>
                );
              })}
            </div>
          ))}
        </nav>

        {/* User Section */}
        {!collapsed && (
          <div className="admin-sidebar-user">
            <div className="admin-user-info">
              <div className="admin-user-avatar">{user.initials}</div>
              <div>
                <span className="admin-user-name">{user.name}</span>
                <span className="admin-user-role">{user.role}</span>
              </div>
            </div>
            <button className="admin-logout-btn" title="Abmelden" onClick={handleSignOut}>
              <LogOut size={18} />
            </button>
          </div>
        )}

        <button
          className="admin-sidebar-toggle"
          onClick={() => setCollapsed(!collapsed)}
          title={collapsed ? 'Menu erweitern' : 'Menu minimieren'}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </aside>

      <div className="admin-main-content">
        {children}
      </div>
    </div>
  );
}
