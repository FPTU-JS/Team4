import React, { useState } from 'react';
import '../css/community.css';
import {
    Layers, TrendingUp, Users, Medal, Bot,
    Image as ImageIcon, Video, Tag, Send, MoreHorizontal,
    Heart, MessageCircle, Share2, Bookmark, Flame, Calendar
} from 'lucide-react';

const Community = () => {
    const [newPost, setNewPost] = useState('');
    const [activeFilter, setActiveFilter] = useState('All Posts');

    const [posts, setPosts] = useState([
        {
            id: 1,
            author: "Sarah Miller",
            role: "HOME CHEF • 2 HOURS AGO",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
            content: "Just perfected this Summer Harvest Salad 🥗 Everything is fresh from my garden! Added some roasted chickpeas for extra crunch.",
            tags: "#HealthyEating #HomeCooking #Fresh",
            image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80",
            likes: "1.2k",
            comments: "48",
            shares: "12",
            isLiked: true
        },
        {
            id: 2,
            author: "Marcus Chen",
            role: "PRO CHEF • 5 HOURS AGO",
            avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&q=80",
            content: "Quick tip for the best carbonara: Use high-quality pecorino and never use cream! The secret is in the pasta water emulsification. 🍝",
            tags: "#ItalianCooking #ChefTips",
            image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800&q=80",
            likes: "856",
            comments: "214",
            shares: "89",
            isLiked: false
        }
    ]);

    const filters = ['All Posts', '#HomeCooking', '#Vegan', '#QuickBites', '#HealthyEating'];

    const handleLike = (id) => {
        setPosts(posts.map(post => {
            if (post.id === id) {
                return { ...post, isLiked: !post.isLiked };
            }
            return post;
        }));
    };

    return (
        <div className="community-container">
            <div className="community-layout">
                {/* Left Sidebar */}
                <aside className="community-sidebar-left">
                    <div className="sidebar-card">
                        <h3 className="sidebar-title"><CompassIcon /> Discover</h3>
                        <ul className="discover-list">
                            <li className="discover-item active">
                                <Layers size={18} /> Feed
                            </li>
                            <li className="discover-item">
                                <TrendingUp size={18} /> Trending
                            </li>
                            <li className="discover-item">
                                <Users size={18} /> Chefs
                            </li>
                            <li className="discover-item">
                                <Medal size={18} /> Challenges
                            </li>
                        </ul>
                    </div>

                    <div className="ai-assistant-card">
                        <div className="ai-assistant-icon">
                            <Bot size={24} color="white" />
                        </div>
                        <h3>AI Kitchen Assistant</h3>
                        <p>Stuck on a recipe? Ask our AI for substitutions or timing tips.</p>
                        <button className="ai-chat-btn">Start Chatting</button>
                    </div>
                </aside>

                {/* Main Feed */}
                <main className="community-feed">
                    <div className="feed-card create-post">
                        <div className="create-post-top">
                            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80" alt="Me" className="avatar-img" />
                            <textarea
                                placeholder="Share your latest culinary masterpiece..."
                                value={newPost}
                                onChange={(e) => setNewPost(e.target.value)}
                            />
                        </div>
                        <div className="create-post-bottom">
                            <div className="post-options">
                                <button className="post-opt-btn btn-photo"><ImageIcon size={18} /> Photo</button>
                                <button className="post-opt-btn btn-video"><Video size={18} /> Video</button>
                                <button className="post-opt-btn btn-tag"><Tag size={18} /> Tag Ingredients</button>
                            </div>
                            <button className="btn-post-submit">Post</button>
                        </div>
                    </div>

                    <div className="feed-filters">
                        {filters.map(f => (
                            <button
                                key={f}
                                className={`filter-pill ${activeFilter === f ? 'active' : ''}`}
                                onClick={() => setActiveFilter(f)}
                            >
                                {f}
                            </button>
                        ))}
                    </div>

                    <div className="feed-posts">
                        {posts.map(post => (
                            <div key={post.id} className="feed-card">
                                <div className="post-header">
                                    <div className="post-user">
                                        <img src={post.avatar} alt={post.author} className="avatar-img" />
                                        <div className="post-user-info">
                                            <h4>{post.author}</h4>
                                            <p>{post.role}</p>
                                        </div>
                                    </div>
                                    <button className="post-actions-menu"><MoreHorizontal size={20} /></button>
                                </div>

                                <div className="post-content">
                                    <p className="post-text">
                                        {post.content} <span>{post.tags}</span>
                                    </p>
                                    <div className="post-image">
                                        <img src={post.image} alt="Post content" />
                                    </div>
                                </div>

                                <div className="post-footer">
                                    <button
                                        className={`footer-action ${post.isLiked ? 'liked' : ''}`}
                                        onClick={() => handleLike(post.id)}
                                    >
                                        <Heart size={18} fill={post.isLiked ? "#ea580c" : "none"} color={post.isLiked ? "#ea580c" : "currentColor"} />
                                        {post.likes}
                                    </button>
                                    <button className="footer-action">
                                        <MessageCircle size={18} /> {post.comments}
                                    </button>
                                    <button className="footer-action">
                                        <Share2 size={18} /> {post.shares}
                                    </button>
                                    <button className="footer-action bookmark">
                                        <Bookmark size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>

                {/* Right Sidebar */}
                <aside className="community-sidebar-right">
                    <div className="sidebar-card">
                        <h3 className="sidebar-title"><Flame size={20} color="#ea580c" /> Trending Topics</h3>
                        <div className="topic-item">
                            <div className="topic-tag">#TRENDING</div>
                            <div className="topic-title">30-Minute Dinners</div>
                            <div className="topic-stats">2.5k posts this week</div>
                        </div>
                        <div className="topic-item">
                            <div className="topic-tag">#SEASONALITY</div>
                            <div className="topic-title">Summer BBQ Masterclass</div>
                            <div className="topic-stats">1.8k people interested</div>
                        </div>
                        <div className="topic-item">
                            <div className="topic-tag">#CHALLENGE</div>
                            <div className="topic-title">Meatless Monday Challenge</div>
                            <div className="topic-stats">12k participants</div>
                        </div>
                    </div>

                    <div className="sidebar-card">
                        <h3 className="sidebar-title"><StarIcon /> Popular Chefs</h3>
                        <div className="chef-item">
                            <div className="chef-info">
                                <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80" alt="Elena" className="avatar-img" style={{ width: 32, height: 32 }} />
                                <h4>Chef Elena R.</h4>
                            </div>
                            <button className="btn-follow">Follow</button>
                        </div>
                        <div className="chef-item">
                            <div className="chef-info">
                                <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80" alt="David" className="avatar-img" style={{ width: 32, height: 32 }} />
                                <h4>Chef David L.</h4>
                            </div>
                            <button className="btn-follow">Follow</button>
                        </div>
                        <div className="chef-item">
                            <div className="chef-info">
                                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80" alt="Maria" className="avatar-img" style={{ width: 32, height: 32 }} />
                                <h4>Chef Maria G.</h4>
                            </div>
                            <button className="btn-follow">Follow</button>
                        </div>
                        <a href="#" className="view-all-link">View All Chefs</a>
                    </div>

                    <div className="sidebar-card">
                        <h3 className="sidebar-title"><Calendar size={20} color="#ea580c" /> Upcoming Challenges</h3>
                        <div className="challenge-banner">
                            <img src="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80" alt="Sourdough" />
                            <div className="challenge-overlay">
                                <p>Starts in 2 days</p>
                                <h4>Master the Sourdough</h4>
                            </div>
                        </div>
                        <div className="challenge-footer">
                            <span className="challenge-stats">4.2K JOINED</span>
                            <button className="btn-join-outline">Join Now</button>
                        </div>
                    </div>

                    <div className="sidebar-footer">
                        <a href="#">About</a>
                        <a href="#">Guidelines</a>
                        <a href="#">Privacy</a>
                        <a href="#">Terms</a>
                        <div className="copyright">© 2024 CO-CHE Platform</div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

const CompassIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
    </svg>
);

const StarIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="#ea580c" stroke="#ea580c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </svg>
);

export default Community;
