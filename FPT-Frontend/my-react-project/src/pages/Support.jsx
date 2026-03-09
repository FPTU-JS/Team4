import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    BookOpen,
    Sparkles,
    Settings,
    HelpCircle,
    Search,
    Bell,
    ChevronDown,
    Mail,
    Clock,
    User,
    CreditCard,
    MessageSquare,
    ChefHat,
    Upload
} from 'lucide-react';
import '../css/support.css';

const Support = () => {
    const location = useLocation();
    const currentPath = location.pathname;

    const [openFaq, setOpenFaq] = useState(null);

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const faqs = [
        {
            question: "How do I reset my kitchen preferences?",
            answer: "To reset your kitchen preferences, navigate to the Settings page and click on 'Reset Preferences' under the Account tab."
        },
        {
            question: "Can I use CO-CHE offline for my saved recipes?",
            answer: "Yes, saved recipes will be cached on your device for offline viewing if you have previously accessed them."
        },
        {
            question: "How does the AI handle ingredient substitutes?",
            answer: "Our AI analyzes the flavor profile and chemical structure of ingredients to suggest the best possible substitutes for your recipes."
        },
        {
            question: "Is my custom recipe data used for AI training?",
            answer: "No, your custom recipes are private and are never used to train our AI models without your explicit consent."
        }
    ];

    return (
        <div className="support-layout">
            {/* Left Sidebar */}
            <aside className="support-sidebar">
                <div className="sidebar-header">
                    <div className="admin-logo-icon">
                        <ChefHat size={20} className="icon-green" />
                    </div>
                    <div className="admin-logo-text">
                        <h3>CO-CHE Admin</h3>
                        <span className="premium-badge">Premium Plan</span>
                    </div>
                </div>

                <nav className="sidebar-nav">
                    <Link to="/profile" className="sidebar-link">
                        <LayoutDashboard size={20} />
                        <span>Dashboard</span>
                    </Link>
                    <Link to="/recipes" className="sidebar-link">
                        <BookOpen size={20} />
                        <span>Recipes</span>
                    </Link>
                    <Link to="/ai-assistant" className="sidebar-link">
                        <Sparkles size={20} />
                        <span>AI Kitchen</span>
                    </Link>
                    <Link to="/settings" className="sidebar-link">
                        <Settings size={20} />
                        <span>Settings</span>
                    </Link>
                    <Link to="/support" className="sidebar-link active">
                        <HelpCircle size={20} />
                        <span>HelpCenter</span>
                    </Link>
                </nav>

                <div className="sidebar-footer">
                    <button className="upgrade-btn">
                        <Upload size={16} /> Upgrade Now
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="support-main">
                {/* Top Header */}
                <header className="support-header">
                    <div className="header-left">
                        <HelpCircle size={24} className="icon-green" />
                        <h2>Help Center</h2>
                    </div>
                    <div className="header-search">
                        <Search size={18} className="search-icon" />
                        <input type="text" placeholder="Search knowledge base..." />
                    </div>
                    <div className="header-right">
                        <button className="notification-btn">
                            <Bell size={20} />
                            <span className="notif-dot"></span>
                        </button>
                        <div className="user-profile">
                            <img
                                src="https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=100"
                                alt="Chef Julian"
                                className="avatar-img"
                            />
                            <span className="user-name">Chef Julian</span>
                        </div>
                    </div>
                </header>

                <div className="support-content-scroll">
                    {/* Hero Section */}
                    <section className="support-hero">
                        <h1 className="hero-title">How can we help you, Chef?</h1>
                        <p className="hero-subtitle">Browse our articles, tutorials, and community guides to get the most out of CO-CHE.</p>

                        <div className="hero-search-wrapper">
                            <Search size={20} className="hero-search-icon" />
                            <input
                                type="text"
                                className="hero-search-input"
                                placeholder="What are you looking for? (e.g., 'AI spice matching')"
                            />
                        </div>
                    </section>

                    {/* Content Body */}
                    <div className="support-body">
                        {/* Categories */}
                        <div className="section-header">
                            <h3>Browse by Category</h3>
                        </div>
                        <div className="categories-grid">
                            <Link to="/support/account" className="category-card">
                                <User size={24} className="icon-green category-icon" />
                                <h4>Account</h4>
                                <p>Profile management, security, and subscription settings.</p>
                            </Link>
                            <Link to="/support/billing" className="category-card">
                                <CreditCard size={24} className="icon-green category-icon" />
                                <h4>Billing</h4>
                                <p>Manage invoices, payment methods, and premium perks.</p>
                            </Link>
                            <Link to="/support/features" className="category-card">
                                <Sparkles size={24} className="icon-green category-icon" />
                                <h4>AI Features</h4>
                                <p>Master AI recipe generation and flavor pairing logic.</p>
                            </Link>
                            <Link to="/support/recipes" className="category-card">
                                <BookOpen size={24} className="icon-green category-icon" />
                                <h4>Recipes</h4>
                                <p>Importing recipes, organizing collections, and meal planning.</p>
                            </Link>
                        </div>

                        {/* Split Layout: FAQ + Form / Contact Support */}
                        <div className="support-split-layout">

                            {/* Left Column */}
                            <div className="split-left">
                                {/* FAQ */}
                                <div className="section-header">
                                    <h3>Frequently Asked Questions</h3>
                                </div>
                                <div className="faq-list">
                                    {faqs.map((faq, index) => (
                                        <div
                                            key={index}
                                            className={`faq-item ${openFaq === index ? 'open' : ''}`}
                                        >
                                            <button
                                                className="faq-question"
                                                onClick={() => toggleFaq(index)}
                                            >
                                                <span>{faq.question}</span>
                                                <ChevronDown size={20} className="faq-chevron" />
                                            </button>
                                            <div className="faq-answer">
                                                <p>{faq.answer}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Support Ticket Form */}
                                <div className="ticket-form-card">
                                    <div className="ticket-header">
                                        <h3>Submit a Support Ticket</h3>
                                        <p>Can't find what you're looking for? Let us know and we'll get back to you within 24 hours.</p>
                                    </div>
                                    <form className="ticket-form" onSubmit={(e) => e.preventDefault()}>
                                        <div className="form-row">
                                            <div className="form-group">
                                                <label>Full Name</label>
                                                <input type="text" placeholder="Julian Smith" />
                                            </div>
                                            <div className="form-group">
                                                <label>Email Address</label>
                                                <input type="email" placeholder="julian@example.com" />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label>Category</label>
                                            <div className="select-wrapper">
                                                <select>
                                                    <option>Technical Issue</option>
                                                    <option>Billing Question</option>
                                                    <option>Feature Request</option>
                                                    <option>Other</option>
                                                </select>
                                                <ChevronDown size={16} className="select-icon" />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label>Subject</label>
                                            <input type="text" placeholder="Briefly describe your request" />
                                        </div>
                                        <div className="form-group">
                                            <label>Detailed Description</label>
                                            <textarea
                                                rows="5"
                                                placeholder="Tell us more about how we can help..."
                                            ></textarea>
                                        </div>
                                        <div className="form-submit-row">
                                            <button type="submit" className="submit-btn">Submit Ticket</button>
                                            <span className="submit-disclaimer">By submitting, you agree to our privacy policy regarding support data.</span>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            {/* Right Column (Contact Blocks) */}
                            <div className="split-right">
                                <div className="contact-box green-box">
                                    <h3>Need instant help?</h3>
                                    <p>Our AI Assistant is trained on all documentation and can help you in real-time.</p>
                                    <Link to="/ai-assistant" className="action-btn block-btn">
                                        <MessageSquare size={18} /> Chat with AI Assistant
                                    </Link>
                                    {/* Decorative Gear Background Image Placeholder */}
                                    <Settings size={120} className="bg-icon-decoration" />
                                </div>

                                <div className="contact-box white-box">
                                    <h3>Contact Human Support</h3>
                                    <div className="contact-info-item">
                                        <Mail size={18} className="icon-green" />
                                        <div>
                                            <span className="info-label">Email us</span>
                                            <a href="mailto:support@co-che.com" className="email-link">support@co-che.com</a>
                                        </div>
                                    </div>
                                    <div className="contact-info-item">
                                        <Clock size={18} className="icon-green" />
                                        <div>
                                            <span className="info-label">Support Hours</span>
                                            <span className="info-text">Mon-Fri, 9am - 5pm EST</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Support Footer */}
                    <footer className="support-page-footer">
                        <div className="footer-links">
                            <a href="#">Documentation</a>
                            <a href="#">API Status</a>
                            <a href="#">Community Forum</a>
                            <a href="#">Privacy Policy</a>
                        </div>
                        <p className="copyright">© 2024 CO-CHE Kitchen Intelligence. All rights reserved.</p>
                    </footer>
                </div>
            </main>
        </div>
    );
};

export default Support;
