import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';
import {
  LayoutDashboard, ArrowLeftRight, TrendingUp,
  Sun, Moon, ChevronRight, Shield, Eye, Lock,
  UserCheck, BookOpen
} from 'lucide-react';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'transactions', label: 'Transactions', icon: ArrowLeftRight },
  { id: 'insights', label: 'Insights', icon: TrendingUp },
];

export default function Sidebar({ isOpen, onClose, onOpenOnboarding }) {
  const { activePage, setActivePage, darkMode, toggleDarkMode, role, setRole } = useStore();
  const isViewer = role === 'viewer';

  const navigate = (page) => {
    setActivePage(page);
    onClose?.();
  };

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose} />}

      <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''} ${isViewer ? 'sidebar-viewer' : 'sidebar-admin'}`}>

        {/* Logo */}
        <div className="sidebar-logo">
          <div className="logo-title">NexusFi</div>
          <div className="logo-sub">WEALTH COMMAND CENTRE</div>
        </div>

        {/* Role Banner */}
        <AnimatePresence mode="wait">
          <motion.div
            key={role}
            className={`role-banner ${isViewer ? 'role-banner-viewer' : 'role-banner-admin'}`}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.25 }}
          >
            {isViewer ? (
              <>
                <Lock size={12} />
                <span>VIEW ONLY ACCESS</span>
              </>
            ) : (
              <>
                <UserCheck size={12} />
                <span>ADMIN PANEL</span>
              </>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Nav */}
        <nav className="sidebar-nav">
          <div className="nav-section-label">NAVIGATION</div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = activePage === item.id;
            return (
              <motion.button
                key={item.id}
                className={`nav-item ${active ? 'nav-active' : ''}`}
                onClick={() => navigate(item.id)}
                whileHover={{ x: 3 }}
                whileTap={{ scale: 0.97 }}
              >
                <Icon size={17} strokeWidth={active ? 2 : 1.6} />
                <span>{item.label}</span>
                {active && (
                  <motion.div
                    className="nav-indicator"
                    layoutId="nav-indicator"
                    style={{
                      background: isViewer
                        ? 'linear-gradient(180deg, #a855f7, #ec4899)'
                        : 'linear-gradient(180deg, #3b82f6, #8b5cf6)',
                    }}
                  />
                )}
                {!active && <ChevronRight size={13} className="nav-arrow" />}
              </motion.button>
            );
          })}
        </nav>

        {/* Role Switcher */}
        <div className="role-section">
          <div className="nav-section-label">ROLE SIMULATION</div>
          <div className="role-toggle-wrap">
            {/* Admin option */}
            <button
              className={`role-option ${role === 'admin' ? 'role-option-active-admin' : ''}`}
              onClick={() => setRole('admin')}
            >
              <div className="role-option-icon"><Shield size={15} /></div>
              <div className="role-option-text">
                <span className="role-option-label">Admin</span>
                <span className="role-option-sub">Full access</span>
              </div>
              {role === 'admin' && <div className="role-check-dot admin-dot" />}
            </button>

            {/* Viewer option */}
            <button
              className={`role-option ${role === 'viewer' ? 'role-option-active-viewer' : ''}`}
              onClick={() => setRole('viewer')}
            >
              <div className="role-option-icon"><Eye size={15} /></div>
              <div className="role-option-text">
                <span className="role-option-label">Viewer</span>
                <span className="role-option-sub">Read only</span>
              </div>
              {role === 'viewer' && <div className="role-check-dot viewer-dot" />}
            </button>
          </div>
        </div>

        {/* Help / Tutorial */}
        <div className="sidebar-help">
          <button className="help-btn" onClick={onOpenOnboarding}>
            <BookOpen size={15} />
            <span>View Tutorial</span>
          </button>
        </div>

        {/* Bottom Controls */}
        <div className="sidebar-bottom">
          <button className="theme-toggle" onClick={toggleDarkMode}>
            {darkMode ? <Sun size={15} /> : <Moon size={15} />}
            <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
            <div className={`theme-pill ${darkMode ? 'dark-pill' : 'light-pill'}`} />
          </button>

          <div className="sidebar-user">
            <div className={`user-avatar-box ${isViewer ? 'avatar-viewer' : 'avatar-admin'}`}>
              {isViewer ? <Eye size={16} /> : <Shield size={16} />}
            </div>
            <div>
              <div className="user-name">{isViewer ? 'Guest Viewer' : 'System Admin'}</div>
              <div className={`user-role-badge ${isViewer ? 'badge-viewer' : 'badge-admin'}`}>
                {role.toUpperCase()}
              </div>
            </div>
          </div>

          {/* Credit */}
          <a
            href="https://linktr.ee/helloanupam"
            target="_blank"
            rel="noopener noreferrer"
            className="sidebar-credit"
          >
            Made by <span className="sidebar-credit-name">Anupam Saha</span>
          </a>
        </div>
      </aside>
    </>
  );
}
