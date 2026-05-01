import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export default function Header({ onLoginClick, onCartClick, onWishlistClick }) {
  const { user, logout, cart, wishlist, searchQuery, setSearchQuery } = useContext(AppContext);

  return (
    <>
      <header className="header-wrapper">
        <div className="header-inner">
          <div className="logo-section">
            <span className="logo-text">FitVision</span>
            <span className="logo-subtext">Explore <span>Plus</span> ✨</span>
          </div>
          
          <div className="search-bar">
            <input
              type="text"
              className="search-input"
              placeholder="Search for products, brands and more"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            <button className="search-btn">
              <svg width="20" height="20" viewBox="0 0 17 18" xmlns="http://www.w3.org/2000/svg"><g fill="#2874F1" fillRule="evenodd"><path d="m11.618 9.897l4.225 4.212c.092.09.1.23.02.313l-1.465 1.46c-.08.08-.222.072-.314-.02L9.868 11.66M6.486 10.9c-2.42 0-4.38-1.956-4.38-4.368C2.105 4.12 4.065 2.16 6.486 2.16s4.38 1.956 4.38 4.368c0 2.412-1.96 4.368-4.38 4.368m0-10.8C2.904.1 0 2.99 0 6.53c0 3.54 2.904 6.43 6.486 6.43 3.582 0 6.486-2.89 6.486-6.43C12.972 2.99 10.068.1 6.486.1"></path></g></svg>
            </button>
          </div>

          <div className="header-actions">
            {user ? (
              <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
                <span style={{fontWeight: 500}}>Hi, {user.name.split(' ')[0]}</span>
                <button onClick={logout} style={{background: 'none', color: 'white', textDecoration: 'underline', fontSize: '13px'}}>Logout</button>
              </div>
            ) : (
              <button className="login-btn" onClick={onLoginClick}>Login</button>
            )}
            <span className="action-link">Become a Seller</span>
            <span className="action-link" onClick={onWishlistClick} style={{position:'relative'}}>
              ♡ Wishlist
              {wishlist.length > 0 && <span className="cart-badge">{wishlist.length}</span>}
            </span>
            <span className="action-link" onClick={onCartClick} style={{position:'relative'}}>
              🛒 Cart
              {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
            </span>
          </div>
        </div>
      </header>
      
      <div className="secondary-nav">
        <div className="container nav-categories">
          <span className="nav-cat">Top Offers</span>
          <span className="nav-cat">Mobiles</span>
          <span className="nav-cat">Electronics</span>
          <span className="nav-cat">TVs &amp; Appliances</span>
          <span className="nav-cat" style={{color: '#2874f0', fontWeight: 'bold'}}>Fashion Try-On ✨</span>
          <span className="nav-cat">Beauty</span>
          <span className="nav-cat">Home &amp; Kitchen</span>
          <span className="nav-cat">Furniture</span>
          <span className="nav-cat">Grocery</span>
        </div>
      </div>
    </>
  );
}
