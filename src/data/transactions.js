// ─────────────────────────────────────────────────────────────────
//  Realistic dataset — Salaried professional, ₹16 LPA (~₹1,08,000/mo take-home)
//  6-month window: Nov 2025 → Apr 2026  |  50 transactions
// ─────────────────────────────────────────────────────────────────

export const CATEGORY_COLORS = {
  'Food & Dining': '#f97316',
  Shopping:        '#8b5cf6',
  Transport:       '#06b6d4',
  Entertainment:   '#ec4899',
  Housing:         '#84cc16',
  Healthcare:      '#14b8a6',
  Utilities:       '#f59e0b',
  Salary:          '#22c55e',
  Freelance:       '#3b82f6',
  Investment:      '#a855f7',
  Education:       '#fb923c',
  Travel:          '#ef4444',
};

export const CATEGORY_ABBR = {
  'Food & Dining': 'FD',
  Shopping:        'SH',
  Transport:       'TR',
  Entertainment:   'EN',
  Housing:         'HO',
  Healthcare:      'HC',
  Utilities:       'UT',
  Salary:          'SA',
  Freelance:       'FL',
  Investment:      'IN',
  Education:       'ED',
  Travel:          'TV',
};

// ─── 50 curated transactions ──────────────────────────────────────
export const initialTransactions = [

  // ── APRIL 2026 ─────────────────────────────────────────────────
  {
    id: 'txn-001', date: '2026-04-01',
    description: 'Monthly Salary — April',
    category: 'Salary', type: 'income', amount: 108000, status: 'completed',
  },
  {
    id: 'txn-002', date: '2026-04-02',
    description: 'Rent — 3BHK Apartment',
    category: 'Housing', type: 'expense', amount: 28000, status: 'completed',
  },
  {
    id: 'txn-003', date: '2026-04-03',
    description: 'SIP — Axis Bluechip Fund',
    category: 'Investment', type: 'expense', amount: 20000, status: 'completed',
  },
  {
    id: 'txn-004', date: '2026-04-04',
    description: 'BigBasket — Monthly Groceries',
    category: 'Food & Dining', type: 'expense', amount: 8400, status: 'completed',
  },
  {
    id: 'txn-005', date: '2026-04-05',
    description: 'BBMP Health Insurance Premium',
    category: 'Healthcare', type: 'expense', amount: 9200, status: 'completed',
  },

  // ── MARCH 2026 ─────────────────────────────────────────────────
  {
    id: 'txn-006', date: '2026-03-31',
    description: 'Annual Performance Bonus',
    category: 'Salary', type: 'income', amount: 140000, status: 'completed',
  },
  {
    id: 'txn-007', date: '2026-03-01',
    description: 'Monthly Salary — March',
    category: 'Salary', type: 'income', amount: 108000, status: 'completed',
  },
  {
    id: 'txn-008', date: '2026-03-02',
    description: 'Rent — 3BHK Apartment',
    category: 'Housing', type: 'expense', amount: 28000, status: 'completed',
  },
  {
    id: 'txn-009', date: '2026-03-03',
    description: 'SIP — Mirae Asset Emerging Bluechip',
    category: 'Investment', type: 'expense', amount: 20000, status: 'completed',
  },
  {
    id: 'txn-010', date: '2026-03-05',
    description: 'Swiggy — Work-from-home Meals',
    category: 'Food & Dining', type: 'expense', amount: 6200, status: 'completed',
  },
  {
    id: 'txn-011', date: '2026-03-10',
    description: 'Flipkart — Formal Shirts (×3)',
    category: 'Shopping', type: 'expense', amount: 4800, status: 'completed',
  },
  {
    id: 'txn-012', date: '2026-03-15',
    description: 'FD Interest — HDFC Bank (Quarterly)',
    category: 'Investment', type: 'income', amount: 9600, status: 'completed',
  },
  {
    id: 'txn-013', date: '2026-03-18',
    description: 'Ola — Office Commute (Monthly pass)',
    category: 'Transport', type: 'expense', amount: 3200, status: 'completed',
  },
  {
    id: 'txn-014', date: '2026-03-20',
    description: 'Electricity + Gas Bill',
    category: 'Utilities', type: 'expense', amount: 3800, status: 'completed',
  },
  {
    id: 'txn-015', date: '2026-03-25',
    description: 'Amazon — Home Appliance (Mixer)',
    category: 'Shopping', type: 'expense', amount: 5600, status: 'completed',
  },

  // ── FEBRUARY 2026 ──────────────────────────────────────────────
  {
    id: 'txn-016', date: '2026-02-01',
    description: 'Monthly Salary — February',
    category: 'Salary', type: 'income', amount: 108000, status: 'completed',
  },
  {
    id: 'txn-017', date: '2026-02-02',
    description: 'Rent — 3BHK Apartment',
    category: 'Housing', type: 'expense', amount: 28000, status: 'completed',
  },
  {
    id: 'txn-018', date: '2026-02-02',
    description: 'SIP — Parag Parikh Flexicap',
    category: 'Investment', type: 'expense', amount: 20000, status: 'completed',
  },
  {
    id: 'txn-019', date: '2026-02-05',
    description: 'Zomato — Weekend Dining Out',
    category: 'Food & Dining', type: 'expense', amount: 4600, status: 'completed',
  },
  {
    id: 'txn-020', date: '2026-02-08',
    description: 'Valentine\'s — Restaurant Dinner',
    category: 'Food & Dining', type: 'expense', amount: 3800, status: 'completed',
  },
  {
    id: 'txn-021', date: '2026-02-12',
    description: 'Freelance — UI Audit Project',
    category: 'Freelance', type: 'income', amount: 32000, status: 'completed',
  },
  {
    id: 'txn-022', date: '2026-02-14',
    description: 'Myntra — Winter Clearance Clothes',
    category: 'Shopping', type: 'expense', amount: 6200, status: 'completed',
  },
  {
    id: 'txn-023', date: '2026-02-15',
    description: 'Apollo Pharmacy — Medicines',
    category: 'Healthcare', type: 'expense', amount: 1800, status: 'completed',
  },
  {
    id: 'txn-024', date: '2026-02-18',
    description: 'Jio Postpaid + Broadband Bill',
    category: 'Utilities', type: 'expense', amount: 1299, status: 'completed',
  },
  {
    id: 'txn-025', date: '2026-02-22',
    description: 'PVR — Movie Outing (2 tickets)',
    category: 'Entertainment', type: 'expense', amount: 900, status: 'completed',
  },

  // ── JANUARY 2026 ───────────────────────────────────────────────
  {
    id: 'txn-026', date: '2026-01-01',
    description: 'Monthly Salary — January',
    category: 'Salary', type: 'income', amount: 108000, status: 'completed',
  },
  {
    id: 'txn-027', date: '2026-01-02',
    description: 'Rent — 3BHK Apartment',
    category: 'Housing', type: 'expense', amount: 28000, status: 'completed',
  },
  {
    id: 'txn-028', date: '2026-01-02',
    description: 'SIP — HDFC Nifty 50 Index Fund',
    category: 'Investment', type: 'expense', amount: 20000, status: 'completed',
  },
  {
    id: 'txn-029', date: '2026-01-06',
    description: 'Big Bazaar — Monthly Groceries',
    category: 'Food & Dining', type: 'expense', amount: 7800, status: 'completed',
  },
  {
    id: 'txn-030', date: '2026-01-10',
    description: 'Fuel Refill — Honda City',
    category: 'Transport', type: 'expense', amount: 4500, status: 'completed',
  },
  {
    id: 'txn-031', date: '2026-01-12',
    description: 'Udemy — System Design Course',
    category: 'Education', type: 'expense', amount: 4200, status: 'completed',
  },
  {
    id: 'txn-032', date: '2026-01-15',
    description: 'Cult.fit — 3-Month Gym Membership',
    category: 'Healthcare', type: 'expense', amount: 7500, status: 'completed',
  },
  {
    id: 'txn-033', date: '2026-01-18',
    description: 'Netflix + Prime + Hotstar Bundle',
    category: 'Entertainment', type: 'expense', amount: 1498, status: 'completed',
  },
  {
    id: 'txn-034', date: '2026-01-22',
    description: 'Goa Trip — Flight Booking (Return)',
    category: 'Travel', type: 'expense', amount: 18500, status: 'completed',
  },
  {
    id: 'txn-035', date: '2026-01-25',
    description: 'Society Maintenance Charges',
    category: 'Housing', type: 'expense', amount: 3500, status: 'completed',
  },

  // ── DECEMBER 2025 ──────────────────────────────────────────────
  {
    id: 'txn-036', date: '2025-12-01',
    description: 'Monthly Salary — December',
    category: 'Salary', type: 'income', amount: 108000, status: 'completed',
  },
  {
    id: 'txn-037', date: '2025-12-02',
    description: 'Rent — 3BHK Apartment',
    category: 'Housing', type: 'expense', amount: 28000, status: 'completed',
  },
  {
    id: 'txn-038', date: '2025-12-02',
    description: 'SIP — Axis Bluechip Fund',
    category: 'Investment', type: 'expense', amount: 20000, status: 'completed',
  },
  {
    id: 'txn-039', date: '2025-12-10',
    description: 'Q3 Performance Bonus',
    category: 'Salary', type: 'income', amount: 75000, status: 'completed',
  },
  {
    id: 'txn-040', date: '2025-12-12',
    description: 'Amazon — Christmas Shopping Gifts',
    category: 'Shopping', type: 'expense', amount: 12500, status: 'completed',
  },
  {
    id: 'txn-041', date: '2025-12-15',
    description: 'Doctor Consultation + Lab Tests',
    category: 'Healthcare', type: 'expense', amount: 2400, status: 'completed',
  },
  {
    id: 'txn-042', date: '2025-12-20',
    description: 'Restaurant — Year-end Team Dinner',
    category: 'Food & Dining', type: 'expense', amount: 5200, status: 'completed',
  },
  {
    id: 'txn-043', date: '2025-12-22',
    description: 'Shimla Trip — Hotel Stay (3 nights)',
    category: 'Travel', type: 'expense', amount: 22000, status: 'completed',
  },
  {
    id: 'txn-044', date: '2025-12-28',
    description: 'Electricity Bill — December',
    category: 'Utilities', type: 'expense', amount: 4200, status: 'completed',
  },

  // ── NOVEMBER 2025 ──────────────────────────────────────────────
  {
    id: 'txn-045', date: '2025-11-01',
    description: 'Monthly Salary — November',
    category: 'Salary', type: 'income', amount: 108000, status: 'completed',
  },
  {
    id: 'txn-046', date: '2025-11-02',
    description: 'Rent — 3BHK Apartment',
    category: 'Housing', type: 'expense', amount: 28000, status: 'completed',
  },
  {
    id: 'txn-047', date: '2025-11-02',
    description: 'SIP — ICICI Pru Technology Fund',
    category: 'Investment', type: 'expense', amount: 20000, status: 'completed',
  },
  {
    id: 'txn-048', date: '2025-11-08',
    description: 'Diwali Bonus',
    category: 'Salary', type: 'income', amount: 50000, status: 'completed',
  },
  {
    id: 'txn-049', date: '2025-11-10',
    description: 'Diwali — Electronics & Gifts',
    category: 'Shopping', type: 'expense', amount: 24000, status: 'completed',
  },
  {
    id: 'txn-050', date: '2025-11-20',
    description: 'Freelance — Mobile App Consulting',
    category: 'Freelance', type: 'income', amount: 28000, status: 'completed',
  },
].sort((a, b) => new Date(b.date) - new Date(a.date));

// Keep the generator available for future use
export function generateTransactions() {
  return initialTransactions;
}
