import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence, motion } from 'framer-motion';
import { useStore } from './store/useStore';
import Sidebar from './components/Sidebar';
import DashboardPage from './components/DashboardPage';
import TransactionsPage from './components/TransactionsPage';
import InsightsPage from './components/InsightsPage';
import Modal from './components/Modal';
import LoadingScreen from './components/LoadingScreen';
import Onboarding from './components/Onboarding';
import NotificationPanel from './components/NotificationPanel';
import { Menu, X, Bell } from 'lucide-react';

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

const PAGE_TITLES = {
  dashboard: 'Dashboard',
  transactions: 'Transactions',
  insights: 'Insights',
};

export default function App() {
  const {
    activePage, darkMode, role,
    notifications, toggleNotificationPanel, notificationPanelOpen,
    onboardingComplete, completeOnboarding,
  } = useStore();

  const [appLoaded, setAppLoaded] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;
  const isViewer = role === 'viewer';

  function handleLoadComplete() {
    setAppLoaded(true);
    // Show onboarding after a brief pause if not done
    if (!onboardingComplete) {
      setTimeout(() => setShowOnboarding(true), 400);
    }
  }

  return (
    <div className={`app-root ${darkMode ? 'dark' : 'light'} ${isViewer ? 'role-viewer-theme' : 'role-admin-theme'}`}>
      {/* Loading Screen */}
      {!appLoaded && <LoadingScreen onComplete={handleLoadComplete} />}

      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: darkMode ? '#1e2a3a' : '#fff',
            color: darkMode ? '#f1f5f9' : '#0f172a',
            border: darkMode ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.08)',
            borderRadius: 10,
            fontSize: 13,
            fontWeight: 500,
          },
        }}
      />

      {/* Onboarding */}
      {showOnboarding && !onboardingComplete && (
        <Onboarding />
      )}
      {/* Persistent onboarding trigger from sidebar is handled via prop */}

      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onOpenOnboarding={() => {
          useStore.setState({ onboardingComplete: false });
          setShowOnboarding(true);
        }}
      />

      <div className={`main-content ${isViewer ? 'viewer-content' : ''}`}>
        {/* Topbar */}
        <header className={`topbar ${isViewer ? 'topbar-viewer' : ''}`}>
          <button className="hamburger" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <div className="topbar-title">
            <span className="breadcrumb">NexusFi</span>
            <span className="breadcrumb-sep">/</span>
            <span className="breadcrumb-active">{PAGE_TITLES[activePage]}</span>
          </div>

          {/* Role indicator */}
          <div className={`topbar-role-badge ${isViewer ? 'topbar-viewer-badge' : 'topbar-admin-badge'}`}>
            {isViewer ? 'VIEW ONLY' : 'ADMIN'}
          </div>

          <div className="topbar-right">
            {/* Notification Bell */}
            <div style={{ position: 'relative' }}>
              <button
                className={`icon-btn ${notificationPanelOpen ? 'icon-btn-active' : ''}`}
                onClick={toggleNotificationPanel}
                title="Notifications"
              >
                <Bell size={17} />
                {unreadCount > 0 && (
                  <motion.span
                    className="notif-count"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    key={unreadCount}
                  >
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </motion.span>
                )}
              </button>
              <NotificationPanel />
            </div>
          </div>
        </header>

        {/* Viewer Mode Top Banner */}
        {isViewer && (
          <motion.div
            className="viewer-top-bar"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="viewer-top-inner">
              You are in <strong>Viewer Mode</strong> — Read-only access. Switch to Admin from the sidebar to make changes.
            </div>
          </motion.div>
        )}

        {/* Page Content */}
        <main className="page-content">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePage}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.22, ease: 'easeInOut' }}
            >
              {activePage === 'dashboard' && <DashboardPage />}
              {activePage === 'transactions' && <TransactionsPage />}
              {activePage === 'insights' && <InsightsPage />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <Modal />
    </div>
  );
}
