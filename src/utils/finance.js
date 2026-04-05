import { format, subMonths, startOfMonth, endOfMonth, parseISO, isWithinInterval } from 'date-fns';

export function formatCurrency(amount, compact = false) {
  if (compact && amount >= 100000) {
    return `₹${(amount / 100000).toFixed(1)}L`;
  }
  if (compact && amount >= 1000) {
    return `₹${(amount / 1000).toFixed(1)}K`;
  }
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateStr) {
  try {
    return format(parseISO(dateStr), 'dd MMM yyyy');
  } catch {
    return dateStr;
  }
}

export function getFilteredTransactions(transactions, filters) {
  let result = [...transactions];

  // Search
  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (t) =>
        t.description.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
    );
  }

  // Category
  if (filters.category !== 'all') {
    result = result.filter((t) => t.category === filters.category);
  }

  // Type
  if (filters.type !== 'all') {
    result = result.filter((t) => t.type === filters.type);
  }

  // Date range
  if (filters.dateRange !== 'all') {
    const now = new Date();
    let from;
    if (filters.dateRange === '7d') from = subMonths(now, 0.25);
    if (filters.dateRange === '30d') from = subMonths(now, 1);
    if (filters.dateRange === '90d') from = subMonths(now, 3);
    if (filters.dateRange === '6m') from = subMonths(now, 6);
    if (from) {
      result = result.filter((t) => new Date(t.date) >= from);
    }
  }

  // Sort
  result.sort((a, b) => {
    let valA, valB;
    if (filters.sortBy === 'date') {
      valA = new Date(a.date);
      valB = new Date(b.date);
    } else if (filters.sortBy === 'amount') {
      valA = a.amount;
      valB = b.amount;
    } else if (filters.sortBy === 'category') {
      valA = a.category;
      valB = b.category;
    }
    if (valA < valB) return filters.sortDir === 'asc' ? -1 : 1;
    if (valA > valB) return filters.sortDir === 'asc' ? 1 : -1;
    return 0;
  });

  return result;
}

export function getSummary(transactions) {
  const income = transactions.filter((t) => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const expenses = transactions.filter((t) => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  const balance = income - expenses;
  const savingsRate = income > 0 ? ((income - expenses) / income) * 100 : 0;
  return { income, expenses, balance, savingsRate };
}

export function getMonthlyData(transactions) {
  const months = [];
  for (let i = 5; i >= 0; i--) {
    const date = subMonths(new Date(), i);
    const label = format(date, 'MMM yy');
    const start = startOfMonth(date);
    const end = endOfMonth(date);
    const monthTxns = transactions.filter((t) =>
      isWithinInterval(parseISO(t.date), { start, end })
    );
    const income = monthTxns.filter((t) => t.type === 'income').reduce((s, t) => s + t.amount, 0);
    const expenses = monthTxns.filter((t) => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
    months.push({ month: label, income, expenses, balance: income - expenses });
  }
  return months;
}

export function getCategoryBreakdown(transactions) {
  const expenseTxns = transactions.filter((t) => t.type === 'expense');
  const totals = {};
  expenseTxns.forEach((t) => {
    totals[t.category] = (totals[t.category] || 0) + t.amount;
  });
  return Object.entries(totals)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
}

export function getInsights(transactions) {
  const summary = getSummary(transactions);
  const breakdown = getCategoryBreakdown(transactions);
  const topCategory = breakdown[0];
  const monthly = getMonthlyData(transactions);
  const lastMonth = monthly[monthly.length - 1];
  const prevMonth = monthly[monthly.length - 2];

  const expenseDiff = lastMonth && prevMonth
    ? ((lastMonth.expenses - prevMonth.expenses) / (prevMonth.expenses || 1)) * 100
    : 0;

  const pendingCount = transactions.filter((t) => t.status === 'pending').length;

  return {
    topCategory,
    expenseDiff,
    savingsRate: summary.savingsRate,
    pendingCount,
    monthly,
    breakdown,
    avgDailyExpense: summary.expenses / 180,
  };
}
