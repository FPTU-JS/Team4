import React, { useState } from 'react';
import { ShoppingCart, Brain, Activity, Droplet, CheckCircle2, ChevronRight, Award, History, TrendingUp } from 'lucide-react';
import '../css/healthy-plan-dashboard.css';

const mockMeals = [
    {
        id: 'm1',
        type: 'BREAKFAST',
        title: 'Avocado Egg Toast',
        calories: '420 kcal',
        time: '15 min prep',
        macros: { p: '22g', c: '35g', f: '18g' },
        image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&q=80',
    },
    {
        id: 'm2',
        type: 'LUNCH',
        title: 'Mediterranean Quinoa Bowl',
        calories: '580 kcal',
        time: '20 min prep',
        macros: { p: '28g', c: '62g', f: '14g' },
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80',
    },
    {
        id: 'm3',
        type: 'DINNER',
        title: 'Lemon Herb Salmon',
        calories: '650 kcal',
        time: '30 min prep',
        macros: { p: '45g', c: '12g', f: '32g' },
        image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&q=80',
    }
];

const mockDays = [
    { day: 'MON', date: '12' },
    { day: 'TUE', date: '13' },
    { day: 'WED', date: '14' },
    { day: 'THU', date: '15' },
    { day: 'FRI', date: '16' },
    { day: 'SAT', date: '17' },
    { day: 'SUN', date: '18' }
];

const HealthyPlanDashboard = () => {
    const [activeDay, setActiveDay] = useState('MON');

    return (
        <div className="hp-dashboard-page fade-in">
            <div className="hp-dashboard-layout">
                {/* Main Content (Left) */}
                <div className="hp-main-content">

                    {/* Header Area */}
                    <div className="hp-header-area">
                        <div>
                            <h1 className="heading-h1">Healthy Plan Dashboard</h1>
                            <p className="hp-subtitle">
                                Personalized nutrition tracking for <span className="text-green-bold">Muscle Gain</span> goal.
                            </p>
                        </div>
                        <button className="btn-smart-shopping">
                            <ShoppingCart size={18} /> Smart Shopping List
                        </button>
                    </div>

                    {/* Top Stats Cards */}
                    <div className="hp-top-cards">
                        {/* Weight Card */}
                        <div className="hp-stat-card">
                            <span className="stat-label">CURRENT WEIGHT</span>
                            <div className="stat-value">
                                <span className="stat-number">74.5</span>
                                <span className="stat-unit">kg</span>
                            </div>
                            <div className="goal-bar-container">
                                <div className="goal-bar-track">
                                    <div className="goal-bar-fill" style={{ width: '80%' }}></div>
                                </div>
                                <span className="goal-text">Goal: 80.0 kg</span>
                            </div>
                        </div>

                        {/* BMI Card */}
                        <div className="hp-stat-card">
                            <span className="stat-label">BMI INDEX</span>
                            <div className="stat-value">
                                <span className="stat-number">22.8</span>
                                <span className="stat-status text-green">Normal</span>
                            </div>
                            <div className="bmi-segments">
                                <div className="bmi-segment blue"></div>
                                <div className="bmi-segment green active"></div>
                                <div className="bmi-segment yellow"></div>
                                <div className="bmi-segment red"></div>
                            </div>
                            <span className="bmi-desc">Perfectly on track!</span>
                        </div>

                        {/* AI Coach Card */}
                        <div className="hp-stat-card ai-coach-card">
                            <span className="stat-label">AI COACH TIP</span>
                            <div className="ai-tip-content">
                                <div className="ai-icon-wrapper">
                                    <Brain size={20} className="text-green" />
                                </div>
                                <p className="ai-tip-text">
                                    Try increasing protein by 15g tonight to hit your muscle recovery targets.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Weekly Meal Planner Section */}
                    <div className="hp-planner-header">
                        <h2><TrendingUp size={20} className="text-green icon-spaced" /> Weekly Meal Planner</h2>
                        <div className="week-toggle">
                            <button className="toggle-btn active">This Week</button>
                            <button className="toggle-btn">Next Week</button>
                        </div>
                    </div>

                    {/* Day Selector Boxes */}
                    <div className="hp-day-selector">
                        {mockDays.map((d) => (
                            <button
                                key={d.day}
                                className={`day-box ${activeDay === d.day ? 'active' : ''}`}
                                onClick={() => setActiveDay(d.day)}
                            >
                                <span className="day-name">{d.day}</span>
                                <span className="day-number">{d.date}</span>
                            </button>
                        ))}
                    </div>

                    {/* Meal Cards */}
                    <div className="hp-meal-grid">
                        {mockMeals.map(meal => (
                            <div key={meal.id} className="hp-meal-card">
                                <div className="meal-card-image">
                                    <img src={meal.image} alt={meal.title} />
                                    <div className="meal-type-pill text-green-bold">{meal.type}</div>
                                </div>
                                <div className="meal-card-body">
                                    <h3 className="meal-title">{meal.title}</h3>
                                    <p className="meal-cals-time">{meal.calories} • {meal.time}</p>

                                    <div className="meal-macros-grid">
                                        <div className="macro-col">
                                            <span className="macro-label">PROT</span>
                                            <span className="macro-value">{meal.macros.p}</span>
                                        </div>
                                        <div className="macro-col">
                                            <span className="macro-label">CARB</span>
                                            <span className="macro-value">{meal.macros.c}</span>
                                        </div>
                                        <div className="macro-col">
                                            <span className="macro-label">FAT</span>
                                            <span className="macro-value">{meal.macros.f}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sidebar (Right) */}
                <aside className="hp-sidebar">

                    {/* Daily Progress Card */}
                    <div className="hp-side-card daily-progress-card">
                        <h3 className="side-card-title">Daily Progress</h3>

                        <div className="ring-chart-container">
                            <div className="custom-ring">
                                <svg width="180" height="180" viewBox="0 0 180 180">
                                    <circle cx="90" cy="90" r="80" fill="none" stroke="#f3f4f6" strokeWidth="16" />
                                    <circle cx="90" cy="90" r="80" fill="none" stroke="#00e676" strokeWidth="16"
                                        strokeDasharray="502" strokeDashoffset="260" strokeLinecap="round"
                                        transform="rotate(-90 90 90)" />
                                </svg>
                                <div className="ring-center-text">
                                    <span className="kcal-num">1,650</span>
                                    <span className="kcal-sub">KCAL LEFT</span>
                                </div>
                            </div>
                        </div>

                        <div className="progress-stats-row">
                            <div className="p-stat-col">
                                <span className="p-stat-label">Goal</span>
                                <span className="p-stat-val text-dark">2,800 kcal</span>
                            </div>
                            <div className="p-stat-col text-right">
                                <span className="p-stat-label">Consumed</span>
                                <span className="p-stat-val text-green">1,150 kcal</span>
                            </div>
                        </div>

                        <hr className="side-divider" />

                        {/* Water Intake */}
                        <div className="water-intake-section">
                            <div className="water-header">
                                <span className="water-title">Water Intake</span>
                                <span className="water-val text-green">1.2 / 2.5L</span>
                            </div>
                            <div className="water-drops">
                                <div className="drop filled"><Droplet size={20} fill="currentColor" /></div>
                                <div className="drop filled"><Droplet size={20} fill="currentColor" /></div>
                                <div className="drop semi"><Droplet size={20} fill="currentColor" /></div>
                                <div className="drop empty"><Droplet size={20} fill="currentColor" /></div>
                                <div className="drop empty"><Droplet size={20} fill="currentColor" /></div>
                            </div>
                            <button className="btn-add-water">Add 250ml</button>
                        </div>
                    </div>

                    {/* Weekly Streak Card */}
                    <div className="hp-streak-card">
                        <h3 className="streak-title">Weekly Streak</h3>
                        <p className="streak-desc">You've hit your goals 5 days in a row!</p>
                        <div className="streak-badge-row">
                            <div className="streak-icon">
                                <TrendingUp size={24} color="#00e676" />
                            </div>
                            <div className="streak-text">
                                <div className="streak-days">5 Days</div>
                                <div className="streak-sub">AWESOME JOB!</div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="hp-quick-links">
                        <button className="quick-link-btn">
                            <span className="ql-left"><History size={20} className="text-green" /> Meal History</span>
                            <ChevronRight size={18} className="text-gray" />
                        </button>
                        <button className="quick-link-btn">
                            <span className="ql-left"><Award size={20} className="text-green" /> Health Rewards</span>
                            <ChevronRight size={18} className="text-gray" />
                        </button>
                    </div>

                </aside>
            </div>
        </div>
    );
};

export default HealthyPlanDashboard;
