import { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';

export default function CheckoutModal({ item, onClose }) {
  const { user, clearCart } = useContext(AppContext);
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('UPI');

  const handleComplete = () => {
    if (item.isCart) {
      clearCart();
    }
    setStep(3); // Success
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{background: '#f1f3f6'}}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        <div style={{padding: '15px 20px', background: 'var(--nav-primary)', color: 'white', fontSize: '20px', fontWeight: 500}}>
          Secure Checkout
        </div>

        {step === 3 ? (
          <div style={{padding: '50px', textAlign: 'center', background: 'white', minHeight: '400px'}}>
            <div style={{fontSize: '5rem', color: '#388e3c', marginBottom: '20px'}}>✅</div>
            <h2 style={{color: '#212121', marginBottom: '10px'}}>Order Placed Successfully!</h2>
            <p style={{color: '#878787'}}>Thank you for shopping with FitVision.</p>
            <p style={{marginTop: '10px'}}>Your order will be delivered to the registered address in 3-5 business days.</p>
            <button className="btn btn-primary" style={{marginTop: '30px'}} onClick={onClose}>Continue Shopping</button>
          </div>
        ) : (
          <div className="checkout-steps">
            
            {/* Step 1: Login / Delivery */}
            <div className="checkout-step">
              <div className="step-header">
                <span className={`step-number ${step === 1 ? 'active' : ''}`}>1</span>
                DELIVERY ADDRESS
              </div>
              {step === 1 && (
                <div style={{paddingLeft: '40px'}}>
                  <p style={{fontWeight: 500, marginBottom: '10px'}}>{user ? user.name : 'Guest User'}</p>
                  <p style={{color: '#212121', fontSize: '14px', lineHeight: 1.5, marginBottom: '20px'}}>
                    Buildings Alyssa, Begonia & Clove Embassy Tech Village,<br/>
                    Outer Ring Road, Devarabeesanahalli Village,<br/>
                    Bengaluru, Karnataka - 560103
                  </p>
                  <button className="btn btn-secondary" onClick={() => setStep(2)}>DELIVER HERE</button>
                </div>
              )}
              {step > 1 && (
                <div style={{paddingLeft: '40px', fontSize: '14px'}}>
                  <span style={{fontWeight: 500}}>{user ? user.name : 'Guest User'}</span> - Bengaluru, 560103
                </div>
              )}
            </div>

            {/* Step 2: Payment Options */}
            <div className="checkout-step">
              <div className="step-header">
                <span className={`step-number ${step === 2 ? 'active' : ''}`}>2</span>
                PAYMENT OPTIONS
              </div>
              {step === 2 && (
                <div style={{paddingLeft: '40px'}}>
                  <div style={{marginBottom: '20px'}}>
                    <label style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px', cursor: 'pointer'}}>
                      <input type="radio" name="payment" checked={paymentMethod === 'UPI'} onChange={() => setPaymentMethod('UPI')} />
                      <span>UPI (Google Pay, PhonePe)</span>
                    </label>
                    <label style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px', cursor: 'pointer'}}>
                      <input type="radio" name="payment" checked={paymentMethod === 'Card'} onChange={() => setPaymentMethod('Card')} />
                      <span>Credit / Debit / ATM Card</span>
                    </label>
                    <label style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px', cursor: 'pointer'}}>
                      <input type="radio" name="payment" checked={paymentMethod === 'COD'} onChange={() => setPaymentMethod('COD')} />
                      <span>Cash on Delivery</span>
                    </label>
                  </div>
                  
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', borderTop: '1px solid #f0f0f0', paddingTop: '20px'}}>
                    <span style={{fontSize: '18px', fontWeight: 500}}>Amount Payable: ₹{item.price || item.total || '---'}</span>
                    <button className="btn btn-secondary" onClick={handleComplete}>CONFIRM ORDER</button>
                  </div>
                </div>
              )}
            </div>

          </div>
        )}
      </div>
    </div>
  )
}
