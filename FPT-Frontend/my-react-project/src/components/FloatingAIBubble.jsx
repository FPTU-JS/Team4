import React, { useState } from 'react';
import { Sparkles, X, Send, Paperclip } from 'lucide-react';
import '../css/floating-ai.css';

const FloatingAIBubble = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="floating-ai-container">
            {/* The Chat Window */}
            {isOpen && (
                <div className="floating-chat-window">
                    <div className="chat-window-header">
                        <div className="header-info">
                            <Sparkles size={20} className="ai-icon" />
                            <span>CO-CHE AI</span>
                        </div>
                        <button className="close-btn" onClick={() => setIsOpen(false)}>
                            <X size={20} />
                        </button>
                    </div>

                    <div className="chat-window-body">
                        {/* Sample Initial AI Message */}
                        <div className="chat-message ai">
                            <div className="avatar"><Sparkles size={14} /></div>
                            <div className="bubble">Hi! I'm your CO-CHE AI Assistant. How can I help you cook today?</div>
                        </div>
                    </div>

                    <div className="chat-window-footer">
                        <button className="attach-btn"><Paperclip size={18} /></button>
                        <input type="text" placeholder="Ask about recipes, ingredients..." />
                        <button className="send-btn"><Send size={18} /></button>
                    </div>
                </div>
            )}

            {/* The Bubble Button */}
            <button 
                className={`floating-bubble-btn ${isOpen ? 'active' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <X size={24} /> : <Sparkles size={24} />}
            </button>
        </div>
    );
};

export default FloatingAIBubble;
