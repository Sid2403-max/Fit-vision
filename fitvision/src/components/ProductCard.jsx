import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export default function ProductCard({ product, onTryOn, onViewDetail }) {
  const { toggleWishlist, isWishlisted } = useContext(AppContext);
  const wishlisted = isWishlisted(product.id);

  return (
    <div className="product-card card" onClick={() => onViewDetail && onViewDetail(product)}>
      <button
        className="wishlist-btn"
        onClick={e => { e.stopPropagation(); toggleWishlist(product); }}
        title={wishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
      >
        {wishlisted ? '❤️' : '🤍'}
      </button>

      <div className="product-image-container">
        {product.image ? (
          <img src={product.image} alt={product.name} className="product-image" />
        ) : (
          <div style={{fontSize: '6rem'}}>{product.icon}</div>
        )}
      </div>
      
      <h3 className="product-title">{product.name}</h3>
      <div style={{display:'flex', alignItems:'center', gap:'6px', justifyContent:'center', marginBottom:'4px'}}>
        <span className="rating-badge">{product.rating} ★</span>
        <span className="product-sub" style={{marginBottom:0}}>{product.reviews?.toLocaleString()} reviews</span>
      </div>
      <div className="product-discount">{product.discount}</div>
      <div className="product-sub">{product.sub}</div>
      
      <button 
        className="btn-tryon" 
        onClick={(e) => {
          e.stopPropagation();
          onTryOn(product);
        }}
      >
        👗 Virtual Try-On
      </button>
    </div>
  );
}
