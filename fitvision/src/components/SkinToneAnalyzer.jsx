import { useState, useRef, useEffect } from 'react';

// Skin tone classification based on RGB
function classifyTone(r, g, b) {
  // Luminance
  const lum = 0.299 * r + 0.587 * g + 0.114 * b;
  // Warm/cool: redness relative to blue
  const warmth = r - b;

  let tone, undertone, emoji;

  if (lum > 200) {
    tone = 'Fair'; emoji = '🌷';
  } else if (lum > 160) {
    tone = 'Light'; emoji = '🌼';
  } else if (lum > 120) {
    tone = 'Medium / Wheatish'; emoji = '🌻';
  } else if (lum > 85) {
    tone = 'Dusky / Tan'; emoji = '🌺';
  } else {
    tone = 'Deep / Rich'; emoji = '🌙';
  }

  if (warmth > 30) undertone = 'Warm';
  else if (warmth < 10) undertone = 'Cool';
  else undertone = 'Neutral';

  return { tone, undertone, emoji, lum, warmth };
}

// Palette recommendations per undertone + tone
const PALETTES = {
  Warm: {
    best: ['var(--text-secondary)','#f9a825','#558b2f','#c62828','#4e342e'],
    bestNames: ['Rust Orange','Warm Yellow','Olive Green','Deep Red','Warm Brown'],
    avoid: ['#1a237e','#e91e63','#c0c0c0'],
    avoidNames: ['Cold Navy','Hot Pink','Silver'],
    tip: 'Warm undertones look stunning in earth tones, saffron, olive, terracotta, and warm browns. Gold jewellery complements you perfectly!',
  },
  Cool: {
    best: ['#1a237e','#4a148c','#006064','#880e4f','#37474f'],
    bestNames: ['Deep Navy','Royal Purple','Teal','Berry','Charcoal'],
    avoid: ['#f57f17','#bf360c','#8d6e63'],
    avoidNames: ['Orange','Rust','Warm Brown'],
    tip: 'Cool undertones shine in jewel tones — sapphire, emerald, plum, and magenta. Silver jewellery is your best friend!',
  },
  Neutral: {
    best: ['#212121','#f5f5f5','#455a64','#2e7d32','#7b1fa2'],
    bestNames: ['Classic Black','Crisp White','Slate','Forest Green','Plum'],
    avoid: [],
    avoidNames: [],
    tip: 'Lucky you — neutral undertones look great in almost everything! You can freely mix warm and cool colours. Try bold contrasts for maximum impact.',
  },
};

export default function SkinToneAnalyzer({ onClose }) {
  const [step, setStep] = useState('intro'); // intro | camera | analyzing | result
  const [result, setResult] = useState(null);
  const [stream, setStream] = useState(null);
  const [cameraError, setCameraError] = useState('');

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => () => stopCamera(), []);

  useEffect(() => {
    if (step === 'camera' && stream && videoRef.current) {
      videoRef.current.srcObject = stream;
      videoRef.current.play().catch(() => {});
    }
  }, [step, stream]);

  const stopCamera = () => {
    streamRef.current?.getTracks().forEach(t => t.stop());
    setStream(null);
  };

  const startCamera = async () => {
    try {
      const s = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(s);
      streamRef.current = s;
      setStep('camera');
      setCameraError('');
    } catch {
      setCameraError('Camera access denied. Please grant permissions.');
    }
  };

  const analyse = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    const w = videoRef.current.videoWidth || 640;
    const h = videoRef.current.videoHeight || 480;
    canvasRef.current.width = w;
    canvasRef.current.height = h;
    ctx.drawImage(videoRef.current, 0, 0, w, h);

    // Sample a 60×60 patch from the face center
    const cx = Math.floor(w / 2);
    const cy = Math.floor(h * 0.35); // slightly above center (forehead area)
    const patchSize = 60;
    const imageData = ctx.getImageData(cx - patchSize / 2, cy - patchSize / 2, patchSize, patchSize);
    const data = imageData.data;

    let rSum = 0, gSum = 0, bSum = 0, count = 0;
    for (let i = 0; i < data.length; i += 4) {
      rSum += data[i];
      gSum += data[i + 1];
      bSum += data[i + 2];
      count++;
    }
    const avgR = rSum / count;
    const avgG = gSum / count;
    const avgB = bSum / count;

    stopCamera();
    setStep('analyzing');

    setTimeout(() => {
      const tone = classifyTone(avgR, avgG, avgB);
      setResult({ ...tone, r: Math.round(avgR), g: Math.round(avgG), b: Math.round(avgB), palette: PALETTES[tone.undertone] });
      setStep('result');
    }, 1800);
  };

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 1100 }}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '580px', background: '#0a0a0f', color: 'white', padding: 0, overflow: 'hidden' }}>
        <button className="modal-close" onClick={() => { stopCamera(); onClose(); }} style={{ color: 'white' }}>×</button>

        {/* ── INTRO ── */}
        {step === 'intro' && (
          <div style={{ padding: '50px 40px', textAlign: 'center' }}>
            <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🎨</div>
            <h2 style={{ fontSize: '26px', fontWeight: 800, marginBottom: '10px', background: 'linear-gradient(135deg,#ffb74d,#f48fb1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Skin Tone Colour Analyser
            </h2>
            <p style={{ color: '#9e9e9e', lineHeight: 1.6, marginBottom: '28px' }}>
              Take a quick selfie. Our AI will detect your skin undertone and recommend the <strong style={{ color: '#fff' }}>exact colours</strong> that will make you look stunning.
            </p>
            <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '12px', padding: '16px', marginBottom: '28px', textAlign: 'left' }}>
              {['Detects Warm / Cool / Neutral undertones','Recommends your best clothing colours','Tells you what colours to avoid','100% private — no image is stored'].map(t => (
                <div key={t} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 0', fontSize: '13px', color: '#bdbdbd' }}>
                  <span style={{ color: '#4caf50' }}>✓</span> {t}
                </div>
              ))}
            </div>
            {cameraError && <p style={{ color: '#ff6161', marginBottom: '12px' }}>{cameraError}</p>}
            <button className="btn btn-secondary" style={{ width: '100%' }} onClick={startCamera}>
              📷 Enable Camera & Analyse
            </button>
          </div>
        )}

        {/* ── CAMERA ── */}
        {step === 'camera' && (
          <div>
            <div style={{ position: 'relative', background: '#000' }}>
              <video ref={videoRef} playsInline style={{ width: '100%', height: '320px', objectFit: 'cover', display: 'block' }} />
              {/* Face guide oval */}
              <div style={{
                position: 'absolute', top: '50%', left: '50%',
                transform: 'translate(-50%,-55%)',
                width: '160px', height: '200px',
                border: '3px dashed rgba(255,183,77,0.8)',
                borderRadius: '50%',
                pointerEvents: 'none',
              }} />
              <div style={{ position: 'absolute', bottom: '12px', left: 0, right: 0, textAlign: 'center', color: 'rgba(255,255,255,0.7)', fontSize: '12px' }}>
                Align your face within the oval
              </div>
            </div>
            <canvas ref={canvasRef} style={{ display: 'none' }} />
            <div style={{ padding: '20px', textAlign: 'center', background: '#111' }}>
              <p style={{ color: '#9e9e9e', fontSize: '13px', marginBottom: '14px' }}>Ensure good lighting and your face is clearly visible</p>
              <button className="btn btn-secondary" style={{ width: '220px' }} onClick={analyse}>
                📸 Capture & Analyse Skin Tone
              </button>
            </div>
          </div>
        )}

        {/* ── ANALYZING ── */}
        {step === 'analyzing' && (
          <div style={{ padding: '70px 40px', textAlign: 'center' }}>
            <div style={{ fontSize: '3.5rem', marginBottom: '16px' }}>🎨</div>
            <h3 style={{ marginBottom: '10px', fontSize: '20px' }}>Analysing Your Skin Tone…</h3>
            <p style={{ color: '#9e9e9e', marginBottom: '24px' }}>Detecting undertones and mapping your colour palette</p>
            <div className="dna-loading-bar-wrap"><div className="dna-loading-bar-fill" /></div>
          </div>
        )}

        {/* ── RESULT ── */}
        {step === 'result' && result && (
          <div style={{ padding: '32px' }}>
            {/* Tone card */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', background: `rgba(${result.r},${result.g},${result.b},0.3)`, border: `2px solid rgba(${result.r},${result.g},${result.b},0.5)`, borderRadius: '12px', padding: '20px', marginBottom: '24px' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: `rgb(${result.r},${result.g},${result.b})`, border: '3px solid rgba(255,255,255,0.3)', flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: '11px', letterSpacing: '1.5px', color: '#9e9e9e', textTransform: 'uppercase' }}>Your Skin Tone</div>
                <div style={{ fontSize: '22px', fontWeight: 800 }}>{result.emoji} {result.tone}</div>
                <div style={{ color: '#bdbdbd', fontSize: '13px' }}>Undertone: <strong style={{ color: '#ffb74d' }}>{result.undertone}</strong></div>
              </div>
            </div>

            {/* Best colours */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '12px', letterSpacing: '1px', color: '#9e9e9e', textTransform: 'uppercase', marginBottom: '10px' }}>✅ Best Colours For You</div>
              <div style={{ display: 'flex', gap: '8px' }}>
                {result.palette.best.map((c, i) => (
                  <div key={i} style={{ flex: 1 }}>
                    <div style={{ height: '36px', borderRadius: '6px', background: c }} />
                    <div style={{ fontSize: '9px', color: '#9e9e9e', textAlign: 'center', marginTop: '4px' }}>{result.palette.bestNames[i]}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Avoid */}
            {result.palette.avoid.length > 0 && (
              <div style={{ marginBottom: '20px' }}>
                <div style={{ fontSize: '12px', letterSpacing: '1px', color: '#9e9e9e', textTransform: 'uppercase', marginBottom: '10px' }}>⚠️ Colours to Avoid</div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {result.palette.avoid.map((c, i) => (
                    <div key={i} style={{ flex: 1 }}>
                      <div style={{ height: '30px', borderRadius: '6px', background: c, opacity: 0.6, position: 'relative' }}>
                        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', color: 'white', fontSize: '14px' }}>✕</div>
                      </div>
                      <div style={{ fontSize: '9px', color: '#616161', textAlign: 'center', marginTop: '4px' }}>{result.palette.avoidNames[i]}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tip */}
            <div style={{ background: 'rgba(255,183,77,0.1)', border: '1px solid rgba(255,183,77,0.3)', borderRadius: '8px', padding: '14px', marginBottom: '20px', fontSize: '13px', color: '#ffe082', lineHeight: 1.6 }}>
              💡 {result.palette.tip}
            </div>

            <button className="btn btn-secondary" style={{ width: '100%' }} onClick={onClose}>
              🛍️ Shop in My Recommended Colours
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
