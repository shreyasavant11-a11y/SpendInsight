import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const { logout, user } = useAuth();

  return (
    <div className="w-64 min-h-screen bg-gray-900 flex flex-col p-4">

      <h1 className="text-white text-xl font-bold mb-8">
        💸 ExpenseTracker
      </h1>

      <p className="text-gray-400 text-sm mb-6">
        Hello, {user?.name} 👋
      </p>

      <nav className="flex-1 space-y-2">

        <NavLink to="/dashboard"
          className={({ isActive }) =>
            `block p-3 rounded-lg text-sm ${isActive
              ? 'bg-blue-600 text-white'
              : 'text-gray-400 hover:bg-gray-800'}`
          }>
          📊 Dashboard
        </NavLink>

        <NavLink to="/expenses"
          className={({ isActive }) =>
            `block p-3 rounded-lg text-sm ${isActive
              ? 'bg-blue-600 text-white'
              : 'text-gray-400 hover:bg-gray-800'}`
          }>
          ➕ Add Expense
        </NavLink>

        <NavLink to="/income"
          className={({ isActive }) =>
            `block p-3 rounded-lg text-sm ${isActive
              ? 'bg-blue-600 text-white'
              : 'text-gray-400 hover:bg-gray-800'}`
          }>
          💵 Add Income
        </NavLink>

        <NavLink to="/history"
          className={({ isActive }) =>
            `block p-3 rounded-lg text-sm ${isActive
              ? 'bg-blue-600 text-white'
              : 'text-gray-400 hover:bg-gray-800'}`
          }>
          📋 History
        </NavLink>

        <NavLink to="/analysis"
          className={({ isActive }) =>
            `block p-3 rounded-lg text-sm ${isActive
              ? 'bg-blue-600 text-white'
              : 'text-gray-400 hover:bg-gray-800'}`
          }>
          🤖 AI Analysis
        </NavLink>

      </nav>

      <button
        onClick={logout}
        className="w-full p-3 text-sm text-red-400 hover:bg-gray-800 rounded-lg text-left">
        🚪 Logout
      </button>

    </div>
  );
};

export default Sidebar;