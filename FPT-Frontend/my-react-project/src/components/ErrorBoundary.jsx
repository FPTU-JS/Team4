import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', fontFamily: 'monospace', color: '#fff', backgroundColor: '#991b1b', height: '100vh', width: '100vw', boxSizing: 'border-box', overflowY: 'auto' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', borderBottom: '2px solid #ef4444', paddingBottom: '0.5rem' }}>
            🚨 Ôi hỏng! Ứng dụng đã bị Crash (Sập ngầm)
          </h2>
          <p style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>
            Đây chính là màn hình bắt lỗi trực quan thay vì bị màn hình trắng xóa! Hãy chụp ảnh màn hình này gửi lên nhóm để fix ngay nhé!
          </p>
          <div style={{ backgroundColor: '#7f1d1d', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#fca5a5' }}>Chi tiết Lỗi:</h3>
            <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
              {this.state.error && this.state.error.toString()}
            </pre>
          </div>
          
          <div style={{ backgroundColor: '#7f1d1d', padding: '1rem', borderRadius: '8px' }}>
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#fca5a5' }}>Vị trí cụ thể (Component Stack):</h3>
            <pre style={{ margin: 0, whiteSpace: 'pre-wrap', fontSize: '0.85rem' }}>
              {this.state.errorInfo && this.state.errorInfo.componentStack}
            </pre>
          </div>
          <button 
            onClick={() => { localStorage.clear(); window.location.href = '/'; }} 
            style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
            Xóa LocalStorage & Tải lại trang (Thử khắc phục)
          </button>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
