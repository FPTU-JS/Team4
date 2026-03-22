import React from 'react';
import { Search, Bell, Settings, Target, Droplet, BarChart2, Filter, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../css/healthy-plan-setup.css';

const HealthyPlanSetup = () => {
    return (
        <div className="hp-new-layout">
            <main className="hp-setup-main">
                <div className="hp-setup-header">
                    <h1>Healthy Plan Setup</h1>
                    <p>Define your body metrics and primary health goals to personalize your AI-driven nutrition strategy.</p>
                </div>

                <div className="hp-setup-grid">
                    {/* Left Column */}
                    <div className="hp-setup-left">
                        
                        <div className="setup-white-card">
                            <h2 className="setup-card-title">
                                <BarChart2 size={20} color="#10b981" /> Body Metrics
                            </h2>

                            <div className="setup-form-group">
                                <label>Weight (kg)</label>
                                <input type="number" placeholder="e.g. 75" />
                            </div>

                            <div className="setup-form-group">
                                <label>Height (cm)</label>
                                <input type="number" placeholder="e.g. 180" />
                            </div>

                            <div className="setup-form-group">
                                <label>Activity Level</label>
                                <select defaultValue="Moderately Active (3-5 days/week)">
                                    <option>Sedentary</option>
                                    <option>Lightly Active (1-2 days/week)</option>
                                    <option>Moderately Active (3-5 days/week)</option>
                                    <option>Very Active (6-7 days/week)</option>
                                </select>
                            </div>

                            <div className="setup-form-group mb-0">
                                <label>Primary Goal</label>
                                <select defaultValue="Muscle Gain">
                                    <option>Weight Loss</option>
                                    <option>Maintenance</option>
                                    <option>Muscle Gain</option>
                                </select>
                            </div>
                        </div>

                        <div className="setup-white-card">
                            <h2 className="setup-card-title">
                                <Filter size={20} color="#10b981" /> Dietary Preference
                            </h2>
                            <div className="dietary-tags-container">
                                <button className="diet-tag active">LOW CARB</button>
                                <button className="diet-tag">KETO</button>
                                <button className="diet-tag">VEGAN</button>
                                <button className="diet-tag">PALEO</button>
                                <button className="diet-tag active">INTERMITTENT FASTING</button>
                            </div>
                        </div>

                    </div>

                    {/* Right Column */}
                    <div className="hp-setup-right">
                        
                        {/* Projection Chart */}
                        <div className="setup-white-card no-pb">
                            <div className="projection-chart-header">
                                <div>
                                    <h2 className="setup-card-title-lg">Body Transformation Projection</h2>
                                    <p className="setup-card-desc">Estimated progress based on your metrics and Muscle Gain goal.</p>
                                </div>
                                <div className="setup-legend">
                                    <span className="lg-item"><span className="lg-dot green"></span> Fat %</span>
                                    <span className="lg-item"><span className="lg-dot grey"></span> Lean Mass</span>
                                </div>
                            </div>
                            
                            <div className="abstract-chart-container">
                                <div className="ac-col">
                                    <div className="ac-bar">
                                        <div className="ac-lean h-50"></div>
                                        <div className="ac-fat h-25"></div>
                                    </div>
                                    <div className="ac-label">Week 1</div>
                                </div>
                                <div className="ac-col">
                                    <div className="ac-bar">
                                        <div className="ac-lean h-45"></div>
                                        <div className="ac-fat h-20"></div>
                                    </div>
                                    <div className="ac-label">Week 2</div>
                                </div>
                                <div className="ac-col">
                                    <div className="ac-bar">
                                        <div className="ac-lean h-60"></div>
                                        <div className="ac-fat h-18"></div>
                                    </div>
                                    <div className="ac-label">Week 3</div>
                                </div>
                                <div className="ac-col">
                                    <div className="ac-bar">
                                        <div className="ac-lean h-62"></div>
                                        <div className="ac-fat h-15"></div>
                                    </div>
                                    <div className="ac-label">Week 4</div>
                                </div>
                                <div className="ac-col">
                                    <div className="ac-bar">
                                        <div className="ac-lean h-63"></div>
                                        <div className="ac-fat h-12"></div>
                                    </div>
                                    <div className="ac-label">Week 5</div>
                                </div>
                                <div className="ac-col">
                                    <div className="ac-bar">
                                        <div className="ac-lean h-65"></div>
                                        <div className="ac-fat h-10"></div>
                                    </div>
                                    <div className="ac-label">Week 6</div>
                                </div>
                            </div>
                        </div>

                        {/* Analysis & Target */}
                        <div className="analysis-target-row">
                            <div className="setup-green-card flex-2">
                                <h3 className="sgc-title text-black">
                                    <img src="https://cdn-icons-png.flaticon.com/512/4712/4712035.png" style={{width: 18, marginRight: 8}} alt=""/> 
                                    AI Nutritional Analysis
                                </h3>
                                <p className="sgc-text">
                                    Based on your <span className="text-green-bold">Moderately Active</span> lifestyle and <span className="text-green-bold">Muscle Gain</span> goal, we recommend a daily surplus of 300 calories. Your target is set to 2,850 kcal/day.
                                </p>
                                <p className="sgc-subtext">
                                    This recommendation prioritizes a 40/30/30 protein-to-carb-to-fat ratio to support muscle protein synthesis while maintaining metabolic health.
                                </p>
                            </div>

                            <div className="setup-white-card target-kcal-card flex-1">
                                <div className="huge-green-val">2,850</div>
                                <div className="target-lbl">DAILY TARGET KCAL</div>
                                <div className="three-dots">
                                    <span className="dot active"></span>
                                    <span className="dot active"></span>
                                    <span className="dot"></span>
                                </div>
                            </div>
                        </div>

                        {/* Image Cards Row */}
                        <div className="setup-img-row">
                            <div className="s-img-card">
                                <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80" alt="Fresh Veggies"/>
                                <div className="s-img-overlay">FRESH VEGGIES</div>
                            </div>
                            <div className="s-img-card">
                                <img src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80" alt="Superfoods"/>
                                <div className="s-img-overlay">SUPERFOODS</div>
                            </div>
                            <div className="s-img-card">
                                <img src="https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&q=80" alt="Lean Protein"/>
                                <div className="s-img-overlay">LEAN PROTEIN</div>
                            </div>
                            <div className="s-img-card">
                                <img src="https://images.unsplash.com/photo-1621510456681-2330135e5871?w=400&q=80" alt="Detox Juices"/>
                                <div className="s-img-overlay">DETOX JUICES</div>
                            </div>
                        </div>

                        {/* Action Button */}
                        <div className="setup-action-wrapper">
                            <button className="btn-update-plan">
                                Update My Plan <ArrowRight size={20} />
                            </button>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
};

export default HealthyPlanSetup;
