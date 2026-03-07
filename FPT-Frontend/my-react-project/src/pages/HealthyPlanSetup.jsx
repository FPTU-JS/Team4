import React, { useState } from 'react';
import { Settings, BarChart2, Leaf, ArrowRight, User } from 'lucide-react';
import '../css/healthy-plan-setup.css';

const HealthyPlanSetup = () => {
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [activityLevel, setActivityLevel] = useState('Moderately Active (3-5 days/week)');
    const [primaryGoal, setPrimaryGoal] = useState('Muscle Gain');
    const [preferences, setPreferences] = useState({
        lowCarb: true,
        keto: false,
        vegan: false,
        paleo: false,
        intermittentFasting: true
    });

    const togglePreference = (key) => {
        setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="plan-setup-page fade-in">
            <div className="setup-header">
                <h1 className="heading-h1">Healthy Plan Setup</h1>
                <p className="subtitle">Define your body metrics and primary health goals to personalize your AI-driven nutrition strategy.</p>
            </div>

            <div className="setup-grid">
                {/* Left Column: Forms */}
                <div className="setup-left-panel">
                    {/* Body Metrics */}
                    <div className="setup-card">
                        <div className="card-header-flex">
                            <BarChart2 className="card-icon" size={20} />
                            <h2 className="card-title-m">Body Metrics</h2>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Weight (kg)</label>
                            <input
                                type="number"
                                className="form-input"
                                placeholder="e.g. 75"
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Height (cm)</label>
                            <input
                                type="number"
                                className="form-input"
                                placeholder="e.g. 180"
                                value={height}
                                onChange={(e) => setHeight(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Activity Level</label>
                            <select
                                className="form-select"
                                value={activityLevel}
                                onChange={(e) => setActivityLevel(e.target.value)}
                            >
                                <option>Sedentary (office job)</option>
                                <option>Lightly Active (1-2 days/week)</option>
                                <option>Moderately Active (3-5 days/week)</option>
                                <option>Very Active (6-7 days/week)</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Primary Goal</label>
                            <select
                                className="form-select"
                                value={primaryGoal}
                                onChange={(e) => setPrimaryGoal(e.target.value)}
                            >
                                <option>Weight Loss</option>
                                <option>Maintenance</option>
                                <option>Muscle Gain</option>
                                <option>General Health</option>
                            </select>
                        </div>
                    </div>

                    {/* Dietary Preference */}
                    <div className="setup-card">
                        <div className="card-header-flex">
                            <Leaf className="card-icon" size={20} />
                            <h2 className="card-title-m">Dietary Preference</h2>
                        </div>
                        <div className="tags-container">
                            <button
                                className={`pref-tag ${preferences.lowCarb ? 'active' : ''}`}
                                onClick={() => togglePreference('lowCarb')}
                            >
                                LOW CARB
                            </button>
                            <button
                                className={`pref-tag ${preferences.keto ? 'active' : ''}`}
                                onClick={() => togglePreference('keto')}
                            >
                                KETO
                            </button>
                            <button
                                className={`pref-tag ${preferences.vegan ? 'active' : ''}`}
                                onClick={() => togglePreference('vegan')}
                            >
                                VEGAN
                            </button>
                            <button
                                className={`pref-tag ${preferences.paleo ? 'active' : ''}`}
                                onClick={() => togglePreference('paleo')}
                            >
                                PALEO
                            </button>
                            <button
                                className={`pref-tag ${preferences.intermittentFasting ? 'active' : ''}`}
                                onClick={() => togglePreference('intermittentFasting')}
                            >
                                INTERMITTENT FASTING
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Column: Analytics & Visualization */}
                <div className="setup-right-panel">

                    {/* Projection Card */}
                    <div className="setup-card">
                        <div className="projection-header">
                            <div>
                                <h2 className="card-title-m">Body Transformation Projection</h2>
                                <p className="card-desc">Estimated progress based on your metrics and {primaryGoal} goal.</p>
                            </div>
                            <div className="chart-legend">
                                <span className="legend-item"><span className="dot dot-fat"></span> Fat %</span>
                                <span className="legend-item"><span className="dot dot-lean"></span> Lean Mass</span>
                            </div>
                        </div>

                        {/* Dummy Bar Chart */}
                        <div className="chart-container">
                            <div className="bar-wrapper">
                                <div className="bar-lean" style={{ height: '60%' }}></div>
                                <div className="bar-fat" style={{ height: '30%' }}></div>
                                <span className="bar-label">Week 1</span>
                            </div>
                            <div className="bar-wrapper">
                                <div className="bar-lean" style={{ height: '45%' }}></div>
                                <div className="bar-fat" style={{ height: '25%' }}></div>
                                <span className="bar-label">Week 2</span>
                            </div>
                            <div className="bar-wrapper">
                                <div className="bar-lean" style={{ height: '65%' }}></div>
                                <div className="bar-fat" style={{ height: '22%' }}></div>
                                <span className="bar-label">Week 3</span>
                            </div>
                            <div className="bar-wrapper">
                                <div className="bar-lean" style={{ height: '68%' }}></div>
                                <div className="bar-fat" style={{ height: '20%' }}></div>
                                <span className="bar-label">Week 4</span>
                            </div>
                            <div className="bar-wrapper">
                                <div className="bar-lean" style={{ height: '70%' }}></div>
                                <div className="bar-fat" style={{ height: '18%' }}></div>
                                <span className="bar-label">Week 5</span>
                            </div>
                            <div className="bar-wrapper">
                                <div className="bar-lean" style={{ height: '72%' }}></div>
                                <div className="bar-fat" style={{ height: '15%' }}></div>
                                <span className="bar-label">Week 6</span>
                            </div>
                        </div>
                    </div>

                    {/* Lower Section Split */}
                    <div className="split-cards">
                        <div className="setup-card theme-green flex-1">
                            <div className="card-header-flex">
                                <Settings className="card-icon" size={20} />
                                <h2 className="card-title-m">AI Nutritional Analysis</h2>
                            </div>
                            <p className="card-desc dark">
                                Based on your <strong>{activityLevel.split(' ')[0]}</strong> lifestyle and <strong>{primaryGoal}</strong> goal, we recommend a daily surplus of 300 calories. Your target is set to 2,850 kcal/day.
                            </p>
                            <p className="card-subtext">
                                This recommendation prioritizes a 40/30/30 protein-to-carb-to-fat ratio to support muscle protein synthesis while maintaining metabolic health.
                            </p>
                        </div>

                        <div className="setup-card flex-1 center-content">
                            <h2 className="huge-number text-green">2,850</h2>
                            <span className="tiny-label">DAILY TARGET KCAL</span>
                            <div className="loading-dots">
                                <span className="dot bg-green"></span>
                                <span className="dot bg-green-light"></span>
                                <span className="dot bg-gray"></span>
                            </div>
                        </div>
                    </div>

                    {/* Suggested Meals Carousel (Static mockup) */}
                    <div className="suggested-meals">
                        <div className="meal-img-card">
                            <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80" alt="Fresh Veggies" />
                            <span className="meal-label">FRESH VEGGIES</span>
                        </div>
                        <div className="meal-img-card">
                            <img src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80" alt="Superfoods" />
                            <span className="meal-label">SUPERFOODS</span>
                        </div>
                        <div className="meal-img-card">
                            <img src="https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&q=80" alt="Lean Protein" />
                            <span className="meal-label">LEAN PROTEIN</span>
                        </div>
                        <div className="meal-img-card">
                            <img src="https://images.unsplash.com/photo-1621510456681-2330135e5871?w=400&q=80" alt="Detox Juices" />
                            <span className="meal-label">DETOX JUICES</span>
                        </div>
                    </div>

                    <div className="setup-action">
                        <button className="btn-primary large full-width flex-center">
                            Update My Plan <ArrowRight size={20} className="ml-2" />
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default HealthyPlanSetup;
