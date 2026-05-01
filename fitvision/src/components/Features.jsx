export default function Features() {
  const features = [
    {
      icon: '👕',
      title: 'Virtual Try-On',
      desc: 'See how clothes look on your unique body shape before purchasing.'
    },
    {
      icon: '📏',
      title: 'Accurate Sizing',
      desc: 'Never guess your size again. Our AI analyzes your fit profile perfectly.'
    },
    {
      icon: '✨',
      title: 'Smart Outfits',
      desc: 'Get personalized outfit recommendations based on your unique style.'
    }
  ];

  return (
    <section className="features container animate-fade-in delay-300">
      <h2 className="section-title">Why Choose <span className="text-gradient">FitVision</span></h2>
      <div className="features-grid">
        {features.map((feature, i) => (
          <div key={i} className="feature-card glass-panel">
            <div className="feature-icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
