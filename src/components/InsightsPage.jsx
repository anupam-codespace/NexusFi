import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import { getInsights, formatCurrency, getMonthlyData, getCategoryBreakdown } from '../utils/finance';
import { CATEGORY_COLORS } from '../data/transactions';
import { TrendingUp, TrendingDown, AlertCircle, Target, Zap, Award, Activity } from 'lucide-react';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip } from 'recharts';

export default function InsightsPage() {
  const { transactions } = useStore();
  const insights = getInsights(transactions);
  const monthly = getMonthlyData(transactions);
  const breakdown = getCategoryBreakdown(transactions);
  const totalExpenses = breakdown.reduce((s, c) => s + c.value, 0);

  const radarData = breakdown.slice(0, 6).map((c) => ({
    category: c.name.split(' ')[0],
    value: Math.round((c.value / totalExpenses) * 100),
  }));

  const insightCards = [
    {
      icon: Award,
      color: '#f59e0b',
      title: 'Top Spending Category',
      value: insights.topCategory ? insights.topCategory.name : 'N/A',
      sub: insights.topCategory ? `${formatCurrency(insights.topCategory.value)} total spend` : '',
    },
    {
      icon: insights.expenseDiff > 0 ? TrendingUp : TrendingDown,
      color: insights.expenseDiff > 0 ? '#ef4444' : '#22c55e',
      title: 'Month-on-Month Change',
      value: `${insights.expenseDiff > 0 ? '+' : ''}${insights.expenseDiff.toFixed(1)}%`,
      sub: insights.expenseDiff > 0 ? 'Expenses increased this month' : 'Expenses decreased this month',
    },
    {
      icon: Target,
      color: insights.savingsRate >= 20 ? '#22c55e' : '#f59e0b',
      title: 'Savings Rate',
      value: `${insights.savingsRate.toFixed(1)}%`,
      sub: insights.savingsRate >= 20 ? 'On track — target achieved' : 'Below the 20% recommended target',
    },
    {
      icon: Activity,
      color: '#a855f7',
      title: 'Avg. Daily Expense',
      value: formatCurrency(insights.avgDailyExpense),
      sub: `${insights.pendingCount} transaction${insights.pendingCount !== 1 ? 's' : ''} pending`,
    },
  ];

  return (
    <div className="insights-page">
      <div className="page-header">
        <div>
          <h2 className="page-title">Financial Insights</h2>
          <p className="page-sub">Data-driven analysis of your spending behaviour</p>
        </div>
        <div className="ai-badge">
          <Zap size={13} /> Smart Analysis
        </div>
      </div>

      {/* KPI Cards */}
      <div className="insight-cards">
        {insightCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.title}
              className="insight-card"
              style={{ borderColor: card.color + '35' }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.09 }}
              whileHover={{ y: -3, transition: { duration: 0.18 } }}
            >
              <div className="insight-card-top">
                <div
                  className="insight-icon-wrap"
                  style={{ background: card.color + '18', border: `1px solid ${card.color}30` }}
                >
                  <Icon size={16} style={{ color: card.color }} strokeWidth={2} />
                </div>
              </div>
              <div className="insight-value" style={{ color: card.color }}>{card.value}</div>
              <div className="insight-title">{card.title}</div>
              <div className="insight-sub">{card.sub}</div>
            </motion.div>
          );
        })}
      </div>

      <div className="insights-grid">
        {/* Category Breakdown */}
        <motion.div
          className="insight-section"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.38 }}
        >
          <h3>Category Breakdown</h3>
          <div className="breakdown-list">
            {breakdown.slice(0, 8).map((cat, idx) => {
              const pct = ((cat.value / totalExpenses) * 100).toFixed(1);
              return (
                <div key={cat.name} className="breakdown-item">
                  <div className="breakdown-label">
                    <span
                      className="breakdown-dot"
                      style={{ backgroundColor: CATEGORY_COLORS[cat.name] }}
                    />
                    <span>{cat.name}</span>
                  </div>
                  <div className="breakdown-bar-wrap">
                    <motion.div
                      className="breakdown-bar"
                      style={{ backgroundColor: CATEGORY_COLORS[cat.name] }}
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ delay: 0.45 + idx * 0.06, duration: 0.8, ease: 'easeOut' }}
                    />
                  </div>
                  <span className="breakdown-pct">{pct}%</span>
                  <span className="breakdown-val">{formatCurrency(cat.value, true)}</span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Radar Chart */}
        <motion.div
          className="insight-section"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.48 }}
        >
          <h3>Spending Distribution</h3>
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="rgba(148,163,184,0.12)" />
              <PolarAngleAxis dataKey="category" tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} />
              <Radar
                name="Spending %"
                dataKey="value"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.25}
                strokeWidth={2}
                isAnimationActive
                animationDuration={1200}
                animationEasing="ease-out"
              />
              <Tooltip
                formatter={(v) => `${v}%`}
                contentStyle={{
                  background: 'var(--bg-tooltip)',
                  border: '1px solid var(--border)',
                  borderRadius: 10,
                  color: 'var(--text-primary)',
                  fontSize: 12,
                }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Monthly Summary Table */}
        <motion.div
          className="insight-section span-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.58 }}
        >
          <h3>Monthly Summary</h3>
          <div className="table-wrap">
            <table className="monthly-table">
              <thead>
                <tr>
                  <th>Month</th>
                  <th>Income</th>
                  <th>Expenses</th>
                  <th>Net Balance</th>
                  <th>Savings Rate</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {monthly.map((m) => {
                  const rate = m.income > 0 ? ((m.income - m.expenses) / m.income * 100) : 0;
                  return (
                    <tr key={m.month}>
                      <td><strong>{m.month}</strong></td>
                      <td className="income-text">{formatCurrency(m.income)}</td>
                      <td className="expense-text">{formatCurrency(m.expenses)}</td>
                      <td className={m.balance >= 0 ? 'income-text' : 'expense-text'}>
                        {m.balance >= 0 ? '+' : ''}{formatCurrency(m.balance)}
                      </td>
                      <td>{rate.toFixed(1)}%</td>
                      <td>
                        <span className={`insight-pill ${m.balance >= 0 ? 'good' : 'bad'}`}>
                          {m.balance >= 0 ? 'Surplus' : 'Deficit'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
