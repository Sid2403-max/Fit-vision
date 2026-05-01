import { useState } from 'react';
import Header from './components/Header';
import Storefront from './components/Storefront';
import VirtualTryOnModal from './components/VirtualTryOnModal';
import ProductDetailModal from './components/ProductDetailModal';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';
import CartSidebar from './components/CartSidebar';
import WishlistSidebar from './components/WishlistSidebar';
import CheckoutModal from './components/CheckoutModal';
import SocialProofEngine from './components/SocialProofEngine';
import SizePredictorModal from './components/SizePredictorModal';
import FashionChatbot from './components/FashionChatbot';
import StyleDNAQuiz from './components/StyleDNAQuiz';
import SkinToneAnalyzer from './components/SkinToneAnalyzer';

function App() {
  const [activeItem, setActiveItem] = useState(null);
  const [detailItem, setDetailItem] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);
  const [checkoutItem, setCheckoutItem] = useState(null);
  const [sizeProduct, setSizeProduct] = useState(null);
  const [showStyleDNA, setShowStyleDNA] = useState(false);
  const [showSkinTone, setShowSkinTone] = useState(false);
  const [dnaProfile, setDnaProfile] = useState(null); // for AI size predictor

  const handleTryOn = (item) => setActiveItem(item);
  const handleCloseTryOn = () => setActiveItem(null);
  const handleViewDetail = (item) => setDetailItem(item);
  const handleBuyNow = (item) => { setActiveItem(null); setCheckoutItem(item); };

  return (
    <div className="app-container">
      {/* Global FOMO notifications */}
      <SocialProofEngine />

      <Header
        onLoginClick={() => setShowLogin(true)}
        onCartClick={() => setShowCart(true)}
        onWishlistClick={() => setShowWishlist(true)}
      />

      <main className="main-content">
        <Storefront
          onTryOn={handleTryOn}
          onViewDetail={handleViewDetail}
          onSizePredict={(product) => setSizeProduct(product)}
          onStyleDNA={() => setShowStyleDNA(true)}
          onSkinTone={() => setShowSkinTone(true)}
          dnaProfile={dnaProfile}
        />
      </main>

      <Footer />

      {/* Floating AI Chatbot */}
      <FashionChatbot />

      {/* Modals */}
      {activeItem && (
        <VirtualTryOnModal
          item={activeItem}
          onClose={handleCloseTryOn}
          onBuyNow={() => handleBuyNow(activeItem)}
          onSizePredict={() => setSizeProduct(activeItem)}
        />
      )}

      {detailItem && (
        <ProductDetailModal
          product={detailItem}
          onClose={() => setDetailItem(null)}
          onTryOn={(item) => { setDetailItem(null); handleTryOn(item); }}
          onSizePredict={(p) => setSizeProduct(p)}
        />
      )}

      {sizeProduct && (
        <SizePredictorModal
          product={sizeProduct}
          onClose={() => setSizeProduct(null)}
        />
      )}

      {showStyleDNA && (
        <StyleDNAQuiz
          onClose={() => setShowStyleDNA(false)}
          onDNAComplete={(profile) => { setDnaProfile(profile); setShowStyleDNA(false); }}
        />
      )}

      {showSkinTone && <SkinToneAnalyzer onClose={() => setShowSkinTone(false)} />}

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}

      {showCart && (
        <CartSidebar
          onClose={() => setShowCart(false)}
          onCheckout={() => { setShowCart(false); setCheckoutItem({ name: 'Cart Items', isCart: true }); }}
        />
      )}

      {showWishlist && <WishlistSidebar onClose={() => setShowWishlist(false)} />}
      {checkoutItem && <CheckoutModal item={checkoutItem} onClose={() => setCheckoutItem(null)} />}
    </div>
  );
}

export default App;
