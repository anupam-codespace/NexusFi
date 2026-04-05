import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';
import { getFilteredTransactions, formatCurrency, formatDate } from '../utils/finance';
import { CATEGORY_COLORS, CATEGORY_ABBR } from '../data/transactions';
import { Search, SortAsc, SortDesc, Trash2, Edit2, Plus, Download, X, Lock } from 'lucide-react';

const categories = [
  'all', 'Food & Dining', 'Shopping', 'Transport', 'Entertainment',
  'Housing', 'Healthcare', 'Utilities', 'Salary', 'Freelance',
  'Investment', 'Education', 'Travel',
];

function CategoryChip({ category }) {
  return (
    <div className="txn-category" style={{ borderColor: CATEGORY_COLORS[category] + '50' }}>
      <span
        style={{
          display: 'inline-block',
          width: 7,
          height: 7,
          borderRadius: '50%',
          backgroundColor: CATEGORY_COLORS[category] || '#64748b',
          flexShrink: 0,
        }}
      />
      {category}
    </div>
  );
}

export default function TransactionsPage() {
  const { transactions, filters, setFilter, resetFilters, role, openModal, deleteTransaction } = useStore();
  const [page, setPage] = useState(1);
  const PER_PAGE = 12;
  const isViewer = role === 'viewer';

  const filtered = getFilteredTransactions(transactions, filters);
  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  function exportCSV() {
    const headers = ['Date', 'Description', 'Category', 'Type', 'Amount', 'Status'];
    const rows = filtered.map((t) => [t.date, t.description, t.category, t.type, t.amount, t.status]);
    const csv = [headers, ...rows].map((r) => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transactions-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const activeFiltersCount = [
    filters.search,
    filters.category !== 'all',
    filters.type !== 'all',
    filters.dateRange !== 'all',
  ].filter(Boolean).length;

  return (
    <div className="transactions-page">
      <div className="page-header">
        <div>
          <h2 className="page-title">Transactions</h2>
          <p className="page-sub">
            {filtered.length} of {transactions.length} records
            {isViewer && <span className="viewer-readonly-label"><Lock size={11} /> Read Only</span>}
          </p>
        </div>
        <div className="page-actions">
          {!isViewer && (
            <motion.button
              className="btn-primary"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => openModal('add')}
            >
              <Plus size={15} /> Add Transaction
            </motion.button>
          )}
          <motion.button
            className="btn-secondary"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={exportCSV}
          >
            <Download size={15} /> Export CSV
          </motion.button>
        </div>
      </div>

      {/* Viewer Mode Banner */}
      {isViewer && (
        <motion.div
          className="viewer-mode-banner"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Lock size={14} />
          <span>
            <strong>Viewer Mode</strong> — You have read-only access. Switch to Admin from the sidebar to manage transactions.
          </span>
        </motion.div>
      )}

      {/* Filters Bar */}
      <div className="filters-bar">
        <div className="search-wrap">
          <Search size={15} className="search-icon" />
          <input
            className="search-input"
            placeholder="Search by description or category..."
            value={filters.search}
            onChange={(e) => { setFilter('search', e.target.value); setPage(1); }}
          />
          {filters.search && (
            <button className="clear-search" onClick={() => setFilter('search', '')}>
              <X size={13} />
            </button>
          )}
        </div>

        <select className="filter-select" value={filters.type}
          onChange={(e) => { setFilter('type', e.target.value); setPage(1); }}>
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <select className="filter-select" value={filters.category}
          onChange={(e) => { setFilter('category', e.target.value); setPage(1); }}>
          {categories.map((c) => (
            <option key={c} value={c}>{c === 'all' ? 'All Categories' : c}</option>
          ))}
        </select>

        <select className="filter-select" value={filters.dateRange}
          onChange={(e) => { setFilter('dateRange', e.target.value); setPage(1); }}>
          <option value="all">All Time</option>
          <option value="7d">Last 7 Days</option>
          <option value="30d">Last 30 Days</option>
          <option value="90d">Last 90 Days</option>
          <option value="6m">Last 6 Months</option>
        </select>

        <div className="sort-wrap">
          <select className="filter-select" value={filters.sortBy}
            onChange={(e) => setFilter('sortBy', e.target.value)}>
            <option value="date">Date</option>
            <option value="amount">Amount</option>
            <option value="category">Category</option>
          </select>
          <button className="sort-dir-btn"
            title={`Sort ${filters.sortDir === 'asc' ? 'descending' : 'ascending'}`}
            onClick={() => setFilter('sortDir', filters.sortDir === 'asc' ? 'desc' : 'asc')}>
            {filters.sortDir === 'asc' ? <SortAsc size={15} /> : <SortDesc size={15} />}
          </button>
        </div>

        {activeFiltersCount > 0 && (
          <button className="reset-btn" onClick={() => { resetFilters(); setPage(1); }}>
            <X size={13} /> Reset ({activeFiltersCount})
          </button>
        )}
      </div>

      {/* Table */}
      {paginated.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon"><Search size={32} strokeWidth={1} /></div>
          <p>No transactions match your filters</p>
          <button className="btn-secondary" onClick={resetFilters}>Clear Filters</button>
        </div>
      ) : (
        <>
          <div className="table-wrap">
            <table className="txn-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Category</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Status</th>
                  {!isViewer && <th>Actions</th>}
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {paginated.map((txn, i) => (
                    <motion.tr
                      key={txn.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: i * 0.015 }}
                      className="txn-row"
                    >
                      <td className="txn-date">{formatDate(txn.date)}</td>
                      <td className="txn-desc">{txn.description}</td>
                      <td><CategoryChip category={txn.category} /></td>
                      <td>
                        <span className={`txn-type ${txn.type}`}>
                          {txn.type === 'income' ? 'Income' : 'Expense'}
                        </span>
                      </td>
                      <td className={`txn-amount ${txn.type}`}>
                        {txn.type === 'income' ? '+' : '−'}{formatCurrency(txn.amount)}
                      </td>
                      <td>
                        <span className={`txn-status ${txn.status}`}>{txn.status}</span>
                      </td>
                      {!isViewer && (
                        <td className="txn-actions">
                          <button className="action-btn edit" title="Edit" onClick={() => openModal('edit', txn)}>
                            <Edit2 size={13} />
                          </button>
                          <button className="action-btn delete" title="Delete" onClick={() => deleteTransaction(txn.id)}>
                            <Trash2 size={13} />
                          </button>
                        </td>
                      )}
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button className="page-btn" disabled={page === 1} onClick={() => setPage(p => p - 1)}>&#8249;</button>
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(p => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
                .reduce((acc, p, i, arr) => {
                  if (i > 0 && arr[i - 1] !== p - 1) acc.push('...');
                  acc.push(p);
                  return acc;
                }, [])
                .map((p, i) =>
                  p === '...' ? (
                    <span key={`el-${i}`} className="page-ellipsis">…</span>
                  ) : (
                    <button key={p} className={`page-btn ${page === p ? 'active' : ''}`} onClick={() => setPage(p)}>{p}</button>
                  )
                )}
              <button className="page-btn" disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>&#8250;</button>
              <span className="page-info">Page {page} of {totalPages}</span>
            </div>
          )}
        </>
      )}
    </div>
  );
}
