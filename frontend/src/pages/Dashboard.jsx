import Layout from '../components/Layout';
import { useState, useEffect } from 'react';
import API from '../api/axios';
import PieChart from '../components/PieChart';

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('monthly');

  const [expTitle, setExpTitle] = useState('');
  const [expAmount, setExpAmount] = useState('');
  const [expNote, setExpNote] = useState('');

  const [incTitle, setIncTitle] = useState('');
  const [incAmount, setIncAmount] = useState('');
  const [incNote, setIncNote] = useState('');

  const [expSuccess, setExpSuccess] = useState('');
  const [incSuccess, setIncSuccess] = useState('');

  const fetchData = async () => {
    try {
      const expenseRes = await API.get('/expenses');
      const incomeRes = await API.get('/incomes');
      setExpenses(expenseRes.data);
      setIncomes(incomeRes.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddExpense = async (e) => {
    e.preventDefault();

    if (!expTitle.trim()) {
      return alert('Title is required');
    }
    if (!isNaN(expTitle.trim())) {
      return alert('Title cannot be a number');
    }
    if (expTitle.trim().length > 50) {
      return alert('Title cannot exceed 50 characters');
    }
    if (!expAmount || Number(expAmount) <= 0) {
      return alert('Amount must be positive');
    }

    await API.post('/expenses', {
      title: expTitle.trim(),
      amount: Number(expAmount),
      note: expNote.trim()
    });
    setExpTitle('');
    setExpAmount('');
    setExpNote('');
    setExpSuccess('✅ Expense added successfully!');
    setTimeout(() => setExpSuccess(''), 3000);
    fetchData();
  };

  const handleAddIncome = async (e) => {
    e.preventDefault();

    if (!incTitle.trim()) {
      return alert('Title is required');
    }
    if (!isNaN(incTitle.trim())) {
      return alert('Title cannot be a number');
    }
    if (incTitle.trim().length > 50) {
      return alert('Title cannot exceed 50 characters');
    }
    if (!incAmount || Number(incAmount) <= 0) {
      return alert('Amount must be positive');
    }

    await API.post('/incomes', {
      title: incTitle.trim(),
      amount: Number(incAmount),
      note: incNote.trim()
    });
    setIncTitle('');
    setIncAmount('');
    setIncNote('');
    setIncSuccess('✅ Income added successfully!');
    setTimeout(() => setIncSuccess(''), 3000);
    fetchData();
  };

  const getFilteredExpenses = () => {
    const now = new Date();
    let startDate;

    if (filter === 'weekly') {
      const day = now.getDay();
      const diff = now.getDate() - day + (day === 0 ? -6 : 1);
      startDate = new Date(now.getFullYear(), now.getMonth(), diff);
      startDate.setHours(0, 0, 0, 0);
    } else if (filter === 'monthly') {
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    } else {
      startDate = new Date(now.getFullYear(), 0, 1);
    }
    return expenses.filter(e => new Date(e.date) >= startDate);
  };

  const getFilteredIncomes = () => {
    const now = new Date();
    let startDate;

    if (filter === 'weekly') {
      const day = now.getDay();
      const diff = now.getDate() - day + (day === 0 ? -6 : 1);
      startDate = new Date(now.getFullYear(), now.getMonth(), diff);
      startDate.setHours(0, 0, 0, 0);
    } else if (filter === 'monthly') {
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    } else {
      startDate = new Date(now.getFullYear(), 0, 1);
    }
    return incomes.filter(i => new Date(i.date) >= startDate);
  };

  const filteredExpenses = getFilteredExpenses();
  const filteredIncomes = getFilteredIncomes();

  const periodLabel = filter === 'weekly' ? 'This Week' : filter === 'monthly' ? 'This Month' : 'This Year';

  const totalExpense = filteredExpenses.reduce((sum, item) => sum + item.amount, 0);
  const totalIncome = filteredIncomes.reduce((sum, item) => sum + item.amount, 0);
  const balance = totalIncome - totalExpense;

  const totalTransactions = filteredExpenses.length;
  const avgExpense = filteredExpenses.length > 0
    ? (totalExpense / filteredExpenses.length).toFixed(0)
    : 0;

  if (loading) return <p className="text-white p-8">Loading...</p>;

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-[#1c1f2e] border border-white/5 rounded-2xl shadow-lg p-6">
          <h2 className="text-lg font-bold mb-4">➕ Add Expense</h2>
          <input
            type="text"
            placeholder="Title (max 50 chars)"
            value={expTitle}
            onChange={(e) => setExpTitle(e.target.value)}
            className="w-full bg-gray-600 text-white rounded-lg p-2 mb-3"
            maxLength={50}
          />
          <input
            type="number"
            placeholder="Amount"
            value={expAmount}
            onChange={(e) => setExpAmount(e.target.value)}
            className="w-full bg-gray-600 text-white rounded-lg p-2 mb-3"
          />
          <input
            type="text"
            placeholder="Note (optional)"
            value={expNote}
            onChange={(e) => setExpNote(e.target.value)}
            className="w-full bg-gray-600 text-white rounded-lg p-2 mb-3"
          />
          <button
            onClick={handleAddExpense}
            className="w-full bg-red-600 hover:bg-red-700 text-white rounded-lg p-2"
          >
            Add Expense
          </button>
          {expSuccess && (
            <p className="text-green-400 text-sm mt-2">{expSuccess}</p>
          )}
        </div>

        <div className="bg-[#1c1f2e] border border-white/5 rounded-2xl shadow-lg p-6">
          <h2 className="text-lg font-bold mb-4">💵 Add Income</h2>
          <input
            type="text"
            placeholder="Title (max 50 chars)"
            value={incTitle}
            onChange={(e) => setIncTitle(e.target.value)}
            className="w-full bg-gray-600 text-white rounded-lg p-2 mb-3"
            maxLength={50}
          />
          <input
            type="number"
            placeholder="Amount"
            value={incAmount}
            onChange={(e) => setIncAmount(e.target.value)}
            className="w-full bg-gray-600 text-white rounded-lg p-2 mb-3"
          />
          <input
            type="text"
            placeholder="Note (optional)"
            value={incNote}
            onChange={(e) => setIncNote(e.target.value)}
            className="w-full bg-gray-600 text-white rounded-lg p-2 mb-3"
          />
          <button
            onClick={handleAddIncome}
            className="w-full bg-green-600 hover:bg-green-700 text-white rounded-lg p-2"
          >
            Add Income
          </button>
          {incSuccess && (
            <p className="text-green-400 text-sm mt-2">{incSuccess}</p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold">Dashboard Overview</h2>
          <p className="text-gray-500 text-xs mt-1">
            Showing: <span className="text-purple-400">{periodLabel}</span>
          </p>
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="bg-gray-600 text-white rounded-lg p-2 text-sm"
        >
          <option value="weekly">This Week</option>
          <option value="monthly">This Month</option>
          <option value="yearly">This Year</option>
        </select>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-[#1c1f2e] border border-white/5 rounded-2xl shadow-lg p-6">
          <p className="text-gray-400 text-sm">{periodLabel} Income</p>
          <p className="text-green-400 text-2xl font-bold mt-2">₹{totalIncome}</p>
        </div>
        <div className="bg-[#1c1f2e] border border-white/5 rounded-2xl shadow-lg p-6">
          <p className="text-gray-400 text-sm">{periodLabel} Expense</p>
          <p className="text-red-400 text-2xl font-bold mt-2">₹{totalExpense}</p>
        </div>
        <div className="bg-[#1c1f2e] border border-white/5 rounded-2xl shadow-lg p-6">
          <p className="text-gray-400 text-sm">{periodLabel} Balance</p>
          <p className="text-blue-400 text-2xl font-bold mt-2">₹{balance}</p>
        </div>
      </div>

      {expenses.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Spending Breakdown</h2>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-[#1c1f2e] border border-white/5 rounded-2xl shadow-lg p-6">
              {filteredExpenses.length === 0 ? (
                <p className="text-gray-400">No expenses in this period!</p>
              ) : (
                <PieChart expenses={filteredExpenses} />
              )}
            </div>
            <div className="bg-[#1c1f2e] border border-white/5 rounded-2xl shadow-lg p-6">
              <h2 className="text-lg font-bold mb-4">Top Categories</h2>
              <div className="space-y-3">
                <p className="text-gray-300">
                  Total Transactions: <span className="font-bold text-white">{totalTransactions}</span>
                </p>
                <p className="text-gray-300">
                  Average Expense: <span className="font-bold text-white">₹{avgExpense}</span>
                </p>
                <p className="text-gray-300">
                  {periodLabel} Total: <span className="font-bold text-white">₹{totalExpense}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Dashboard;