import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/profile.css';
import {
    User, Utensils, Bookmark, MessageSquare, Dumbbell,
    Flame, ArrowRight, Eye, Heart, Plus, Trophy, Award
} from 'lucide-react';
import { useAuth } from './AuthContext';

const Profile = () => {

    const {isAuthenticated } = useAuth();
    const [activeTab, setActiveTab] = useState('recipes');
    const navigate = useNavigate();
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login', { replace: true });
        }
    }, [isAuthenticated, navigate])
    const myRecipes = [
        {
            id: 1,
            title: 'Mediterranean Buddha Bowl',
            desc: 'Fresh garden vegetables mixed with roasted chickpeas and tahini dressing.',
            time: '20m',
            likes: '1.2k',
            views: '4.5k',
            image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=400'
        },
        {
            id: 2,
            title: 'Roasted Quinoa Salad',
            desc: 'Zesty quinoa with bell peppers, olives, and extra virgin olive oil infusion.',
            time: '15m',
            likes: '842',
            views: '2.1k',
            image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400'
        },
    ];
    if (!isAuthenticated) return null;
    return (
        <div className="profile-page-wrapper">
            <div className="profile-page-container">

                {/* --- Left Sidebar --- */}
                <aside className="profile-sidebar-left">

                    {/* Main Nav */}
                    <div className="sidebar-nav-menu">
                        <div className="nav-menu-item active">
                            <User size={20} /> Profile Overview
                        </div>
                        <div className="nav-menu-item">
                            <Utensils size={20} /> My Recipes
                        </div>
                        <div className="nav-menu-item">
                            <Bookmark size={20} /> Collections
                        </div>
                        <div className="nav-menu-item">
                            <MessageSquare size={20} /> Community Activity
                        </div>
                    </div>

                    {/* Dietary Profile */}
                    <div className="sidebar-card">
                        <h3 className="sidebar-card-title">DIETARY PROFILE</h3>
                        <div className="dietary-pills">
                            <span className="diet-pill">Low Carb</span>
                            <span className="diet-pill red">Nut Allergy</span>
                            <span className="diet-pill">Organic Only</span>
                        </div>
                    </div>

                    {/* Health Goal */}
                    <div className="sidebar-card">
                        <h3 className="sidebar-card-title">HEALTH GOAL</h3>
                        <div className="health-goal-content">
                            <div className="goal-icon-wrap">
                                <Dumbbell size={20} />
                            </div>
                            <div className="goal-info">
                                <h4>Muscle Gain</h4>
                                <p>Target: 2,800 kcal/day</p>
                            </div>
                        </div>
                    </div>

                </aside>

                {/* --- Main Content --- */}
                <main className="profile-main-content">

                    {/* Top Banner Card */}
                    <div className="profile-banner-card">
                        <div className="banner-header-bg"></div>
                        <div className="banner-body">
                            <div className="profile-avatar-container">
                                <img
                                    src="https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=400"
                                    alt="Julian Rossi"
                                    className="profile-avatar-img"
                                />
                            </div>

                            <div className="banner-top-actions">
                                <button className="btn-green-solid">Edit Profile</button>
                                <button className="btn-white-outline">Share</button>
                            </div>

                            <div className="banner-info">
                                <div className="profile-name-row">
                                    <h1>Julian Rossi</h1>
                                    <span className="badge-gold">
                                        <Award size={14} fill="currentColor" /> MASTER CHEF
                                    </span>
                                </div>
                                <p className="profile-bio-text">
                                    Mediterranean specialist & Pastry enthusiast. 15 years of culinary journey from Rome to London.
                                </p>

                                <hr className="profile-stats-divider" />

                                <div className="profile-stats-container">
                                    <div className="stat-block">
                                        <span className="stat-num">42</span>
                                        <span className="stat-lbl">RECIPES</span>
                                    </div>
                                    <div className="stat-block">
                                        <span className="stat-num">128</span>
                                        <span className="stat-lbl">POSTS</span>
                                    </div>
                                    <div className="stat-block">
                                        <span className="stat-num">2.4k</span>
                                        <span className="stat-lbl">FOLLOWERS</span>
                                    </div>

                                    <div className="streak-pill">
                                        <Flame size={20} fill="#10b981" color="#10b981" />
                                        <div className="streak-pill-text">
                                            <span className="streak-num">150</span>
                                            <span className="streak-lbl">DAY STREAK</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Middle Two Columns */}
                    <div className="middle-cards-grid">

                        {/* Culinary Skills */}
                        <div className="sidebar-card">
                            <div className="card-header-row">
                                <h3 className="card-title">Culinary Skills</h3>
                                <span className="pill-light-green">Updated Weekly</span>
                            </div>

                            <div className="skills-list">
                                {/* Skill 1 */}
                                <div className="skill-row">
                                    <div className="skill-row-top">
                                        <span>Knife Skills</span>
                                        <span>92%</span>
                                    </div>
                                    <div className="skill-bar-bg"><div className="skill-bar-fill" style={{ width: '92%' }}></div></div>
                                </div>
                                {/* Skill 2 */}
                                <div className="skill-row">
                                    <div className="skill-row-top">
                                        <span>Flavor Profiling</span>
                                        <span>88%</span>
                                    </div>
                                    <div className="skill-bar-bg"><div className="skill-bar-fill" style={{ width: '88%' }}></div></div>
                                </div>
                                {/* Skill 3 */}
                                <div className="skill-row">
                                    <div className="skill-row-top">
                                        <span>Presentation</span>
                                        <span>75%</span>
                                    </div>
                                    <div className="skill-bar-bg"><div className="skill-bar-fill" style={{ width: '75%' }}></div></div>
                                </div>
                                {/* Skill 4 */}
                                <div className="skill-row">
                                    <div className="skill-row-top">
                                        <span>Culinary Speed</span>
                                        <span>95%</span>
                                    </div>
                                    <div className="skill-bar-bg"><div className="skill-bar-fill" style={{ width: '95%' }}></div></div>
                                </div>
                            </div>

                            {/* Iron Chef box */}
                            <div className="iron-chef-box">
                                <div className="iron-chef-icon">
                                    <Trophy size={18} fill="currentColor" />
                                </div>
                                <div className="iron-chef-text">
                                    <h5>Path to "Iron Chef"</h5>
                                    <p>8 more recipes to unlock next rank</p>
                                </div>
                            </div>
                        </div>

                        {/* Recent Achievements */}
                        <div className="sidebar-card">
                            <div className="card-header-row">
                                <h3 className="card-title">Recent Achievements</h3>
                            </div>

                            <div className="achievements-list">
                                <div className="achievement-row">
                                    <div className="ach-icon green">
                                        <Utensils size={18} />
                                    </div>
                                    <div className="ach-content">
                                        <p className="ach-time">Today, 2:45 PM</p>
                                        <h4 className="ach-desc">Published "Grilled Sea Bass with Lemon Gremolata"</h4>
                                        <img src="https://images.unsplash.com/photo-1544025162-811114215b2e?auto=format&fit=crop&q=80&w=200" alt="achievement" className="ach-img" />
                                    </div>
                                </div>

                                <div className="achievement-row">
                                    <div className="ach-icon">
                                        <Award size={18} color="#9ca3af" />
                                    </div>
                                    <div className="ach-content">
                                        <p className="ach-time">Yesterday</p>
                                        <h4 className="ach-desc">Earned "Flavor Pioneer" badge</h4>
                                    </div>
                                </div>

                                <div className="achievement-row">
                                    <div className="ach-icon">
                                        <Heart size={18} color="#9ca3af" fill="#9ca3af" />
                                    </div>
                                    <div className="ach-content">
                                        <p className="ach-time">2 days ago</p>
                                        <h4 className="ach-desc">Recipe "Classic Tiramisu" reached 500 likes</h4>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Bottom Tabs & Grid */}
                    <div className="profile-tabs">
                        <button
                            className={`p-tab ${activeTab === 'recipes' ? 'active' : ''}`}
                            onClick={() => setActiveTab('recipes')}
                        >
                            My Recipes
                        </button>
                        <button
                            className={`p-tab ${activeTab === 'saved' ? 'active' : ''}`}
                            onClick={() => setActiveTab('saved')}
                        >
                            Saved Collections
                        </button>
                        <button
                            className={`p-tab ${activeTab === 'drafts' ? 'active' : ''}`}
                            onClick={() => setActiveTab('drafts')}
                        >
                            Drafts
                        </button>
                    </div>

                    <div className="recipes-grid">
                        {myRecipes.map((r) => (
                            <div key={r.id} className="recipe-card-new">
                                <div className="recipe-card-image">
                                    <img src={r.image} alt={r.title} />
                                </div>
                                <div className="recipe-card-body">
                                    <div className="recipe-card-header">
                                        <h4 className="recipe-card-title">{r.title}</h4>
                                        <div className="time-pill">
                                            <span>⏱</span> {r.time}
                                        </div>
                                    </div>
                                    <p className="recipe-card-desc">{r.desc}</p>

                                    <div className="recipe-card-footer">
                                        <div className="recipe-metrics">
                                            <div className="metric">
                                                <Heart size={14} fill="currentColor" /> {r.likes}
                                            </div>
                                            <div className="metric">
                                                <Eye size={14} /> {r.views}
                                            </div>
                                        </div>
                                        <button className="btn-arrow-circle">
                                            <ArrowRight size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Share a Recipe box */}
                        <div className="create-recipe-card">
                            <div className="create-icon-btn">
                                <Plus size={24} />
                            </div>
                            <h4>Share a Recipe</h4>
                            <p>Grow your influence in the CO-CHE community</p>
                        </div>
                    </div>

                </main>
            </div>
        </div>
    );
};

export default Profile;
