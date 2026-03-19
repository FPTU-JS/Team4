import React, { useState, useRef, useEffect } from 'react';
import { Settings, HelpCircle, Utensils, MessageSquare, Clock, Flame, Image as ImageIcon, Mic, Send, Plus } from 'lucide-react';
import api from '../../utils/axiosConfig';
import '../../css/ai-assistant.css';

const AIAssistant = () => {
    const [messages, setMessages] = useState([
        { 
            sender: 'bot', 
            text: "Hello! I'm your CO-CHE AI Assistant. How can I help you cook something delicious today? I have some great ideas for seasonal vegetables if you're interested!",
            time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    const handleSend = async (e) => {
        e?.preventDefault();
        if (!input.trim()) return;

        const userMsg = {
            sender: 'user',
            text: input,
            time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
        };

        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await api.post('/api/ai/chat', { message: userMsg.text });
            const botMsg = {
                sender: 'bot',
                text: response.data.reply,
                time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
            };
            setMessages(prev => [...prev, botMsg]);
        } catch (error) {
            console.error("Chat error:", error);
            const errorMsg = {
                sender: 'bot',
                text: "Xin lỗi, hiện tại tôi đang gặp chút sự cố kết nối. Vui lòng thử lại sau.",
                time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
            };
            setMessages(prev => [...prev, errorMsg]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    const formatTextBody = (text) => {
        // Basic markdown formatting for bold text (Gemini uses **bold**)
        const parts = text.split(/(\*\*.*?\*\*)/g);
        return parts.map((part, index) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={index}>{part.slice(2, -2)}</strong>;
            }
            // Parse line breaks from Gemini API response
            if (part.includes('\n')) {
                return <span key={index}>{
                    part.split('\n').map((line, i) => (
                        <React.Fragment key={i}>
                            {line}
                            {i !== part.split('\n').length - 1 && <br />}
                        </React.Fragment>
                    ))
                }</span>;
            }
            return <span key={index}>{part}</span>;
        });
    };

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
                            <MessageSquare size={16} /> Current Chat
                        </button>
                    </div>
                </div>

                <div className="ai-sidebar-section">
                    <h4><Utensils size={14} /> SUGGESTED</h4>
                    <div className="ai-suggested-list">
                        <button className="ai-suggested-item" onClick={() => setInput("How to replace eggs in baking?")}>How to replace eggs?</button>
                        <button className="ai-suggested-item" onClick={() => setInput("Healthy dessert recipes")}>Healthy dessert recipes</button>
                        <button className="ai-suggested-item" onClick={() => setInput("Best cast iron care tips")}>Best cast iron care</button>
                    </div>
                </div>

                <div className="ai-sidebar-footer">
                    <button className="ai-btn-new-chat" onClick={() => setMessages([{ sender: 'bot', text: 'Hello! I\'m your CO-CHE AI Assistant. How can I help you cook something delicious today?', time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }])}>
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

                    {messages.map((msg, idx) => (
                        <div key={idx} className={`ai-message-row ${msg.sender === 'user' ? 'ai-message-user' : 'ai-message-bot'}`}>
                            {msg.sender === 'bot' && (
                                <div className="ai-msg-avatar bg-green">
                                    <Utensils size={16} color="white" />
                                </div>
                            )}
                            
                            <div className={`ai-msg-body ${msg.sender === 'user' ? 'align-right' : ''}`}>
                                <div className="ai-msg-sender">{msg.sender === 'user' ? 'You' : 'CO-CHE Chef Bot'}</div>
                                <div className={`ai-msg-bubble ${msg.sender === 'user' ? 'bubble-dark-blue' : 'bubble-light-green'}`}>
                                    {formatTextBody(msg.text)}
                                </div>
                                <div className={`ai-msg-time ${msg.sender === 'user' ? 'text-right' : ''}`}>{msg.time}</div>
                            </div>
                            
                            {msg.sender === 'user' && (
                                <div className="ai-msg-avatar bg-orange">
                                    <img src="https://ui-avatars.com/api/?name=User&background=f97316&color=fff" alt="User" />
                                </div>
                            )}
                        </div>
                    ))}
                    
                    {isLoading && (
                        <div className="ai-message-row ai-message-bot">
                            <div className="ai-msg-avatar bg-green">
                                <Utensils size={16} color="white" />
                            </div>
                            <div className="ai-msg-body">
                                <div className="ai-msg-sender">CO-CHE Chef Bot</div>
                                <div className="ai-msg-bubble bubble-light-green">
                                    <div style={{ fontStyle: 'italic', opacity: 0.8 }}>Chef is thinking...</div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <footer className="ai-chat-input-area">
                    <div className="ai-input-wrapper">
                        <button className="ai-input-icon"><ImageIcon size={20} /></button>
                        <button className="ai-input-icon"><Mic size={20} /></button>
                        <input 
                            type="text" 
                            placeholder="Message CO-CHE Chef Assistant..." 
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            disabled={isLoading}
                        />
                        <button className="ai-btn-send" onClick={handleSend} disabled={!input.trim() || isLoading}>
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
