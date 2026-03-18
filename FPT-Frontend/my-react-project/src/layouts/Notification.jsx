import { useState, useRef, useEffect } from 'react';

import '../css/notification.css'; 

export default function Notification() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
        if (containerRef.current && !containerRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Dữ liệu mẫu
  const [notifications] = useState([
    { id: 1, title: "Đã đến giờ uống nước!", time: "10 phút trước" },
    { id: 2, title: "Bạn đã đạt mục tiêu Calo hôm nay 🥗", time: "2 giờ trước" }
  ]);

  return (
    <div className="notification-container" ref={containerRef}>
      
      {/* Nút Chuông */}
      <button className="bell-btn" onClick={() => setIsOpen(!isOpen)}>
        🔔 {/* Bạn có thể thay bằng thẻ <svg> hoặc <i class="..."> icon chuông của bạn ở đây */}
        
        {notifications.length > 0 && (
          <span className="badge">
            {notifications.length}
          </span>
        )}
      </button>

      {/* Bảng Dropdown Thông Báo */}
      {isOpen && (
        <div className="dropdown-menu">
          <div className="dropdown-header">Thông báo</div>

          <div>
            {notifications.length === 0 ? (
              <div className="dropdown-empty">
                Không có thông báo nào.
              </div>
            ) : (
              <ul className="dropdown-list">
                {notifications.map((note) => (
                  <li key={note.id} className="dropdown-item">
                    <div className="item-title">{note.title}</div>
                    <div className="item-time">{note.time}</div>
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