import React, { useState } from 'react';
import '../css/community.css';
import { Heart, MessageCircle, Share2, Bookmark, Image as ImageIcon, Send, MoreHorizontal } from 'lucide-react';

const Community = () => {
    const [posts, setPosts] = useState([
        {
            id: 1,
            author: "Emma Watson",
            avatar: "EW",
            avatarColor: "#ec4899",
            time: "2 hours ago",
            content: "Just made this amazing vegan avocado toast for breakfast! 🥑🍞 Added some chili flakes for extra kick. Healthy and delicious!",
            image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?auto=format&fit=crop&q=80&w=800",
            likes: 245,
            comments: 32,
            isLiked: false
        },
        {
            id: 2,
            author: "Michael Chen",
            avatar: "MC",
            avatarColor: "#3b82f6",
            time: "5 hours ago",
            content: "Anyone have good meal prep ideas for building muscle? I've been eating chicken breast and rice for 3 weeks straight and need some variety! 🍗🍚",
            image: null,
            likes: 112,
            comments: 48,
            isLiked: true
        },
        {
            id: 3,
            author: "Sarah Johnson",
            avatar: "SJ",
            avatarColor: "#10b981",
            time: "1 day ago",
            content: "My weekend baking project: Sourdough bread from scratch! It took 3 days but absolutely worth it. The crust is perfect. 🥖✨",
            image: "https://images.unsplash.com/photo-1585478259715-876acc5be8eb?auto=format&fit=crop&q=80&w=800",
            likes: 534,
            comments: 89,
            isLiked: false
        }
    ]);

    const [newPost, setNewPost] = useState('');

    const handleLike = (id) => {
        setPosts(posts.map(post => {
            if (post.id === id) {
                return {
                    ...post,
                    isLiked: !post.isLiked,
                    likes: post.isLiked ? post.likes - 1 : post.likes + 1
                };
            }
            return post;
        }));
    };

    return (
        <div className="community-container">
            <div className="community-layout container">
                {/* Left Sidebar */}
                <aside className="community-sidebar-left">
                    <div className="sidebar-card">
                        <h3>Discover Topics</h3>
                        <ul className="topic-list">
                            <li className="active">All Posts</li>
                            <li>🥬 Vegan Recipes</li>
                            <li>💪 Muscle Building</li>
                            <li>⏱️ 15-Min Meals</li>
                            <li>🥗 Weight Loss</li>
                            <li>🍰 Healthy Desserts</li>
                        </ul>
                    </div>
                    <div className="sidebar-card">
                        <h3>Top Contributors</h3>
                        <div className="user-list">
                            <div className="user-item">
                                <div className="user-avatar" style={{ backgroundColor: '#8b5cf6' }}>AL</div>
                                <div>
                                    <h4>Anna Lee</h4>
                                    <p>@annacooks</p>
                                </div>
                                <button className="follow-btn">Follow</button>
                            </div>
                            <div className="user-item">
                                <div className="user-avatar" style={{ backgroundColor: '#f59e0b' }}>DB</div>
                                <div>
                                    <h4>David Brown</h4>
                                    <p>@davidfitness</p>
                                </div>
                                <button className="follow-btn">Follow</button>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Feed */}
                <main className="community-feed">
                    <div className="create-post-card">
                        <div className="create-post-header">
                            <div className="user-avatar" style={{ backgroundColor: '#FF6B6B' }}>ME</div>
                            <textarea
                                placeholder="Share your recipe or cooking experience..."
                                value={newPost}
                                onChange={(e) => setNewPost(e.target.value)}
                            ></textarea>
                        </div>
                        <div className="create-post-actions">
                            <button className="action-btn">
                                <ImageIcon size={20} /> Photo/Video
                            </button>
                            <button className="post-btn">
                                Post <Send size={16} />
                            </button>
                        </div>
                    </div>

                    <div className="feed-posts">
                        {posts.map(post => (
                            <div key={post.id} className="post-card">
                                <div className="post-header">
                                    <div className="post-author">
                                        <div className="user-avatar" style={{ backgroundColor: post.avatarColor }}>
                                            {post.avatar}
                                        </div>
                                        <div>
                                            <h4>{post.author}</h4>
                                            <p>{post.time}</p>
                                        </div>
                                    </div>
                                    <button className="more-btn"><MoreHorizontal size={20} /></button>
                                </div>

                                <div className="post-content">
                                    <p>{post.content}</p>
                                    {post.image && (
                                        <div className="post-image">
                                            <img src={post.image} alt="Post content" />
                                        </div>
                                    )}
                                </div>

                                <div className="post-stats">
                                    <span>{post.likes} Likes</span>
                                    <span>{post.comments} Comments</span>
                                </div>

                                <div className="post-actions">
                                    <button
                                        className={`interaction-btn ${post.isLiked ? 'liked' : ''}`}
                                        onClick={() => handleLike(post.id)}
                                    >
                                        <Heart size={20} fill={post.isLiked ? "#FF6B6B" : "none"} color={post.isLiked ? "#FF6B6B" : "currentColor"} />
                                        <span>Like</span>
                                    </button>
                                    <button className="interaction-btn">
                                        <MessageCircle size={20} />
                                        <span>Comment</span>
                                    </button>
                                    <button className="interaction-btn">
                                        <Share2 size={20} />
                                        <span>Share</span>
                                    </button>
                                    <button className="interaction-btn bookmark">
                                        <Bookmark size={20} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>

                {/* Right Sidebar */}
                <aside className="community-sidebar-right">
                    <div className="sidebar-card">
                        <h3>Trending Challenges</h3>
                        <div className="challenge-card challenge-1">
                            <h4>7 Days Without Sugar</h4>
                            <p>12,450 participants</p>
                            <button className="join-btn">Join Now</button>
                        </div>
                        <div className="challenge-card challenge-2">
                            <h4>Vegan January</h4>
                            <p>8,200 participants</p>
                            <button className="join-btn">Join Now</button>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default Community;
