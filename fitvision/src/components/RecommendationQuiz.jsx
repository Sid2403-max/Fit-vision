import { useState } from 'react';

export default function RecommendationQuiz() {
  const [step, setStep] = useState(1);
  const [showResults, setShowResults] = useState(false);

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else setShowResults(true);
  };

  return (
    <section className="container animate-fade-in">
      <h2 className="section-title">Smart <span className="text-gradient">Recommendations</span></h2>
      
      {!showResults ? (
        <div className="quiz-container glass-panel">
          <h3>Step {step} of 3</h3>
          
          {step === 1 && (
            <>
              <p className="text-secondary" style={{marginTop:'1rem'}}>What is your primary style preference?</p>
              <div className="quiz-options">
                <div className="quiz-option" onClick={handleNext}>Casual & Streetwear</div>
                <div className="quiz-option" onClick={handleNext}>Business Formal</div>
                <div className="quiz-option" onClick={handleNext}>Athleisure</div>
                <div className="quiz-option" onClick={handleNext}>Minimalist</div>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <p className="text-secondary" style={{marginTop:'1rem'}}>How do you prefer your clothes to fit?</p>
              <div className="quiz-options">
                <div className="quiz-option" onClick={handleNext}>Oversized / Loose</div>
                <div className="quiz-option" onClick={handleNext}>Regular / Relaxed</div>
                <div className="quiz-option" onClick={handleNext}>Slim / Tailored</div>
                <div className="quiz-option" onClick={handleNext}>Skinny / Tight</div>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <p className="text-secondary" style={{marginTop:'1rem'}}>What is your typical budget per item?</p>
              <div className="quiz-options">
                <div className="quiz-option" onClick={handleNext}>Under $50</div>
                <div className="quiz-option" onClick={handleNext}>$50 - $150</div>
                <div className="quiz-option" onClick={handleNext}>$150 - $300</div>
                <div className="quiz-option" onClick={handleNext}>Premium / Designer</div>
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="results-dashboard animate-fade-in" style={{marginTop: '3rem'}}>
          <div className="glass-panel" style={{padding: '3rem', textAlign: 'center'}}>
            <h3 style={{fontSize: '2rem', marginBottom: '1rem'}}>Your Curated Collection</h3>
            <p className="text-secondary">Based on your preferences, our AI suggests these items.</p>
            
            <div className="features-grid" style={{marginTop: '3rem'}}>
              {[1, 2, 3].map(i => (
                <div key={i} className="feature-card glass-panel" style={{background: 'rgba(255,255,255,0.01)'}}>
                  <div style={{fontSize: '4rem', marginBottom: '1rem'}}>
                    {i === 1 ? '🧥' : i === 2 ? '👖' : '👟'}
                  </div>
                  <h4>{i === 1 ? 'Tailored Jacket' : i === 2 ? 'Slim Jeans' : 'Minimal Sneakers'}</h4>
                  <p className="text-secondary text-gradient" style={{marginTop: '0.5rem', fontWeight: 'bold'}}>98% Match</p>
                  <button className="btn btn-secondary" style={{marginTop: '1.5rem', width: '100%'}}>View Details</button>
                </div>
              ))}
            </div>
            
            <button className="btn btn-primary" style={{marginTop: '3rem'}} onClick={() => { setStep(1); setShowResults(false); }}>
              Retake Quiz
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
