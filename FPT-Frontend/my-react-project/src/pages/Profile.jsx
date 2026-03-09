import React, { useState } from 'react';
import '../css/profile.css';
import { Settings, Bookmark, Heart, LogOut, Edit2, Flame, Award, ChevronRight, Sparkles, Star } from 'lucide-react';

const Profile = () => {
    const [activeTab, setActiveTab] = useState('saved');

    const savedRecipes = [
        { id: 1, title: 'Avocado Toast with Egg', time: '10 min', cal: '350 kcal', image: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&q=80&w=400' },
        { id: 2, title: 'Grilled Salmon Bowl', time: '25 min', cal: '450 kcal', image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=400' },
        { id: 3, title: 'Berry Smoothie', time: '5 min', cal: '200 kcal', image: 'https://images.unsplash.com/photo-1553530666-ba11a7ddc169?auto=format&fit=crop&q=80&w=400' },
    ];

    return (
        <div className="profile-container">
            <div className="profile-header">
                <div className="profile-cover"></div>
                <div className="profile-info-section container">
                    <div className="profile-avatar-wrapper">
                        <div className="profile-avatar">
                            <span className="avatar-initial">MC</span>
                            <button className="edit-avatar-btn">
                                <Edit2 size={16} />
                            </button>
                        </div>
                    </div>

                    <div className="profile-details-wrapper">
                        <div className="profile-text">
                            <h2>My Chef</h2>
                            <p>@mychefcooks</p>
                            <p className="profile-bio">Passionate about healthy, quick, and delicious meals. Always experimenting in the kitchen! 🍳✨</p>
                        </div>

                        <div className="profile-actions">
                            <button className="settings-btn">
                                <Settings size={20} /> Settings
                            </button>
                            <button className="logout-btn">
                                <LogOut size={20} /> Log Out
                            </button>
                        </div>
                    </div>

                    <div className="profile-stats">
                        <div className="stat-item">
                            <h3>142</h3>
                            <p>Recipes</p>
                        </div>
                        <div className="stat-item">
                            <h3>8.5k</h3>
                            <p>Followers</p>
                        </div>
                        <div className="stat-item">
                            <h3>120</h3>
                            <p>Following</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="profile-content container">
                <div className="profile-sidebar">
                    <div className="achievement-card">
                        <h3>Your Progress</h3>
                        <div className="achievement-item">
                            <div className="icon-wrapper streak">
                                <Flame size={24} color="#f59e0b" fill="#f59e0b" />
                            </div>
                            <div>
                                <h4>12 Day Streak</h4>
                                <p>Keep cooking!</p>
                            </div>
                        </div>
                        <div className="achievement-item">
                            <div className="icon-wrapper badge">
                                <Award size={24} color="#10b981" />
                            </div>
                            <div>
                                <h4>Healthy Eater</h4>
                                <p>Achieved level 4</p>
                            </div>
                        </div>
                    </div>

                    <div className="settings-menu">
                        <h3>Account Settings</h3>
                        <ul>
                            <li>Personal Information <ChevronRight size={16} /></li>
                            <li>Dietary Preferences <ChevronRight size={16} /></li>
                            <li>Notifications <ChevronRight size={16} /></li>
                            <li>Privacy & Security <ChevronRight size={16} /></li>
                        </ul>
                    </div>
                </div>

                <div className="profile-main">
                    <div className="profile-tabs">
                        <button
                            className={`tab-btn ${activeTab === 'saved' ? 'active' : ''}`}
                            onClick={() => setActiveTab('saved')}
                        >
                            <Bookmark size={20} /> Saved Recipes
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'liked' ? 'active' : ''}`}
                            onClick={() => setActiveTab('liked')}
                        >
                            <Heart size={20} /> Liked Posts
                        </button>
                    </div>

                    <div className="tab-content">
                        {activeTab === 'saved' && (
                            <div className="recipe-grid">
                                {savedRecipes.map(recipe => (
                                    <div key={recipe.id} className="recipe-card">
                                        <div className="recipe-img-wrapper">
                                            <img src={recipe.image} alt={recipe.title} />
                                            <button className="bookmark-btn active">
                                                <Bookmark size={18} fill="currentColor" />
                                            </button>
                                        </div>
                                        <div className="recipe-info">
                                            <h4>{recipe.title}</h4>
                                            <div className="recipe-meta">
                                                <span>{recipe.time}</span>
                                                <span className="dot">•</span>
                                                <span>{recipe.cal}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === 'liked' && (
                            <div className="empty-state">
                                <Heart size={48} color="#d1d5db" />
                                <h3>No liked posts yet</h3>
                                <p>When you like posts from the community, they will appear here.</p>
                            </div>
                        )}
                    </div>

                    {/* Right Column (Sidebar) */}
                    <div className="profile-right-col">

                        {/* Personal Bests */}
                        <div className="sidebar-card">
                            <h3>Personal Bests</h3>
                            <div className="skill-item">
                                <div className="skill-label">
                                    <span>Knife Skills</span>
                                    <span className="skill-value green-text">Master</span>
                                </div>
                                <div className="progress-bar-bg"><div className="progress-fill" style={{ width: '95%' }}></div></div>
                            </div>
                            <div className="skill-item">
                                <div className="skill-label">
                                    <span>Pastry Art</span>
                                    <span className="skill-value green-text">Lvl 35</span>
                                </div>
                                <div className="progress-bar-bg"><div className="progress-fill" style={{ width: '65%' }}></div></div>
                            </div>
                            <div className="skill-item">
                                <div className="skill-label">
                                    <span>Spice Pairing</span>
                                    <span className="skill-value green-text">Expert</span>
                                </div>
                                <div className="progress-bar-bg"><div className="progress-fill" style={{ width: '85%' }}></div></div>
                            </div>
                        </div>

                        {/* AI Sous Chef */}
                        <div className="ai-chef-card">
                            <div className="ai-card-header">
                                <div className="ai-icon-wrap"><Sparkles size={18} color="#fff" /></div>
                                <h3>AI Sous Chef</h3>
                            </div>
                            <p>
                                "Based on your nut allergy and low-carb preference, I recommend trying the Zucchini Noodle Carbonara today!"
                            </p>
                            <button className="btn-ask-ai">Ask Assistant</button>
                        </div>

                        {/* Recent Achievements */}
                        <div className="sidebar-card">
                            <h3>Recent Achievements</h3>

                            <div className="achievement-row">
                                <div className="achieve-icon orange-bg">
                                    <Flame size={20} color="#f97316" />
                                </div>
                                <div className="achieve-text">
                                    <h4>15 Day Streak</h4>
                                    <p>Consistent cooking master</p>
                                </div>
                            </div>

                            <div className="achievement-row">
                                <div className="achieve-icon blue-bg">
                                    <Star size={20} color="#3b82f6" />
                                </div>
                                <div className="achieve-text">
                                    <h4>Community Star</h4>
                                    <p>Top post last week</p>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>

            </div>

            <div style={{ height: '80px' }}></div> {/* Bottom spacer for menu */}
        </div>
    );
};

export default Profile;
