import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { User, Lock, Eye, EyeOff, MoveLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import '../css/login.css';
import { useAuth } from './AuthContext';
// Define Yup validation schema
const schema = yup.object({
  emailOrUsername: yup.string().required('Email or Username is required'),
  password: yup.string().required('Password is required'),
}).required();

function Login() {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Initialize react-hook-form
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      emailOrUsername: '',
      password: ''
    }
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSocialLogin = (provider) => {
    // Chuyển hướng người dùng đến URL oauth2 của Backend
    const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081';
    window.location.href = `${baseUrl}/oauth2/authorization/${provider}`;
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    const loadingToast = toast.loading('Logging in...');

    try {
      await login(data.emailOrUsername, data.password);
      toast.success('Successfully logged in!', { id: loadingToast });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed. Please try again.', { id: loadingToast });
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

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="input-group">
              <label>Email or Username</label>
              <div className={`input-wrapper ${errors.emailOrUsername ? 'has-error' : ''}`}>
                <span className="input-icon-left">
                  <User size={18} strokeWidth={1.5} />
                </span>
                <input 
                  type="text" 
                  {...register('emailOrUsername')}
                  placeholder="chef@example.com" 
                />
              </div>
              {errors.emailOrUsername && <span className="error-text" style={{color: '#ef4444', fontSize: '0.85rem', marginTop: '4px', display: 'block'}}>{errors.emailOrUsername.message}</span>}
            </div>

            <div className="input-group">
              <label>Password</label>
              <div className={`input-wrapper ${errors.password ? 'has-error' : ''}`}>
                <span className="input-icon-left">
                  <Lock size={18} strokeWidth={1.5} />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  {...register('password')}
                  placeholder="Enter your password"
                />
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
              {errors.password && <span className="error-text" style={{color: '#ef4444', fontSize: '0.85rem', marginTop: '4px', display: 'block'}}>{errors.password.message}</span>}
            </div>

            <div className="forgot-password-container">
              <Link to="/forgot-password" className="forgot-password">Forgot Password?</Link>
            </div>

            <button type="submit" className="login-btn" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Login to CO-CHE'} <span>→</span>
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