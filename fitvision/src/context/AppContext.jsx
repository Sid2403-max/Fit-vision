import { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isPremium, setIsPremium] = useState(false);

  // Load from local storage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('fitvision_user');
    const savedCart = localStorage.getItem('fitvision_cart');
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedCart) setCart(JSON.parse(savedCart));
    const savedWishlist = localStorage.getItem('fitvision_wishlist');
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    const savedPremium = localStorage.getItem('fitvision_premium');
    if (savedPremium) setIsPremium(JSON.parse(savedPremium));
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('fitvision_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('fitvision_user');
  };

  const addToCart = (product) => {
    setCart((prev) => {
      const newCart = [...prev, product];
      localStorage.setItem('fitvision_cart', JSON.stringify(newCart));
      return newCart;
    });
  };

  const removeFromCart = (index) => {
    setCart((prev) => {
      const newCart = prev.filter((_, i) => i !== index);
      localStorage.setItem('fitvision_cart', JSON.stringify(newCart));
      return newCart;
    });
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('fitvision_cart');
  };

  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.some(p => p.id === product.id);
      const newList = exists ? prev.filter(p => p.id !== product.id) : [...prev, product];
      localStorage.setItem('fitvision_wishlist', JSON.stringify(newList));
      return newList;
    });
  };

  const isWishlisted = (productId) => wishlist.some(p => p.id === productId);

  const togglePremium = () => {
    setIsPremium((prev) => {
      const newState = !prev;
      localStorage.setItem('fitvision_premium', JSON.stringify(newState));
      return newState;
    });
  };

  return (
    <AppContext.Provider value={{ user, login, logout, cart, addToCart, removeFromCart, clearCart, wishlist, toggleWishlist, isWishlisted, searchQuery, setSearchQuery, isPremium, togglePremium }}>
      {children}
    </AppContext.Provider>
  );
}
