import React, { useState, useEffect, useRef } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { Bell, Flame, User, Menu, Home, BookOpen, Store, Bot, LogOut, Settings, Leaf } from 'lucide-react';
import './MainLayout.css';
import Notification from './Notification';
import { useAuth } from '../pages/AuthContext'

const MainLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const { isAuthenticated, logout } = useAuth();

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
        setIsDropdownOpen(false);
    }, [location]);

    const handleLogout = () => {
        logout();

        console.log('User logged out');

        navigate('/', { replace: true })
    };

    return (
        <div className="layout-container">
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
                    {/* <Link to="/healthy-plan" className={currentPath === '/healthy-plan' ? 'active' : ''}>Healthy Plan</Link> */}
                    <Link to="/community" className={currentPath === '/community' ? 'active' : ''}>Community</Link>
                    <Link to="/ai-assistant" className={currentPath === '/ai-assistant' ? 'active' : ''}>AI Assistant</Link>
                    <Link to="/support" className={currentPath === '/support' ? 'active' : ''}>Support</Link>
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

                        <div className="user-dropdown-container" ref={dropdownRef}>

                            <button
                                className={`icon-btn profile-btn ${isDropdownOpen ? 'active' : ''}`}
                                onClick={() => setIsDropdownOpen(prev => !prev)}
                                title="Account"
                            >
                                <User size={20} />
                            </button>

                            {isDropdownOpen && (
                                <div className="dropdown-menu">

                                    <Link to="/profile" className="dropdown-item">
                                        <Settings size={18} />
                                        <span>Profile</span>
                                    </Link>

                                    <Link to="/healthy-plan" className="dropdown-item">
                                        <Leaf size={18} />
                                        <span>Healthy Plan</span>
                                    </Link>

                                    <hr className="dropdown-divider" />

                                    <button
                                        className="dropdown-item logout-btn"
                                        onClick={handleLogout}
                                    >
                                        <LogOut size={18} />
                                        <span>Logout</span>
                                    </button>

                                </div>
                            )}

                        </div>

                    ) : (

                        <div className="auth-buttons">
                            <Link to="/login" className="login-nav-link">Login</Link>
                            <Link to="/register" className="register-nav-btn">Sign Up</Link>
                        </div>

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
                <Link to="/ai-assistant" className={`bottom-nav-item ${currentPath === '/ai-assistant' ? 'active' : ''}`}>
                    <Bot size={24} />
                    <span>Assistant</span>
                </Link>
            </div>
        </div>
    );
};

export default MainLayout;
