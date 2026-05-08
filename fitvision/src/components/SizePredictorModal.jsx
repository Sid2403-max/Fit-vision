import { useState } from 'react';

// Size chart based on chest measurement (in cm)
const SIZE_CHART = [
  { size: 'XS', label: 'Extra Small', chest: [0, 80],   waist: [0, 66],   weight: [0, 55] },
  { size: 'S',  label: 'Small',       chest: [80, 87],  waist: [66, 72],  weight: [55, 65] },
  { size: 'M',  label: 'Medium',      chest: [87, 94],  waist: [72, 79],  weight: [65, 77] },
  { size: 'L',  label: 'Large',       chest: [94, 101], waist: [79, 86],  weight: [77, 90] },
  { size: 'XL', label: 'Extra Large', chest: [101, 108],waist: [86, 93],  weight: [90, 105] },
  { size: 'XXL',label: '2X Large',    chest: [108, 999], waist: [93, 999], weight: [105, 999] },
];

function calcConfidence(size, height, weight, chest, waist) {
  let score = 100;
  const rangeScore = (val, min, max) => {
    if (val === '') return 80; // unknown → neutral
    const v = parseFloat(val);
    if (v >= min && v < max) return 100;
    const dist = Math.min(Math.abs(v - min), Math.abs(v - max));
    return Math.max(0, 100 - dist * 5);
  };
  const chestScore = rangeScore(chest, size.chest[0], size.chest[1]);
  const waistScore = rangeScore(waist, size.waist[0], size.waist[1]);
  const weightScore = rangeScore(weight, size.weight[0], size.weight[1]);
  score = (chestScore * 0.45 + waistScore * 0.35 + weightScore * 0.20);
  return Math.round(score);
}

const COLORS = { XS:'#9c27b0', S:'#505646', M:'#4caf50', L:'#ff9800', XL:'#f44336', XXL:'#795548' };

export default function SizePredictorModal({ onClose, product }) {
  const [form, setForm] = useState({ height: '', weight: '', chest: '', waist: '' });
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const predict = () => {
    if (!form.height && !form.weight && !form.chest && !form.waist) return;
    setLoading(true);
    setTimeout(() => {
      const scored = SIZE_CHART.map(s => ({
        ...s,
        confidence: calcConfidence(s, form.height, form.weight, form.chest, form.waist),
      })).sort((a, b) => b.confidence - a.confidence);
      setResults(scored);
      setLoading(false);
    }, 1600); // simulate AI processing
  };

  const best = results?.[0];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '620px' }}>
        <button className="modal-close" onClick={onClose}>×</button>

        <div style={{ padding: '30px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
            <span style={{ fontSize: '2rem' }}>🤖</span>
            <h2 style={{ fontSize: '22px', fontWeight: 600 }}>AI Size Predictor</h2>
          </div>
          {product && <p style={{ color: '#878787', fontSize: '14px', marginBottom: '20px' }}>Finding your perfect fit for <strong>{product.name}</strong></p>}

          {!results ? (
            <>
              <p style={{ color: '#212121', fontSize: '14px', marginBottom: '20px' }}>
                Enter your measurements for a personalised size recommendation with confidence scores.
              </p>
              <div className="size-form-grid">
                {[
                  { name: 'height', label: 'Height', unit: 'cm', placeholder: 'e.g. 172' },
                  { name: 'weight', label: 'Weight', unit: 'kg', placeholder: 'e.g. 68' },
                  { name: 'chest',  label: 'Chest',  unit: 'cm', placeholder: 'e.g. 90' },
                  { name: 'waist',  label: 'Waist',  unit: 'cm', placeholder: 'e.g. 76' },
                ].map(f => (
                  <div key={f.name} className="size-form-field">
                    <label className="size-label">{f.label}</label>
                    <div className="size-input-wrap">
                      <input
                        type="number"
                        name={f.name}
                        value={form[f.name]}
                        onChange={handleChange}
                        placeholder={f.placeholder}
                        className="size-input"
                      />
                      <span className="size-unit">{f.unit}</span>
                    </div>
                  </div>
                ))}
              </div>

              <button
                className="btn btn-secondary"
                style={{ width: '100%', padding: '14px', fontSize: '16px', marginTop: '10px' }}
                onClick={predict}
                disabled={loading}
              >
                {loading ? '🤖 Analysing your measurements...' : '✨ Predict My Size'}
              </button>

              {loading && (
                <div className="size-loading">
                  <div className="size-loading-bar" />
                  <p style={{ color: '#878787', fontSize: '13px', marginTop: '8px' }}>Processing body metrics…</p>
                </div>
              )}
            </>
          ) : (
            <>
              {/* Best match hero */}
              <div className="size-result-hero" style={{ background: COLORS[best.size] + '18', borderColor: COLORS[best.size] }}>
                <div className="size-hero-badge" style={{ background: COLORS[best.size] }}>{best.size}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '20px' }}>{best.label} — {best.confidence}% Match</div>
                  <div style={{ color: '#555', fontSize: '14px', marginTop: '4px' }}>
                    This is your recommended size based on your body measurements
                  </div>
                </div>
              </div>

              {/* Confidence bars */}
              <div style={{ marginTop: '20px' }}>
                <div style={{ fontWeight: 600, marginBottom: '12px', fontSize: '14px', color: '#212121' }}>All Size Confidence Scores</div>
                {results.map(r => (
                  <div key={r.size} style={{ marginBottom: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '13px' }}>
                      <span style={{ fontWeight: r.size === best.size ? 700 : 400 }}>{r.size} — {r.label}</span>
                      <span style={{ fontWeight: 600, color: COLORS[r.size] }}>{r.confidence}%</span>
                    </div>
                    <div style={{ background: '#f0f0f0', borderRadius: '999px', height: '8px', overflow: 'hidden' }}>
                      <div style={{
                        height: '100%',
                        width: `${r.confidence}%`,
                        background: COLORS[r.size],
                        borderRadius: '999px',
                        transition: 'width 0.8s ease',
                      }} />
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => setResults(null)}>
                  Re-measure
                </button>
                <button className="btn btn-secondary" style={{ flex: 1 }} onClick={onClose}>
                  Confirm Size {best.size}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
