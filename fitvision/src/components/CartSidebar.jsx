import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export default function CartSidebar({ onClose, onCheckout }) {
  const { cart, removeFromCart } = useContext(AppContext);

  const total = cart.reduce((sum, item) => sum + (item.price || 0), 0);

  return (
    <div className="sidebar-overlay" onClick={onClose}>
      <div className="sidebar-content" onClick={e => e.stopPropagation()}>
        <div className="sidebar-header">
          <span>My Cart ({cart.length})</span>
          <button className="modal-close" style={{position: 'static'}} onClick={onClose}>×</button>
        </div>

        <div className="cart-items">
          {cart.length === 0 ? (
            <div style={{textAlign: 'center', marginTop: '50px', color: '#878787'}}>
              <div style={{fontSize: '4rem', marginBottom: '20px'}}>🛒</div>
              <h3>Your cart is empty!</h3>
              <p>Add items to it now.</p>
              <button className="btn btn-primary" style={{marginTop: '20px'}} onClick={onClose}>Shop Now</button>
            </div>
          ) : (
            cart.map((item, index) => (
              <div key={index} className="cart-item">
                <div style={{width: '60px', height: '80px', flexShrink: 0, overflow: 'hidden', borderRadius: '4px', background: '#f1f3f6', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  {item.image ? (
                    <img src={item.image} alt={item.name} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                  ) : (
                    <span style={{fontSize: '2rem'}}>{item.icon || '🛍️'}</span>
                  )}
                </div>
                <div style={{flex: 1}}>
                  <div style={{fontWeight: 500, fontSize: '14px', marginBottom: '5px'}}>{item.name}</div>
                  <div style={{color: '#878787', fontSize: '12px'}}>Size: M</div>
                  <div style={{fontWeight: 500, fontSize: '16px', marginTop: '10px'}}>₹{item.price}</div>
                </div>
                <button 
                  style={{color: '#ff6161', background: 'none', fontWeight: 500, alignSelf: 'flex-start'}}
                  onClick={() => removeFromCart(index)}
                >
                  REMOVE
                </button>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="sidebar-footer">
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '15px', fontSize: '18px', fontWeight: 500}}>
              <span>Total Amount</span>
              <span>₹{total}</span>
            </div>
            <button className="btn btn-secondary" style={{width: '100%'}} onClick={onCheckout}>
              PLACE ORDER
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
