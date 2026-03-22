import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../utils/axiosConfig';
import { useAuth } from './AuthContext';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import '../css/community.css';
import {
    Layers, TrendingUp, Users, Medal, Bot,
    Image as ImageIcon, Video, Tag, Send, MoreHorizontal,
    Heart, MessageCircle, Share2, Bookmark, Flame, Calendar
} from 'lucide-react';

const Community = () => {
    const navigate = useNavigate();
    const { isAuthenticated, user } = useAuth();
    const displayName = user?.fullName || user?.username || "Guest";
    const displayAvatar = user?.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=3b82f6&color=fff`;
    const [newPost, setNewPost] = useState('');
    const [activeFilter, setActiveFilter] = useState('All Posts');
    const [posts, setPosts] = useState([]);
    const [trendingTopics, setTrendingTopics] = useState([]);
    const [isPostModalOpen, setIsPostModalOpen] = useState(false);

    const [showVideoInput, setShowVideoInput] = useState(false);
    const [videoUrlInput, setVideoUrlInput] = useState('');
    const [showTagInput, setShowTagInput] = useState(false);
    const [tagInput, setTagInput] = useState('');
    const [imageBase64, setImageBase64] = useState('');
    const fileInputRef = React.useRef(null);
    const [loadingLikes, setLoadingLikes] = useState({});
    const [activeCommentPostId, setActiveCommentPostId] = useState(null);
    const [comments, setComments] = useState({});
    const [newComment, setNewComment] = useState("");
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

    const fetchPosts = async () => {
        try {
            const params = new URLSearchParams();
            if (user?.id) {
                params.append('currentUserId', user.id);
            }

            const response = await api.get(`/api/community/posts?${params.toString()}`);

            const formattedPosts = response.data.map(item => {
                if (item.post) {
                    return { ...item.post, isLiked: item.isLiked };
                }
                return { ...item, isLiked: false };
            });

            setPosts(formattedPosts);
        } catch (error) {
            console.error('Failed to fetch posts:', error);
        }
    };

    useEffect(() => {
        fetchPosts();

        const loadTrending = async () => {
            try {
                const response = await api.get('/api/community/trending');
                setTrendingTopics(response.data);
            } catch (error) {
                console.error('Failed to fetch trending:', error);
            }
        };
        loadTrending();

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user?.id]);
    const filters = ['All Posts', '#HomeCooking', '#Vegan', '#QuickBites', '#HealthyEating'];



    const handleAddPost = async () => {
        if (!newPost.trim() && !imageBase64 && !videoUrlInput) return;

        const postObj = {
            authorName: displayName,
            authorId: user?.id,
            role: user?.role === 'ROLE_ADMIN' ? "ADMIN" : "MEMBER",
            avatarUrl: displayAvatar,
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
                console.error("Like error:", error);
                toast.error('Failed to like post', {
                    id: 'like-error'
                });
                fetchPosts();
            } finally {
                setLoadingLikes(prev => ({ ...prev, [id]: false }));
            }
        });
    };

    const handleToggleComments = async (postId) => {
        if (activeCommentPostId === postId) {
            setActiveCommentPostId(null);
        } else {
            setActiveCommentPostId(postId);
            try {
                const res = await api.get(`/api/community/posts/${postId}/comments`);
                setComments(prev => ({ ...prev, [postId]: res.data }));
            } catch (error) {
                console.error('Failed to load comments', error);
            }
        }
    };

    const handlePostComment = async (postId) => {
        if (!newComment.trim()) return;
        try {
            const commentObj = {
                userId: user?.id || 0,
                content: newComment,
                authorName: displayName,
                avatarUrl: displayAvatar
            };
            const res = await api.post(`/api/community/posts/${postId}/comments`, commentObj);
            setComments(prev => ({
                ...prev,
                [postId]: [res.data, ...(prev[postId] || [])]
            }));
            setNewComment("");
            toast.success("Đã gửi bình luận!");
        } catch (error) {
            console.error('Failed to post comment', error);
            toast.error("Lỗi khi gửi bình luận");
        }
    };

    const handleShare = async (postId) => {
        try {
            await api.put(`/api/community/posts/${postId}/share`);
            const shareUrl = `${window.location.origin}/community?post=${postId}`;
            if (navigator.share) {
                navigator.share({
                    title: 'Xem bài viết này trên CO-CHE',
                    url: shareUrl
                }).catch(console.error);
            } else {
                navigator.clipboard.writeText(shareUrl);
                toast.success('Đã chép liên kết bài viết!');
            }
        } catch (error) {
            console.error("Share error:", error);
            toast.error("Failed to share post");
        }
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
                                src={isAuthenticated ? displayAvatar : "https://www.gravatar.com/avatar/000?d=mp"}
                                alt="Me"
                                className="avatar-img"
                            />
                            <div className="fake-input-placeholder">
                                {isAuthenticated
                                    ? `Chia sẻ công thức mới của bạn chứ, ${displayName}?`
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
                                        <img src={displayAvatar} alt="User" className="avatar-img" />
                                        <div>
                                            <h4>{displayName}</h4>
                                            <span className="privacy-badge">🌍 Công khai</span>
                                        </div>
                                    </div>
                                    <textarea 
                                        autoFocus
                                        placeholder={`Chia sẻ món ngon của bạn đi, ${displayName}?`}
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
                                    <button className="footer-action" onClick={() => handleActionWithAuth(() => handleToggleComments(post.id))}>
                                        <MessageCircle size={18} /> {post.commentsCount}
                                    </button>
                                    <button className="footer-action" onClick={() => handleActionWithAuth(() => handleShare(post.id))}>
                                        <Share2 size={18} /> {post.sharesCount}
                                    </button>
                                </div>
                                {activeCommentPostId === post.id && (
                                    <div className="comments-section" style={{ borderTop: '1px solid var(--border-color)', padding: '15px' }}>
                                        <div className="comment-input-row" style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                                            <input 
                                                type="text" 
                                                value={newComment} 
                                                onChange={(e) => setNewComment(e.target.value)} 
                                                placeholder="Viết bình luận..." 
                                                style={{ flex: 1, padding: '10px', borderRadius: '20px', border: '1px solid var(--border-color)', background: 'var(--bg-main)', color: 'var(--text-primary)', outline: 'none' }}
                                                onKeyDown={(e) => { if (e.key === 'Enter') handlePostComment(post.id); }}
                                            />
                                            <button onClick={() => handlePostComment(post.id)} style={{ padding: '0 15px', borderRadius: '20px', background: '#ea580c', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 600 }}>Gửi</button>
                                        </div>
                                        <div className="comments-list" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                            {(comments[post.id] || []).map(c => (
                                                <div key={c.id} style={{ display: 'flex', gap: '10px' }}>
                                                    <img src={c.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(c.authorName)}&background=333&color=fff`} alt={c.authorName} style={{ width: '32px', height: '32px', borderRadius: '50%' }} />
                                                    <div style={{ background: 'var(--bg-main)', padding: '10px', borderRadius: '12px', flex: 1 }}>
                                                        <h4 style={{ margin: 0, fontSize: '13px', color: 'var(--text-primary)' }}>{c.authorName}</h4>
                                                        <p style={{ margin: '5px 0 0', fontSize: '14px', color: 'var(--text-secondary)' }}>{c.content}</p>
                                                    </div>
                                                </div>
                                            ))}
                                            {(comments[post.id]?.length === 0) && <p style={{ color: 'var(--text-secondary)', fontSize: '13px', textAlign: 'center' }}>Chưa có bình luận nào. Hãy là người đầu tiên!</p>}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </main>

                {/* Right Sidebar */}
                <aside className="community-sidebar-right">
                    <div className="sidebar-card">
                        <h3 className="sidebar-title"><Flame size={20} color="#ea580c" /> Trending Topics</h3>
                        {trendingTopics.length > 0 ? (
                            trendingTopics.map((topic, idx) => (
                                <div key={idx} className="topic-item">
                                    <div className="topic-tag">{topic.tag}</div>
                                    <div className="topic-title">Chủ đề được quan tâm</div>
                                    <div className="topic-stats">{topic.count} bài viết</div>
                                </div>
                            ))
                        ) : (
                            <p style={{ color: 'var(--text-secondary)', fontSize: '13px', textAlign: 'center', marginTop: '10px' }}>Chưa có xu hướng nào nổi bật.</p>
                        )}
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
