import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';

const categories = [
  'Food & Dining', 'Shopping', 'Transport', 'Entertainment',
  'Housing', 'Healthcare', 'Utilities', 'Salary', 'Freelance',
  'Investment', 'Education', 'Travel',
];

export default function Modal() {
  const { modal, closeModal, addTransaction, updateTransaction } = useStore();
  const { open, type, data } = modal;

  const defaultForm = {
    description: '',
    category: 'Food & Dining',
    type: 'expense',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    status: 'completed',
  };

  const [form, setForm] = useState(defaultForm);

  useEffect(() => {
    if (open) {
      setForm(data ? { ...defaultForm, ...data, amount: data.amount?.toString() || '' } : defaultForm);
    }
  }, [open, data]);

  if (!open) return null;
  const isEdit = type === 'edit';

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.description.trim() || !form.amount) {
      toast.error('Please fill in all required fields.');
      return;
    }
    const payload = { ...form, amount: parseFloat(form.amount) };
    if (isEdit) {
      updateTransaction(data.id, payload);
    } else {
      addTransaction(payload);
    }
    closeModal();
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => e.target === e.currentTarget && closeModal()}
        >
          <motion.div
            className="modal-box"
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 290, damping: 30 }}
          >
            <div className="modal-header">
              <div>
                <h3>{isEdit ? 'Edit Transaction' : 'New Transaction'}</h3>
                <p className="modal-sub">{isEdit ? 'Update the transaction details below.' : 'Enter the details for the new transaction.'}</p>
              </div>
              <button className="modal-close" onClick={closeModal}><X size={18} /></button>
            </div>

            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-group">
                <label>Description <span className="req">*</span></label>
                <input
                  className="form-input"
                  placeholder="e.g. Amazon Purchase"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Transaction Type <span className="req">*</span></label>
                  <div className="type-toggle">
                    <button
                      type="button"
                      className={`type-btn ${form.type === 'income' ? 'active-income' : ''}`}
                      onClick={() => setForm({ ...form, type: 'income' })}
                    >
                      Income
                    </button>
                    <button
                      type="button"
                      className={`type-btn ${form.type === 'expense' ? 'active-expense' : ''}`}
                      onClick={() => setForm({ ...form, type: 'expense' })}
                    >
                      Expense
                    </button>
                  </div>
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select className="form-input" value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}>
                    <option value="completed">Completed</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Amount (INR) <span className="req">*</span></label>
                  <input
                    className="form-input"
                    type="number"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    value={form.amount}
                    onChange={(e) => setForm({ ...form, amount: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Date</label>
                  <input
                    className="form-input"
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Category</label>
                <select className="form-input" value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}>
                  {categories.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={closeModal}>Cancel</button>
                <button type="submit" className="btn-primary">
                  {isEdit ? 'Save Changes' : 'Add Transaction'}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
