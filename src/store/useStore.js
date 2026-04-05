import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { initialTransactions } from '../data/transactions';

export const useStore = create(
  persist(
    (set, get) => ({
      // Role management
      role: 'admin', // 'admin' | 'viewer'
      setRole: (role) => set({ role }),

      // Theme
      darkMode: true,
      toggleDarkMode: () => set((s) => ({ darkMode: !s.darkMode })),

      // Active page
      activePage: 'dashboard',
      setActivePage: (page) => set({ activePage: page }),

      // Onboarding
      onboardingComplete: false,
      completeOnboarding: () => set({ onboardingComplete: true }),

      // Notifications
      notifications: [],
      notificationPanelOpen: false,
      toggleNotificationPanel: () =>
        set((s) => ({ notificationPanelOpen: !s.notificationPanelOpen })),
      closeNotificationPanel: () => set({ notificationPanelOpen: false }),
      addNotification: (notification) =>
        set((s) => ({
          notifications: [
            {
              ...notification,
              id: Date.now().toString(),
              time: new Date().toISOString(),
              read: false,
            },
            ...s.notifications.slice(0, 19),
          ],
        })),
      markAllRead: () =>
        set((s) => ({
          notifications: s.notifications.map((n) => ({ ...n, read: true })),
        })),
      clearNotifications: () => set({ notifications: [] }),

      // Transactions
      transactions: initialTransactions,
      addTransaction: (tx) => {
        const newTx = { ...tx, id: Date.now().toString() };
        set((s) => ({
          transactions: [newTx, ...s.transactions],
        }));
        get().addNotification({
          type: 'success',
          title: 'Transaction Added',
          message: `${newTx.description} — ₹${Number(newTx.amount).toLocaleString('en-IN')} recorded as ${newTx.type}.`,
          category: newTx.category,
        });
      },
      updateTransaction: (id, updates) => {
        set((s) => ({
          transactions: s.transactions.map((t) =>
            t.id === id ? { ...t, ...updates } : t
          ),
        }));
        get().addNotification({
          type: 'info',
          title: 'Transaction Updated',
          message: `${updates.description || 'Transaction'} has been updated successfully.`,
          category: updates.category,
        });
      },
      deleteTransaction: (id) => {
        const tx = get().transactions.find((t) => t.id === id);
        set((s) => ({
          transactions: s.transactions.filter((t) => t.id !== id),
        }));
        if (tx) {
          get().addNotification({
            type: 'warning',
            title: 'Transaction Deleted',
            message: `${tx.description} — ₹${Number(tx.amount).toLocaleString('en-IN')} has been removed.`,
            category: tx.category,
          });
        }
      },

      // Filters
      filters: {
        search: '',
        category: 'all',
        type: 'all',
        sortBy: 'date',
        sortDir: 'desc',
        dateRange: 'all',
      },
      setFilter: (key, value) =>
        set((s) => ({ filters: { ...s.filters, [key]: value } })),
      resetFilters: () =>
        set({
          filters: {
            search: '',
            category: 'all',
            type: 'all',
            sortBy: 'date',
            sortDir: 'desc',
            dateRange: 'all',
          },
        }),

      // Modal state
      modal: { open: false, type: null, data: null },
      openModal: (type, data = null) =>
        set({ modal: { open: true, type, data } }),
      closeModal: () => set({ modal: { open: false, type: null, data: null } }),
    }),
    {
      name: 'finance-dashboard-storage',
      partialize: (state) => ({
        transactions: state.transactions,
        darkMode: state.darkMode,
        role: state.role,
        onboardingComplete: state.onboardingComplete,
        notifications: state.notifications,
      }),
    }
  )
);
