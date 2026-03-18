import React, { useState, useEffect, useRef } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { Bell, Flame, User, Menu, Home, BookOpen, Store, Bot, LogOut, Settings, Leaf, Sun, Moon } from 'lucide-react';
import './MainLayout.css';
import Notification from './Notification';
import FloatingAIBubble from '../components/FloatingAIBubble';
import FloatingSupportBubble from '../components/FloatingSupportBubble';
import { Toaster } from 'react-hot-toast';
import { useAuth } from '../pages/AuthContext';

const MainLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const { isAuthenticated, logout } = useAuth();
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    //Close Dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Close Dropdown when navigating
    useEffect(() => {
        // eslint-disable-next-line
        setIsDropdownOpen(false);
    }, [location]);

    const handleLogout = () => {
        logout();

        console.log('User logged out');

        navigate('/', { replace: true })
    };

    return (
        <div className="layout-container">
            <Toaster 
                position="bottom-right"
                toastOptions={{
                    style: {
                        background: 'var(--bg-surface)',
                        color: 'var(--text-primary)',
                        border: '1px solid var(--border-color)',
                    },
                    success: {
                        iconTheme: { primary: '#10b981', secondary: '#fff' }
                    }
                }}
            />
            <nav className="top-navbar">
                <div className="nav-brand">
                    <button className="mobile-menu-btn">
                        <Menu size={24} color="#111827" />
                    </button>
                    <Link to="/" className="brand-logo">
                        <span className="brand-icon">✻</span>
                        <span className="brand-text">CO-CHE</span>
                    </Link>
                </div>

                <div className="nav-links">
                    <Link to="/" className={currentPath === '/' ? 'active' : ''}>Home</Link>
                    <Link to="/recipes" className={currentPath === '/recipes' ? 'active' : ''}>Recipes</Link>
                    <Link to="/map" className={currentPath === '/map' ? 'active' : ''}>Map</Link>
                    <Link to="/healthy-plan" className={currentPath === '/healthy-plan' ? 'active' : ''}>Healthy Plan</Link>
                    <Link to="/ai-assistant" className={currentPath === '/ai-assistant' ? 'active' : ''}>AI Assistant</Link>
                    <Link to="/community" className={currentPath === '/community' ? 'active' : ''}>Community</Link>
                </div>

                <div className="nav-actions">

                    {isAuthenticated && (
                        <>
                            <div className="streak-badge mobile-hide">
                                Daily Streak: 12
                                <Flame size={16} className="fire-icon" color="#f59e0b" fill="#f59e0b" />
                            </div>

                            <Notification />
                        </>
                    )}

                    {isAuthenticated ? (
                        <>
                            <button
                                className="icon-btn theme-toggle-btn"
                                onClick={toggleTheme}
                                title="Toggle Theme"
                                style={{ marginRight: '10px' }}
                            >
                                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                            </button>

                            <div className="user-dropdown-container" ref={dropdownRef}>

                                <button
                                    className={`icon-btn profile-btn ${isDropdownOpen ? 'active' : ''}`}
                                    onClick={() => navigate('/help-center')}
                                    title="Account & Help Center"
                                    style={{ padding: 0, overflow: 'hidden', border: '2px solid #10b981' }}
                                >
                                    <img 
                                        src="https://ui-avatars.com/api/?name=Chef+Julian&background=fce7f3&color=db2777" 
                                        alt="Avatar" 
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                                    />
                                </button>


                            </div>
                        </>
                    ) : (

                            <>
                                <button
                                    className="icon-btn theme-toggle-btn"
                                    onClick={toggleTheme}
                                    title="Toggle Theme"
                                    style={{ marginRight: '15px' }}
                                >
                                    {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                                </button>
                                <div className="auth-buttons">
                                    <Link to="/login" className="login-nav-link">Login</Link>
                                    <Link to="/register" className="register-nav-btn">Sign Up</Link>
                                </div>
                            </>

                        )}

                </div>
            </nav>

            <main className="main-content">
                <Outlet />
            </main>

            {/* Mobile Bottom Navigation */}
            <div className="mobile-bottom-nav">
                <Link to="/" className={`bottom-nav-item ${currentPath === '/' ? 'active' : ''}`}>
                    <Home size={24} />
                    <span>Home</span>
                </Link>
                <Link to="/recipes" className={`bottom-nav-item ${currentPath === '/recipes' ? 'active' : ''}`}>
                    <BookOpen size={24} />
                    <span>Recipes</span>
                </Link>
                <Link to="/map" className={`bottom-nav-item ${currentPath === '/map' ? 'active' : ''}`}>
                    <Store size={24} />
                    <span>Markets</span>
                </Link>
            </div>


        </div>
    );
};

export default MainLayout;
