import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import { getSummary, getMonthlyData, getCategoryBreakdown, formatCurrency, formatDate } from '../utils/finance';
import SummaryCards from './SummaryCards';
import { BalanceTrendChart, SpendingPieChart, MonthlyBarChart } from './Charts';
import { CATEGORY_COLORS, CATEGORY_ABBR } from '../data/transactions';
import { ArrowUpRight, ArrowDownRight, Plus, Clock } from 'lucide-react';
import { format } from 'date-fns';

function CategoryDot({ category, size = 8 }) {
  return (
    <span
      style={{
        display: 'inline-block',
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: CATEGORY_COLORS[category] || '#64748b',
        flexShrink: 0,
      }}
    />
  );
}

export default function DashboardPage() {
  const { transactions, role, openModal, setActivePage } = useStore();
  const summary = getSummary(transactions);
  const monthly = getMonthlyData(transactions);
  const breakdown = getCategoryBreakdown(transactions);
  const recent = transactions.slice(0, 7);
  const now = new Date();

  return (
    <div className="dashboard-page">
      {/* Hero Banner */}
      <motion.div
        className="dashboard-hero"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div>
          <h1 className="hero-title">Financial Overview</h1>
          <p className="hero-sub">
            {format(now, "EEEE, d MMMM yyyy")} &nbsp;·&nbsp; All figures in Indian Rupee (INR)
          </p>
        </div>
        <div className="hero-right">
          <div className="live-clock">
            <Clock size={13} />
            <span id="live-time">{format(now, 'hh:mm a')}</span>
          </div>
          <span className="hero-badge pulse">Live Data</span>
        </div>
      </motion.div>

      {/* Summary Cards */}
      <SummaryCards summary={summary} />

      {/* Charts Row */}
      <div className="charts-grid">
        <BalanceTrendChart data={monthly} />
        <SpendingPieChart data={breakdown} />
      </div>

      <div className="charts-grid-2">
        <MonthlyBarChart data={monthly} />

        {/* Top Categories */}
        <motion.div
          className="chart-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
        >
          <div className="chart-header">
            <h3>Top Expense Categories</h3>
            <button className="link-btn" onClick={() => setActivePage('insights')}>View All</button>
          </div>
          <div className="top-cats">
            {breakdown.slice(0, 6).map((cat, i) => {
              const total = breakdown.reduce((s, c) => s + c.value, 0);
              const pct = ((cat.value / total) * 100);
              return (
                <div key={cat.name} className="top-cat-item">
                  <div className="top-cat-left">
                    <span className="top-cat-rank">#{i + 1}</span>
                    <CategoryDot category={cat.name} />
                    <span className="top-cat-name">{cat.name}</span>
                  </div>
                  <div className="top-cat-right">
                    <div className="top-cat-bar-wrap">
                      <motion.div
                        className="top-cat-bar"
                        style={{ backgroundColor: CATEGORY_COLORS[cat.name] }}
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ delay: 0.6 + i * 0.07, duration: 0.7, ease: 'easeOut' }}
                      />
                    </div>
                    <span className="top-cat-val">{formatCurrency(cat.value, true)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Recent Transactions */}
      <motion.div
        className="chart-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65 }}
      >
        <div className="chart-header">
          <h3>Recent Transactions</h3>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            {role === 'admin' && (
              <button className="btn-primary btn-sm" onClick={() => openModal('add')}>
                <Plus size={13} /> Add New
              </button>
            )}
            <button className="link-btn" onClick={() => setActivePage('transactions')}>View All</button>
          </div>
        </div>
        <div className="recent-list">
          {recent.map((txn, i) => (
            <motion.div
              key={txn.id}
              className="recent-item"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + i * 0.04 }}
            >
              <div
                className="recent-icon"
                style={{
                  backgroundColor: CATEGORY_COLORS[txn.category] + '18',
                  border: `1px solid ${CATEGORY_COLORS[txn.category]}30`,
                  color: CATEGORY_COLORS[txn.category],
                }}
              >
                <span className="recent-category-abbr">{CATEGORY_ABBR[txn.category] || 'TX'}</span>
              </div>
              <div className="recent-info">
                <div className="recent-desc">{txn.description}</div>
                <div className="recent-meta">{txn.category} &middot; {formatDate(txn.date)}</div>
              </div>
              <div className={`recent-amount ${txn.type}`}>
                {txn.type === 'income' ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
                {txn.type === 'income' ? '+' : '-'}{formatCurrency(txn.amount)}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
