import { motion } from 'framer-motion';
import {
  Wallet, TrendingUp, TrendingDown, Target
} from 'lucide-react';
import { formatCurrency } from '../utils/finance';

const CARDS = (summary) => [
  {
    label: 'Total Balance',
    value: formatCurrency(summary.balance),
    icon: Wallet,
    color: summary.balance >= 0 ? '#22c55e' : '#ef4444',
    bg: summary.balance >= 0
      ? 'linear-gradient(135deg, rgba(34,197,94,0.12) 0%, rgba(16,185,129,0.04) 100%)'
      : 'linear-gradient(135deg, rgba(239,68,68,0.12) 0%, rgba(220,38,38,0.04) 100%)',
    border: summary.balance >= 0 ? 'rgba(34,197,94,0.25)' : 'rgba(239,68,68,0.25)',
    sub: `${summary.savingsRate.toFixed(1)}% savings rate`,
    trend: summary.savingsRate >= 20 ? 'up' : 'down',
  },
  {
    label: 'Total Income',
    value: formatCurrency(summary.income),
    icon: TrendingUp,
    color: '#3b82f6',
    bg: 'linear-gradient(135deg, rgba(59,130,246,0.12) 0%, rgba(37,99,235,0.04) 100%)',
    border: 'rgba(59,130,246,0.25)',
    sub: 'All time earnings',
    trend: 'up',
  },
  {
    label: 'Total Expenses',
    value: formatCurrency(summary.expenses),
    icon: TrendingDown,
    color: '#f97316',
    bg: 'linear-gradient(135deg, rgba(249,115,22,0.12) 0%, rgba(234,88,12,0.04) 100%)',
    border: 'rgba(249,115,22,0.25)',
    sub: 'All time spending',
    trend: 'down',
  },
  {
    label: 'Savings Rate',
    value: `${summary.savingsRate.toFixed(1)}%`,
    icon: Target,
    color: '#a855f7',
    bg: 'linear-gradient(135deg, rgba(168,85,247,0.12) 0%, rgba(139,92,246,0.04) 100%)',
    border: 'rgba(168,85,247,0.25)',
    sub: summary.savingsRate >= 20 ? 'On track — great job' : 'Below 20% target',
    trend: summary.savingsRate >= 20 ? 'up' : 'down',
  },
];

export default function SummaryCards({ summary }) {
  const cards = CARDS(summary);

  return (
    <div className="summary-cards">
      {cards.map((card, i) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={card.label}
            className="summary-card"
            style={{ background: card.bg, borderColor: card.border }}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07, duration: 0.45, ease: 'easeOut' }}
            whileHover={{ y: -4, transition: { duration: 0.18 } }}
          >
            <div className="card-header">
              <div className="card-icon-wrap" style={{ background: card.color + '18', border: `1px solid ${card.color}30` }}>
                <Icon size={16} style={{ color: card.color }} strokeWidth={2} />
              </div>
              <span className="card-label">{card.label}</span>
            </div>

            <div className="card-value" style={{ color: card.color }}>{card.value}</div>
            <div className="card-sub">{card.sub}</div>

            {/* Decorative accent line */}
            <motion.div
              className="card-accent-line"
              style={{ backgroundColor: card.color }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3 + i * 0.07, duration: 0.5, ease: 'easeOut' }}
            />
          </motion.div>
        );
      })}
    </div>
  );
}
