# NexusFi — Smart Finance Dashboard

> A futuristic, feature-rich finance dashboard built for the Frontend Developer Intern assignment.

---

## 🚀 Quick Start

```bash
cd finance-dashboard
npm install
npm run dev
```
Then open [http://localhost:5174](http://localhost:5174)

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | **React 18** + **Vite 6** |
| Styling | **Vanilla CSS** (custom design system) |
| State Management | **Zustand** (with `persist` middleware) |
| Charts | **Recharts** — AreaChart, PieChart, BarChart, RadarChart |
| Animations | **Framer Motion** |
| Icons | **Lucide React** |
| Date Utilities | **date-fns** |
| Notifications | **React Hot Toast** |
| Persistence | **localStorage** (via Zustand persist) |

---

## ✨ Features

### 🏠 Dashboard Overview
- **4 Summary Cards** — Total Balance, Income, Expenses, Savings Rate with color-coded glow effects
- **Balance Trend Chart** — 6-month area chart showing income, expenses, and net balance
- **Spending Breakdown Chart** — Donut pie chart by category
- **Monthly Comparison Bar Chart** — Side-by-side income vs expenses per month
- **Top 5 Categories** — Animated progress bars with amounts
- **Recent Transactions** — Last 6 transactions at a glance
- **Live Date Badge** — Real-time indicator

### 💳 Transactions
- **Full data table** with 80 seeded mock transactions
- **Search** — Real-time fuzzy search by description or category
- **Filters** — Type (Income/Expense), Category (13 categories), Date Range
- **Sorting** — By Date, Amount, or Category (Asc/Desc toggle)
- **Pagination** — 12 per page with smart ellipsis navigation
- **Export CSV** — Download filtered transactions
- **Add/Edit/Delete** (Admin only) — Inline row actions

### 📊 Insights
- **4 Key Insight Cards** — Top Category, MoM Expense Change, Savings Rate, Avg Daily Spend
- **Category Breakdown Bars** — Animated proportional bars for all expense categories
- **Radar Chart** — Multi-axis spending distribution across top 6 categories
- **Monthly Summary Table** — 6-month breakdown with surplus/deficit indicators

### 🔐 Role-Based UI (RBAC Simulation)

| Feature | Admin | Viewer |
|---|---|---|
| View all data | ✅ | ✅ |
| Add transactions | ✅ | ❌ |
| Edit transactions | ✅ | ❌ |
| Delete transactions | ✅ | ❌ |
| Export CSV | ✅ | ✅ |

Switch roles instantly from the **sidebar role toggle** — no page refresh needed.

### 🌙 Dark / Light Mode
- Toggle between dark (default) and light themes from the sidebar
- Persisted across sessions via localStorage

### 💾 Data Persistence
- All transactions saved to `localStorage` via Zustand `persist`
- Changes survive page refreshes
- Role and theme preference also persisted

---

## 🗂️ Project Structure

```
src/
├── components/
│   ├── DashboardPage.jsx    # Main dashboard view
│   ├── TransactionsPage.jsx # Transactions table + filtering
│   ├── InsightsPage.jsx     # Analytics and insights
│   ├── Charts.jsx           # Recharts chart components
│   ├── SummaryCards.jsx     # Summary stat cards
│   ├── Sidebar.jsx          # Navigation + role switcher
│   └── Modal.jsx            # Add/Edit transaction modal
├── store/
│   └── useStore.js          # Zustand global state
├── data/
│   └── transactions.js      # Mock data generator + constants
├── utils/
│   └── finance.js           # Financial calculation utilities
├── App.jsx                  # Root layout with routing
├── index.css                # Complete design system (CSS)
└── main.jsx                 # React entry point
```

---

## 🎨 Design Decisions

### Visual Philosophy
The UI follows a **"futuristic OS"** design language:
- Deep space dark theme as base background
- Subtle radial gradient backgrounds (not flat dark)
- Glassmorphism cards with `backdrop-filter: blur`
- Category-specific color coding across all views
- Animated grid overlay texture for depth

### State Management Approach
- **Zustand** was chosen over Redux for minimal boilerplate
- A **single store** holds: transactions, filters, role, theme, and modal state
- The `persist` middleware automatically syncs to `localStorage`
- Filters live in the store for cross-component sharing

### Component Architecture
- Pages are top-level components that read from the Zustand store
- Charts are isolated in `Charts.jsx` to prevent re-render pollution
- The `Modal` is globally mounted in `App.jsx` and controlled via store state — no prop drilling
- Utility functions in `finance.js` are pure functions (no side effects)

### Responsive Strategy
- CSS Grid with explicit breakpoints
- Sidebar collapses to off-canvas drawer on mobile (< 900px)
- Table becomes horizontally scrollable on small screens
- Cards reflow from 4-column to 2-column to 1-column

---

## 📱 Responsive Breakpoints

| Breakpoint | Layout Change |
|---|---|
| `< 1200px` | Cards go 2-column, charts stack |
| `< 900px` | Sidebar becomes mobile drawer |
| `< 640px` | Cards go 2-column, smaller text |
| `< 420px` | Cards stack single column |

---

## 🧪 Mock Data

80 transactions are seeded randomly using `generateTransactions()`:
- 28% income (Salary, Freelance, Investment)
- 72% expenses (9 categories)
- Spread over the last 6 months
- 5% chance of `pending` status

---

## 📦 Installation

```bash
npm install      # Install dependencies
npm run dev      # Start development server (localhost:5174)
npm run build    # Build for production
npm run preview  # Preview production build
```

---

## 🏗️ Assumptions Made

1. **Indian Rupee (₹)** used as currency with `en-IN` locale formatting
2. **No backend** — all data is client-side with localStorage persistence
3. **Role switching** is UI-only simulation (no authentication layer)
4. **Random data** is generated fresh on first load, then persisted
5. The **"Add Transaction"** modal auto-assigns today's date as default

---

*Built with React + Vite | FinanceOS — Smart Finance Dashboard*
