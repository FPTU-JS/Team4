import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Lock, Eye, EyeOff, Mail, Phone } from 'lucide-react';
import '../css/register.css';
import authService from '../services/authService';

const Register = () => {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State để ẩn hiện confirm pass
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        fullName: '',
        username: '',
        email: '',
        password: '',
        phone: ''
    });

    const [confirmPassword, setConfirmPassword] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSocialLogin = (provider) => {
        window.location.href = `http://localhost:8081/oauth2/authorization/${provider}`;
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password.trim().length < 8) {
            setError("Password must be at least 8 characters long.");
            return;
        }

        if (formData.password.trim() !== confirmPassword.trim()) {
            setError("Passwords do not match.");
            return;
        }

        setIsLoading(true);

        try {
            // Gửi formData (chỉ chứa fullName, username, email, password, phone)
            await authService.register(formData);
            alert("Registration successful!");
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="register-page">
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

            <div className="register-right">
                <div className="register-form-container">
                    <div className="register-header">
                        <h2>Create Your Account</h2>
                        <p>Join CO-CHE and start your culinary journey.</p>
                    </div>

                    {error && (
                        <div className="alert alert-error">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleRegister}>
                        {/* Full Name */}
                        <div className="input-group">
                            <label>Full Name</label>
                            <div className="input-wrapper">
                                <span className="input-icon-left"><User size={18} /></span>
                                <input
                                    type="text"
                                    name="fullName"
                                    placeholder="Enter your full name"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        {/* Username */}
                        <div className="input-group">
                            <label>Username</label>
                            <div className="input-wrapper">
                                <span className="input-icon-left"><User size={18} /></span>
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="marcopierre"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div className="input-group">
                            <label>Email</label>
                            <div className="input-wrapper">
                                <span className="input-icon-left"><Mail size={18} /></span>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="input-group">
                            <label>Phone</label>
                            <div className="input-wrapper">
                                <span className="input-icon-left"><Phone size={18} /></span>
                                <input
                                    type="text"
                                    name="phone"
                                    placeholder="0123 456 789"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="row-inputs">
                            {/* Password */}
                            <div className="input-group">
                                <label>Password</label>
                                <div className="input-wrapper">
                                    <span className="input-icon-left"><Lock size={18} /></span>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="Enter password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                    <span className="input-icon-right" onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </span>
                                </div>
                            </div>

                            {/* Confirm Password */}
                            <div className="input-group">
                                <label>Confirm Password</label>
                                <div className="input-wrapper">
                                    <span className="input-icon-left"><Lock size={18} /></span>
                                    <input
                                        type={showConfirmPassword ? "text" : "password"} // Sửa: Dùng showConfirmPassword
                                        placeholder="Confirm password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)} // Sửa: Gọi setConfirmPassword để lưu text
                                        required
                                    />
                                    <span className="input-icon-right" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <button type="submit" className="register-btn" disabled={isLoading}>
                            {isLoading ? "Creating..." : "Sign Up →"}
                        </button>
                    </form>

                    <div className="divider">
                        <span>Or continue with</span>
                    </div>

                    <div className="social-login">
                        <button type="button" onClick={() => handleSocialLogin('google')}>Google</button>
                        <button type="button" onClick={() => handleSocialLogin('facebook')}>Facebook</button>
                    </div>

                    <p className="login-link">
                        Already have an account? <Link to="/login">Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;