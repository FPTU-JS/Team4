import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../pages/AuthContext';
import api from '../utils/axiosConfig';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { Bell } from 'lucide-react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import '../css/notification.css'; 

export default function Notification() {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);
    const { user, isAuthenticated } = useAuth();
    const [notifications, setNotifications] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (!isAuthenticated || !user?.id) return;
        
        const fetchNotifications = async () => {
            try {
                const res = await api.get(`/api/notifications?userId=${user.id}`);
                setNotifications(res.data);
            } catch (err) {
                console.error("Failed to fetch notifications", err);
            }
        };
        fetchNotifications();
    }, [isAuthenticated, user]);

    useEffect(() => {
        if (!isAuthenticated || !user?.id) return;

        const socket = new SockJS('http://localhost:8081/ws');
        const stompClient = new Client({
            webSocketFactory: () => socket,
            onConnect: () => {
                stompClient.subscribe(`/topic/notifications/${user.id}`, (message) => {
                    if (message.body) {
                        const notif = JSON.parse(message.body);
                        setNotifications(prev => [notif, ...prev]);
                        toast(notif.message, {
                            icon: '🔔',
                            id: `notif-${notif.id}`
                        });
                    }
                });
            }
        });
        stompClient.activate();
        return () => {
            if (stompClient.active) stompClient.deactivate();
        }
    }, [isAuthenticated, user]);

    const unreadCount = notifications.filter(n => !n.read).length;

    const handleNotificationClick = async (notif) => {
        if (!notif.read) {
            try {
                await api.put(`/api/notifications/${notif.id}/read`);
                setNotifications(prev => prev.map(n => n.id === notif.id ? { ...n, read: true } : n));
            } catch (err) {
                console.error("Failed to mark read", err);
            }
        }
        setIsOpen(false);
        if (notif.link) {
            navigate(notif.link);
        }
    };

    const formatTime = (isoString) => {
        if (!isoString) return "Vừa xong";
        const date = new Date(isoString);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    };

    return (
        <div className="notification-container" ref={containerRef} style={{ position: 'relative' }}>
            <button className="bell-btn" onClick={() => setIsOpen(!isOpen)} style={{ border: 'none', background: 'transparent', cursor: 'pointer', position: 'relative', display: 'flex', alignItems: 'center' }}>
                <Bell size={24} color="var(--text-primary, #333)" />
                {unreadCount > 0 && (
                    <span className="badge" style={{ position: 'absolute', top: '-5px', right: '-5px', background: '#ef4444', color: 'white', fontSize: '10px', padding: '2px 6px', borderRadius: '10px', fontWeight: 'bold' }}>
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="dropdown-menu" style={{ position: 'absolute', right: 0, top: '40px', width: '320px', background: 'white', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', borderRadius: '12px', zIndex: 1000, overflow: 'hidden' }}>
                    <div className="dropdown-header" style={{ padding: '15px', fontWeight: 'bold', borderBottom: '1px solid #e5e7eb', fontSize: '16px' }}>
                        Thông báo
                    </div>
                    <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                        {notifications.length === 0 ? (
                            <div className="dropdown-empty" style={{ padding: '20px', textAlign: 'center', color: '#6b7280', fontSize: '14px' }}>
                                Chưa có thông báo nào.
                            </div>
                        ) : (
                            <ul className="dropdown-list" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                {notifications.map((note) => (
                                    <li 
                                        key={note.id} 
                                        className="dropdown-item" 
                                        style={{ padding: '15px', borderBottom: '1px solid #f3f4f6', cursor: 'pointer', background: note.read ? 'transparent' : '#f0fdf4', display: 'flex', flexDirection: 'column', gap: '5px' }}
                                        onClick={() => handleNotificationClick(note)}
                                    >
                                        <div className="item-title" style={{ fontSize: '14px', fontWeight: note.read ? 'normal' : '600', color: '#111827' }}>
                                            {note.message}
                                        </div>
                                        <div className="item-time" style={{ fontSize: '12px', color: '#6b7280' }}>
                                            {formatTime(note.createdAt)}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}