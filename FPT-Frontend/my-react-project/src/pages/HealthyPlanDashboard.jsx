import React, { useState } from 'react';
import { Search, Bell, Settings, Target, ShoppingBag, Droplet, Wand2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../css/healthy-plan-dashboard.css';

const HealthyPlanDashboard = () => {
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
                            <button className="hp-tab active">Monday</button>
                            <button className="hp-tab">Tuesday</button>
                            <button className="hp-tab">Wednesday</button>
                            <button className="hp-tab">Thursday</button>
                            <button className="hp-tab">Friday</button>
                            <button className="hp-tab">Saturday</button>
                            <button className="hp-tab">Sunday</button>
                        </div>

                        <div className="hp-meals-row">
                            {/* Breakfast */}
                            <div className="hp-meal-col">
                                <div className="meal-col-header">
                                    <span className="meal-col-icon">☀️</span> BREAKFAST
                                </div>
                                <div className="new-meal-card">
                                    <img src="https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&q=80" alt="Avocado" className="new-meal-img" />
                                    <h3 className="new-meal-title">Avocado & Poached Egg</h3>
                                    <p className="new-meal-desc">Sourdough, microgreens, chili flakes</p>
                                    <div className="new-meal-footer">
                                        <span className="nm-cals">420 kcal</span>
                                        <div className="nm-macros">
                                            <span className="nm-macro-tag tag-p">P: 18g</span>
                                            <span className="nm-macro-tag tag-c">C: 32g</span>
                                            <span className="nm-macro-tag tag-f">F: 24g</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Lunch */}
                            <div className="hp-meal-col">
                                <div className="meal-col-header">
                                    <span className="meal-col-icon">🍲</span> LUNCH
                                </div>
                                <div className="new-meal-card">
                                    <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80" alt="Salmon Bowl" className="new-meal-img" />
                                    <h3 className="new-meal-title">Grilled Salmon Bowl</h3>
                                    <p className="new-meal-desc">Quinoa, kale, roasted sweet potato</p>
                                    <div className="new-meal-footer">
                                        <span className="nm-cals">580 kcal</span>
                                        <div className="nm-macros">
                                            <span className="nm-macro-tag tag-p">P: 42g</span>
                                            <span className="nm-macro-tag tag-c">C: 45g</span>
                                            <span className="nm-macro-tag tag-f">F: 18g</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Dinner */}
                            <div className="hp-meal-col">
                                <div className="meal-col-header">
                                    <span className="meal-col-icon">🌙</span> DINNER
                                </div>
                                <div className="new-meal-card">
                                    <img src="https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&q=80" alt="Beef Asparagus" className="new-meal-img" />
                                    <h3 className="new-meal-title">Lean Beef & Asparagus</h3>
                                    <p className="new-meal-desc">Garlic butter, brown rice, herbs</p>
                                    <div className="new-meal-footer">
                                        <span className="nm-cals">610 kcal</span>
                                        <div className="nm-macros">
                                            <span className="nm-macro-tag tag-p">P: 48g</span>
                                            <span className="nm-macro-tag tag-c">C: 40g</span>
                                            <span className="nm-macro-tag tag-f">F: 22g</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="hp-new-right">
                        
                        {/* Daily Goal Card */}
                        <div className="white-card">
                            <h2 className="card-title-lg">Daily Nutrition Goal</h2>
                            
                            <div className="custom-nutrition-circle">
                                <div className="cnc-inner">
                                    <div className="cnc-val">1,610</div>
                                    <div className="cnc-lbl">LEFT OF 2,400</div>
                                </div>
                            </div>

                            <div className="macro-prog-row">
                                <div className="mpr-labels">
                                    <span>Protein</span><span>108/180g</span>
                                </div>
                                <div className="mpr-bg"><div className="mpr-fill fill-p"></div></div>
                            </div>
                            
                            <div className="macro-prog-row">
                                <div className="mpr-labels">
                                    <span>Carbs</span><span>117/250g</span>
                                </div>
                                <div className="mpr-bg"><div className="mpr-fill fill-c"></div></div>
                            </div>

                            <div className="macro-prog-row">
                                <div className="mpr-labels">
                                    <span>Fats</span><span>64/80g</span>
                                </div>
                                <div className="mpr-bg"><div className="mpr-fill fill-f"></div></div>
                            </div>
                        </div>

                        {/* Smart Shopping Card */}
                        <div className="green-card">
                            <h2 className="card-title-lg">
                                <ShoppingBag size={20} color="#10b981" /> Smart Shopping
                            </h2>
                            <p className="sc-desc">Automatically generate a consolidated shopping list for the entire week based on your plan.</p>
                            <button className="btn-generate">
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
