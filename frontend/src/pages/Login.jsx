import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('All fields are required');
      return;
    }

    setLoading(true);
    try {
      const response = await API.post('/auth/login', { email, password });
      login(response.data);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center"
    style={{
      backgroundImage: "url('/Gradiente Suave.jpg')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
          }}>
      <div className="bg-gray-800 rounded-xl p-8 w-full max-w-md">
        <h1 className="text-white text-3xl font-bold text-center mb-2">
          💸 ExpenseTracker
      </h1>
        <h2 className="text-white text-2xl font-bold mb-6">Login</h2>

        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-gray-700 text-white rounded-lg p-3 mb-4"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-gray-700 text-white rounded-lg p-3 mb-4"
        />
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-3 mb-4"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <p className="text-gray-400 text-sm text-center">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-400 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;