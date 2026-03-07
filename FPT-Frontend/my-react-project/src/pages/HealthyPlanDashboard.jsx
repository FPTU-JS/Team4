import React from 'react';
import { Search, Bell, Settings, Target, ChevronDown, CheckCircle, Droplet, ShoppingBag } from 'lucide-react';
import '../css/healthy-plan-dashboard.css';

const mockMeals = [
    {
        id: 'm1',
        type: 'BREAKFAST',
        icon: '☀️',
        title: 'Avocado & Poached Egg',
        desc: 'Sourdough, microgreens, chili flakes',
        calories: '420 kcal',
        macros: { p: '18g', c: '32g', f: '24g' },
        image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&q=80',
        colorClass: 'color-breakfast'
    },
    {
        id: 'm2',
        type: 'LUNCH',
        icon: '🥗',
        title: 'Grilled Salmon Bowl',
        desc: 'Quinoa, kale, roasted sweet potato',
        calories: '580 kcal',
        macros: { p: '42g', c: '45g', f: '18g' },
        image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&q=80',
        colorClass: 'color-lunch'
    },
    {
        id: 'm3',
        type: 'DINNER',
        icon: '🌙',
        title: 'Lean Beef & Asparagus',
        desc: 'Garlic butter, brown rice, herbs',
        calories: '610 kcal',
        macros: { p: '48g', c: '40g', f: '22g' },
        image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&q=80',
        colorClass: 'color-dinner'
    }
];

const mockDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const HealthyPlanDashboard = () => {
    return (
        <div className="hp-dashboard-page fade-in">
            <div className="hp-dashboard-layout">
                {/* Main Content (Left) */}
                <div className="hp-main-content">
                    <div className="hp-header-area">
                        <div>
                            <h1 className="heading-h1">Healthy Plan</h1>
                            <div className="hp-current-goal">
                                <Target size={16} /> <span>CURRENT GOAL: MUSCLE GAIN</span>
                            </div>
                        </div>
                        <div className="weekly-progress">
                            <div className="wp-header">
                                <span>Weekly Progress</span>
                                <span className="wp-percent">65%</span>
                            </div>
                            <div className="wp-bar-track">
                                <div className="wp-bar-fill" style={{ width: '65%' }}></div>
                            </div>
                            <span className="wp-subtext">4 of 7 days completed</span>
                        </div>
                    </div>

                    {/* Day Selector */}
                    <div className="hp-day-selector">
                        {mockDays.map((day, ix) => (
                            <button key={day} className={`day-tab ${ix === 0 ? 'active' : ''}`}>
                                {day}
                            </button>
                        ))}
                    </div>

                    {/* Meal Cards */}
                    <div className="hp-meal-grid">
                        {mockMeals.map(meal => (
                            <div key={meal.id} className="hp-meal-card">
                                <div className="meal-card-header">
                                    <span className="meal-icon">{meal.icon}</span>
                                    <span className="meal-type">{meal.type}</span>
                                </div>
                                <div className="meal-card-image">
                                    <img src={meal.image} alt={meal.title} />
                                </div>
                                <div className="meal-card-body">
                                    <h3 className="meal-title">{meal.title}</h3>
                                    <p className="meal-desc">{meal.desc}</p>

                                    <div className="meal-metrics">
                                        <span className={`meal-cals ${meal.colorClass}`}>{meal.calories}</span>
                                        <div className="meal-macros">
                                            <span className="macro-badge p-badge">P: {meal.macros.p}</span>
                                            <span className="macro-badge c-badge">C: {meal.macros.c}</span>
                                            <span className="macro-badge f-badge">F: {meal.macros.f}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sidebar (Right) */}
                <aside className="hp-sidebar">

                    {/* Ring Chart Card */}
                    <div className="hp-side-card">
                        <h3 className="side-card-title">Daily Nutrition Goal</h3>

                        <div className="ring-chart-container">
                            {/* CSS-based radial progress visualization */}
                            <div className="radial-progress">
                                <div className="circle">
                                    <div className="mask full">
                                        <div className="fill"></div>
                                    </div>
                                    <div className="mask half">
                                        <div className="fill"></div>
                                    </div>
                                    <div className="inside-circle">
                                        <div className="kcal-display">
                                            <span className="kcal-num">1,610</span>
                                            <span className="kcal-sub">LEFT OF 2,400</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="macro-bars">
                            <div className="macro-row">
                                <div className="macro-row-header">
                                    <span className="macro-name">Protein</span>
                                    <span className="macro-val">108/180g</span>
                                </div>
                                <div className="mini-bar-track"><div className="mini-bar-fill protein-fill" style={{ width: '60%' }}></div></div>
                            </div>
                            <div className="macro-row">
                                <div className="macro-row-header">
                                    <span className="macro-name">Carbs</span>
                                    <span className="macro-val">117/250g</span>
                                </div>
                                <div className="mini-bar-track"><div className="mini-bar-fill carb-fill" style={{ width: '46%' }}></div></div>
                            </div>
                            <div className="macro-row">
                                <div className="macro-row-header">
                                    <span className="macro-name">Fats</span>
                                    <span className="macro-val">64/80g</span>
                                </div>
                                <div className="mini-bar-track"><div className="mini-bar-fill fat-fill" style={{ width: '80%' }}></div></div>
                            </div>
                        </div>
                    </div>

                    {/* Smart Shopping Card */}
                    <div className="hp-side-card theme-greenbg">
                        <div className="card-header-flex mb-3">
                            <ShoppingBag className="card-icon" size={20} />
                            <h3 className="side-card-title m-0">Smart Shopping</h3>
                        </div>
                        <p className="shopping-desc">
                            Automatically generate a consolidated shopping list for the entire week based on your plan.
                        </p>
                        <button className="btn-primary full-width flex-center">
                            <CheckCircle size={18} className="mr-2" /> Generate List
                        </button>
                    </div>

                    {/* Hydration Card */}
                    <div className="hp-side-card">
                        <div className="card-header-flex mb-4" style={{ justifyContent: 'space-between' }}>
                            <div className="flex-center-gap">
                                <Droplet className="text-blue" size={20} />
                                <h3 className="side-card-title m-0">Hydration</h3>
                            </div>
                            <span className="hydration-val">1.5 / 2.5L</span>
                        </div>

                        <div className="water-tracker">
                            <div className="water-glass filled"></div>
                            <div className="water-glass filled"></div>
                            <div className="water-glass filled"></div>
                            <div className="water-glass empty"></div>
                            <div className="water-glass empty"></div>
                        </div>
                    </div>

                </aside>
            </div>
        </div>
    );
};

export default HealthyPlanDashboard;
