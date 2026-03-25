import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../pages/AuthContext';
import toast from 'react-hot-toast';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { isAuthenticated, isLoading, user } = useAuth();
    const location = useLocation();

    if (isLoading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: 'var(--bg-main)' }}>
                <div style={{ width: '40px', height: '40px', border: '4px solid var(--border-color)', borderTop: '4px solid var(--primary)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
            </div>
        );
    }

    if (!isAuthenticated) {
        toast.error("Vui lòng đăng nhập để tiếp tục!", { id: "auth-guard-unauth" });
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (allowedRoles && allowedRoles.length > 0) {
        // user.role should match requested roles
        const userRole = user?.role?.replace('ROLE_', '');
        if (!userRole || !allowedRoles.includes(userRole)) {
            toast.error("Bạn không có quyền truy cập trang này!", { id: "auth-guard-forbidden" });
            return <Navigate to="/" replace />;
        }
    }

    return children;
};

export default ProtectedRoute;
