import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../css/profile.css';
import {
    User, Utensils, Bookmark, MessageSquare, Dumbbell,
    Flame, ArrowRight, Eye, Heart, Plus, Trophy, Award, HelpCircle, X, LogOut
} from 'lucide-react';
import { useAuth } from './AuthContext';
import HelpCenter from './HelpCenter';
import api from '../utils/axiosConfig';
import toast from 'react-hot-toast';

const Profile = () => {

    const {isAuthenticated ,user, updateUserProfile, logout } = useAuth();
    const [savedRecipes, setSavedRecipes] = useState([]);
    const [activeMenu, setActiveMenu] = useState('overview');
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editFormData, setEditFormData] = useState({
        username: '',
        bio: '',
        avatar: ''
    });
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const tab = queryParams.get('tab');
        if (tab) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setActiveMenu(tab);
        }
    }, [location.search]);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login', { replace: true });
        }
    }, [isAuthenticated, navigate]);

    const userName = user?.username || 'Chef';
    const userRole = user?.role === 'ROLE_ADMIN' ? 'Master Chef' : 'Premium Chef';
    const avatarName = userName.replace(' ', '+');
    const userEmail = user?.email || 'No email provided';
    const displayAvatar = user?.avatar || `https://ui-avatars.com/api/?name=${avatarName}&background=10b981&color=fff&size=128`;

    useEffect(() => {
        if (user) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setEditFormData(prev => ({
                ...prev,
                username: user.username || 'Chef',
                bio: user.bio || 'Enthusiastic chef ready to explore new flavors and share recipes.',
                avatar: user.avatar || ''
            }));
        }
    }, [user]);

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        toast.success('Profile link copied to clipboard!');
    };
    const [isSubmitting, setIsSubmitting] = useState(false);
    const handleEditSubmit = async (e) => {
        e.preventDefault();

        if (isSubmitting) return;
        setIsSubmitting(true);

        const loadingToast = toast.loading('Updating profile...');
        try {
            // Call API
            const response = await api.put('/api/user/profile', {
                fullName: editFormData.username, // Using username as full name locally
                username: editFormData.username,
                bio: editFormData.bio,
                avatarUrl: editFormData.avatar
            });

            // Update global context
            updateUserProfile(response.data);
            
            toast.success('Profile updated successfully!', { id: loadingToast });
            setIsEditModalOpen(false);

        } catch (error) {
            toast.error(error.response?.data || 'Failed to update profile!', { id: loadingToast });
        } finally {
            setTimeout(() => setIsSubmitting(false), 500);
        }
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setEditFormData({ ...editFormData, avatar: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };
    useEffect(() => {
        const localData = localStorage.getItem('myFavoriteRecipes');
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setSavedRecipes(localData ? JSON.parse(localData) : []);
    }, []);
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
                        <div
                            className={`nav-menu-item ${activeMenu === 'overview' ? 'active' : ''}`}
                            onClick={() => setActiveMenu('overview')}
                        >
                            <User size={20} /> Profile Overview
                        </div>
                        <div
                            className={`nav-menu-item ${activeMenu === 'recipes' ? 'active' : ''}`}
                            onClick={() => setActiveMenu('recipes')}
                        >
                            <Utensils size={20} /> My Recipes
                        </div>
                        <div
                            className={`nav-menu-item ${activeMenu === 'collections' ? 'active' : ''}`}
                            onClick={() => setActiveMenu('collections')}
                        >
                            <Bookmark size={20} /> Collections
                        </div>
                        <div
                            className={`nav-menu-item ${activeMenu === 'community' ? 'active' : ''}`}
                            onClick={() => setActiveMenu('community')}
                        >
                            <MessageSquare size={20} /> Community Activity
                        </div>
                        <div
                            className={`nav-menu-item ${activeMenu === 'help' ? 'active' : ''}`}
                            onClick={() => setActiveMenu('help')}
                        >
                            <HelpCircle size={20} /> Support & Help
                        </div>
                        <div className="sidebar-divider" style={{ margin: '1rem 0', borderTop: '1px solid var(--border-color)', opacity: 0.5 }}></div>
                        <div
                            className="nav-menu-item logout-item"
                            onClick={() => {
                                logout();
                                navigate('/');
                                toast.success('Logged out successfully!');
                            }}
                            style={{ color: '#ef4444' }}
                        >
                            <LogOut size={20} /> Logout
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
                {activeMenu !== 'help' ? (
                    <main className="profile-main-content">

                        {/* Top Banner Card */}
                        <div className="profile-banner-card">
                            <div className="banner-header-bg"></div>
                            <div className="banner-body">
                                <div className="profile-avatar-container">
                                    <img
                                        src={displayAvatar}
                                        alt={userName}
                                        className="profile-avatar-img"
                                    />
                                </div>

                                <div className="banner-top-actions">
                                    <button className="btn-green-solid" onClick={() => setIsEditModalOpen(true)}>Edit Profile</button>
                                    <button className="btn-white-outline" onClick={handleShare}>Share</button>
                                </div>

                                <div className="banner-info">
                                    <div className="profile-name-row">
                                        <h1>{editFormData.username}</h1>
                                        <span className="badge-gold">
                                            <Award size={14} fill="currentColor" /> {userRole.toUpperCase()}
                                        </span>
                                    </div>
                                    <p className="profile-bio-text">
                                        {userEmail} • {editFormData.bio}
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

                        {/* dynamic content based on active menu */}
                        {activeMenu === 'overview' && (
                            <div className="middle-cards-grid">
                                {/* Culinary Skills */}
                                <div className="sidebar-card">
                                    <div className="card-header-row">
                                        <h3 className="card-title">Culinary Skills</h3>
                                        <span className="pill-light-green">Updated Weekly</span>
                                    </div>

                                    <div className="skills-list">
                                        <div className="skill-row">
                                            <div className="skill-row-top">
                                                <span>Knife Skills</span>
                                                <span>92%</span>
                                            </div>
                                            <div className="skill-bar-bg"><div className="skill-bar-fill" style={{ width: '92%' }}></div></div>
                                        </div>
                                        <div className="skill-row">
                                            <div className="skill-row-top">
                                                <span>Flavor Profiling</span>
                                                <span>88%</span>
                                            </div>
                                            <div className="skill-bar-bg"><div className="skill-bar-fill" style={{ width: '88%' }}></div></div>
                                        </div>
                                    </div>

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
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeMenu === 'recipes' && (
                            <div className="recipes-section-wrapper" style={{ marginTop: '1rem' }}>
                                <div className="card-header-row">
                                    <h2 className="card-title">My Recipes</h2>
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

                                    <div className="create-recipe-card" onClick={() => toast.success('Giao diện Soạn thảo Công thức đang được phát triển!')} style={{ cursor: 'pointer' }}>
                                        <div className="create-icon-btn">
                                            <Plus size={24} />
                                        </div>
                                        <h4>Share a Recipe</h4>
                                        <p>Grow your influence in the CO-CHE community</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeMenu === 'collections' && (
                            <div className="collections-grid">
                                <h2 className="section-title">Saved Recipes ({savedRecipes.length})</h2>
                                <div className="hub-grid">
                                    {savedRecipes.length > 0 ? (
                                        savedRecipes.map(recipe => (
                                            <div key={recipe.productId} className="recipe-card-hub" onClick={() => navigate(`/recipe/${recipe.productId}`)}>
                                                <img src={recipe.imageUrl} alt={recipe.name} />
                                                <div className="hub-card-content">
                                                    <h3>{recipe.name}</h3>
                                                    <p>{recipe.description}</p>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="empty-state">You haven't saved any recipes yet.</div>
                                    )}
                                </div>
                            </div>
                        )}

                        {activeMenu === 'community' && (
                            <div className="community-section" style={{ marginTop: '1rem', padding: '2rem', textAlign: 'center', background: 'var(--bg-surface)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                                <MessageSquare size={48} color="var(--primary)" style={{ marginBottom: '1rem' }} />
                                <h2 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Community Activity</h2>
                                <p style={{ color: 'var(--text-secondary)' }}>No recent activity found. Join a discussion in the Community Forum!</p>
                                <button className="btn-green-solid" style={{ marginTop: '1.5rem' }} onClick={() => navigate('/community')}>Go to Forum</button>
                            </div>
                        )}

                    </main>
                ) : (
                    <HelpCenter />
                )}
            </div>

            {/* Edit Profile Modal */}
            {isEditModalOpen && (
                <div className="profile-modal-overlay" onClick={() => setIsEditModalOpen(false)}>
                    <div className="profile-modal-content" onClick={e => e.stopPropagation()}>
                        <button className="profile-modal-close" onClick={() => setIsEditModalOpen(false)}><X size={24} /></button>
                        <h2>Edit Profile</h2>
                        <form onSubmit={handleEditSubmit}>
                            <div className="profile-form-group">
                                <label>Profile Picture</label>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    <img
                                        src={editFormData.avatar || displayAvatar}
                                        alt="Preview"
                                        style={{ width: '64px', height: '64px', borderRadius: '12px', objectFit: 'cover' }}
                                    />
                                    <input
                                        type="file"
                                        accept="image/*"
                                        style={{ flex: 1, padding: '0.5rem' }}
                                        onChange={handleAvatarChange}
                                    />
                                </div>
                            </div>
                            <div className="profile-form-group">
                                <label>Display Name</label>
                                <input
                                    type="text"
                                    value={editFormData.username}
                                    onChange={e => setEditFormData({ ...editFormData, username: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="profile-form-group">
                                <label>Bio</label>
                                <textarea
                                    rows="3"
                                    value={editFormData.bio}
                                    onChange={e => setEditFormData({ ...editFormData, bio: e.target.value })}
                                    required
                                ></textarea>
                            </div>
                            <div className="profile-form-group" style={{ marginTop: '1.5rem' }}>
                                <button type="submit" className="btn-green-solid" style={{ width: '100%' }}>Save Changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
