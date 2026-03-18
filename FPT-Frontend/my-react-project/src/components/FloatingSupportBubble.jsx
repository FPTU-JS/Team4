import React, { useState } from 'react';
import { HelpCircle, X, Send, Paperclip, MessageSquare } from 'lucide-react';
import '../css/floating-support.css';

const FloatingSupportBubble = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="floating-support-container">
            {/* The Chat Window */}
            {isOpen && (
                <div className="floating-support-window">
                    <div className="support-window-header">
                        <div className="support-header-info">
                            <MessageSquare size={20} className="support-icon" />
                            <span>Live Support</span>
                        </div>
                        <button className="support-close-btn" onClick={() => setIsOpen(false)}>
                            <X size={20} />
                        </button>
                    </div>

                    <div className="support-window-body">
                        {/* Sample Initial Support Message */}
                        <div className="support-message agent">
                            <div className="support-avatar"><HelpCircle size={14} /></div>
                            <div className="support-bubble">Hello! I'm a CO-CHE Support Agent. How can I assist you with your account or our features today?</div>
                        </div>
                    </div>

                    <div className="support-window-footer">
                        <button className="support-attach-btn"><Paperclip size={18} /></button>
                        <input type="text" placeholder="Type your issue here..." />
                        <button className="support-send-btn"><Send size={18} /></button>
                    </div>
                </div>
            )}

            {/* The Bubble Button */}
            <button 
                className={`floating-support-btn ${isOpen ? 'active' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
            </button>
        </div>
    );
};

export default FloatingSupportBubble;
