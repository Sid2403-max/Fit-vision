import { useState, useEffect, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import ProductCard from './ProductCard';
import FlashSaleBanner from './FlashSaleBanner';

const CATEGORIES = ['All', "Men's Wear", "Women's Wear", "Ethnic Wear", "Footwear", "Accessories"];

export default function Storefront({ onTryOn, onViewDetail, onSizePredict, onStyleDNA, onSkinTone, dnaProfile }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState(5000);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('default');

  const { searchQuery } = useContext(AppContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const API = import.meta.env.VITE_API_URL || '';
        const response = await fetch(`${API}/api/products`);
        if (!response.ok) throw new Error('Failed to fetch from backend');
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        console.error('API Error:', err);
        setError('Failed to load products. Make sure the Node.js backend is running on port 5000.');
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Filter & search logic
  let filtered = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        (p.sub && p.sub.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchPrice = p.price <= priceRange;
    const matchRating = p.rating >= minRating;
    return matchSearch && matchPrice && matchRating;
  });

  // Sort
  if (sortBy === 'price_asc') filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sortBy === 'price_desc') filtered = [...filtered].sort((a, b) => b.price - a.price);
  if (sortBy === 'rating') filtered = [...filtered].sort((a, b) => b.rating - a.rating);

  return (
    <div className="storefront">
      <FlashSaleBanner />

      {/* Style DNA + Skin Tone Hero Banner */}
      <div className="dna-hero-banner">
        <div className="dna-hero-left">
          {dnaProfile ? (
            <>
              <div style={{fontSize:'2rem', marginBottom:'8px'}}>{dnaProfile.badge}</div>
              <div style={{fontSize:'13px', color:'rgba(255,255,255,0.6)', letterSpacing:'1px', textTransform:'uppercase', marginBottom:'4px'}}>Your Style DNA</div>
              <div style={{fontSize:'24px', fontWeight:800, marginBottom:'6px'}}>{dnaProfile.name}</div>
              <div style={{fontStyle:'italic', color:'rgba(255,255,255,0.7)', marginBottom:'16px', fontSize:'14px'}}>"{dnaProfile.headline}"</div>
              <div style={{display:'flex', gap:'6px', marginBottom:'16px'}}>
                {dnaProfile.palette.slice(0,5).map((c,i) => <div key={i} style={{width:'24px', height:'24px', borderRadius:'50%', background:c, border:'2px solid rgba(255,255,255,0.3)'}} />)}
              </div>
              <button className="btn btn-secondary" style={{fontSize:'13px', padding:'8px 20px'}} onClick={onStyleDNA}>Retake Quiz ↻</button>
            </>
          ) : (
            <>
              <div style={{fontSize:'3rem', marginBottom:'12px'}}>🧬</div>
              <h2 style={{fontSize:'28px', fontWeight:800, marginBottom:'8px', background:'linear-gradient(135deg,#64b5f6,#ce93d8,#ffb74d)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent'}}>Discover Your Style DNA</h2>
              <p style={{color:'rgba(255,255,255,0.65)', marginBottom:'20px', maxWidth:'360px', lineHeight:1.6}}>Take our 60-second visual quiz and unlock your unique fashion archetype with personalised product recommendations.</p>
              <button className="btn btn-secondary" style={{padding:'12px 32px', fontSize:'15px'}} onClick={onStyleDNA}>
                ✨ Start Style DNA Quiz
              </button>
            </>
          )}
        </div>
        <div className="dna-hero-divider" />
        <div className="dna-hero-right">
          <div style={{fontSize:'2.5rem', marginBottom:'12px'}}>🎨</div>
          <h3 style={{fontSize:'20px', fontWeight:700, marginBottom:'8px'}}>Skin Tone Colour Match</h3>
          <p style={{color:'rgba(255,255,255,0.65)', marginBottom:'20px', maxWidth:'280px', lineHeight:1.5, fontSize:'14px'}}>Snap a selfie. Our AI detects your undertone and shows you exactly which colours will make you look stunning.</p>
          <button
            style={{padding:'10px 24px', background:'rgba(255,183,77,0.2)', border:'1px solid rgba(255,183,77,0.5)', color:'#ffb74d', borderRadius:'4px', fontSize:'14px', cursor:'pointer', fontWeight:600}}
            onClick={onSkinTone}
          >
            🎨 Analyse My Skin Tone
          </button>
        </div>
      </div>

      <div style={{display:'flex', gap:'0', margin:'10px', alignItems:'flex-start'}}>
        {/* Left Filter Panel */}
        <div className="filter-panel">
          <div className="filter-header">Filters</div>

          <div className="filter-section">
            <div className="filter-title">CATEGORY</div>
            {CATEGORIES.map(cat => (
              <label key={cat} className="filter-option">
                <input
                  type="radio"
                  name="category"
                  checked={selectedCategory === cat}
                  onChange={() => setSelectedCategory(cat)}
                />
                <span>{cat}</span>
              </label>
            ))}
          </div>

          <div className="filter-section">
            <div className="filter-title">PRICE</div>
            <div style={{fontSize:'13px', marginBottom:'8px', color:'#212121'}}>Up to ₹{priceRange.toLocaleString()}</div>
            <input
              type="range" min="200" max="5000" step="100"
              value={priceRange}
              onChange={e => setPriceRange(Number(e.target.value))}
              style={{width:'100%', accentColor:'#2874f0'}}
            />
            <div style={{display:'flex', justifyContent:'space-between', fontSize:'11px', color:'#878787'}}>
              <span>₹200</span><span>₹5000</span>
            </div>
          </div>

          <div className="filter-section">
            <div className="filter-title">CUSTOMER RATINGS</div>
            {[4, 3, 2].map(r => (
              <label key={r} className="filter-option">
                <input type="radio" name="rating" checked={minRating === r} onChange={() => setMinRating(r)} />
                <span>{r}★ & above</span>
              </label>
            ))}
            <label className="filter-option">
              <input type="radio" name="rating" checked={minRating === 0} onChange={() => setMinRating(0)} />
              <span>All Ratings</span>
            </label>
          </div>

          <div className="filter-section">
            <div className="filter-title">SORT BY</div>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{width:'100%', padding:'6px', border:'1px solid #e0e0e0', borderRadius:'2px'}}>
              <option value="default">Relevance</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="rating">Best Rating</option>
            </select>
          </div>
        </div>

        {/* Main Product Area */}
        <div style={{flex:1}}>
          {loading ? (
            <div style={{textAlign:'center', padding:'50px'}}>
              <div className="spinner" style={{fontSize:'3rem'}}>⌛</div>
              <p style={{marginTop:'10px'}}>Loading products from server...</p>
            </div>
          ) : error ? (
            <div style={{background:'#ffebee', color:'#c62828', padding:'20px', borderRadius:'4px'}}>{error}</div>
          ) : filtered.length === 0 ? (
            <div style={{textAlign:'center', padding:'60px', background:'white'}}>
              <div style={{fontSize:'4rem', marginBottom:'16px'}}>🔍</div>
              <h2>No products found</h2>
              <p style={{color:'#878787'}}>Try adjusting your filters or search query.</p>
            </div>
          ) : (
            <>
              <div className="product-row-wrapper">
                <div className="row-header">
                  <h2 className="row-title">
                    {searchQuery ? `Results for "${searchQuery}"` : 'Best of Fashion ✨ AI Try-On Enabled'}
                    <span style={{fontSize:'14px', color:'#878787', fontWeight:400, marginLeft:'12px'}}>{filtered.length} items</span>
                  </h2>
                </div>
                <div className="product-grid-wrap">
                  {filtered.map(product => (
                    <ProductCard
                      key={product._id || product.id}
                      product={product}
                      onTryOn={onTryOn}
                      onViewDetail={onViewDetail}
                    />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
