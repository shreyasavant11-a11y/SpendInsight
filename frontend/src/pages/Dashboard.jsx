import Layout from '../components/Layout';
import { useState, useEffect } from 'react';
import API from '../api/axios';

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

    fetchData();
  }, []);

  const totalExpense = expenses.reduce((sum, item) => sum + item.amount, 0);
  const totalIncome = incomes.reduce((sum, item) => sum + item.amount, 0);
  const balance = totalIncome - totalExpense;
  const recentExpenses = expenses.slice(0, 5);

  if (loading) return <p className="text-white p-8">Loading...</p>;

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-gray-700 rounded-xl p-6">
          <p className="text-gray-400 text-sm">Total Income</p>
          <p className="text-green-400 text-2xl font-bold mt-2">₹{totalIncome}</p>
        </div>

        <div className="bg-gray-700 rounded-xl p-6">
          <p className="text-gray-400 text-sm">Total Expense</p>
          <p className="text-red-400 text-2xl font-bold mt-2">₹{totalExpense}</p>
        </div>

        <div className="bg-gray-700 rounded-xl p-6">
          <p className="text-gray-400 text-sm">Balance</p>
          <p className="text-blue-400 text-2xl font-bold mt-2">₹{balance}</p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Recent Expenses</h2>
        <div className="bg-gray-700 rounded-xl p-6">
          {recentExpenses.length === 0 ? (
            <p className="text-gray-400">No expenses yet!</p>
          ) : (
            recentExpenses.map((expense) => (
              <div key={expense._id} className="flex justify-between py-2 border-b border-gray-600">
                <p className="text-white">{expense.title}</p>
                <p className="text-red-400">₹{expense.amount}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;