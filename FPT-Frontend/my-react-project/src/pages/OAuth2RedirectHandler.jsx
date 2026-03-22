import React, { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

const OAuth2RedirectHandler = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { oauthLogin } = useAuth();
    const isProcessed = useRef(false);

    useEffect(() => {
        if (isProcessed.current) return;
        isProcessed.current = true;

        // Lấy token từ URL query parameter (e.g. ?token=xxxxx)
        const params = new URLSearchParams(location.search);
        const token = params.get('token');

        if (token) {
            oauthLogin(token);
            navigate('/', { replace: true });
        } else {
            // Nếu có lỗi, chuyển về trang login
            navigate('/login', { replace: true });
        }
    }, [navigate, location, oauthLogin]);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
            <h2>Đang xác thực đăng nhập...</h2>
            <p>Vui lòng chờ trong giây lát.</p>
        </div>
    );
};

export default OAuth2RedirectHandler;
