import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/axios';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError('All fields are required');
      return;
    }

    if (
      password.length < 8 ||
      !/[A-Z]/.test(password) ||
      !/[a-z]/.test(password) ||
      !/[!@#$%^&*]/.test(password)
    ) {
      setError('Password must be at least 8 characters and contain 1 uppercase, 1 lowercase and 1 special character (!@#$%^&*)');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email!');
      return;
    }

    setLoading(true);
    try {
      await API.post('/auth/register', { name, email, password });
      setSuccess('Account created! Please login.');
      navigate('/login');
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
        <h2 className="text-white text-2xl font-bold mb-6">Create Account</h2>

        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
        {success && <p className="text-green-400 text-sm mb-4">{success}</p>}

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-gray-700 text-white rounded-lg p-3 mb-4"
        />
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
          onClick={handleRegister}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg p-3 mb-4"
        >
          {loading ? 'Creating account...' : 'Create Account'}
        </button>

        <p className="text-gray-400 text-sm text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;