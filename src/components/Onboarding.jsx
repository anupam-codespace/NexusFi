import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';
import {
  LayoutDashboard, ArrowLeftRight, TrendingUp, BarChart2, Zap,
  Shield, Eye, ChevronRight, X, CheckCircle
} from 'lucide-react';

const STEPS = [
  {
    icon: LayoutDashboard,
    accent: '#3b82f6',
    title: 'Welcome to NexusFi',
    subtitle: 'Your Intelligent Wealth Command Centre',
    description:
      'NexusFi gives you a comprehensive view of your financial health — income, expenses, savings, and deep analytics — all in one place. This quick walkthrough will get you up to speed in under a minute.',
    highlights: ['Real-time financial overview', 'Persistent data via local storage', 'Role-based access control'],
  },
  {
    icon: BarChart2,
    accent: '#22c55e',
    title: 'Dashboard Overview',
    subtitle: 'Your financial command centre',
    description:
      'The Dashboard gives you an at-a-glance view of your total balance, income, expenses, and savings rate. Trend charts and category breakdowns help you visualise where your money is going over the last 6 months.',
    highlights: ['4 key financial metrics', 'Balance trend area chart', 'Interactive donut chart by category'],
  },
  {
    icon: ArrowLeftRight,
    accent: '#f97316',
    title: 'Managing Transactions',
    subtitle: 'Full control over your financial entries',
    description:
      'Browse, search, filter, and sort all your transactions. Use the search bar to find specific entries, filter by type, category, or date range, and export your data as CSV at any time.',
    highlights: ['Search & multi-filter support', 'Sort by date, amount, category', 'Export to CSV'],
  },
  {
    icon: Shield,
    accent: '#a855f7',
    title: 'Role-Based Access',
    subtitle: 'Admin and Viewer modes',
    description:
      'Switch between Admin and Viewer roles from the sidebar at any time. Admins can add, edit, and delete transactions. Viewers have read-only access — perfect for sharing your dashboard with others.',
    highlights: ['Admin: Full CRUD access', 'Viewer: Read-only mode', 'Switch roles instantly from sidebar'],
  },
  {
    icon: TrendingUp,
    accent: '#ec4899',
    title: 'Financial Insights',
    subtitle: 'Data-driven observations',
    description:
      'The Insights page surfaces key observations from your data — your top spending category, month-over-month expense changes, savings rate, and a radar chart showing your spending distribution across all categories.',
    highlights: ['Category breakdown bars', 'Radar spending distribution', 'Monthly surplus/deficit table'],
  },
  {
    icon: Zap,
    accent: '#f59e0b',
    title: 'Notifications',
    subtitle: 'Stay informed on every action',
    description:
      'Every time you add, edit, or delete a transaction, the notification bell captures the event. Click the bell icon in the top-right corner to review your activity log and stay on top of all changes.',
    highlights: ['Action-triggered alerts', 'Unread count badge on bell', 'Full activity history panel'],
  },
];

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const cardVariants = {
  enter: (dir) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
  center: { opacity: 1, x: 0 },
  exit: (dir) => ({ opacity: 0, x: dir > 0 ? -60 : 60 }),
};

export default function Onboarding() {
  const { onboardingComplete, completeOnboarding } = useStore();
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);

  if (onboardingComplete) return null;

  const current = STEPS[step];
  const Icon = current.icon;
  const isLast = step === STEPS.length - 1;

  const go = (next) => {
    setDir(next > step ? 1 : -1);
    setStep(next);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="onboarding-overlay"
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <motion.div
          className="onboarding-modal"
          initial={{ scale: 0.92, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 28 }}
        >
          {/* Close */}
          <button className="onboarding-skip" onClick={completeOnboarding}>
            Skip tour <X size={14} />
          </button>

          {/* Step indicator */}
          <div className="onboarding-dots">
            {STEPS.map((_, i) => (
              <button
                key={i}
                className={`onboarding-dot ${i === step ? 'active' : ''} ${i < step ? 'done' : ''}`}
                style={i === step ? { backgroundColor: current.accent } : {}}
                onClick={() => go(i)}
              />
            ))}
          </div>

          {/* Animated step content */}
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={step}
              custom={dir}
              variants={cardVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.28, ease: 'easeInOut' }}
              className="onboarding-step"
            >
              {/* Icon area */}
              <div
                className="onboarding-icon-wrap"
                style={{
                  background: `linear-gradient(135deg, ${current.accent}22, ${current.accent}08)`,
                  border: `1px solid ${current.accent}30`,
                }}
              >
                <div
                  className="onboarding-icon-inner"
                  style={{ color: current.accent }}
                >
                  <Icon size={32} strokeWidth={1.5} />
                </div>
                {/* Pulse ring */}
                <motion.div
                  className="onboarding-pulse"
                  style={{ borderColor: current.accent }}
                  animate={{ scale: [1, 1.18, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                />
              </div>

              {/* Text */}
              <div className="onboarding-text">
                <span className="onboarding-step-num" style={{ color: current.accent }}>
                  Step {step + 1} of {STEPS.length}
                </span>
                <h2 className="onboarding-title">{current.title}</h2>
                <p className="onboarding-subtitle">{current.subtitle}</p>
                <p className="onboarding-desc">{current.description}</p>

                <ul className="onboarding-highlights">
                  {current.highlights.map((h) => (
                    <li key={h}>
                      <CheckCircle size={14} style={{ color: current.accent, flexShrink: 0 }} />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="onboarding-nav">
            <button
              className="onboarding-btn-secondary"
              onClick={() => go(step - 1)}
              disabled={step === 0}
            >
              Back
            </button>
            <button
              className="onboarding-btn-primary"
              style={{ background: `linear-gradient(135deg, ${current.accent}, ${current.accent}cc)` }}
              onClick={isLast ? completeOnboarding : () => go(step + 1)}
            >
              {isLast ? 'Get Started' : 'Next'} <ChevronRight size={15} />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
