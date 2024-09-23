import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import './Login.css'; // Ensure the CSS file is imported

const Login = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let filledFields = 0;
    if (username) filledFields += 1;
    if (password) filledFields += 1;
    setProgress((filledFields / 2) * 100);
  }, [username, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/auth/login', {
        username,
        password
      });
      const { access, refresh } = response.data.tokens;
      Cookies.set('accessToken', access);
      Cookies.set('refreshToken', refresh);
      setUser(username);
      navigate('/');
    } catch (error) {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative w-full max-w-md">
        <div className={`progress-bar ${error ? 'blink-red' : ''}`} style={{ width: `${progress}%` }}></div>
        <div className="glass-effect">
          <div className="relative px-8 py-6 mt-4 text-left shadow-lg login-container">
            <h3 className="text-2xl font-bold text-center">Login to ThoughtShare</h3>
            <form onSubmit={handleSubmit}>
              <div className="mt-4">
                <div>
                  <label className="block" htmlFor="username">Username</label>
                  <input
                    type="text"
                    placeholder="Username"
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="mt-4">
                  <label className="block" htmlFor="password">Password</label>
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                <div className="flex items-center justify-center">
                  <button className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">Login</button>
                </div>
              </div>
            </form>
            <p className="mt-4 text-center">
              Don't have an account? <Link to="/register" className="text-blue-600 hover:underline">Register</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;