import React from 'react';
import {
    Search, Bell, HelpCircle, ChevronDown,
    MessageSquare, Mail, Clock, Shield,
    User, CreditCard, Sparkles, BookOpen,
    LayoutDashboard, CookingPot, Settings, Upload, LogOut
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../pages/AuthContext';
import '../css/help-center.css';

const HelpCenter = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    // 3. Đưa hàm handleLogout vào trong Component
    const handleLogout = () => {
        logout();
        console.log('User logged out');
        navigate('/', { replace: true });
    };

    return (
        <div className="help-center-layout">
            {/* Sidebar */}
            <aside className="hc-sidebar">
                <div className="hc-brand">
                    <div className="hc-logo-icon">
                        <CookingPot size={24} />
                    </div>
                    <div className="hc-brand-text">
                        <span className="hc-brand-title">CO-CHE Admin</span>
                        <span className="hc-brand-subtitle">Premium Plan</span>
                    </div>
                </div>

                <nav className="hc-nav">
                    <Link to="/" className="hc-nav-item">
                        <LayoutDashboard size={20} /> Dashboard
                    </Link>
                    <Link to="/recipes" className="hc-nav-item">
                        <BookOpen size={20} /> Recipes
                    </Link>
                    <Link to="/ai-recommendations" className="hc-nav-item">
                        <Sparkles size={20} /> AI Kitchen
                    </Link>
                    <Link to="/profile" className="hc-nav-item">
                        <Settings size={20} /> Settings
                    </Link>
                    <div className="hc-nav-item active">
                        <HelpCircle size={20} /> HelpCenter
                    </div>
                    <button
                        className="hc-nav-item hc-logout-btn"
                        onClick={handleLogout}
                        style={{
                            width: '100%',
                            border: 'none',
                            background: 'none',
                            cursor: 'pointer',
                            marginTop: 'auto',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px'
                        }}
                    >
                        <LogOut size={20} /> Logout
                    </button>
                </nav>

                <button className="hc-upgrade-btn">
                    <Upload size={18} /> Upgrade Now
                </button>
            </aside>

            {/* Main Wrapper */}
            <div className="hc-main">
                {/* Header */}
                <header className="hc-topbar">
                    <div className="hc-topbar-left">
                        <HelpCircle size={20} color="#10b981" /> Help Center
                    </div>

                    <div className="hc-topbar-right">
                        <div className="hc-search-mini">
                            <Search size={16} color="#9ca3af" />
                            <input type="text" placeholder="Search knowledge base" />
                        </div>

                        <Bell size={20} color="#6b7280" style={{ cursor: 'pointer' }} />

                        <div className="hc-user-profile">
                            <img src="https://ui-avatars.com/api/?name=Chef+Julian&background=fce7f3&color=db2777" alt="Chef Julian" className="hc-avatar" />
                            <span style={{ fontSize: '0.9rem', fontWeight: '500', color: '#374151' }}>Chef Julian</span>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <main className="hc-content">

                    <section className="hc-hero">
                        <h1>How can we help you, Chef?</h1>
                        <p>Browse our articles, tutorials, and community guides to get the most out of CO-CHE.</p>

                        <div className="hc-search-large">
                            <Search size={20} color="#9ca3af" />
                            <input type="text" placeholder="What are you looking for? (e.g., 'AI spice matching')" />
                        </div>
                    </section>

                    <div className="hc-section-main">
                        {/* Left Column */}
                        <div className="hc-column-left">
                            <h2 className="hc-subtitle">Browse by Category</h2>
                            <div className="hc-grid-categories">
                                <div className="hc-category-card">
                                    <User size={24} className="hc-category-icon" />
                                    <h3>Account</h3>
                                    <p>Profile management, security, and subscription settings.</p>
                                </div>
                                <div className="hc-category-card">
                                    <CreditCard size={24} className="hc-category-icon" />
                                    <h3>Billing</h3>
                                    <p>Manage invoices, payment methods, and premium perks.</p>
                                </div>
                                <div className="hc-category-card">
                                    <Sparkles size={24} className="hc-category-icon" />
                                    <h3>AI Features</h3>
                                    <p>Master AI recipe generation and flavor pairing logic.</p>
                                </div>
                                <div className="hc-category-card">
                                    <CookingPot size={24} className="hc-category-icon" />
                                    <h3>Recipes</h3>
                                    <p>Importing recipes, organizing collections, and meal planning.</p>
                                </div>
                            </div>

                            <h2 className="hc-subtitle">Frequently Asked Questions</h2>
                            <div className="hc-faq-list">
                                <div className="hc-faq-item">
                                    <span>How do I reset my kitchen preferences?</span>
                                    <ChevronDown size={20} color="#9ca3af" />
                                </div>
                                <div className="hc-faq-item">
                                    <span>Can I use CO-CHE offline for my saved recipes?</span>
                                    <ChevronDown size={20} color="#9ca3af" />
                                </div>
                                <div className="hc-faq-item">
                                    <span>How does the AI handle ingredient substitutes?</span>
                                    <ChevronDown size={20} color="#9ca3af" />
                                </div>
                                <div className="hc-faq-item">
                                    <span>Is my custom recipe data used for AI training?</span>
                                    <ChevronDown size={20} color="#9ca3af" />
                                </div>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="hc-column-right">
                            <div className="hc-panel green">
                                <h3>Need instant help?</h3>
                                <p>Our AI Assistant is trained on all documentation and can help you in real-time.</p>
                                <button className="hc-btn-primary">
                                    <MessageSquare size={18} /> Chat with AI Assistant
                                </button>
                            </div>

                            <div className="hc-panel">
                                <h3>Contact Human Support</h3>
                                <div className="hc-contact-item">
                                    <Mail size={18} className="hc-contact-icon" />
                                    <div className="hc-contact-details">
                                        <h4>Email us</h4>
                                        <p>support@co-che.com</p>
                                    </div>
                                </div>
                                <div className="hc-contact-item">
                                    <Clock size={18} className="hc-contact-icon" />
                                    <div className="hc-contact-details">
                                        <h4>Support Hours</h4>
                                        <p>Mon-Fri, 9am - 6pm EST</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Ticket Form */}
                    <div className="hc-ticket-form">
                        <h2>Submit a Support Ticket</h2>
                        <p className="form-subtitle">Can't find what you're looking for? Let us know and we'll get back to you within 24 hours.</p>

                        <div className="hc-form-row">
                            <div className="hc-form-group">
                                <label>Full Name</label>
                                <input type="text" defaultValue="Julian Smith" />
                            </div>
                            <div className="hc-form-group">
                                <label>Email Address</label>
                                <input type="email" defaultValue="julian@example.com" />
                            </div>
                        </div>

                        <div className="hc-form-group" style={{ marginBottom: '1.5rem' }}>
                            <label>Category</label>
                            <select>
                                <option>Technical Issue</option>
                                <option>Billing Issue</option>
                                <option>Feature Request</option>
                            </select>
                        </div>

                        <div className="hc-form-group" style={{ marginBottom: '1.5rem' }}>
                            <label>Subject</label>
                            <input type="text" placeholder="Briefly describe your request" />
                        </div>

                        <div className="hc-form-group">
                            <label>Detailed Description</label>
                            <textarea placeholder="Tell us more about how we can help..."></textarea>
                        </div>

                        <div className="hc-form-footer">
                            <button className="hc-btn-primary" style={{ width: 'auto', padding: '0.8rem 2rem' }}>
                                Submit Ticket
                            </button>
                            <span>By submitting, you agree to our privacy policy regarding support data.</span>
                        </div>
                    </div>

                    <footer className="hc-footer">
                        <div className="hc-footer-links">
                            <Link to="#">Documentation</Link>
                            <Link to="#">API Status</Link>
                            <Link to="#">Community Forum</Link>
                            <Link to="#">Privacy Policy</Link>
                        </div>
                        <div className="hc-footer-copyright">
                            © 2024 CO-CHE Kitchen Intelligence. All rights reserved.
                        </div>
                    </footer>
                </main>
            </div>
        </div>
    );
};

export default HelpCenter;
