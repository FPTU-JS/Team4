import React, { useState, useEffect } from 'react';
import {
    Search, Bell, HelpCircle, ChevronDown,
    MessageSquare, Mail, Clock, Shield,
    User, CreditCard, Sparkles, BookOpen,
    LayoutDashboard, CookingPot, Settings, Upload,
    Sun, Moon
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../pages/AuthContext';
import toast, { Toaster } from 'react-hot-toast';
import '../css/help-center.css';

const HelpCenter = () => {
    const navigate = useNavigate();
    const {  user } = useAuth();
    
    // Form state
    const [ticketData, setTicketData] = useState({
        fullName: user?.username || '',
        email: user?.email || '',
        category: 'Technical Issue',
        subject: '',
        description: ''
    });



    const handleTicketSubmit = (e) => {
        e.preventDefault();
        if (!ticketData.subject || !ticketData.description) {
            toast.error("Please fill in all required fields.");
            return;
        }
        toast.promise(
            new Promise(resolve => setTimeout(resolve, 1500)),
            {
                loading: 'Submitting ticket...',
                success: 'Ticket submitted successfully! We will contact you soon.',
                error: 'Failed to submit ticket.',
            }
        ).then(() => {
            setTicketData({ ...ticketData, subject: '', description: '' });
        });
    };

    const userName = user?.username || 'Chef';
    const userRole = user?.role === 'ROLE_ADMIN' ? 'Admin' : 'Premium Member';
    const avatarName = userName.replace(' ', '+');

    return (
        <>
            <Toaster position="top-right" />
            <main className="hc-content">

                    <section className="hc-hero">
                        <h1>How can we help you, Chef?</h1>
                        <p>Browse our articles, tutorials, and community guides to get the most out of CO-CHE.</p>

                        <div className="hc-search-large">
                            <Search size={20} color="#9ca3af" />
                            <input type="text" placeholder="Search for 'Recipe sync' or 'AI Matching'..." />
                        </div>
                    </section>

                    <div className="hc-section-main">
                        {/* Left Column */}
                        <div className="hc-column-left">
                            <h2 className="hc-subtitle">Browse by Category</h2>
                            <div className="hc-grid-categories">
                                <Link to="/profile" style={{textDecoration: 'none'}}>
                                    <div className="hc-category-card">
                                        <User size={24} className="hc-category-icon" />
                                        <h3>Account</h3>
                                        <p>Profile management, security, and subscription settings.</p>
                                    </div>
                                </Link>
                                <div className="hc-category-card">
                                    <CreditCard size={24} className="hc-category-icon" />
                                    <h3>Billing</h3>
                                    <p>Manage invoices, payment methods, and premium perks.</p>
                                </div>
                                <Link to="/ai-assistant" style={{textDecoration: 'none'}}>
                                    <div className="hc-category-card">
                                        <Sparkles size={24} className="hc-category-icon" />
                                        <h3>AI Features</h3>
                                        <p>Master AI recipe generation and flavor pairing logic.</p>
                                    </div>
                                </Link>
                                <Link to="/recipes" style={{textDecoration: 'none'}}>
                                    <div className="hc-category-card">
                                        <CookingPot size={24} className="hc-category-icon" />
                                        <h3>Recipes</h3>
                                        <p>Importing recipes, organizing collections, and meal planning.</p>
                                    </div>
                                </Link>
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
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="hc-column-right">
                            <div className="hc-panel green">
                                <h3>Need instant help?</h3>
                                <p>Our AI Assistant is trained on all documentation and can help you in real-time.</p>
                                <button className="hc-btn-primary" onClick={() => navigate('/ai-assistant')}>
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
                    <form className="hc-ticket-form" onSubmit={handleTicketSubmit}>
                        <h2>Submit a Support Ticket</h2>
                        <p className="form-subtitle">Can't find what you're looking for? Let us know and we'll get back to you within 24 hours.</p>

                        <div className="hc-form-row">
                            <div className="hc-form-group">
                                <label>Full Name</label>
                                <input 
                                    type="text" 
                                    value={ticketData.fullName} 
                                    onChange={(e) => setTicketData({...ticketData, fullName: e.target.value})} 
                                    required 
                                />
                            </div>
                            <div className="hc-form-group">
                                <label>Email Address</label>
                                <input 
                                    type="email" 
                                    value={ticketData.email} 
                                    onChange={(e) => setTicketData({...ticketData, email: e.target.value})} 
                                    required 
                                />
                            </div>
                        </div>

                        <div className="hc-form-group" style={{ marginBottom: '1.5rem' }}>
                            <label>Category</label>
                            <select 
                                value={ticketData.category}
                                onChange={(e) => setTicketData({...ticketData, category: e.target.value})}
                            >
                                <option>Technical Issue</option>
                                <option>Billing Issue</option>
                                <option>Feature Request</option>
                                <option>Account Management</option>
                            </select>
                        </div>

                        <div className="hc-form-group" style={{ marginBottom: '1.5rem' }}>
                            <label>Subject</label>
                            <input 
                                type="text" 
                                placeholder="Briefly describe your request" 
                                value={ticketData.subject} 
                                onChange={(e) => setTicketData({...ticketData, subject: e.target.value})} 
                                required
                            />
                        </div>

                        <div className="hc-form-group">
                            <label>Detailed Description</label>
                            <textarea 
                                placeholder="Tell us more about how we can help..." 
                                value={ticketData.description} 
                                onChange={(e) => setTicketData({...ticketData, description: e.target.value})} 
                                required
                            ></textarea>
                        </div>

                        <div className="hc-form-footer">
                            <button type="submit" className="hc-btn-primary" style={{ width: 'auto', padding: '0.8rem 2rem' }}>
                                Submit Ticket
                            </button>
                            <span>By submitting, you agree to our privacy policy regarding support data.</span>
                        </div>
                    </form>

                    <footer className="hc-footer">
                        <div className="hc-footer-links">
                            <Link to="/recipes">Documentation</Link>
                            <Link to="/healthy-plan">Nutrition Rules</Link>
                            <Link to="/community">Community Forum</Link>
                            <Link to="/">Terms of Service</Link>
                        </div>
                        <div className="hc-footer-copyright">
                            © 2024 CO-CHE Kitchen Intelligence. All rights reserved.
                        </div>
                    </footer>
                </main>
        </>
    );
};

export default HelpCenter;
