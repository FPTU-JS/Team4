import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, MicOff, Camera } from 'lucide-react';

const AIInput = () => {
    const [ingredients, setIngredients] = useState('');
    const [isListening, setIsListening] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);
    const recognitionRef = useRef(null);
    const navigate = useNavigate();

    const handleVoiceInput = () => {
        if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
            alert("Trình duyệt của bạn không hỗ trợ nhận diện giọng nói. Vui lòng dùng Google Chrome hoặc Edge.");
            return;
        }

        if (isListening) {
            recognitionRef.current?.stop();
            setIsListening(false);
            return;
        }

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognitionRef.current = recognition;

        recognition.lang = 'vi-VN';
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onstart = () => setIsListening(true);
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setIngredients(prev => prev ? prev + ', ' + transcript : transcript);
        };
        recognition.onerror = (e) => {
            console.error("Speech recognition error:", e.error);
            setIsListening(false);
        };
        recognition.onend = () => setIsListening(false);

        recognition.start();
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
                // In a real app, you would send this to Gemini Vision API / Cloudinary
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (ingredients.trim() || imagePreview) {
            // Pass data to recommendations page
            navigate('/ai-recommendations', { state: { ingredients, imagePreview } });
        }
    };

    return (
        <div className="container" style={{ maxWidth: '800px', marginTop: '2rem' }}>
            <div className="glass-panel animate-fade-in" style={{ padding: '3rem 2rem', textAlign: 'center' }}>
                <h1 className="heading-h1" style={{ marginBottom: '1rem' }}>Hôm nay bạn có nguyên liệu gì?</h1>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', fontSize: '1.2rem' }}>
                    Nhập tên nguyên liệu, chụp ảnh tủ lạnh, hoặc đọc tên nguyên liệu để AI gợi ý món ăn phù hợp với sức khỏe của bạn.
                </p>

                <form onSubmit={handleSubmit}>
                    <div style={{ position: 'relative', display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
                        <input
                            type="text"
                            value={ingredients}
                            onChange={(e) => setIngredients(e.target.value)}
                            placeholder="VD: Thịt bò, súp lơ, cà rốt..."
                            style={{
                                flex: 1,
                                padding: '1rem 1.5rem',
                                fontSize: '1.1rem',
                                borderRadius: 'var(--radius-full)',
                                border: '2px solid var(--border-color)',
                                outline: 'none',
                                background: 'var(--bg-main)',
                                transition: 'border-color var(--transition-fast)'
                            }}
                            onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                            onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
                        />
                        <button
                            type="button"
                            onClick={handleVoiceInput}
                            className="btn-secondary"
                            style={{
                                borderRadius: 'var(--radius-full)',
                                padding: '0 1.5rem',
                                background: isListening ? '#fecaca' : 'var(--bg-surface)',
                                color: isListening ? '#ef4444' : 'inherit',
                                border: isListening ? '2px solid #ef4444' : '2px solid transparent',
                                transition: 'all 0.3s ease'
                            }}
                            title="Nhập bằng giọng nói"
                        >
                            {isListening ? <MicOff size={20} className="animate-pulse" /> : <Mic size={20} />}
                        </button>
                        <button
                            type="button"
                            onClick={() => fileInputRef.current.click()}
                            className="btn-secondary"
                            style={{ borderRadius: 'var(--radius-full)', padding: '0 1.5rem' }}
                            title="Tải ảnh nguyên liệu"
                        >
                            <Camera size={20} />
                        </button>
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handleImageUpload}
                        />
                    </div>

                    {imagePreview && (
                        <div style={{ marginBottom: '2rem', textAlign: 'left' }}>
                            <p style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Ảnh đã tải lên:</p>
                            <img
                                src={imagePreview}
                                alt="Ingredients Preview"
                                style={{
                                    maxHeight: '200px',
                                    borderRadius: 'var(--radius-md)',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                                }}
                            />
                            <button
                                type="button"
                                onClick={() => setImagePreview(null)}
                                style={{ marginLeft: '1rem', color: 'var(--primary)', textDecoration: 'underline' }}
                            >
                                Xóa ảnh
                            </button>
                        </div>
                    )}

                    <button type="submit" className="btn-primary" style={{ fontSize: '1.2rem', padding: '1rem 3rem' }}>
                        ✨ Gợi ý món ăn
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AIInput;
