import { lazy, Suspense, useState, useEffect } from 'react';
import { useAuth } from '../lib/authContext';
import '../admin/admin.css';

const PortalLogin = lazy(() => import('./PortalLogin'));
const PortalLayout = lazy(() => import('./PortalLayout'));
const PortalDashboard = lazy(() => import('./pages/PortalDashboard'));
const PortalMeineKunden = lazy(() => import('./pages/PortalMeineKunden'));
const PortalMeineVertraege = lazy(() => import('./pages/PortalMeineVertraege'));
const PortalProvisionen = lazy(() => import('./pages/PortalProvisionen'));
const PortalRegister = lazy(() => import('./pages/PortalRegister'));
const PortalPlaceholder = lazy(() => import('./pages/PortalPlaceholder'));

function PageLoader() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#191e23' }}>
      <div className="admin-spinner" />
    </div>
  );
}

export default function PortalApp() {
  const { session, loading } = useAuth();
  const [path, setPath] = useState<string>(() => window.location.pathname);

  useEffect(() => {
    const handler = () => setPath(window.location.pathname);
    window.addEventListener('popstate', handler);
    return () => window.removeEventListener('popstate', handler);
  }, []);

  const navigate = (p: string) => {
    setPath(p);
    window.history.pushState({}, '', p);
  };

  if (loading) return <PageLoader />;

  // Login/Register pages don't need auth
  if (path === '/portal/login' || path === '/portal') {
    return (
      <Suspense fallback={<PageLoader />}>
        <PortalLogin onSuccess={() => navigate('/portal/dashboard')} />
      </Suspense>
    );
  }

  if (path === '/portal/register') {
    return (
      <Suspense fallback={<PageLoader />}>
        <PortalRegister />
      </Suspense>
    );
  }

  if (!session) {
    return (
      <Suspense fallback={<PageLoader />}>
        <PortalLogin onSuccess={() => navigate('/portal/dashboard')} />
      </Suspense>
    );
  }

  const renderPage = () => {
    if (path === '/portal/dashboard') return <PortalDashboard />;
    if (path === '/portal/meine-kunden') return <PortalMeineKunden />;
    if (path === '/portal/meine-vertraege') return <PortalMeineVertraege />;
    if (path === '/portal/provisionen') return <PortalProvisionen />;
    return <PortalPlaceholder pageName={path.replace('/portal/', '').replace(/-/g, ' ')} />;
  };

  return (
    <Suspense fallback={<PageLoader />}>
      <PortalLayout currentPath={path} onNavigate={navigate}>
        <Suspense fallback={<PageLoader />}>
          {renderPage()}
        </Suspense>
      </PortalLayout>
    </Suspense>
  );
}
