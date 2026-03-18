import React from 'react';
import { Settings, HelpCircle, Utensils, MessageSquare, Clock, Flame, Image as ImageIcon, Mic, Send, Plus } from 'lucide-react';
import '../../css/ai-assistant.css';

const AIAssistant = () => {
    return (
        <div className="ai-assistant-container">
            {/* Sidebar */}
            <aside className="ai-sidebar">
                <div className="ai-sidebar-header">
                    <div className="ai-brand">
                        <div className="ai-logo-box">
                            <Utensils size={20} color="white" />
                        </div>
                        <h2>CO-CHE AI</h2>
                    </div>
                </div>

                <div className="ai-user-profile">
                    <div className="ai-avatar-wrapper">
                        <img src="https://ui-avatars.com/api/?name=Chef+Alex&background=3b82f6&color=fff" alt="User" />
                        <span className="ai-online-dot"></span>
                    </div>
                    <div className="ai-user-info">
                        <h3>Chef Alex</h3>
                        <p>Expert Level</p>
                    </div>
                </div>

                <div className="ai-sidebar-section">
                    <h4><Clock size={14} /> CHAT HISTORY</h4>
                    <div className="ai-history-list">
                        <button className="ai-history-item active">
                            <MessageSquare size={16} /> Quick dinner with spinach
                        </button>
                        <button className="ai-history-item">
                            <MessageSquare size={16} /> Vegan pasta ideas
                        </button>
                        <button className="ai-history-item">
                            <MessageSquare size={16} /> Weekend meal prep
                        </button>
                    </div>
                </div>

                <div className="ai-sidebar-section">
                    <h4><Utensils size={14} /> SUGGESTED</h4>
                    <div className="ai-suggested-list">
                        <button className="ai-suggested-item">How to replace eggs?</button>
                        <button className="ai-suggested-item">Healthy dessert recipes</button>
                        <button className="ai-suggested-item">Best cast iron care</button>
                    </div>
                </div>

                <div className="ai-sidebar-footer">
                    <button className="ai-btn-new-chat">
                        <Plus size={18} /> New Chat
                    </button>
                </div>
            </aside>

            {/* Main Chat Area */}
            <main className="ai-chat-main">
                <header className="ai-chat-header">
                    <div className="ai-chat-title">
                        <h2>CO-CHE AI Chef Assistant</h2>
                        <span className="ai-badge-online">ONLINE</span>
                    </div>
                    <div className="ai-chat-actions">
                        <button className="ai-icon-btn"><Settings size={22} /></button>
                        <button className="ai-icon-btn"><HelpCircle size={22} /></button>
                    </div>
                </header>

                <div className="ai-chat-content">
                    <div className="ai-chat-timeline">
                        <div className="ai-timeline-badge">TODAY</div>
                    </div>

                    {/* AI Message 1 */}
                    <div className="ai-message-row ai-message-bot">
                        <div className="ai-msg-avatar bg-green">
                            <Utensils size={16} color="white" />
                        </div>
                        <div className="ai-msg-body">
                            <div className="ai-msg-sender">CO-CHE Chef Bot</div>
                            <div className="ai-msg-bubble bubble-light-green">
                                Hello! I'm your CO-CHE AI Assistant. How can I help you cook something delicious today? 
                                I have some great ideas for seasonal vegetables if you're interested!
                            </div>
                            <div className="ai-msg-time">10:24 AM</div>
                        </div>
                    </div>

                    {/* User Message */}
                    <div className="ai-message-row ai-message-user">
                        <div className="ai-msg-body align-right">
                            <div className="ai-msg-sender">You</div>
                            <div className="ai-msg-bubble bubble-dark-blue">
                                I need a quick dinner idea with spinach. Something healthy but flavorful!
                            </div>
                            <div className="ai-msg-time text-right">10:25 AM</div>
                        </div>
                        <div className="ai-msg-avatar bg-orange">
                            <img src="https://ui-avatars.com/api/?name=User&background=f97316&color=fff" alt="User" />
                        </div>
                    </div>

                    {/* AI Message 2 with Card */}
                    <div className="ai-message-row ai-message-bot">
                        <div className="ai-msg-avatar bg-green">
                            <Utensils size={16} color="white" />
                        </div>
                        <div className="ai-msg-body">
                            <div className="ai-msg-sender">CO-CHE Chef Bot</div>
                            <div className="ai-msg-bubble bubble-light-green extended-bubble">
                                <p>Great choice! Spinach is versatile. How about a <strong>15-Minute Garlic Lemon Spinach Pasta</strong>? It's light, zesty, and packed with nutrients.</p>
                                
                                <div className="ai-recipe-card">
                                    <img src="https://images.unsplash.com/photo-1621510456681-2330135e5871?w=200&q=80" alt="Pasta" className="ai-recipe-img" />
                                    <div className="ai-recipe-info">
                                        <h5>Garlic Lemon Spinach Pasta</h5>
                                        <p>A quick Mediterranean-style dinner perfect for busy weeknights.</p>
                                        <div className="ai-recipe-meta">
                                            <span><Clock size={12} color="#f59e0b" /> 15m</span>
                                            <span><Flame size={12} color="#10b981" /> 320 kcal</span>
                                        </div>
                                    </div>
                                </div>

                                <p className="italic-text">Would you like the full step-by-step instructions or perhaps a video tutorial?</p>
                            </div>
                            <div className="ai-msg-time">10:26 AM</div>
                        </div>
                    </div>
                </div>

                <footer className="ai-chat-input-area">
                    <div className="ai-input-wrapper">
                        <button className="ai-input-icon"><ImageIcon size={20} /></button>
                        <button className="ai-input-icon"><Mic size={20} /></button>
                        <input type="text" placeholder="Message CO-CHE Chef Assistant..." />
                        <button className="ai-btn-send">
                            <Send size={18} color="white" />
                        </button>
                    </div>
                    <div className="ai-input-footer">
                        CO-CHE AI can provide recipes and nutritional advice. Verify important dietary requirements.
                    </div>
                </footer>
            </main>
        </div>
    );
};

export default AIAssistant;
