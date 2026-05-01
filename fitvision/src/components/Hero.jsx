export default function Hero({ setActiveTab }) {
  return (
    <section className="hero animate-fade-in">
      <div className="container">
        <h1>
          The Future of Fashion is <span className="text-gradient">Virtual</span>
        </h1>
        <p className="delay-100">
          Experience accurate size recommendations and virtually try on clothes before you buy. 
          Reduce returns and discover your perfect fit with AI.
        </p>
        <div className="hero-buttons delay-200">
          <button className="btn btn-primary" onClick={() => setActiveTab('try-on')}>
            Launch Virtual Try-On
          </button>
          <button className="btn btn-secondary" onClick={() => setActiveTab('quiz')}>
            Get Recommendations
          </button>
        </div>
      </div>
    </section>
  )
}
