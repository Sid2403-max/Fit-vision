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
  const { addToCart, toggleWishlist, isWishlisted } = useContext(AppContext);
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
                <div key={i} style={{width:'60px', height:'60px', border:'2px solid ' + (i===0 ? '#2874f0' : '#e0e0e0'), borderRadius:'4px', overflow:'hidden', cursor:'pointer'}}>
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
              <span style={{background:'#388e3c', color:'white', padding:'3px 8px', borderRadius:'3px', fontSize:'13px', fontWeight:'bold'}}>{product.rating} ★</span>
              <span style={{color:'#878787', fontSize:'13px'}}>{product.reviews?.toLocaleString()} Ratings</span>
              <span style={{color:'#878787'}}>|</span>
              <span style={{color:'#878787', fontSize:'13px'}}>Flipkart Assured ✅</span>
            </div>

            <div style={{borderTop:'1px solid #f0f0f0', borderBottom:'1px solid #f0f0f0', padding:'14px 0', margin:'12px 0'}}>
              <div style={{fontSize:'28px', fontWeight:500}}>₹{product.price}</div>
              <div style={{color:'#388e3c', fontSize:'14px', fontWeight:500}}>{product.discount} — Extra 10% off with Axis Bank Card</div>
            </div>

            {/* Size Selection */}
            <div style={{marginBottom:'16px'}}>
              <div style={{fontWeight:500, marginBottom:'8px'}}>Select Size</div>
              <div style={{display:'flex', gap:'10px', flexWrap:'wrap'}}>
                {SIZES.map(size => (
                  <button key={size} style={{
                    padding:'8px 14px', border:'1px solid #e0e0e0', borderRadius:'2px',
                    background: size === 'M' ? '#2874f0' : 'white',
                    color: size === 'M' ? 'white' : '#212121',
                    fontWeight: size === 'M' ? '600' : '400', cursor:'pointer'
                  }}>{size}</button>
                ))}
              </div>
              <div style={{fontSize:'12px', color:'#2874f0', marginTop:'8px', cursor:'pointer'}}>Size Chart &gt;</div>
            </div>

            {/* Offers */}
            <div style={{background:'#f5f9ff', border:'1px solid #dbe9ff', borderRadius:'4px', padding:'14px', marginBottom:'16px'}}>
              <div style={{fontWeight:500, marginBottom:'8px'}}>Available Offers</div>
              <div style={{fontSize:'13px', display:'flex', flexDirection:'column', gap:'6px'}}>
                <div>🏦 5% Cashback on Flipkart Axis Bank Card</div>
                <div>💰 Extra 10% off (price inclusive of cashback)</div>
                <div>🚚 Free Delivery on orders above ₹499</div>
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
                    <span style={{background:'#388e3c', color:'white', padding:'2px 6px', borderRadius:'3px', fontSize:'12px'}}>{r.rating} ★</span>
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
