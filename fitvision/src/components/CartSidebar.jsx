import { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

export default function CartSidebar({ onClose, onCheckout }) {
  const { cart, removeFromCart } = useContext(AppContext);
  const [testingCoupons, setTestingCoupons] = useState(false);
  const [couponStatus, setCouponStatus] = useState('');
  const [discount, setDiscount] = useState(0);

  const testCoupons = () => {
    if (cart.length === 0 || discount > 0) return;
    setTestingCoupons(true);
    setCouponStatus('Finding coupons...');
    
    const codes = ['TESTING: SAVE10', 'TESTING: AXIS50', 'TESTING: FIT20', 'TESTING: FIRSTUSER', '✅ APPLIED: DEALMELA20'];
    let i = 0;
    
    const interval = setInterval(() => {
      setCouponStatus(codes[i]);
      if (i === codes.length - 1) {
        clearInterval(interval);
        setTestingCoupons(false);
        setDiscount(0.20); // 20% discount
      }
      i++;
    }, 500);
  };

  const subTotal = cart.reduce((sum, item) => sum + (item.price || 0), 0);
  const discountAmount = Math.floor(subTotal * discount);
  const total = subTotal - discountAmount;

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
            {/* Auto-Coupon UI */}
            <div style={{background: '#f5f9ff', border: '1px dashed #2874f0', borderRadius: '4px', padding: '10px', marginBottom: '15px', textAlign: 'center'}}>
              {discount > 0 ? (
                <div style={{color: '#388e3c', fontWeight: 'bold', fontSize: '14px'}}>
                  {couponStatus} <br/>
                  <span style={{color: '#212121', fontWeight: 500, marginTop: '5px', display: 'inline-block'}}>You saved ₹{discountAmount}! 🎉</span>
                </div>
              ) : (
                <button 
                  className="btn btn-secondary" 
                  style={{width: '100%', background: testingCoupons ? '#e0e0e0' : 'white', color: testingCoupons ? '#212121' : '#2874f0', border: testingCoupons ? 'none' : '1px solid #2874f0', transition: 'all 0.3s'}}
                  onClick={testCoupons}
                  disabled={testingCoupons}
                >
                  {testingCoupons ? couponStatus : '✨ Auto-Apply Best Coupon'}
                </button>
              )}
            </div>

            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px', color: '#878787'}}>
              <span>Subtotal</span>
              <span>₹{subTotal}</span>
            </div>
            {discount > 0 && (
              <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px', color: '#388e3c'}}>
                <span>Discount Applied</span>
                <span>-₹{discountAmount}</span>
              </div>
            )}
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '15px', fontSize: '18px', fontWeight: 500, borderTop: '1px dashed #e0e0e0', paddingTop: '10px'}}>
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
