import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/axiosConfig';
import { useAuth } from './AuthContext';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import toast, { Toaster } from 'react-hot-toast';
import '../css/community.css';
import {
    Layers, TrendingUp, Users, Medal, Bot,
    Image as ImageIcon, Video, Tag, Send, MoreHorizontal,
    Heart, MessageCircle, Share2, Bookmark, Flame, Calendar
} from 'lucide-react';

const Community = () => {
    const navigate = useNavigate();
    const { isAuthenticated, user } = useAuth();
    const [newPost, setNewPost] = useState('');
    const [activeFilter, setActiveFilter] = useState('All Posts');
    const [posts, setPosts] = useState([]);
    const [isPostModalOpen, setIsPostModalOpen] = useState(false);

    const [showVideoInput, setShowVideoInput] = useState(false);
    const [videoUrlInput, setVideoUrlInput] = useState('');
    const [showTagInput, setShowTagInput] = useState(false);
    const [tagInput, setTagInput] = useState('');
    const [imageBase64, setImageBase64] = useState('');
    const fileInputRef = React.useRef(null);

    const fetchPosts = async () => {
        try {
            const response = await api.get('/api/community/posts');
            setPosts(response.data);
        } catch (error) {
            console.error('Failed to fetch posts:', error);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchPosts();

        const socket = new SockJS('http://localhost:8081/ws');
        const stompClient = new Client({
            webSocketFactory: () => socket,
            onConnect: () => {
                stompClient.subscribe('/topic/posts', (message) => {
                    if (message.body) {
                        try {
                            const event = JSON.parse(message.body);
                            if (event.type === 'CREATED') {
                                setPosts(prevPosts => [event.post, ...prevPosts]);
                            } else if (event.type === 'UPDATED') {
                                setPosts(prevPosts => prevPosts.map(p => p.id === event.post.id ? event.post : p));
                            }
                        } catch(e) { console.error('Error parsing event', e); }
                    }
                });
            },
            onStompError: (frame) => {
                console.error('Broker reported error: ' + frame.headers['message']);
            }
        });

        stompClient.activate();

        return () => {
            if (stompClient.active) {
                stompClient.deactivate();
            }
        };
    }, []);

    const filters = ['All Posts', '#HomeCooking', '#Vegan', '#QuickBites', '#HealthyEating'];

    const handleOpenModal = () => {
        if (!isAuthenticated) {
            toast.error('Vui lòng đăng nhập để đăng bài!');
            return;
        }
        setIsPostModalOpen(true);
    };

    const handleAddPost = async () => {
        if (!newPost.trim() && !imageBase64 && !videoUrlInput) return;
        
        const postObj = {
            authorName: user?.username || "Guest",
            role: user?.role === 'ROLE_ADMIN' ? "ADMIN" : "MEMBER",
            avatarUrl: user?.avatar || `https://ui-avatars.com/api/?name=${user?.username || 'Guest'}&background=3b82f6&color=fff`,
            content: newPost,
            tags: tagInput.trim() ? tagInput : (activeFilter !== 'All Posts' ? activeFilter : "#NewRecipe"),
            imageUrl: imageBase64 || null,
            videoUrl: videoUrlInput || null,
            likesCount: 0,
            commentsCount: 0,
            sharesCount: 0
        };
        
        try {
            await api.post('/api/community/posts', postObj);
            // Local state reset, the STOMP message will render the new post payload for everyone globally
            setNewPost('');
            setImageBase64('');
            setVideoUrlInput('');
            setTagInput('');
            setShowVideoInput(false);
            setShowTagInput(false);
            setIsPostModalOpen(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
            toast.success('Đã đăng bài thành công!');
        } catch (error) {
            console.error('Failed to create post:', error);
            if (error.response && error.response.status === 500) {
                toast.error('Lỗi hệ thống: Kích thước ảnh quá lớn hoặc máy chủ không phản hồi!');
            } else {
                toast.error('Không thể gửi bài viết lúc này!');
            }
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageBase64(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const filteredPosts = activeFilter === 'All Posts' 
        ? posts 
        : posts.filter(post => post.tags && post.tags.toLowerCase().includes(activeFilter.toLowerCase()));

    const handleLike = async (id) => {
        setPosts(posts.map(post => {
            if (post.id === id) {
                // Optimistic UI, it will be accurately synced when WS fires UPDATED payload
                return { ...post, likesCount: post.likesCount + 1, isLiked: true };
            }
            return post;
        }));
        try {
            await api.put(`/api/community/posts/${id}/like`);
        } catch (error) {
            console.error('Failed to like post:', error);
        }
    };

    return (
        <div className="community-container">
            <Toaster position="top-right" />
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
                        <button className="ai-chat-btn" onClick={() => navigate('/ai-assistant')}>Start Chatting</button>
                    </div>
                </aside>

                {/* Main Feed */}
                <main className="community-feed">
                    <div className="feed-card create-post">
                        <div className="create-post-top" onClick={handleOpenModal}>
                            <img src={isAuthenticated ? (user?.avatar || `https://ui-avatars.com/api/?name=${user?.username}&background=3b82f6&color=fff`) : "https://ui-avatars.com/api/?name=Guest&background=9ca3af&color=fff"} alt="Me" className="avatar-img" />
                            <div className="fake-input-placeholder">
                                {isAuthenticated ? `Share your latest culinary masterpiece, ${user?.username}?` : "Đăng nhập để chia sẻ công thức của bạn!"}
                            </div>
                        </div>
                        <div className="create-post-bottom">
                            <div className="post-options">
                                <button className="post-opt-btn btn-photo" onClick={handleOpenModal}><ImageIcon size={18} /> Photo</button>
                                <button className="post-opt-btn btn-video" onClick={handleOpenModal}><Video size={18} /> Video</button>
                                <button className="post-opt-btn btn-tag" onClick={handleOpenModal}><Tag size={18} /> Tag Ingredients</button>
                            </div>
                        </div>
                    </div>

            {isPostModalOpen && (
                <div className="post-modal-overlay" onClick={() => setIsPostModalOpen(false)}>
                    <div className="post-modal" onClick={e => e.stopPropagation()}>
                        <div className="post-modal-header">
                            <h2>Tạo bài viết</h2>
                            <button className="close-modal-btn" onClick={() => setIsPostModalOpen(false)}>✕</button>
                        </div>
                        <div className="post-modal-body">
                            <div className="modal-user-info">
                                <img src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.username || 'User'}&background=3b82f6&color=fff`} alt="User" className="avatar-img" />
                                <div>
                                    <h4>{user?.username || 'User'}</h4>
                                    <span className="privacy-badge">🌍 Công khai</span>
                                </div>
                            </div>
                            <textarea 
                                autoFocus
                                placeholder={`${user?.username || 'User'} ơi, bạn đang nghĩ gì thế?`}
                                value={newPost}
                                onChange={(e) => setNewPost(e.target.value)}
                            />
                            
                            {imageBase64 && (
                                <div className="attachment-preview" style={{ marginTop: '10px' }}>
                                    <img src={imageBase64} alt="Preview" style={{ maxHeight: '150px', borderRadius: '8px' }} />
                                    <button onClick={() => {setImageBase64(''); fileInputRef.current.value='';}} style={{ background: 'transparent', color: '#ff4d4f', border: 'none', cursor: 'pointer', marginLeft: '10px', verticalAlign: 'bottom', fontWeight: 'bold' }}>Xóa Ảnh</button>
                                </div>
                            )}

                            {showVideoInput && (
                                <input 
                                    type="text" 
                                    placeholder="Dán Link Youtube của bạn vào đây..." 
                                    value={videoUrlInput}
                                    onChange={(e) => setVideoUrlInput(e.target.value)}
                                    style={{ width: '100%', padding: '10px', marginTop: '10px', borderRadius: '8px', border: '1px solid #333', background: '#222', color: 'white' }}
                                />
                            )}

                            {showTagInput && (
                                <input 
                                    type="text" 
                                    placeholder="Thêm hashtag (ví dụ: #MonNgonMoiNgay)" 
                                    value={tagInput}
                                    onChange={(e) => setTagInput(e.target.value)}
                                    style={{ width: '100%', padding: '10px', marginTop: '10px', borderRadius: '8px', border: '1px solid #333', background: '#222', color: 'white' }}
                                />
                            )}
                            
                            <div className="add-to-post">
                                <span>Thêm vào bài viết của bạn</span>
                                <div className="add-to-actions">
                                    <input type="file" ref={fileInputRef} style={{ display: 'none' }} accept="image/*" onChange={handleImageUpload} />
                                    <button onClick={() => fileInputRef.current.click()}><ImageIcon color="#10b981" size={24} /></button>
                                    <button onClick={() => setShowVideoInput(!showVideoInput)}><Video color="#f43f5e" size={24} /></button>
                                    <button onClick={() => setShowTagInput(!showTagInput)}><Tag color="#f59e0b" size={24} /></button>
                                </div>
                            </div>

                            <button 
                                className="btn-post-submit-full" 
                                disabled={!newPost.trim() && !imageBase64 && !videoUrlInput}
                                onClick={handleAddPost}
                            >
                                Đăng
                            </button>
                        </div>
                    </div>
                </div>
            )}

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
                        {filteredPosts.map(post => (
                            <div key={post.id} className="feed-card">
                                <div className="post-header">
                                    <div className="post-user">
                                        <img src={post.avatarUrl} alt={post.authorName} className="avatar-img" />
                                        <div className="post-user-info">
                                            <h4>{post.authorName}</h4>
                                            <p>{post.role}</p>
                                        </div>
                                    </div>
                                    <button className="post-actions-menu"><MoreHorizontal size={20} /></button>
                                </div>

                                <div className="post-content">
                                    <p className="post-text">
                                        {post.content} <span>{post.tags}</span>
                                    </p>
                                    {post.imageUrl && (
                                        <div className="post-image">
                                            <img src={post.imageUrl} alt="Post content" />
                                        </div>
                                    )}
                                    {post.videoUrl && (
                                        <div className="post-video" style={{ marginTop: '15px' }}>
                                            <iframe
                                                width="100%"
                                                height="315"
                                                src={post.videoUrl.replace('watch?v=', 'embed/').split('&')[0].replace('youtu.be/', 'youtube.com/embed/')}
                                                title="Video player"
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                                style={{ borderRadius: '12px' }}
                                            ></iframe>
                                        </div>
                                    )}
                                </div>

                                <div className="post-footer">
                                    <button
                                        className={`footer-action ${post.isLiked ? 'liked' : ''}`}
                                        onClick={() => handleLike(post.id)}
                                    >
                                        <Heart size={18} fill={post.isLiked ? "#ea580c" : "none"} color={post.isLiked ? "#ea580c" : "currentColor"} />
                                        {post.likesCount}
                                    </button>
                                    <button className="footer-action">
                                        <MessageCircle size={18} /> {post.commentsCount}
                                    </button>
                                    <button className="footer-action">
                                        <Share2 size={18} /> {post.sharesCount}
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
                                <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Elena" className="avatar-img" style={{ width: 32, height: 32 }} />
                                <h4>Chef Elena R.</h4>
                            </div>
                            <button className="btn-follow" onClick={(e) => { e.target.innerText = e.target.innerText === 'Follow' ? 'Following' : 'Follow'; e.target.classList.toggle('following'); }}>Follow</button>
                        </div>
                        <div className="chef-item">
                            <div className="chef-info">
                                <img src="https://randomuser.me/api/portraits/men/46.jpg" alt="David" className="avatar-img" style={{ width: 32, height: 32 }} />
                                <h4>Chef David L.</h4>
                            </div>
                            <button className="btn-follow" onClick={(e) => { e.target.innerText = e.target.innerText === 'Follow' ? 'Following' : 'Follow'; e.target.classList.toggle('following'); }}>Follow</button>
                        </div>
                        <div className="chef-item">
                            <div className="chef-info">
                                <img src="https://randomuser.me/api/portraits/women/65.jpg" alt="Maria" className="avatar-img" style={{ width: 32, height: 32 }} />
                                <h4>Chef Maria G.</h4>
                            </div>
                            <button className="btn-follow" onClick={(e) => { e.target.innerText = e.target.innerText === 'Follow' ? 'Following' : 'Follow'; e.target.classList.toggle('following'); }}>Follow</button>
                        </div>
                        <a href="#" className="view-all-link">View All Chefs</a>
                    </div>

                    <div className="sidebar-card">
                        <h3 className="sidebar-title"><Calendar size={20} color="#ea580c" /> Upcoming Challenges</h3>
                        <div className="challenge-banner">
                            <img src="https://picsum.photos/seed/sourdough/400/200" alt="Sourdough" />
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
