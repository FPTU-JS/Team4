import React, { useState } from 'react';
import '../css/profile.css';
import {
    Edit2, Share2,
    Utensils, MessageSquare, Flame,
    ChevronRight, Sparkles, Award, Star,
    Ban, Circle
} from 'lucide-react';

const Profile = () => {
    const [activeTab, setActiveTab] = useState('activity');

    return (
        <div className="profile-page-wrapper">
            <div className="profile-page-container container">

                {/* Header Section */}
                <div className="profile-header-card">
                    <div className="avatar-section">
                        <div className="avatar-ring">
                            <img src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&q=80" alt="Chef Julian Rossi" />
                            <span className="pro-badge">PRO</span>
                        </div>
                    </div>

                    <div className="info-section">
                        <div className="info-title">
                            <h1>Chef Julian Rossi</h1>
                            <span className="level-badge"><Award size={14} /> Level 42</span>
                        </div>
                        <p className="bio-text">
                            Culinary explorer specializing in Mediterranean fusion. Passionate about plant-based innovations and healthy gut cooking. Member since April 2022.
                        </p>

                        <div className="action-buttons">
                            <button className="btn-edit-profile">
                                <Edit2 size={16} /> Edit Profile
                            </button>
                            <button className="btn-share">
                                <Share2 size={16} /> Share
                            </button>
                        </div>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="profile-stats-row">
                    <div className="stat-card">
                        <h3>124</h3>
                        <p><Utensils size={16} color="#10b981" /> Recipes Cooked</p>
                    </div>
                    <div className="stat-card">
                        <h3>86</h3>
                        <p><MessageSquare size={16} color="#10b981" /> Community Posts</p>
                    </div>
                    <div className="stat-card">
                        <h3>15</h3>
                        <p><Flame size={16} color="#f59e0b" /> Active Streak</p>
                    </div>
                </div>

                {/* Main Content Layout */}
                <div className="profile-main-layout">
                    {/* Left Column (Main) */}
                    <div className="profile-left-col">
                        <div className="profile-tabs-header">
                            <button className={`tab-link ${activeTab === 'activity' ? 'active' : ''}`} onClick={() => setActiveTab('activity')}>My Activity</button>
                            <button className={`tab-link ${activeTab === 'saved' ? 'active' : ''}`} onClick={() => setActiveTab('saved')}>Saved Recipes</button>
                            <button className={`tab-link ${activeTab === 'dietary' ? 'active' : ''}`} onClick={() => setActiveTab('dietary')}>Dietary Preferences</button>
                            <button className={`tab-link ${activeTab === 'achievements' ? 'active' : ''}`} onClick={() => setActiveTab('achievements')}>Achievements</button>
                        </div>

                        {activeTab === 'activity' && (
                            <>
                                <div className="section-header">
                                    <h2>Recent Creations</h2>
                                    <a href="#" className="view-all" onClick={(e) => { e.preventDefault(); }}>View All <ChevronRight size={16} /></a>
                                </div>

                                <div className="creations-grid">
                                    <div className="creation-card">
                                        <img src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80" alt="Harvest Avocado Bowl" />
                                        <div className="creation-overlay">
                                            <h4>Harvest Avocado Bowl</h4>
                                            <span>shared 2 days ago</span>
                                        </div>
                                    </div>
                                    <div className="creation-card">
                                        <img src="https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&q=80" alt="Summer Tomato Pasta" />
                                        <div className="creation-overlay">
                                            <h4>Summer Tomato Pasta</h4>
                                            <span>shared 5 days ago</span>
                                        </div>
                                    </div>
                                    <div className="creation-card">
                                        <img src="https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&q=80" alt="Grilled Citrus Salmon" />
                                        <div className="creation-overlay">
                                            <h4>Grilled Citrus Salmon</h4>
                                            <span>shared 1 week ago</span>
                                        </div>
                                    </div>
                                    <div className="creation-card">
                                        <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80" alt="Quinoa Zen Plate" />
                                        <div className="creation-overlay">
                                            <h4>Quinoa Zen Plate</h4>
                                            <span>shared 2 weeks ago</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="section-header">
                                    <h2>Dietary Focus</h2>
                                    <button className="edit-icon-btn"><Edit2 size={16} /></button>
                                </div>

                                <div className="dietary-pills-row">
                                    <span className="pill red-pill"><Ban size={14} /> Nut Allergy</span>
                                    <span className="pill green-pill"><Circle size={14} fill="#10b981" color="#10b981" /> Low Carb</span>
                                    <span className="pill green-pill"><Circle size={14} fill="#10b981" color="#10b981" /> High Protein</span>
                                    <span className="pill green-pill"><Circle size={14} fill="#10b981" color="#10b981" /> Gluten Free</span>
                                </div>
                            </>
                        )}

                        {activeTab === 'saved' && (
                            <div className="p-4 text-gray-500">Your saved recipes will appear here.</div>
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
        </div>
    );
};

export default Profile;
