import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null,
      errorInfo: null 
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    console.error("🔴 ErrorBoundary captured an error:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '50px 20px',
          margin: '40px auto',
          maxWidth: '600px',
          backgroundColor: '#0d253f', 
          color: '#ffffff',
          borderRadius: '12px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
          border: '1px solid #e50914',
          textAlign: 'center',
          fontFamily: 'inherit'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '15px' }}>🎬⚠️</div>
          
          <h3 style={{ color: '#e50914', marginBottom: '10px', fontSize: '22px', fontWeight: '700' }}>
            Đã xảy ra sự cố !
          </h3>
          
          <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '20px', lineHeight: '1.6', maxWidth: '480px' }}>
            {this.state.error?.message || 'Lỗi khi xử lý giao diện.'}
          </p>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button 
              onClick={this.handleReset}
              style={{
                padding: '10px 20px',
                backgroundColor: '#01b4e4',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '14px',
                transition: 'background 0.2s'
              }}
            >
              Thử tải lại 
            </button>

            <button 
              onClick={() => window.location.href = '/'}
              style={{
                padding: '10px 20px',
                backgroundColor: 'transparent',
                color: '#cbd5e1',
                border: '1px solid #475569',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '14px'
              }}
            >
              Về trang chủ
            </button>
          </div>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;