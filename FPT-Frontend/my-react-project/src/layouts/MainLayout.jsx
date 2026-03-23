import React, { useState, useEffect, useRef } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import {
    Bell, Flame, User, Menu, Home, BookOpen, Store,
    Bot, Settings, Leaf, Sun, Moon, LogOut, HelpCircle, X, ChevronRight
} from 'lucide-react';
import './MainLayout.css';
import Notification from './Notification';

import { useAuth } from '../pages/AuthContext';

const MainLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State cho Sidebar
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    const dropdownRef = useRef(null);
    const { isAuthenticated, user, logout } = useAuth();

    // Xử lý Theme
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    // Khóa cuộn trang khi mở Mobile Menu
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isMobileMenuOpen]);

    // Đóng menu khi click ra ngoài hoặc chuyển trang
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        setIsMobileMenuOpen(false); // Tự động đóng sidebar khi chuyển link
        setIsDropdownOpen(false);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [location]);

    const navLinks = [
        { path: '/', label: 'Home', icon: <Home size={20} /> },
        { path: '/recipes', label: 'Recipes', icon: <BookOpen size={20} /> },
        { path: '/map', label: 'Map', icon: <Store size={20} /> },
        { path: '/healthy-plan', label: 'Healthy Plan', icon: <Leaf size={20} /> },
        { path: '/ai-assistant', label: 'AI Assistant', icon: <Bot size={20} /> },
        { path: '/community', label: 'Community', icon: <User size={20} /> },
    ];

    return (
        <div className="layout-container">

            {/* --- MOBILE SIDEBAR --- */}
            <div
                className={`mobile-sidebar-overlay ${isMobileMenuOpen ? 'show' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
            />

            <aside className={`mobile-sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
                {/* Header */}
                <div className="mobile-sidebar-header">
                    <Link to="/" className="brand-logo">
                        <span className="brand-icon">✻</span>
                        <span className="brand-text">CO-CHE</span>
                    </Link>
                    <button className="close-menu-btn" onClick={() => setIsMobileMenuOpen(false)}><X size={24} /></button>
                </div>

                {!isAuthenticated && (
                    <div className="mobile-sidebar-auth">
                        <Link to="/login" className="mobile-auth-btn mobile-login-btn">Login</Link>
                        <Link to="/register" className="mobile-auth-btn mobile-signup-btn">Sign Up</Link>
                    </div>
                )}

                {/* Điều hướng */}
                <nav className="mobile-sidebar-links">
                    {navLinks.map((link) => (
                        <Link key={link.path} to={link.path} className={currentPath === link.path ? 'active' : ''}>
                            {link.icon} {link.label}
                        </Link>
                    ))}
                </nav>
            </aside>

            {/* --- TOP NAVBAR --- */}
            <nav className="top-navbar">
                <div className="nav-brand">
                    <button className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(true)}>
                        <Menu size={24} />
                    </button>
                    <Link to="/" className="brand-logo">
                        <span className="brand-icon">✻</span>
                        <span className="brand-text">CO-CHE</span>
                    </Link>
                </div>

                <div className="nav-links desktop-only">
                    {navLinks.map(link => (
                        <Link key={link.path} to={link.path} className={currentPath === link.path ? 'active' : ''}>
                            {link.label}
                        </Link>
                    ))}
                </div>

                <div className="nav-actions">
                    <button className="icon-btn theme-toggle-btn" onClick={toggleTheme}>
                        {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                    </button>

                    {isAuthenticated ? (
                        <>
                            <div className="streak-badge mobile-hide">
                                12 <Flame size={16} fill="#f59e0b" color="#f59e0b" />
                            </div>
                            <Notification />
                            <div className="user-dropdown-container" ref={dropdownRef}>
                                <button className="profile-trigger" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                                    <img src={user?.avatar || `https://ui-avatars.com/api/?name=User&background=10b981&color=fff`} alt="avatar" />
                                </button>
                                {isDropdownOpen && (
                                    <div className="dropdown-menu">
                                        <button onClick={() => navigate('/profile')}><User size={18} /> Profile</button>
                                        <button onClick={() => navigate('/profile?tab=help')}><HelpCircle size={18} /> Help</button>
                                        <hr />
                                        <button className="logout-btn" onClick={logout}><LogOut size={18} /> Logout</button>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <div className="auth-buttons desktop-only">
                            <Link to="/login" className="login-nav-link">Login</Link>
                            <Link to="/register" className="register-nav-btn">Sign Up</Link>
                        </div>
                    )}
                </div>
            </nav>

            <main className="main-content">
                <Outlet />
            </main>
        </div>
    );
};

export default MainLayout;