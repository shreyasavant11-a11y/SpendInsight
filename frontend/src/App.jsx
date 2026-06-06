import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ExpenseEntry from './pages/ExpenseEntry.jsx';
import History from './pages/History';
import AnalysisHistory from './pages/AnalysisHistory';

// Guard — sirf ek kaam: logged in hai toh andar, nahi toh login pe
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Routes>
      {/* / pe aao toh dashboard pe bhejo */}
      <Route path="/" element={<Navigate to="/dashboard" />} />

      {/* Public routes — bina login ke accessible */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected routes — sirf logged in user */}
      <Route path="/dashboard" element={
        <ProtectedRoute><Dashboard /></ProtectedRoute>
      } />
      <Route path="/expenses" element={
        <ProtectedRoute><ExpenseEntry /></ProtectedRoute>
      } />
      <Route path="/history" element={
        <ProtectedRoute><History /></ProtectedRoute>
      } />
      <Route path="/analysis" element={
        <ProtectedRoute><AnalysisHistory /></ProtectedRoute>
      } />
    </Routes>
  );
};

export default App;