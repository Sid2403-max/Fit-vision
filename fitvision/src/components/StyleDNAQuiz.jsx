import { useState } from 'react';
import SkinToneAnalyzer from './SkinToneAnalyzer';

// ─── Quiz rounds ──────────────────────────────────────────────────
const ROUNDS = [
  {
    id: 'occasion',
    question: 'What best describes your lifestyle?',
    emoji: '🌟',
    options: [
      { id: 'work',      label: 'Work & Professional', icon: '💼', gradient: 'linear-gradient(135deg,#1a237e,#3949ab)', desc: 'Boardrooms & meetings' },
      { id: 'ethnic',    label: 'Festivals & Ethnic',  icon: '🪔', gradient: 'linear-gradient(135deg,#bf360c,#f57c00)', desc: 'Weddings & traditions' },
      { id: 'casual',    label: 'Casual & Street',     icon: '🛹', gradient: 'linear-gradient(135deg,#1b5e20,#388e3c)', desc: 'Campus & outings' },
      { id: 'party',     label: 'Date Nights & Parties',icon:'🥂', gradient: 'linear-gradient(135deg,#4a148c,#7b1fa2)', desc: 'Dinner & events' },
    ],
  },
  {
    id: 'fit',
    question: 'What kind of fit feels like YOU?',
    emoji: '✂️',
    options: [
      { id: 'tailored',  label: 'Fitted & Tailored',   icon: '👔', gradient: 'linear-gradient(135deg,#0d47a1,#1976d2)', desc: 'Sharp and structured' },
      { id: 'flowy',     label: 'Flowy & Comfortable', icon: '🌊', gradient: 'linear-gradient(135deg,#006064,#00acc1)', desc: 'Relaxed and free' },
      { id: 'oversized', label: 'Oversized & Bold',     icon: '🧢', gradient: 'linear-gradient(135deg,#212121,#616161)', desc: 'Statement pieces' },
      { id: 'minimal',   label: 'Minimal & Classic',   icon: '⬜', gradient: 'linear-gradient(135deg,#37474f,#78909c)', desc: 'Clean lines, timeless' },
    ],
  },
  {
    id: 'color',
    question: 'Which colour palette speaks to your soul?',
    emoji: '🎨',
    options: [
      { id: 'earth',     label: 'Earth & Neutral Tones',icon: '🌿', gradient: 'linear-gradient(135deg,#5d4037,#8d6e63)', desc: 'Camel, Olive, Rust' },
      { id: 'pastel',    label: 'Pastels & Soft Hues',  icon: '🌸', gradient: 'linear-gradient(135deg,#f48fb1,#ce93d8)', desc: 'Blush, Lavender, Mint' },
      { id: 'bold',      label: 'Bold & Vibrant',       icon: '🔥', gradient: 'linear-gradient(135deg,#e53935,#fb8c00)', desc: 'Red, Electric Blue, Saffron' },
      { id: 'mono',      label: 'Monochromes',          icon: '🖤', gradient: 'linear-gradient(135deg,#212121,#757575)', desc: 'Black, White, Beige' },
    ],
  },
  {
    id: 'pattern',
    question: 'What patterns excite you?',
    emoji: '🖼️',
    options: [
      { id: 'solid',     label: 'Solid & Clean',        icon: '⬛', gradient: 'linear-gradient(135deg,#455a64,#90a4ae)', desc: 'Let the cut do the talking' },
      { id: 'floral',    label: 'Floral & Botanical',   icon: '🌺', gradient: 'linear-gradient(135deg,#558b2f,#9ccc65)', desc: 'Expressive & romantic' },
      { id: 'geometric', label: 'Geometric & Abstract', icon: '🔷', gradient: 'linear-gradient(135deg,#0288d1,#4fc3f7)', desc: 'Modern & artistic' },
      { id: 'trad',      label: 'Traditional Prints',   icon: '🪷', gradient: 'linear-gradient(135deg,#6a1b9a,#ba68c8)', desc: 'Bandhani, Block, Ikat' },
    ],
  },
  {
    id: 'inspo',
    question: 'Who is your style inspiration?',
    emoji: '✨',
    options: [
      { id: 'bollywood', label: 'Bollywood Stars',      icon: '🎬', gradient: 'linear-gradient(135deg,#c62828,#ef5350)', desc: 'Glamour & drama' },
      { id: 'western',   label: 'Global Influencers',   icon: '🌍', gradient: 'linear-gradient(135deg,#00695c,#4db6ac)', desc: 'Instagram & fashion weeks' },
      { id: 'classic',   label: 'Timeless Classics',    icon: '🏛️', gradient: 'linear-gradient(135deg,#4e342e,#8d6e63)', desc: 'Icons who never go out of style' },
      { id: 'sporty',    label: 'Sporty & Active',      icon: '⚡', gradient: 'linear-gradient(135deg,#f57f17,#ffca28)', desc: 'Athleisure & comfort first' },
    ],
  },
];

// ─── DNA Archetypes ───────────────────────────────────────────────
const ARCHETYPES = {
  ethnic_fusion: {
    name: 'Ethnic Fusion Star',
    badge: '🪔✨',
    headline: 'Where tradition meets contemporary.',
    desc: 'You honour your roots while staying fashion-forward. You effortlessly blend kurtas with sneakers, and silk sarees with modern cuts. Your wardrobe tells a story of culture and confidence.',
    palette: ['#bf360c','#f57c00','#ffd54f','#6a1b9a','#1a237e'],
    paletteNames: ['Deep Rust','Saffron','Gold','Royal Violet','Midnight Blue'],
    tags: ['Ethnic Fusion','Heritage Chic','Modern Traditional'],
    keywords: ['kurta','saree','ethnic','embroidered'],
  },
  urban_minimalist: {
    name: 'Urban Minimalist',
    badge: '🖤🏙️',
    headline: 'Less is your superpower.',
    desc: 'You believe great style needs no explanation. Clean silhouettes, monochrome palettes, and perfectly tailored basics define you. You could wear a plain white tee to a launch party and still be the best-dressed.',
    palette: ['#212121','#616161','#bdbdbd','#f5f5f5','#455a64'],
    paletteNames: ['Jet Black','Graphite','Silver','Chalk White','Slate'],
    tags: ['Minimalist','Monochrome','Clean Aesthetic'],
    keywords: ['solid','minimal','slim','classic'],
  },
  boho_casual: {
    name: 'Carefree Boho Soul',
    badge: '🌺🌿',
    headline: 'Free-spirited and effortlessly chic.',
    desc: 'Rules are for others. You mix patterns, layer textures, and turn every street into your runway. Floral prints, earthy tones, and flowing fabrics are your language. You dress for joy, not approval.',
    palette: ['#5d4037','#8d6e63','#a5d6a7','#fff176','#ffb74d'],
    paletteNames: ['Bark Brown','Warm Sand','Sage Green','Sun Yellow','Sunset Orange'],
    tags: ['Bohemian','Earth Tones','Free Spirit'],
    keywords: ['floral','casual','flowy','printed'],
  },
  corporate_chic: {
    name: 'Corporate Chic Icon',
    badge: '💼👑',
    headline: 'Power dressing is your love language.',
    desc: 'You walk into a room and people notice. Every outfit is intentional — from the collar pin to the shoe shine. Sharp blazers, tailored trousers, and statement accessories define your power presence.',
    palette: ['#1a237e','#283593','#1565c0','#78909c','#cfd8dc'],
    paletteNames: ['Navy Power','Deep Indigo','Corporate Blue','Steel','Frost'],
    tags: ['Power Dressing','Corporate','Structured'],
    keywords: ['formal','tailored','shirt','professional'],
  },
  bold_maximalist: {
    name: 'Bold Maximalist',
    badge: '🔥👑',
    headline: 'Why wear one colour when you can wear all?',
    desc: 'Subtle is not in your vocabulary. You are the look. Vibrant colours, clashing patterns, dramatic silhouettes — you curate experiences, not just outfits. You are your own art.',
    palette: ['#e53935','#fb8c00','#fdd835','#7b1fa2','#1565c0'],
    paletteNames: ['Fiery Red','Bold Orange','Electric Yellow','Deep Violet','Power Blue'],
    tags: ['Maximalist','Bold Colors','Statement Pieces'],
    keywords: ['bold','vibrant','printed','oversized'],
  },
  desi_diva: {
    name: 'Desi Diva',
    badge: '🎬💫',
    headline: 'Every day is opening night for you.',
    desc: 'You live for glamour. Inspired by Bollywood\'s finest, you bring drama and elegance to every occasion. Sequins, embroidery, rich fabrics, and jewel tones are your non-negotiables.',
    palette: ['#880e4f','#c62828','#f57f17','#6a1b9a','#1b5e20'],
    paletteNames: ['Rani Pink','Crimson','Gold','Royal Purple','Emerald'],
    tags: ['Bollywood Glam','Festive','Diva Energy'],
    keywords: ['embroidered','saree','ethnic','kurta'],
  },
  street_style: {
    name: 'Street Style Maverick',
    badge: '🛹🌍',
    headline: 'The streets are your runway.',
    desc: 'Trending before anything trends. You pick up global influences and make them your own. Oversized hoodies, sneaker culture, graphic tees, and drop-crotch pants are your playground.',
    palette: ['#212121','#37474f','#f57f17','#ffffff','#e53935'],
    paletteNames: ['Off-Black','Urban Grey','Amber Pop','Clean White','Accent Red'],
    tags: ['Streetwear','Urban Cool','Hype Culture'],
    keywords: ['casual','jeans','shirt','regular fit'],
  },
  classic_sophisticate: {
    name: 'Classic Sophisticate',
    badge: '🏛️🌟',
    headline: 'Timeless is the highest compliment.',
    desc: 'You invest in quality over quantity. Every piece in your wardrobe works with three others. You are drawn to craftsmanship, heritage fabrics, and cuts that flatters for decades, not seasons.',
    palette: ['#4e342e','#6d4c41','#bcaaa4','#eceff1','#546e7a'],
    paletteNames: ['Rich Brown','Chocolate','Warm Taupe','Off-White','Charcoal Blue'],
    tags: ['Timeless','Classic','Investment Dressing'],
    keywords: ['solid','formal','kurta','regular fit'],
  },
};

function getArchetype(answers) {
  const [occasion, fit, color, pattern, inspo] = answers;
  if (occasion === 'ethnic' && inspo === 'classic') return 'ethnic_fusion';
  if (occasion === 'ethnic' && inspo === 'bollywood') return 'desi_diva';
  if (occasion === 'work' && fit === 'tailored') return 'corporate_chic';
  if (color === 'bold' && pattern === 'geometric') return 'bold_maximalist';
  if (fit === 'minimal' && color === 'mono') return 'urban_minimalist';
  if (occasion === 'casual' && color === 'earth') return 'boho_casual';
  if (inspo === 'western' || occasion === 'casual') return 'street_style';
  if (inspo === 'bollywood') return 'desi_diva';
  return 'classic_sophisticate';
}

export default function StyleDNAQuiz({ onClose, onDNAComplete }) {
  const [step, setStep] = useState('intro');   // intro | quiz | analyzing | result
  const [round, setRound] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [archetype, setArchetype] = useState(null);
  const [showSkinTone, setShowSkinTone] = useState(false);

  const handleSelect = (optionId) => {
    setSelected(optionId);
    setTimeout(() => {
      const newAnswers = [...answers, optionId];
      setAnswers(newAnswers);
      setSelected(null);
      if (round + 1 < ROUNDS.length) {
        setRound(r => r + 1);
      } else {
        setStep('analyzing');
        const result = getArchetype(newAnswers);
        setTimeout(() => {
          setArchetype(ARCHETYPES[result]);
          setStep('result');
          onDNAComplete && onDNAComplete(ARCHETYPES[result]);
        }, 2200);
      }
    }, 350);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content dna-modal"
        onClick={e => e.stopPropagation()}
        style={{ maxWidth: '780px', padding: 0, background: '#0a0a0f', color: 'white', overflow: 'hidden' }}
      >
        <button className="modal-close" onClick={onClose} style={{ color: 'white', zIndex: 10 }}>×</button>

        {/* ── INTRO ── */}
        {step === 'intro' && (
          <div className="dna-intro">
            <div className="dna-intro-glow" />
            <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '60px 40px' }}>
              <div style={{ fontSize: '4.5rem', marginBottom: '16px' }}>🧬</div>
              <h1 style={{ fontSize: '34px', fontWeight: 800, marginBottom: '12px', background: 'linear-gradient(135deg,#64b5f6,#ce93d8,#ffb74d)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Discover Your Style DNA
              </h1>
              <p style={{ color: '#9e9e9e', fontSize: '16px', maxWidth: '460px', margin: '0 auto 30px', lineHeight: 1.6 }}>
                5 quick visual questions. Your unique fashion archetype revealed. Personalised products just for you.
              </p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '32px' }}>
                {['5 Questions','< 60 Seconds','100% Personalised'].map(t => (
                  <span key={t} style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', padding: '6px 14px', borderRadius: '999px', fontSize: '12px', color: '#bdbdbd' }}>{t}</span>
                ))}
              </div>
              <button className="btn btn-secondary" style={{ padding: '14px 48px', fontSize: '16px' }} onClick={() => setStep('quiz')}>
                ✨ Start My Style Quiz
              </button>
            </div>
          </div>
        )}

        {/* ── QUIZ ── */}
        {step === 'quiz' && (
          <div className="dna-quiz">
            {/* Progress */}
            <div className="dna-progress-bar">
              <div className="dna-progress-fill" style={{ width: `${((round) / ROUNDS.length) * 100}%` }} />
            </div>
            <div style={{ padding: '24px 32px 0' }}>
              <div style={{ color: '#9e9e9e', fontSize: '13px', marginBottom: '6px' }}>Question {round + 1} of {ROUNDS.length}</div>
              <h2 style={{ fontSize: '24px', fontWeight: 700 }}>
                {ROUNDS[round].emoji} {ROUNDS[round].question}
              </h2>
            </div>
            <div className="dna-options">
              {ROUNDS[round].options.map(opt => (
                <button
                  key={opt.id}
                  className={`dna-option-card ${selected === opt.id ? 'dna-option-selected' : ''}`}
                  style={{ background: opt.gradient }}
                  onClick={() => handleSelect(opt.id)}
                >
                  <span className="dna-option-icon">{opt.icon}</span>
                  <span className="dna-option-label">{opt.label}</span>
                  <span className="dna-option-desc">{opt.desc}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── ANALYZING ── */}
        {step === 'analyzing' && (
          <div style={{ padding: '80px 40px', textAlign: 'center' }}>
            <div style={{ fontSize: '4rem', marginBottom: '20px' }} className="dna-analyzing-icon">🧬</div>
            <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '12px' }}>Analysing Your Style DNA…</h2>
            <p style={{ color: '#9e9e9e', marginBottom: '30px' }}>Mapping your fashion genome across 5 dimensions</p>
            <div className="dna-loading-bar-wrap">
              <div className="dna-loading-bar-fill" />
            </div>
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '24px', color: '#616161', fontSize: '12px' }}>
              {['Colour Palette','Silhouette','Occasion','Culture','Inspiration'].map(d => (
                <span key={d} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <span style={{ color: '#7c4dff' }}>✓</span> {d}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* ── RESULT ── */}
        {step === 'result' && archetype && (
          <div className="dna-result">
            {/* Header glow */}
            <div className="dna-result-header" style={{ background: `${archetype.palette[0]}22`, borderBottom: `1px solid ${archetype.palette[0]}44` }}>
              <div style={{ fontSize: '3rem' }}>{archetype.badge}</div>
              <div>
                <div style={{ fontSize: '11px', color: '#9e9e9e', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '4px' }}>Your Style DNA</div>
                <h2 style={{ fontSize: '28px', fontWeight: 800, color: archetype.palette[1] }}>{archetype.name}</h2>
                <p style={{ color: '#bdbdbd', fontStyle: 'italic', marginTop: '4px' }}>"{archetype.headline}"</p>
              </div>
            </div>

            <div style={{ padding: '24px 32px' }}>
              <p style={{ color: '#bdbdbd', fontSize: '15px', lineHeight: 1.7, marginBottom: '24px' }}>{archetype.desc}</p>

              {/* Palette */}
              <div style={{ marginBottom: '24px' }}>
                <div style={{ fontSize: '12px', letterSpacing: '1px', color: '#9e9e9e', textTransform: 'uppercase', marginBottom: '10px' }}>Your Colour Palette</div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {archetype.palette.map((c, i) => (
                    <div key={i} style={{ flex: 1 }}>
                      <div style={{ height: '40px', borderRadius: '6px', background: c, marginBottom: '4px' }} />
                      <div style={{ fontSize: '10px', color: '#9e9e9e', textAlign: 'center' }}>{archetype.paletteNames[i]}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '28px' }}>
                {archetype.tags.map(t => (
                  <span key={t} style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', padding: '5px 14px', borderRadius: '999px', fontSize: '12px', color: '#e0e0e0' }}>{t}</span>
                ))}
              </div>

              {/* CTA Buttons */}
              <div style={{ display: 'flex', gap: '12px' }}>
                <button className="btn btn-secondary" style={{ flex: 2 }} onClick={() => { onDNAComplete(archetype); onClose(); }}>
                  🛍️ Shop My Style
                </button>
                <button
                  style={{ flex: 1, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', borderRadius: '4px', cursor: 'pointer', fontSize: '13px' }}
                  onClick={() => setShowSkinTone(true)}
                >
                  🎨 Also Analyse My Skin Tone
                </button>
              </div>
              <button style={{ width: '100%', marginTop: '10px', background: 'none', color: '#616161', fontSize: '12px', cursor: 'pointer' }} onClick={() => { setStep('intro'); setRound(0); setAnswers([]); }}>
                Retake Quiz
              </button>
            </div>
          </div>
        )}
      </div>

      {showSkinTone && (
        <SkinToneAnalyzer onClose={() => setShowSkinTone(false)} />
      )}
    </div>
  );
}
