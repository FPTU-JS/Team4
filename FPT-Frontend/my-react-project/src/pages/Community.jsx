import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../utils/axiosConfig';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import '../css/community.css';
import {
    Layers, TrendingUp, Users, Medal, Bot,
    Image as ImageIcon, Video, Tag, Send, MoreHorizontal,
    Heart, MessageCircle, Share2, Bookmark, Flame, Calendar
} from 'lucide-react';
import { useAuth } from './AuthContext';

const Community = () => {
    const navigate = useNavigate();
    const { user, isAuthenticated } = useAuth();

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
    const [loadingLikes, setLoadingLikes] = useState({});
    // // test 
    // const testUser = { username: "Guest_Tester", id: 999, role: "ROLE_ADMIN", avatar: "" };
    // const isTestAuthenticated = true;
    const handleActionWithAuth = (action) => {
        if (!isAuthenticated) {
            toast.error("Login to use these features!", {
                id: 'auth-required-toast'
            });
            return;
        }
        action();
    };

    useEffect(() => {
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
                                setPosts(prevPosts => {
                                    // Check nếu bài viết đã tồn tại trong danh sách thì không thêm nữa
                                    const isExisted = prevPosts.some(p => p.id === event.post.id);
                                    if (isExisted) return prevPosts;

                                    const newPostWithLike = { ...event.post, isLiked: false };
                                    return [newPostWithLike, ...prevPosts];
                                });
                            } else if (event.type === 'UPDATED') {
                                setPosts(prevPosts =>
                                    prevPosts.map(p => {
                                        if (p.id === event.post.id) {
                                            return {
                                                ...event.post,
                                                isLiked: p.isLiked
                                            };
                                        }
                                        return p;
                                    })
                                );
                            }
                        } catch (e) { console.error('Error parsing event', e); }
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
    }, [user?.id]);

    // Community.js
    const fetchPosts = async () => {
        try {
            const currentId = user?.id;
            // Truyền thêm userId để Backend check Like
            const response = await api.get(`/api/community/posts?currentUserId=${currentId}`);

            const formattedPosts = response.data.map(item => ({
                ...item.post,
                isLiked: item.isLiked
            }));

            setPosts(formattedPosts);
        } catch (error) {
            console.error('Failed to fetch posts:', error);
        }
    };

    const filters = ['All Posts', '#HomeCooking', '#Vegan', '#QuickBites', '#HealthyEating'];

    const handleAddPost = async () => {
        if (!newPost.trim() && !imageBase64 && !videoUrlInput) return;

        const postObj = {
            authorName: `Chef ${user?.username}`,
            role: (user?.role || "Expert Chef") + " • JUST NOW",
            avatarUrl: user?.avatar || `https://ui-avatars.com/api/?name=${user?.username}&background=3b82f6&color=fff`,
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
            toast.success('Đã đăng bài thành công!', {
                id: 'create-post-success'
            });
        } catch (error) {
            console.error('Failed to create post:', error);
            if (error.response && error.response.status === 500) {
                toast.error('Lỗi hệ thống: Kích thước ảnh quá lớn hoặc máy chủ không phản hồi!', {
                    id: 'create-post-error'
                });
            } else {
                toast.error('Không thể gửi bài viết lúc này!', {
                    id: 'create-post-error'
                });
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
        const currentUserId = user?.id;

        if (loadingLikes[id]) return;

        handleActionWithAuth(async () => {
            setLoadingLikes(prev => ({ ...prev, [id]: true }));

            setPosts(prevPosts =>
                prevPosts.map(post => {
                    if (post.id === id) {
                        const isCurrentlyLiked = post.isLiked;
                        return {
                            ...post,
                            likesCount: isCurrentlyLiked
                                ? post.likesCount - 1
                                : post.likesCount + 1,
                            isLiked: !isCurrentlyLiked
                        };
                    }
                    return post;
                })
            );

            try {
                await api.put(`/api/community/posts/${id}/like?userId=${currentUserId}`);
            } catch (error) {
                toast.error('Failed to like post', {
                    id: 'like-error'
                });
                fetchPosts();
            } finally {
                setLoadingLikes(prev => ({ ...prev, [id]: false }));
            }
        });
    };
    return (
        <div className="community-container">
            {/* <Toaster position="top-right" /> */}
            <div className="community-layout">
                {/* Left Sidebar */}
                <aside className="community-sidebar-left">
                    <div className="sidebar-card">
                        <h3 className="sidebar-title"><CompassIcon /> Discover</h3>
                        <ul className="discover-list">
                            <li className="discover-item active"><Layers size={18} /> Feed</li>
                            <li className="discover-item"><TrendingUp size={18} /> Trending</li>
                            <li className="discover-item"><Users size={18} /> Chefs</li>
                            <li className="discover-item"><Medal size={18} /> Challenges</li>
                        </ul>
                    </div>

                    <div className="ai-assistant-card">
                        <div className="ai-assistant-icon"><Bot size={24} color="white" /></div>
                        <h3>AI Kitchen Assistant</h3>
                        <p>Stuck on a recipe? Ask our AI for substitutions.</p>
                        <button className="ai-chat-btn" onClick={() => navigate('/ai-assistant')}>Start Chatting</button>
                    </div>
                </aside>

                {/* Main Feed */}
                <main className="community-feed">
                    <div className="feed-card create-post">
                        {/* Chặn mở Modal nếu chưa login */}
                        <div className="create-post-top" onClick={() => handleActionWithAuth(() => setIsPostModalOpen(true))}>
                            <img
                                src={isAuthenticated ? (user?.avatar || `https://ui-avatars.com/api/?name=${user?.username}`) : "https://www.gravatar.com/avatar/000?d=mp"}
                                alt="Me"
                                className="avatar-img"
                            />
                            <div className="fake-input-placeholder">
                                {isAuthenticated
                                    ? `Chia sẻ công thức mới của bạn chứ, ${user?.username}?`
                                    : "Đăng nhập để chia sẻ cảm hứng nấu ăn của bạn..."
                                }
                            </div>
                        </div>
                        <div className="create-post-bottom">
                            <div className="post-options">
                                <button className="post-opt-btn btn-photo" onClick={() => handleActionWithAuth(() => setIsPostModalOpen(true))}><ImageIcon size={18} /> Photo</button>
                                <button className="post-opt-btn btn-video" onClick={() => handleActionWithAuth(() => setIsPostModalOpen(true))}><Video size={18} /> Video</button>
                                <button className="post-opt-btn btn-tag" onClick={() => handleActionWithAuth(() => setIsPostModalOpen(true))}><Tag size={18} /> Tag Ingredients</button>
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
                                        <img src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.username}`} alt="User" className="avatar-img" />
                                        <div>
                                            <h4>{user?.username}</h4>
                                            <span className="privacy-badge">🌍 Công khai</span>
                                        </div>
                                    </div>
                                    <textarea
                                        autoFocus
                                        placeholder={`${user?.username} ơi, bạn đang nghĩ gì thế?`}
                                        value={newPost}
                                        onChange={(e) => setNewPost(e.target.value)}
                                    />
                                    {/* ... (phần upload image/video giữ nguyên) */}
                                    <div className="add-to-post">
                                        <span>Thêm vào bài viết</span>
                                        <div className="add-to-actions">
                                            <input type="file" ref={fileInputRef} style={{ display: 'none' }} accept="image/*" onChange={handleImageUpload} />
                                            <button onClick={() => fileInputRef.current.click()}><ImageIcon color="#10b981" size={24} /></button>
                                            <button onClick={() => setShowVideoInput(!showVideoInput)}><Video color="#f43f5e" size={24} /></button>
                                            <button onClick={() => setShowTagInput(!showTagInput)}><Tag color="#f59e0b" size={24} /></button>
                                        </div>
                                    </div>
                                    <button className="btn-post-submit-full" disabled={!newPost.trim() && !imageBase64 && !videoUrlInput} onClick={handleAddPost}>Đăng</button>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="feed-filters">
                        {filters.map(f => (
                            <button key={f} className={`filter-pill ${activeFilter === f ? 'active' : ''}`} onClick={() => setActiveFilter(f)}>{f}</button>
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
                                    <p className="post-text">{post.content} <span>{post.tags}</span></p>
                                    {post.imageUrl && <div className="post-image"><img src={post.imageUrl} alt="Post" /></div>}
                                    {/* Video iframe logic... */}
                                </div>
                                <div className="post-footer">
                                    <button className={`footer-action ${post.isLiked ? 'liked' : ''}`} onClick={() => handleLike(post.id)}>
                                        <Heart size={18} fill={post.isLiked ? "#ea580c" : "none"} color={post.isLiked ? "#ea580c" : "currentColor"} />
                                        {post.likesCount}
                                    </button>
                                    <button className="footer-action" onClick={() => handleActionWithAuth(() => {/* Logic bình luận */ })}>
                                        <MessageCircle size={18} /> {post.commentsCount}
                                    </button>
                                    <button className="footer-action" onClick={() => handleActionWithAuth(() => {/* Logic share */ })}>
                                        <Share2 size={18} /> {post.sharesCount}
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
                        {['Elena R.', 'David L.', 'Maria G.'].map((name, idx) => (
                            <div key={idx} className="chef-item">
                                <div className="chef-info">
                                    <img src={`https://i.pravatar.cc/150?u=${name}`} alt={name} className="avatar-img" style={{ width: 32, height: 32 }} />
                                    <h4>Chef {name}</h4>
                                </div>
                                <button className="btn-follow" onClick={(e) => handleActionWithAuth(() => {
                                    e.target.innerText = e.target.innerText === 'Follow' ? 'Following' : 'Follow';
                                    e.target.classList.toggle('following');
                                })}>Follow</button>
                            </div>
                        ))}
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
