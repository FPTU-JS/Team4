import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Settings, HelpCircle, Utensils, MessageSquare, Clock, Flame, Image as ImageIcon, Mic, Send, Plus, X } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../AuthContext';
import '../../css/ai-assistant.css';

const AIAssistant = () => {
    const location = useLocation();
    const { user } = useAuth();
    const displayName = user?.fullName || user?.username || "Guest";
    const displayAvatar = user?.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=f97316&color=fff`;

    const defaultMessage = { 
        sender: 'bot', 
        text: "Hello! I'm your CO-CHE AI Assistant. How can I help you cook something delicious today? I have some great ideas for seasonal vegetables if you're interested!",
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    };

    const [chats, setChats] = useState([
        {
            id: Date.now(),
            title: 'Current Chat',
            messages: [defaultMessage]
        }
    ]);
    const [activeChatId, setActiveChatId] = useState(chats[0].id);

    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    // Mở rộng Input
    const fileInputRef = useRef(null);
    const [attachedImage, setAttachedImage] = useState(null);
    const [isListening, setIsListening] = useState(false);
    const recognitionRef = useRef(null);

    const activeChatIdRef = useRef(activeChatId);
    useEffect(() => {
        activeChatIdRef.current = activeChatId;
    }, [activeChatId]);

    const activeChat = chats.find(c => c.id === activeChatId) || chats[0];
    const messages = activeChat.messages;

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    const handleNewChat = () => {
        // Prevent creating multiple empty chats
        if (activeChat.messages.length <= 1 && (activeChat.title === 'New Chat' || activeChat.title === 'Current Chat')) {
            return;
        }
        const newChat = {
            id: Date.now(),
            title: 'New Chat',
            messages: [defaultMessage]
        };
        setChats(prev => [newChat, ...prev]);
        setActiveChatId(newChat.id);
        setInput('');
    };

    const updateActiveChatMessages = (updaterFn, newTitle = null, targetChatId = null) => {
        const idToUpdate = targetChatId || activeChatIdRef.current;
        setChats(prevChats => prevChats.map(chat => {
            if (chat.id === idToUpdate) {
                return {
                    ...chat,
                    title: newTitle ? newTitle : chat.title,
                    messages: updaterFn(chat.messages)
                };
            }
            return chat;
        }));
    };

    const handleFileAttach = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAttachedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeAttachedImage = () => {
        setAttachedImage(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = false;
            recognitionRef.current.lang = 'vi-VN';
            
            recognitionRef.current.onresult = (event) => {
                const transcript = event.results[event.results.length - 1][0].transcript;
                setInput(prev => prev + (prev ? ' ' : '') + transcript);
            };

            recognitionRef.current.onend = () => {
                setIsListening(false);
            };
            
            recognitionRef.current.onerror = (event) => {
                console.error("Speech recognition error", event.error);
                setIsListening(false);
            };
        }
    }, []);

    const toggleMic = () => {
        if (!recognitionRef.current) {
            alert('Trình duyệt của bạn không hỗ trợ tính năng nhận diện giọng nói (Web Speech API).');
            return;
        }

        if (isListening) {
            recognitionRef.current.stop();
        } else {
            recognitionRef.current.start();
            setIsListening(true);
        }
    };

    const compressImage = (dataUrl, maxWidth, maxHeight, quality) => {
        return new Promise((resolve) => {
            const img = new Image();
            img.src = dataUrl;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > maxWidth) {
                        height = Math.round((height * maxWidth) / width);
                        width = maxWidth;
                    }
                } else {
                    if (height > maxHeight) {
                        width = Math.round((width * maxHeight) / height);
                        height = maxHeight;
                    }
                }

                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                // Convert to light JPEG
                resolve(canvas.toDataURL('image/jpeg', quality));
            };
            img.onerror = () => resolve(dataUrl);
        });
    };

    const handleSend = async (e, overrideText = null, overrideChat = null, overrideImage = null) => {
        e?.preventDefault();
        
        const messageText = overrideText || input;
        const imageToSend = overrideImage || attachedImage;
        
        if (!messageText.trim() && !imageToSend) return;

        const userMsg = {
            sender: 'user',
            text: messageText,
            image: imageToSend,
            time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
        };

        const currentActiveChat = overrideChat || activeChat;
        const currentActiveChatId = currentActiveChat.id;

        // If this is the first user message, change the chat title automatically
        let newTitle = null;
        if (currentActiveChat.messages.length === 1 && (currentActiveChat.title === 'New Chat' || currentActiveChat.title === 'Current Chat')) {
            newTitle = messageText.length > 25 ? messageText.substring(0, 25) + '...' : messageText;
            if (!newTitle && imageToSend) newTitle = "Image Analysis";
        }

        updateActiveChatMessages(prev => [...prev, userMsg], newTitle, currentActiveChatId);
        setInput('');
        setAttachedImage(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
        setIsLoading(true);

        try {
            const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
            if (!apiKey) {
                throw new Error("Missing API Key");
            }

            const prompt = "Bạn là chuyên gia bếp trưởng AI 'CO-CHE AI Chef Assistant' cho trang web ẩm thực. Cung cấp lời khuyên ngắn gọn, tư vấn nấu ăn, dịch và hướng dẫn chi tiết. Câu hỏi hoặc Hình ảnh của người dùng: " + userMsg.text;

            let parts = [{ text: prompt }];

            if (imageToSend) {
                // Compress image to save massive bandwidth and eliminate hanging/timeout
                const compressedDataUrl = await compressImage(imageToSend, 1024, 1024, 0.7);
                const base64Index = compressedDataUrl.indexOf('base64,');
                if (base64Index !== -1) {
                    const mimeType = compressedDataUrl.substring(5, base64Index - 1);
                    const data = compressedDataUrl.substring(base64Index + 7);
                    parts.push({
                        inlineData: {
                            mimeType: mimeType,
                            data: data
                        }
                    });
                }
            }

            const response = await axios.post(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
                {
                    contents: [{ parts: parts }]
                },
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            );

            const replyText = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "Xin lỗi, tôi không thể tìm thấy câu trả lời phù hợp.";

            const botMsg = {
                sender: 'bot',
                text: replyText,
                time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
            };
            
            updateActiveChatMessages(prev => [...prev, botMsg], null, currentActiveChatId);

        } catch (error) {
            console.error("Chat error:", error);
            
            let errorMessage = "Chưa rõ nguyên nhân.";
            const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
            
            if (!apiKey) {
                errorMessage = "Chưa nhận diện được VITE_GEMINI_API_KEY. Vui lòng chắc chắn bạn đã tắt terminal cũ (Ctrl+C) và gõ lại 'npm run dev' để Vite tải lại file .env!";
            } else if (error.response) {
                errorMessage = "Lỗi từ Google API: " + (error.response.data?.error?.message || error.response.statusText);
            } else if (error.request) {
                errorMessage = "Lỗi mạng (Network Error) hoặc bị chặn bởi Adblock/CORS. Không thể kết nối tới Google.";
            } else {
                errorMessage = error.message;
            }

            const errorMsg = {
                sender: 'bot',
                text: "Lỗi kết nối: " + errorMessage,
                time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
            };
            updateActiveChatMessages(prev => [...prev, errorMsg], null, currentActiveChatId);
        } finally {
            setIsLoading(false);
        }
    };

    // Auto-send initial prompt if passed from another page (like Home)
    useEffect(() => {
        if (location.state?.initialPrompt || location.state?.capturedImage) {
            let promptContent = location.state?.initialPrompt || "Please analyze the uploaded image of ingredients and give me a recipe idea.";
            const imageData = location.state?.capturedImage || null;
            
            if (imageData && !location.state?.initialPrompt) {
                promptContent = "Dưới đây là hình ảnh tôi vừa tải lên. Nếu đây là các nguyên liệu, hãy phân tích và gợi ý cho tôi món ăn có thể nấu. Nếu đây là một món ăn hoàn chỉnh, hãy phân tích xem nó gồm những nguyên liệu gì và cách làm sơ bộ.";
            }

            // Consume the state so it doesn't trigger again on refresh
            window.history.replaceState({}, document.title);
            
            // Check if active chat is fresh. If not, create a new one.
            let chatToUse = activeChat;
            if (activeChat.messages.length > 1) {
                chatToUse = {
                    id: Date.now(),
                    title: 'Image Analysis',
                    messages: [defaultMessage]
                };
                setChats(prev => [chatToUse, ...prev]);
                setActiveChatId(chatToUse.id);
            }
            
            // Delay slightly to ensure UI is ready, then send
            setTimeout(() => {
                handleSend(null, promptContent, chatToUse, imageData);
            }, 300);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.state]);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    const formatTextBody = (text) => {
        const parts = text.split(/(\*\*.*?\*\*)/g);
        return parts.map((part, index) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={index}>{part.slice(2, -2)}</strong>;
            }
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
                        <img src={displayAvatar} alt="User" />
                        <span className="ai-online-dot"></span>
                    </div>
                    <div className="ai-user-info">
                        <h3>{displayName}</h3>
                        <p>App User</p>
                    </div>
                </div>

                <div className="ai-sidebar-section">
                    <h4><Clock size={14} /> CHAT HISTORY</h4>
                    <div className="ai-history-list">
                        {chats.map(chat => (
                            <button 
                                key={chat.id} 
                                className={`ai-history-item ${chat.id === activeChatId ? 'active' : ''}`}
                                onClick={() => setActiveChatId(chat.id)}
                            >
                                <MessageSquare size={16} /> {chat.title}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="ai-sidebar-section">
                    <h4><Utensils size={14} /> SUGGESTED</h4>
                    <div className="ai-suggested-list">
                        <button className="ai-suggested-item" onClick={(e) => handleSend(e, "How to replace eggs in baking?")}>How to replace eggs?</button>
                        <button className="ai-suggested-item" onClick={(e) => handleSend(e, "Healthy dessert recipes")}>Healthy dessert recipes</button>
                        <button className="ai-suggested-item" onClick={(e) => handleSend(e, "Best cast iron care tips")}>Best cast iron care</button>
                    </div>
                </div>

                <div className="ai-sidebar-footer">
                    <button className="ai-btn-new-chat" onClick={handleNewChat}>
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
                                    {msg.image && (
                                        <div style={{ marginBottom: '8px' }}>
                                            <img src={msg.image} alt="Uploaded" style={{ maxWidth: '100%', borderRadius: '8px', maxHeight: '300px', objectFit: 'cover' }} />
                                        </div>
                                    )}
                                    {formatTextBody(msg.text)}
                                </div>
                                <div className={`ai-msg-time ${msg.sender === 'user' ? 'text-right' : ''}`}>{msg.time}</div>
                            </div>
                            
                            {msg.sender === 'user' && (
                                <div className="ai-msg-avatar bg-orange">
                                    <img src={displayAvatar} alt="User" />
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
                    {attachedImage && (
                        <div className="ai-attached-image-preview" style={{ position: 'absolute', bottom: '100%', left: '26px', padding: '10px', background: 'var(--bg-card)', borderTopLeftRadius: '12px', borderTopRightRadius: '12px', border: '1px solid var(--border-color)', borderBottom: 'none' }}>
                            <div style={{ position: 'relative', display: 'inline-block' }}>
                                <img src={attachedImage} alt="Attached" style={{ height: '60px', borderRadius: '8px', border: '1px solid var(--border-color)' }} />
                                <button 
                                    onClick={removeAttachedImage}
                                    style={{ position: 'absolute', top: '-8px', right: '-8px', background: 'var(--red)', color: 'white', borderRadius: '50%', padding: '2px', border: 'none', cursor: 'pointer' }}
                                >
                                    <X size={14} />
                                </button>
                            </div>
                        </div>
                    )}
                    <div className="ai-input-wrapper" style={{ position: 'relative' }}>
                        <input type="file" accept="image/*" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileAttach} />
                        <button className="ai-input-icon" onClick={() => fileInputRef.current?.click()}>
                            <ImageIcon size={20} />
                        </button>
                        <button className="ai-input-icon" onClick={toggleMic} style={{ color: isListening ? '#ef4444' : 'inherit' }}>
                            <Mic size={20} className={isListening ? 'badge-pulse' : ''} />
                        </button>
                        <input 
                            type="text" 
                            placeholder={isListening ? "Đang lắng nghe..." : "Message CO-CHE Chef Assistant..."} 
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
