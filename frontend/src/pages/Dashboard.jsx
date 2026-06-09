import Layout from '../components/Layout';

const Dashboard = () => {
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-gray-700 rounded-xl p-6">
          <p className="text-gray-400 text-sm">Total Income</p>
          <p className="text-green-400 text-2xl font-bold mt-2">₹0</p>
        </div>

        <div className="bg-gray-700 rounded-xl p-6">
          <p className="text-gray-400 text-sm">Total Expense</p>
          <p className="text-red-400 text-2xl font-bold mt-2">₹0</p>
        </div>

        <div className="bg-gray-700 rounded-xl p-6">
          <p className="text-gray-400 text-sm">Balance</p>
          <p className="text-blue-400 text-2xl font-bold mt-2">₹0</p>
        </div>
      </div>

      
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Recent Expenses</h2>
        <div className="bg-gray-700 rounded-xl p-6">
          <p className="text-gray-400">No expenses yet!</p>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;