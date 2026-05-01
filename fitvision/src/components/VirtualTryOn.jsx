import { useState } from 'react';

export default function VirtualTryOn() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultReady, setResultReady] = useState(false);

  const catalog = [
    { id: 1, name: 'Casual T-Shirt', icon: '👕' },
    { id: 2, name: 'Denim Jacket', icon: '🧥' },
    { id: 3, name: 'Summer Dress', icon: '👗' },
    { id: 4, name: 'Formal Shirt', icon: '👔' },
    { id: 5, name: 'Athletic Wear', icon: '🎽' },
    { id: 6, name: 'Winter Coat', icon: '🥶' },
  ];

  const handleTryOn = () => {
    if (!selectedItem) return;
    setIsProcessing(true);
    setResultReady(false);
    
    // Simulate AI processing time
    setTimeout(() => {
      setIsProcessing(false);
      setResultReady(true);
    }, 2000);
  };

  return (
    <section className="try-on-container container animate-fade-in">
      <h2 className="section-title">Virtual <span className="text-gradient">Try-On</span> Studio</h2>
      
      <div className="try-on-workspace">
        {/* Left Side: Model Preview */}
        <div className="model-preview glass-panel">
          {isProcessing ? (
            <div className="processing-state">
              <div className="spinner" style={{fontSize: '3rem'}}>⚙️</div>
              <p style={{marginTop: '1rem', color: 'var(--accent-primary)'}}>AI is fitting your garment...</p>
            </div>
          ) : resultReady ? (
            <div className="result-state" style={{textAlign: 'center'}}>
              <div style={{fontSize: '5rem', marginBottom: '1rem'}}>{selectedItem?.icon}</div>
              <h3>Perfect Fit!</h3>
              <p className="text-secondary">Size M recommended</p>
            </div>
          ) : (
            <div className="empty-state text-secondary text-center">
              <p>Upload a photo or use</p>
              <p>a default model to begin.</p>
            </div>
          )}
        </div>

        {/* Right Side: Controls & Catalog */}
        <div className="controls-panel">
          <div className="glass-panel" style={{padding: '2rem'}}>
            <h3>Select a Garment</h3>
            <p className="text-secondary" style={{marginBottom: '1rem'}}>Choose an item from our catalog to try on.</p>
            
            <div className="catalog-grid">
              {catalog.map(item => (
                <div 
                  key={item.id} 
                  className={`catalog-item ${selectedItem?.id === item.id ? 'selected' : ''}`}
                  onClick={() => {
                    setSelectedItem(item);
                    setResultReady(false);
                  }}
                  title={item.name}
                >
                  {item.icon}
                </div>
              ))}
            </div>
            
            <button 
              className="btn btn-primary" 
              style={{width: '100%', marginTop: '2rem'}}
              disabled={!selectedItem || isProcessing}
              onClick={handleTryOn}
            >
              {isProcessing ? 'Processing...' : 'Generate Try-On'}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
