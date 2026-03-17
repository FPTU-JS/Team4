import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Lock, Eye, EyeOff, MoveLeft } from 'lucide-react';
import '../css/login.css';
import { useAuth } from './AuthContext';

function Login() {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  //Ẩn hiện pasword
  const [showPassword, setShowPassword] = useState(false);

  //Form data lấy email 
  const [formData, setFormData] = useState({
    emailOrUsername: '',
    password: ''
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/onboarding', { replace: true });
    }
  }, [navigate])
  // Hàm cập nhật giá trị khi gõ
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSocialLogin = (provider) => {
    // Chuyển hướng người dùng đến URL oauth2 của Backend
    window.location.href = `http://localhost:8081/oauth2/authorization/${provider}`;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    // Simulate login for now
    setIsLoading(true);
    setError('');

    try {
      await login(formData.emailOrUsername, formData.password);
      navigate('/', { replace: true })
    } catch (err) {
      // Xử lý lỗi nếu sai mật khẩu hoặc server lỗi
      setError(err.response?.data?.message || 'Login failed. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isAuthenticated) return null;

  return (
    <div className="login-page">
      {/* Left Image Section */}
      <div className="login-left">
        <div className="logo-co-che">
          <span className="logo-icon">✻</span> CO-CHE
        </div>

        <div className="login-left-content">
          <span className="featured-badge">FEATURED CHEF</span>
          <h1 className="quote-text">
            "Cooking is not just about ingredients, it's about the story you tell on the plate."
          </h1>
          <div className="chef-profile">
            <div className="chef-avatar">
              <img src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" alt="Chef Marco Pierre" />
            </div>
            <div className="chef-info">
              <h4>Chef Marco Pierre</h4>
              <p>Head Chef @ Le Gourmet</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Form Section */}
      <div className="login-right">
        <Link to="/" className="back-to-home">
          <MoveLeft size={16} />
          Back to Home
        </Link>

        <div className="login-form-container">
          <div className="login-header">
            <h2>Welcome Back</h2>
            <p>Enter your credentials to access your chef dashboard.</p>
          </div>
          
          {/* Hiện lỗi login */}
          {error && (
            <div className="alert alert-error">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label>Email or Username</label>
              <div className="input-wrapper">
                <input type="text" name='emailOrUsername' onChange={handleChange} value={formData.emailOrUsername} placeholder="chef@example.com" required />
                <span className="input-icon">
                  <User size={18} strokeWidth={1.5} />
                </span>
              </div>
            </div>

            <div className="input-group">
              <label>Password</label>
              <div className="input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  name='password'
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                />
                {/* Icon Khóa cố định bên trái */}
                <span className="input-icon">
                  <Lock size={18} strokeWidth={1.5} />
                </span>

                {/* Icon Mắt bấm được bên phải */}
                <span
                  className="input-icon-right"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff size={18} strokeWidth={1.5} />
                  ) : (
                    <Eye size={18} strokeWidth={1.5} />
                  )}
                </span>
              </div>
            </div>

            <div className="forgot-password-container">
              <Link to="/forgot-password" className="forgot-password">Forgot Password?</Link>
            </div>

            <button type="submit" className="login-btn">
              Login to CO-CHE <span>→</span>
            </button>
          </form>

          <div className="divider">
            <span>Or continue with</span>
          </div>

          <div className="social-login">
            <button
              className="social-btn"
              onClick={() => handleSocialLogin('google')}
              type="button"
            >
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" alt="Google" />
              Google
            </button>
            <button
              className="social-btn"
              onClick={() => handleSocialLogin('facebook')}
              type="button"
            >
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/facebook/facebook-original.svg" alt="Facebook" />
              Facebook
            </button>
          </div>

          <p className="register-link">
            New to CO-CHE? <Link to="/register">Register here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;