import { lazy, Suspense, useState, useEffect } from 'react';
import { useAuth } from '../lib/authContext';
import './admin.css';

const AdminLogin = lazy(() => import('./AdminLogin'));
const AdminLayout = lazy(() => import('./AdminLayout'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const CustomersPage = lazy(() => import('./pages/CustomersPage'));
const LeadsPage = lazy(() => import('./pages/LeadsPage'));
const CustomerDetailPage = lazy(() => import('./pages/CustomerDetailPage'));
const CustomerNewPage = lazy(() => import('./pages/CustomerNewPage'));
const DocumentsPage = lazy(() => import('./pages/DocumentsPage'));
const SalesPartnersPage = lazy(() => import('./pages/SalesPartnersPage'));
const SalesPartnerDetailPage = lazy(() => import('./pages/SalesPartnerDetailPage'));
const StatisticsPage = lazy(() => import('./pages/StatisticsPage'));
const MessengerPage = lazy(() => import('./pages/MessengerPage'));
const SettingsPage = lazy(() => import('./pages/SettingsPage'));
const CommissionStatementsPage = lazy(() => import('./pages/CommissionStatementsPage'));
const ManualBookingsPage = lazy(() => import('./pages/ManualBookingsPage'));
const BadgesPage = lazy(() => import('./pages/BadgesPage'));
const IncentivesPage = lazy(() => import('./pages/IncentivesPage'));
const PortalRegistrationsPage = lazy(() => import('./pages/PortalRegistrationsPage'));
const PartnerRolesPage = lazy(() => import('./pages/PartnerRolesPage'));
const ContractTemplatesPage = lazy(() => import('./pages/ContractTemplatesPage'));
const EmailTemplatesPage = lazy(() => import('./pages/EmailTemplatesPage'));
const InboxPage = lazy(() => import('./pages/InboxPage'));
const BillingPage = lazy(() => import('./pages/BillingPage'));

function PageLoader() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#191e23' }}>
      <div className="admin-spinner" />
    </div>
  );
}

export default function AdminApp() {
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

  if (!session) {
    return (
      <Suspense fallback={<PageLoader />}>
        <AdminLogin onSuccess={() => navigate('/admin/dashboard')} />
      </Suspense>
    );
  }

  const renderPage = () => {
    // Sales partner detail: /admin/sales-partners/:id
    const spDetailMatch = path.match(/^\/admin\/sales-partners\/([^/]+)$/);
    if (spDetailMatch && spDetailMatch[1] !== 'new') {
      return <SalesPartnerDetailPage partnerId={spDetailMatch[1]} />;
    }

    // Customer detail: /admin/customers/:id (but not /admin/customers/new)
    const customerDetailMatch = path.match(/^\/admin\/customers\/([^/]+)$/);
    if (customerDetailMatch && customerDetailMatch[1] !== 'new') {
      return <CustomerDetailPage customerId={customerDetailMatch[1]} />;
    }

    if (path === '/admin/customers/new') return <CustomerNewPage />;
    if (path === '/admin/customers') return <CustomersPage />;
    if (path === '/admin/leads') return <LeadsPage />;
    if (path === '/admin/documents') return <DocumentsPage />;
    if (path === '/admin/sales-partners') return <SalesPartnersPage />;
    if (path === '/admin/statistics') return <StatisticsPage />;
    if (path === '/admin/messenger') return <MessengerPage />;
    if (path === '/admin/settings') return <SettingsPage />;
    if (path === '/admin/commission-statements') return <CommissionStatementsPage />;
    if (path === '/admin/manual-bookings') return <ManualBookingsPage />;
    if (path === '/admin/badges') return <BadgesPage />;
    if (path === '/admin/incentives') return <IncentivesPage />;
    if (path === '/admin/portal-registrations') return <PortalRegistrationsPage />;
    if (path === '/admin/partner-roles') return <PartnerRolesPage />;
    if (path === '/admin/contract-templates') return <ContractTemplatesPage />;
    if (path === '/admin/email-templates') return <EmailTemplatesPage />;
    if (path === '/admin/inbox') return <InboxPage />;
    if (path === '/admin/billing') return <BillingPage />;
    if (path.startsWith('/admin/settings/email-templates')) return <EmailTemplatesPage />;
    if (path.startsWith('/admin/settings/inbox')) return <InboxPage />;

    // Default: dashboard
    return <DashboardPage />;
  };

  return (
    <Suspense fallback={<PageLoader />}>
      <AdminLayout currentPath={path} onNavigate={navigate}>
        <Suspense fallback={<PageLoader />}>
          {renderPage()}
        </Suspense>
      </AdminLayout>
    </Suspense>
  );
}
