import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../index.css';

const Preferences = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [preferences, setPreferences] = useState({
        diet: '',
        allergies: [],
        goals: '',
    });

    const handleAllergyToggle = (allergy) => {
        setPreferences(prev => ({
            ...prev,
            allergies: prev.allergies.includes(allergy)
                ? prev.allergies.filter(a => a !== allergy)
                : [...prev.allergies, allergy]
        }));
    };

    const handleNext = () => {
        if (step < 3) setStep(step + 1);
        else navigate('/recipes'); // After onboarding, go to Recipes
    };

    return (
        <div className="container" style={{ maxWidth: '600px', marginTop: '4rem' }}>
            <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
                <h2 className="heading-h2">Thiết lập Hồ sơ Sức khỏe</h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                    Bước {step} của 3
                </p>

                {step === 1 && (
                    <div className="animate-fade-in">
                        <h3 style={{ marginBottom: '1.5rem' }}>Chế độ ăn của bạn là gì?</h3>
                        <div style={{ display: 'grid', gap: '1rem' }}>
                            {['Ăn mặn (Bình thường)', 'Ăn chay (Vegan)', 'Keto', 'Eat Clean'].map(diet => (
                                <button
                                    key={diet}
                                    className={`btn-secondary ${preferences.diet === diet ? 'active' : ''}`}
                                    style={{
                                        borderColor: preferences.diet === diet ? 'var(--primary)' : 'var(--border-color)',
                                        background: preferences.diet === diet ? 'var(--primary-light)' : 'var(--bg-card)'
                                    }}
                                    onClick={() => setPreferences({ ...preferences, diet })}
                                >
                                    {diet}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="animate-fade-in">
                        <h3 style={{ marginBottom: '1.5rem' }}>Bạn có dị ứng với thực phẩm nào không?</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            {['Hải sản', 'Đậu phộng', 'Sữa (Lactose)', 'Gluten', 'Trứng', 'Không có'].map(allergy => (
                                <button
                                    key={allergy}
                                    className={`btn-secondary ${preferences.allergies.includes(allergy) ? 'active' : ''}`}
                                    style={{
                                        borderColor: preferences.allergies.includes(allergy) ? 'var(--primary)' : 'var(--border-color)',
                                        background: preferences.allergies.includes(allergy) ? 'var(--primary-light)' : 'var(--bg-card)'
                                    }}
                                    onClick={() => handleAllergyToggle(allergy)}
                                >
                                    {allergy}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="animate-fade-in">
                        <h3 style={{ marginBottom: '1.5rem' }}>Mục tiêu sức khỏe của bạn?</h3>
                        <div style={{ display: 'grid', gap: '1rem' }}>
                            {['Giảm cân', 'Tăng cơ', 'Duy trì vóc dáng', 'Cải thiện tiêu hóa'].map(goal => (
                                <button
                                    key={goal}
                                    className={`btn-secondary ${preferences.goals === goal ? 'active' : ''}`}
                                    style={{
                                        borderColor: preferences.goals === goal ? 'var(--primary)' : 'var(--border-color)',
                                        background: preferences.goals === goal ? 'var(--primary-light)' : 'var(--bg-card)'
                                    }}
                                    onClick={() => setPreferences({ ...preferences, goals: goal })}
                                >
                                    {goal}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                <div style={{ marginTop: '3rem', display: 'flex', justifyContent: 'space-between' }}>
                    <button
                        className="btn-secondary"
                        onClick={() => setStep(step - 1)}
                        disabled={step === 1}
                        style={{ opacity: step === 1 ? 0.5 : 1 }}
                    >
                        Quay lại
                    </button>
                    <button
                        className="btn-primary"
                        onClick={handleNext}
                    >
                        {step === 3 ? 'Hoàn tất' : 'Tiếp tục'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Preferences;
