import React, { useState } from 'react';
import { MoveLeft, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import '../css/login.css'; // Reusing login layout styles

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const handleReset = async (e) => {
        e.preventDefault();
        try {
            setMessage('');
            setError('');
            setLoading(true);
            await sendPasswordResetEmail(auth, email);
            setMessage('Check your email inbox for further instructions.');
        } catch (err) {
            console.error("Lỗi quên mật khẩu:", err);
            setError(err.message || 'Failed to reset password.');
        }
        setLoading(false);
    };

    return (
        <div className="login-page">
            {/* Left Image Section - Reused from Login */}
            <div className="login-left">
                <div className="logo-co-che">
                    <span className="logo-icon">✻</span> CO-CHE
                </div>

                <div className="login-left-content">
                    <span className="featured-badge">SECURITY</span>
                    <h1 className="quote-text">
                        "Secure your account to keep your culinary journey safe."
                    </h1>
                </div>
            </div>

            {/* Right Form Section */}
            <div className="login-right">
                <Link to="/login" className="back-to-home">
                    <MoveLeft size={16} />
                    Back to Login
                </Link>

                <div className="login-form-container">
                    <div className="login-header">
                        <h2>Reset Password</h2>
                        <p>Enter your registered email address and we'll send you a link to reset your password.</p>
                    </div>

                    {error && <div className="alert alert-error">{error}</div>}
                    {message && <div className="alert alert-success">{message}</div>}

                    <form onSubmit={handleReset}>
                        <div className="input-group">
                            <label>Email Address</label>
                            <div className="input-wrapper">
                                <input
                                    type="email"
                                    placeholder="chef@example.com"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <span className="input-icon">
                                    <Mail size={18} strokeWidth={1.5}/>
                                </span>
                            </div>
                        </div>

                        <button disabled={loading} type="submit" className="login-btn">
                            {loading ? 'Sending...' : 'Send Reset Link'} <span>→</span>
                        </button>
                    </form>

                    <div className="divider">
                        <span>Or go back</span>
                    </div>

                    <p className="register-link">
                        Remember your password? <Link to="/login">Login here</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
