import { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';

export default function LoginModal({ onClose }) {
  const { login } = useContext(AppContext);
  const [email, setEmail] = useState('test@fitvision.com');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const API = import.meta.env.VITE_API_URL || '';
      const response = await fetch(`${API}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      
      if (data.success) {
        login(data.user);
        onClose();
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Network error. Is the backend running?');
    }
    setLoading(false);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content auth-container" onClick={e => e.stopPropagation()} style={{maxWidth: '750px', padding: 0}}>
        <button className="modal-close" onClick={onClose} style={{color: 'white', zIndex: 10, right: 'auto', left: '100%', top: '0', background: 'transparent'}}>×</button>
        
        <div className="auth-left">
          <h2 style={{fontSize: '28px', marginBottom: '15px', fontWeight: 500}}>Login</h2>
          <p style={{fontSize: '18px', color: '#dbdbdb', lineHeight: 1.5}}>
            Get access to your Orders, Wishlist and Recommendations
          </p>
          <div style={{marginTop: 'auto', textAlign: 'center', fontSize: '6rem'}}>🛒</div>
        </div>
        
        <div className="auth-right">
          <form onSubmit={handleLogin}>
            {error && <div style={{color: 'red', marginBottom: '15px', fontSize: '14px'}}>{error}</div>}
            
            <input 
              type="text" 
              className="auth-input" 
              placeholder="Enter Email/Mobile number" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <input 
              type="password" 
              className="auth-input" 
              placeholder="Enter Password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            
            <p style={{fontSize: '12px', color: '#878787', marginBottom: '20px'}}>
              By continuing, you agree to FitVision's Terms of Use and Privacy Policy.
            </p>
            
            <button type="submit" className="btn btn-secondary" style={{width: '100%'}}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div style={{textAlign: 'center', marginTop: '20px'}}>
            <span style={{color: '#2874f0', fontWeight: 500, fontSize: '14px', cursor: 'pointer'}}>New to FitVision? Create an account</span>
          </div>
        </div>
      </div>
    </div>
  )
}
