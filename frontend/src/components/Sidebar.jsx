import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const { logout, user } = useAuth();

  return (
    <div className="w-64 min-h-screen bg-[#14161f] flex flex-col p-5 border-r border-white/5">

      {/* Brand */}
      <div className="flex items-center gap-2 mb-1">
        <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl p-2">
          <span className="text-xl">💡</span>
        </div>
        <h1 className="text-2xl font-extrabold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
          SpendInsight
        </h1>
      </div>

      <p className="text-gray-500 text-xs mb-8 ml-1">Smart expense tracking</p>

      {/* Welcome */}
      <div className="bg-white/5 rounded-xl p-3 mb-6 flex items-center gap-2">
        <span className="text-lg">👋</span>
        <p className="text-gray-300 text-sm">
          Welcome, <span className="font-semibold text-white">{user?.name}</span>
        </p>
      </div>

      <nav className="flex-1 space-y-1">
        <NavLink to="/dashboard"
          className={({ isActive }) =>
            `block p-3 rounded-xl text-sm font-medium transition ${isActive
              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg'
              : 'text-gray-400 hover:bg-white/5 hover:text-white'}`
          }>
          📊 Dashboard
        </NavLink>

        <NavLink to="/history"
          className={({ isActive }) =>
            `block p-3 rounded-xl text-sm font-medium transition ${isActive
              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg'
              : 'text-gray-400 hover:bg-white/5 hover:text-white'}`
          }>
          📋 History
        </NavLink>

        <NavLink to="/income-history"
              className={({ isActive }) =>
            `block p-3 rounded-xl text-sm font-medium transition ${isActive
              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg'
              : 'text-gray-400 hover:bg-white/5 hover:text-white'}`
          }>
          💰 Income History
      </NavLink>


        <NavLink to="/analysis"
          className={({ isActive }) =>
            `block p-3 rounded-xl text-sm font-medium transition ${isActive
              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg'
              : 'text-gray-400 hover:bg-white/5 hover:text-white'}`
          }>
          🤖 AI Analysis
        </NavLink>
      </nav>

      <button
        onClick={logout}
        className="w-full p-3 text-sm font-medium text-red-400 hover:bg-red-500/10 rounded-xl text-left transition">
        🚪 Logout
      </button>
    </div>
  );
};

export default Sidebar;