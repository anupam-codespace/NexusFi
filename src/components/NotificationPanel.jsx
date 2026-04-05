import { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';
import { X, Bell, CheckCheck, Trash2, TrendingUp, TrendingDown, AlertTriangle, Info } from 'lucide-react';
import { formatDistanceToNow, parseISO } from 'date-fns';

const TYPE_CONFIG = {
  success: {
    icon: TrendingUp,
    color: '#22c55e',
    bg: 'rgba(34,197,94,0.1)',
    border: 'rgba(34,197,94,0.2)',
  },
  info: {
    icon: Info,
    color: '#3b82f6',
    bg: 'rgba(59,130,246,0.1)',
    border: 'rgba(59,130,246,0.2)',
  },
  warning: {
    icon: AlertTriangle,
    color: '#f59e0b',
    bg: 'rgba(245,158,11,0.1)',
    border: 'rgba(245,158,11,0.2)',
  },
  error: {
    icon: TrendingDown,
    color: '#ef4444',
    bg: 'rgba(239,68,68,0.1)',
    border: 'rgba(239,68,68,0.2)',
  },
};

export default function NotificationPanel() {
  const {
    notificationPanelOpen,
    closeNotificationPanel,
    notifications,
    markAllRead,
    clearNotifications,
  } = useStore();

  const panelRef = useRef(null);
  const unreadCount = notifications.filter((n) => !n.read).length;

  // Close on outside click
  useEffect(() => {
    if (!notificationPanelOpen) return;
    const handler = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        closeNotificationPanel();
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [notificationPanelOpen, closeNotificationPanel]);

  return (
    <AnimatePresence>
      {notificationPanelOpen && (
        <motion.div
          ref={panelRef}
          className="notif-panel"
          initial={{ opacity: 0, y: -10, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.96 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
        >
          {/* Header */}
          <div className="notif-header">
            <div className="notif-title-row">
              <Bell size={16} />
              <span>Notifications</span>
              {unreadCount > 0 && (
                <span className="notif-unread-badge">{unreadCount} new</span>
              )}
            </div>
            <div className="notif-actions">
              {unreadCount > 0 && (
                <button className="notif-action-btn" onClick={markAllRead} title="Mark all read">
                  <CheckCheck size={14} />
                </button>
              )}
              {notifications.length > 0 && (
                <button className="notif-action-btn" onClick={clearNotifications} title="Clear all">
                  <Trash2 size={14} />
                </button>
              )}
              <button className="notif-action-btn" onClick={closeNotificationPanel}>
                <X size={14} />
              </button>
            </div>
          </div>

          {/* List */}
          <div className="notif-list">
            {notifications.length === 0 ? (
              <div className="notif-empty">
                <Bell size={28} strokeWidth={1} />
                <p>No notifications yet</p>
                <span>Actions like adding or deleting transactions will appear here.</span>
              </div>
            ) : (
              <AnimatePresence initial={false}>
                {notifications.map((n) => {
                  const cfg = TYPE_CONFIG[n.type] || TYPE_CONFIG.info;
                  const Ico = cfg.icon;
                  return (
                    <motion.div
                      key={n.id}
                      className={`notif-item ${n.read ? 'read' : 'unread'}`}
                      style={{ borderLeftColor: cfg.color }}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div
                        className="notif-item-icon"
                        style={{ background: cfg.bg, border: `1px solid ${cfg.border}`, color: cfg.color }}
                      >
                        <Ico size={14} />
                      </div>
                      <div className="notif-item-body">
                        <div className="notif-item-title">{n.title}</div>
                        <div className="notif-item-msg">{n.message}</div>
                        <div className="notif-item-time">
                          {formatDistanceToNow(parseISO(n.time), { addSuffix: true })}
                        </div>
                      </div>
                      {!n.read && <div className="notif-dot" style={{ backgroundColor: cfg.color }} />}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
