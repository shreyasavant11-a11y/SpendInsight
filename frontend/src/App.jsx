import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ExpenseEntry from './pages/ExpenseEntry';
import History from './pages/History';
import AnalysisHistory from './pages/AnalysisHistory';
import Income from './pages/Income';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={
        <ProtectedRoute><Dashboard /></ProtectedRoute>
      } />
      <Route path="/income" element={
        <ProtectedRoute><Income /></ProtectedRoute>
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