import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const REVIEWS = [
  { user: 'Priya S.', rating: 5, comment: 'Absolutely love it! The quality is great and fits perfectly. Delivery was super fast.', date: '12 Apr 2025' },
  { user: 'Rahul M.', rating: 4, comment: 'Good product, exactly as shown in the image. The AI try-on feature helped me pick the right size.', date: '3 Apr 2025' },
  { user: 'Ananya K.', rating: 5, comment: 'Premium quality at this price point. Would definitely recommend to friends.', date: '28 Mar 2025' },
  { user: 'Vikram P.', rating: 3, comment: 'Decent product, but took a bit longer to deliver than expected. Quality is okay.', date: '20 Mar 2025' },
];

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

export default function ProductDetailModal({ product, onClose, onTryOn }) {
  const { addToCart, toggleWishlist, isWishlisted, isPremium, togglePremium } = useContext(AppContext);
  const wishlisted = isWishlisted(product.id);

  const stars = (rating) => '★'.repeat(Math.round(rating)) + '☆'.repeat(5 - Math.round(rating));

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{maxWidth:'900px', maxHeight:'90vh', overflowY:'auto'}}>
        <button className="modal-close" onClick={onClose}>×</button>

        <div style={{display:'flex', gap:'0'}}>
          {/* Left: Image Gallery */}
          <div style={{width:'380px', flexShrink:0, padding:'20px', background:'#f1f3f6', display:'flex', flexDirection:'column', alignItems:'center', gap:'10px', borderRight:'1px solid #e0e0e0'}}>
            <div style={{width:'100%', height:'320px', background:'white', display:'flex', alignItems:'center', justifyContent:'center', borderRadius:'4px', overflow:'hidden'}}>
              <img src={product.image} alt={product.name} style={{maxWidth:'100%', maxHeight:'100%', objectFit:'contain'}} />
            </div>
            <div style={{display:'flex', gap:'8px', marginTop:'8px'}}>
              {[product.image, product.image, product.image].map((img, i) => (
                <div key={i} style={{width:'60px', height:'60px', border:'2px solid ' + (i===0 ? 'var(--nav-primary)' : '#e0e0e0'), borderRadius:'4px', overflow:'hidden', cursor:'pointer'}}>
                  <img src={img} alt="" style={{width:'100%', height:'100%', objectFit:'cover'}} />
                </div>
              ))}
            </div>
            <button className="btn btn-secondary" style={{width:'100%', marginTop:'10px'}} onClick={() => onTryOn(product)}>
              ✨ Try On with AI Camera
            </button>
          </div>

          {/* Right: Details */}
          <div style={{flex:1, padding:'24px', overflowY:'auto'}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start'}}>
              <h1 style={{fontSize:'20px', fontWeight:400, lineHeight:1.4, flex:1}}>{product.name}</h1>
              <button onClick={() => toggleWishlist(product)} style={{background:'none', fontSize:'24px', marginLeft:'10px'}}>
                {wishlisted ? '❤️' : '🤍'}
              </button>
            </div>

            <div style={{display:'flex', alignItems:'center', gap:'10px', margin:'10px 0'}}>
              <span style={{background:'var(--text-green)', color:'white', padding:'3px 8px', borderRadius:'3px', fontSize:'13px', fontWeight:'bold'}}>{product.rating} ★</span>
              <span style={{color:'#878787', fontSize:'13px'}}>{product.reviews?.toLocaleString()} Ratings</span>
              <span style={{color:'#878787'}}>|</span>
              <span style={{color:'#878787', fontSize:'13px'}}>Flipkart Assured ✅</span>
            </div>

            <div style={{borderTop:'1px solid #f0f0f0', borderBottom:'1px solid #f0f0f0', padding:'14px 0', margin:'12px 0'}}>
              <div style={{fontSize:'28px', fontWeight:500}}>₹{product.price}</div>
              <div style={{color:'var(--text-green)', fontSize:'14px', fontWeight:500}}>{product.discount} — Extra 10% off with Axis Bank Card</div>
            </div>

            {/* AI Price Insights Graph */}
            <div style={{background: '#fff9e6', border: '1px solid #ffebaf', borderRadius: '4px', padding: '15px', marginBottom: '16px'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px'}}>
                <div style={{fontWeight: 600, fontSize: '14px', color: '#b17b00'}}>📈 AI Price Insights</div>
                <div style={{fontSize: '12px', background: 'var(--text-green)', color: 'white', padding: '2px 6px', borderRadius: '2px', fontWeight: 'bold'}}>Lowest in 90 Days!</div>
              </div>
              
              <div style={{height: '80px', position: 'relative', marginTop: '15px'}}>
                <svg viewBox="0 0 100 40" style={{width: '100%', height: '100%', overflow: 'visible'}}>
                  <polyline 
                    fill="none" 
                    stroke="var(--accent-primary)" 
                    strokeWidth="2" 
                    points="0,10 20,12 40,8 60,15 80,10 100,35" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                  />
                  <circle cx="0" cy="10" r="1.5" fill="var(--accent-primary)" />
                  <circle cx="20" cy="12" r="1.5" fill="var(--accent-primary)" />
                  <circle cx="40" cy="8" r="1.5" fill="var(--accent-primary)" />
                  <circle cx="60" cy="15" r="1.5" fill="var(--accent-primary)" />
                  <circle cx="80" cy="10" r="1.5" fill="var(--accent-primary)" />
                  <circle cx="100" cy="35" r="2.5" fill="var(--text-green)" />
                  
                  {/* Fake Price Labels */}
                  <text x="0" y="5" fontSize="4" fill="#878787">₹{Math.floor(product.price * 1.5)}</text>
                  <text x="85" y="28" fontSize="4" fill="var(--text-green)" fontWeight="bold">₹{product.price}</text>
                  
                  {/* Grid lines */}
                  <line x1="0" y1="35" x2="100" y2="35" stroke="#e0e0e0" strokeWidth="0.5" strokeDasharray="1 1" />
                </svg>
              </div>
              <div style={{fontSize: '12px', color: '#878787', marginTop: '5px', textAlign: 'center'}}>
                Price dropped by 33% due to <b>Deal Mela</b>
              </div>
            </div>

            {/* Size Selection */}
            <div style={{marginBottom:'16px'}}>
              <div style={{fontWeight:500, marginBottom:'8px'}}>Select Size</div>
              <div style={{display:'flex', gap:'10px', flexWrap:'wrap'}}>
                {SIZES.map(size => (
                  <button key={size} style={{
                    padding:'8px 14px', border:'1px solid #e0e0e0', borderRadius:'2px',
                    background: size === 'M' ? 'var(--nav-primary)' : 'white',
                    color: size === 'M' ? 'white' : '#212121',
                    fontWeight: size === 'M' ? '600' : '400', cursor:'pointer'
                  }}>{size}</button>
                ))}
              </div>
              <div style={{fontSize:'12px', color:'var(--nav-primary)', marginTop:'8px', cursor:'pointer'}}>Size Chart &gt;</div>
            </div>

            {/* Offers */}
            <div style={{background:'var(--bg-primary)', border:'1px solid var(--border-color)', borderRadius:'4px', padding:'14px', marginBottom:'16px'}}>
              <div style={{fontWeight:500, marginBottom:'8px'}}>Available Offers</div>
              <div style={{fontSize:'13px', display:'flex', flexDirection:'column', gap:'6px'}}>
                <div>🏦 5% Cashback on Flipkart Axis Bank Card</div>
                <div>💰 Extra 10% off (price inclusive of cashback)</div>
                <div>🚚 Free Delivery on orders above ₹499</div>
              </div>
            </div>

            {/* Shop Details - Premium Feature */}
            <div style={{border: '1px solid #e0e0e0', borderRadius: '4px', padding: '15px', marginBottom: '16px', background: 'white', position: 'relative', overflow: 'hidden'}}>
              <div style={{fontWeight: 500, marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                  <span style={{fontSize: '16px'}}>🏪 Seller Information</span>
                </div>
                {!isPremium && (
                  <span style={{fontSize: '11px', background: 'var(--bg-primary)', color: 'var(--text-secondary)', padding: '2px 6px', borderRadius: '2px', fontWeight: 'bold'}}>PREMIUM ONLY</span>
                )}
              </div>

              <div style={{
                display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: '#424242',
                filter: isPremium ? 'none' : 'blur(4px)',
                userSelect: isPremium ? 'auto' : 'none',
                opacity: isPremium ? 1 : 0.6
              }}>
                <div style={{display: 'flex', alignItems: 'flex-start', gap: '8px'}}>
                  <span style={{fontSize: '16px'}}>📍</span>
                  <div>
                    <span style={{fontWeight: 500}}>Address:</span><br/>
                    {product.shopAddress || '123 Fashion Street, New Delhi, India'}
                  </div>
                </div>
                <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                  <span style={{fontSize: '16px'}}>📞</span>
                  <div>
                    <span style={{fontWeight: 500}}>Contact:</span> {product.shopContact || '+91 98765 43210'}
                  </div>
                </div>
              </div>

              {!isPremium && (
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  background: 'rgba(255, 255, 255, 0.4)', zIndex: 10
                }}>
                  <div style={{fontSize: '24px', marginBottom: '8px'}}>🔒</div>
                  <button 
                    onClick={togglePremium}
                    style={{
                      background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-primary))', color: 'white', border: 'none',
                      padding: '8px 16px', borderRadius: '20px', fontWeight: 'bold', cursor: 'pointer',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.2)', fontSize: '13px'
                    }}
                  >
                    Unlock Premium to View
                  </button>
                </div>
              )}
            </div>

            {/* Competitor Price Check Widget */}
            <div style={{border: '1px solid #e0e0e0', borderRadius: '4px', padding: '15px', marginBottom: '16px', background: 'white'}}>
              <div style={{fontWeight: 500, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px'}}>
                <span style={{fontSize: '16px'}}>🔍 Web Price Check</span>
                <span style={{fontSize: '11px', background: 'var(--bg-primary)', color: 'var(--text-secondary)', padding: '2px 6px', borderRadius: '2px', fontWeight: 'bold', animation: 'pulse 2s infinite'}}>LIVE</span>
              </div>
              
              <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
                {/* FitVision (Current) */}
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '4px'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                    <div style={{width: '20px', height: '20px', background: 'var(--nav-primary)', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold'}}>F</div>
                    <span style={{fontWeight: 500}}>FitVision</span>
                  </div>
                  <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
                    <span style={{fontWeight: 'bold', color: 'var(--text-green)', fontSize: '16px'}}>₹{product.price}</span>
                    <span style={{fontSize: '12px', color: 'white', background: 'var(--text-green)', padding: '3px 8px', borderRadius: '12px', fontWeight: 'bold'}}>Best Deal</span>
                  </div>
                </div>

                {/* Amazon Mock */}
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px', borderBottom: '1px solid #f0f0f0'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                    <div style={{width: '20px', height: '20px', background: 'var(--text-primary)', color: 'var(--accent-primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold'}}>a</div>
                    <span style={{color: '#878787'}}>Amazon</span>
                  </div>
                  <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
                    <span style={{color: '#878787', fontSize: '15px'}}>₹{Math.floor(product.price * 1.25)}</span>
                    <a href="#" onClick={(e) => e.preventDefault()} style={{fontSize: '12px', color: 'var(--nav-primary)', textDecoration: 'none'}}>View</a>
                  </div>
                </div>

                {/* Myntra Mock */}
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                    <div style={{width: '20px', height: '20px', background: 'var(--accent-primary)', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold'}}>M</div>
                    <span style={{color: '#878787'}}>Myntra</span>
                  </div>
                  <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
                    <span style={{color: '#878787', fontSize: '15px'}}>₹{Math.floor(product.price * 1.40)}</span>
                    <a href="#" onClick={(e) => e.preventDefault()} style={{fontSize: '12px', color: 'var(--nav-primary)', textDecoration: 'none'}}>View</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{display:'flex', gap:'10px', marginBottom:'20px'}}>
              <button className="btn btn-primary" style={{flex:1, padding:'14px'}} onClick={() => addToCart(product)}>
                🛒 Add to Cart
              </button>
              <button className="btn btn-secondary" style={{flex:1, padding:'14px'}}>
                ⚡ Buy Now
              </button>
            </div>

            {/* Reviews */}
            <div style={{borderTop:'1px solid #f0f0f0', paddingTop:'16px'}}>
              <h3 style={{fontSize:'18px', fontWeight:500, marginBottom:'16px'}}>Ratings & Reviews</h3>
              {REVIEWS.map((r, i) => (
                <div key={i} style={{borderBottom:'1px solid #f0f0f0', paddingBottom:'14px', marginBottom:'14px'}}>
                  <div style={{display:'flex', alignItems:'center', gap:'10px', marginBottom:'6px'}}>
                    <span style={{background:'var(--text-green)', color:'white', padding:'2px 6px', borderRadius:'3px', fontSize:'12px'}}>{r.rating} ★</span>
                    <span style={{fontWeight:500, fontSize:'14px'}}>{r.user}</span>
                    <span style={{color:'#878787', fontSize:'12px'}}>{r.date}</span>
                  </div>
                  <p style={{fontSize:'14px', color:'#212121'}}>{r.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
