import React, { useState, useEffect, useRef } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { Bell, Flame, User, Menu, Home, BookOpen, Store, Bot, Settings, Leaf, Sun, Moon, LogOut, HelpCircle } from 'lucide-react';
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
<<<<<<< Updated upstream
    const dropdownRef = useRef(null);
    const { isAuthenticated, user, logout } = useAuth();
=======
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
>>>>>>> Stashed changes
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const [isScrolled, setIsScrolled] = useState(false);

<<<<<<< Updated upstream
=======
    const dropdownRef = useRef(null);
    const { isAuthenticated, isLoading, user, logout } = useAuth();

>>>>>>> Stashed changes
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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

    return (
        <div className="layout-container">
            <Toaster 
                position="bottom-right"
                toastOptions={{
                    style: {
                        background: 'var(--bg-surface)',
                        color: 'var(--text-primary)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(12px)',
                        WebkitBackdropFilter: 'blur(12px)',
                        borderRadius: '16px',
                        boxShadow: '0 10px 40px -10px rgba(0,0,0,0.2)',
                        padding: '16px 24px',
                        fontSize: '14px',
                        fontWeight: '500',
                        letterSpacing: '0.2px'
                    },
                    success: {
                        iconTheme: { primary: '#10b981', secondary: '#fff' }
                    },
                    error: {
                        iconTheme: { primary: '#ef4444', secondary: '#fff' }
                    }
                }}
            />
<<<<<<< Updated upstream
            <nav className="top-navbar">
=======

            <aside className={`mobile-sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
                {/* Header */}
                <div className="mobile-sidebar-header">
                    <Link to="/" className="brand-logo">
                        <span className="brand-icon">✻</span>
                        <span className="brand-text">CO-CHE</span>
                    </Link>
                    <button className="close-menu-btn" onClick={() => setIsMobileMenuOpen(false)}><X size={24} /></button>
                </div>

                {!isLoading && !isAuthenticated && (
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
            <nav className={`top-navbar ${isScrolled ? 'scrolled' : ''}`}>
>>>>>>> Stashed changes
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
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    title="User Menu"
                                    style={{ padding: 0, overflow: 'hidden', border: '2px solid #10b981' }}
                                >
                                    <img 
                                        src={user?.avatar || `https://ui-avatars.com/api/?name=${(user?.username || 'User').replace(' ', '+')}&background=10b981&color=fff`} 
                                        alt="Avatar" 
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                                    />
                                </button>

                                {isDropdownOpen && (
                                    <div className="dropdown-menu">
                                        <div className="dropdown-header" style={{ padding: '4px 12px 12px', borderBottom: '1px solid var(--border-color)', marginBottom: '4px' }}>
                                            <div style={{ fontWeight: '600', fontSize: '15px', color: 'var(--text-primary)' }}>{user?.username || 'Chef'}</div>
                                            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{user?.email || 'Welcome back!'}</div>
                                        </div>
                                        <button className="dropdown-item" onClick={() => { setIsDropdownOpen(false); navigate('/profile'); }}>
                                            <User size={18} /> Profile
                                        </button>
                                        <button className="dropdown-item" onClick={() => { setIsDropdownOpen(false); navigate('/profile?tab=help'); }}>
                                            <HelpCircle size={18} /> Help Center
                                        </button>
                                        <hr className="dropdown-divider" />
                                        <button className="dropdown-item logout-btn" onClick={() => { 
                                            setIsDropdownOpen(false); 
                                            if (typeof logout === 'function') logout();
                                            navigate('/');
                                        }}>
                                            <LogOut size={18} /> Logout
                                        </button>
                                    </div>
                                )}
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
