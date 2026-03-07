import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Bell, Flame, User } from 'lucide-react';
import './MainLayout.css';

const MainLayout = () => {
    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <div className="layout-container">
            <nav className="top-navbar">
                <div className="nav-brand">
                    <Link to="/" className="brand-logo">
                        <span className="brand-icon">✻</span>
                        <span className="brand-text">CO-CHE</span>
                    </Link>
                </div>

                <div className="nav-links">
                    <Link to="/" className={currentPath === '/' ? 'active' : ''}>Home</Link>
                    <Link to="/recipes" className={currentPath === '/recipes' ? 'active' : ''}>Recipes</Link>
                    <Link to="/map" className={currentPath === '/map' ? 'active' : ''}>Map</Link>
                    <Link to="/plan-dashboard" className={currentPath === '/plan-dashboard' ? 'active' : ''}>Healthy Plan</Link>
                    <Link to="/plan-setup" className={currentPath === '/plan-setup' ? 'active' : ''}>Plan Setup (T)</Link>
                    <Link to="/community" className={currentPath === '/community' ? 'active' : ''}>Community</Link>
                </div>

                <div className="nav-actions">
                    <div className="streak-badge">
                        Daily Streak: 12 <Flame size={16} className="fire-icon" color="#f59e0b" fill="#f59e0b" />
                    </div>
                    <button className="icon-btn" title="Notifications">
                        <Bell size={20} />
                    </button>
                    <Link to="/login" className="icon-btn profile-btn" title="Profile/Login">
                        <User size={20} />
                    </Link>
                </div>
            </nav>

            <main className="main-content">
                <Outlet />
            </main>
        </div>
    );
};

export default MainLayout;
