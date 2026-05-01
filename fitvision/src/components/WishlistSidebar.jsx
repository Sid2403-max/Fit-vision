import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export default function WishlistSidebar({ onClose }) {
  const { wishlist, toggleWishlist, addToCart } = useContext(AppContext);

  return (
    <div className="sidebar-overlay" onClick={onClose}>
      <div className="sidebar-content" onClick={e => e.stopPropagation()}>
        <div className="sidebar-header">
          <span>❤️ My Wishlist ({wishlist.length})</span>
          <button className="modal-close" style={{position:'static'}} onClick={onClose}>×</button>
        </div>

        <div className="cart-items">
          {wishlist.length === 0 ? (
            <div style={{textAlign:'center', marginTop:'50px', color:'#878787'}}>
              <div style={{fontSize:'4rem', marginBottom:'20px'}}>🤍</div>
              <h3>Your wishlist is empty!</h3>
              <p>Save items you love to your wishlist.</p>
              <button className="btn btn-primary" style={{marginTop:'20px'}} onClick={onClose}>Explore Now</button>
            </div>
          ) : (
            wishlist.map((item, i) => (
              <div key={i} className="cart-item">
                <div style={{width:'70px', height:'80px', flexShrink:0, overflow:'hidden', borderRadius:'4px', background:'#f1f3f6'}}>
                  {item.image
                    ? <img src={item.image} alt={item.name} style={{width:'100%', height:'100%', objectFit:'cover'}} />
                    : <span style={{fontSize:'2.5rem'}}>{item.icon}</span>
                  }
                </div>
                <div style={{flex:1}}>
                  <div style={{fontWeight:500, fontSize:'14px', marginBottom:'4px'}}>{item.name}</div>
                  <div style={{fontSize:'16px', fontWeight:500, marginBottom:'8px'}}>₹{item.price}</div>
                  <div style={{display:'flex', gap:'8px'}}>
                    <button className="btn btn-primary" style={{padding:'5px 10px', fontSize:'12px'}} onClick={() => addToCart(item)}>
                      Add to Cart
                    </button>
                    <button style={{color:'#ff6161', background:'none', fontWeight:500, fontSize:'12px'}} onClick={() => toggleWishlist(item)}>
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
