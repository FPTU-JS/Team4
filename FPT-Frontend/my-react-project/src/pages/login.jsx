import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/login.css';
import { auth, googleProvider, facebookProvider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';
import loginImage from '../assets/login-img.jpg'; // We can use this for the chef avatar if needed

function Login() {
  const navigate = useNavigate();

  const handleSocialLogin = async (provider, providerName) => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log(`Đăng nhập ${providerName} thành công:`, user);
      navigate('/onboarding');
    } catch (error) {
      console.error(`Lỗi đăng nhập ${providerName}:`, error);
      alert(`Lỗi đăng nhập: ${error.message}`);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate login for now
    navigate('/onboarding');
  };

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
        <Link to="/" className="back-to-home">Back to Home</Link>

        <div className="login-form-container">
          <div className="login-header">
            <h2>Welcome Back</h2>
            <p>Enter your credentials to access your chef dashboard.</p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label>Email or Username</label>
              <div className="input-wrapper">
                <input type="email" placeholder="chef@example.com" required />
                <span className="input-icon">✉️</span>
              </div>
            </div>

            <div className="input-group">
              <label>Password</label>
              <div className="input-wrapper">
                <input type="password" placeholder="Enter your password" required />
                <span className="input-icon">👁️</span>
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
              onClick={() => handleSocialLogin(googleProvider, 'Google')}
              type="button"
            >
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" alt="Google" />
              Google
            </button>
            <button
              className="social-btn"
              onClick={() => handleSocialLogin(facebookProvider, 'Facebook')}
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