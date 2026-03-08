import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const OAuth2RedirectHandler = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Lấy token từ URL query parameter (e.g. ?token=xxxxx)
        const params = new URLSearchParams(location.search);
        const token = params.get('token');

        if (token) {
            // Lưu JWT token vào localStorage của trình duyệt
            localStorage.setItem('jwtToken', token);
            // Có thể Decode JWT để lấy tên/email lưu vào localStorage (tuỳ ý)

            // Xoá thông tin token trên thanh địa chỉ URL và dọn dẹp chuyển sang trang chủ
            navigate('/', { replace: true });
        } else {
            // Nếu có lỗi, chuyển về trang login
            navigate('/login', { replace: true });
        }
    }, [navigate, location]);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
            <h2>Đang xác thực đăng nhập...</h2>
            <p>Vui lòng chờ trong giây lát.</p>
        </div>
    );
};

export default OAuth2RedirectHandler;
