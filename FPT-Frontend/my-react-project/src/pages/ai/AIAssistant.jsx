import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../css/ai-assistant.css';
import {
    Plus, MessageSquare, Settings, Trash2, Paperclip,
    Send, MapPin, Sparkles, Navigation, Menu
} from 'lucide-react';

const AIAssistant = () => {
    const location = useLocation();
    const currentPath = location.pathname;
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const historyItems = [
        { id: 1, label: 'Salmon Recipe Help', group: 'TODAY', active: true },
        { id: 2, label: 'Quick Dinner Ideas', group: 'TODAY', active: false },
        { id: 3, label: 'Dietary Plan Adjustment', group: 'YESTERDAY', active: false },
        { id: 4, label: 'Week 3 Meal Prep', group: 'PREVIOUS 7 DAYS', active: false },
        { id: 5, label: 'Vegan Substitute Options', group: 'PREVIOUS 7 DAYS', active: false },
        { id: 6, label: 'Italian Cuisine Tips', group: 'PREVIOUS 7 DAYS', active: false },
    ];

    const todayItems = historyItems.filter(i => i.group === 'TODAY');
    const yesterdayItems = historyItems.filter(i => i.group === 'YESTERDAY');
    const prevItems = historyItems.filter(i => i.group === 'PREVIOUS 7 DAYS');

    const renderHistoryGroup = (title, items) => (
        <div className="history-group">
            <h4 className="history-label">{title}</h4>
            <div className="history-list-items">
                {items.map(item => (
                    <div key={item.id} className={`history-item ${item.active ? 'active' : ''}`}>
                        <MessageSquare size={16} color={item.active ? '#10b981' : '#9ca3af'} />
                        <span>{item.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="ai-assistant-page">

            {/* --- Global Header specific to AI --- */}
            <header className="ai-header">
                <div className="ai-header-left">
                    <button className="btn-toggle-sidebar" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                        <Menu size={24} />
                    </button>
                    <Sparkles className="ai-logo" size={24} fill="currentColor" />
                    <h2 className="ai-header-title">CO-CHE AI Assistant</h2>
                </div>
                <div className="ai-header-center">
                    <Link to="/" className={`ai-nav-link ${currentPath === '/' ? 'active' : ''}`}>Home</Link>
                    <Link to="/recipes" className={`ai-nav-link ${currentPath === '/recipes' ? 'active' : ''}`}>Recipes</Link>
                    <Link to="/map" className={`ai-nav-link ${currentPath === '/map' ? 'active' : ''}`}>Map</Link>
                    <Link to="/healthy-plan" className={`ai-nav-link ${currentPath === '/healthy-plan' ? 'active' : ''}`}>Healthy Plan</Link>
                    <Link to="/community" className={`ai-nav-link ${currentPath === '/community' ? 'active' : ''}`}>Community</Link>
                    <Link to="/ai-assistant" className={`ai-nav-link ${currentPath === '/ai-assistant' ? 'active' : ''}`}>AI Assistant</Link>
                    <Link to="/support" className={`ai-nav-link ${currentPath === '/support' ? 'active' : ''}`}>Support</Link>
                </div>
                <div className="ai-header-right">
                    <Link to="/profile" className="ai-nav-btn profile">Profile</Link>
                    <button className="ai-settings-btn">
                        <Settings size={18} />
                    </button>
                    <img
                        src="https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=100"
                        alt="User"
                        className="header-avatar"
                    />
                </div>
            </header>

            <div className="ai-layout-container">

                {/* --- Left Sidebar (History) --- */}
                <aside className={`ai-sidebar-left ${isSidebarOpen ? 'open' : 'closed'}`}>
                    <div className="ai-sidebar-top">
                        <button className="btn-new-chat">
                            <Plus size={20} strokeWidth={3} /> New Chat
                        </button>
                    </div>

                    <div className="ai-history-list">
                        {renderHistoryGroup('TODAY', todayItems)}
                        {renderHistoryGroup('YESTERDAY', yesterdayItems)}
                        {renderHistoryGroup('PREVIOUS 7 DAYS', prevItems)}
                    </div>

                    <div className="ai-sidebar-bottom">
                        <button className="btn-clear-chat">
                            <Trash2 size={18} /> Clear conversations
                        </button>
                    </div>
                </aside>

                {/* --- Main Chat Area --- */}
                <main className="ai-chat-main">

                    <div className="chat-scroll-area">
                        <span className="date-pill">Today, 10:23 AM</span>

                        {/* AI Welcome Message */}
                        <div className="chat-row ai">
                            <div className="chat-avatar ai">
                                <Sparkles size={18} fill="currentColor" />
                            </div>
                            <div className="chat-bubble">
                                Hello! I'm your cooking assistant. I can help you with complex cooking advice, meal planning, or app support. How can I assist you today?
                            </div>
                        </div>

                        {/* User Message */}
                        <div className="chat-row user">
                            <div className="chat-avatar user">
                                <img src="https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=100" alt="User" />
                            </div>
                            <div className="chat-bubble">
                                I need help cooking salmon. What's a good temperature? Also, I have some asparagus I want to use.
                            </div>
                        </div>

                        {/* AI Response with Formatted Text and Embedded Component */}
                        <div className="chat-row ai">
                            <div className="chat-avatar ai">
                                <Sparkles size={18} fill="currentColor" />
                            </div>
                            <div className="chat-bubble">
                                For salmon, the ideal internal temperature depends on your preference, but here's a general guide:

                                <ul className="ai-list">
                                    <li><strong>Medium-Rare:</strong> 120°F (49°C) – Soft, moist, slightly translucent center.</li>
                                    <li><strong>Medium:</strong> 125°F - 130°F (52°C - 54°C) – Flaky but still very moist.</li>
                                    <li><strong>Well-Done:</strong> 145°F (63°C) – Firmer and lighter in color. (FDA recommended for safety).</li>
                                </ul>

                                For the asparagus, roasting them alongside the salmon is a fantastic option!

                                <div className="embed-recipe-card">
                                    <img
                                        src="https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=200"
                                        alt="Recipe"
                                        className="embed-img"
                                    />
                                    <div className="embed-info">
                                        <h5>Sheet Pan Lemon Salmon & Asparagus</h5>
                                        <p>A quick 20-minute meal. Roast both at 400°F (200°C) for about 12-15 minutes.</p>
                                    </div>
                                    <MessageSquare size={16} color="#9ca3af" /> {/* Just an arrow/icon placeholder */}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Chat Input */}
                    <div className="chat-input-wrapper">
                        <div className="chat-input-box">
                            <button className="btn-attach">
                                <Paperclip size={20} />
                            </button>
                            <input
                                type="text"
                                className="chat-input-field"
                                placeholder="Ask anything about cooking..."
                            />
                            <button className="btn-send">
                                <Send size={18} fill="currentColor" strokeWidth={0} />
                            </button>
                        </div>
                        <p className="chat-disclaimer">
                            CO-CHE AI can make mistakes. Consider checking important information.
                        </p>
                    </div>

                </main>

                {/* --- Right Sidebar (Info Panel) --- */}
                <aside className="ai-sidebar-right">
                    <div className="ai-info-scroll">

                        {/* Suggestions / Ingredients */}
                        <div className="info-section">
                            <h4 className="info-section-title">SUGGESTIONS</h4>
                            <h4 className="info-section-title" style={{ marginTop: '-0.5rem', color: 'var(--primary)' }}>RELATED INGREDIENTS</h4>

                            <div className="ingredients-grid">
                                <div className="ingredient-card">
                                    <img src="https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&q=80&w=200" alt="Fresh Dill" />
                                    <div className="ingredient-overlay">Fresh Dill</div>
                                </div>
                                <div className="ingredient-card">
                                    <img src="https://images.unsplash.com/photo-1527011494884-25cb48197771?auto=format&fit=crop&q=80&w=200" alt="Lemons" />
                                    <div className="ingredient-overlay">Lemons</div>
                                </div>
                                <div className="ingredient-card">
                                    <img src="https://images.unsplash.com/photo-1540340061722-9293d5163008?auto=format&fit=crop&q=80&w=200" alt="Garlic" />
                                    <div className="ingredient-overlay">Garlic</div>
                                </div>
                                <div className="ingredient-card add-shopping-card">
                                    <Plus size={24} />
                                    <span>Shopping List</span>
                                </div>
                            </div>
                        </div>

                        {/* Pairing Wine */}
                        <div className="info-section">
                            <h4 className="info-section-title">PAIRING WINE</h4>
                            <div className="wine-card">
                                <img src="https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&q=80&w=150" alt="Wine" className="wine-img" />
                                <div className="wine-info">
                                    <h4>Sauvignon Blanc</h4>
                                    <p>Crisp acidity cuts through the richness of salmon.</p>
                                </div>
                            </div>
                        </div>

                        {/* Nearby Fish Markets */}
                        <div className="info-section">
                            <h4 className="info-section-title">NEARBY FISH MARKETS</h4>

                            <div className="map-header">
                                <h4>Oceans Catch Market</h4>
                                <span className="badge-open">Open</span>
                            </div>

                            <div className="map-image-wrapper">
                                <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=400" alt="Map Route" />
                                <span className="distance-tag">0.8 mi</span>
                            </div>

                            <button className="btn-directions">
                                <Navigation size={14} fill="currentColor" /> Get Directions
                            </button>
                        </div>

                    </div>

                    {/* Go Premium Ad */}
                    <div className="premium-ad-card">
                        <Sparkles className="stars-decor" size={48} color="#9ca3af" />
                        <h3>Go Premium</h3>
                        <p>Get unlimited AI recipes and meal plans.</p>
                        <button className="btn-upgrade">Upgrade Now</button>
                    </div>

                </aside>

            </div>
        </div>
    );
};

export default AIAssistant;
