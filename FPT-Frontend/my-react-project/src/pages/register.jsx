import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/register.css';

const Register = () => {
    const navigate = useNavigate();

    const handleSocialLogin = (provider) => {
        window.location.href = `http://localhost:8081/oauth2/authorization/${provider}`;
    };

    const handleRegister = (e) => {
        e.preventDefault();
        // Simulate registration success
        alert("Đăng ký thành công!");
        navigate('/login');
    };

    return (
        <div className="register-page">
            {/* Left Image Section */}
            <div className="register-left">
                <div className="register-left-content">
                    <div className="logo-co-che-green">
                        <span className="logo-icon-green">♨️</span> CO-CHE
                    </div>
                    <h1 className="register-quote">
                        Discover culinary excellence tailored to your taste.
                    </h1>
                    <p className="register-subtext">
                        Join thousands of food lovers and professional chefs connecting through the art of cooking.
                    </p>
                </div>
            </div>

            {/* Right Form Section */}
            <div className="register-right">
                <div className="register-form-container">
                    <div className="register-header">
                        <h2>Create Your Account</h2>
                        <p>Join CO-CHE and start your culinary journey.</p>
                    </div>

                    <form onSubmit={handleRegister}>
                        <div className="input-group">
                            <label>Full Name</label>
                            <div className="input-wrapper">
                                <span className="input-icon-left">👤</span>
                                <input type="text" placeholder="Enter your full name" required />
                            </div>
                        </div>

                        <div className="input-group">
                            <label>Email Address</label>
                            <div className="input-wrapper">
                                <span className="input-icon-left">✉️</span>
                                <input type="email" placeholder="Enter your email" required />
                            </div>
                        </div>

                        <div className="row-inputs">
                            <div className="input-group">
                                <label>Password</label>
                                <div className="input-wrapper">
                                    <span className="input-icon-left">🔒</span>
                                    <input type="password" placeholder="Create password" required />
                                </div>
                            </div>
                            <div className="input-group">
                                <label>Confirm Password</label>
                                <div className="input-wrapper">
                                    <span className="input-icon-left">🔓</span>
                                    <input type="password" placeholder="Confirm password" required />
                                </div>
                            </div>
                        </div>

                        {/* Dietary Preferences */}
                        <div className="dietary-section">
                            <div className="dietary-header">
                                <span className="icon">🍴</span> Dietary Preferences
                            </div>
                            <p className="dietary-desc">Select any that apply to personalize your experience.</p>

                            <div className="checkbox-grid">
                                <label className="checkbox-item">
                                    <input type="checkbox" />
                                    <span>Vegetarian</span>
                                </label>
                                <label className="checkbox-item">
                                    <input type="checkbox" />
                                    <span>Vegan</span>
                                </label>
                                <label className="checkbox-item">
                                    <input type="checkbox" />
                                    <span>Keto</span>
                                </label>
                                <label className="checkbox-item">
                                    <input type="checkbox" />
                                    <span>Gluten-free</span>
                                </label>
                            </div>
                        </div>

                        <button type="submit" className="register-btn">
                            Sign Up <span>→</span>
                        </button>
                    </form>

                    <div className="divider" style={{ textAlign: 'center', margin: '20px 0' }}>
                        <span style={{ color: '#666', fontSize: '14px', position: 'relative', display: 'inline-block', padding: '0 10px' }}>Or continue with</span>
                    </div>

                    <div className="social-login" style={{ display: 'flex', gap: '15px', marginTop: '15px' }}>
                        <button
                            type="button"
                            style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #ddd', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', cursor: 'pointer', transition: 'all 0.3s ease' }}
                            onClick={() => handleSocialLogin('google')}
                        >
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" alt="Google" style={{ width: '20px', height: '20px' }} />
                            Google
                        </button>
                        <button
                            type="button"
                            style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #ddd', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', cursor: 'pointer', transition: 'all 0.3s ease' }}
                            onClick={() => handleSocialLogin('facebook')}
                        >
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/facebook/facebook-original.svg" alt="Facebook" style={{ width: '20px', height: '20px' }} />
                            Facebook
                        </button>
                    </div>

                    <p className="login-link" style={{ marginTop: '20px', textAlign: 'center' }}>
                        Already have an account? <Link to="/login">Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Register;