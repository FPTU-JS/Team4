import React, { useState, useEffect } from 'react';
import { Search, Bell, Settings, Target, ShoppingBag, Droplet, Wand2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import api from '../utils/axiosConfig';
import toast from 'react-hot-toast';
import '../css/healthy-plan-dashboard.css';

const HealthyPlanDashboard = () => {
    const { user, isAuthenticated } = useAuth();
    const [nutrition, setNutrition] = useState({
        targetCals: 2400, leftCals: 2400,
        currentProtein: 0, targetProtein: 180,
        currentCarbs: 0, targetCarbs: 250,
        currentFats: 0, targetFats: 80
    });
    const [activeTab, setActiveTab] = useState('Monday');
    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isAuthenticated || !user?.id) return;
        
        const fetchMacros = async () => {
            try {
                const res = await api.get(`/api/plan/macros?userId=${user.id}`);
                setNutrition(res.data);
            } catch (err) {
                console.error("Failed to fetch macros", err);
            }
        };
        fetchMacros();
    }, [isAuthenticated, user]);

    useEffect(() => {
        if (!isAuthenticated || !user?.id) return;

        const fetchMeals = async () => {
            setLoading(true);
            try {
                const res = await api.get(`/api/plan/meals?userId=${user.id}&dayOfWeek=${activeTab}`);
                setMeals(res.data);
            } catch (err) {
                console.error("Failed to fetch meals", err);
            } finally {
                setLoading(false);
            }
        };
        fetchMeals();
    }, [activeTab, isAuthenticated, user]);

    const targetCals = nutrition.targetCals || 2400;
    const consumed = targetCals - (nutrition.leftCals || targetCals);
    const calPercent = Math.round((consumed / targetCals) * 100);

    const tabs = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    const renderMealCard = (mealType, emoji) => {
        const meal = meals.find(m => m.mealType === mealType);
        if (!meal) {
            return (
                <div className="hp-meal-col">
                    <div className="meal-col-header">
                        <span className="meal-col-icon">{emoji}</span> {mealType.toUpperCase()}
                    </div>
                    <div className="new-meal-card" style={{opacity: 0.5}}>
                        <p style={{padding: '20px', textAlign: 'center'}}>Chưa lên thực đơn</p>
                    </div>
                </div>
            );
        }
        return (
            <div className="hp-meal-col">
                <div className="meal-col-header">
                    <span className="meal-col-icon">{emoji}</span> {mealType.toUpperCase()}
                </div>
                <div className="new-meal-card">
                    <img src={meal.imageUrl} alt={meal.title} className="new-meal-img" />
                    <h3 className="new-meal-title">{meal.title}</h3>
                    <p className="new-meal-desc">{meal.description}</p>
                    <div className="new-meal-footer">
                        <span className="nm-cals">{meal.cals} kcal</span>
                        <div className="nm-macros">
                            <span className="nm-macro-tag tag-p">P: {meal.protein}g</span>
                            <span className="nm-macro-tag tag-c">C: {meal.carbs}g</span>
                            <span className="nm-macro-tag tag-f">F: {meal.fats}g</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="hp-new-layout">
            <main className="hp-new-main">
                <div className="hp-new-header-row">
                    <div>
                        <h1>Healthy Plan</h1>
                        <div className="CURRENT-GOAL">
                            <Target size={16} color="#10b981" /> CURRENT GOAL: MUSCLE GAIN
                        </div>
                    </div>

                    <div className="weekly-progress-wrap">
                        <div className="wp-labels">
                            <span className="wp-title">Weekly Progress</span>
                            <span className="wp-pct">65%</span>
                        </div>
                        <div className="wp-bar-bg">
                            <div className="wp-bar-fill"></div>
                        </div>
                        <div className="wp-sub">4 of 7 days completed</div>
                    </div>
                </div>

                <div className="hp-new-content-grid">
                    <div className="hp-new-left">
                        
                        <div className="hp-tabs-row">
                            {tabs.map(t => (
                                <button key={t} className={`hp-tab ${activeTab === t ? 'active' : ''}`} onClick={() => setActiveTab(t)}>
                                    {t}
                                </button>
                            ))}
                        </div>

                        <div className="hp-meals-row" style={{ opacity: loading ? 0.5 : 1, transition: 'opacity 0.2s' }}>
                            {renderMealCard('Breakfast', '☀️')}
                            {renderMealCard('Lunch', '🍲')}
                            {renderMealCard('Dinner', '🌙')}
                        </div>

                    </div>

                    <div className="hp-new-right">
                        
                        {/* Daily Goal Card */}
                        <div className="white-card">
                            <h2 className="card-title-lg">Daily Nutrition Goal</h2>
                            
                            <div className="custom-nutrition-circle" style={{ background: `conic-gradient(#10b981 ${calPercent}%, #e5e7eb 0)` }}>
                                <div className="cnc-inner">
                                    <div className="cnc-val">{nutrition.leftCals.toLocaleString()}</div>
                                    <div className="cnc-lbl">LEFT OF {nutrition.targetCals.toLocaleString()}</div>
                                </div>
                            </div>

                            <div className="macro-prog-row">
                                <div className="mpr-labels">
                                    <span>Protein</span><span>{nutrition.currentProtein}/{nutrition.targetProtein}g</span>
                                </div>
                                <div className="mpr-bg"><div className="mpr-fill fill-p" style={{ width: `${Math.min(100, (nutrition.currentProtein/nutrition.targetProtein)*100)}%` }}></div></div>
                            </div>
                            
                            <div className="macro-prog-row">
                                <div className="mpr-labels">
                                    <span>Carbs</span><span>{nutrition.currentCarbs}/{nutrition.targetCarbs}g</span>
                                </div>
                                <div className="mpr-bg"><div className="mpr-fill fill-c" style={{ width: `${Math.min(100, (nutrition.currentCarbs/nutrition.targetCarbs)*100)}%` }}></div></div>
                            </div>

                            <div className="macro-prog-row">
                                <div className="mpr-labels">
                                    <span>Fats</span><span>{nutrition.currentFats}/{nutrition.targetFats}g</span>
                                </div>
                                <div className="mpr-bg"><div className="mpr-fill fill-f" style={{ width: `${Math.min(100, (nutrition.currentFats/nutrition.targetFats)*100)}%` }}></div></div>
                            </div>
                        </div>

                        {/* Smart Shopping Card */}
                        <div className="green-card">
                            <h2 className="card-title-lg">
                                <ShoppingBag size={20} color="#10b981" /> Smart Shopping
                            </h2>
                            <p className="sc-desc">Automatically generate a consolidated shopping list for the entire week based on your plan.</p>
                            <button className="btn-generate" onClick={() => toast.success('Đã tạo danh sách đi chợ thành công! Danh sách sẽ hiển thị ở tính năng kế tiếp.')}>
                                <Wand2 size={18} /> Generate List
                            </button>
                        </div>

                        {/* Hydration */}
                        <div className="white-card">
                            <div className="hyd-header">
                                <div className="hyd-title"><Droplet size={18} color="#3b82f6" fill="#3b82f6"/> Hydration</div>
                                <div className="hyd-val">1.5 / 2.5L</div>
                            </div>
                            <div className="hyd-drops">
                                <div className="h-drop filled"></div>
                                <div className="h-drop filled"></div>
                                <div className="h-drop filled"></div>
                                <div className="h-drop empty"></div>
                                <div className="h-drop empty"></div>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
};

export default HealthyPlanDashboard;
