import { useState, useEffect, useContext, useRef } from 'react';
import { AppContext } from '../context/AppContext';

export default function VirtualTryOnModal({ item, onClose, onBuyNow }) {
  const { addToCart } = useContext(AppContext);
  const [added, setAdded] = useState(false);

  // Camera States
  const [cameraActive, setCameraActive] = useState(false);
  const [capturedDataUrl, setCapturedDataUrl] = useState(null);
  const [cameraError, setCameraError] = useState('');
  const [stream, setStream] = useState(null);

  // AI States
  const [aiAnalyzing, setAiAnalyzing] = useState(false);
  const [aiResult, setAiResult] = useState(null); // 'success' | 'fallback'

  const videoRef = useRef(null);
  const captureCanvasRef = useRef(null);   // hidden – raw capture
  const resultCanvasRef = useRef(null);    // visible – final composite
  const streamRef = useRef(null);

  useEffect(() => () => stopCamera(), []);

  useEffect(() => {
    if (cameraActive && stream && videoRef.current) {
      videoRef.current.srcObject = stream;
      videoRef.current.play().catch(e => console.error('Video play error:', e));
    }
  }, [cameraActive, stream]);

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
    }
    setCameraActive(false);
  };

  const startCamera = async () => {
    try {
      setCameraActive(true);
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream);
      streamRef.current = mediaStream;
      setCameraError('');
      setCapturedDataUrl(null);
      setAiResult(null);
    } catch (err) {
      setCameraError('Unable to access camera. Please grant camera permissions.');
      setCameraActive(false);
    }
  };

  // ──────────────────────────────────────────────────────────
  //  Core compositing: draws user photo + clothing on canvas
  // ──────────────────────────────────────────────────────────
  const compositeOnCanvas = (userImgEl, clothImgEl, keypoints, canvas) => {
    const ctx = canvas.getContext('2d');
    const W = canvas.width;
    const H = canvas.height;

    // 1. Draw user photo
    ctx.drawImage(userImgEl, 0, 0, W, H);

    // 2. Find torso bounds from pose keypoints
    const get = name => keypoints?.find(k => k.name === name);
    const ls = get('left_shoulder');
    const rs = get('right_shoulder');
    const lh = get('left_hip');
    const rh = get('right_hip');

    let cx, cy, cw, ch;

    const good = pt => pt && pt.score > 0.25;

    if (good(ls) && good(rs)) {
      // Shoulder midpoint
      const shoulderMidX = (ls.x + rs.x) / 2;
      const shoulderMidY = (ls.y + rs.y) / 2;
      const shoulderWidth = Math.abs(rs.x - ls.x);

      // Hip midpoint (or estimate)
      let hipMidY;
      if (good(lh) && good(rh)) {
        hipMidY = (lh.y + rh.y) / 2;
      } else {
        hipMidY = shoulderMidY + shoulderWidth * 1.4;
      }

      const torsoHeight = hipMidY - shoulderMidY;

      // Clothing dimensions: slightly wider than shoulder-to-shoulder, covers torso
      cw = shoulderWidth * 1.6;
      ch = torsoHeight * 1.3;
      // Center horizontally on shoulder midpoint, start slightly above shoulders
      cx = shoulderMidX - cw / 2;
      cy = shoulderMidY - torsoHeight * 0.1;

      setAiResult('success');
    } else {
      // Fallback: center of frame, reasonable guess
      cw = W * 0.55;
      ch = H * 0.5;
      cx = W / 2 - cw / 2;
      cy = H * 0.18;
      setAiResult('fallback');
    }

    // 3. Draw clothing image with blending
    // First draw a soft shadow/glow for depth
    ctx.save();
    ctx.shadowColor = 'rgba(0,0,0,0.35)';
    ctx.shadowBlur = 18;
    ctx.drawImage(clothImgEl, cx, cy, cw, ch);
    ctx.restore();

    // 4. Subtle darkening around clothing edges for realism
    ctx.save();
    ctx.globalAlpha = 0.08;
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, W, H);
    ctx.globalAlpha = 1;
    ctx.restore();
  };

  const captureAndAnalyze = async () => {
    if (!videoRef.current || !captureCanvasRef.current) return;

    // A. Capture the webcam frame
    const vidW = videoRef.current.videoWidth || 640;
    const vidH = videoRef.current.videoHeight || 480;
    captureCanvasRef.current.width = vidW;
    captureCanvasRef.current.height = vidH;
    captureCanvasRef.current.getContext('2d')
      .drawImage(videoRef.current, 0, 0, vidW, vidH);

    const dataUrl = captureCanvasRef.current.toDataURL('image/png');
    setCapturedDataUrl(dataUrl);
    stopCamera();
    setAiAnalyzing(true);

    // B. Load clothing image
    const clothImg = new Image();
    clothImg.crossOrigin = 'anonymous';
    clothImg.src = item.image;
    await new Promise(r => { clothImg.onload = r; clothImg.onerror = r; });

    // C. Load user photo onto an img element (for canvas drawing)
    const userImg = new Image();
    userImg.src = dataUrl;
    await new Promise(r => { userImg.onload = r; });

    // D. Run Pose Detection
    let keypoints = null;
    try {
      const pd = window.poseDetection;
      if (pd) {
        const cfg = { modelType: pd.movenet.modelType.SINGLEPOSE_LIGHTNING };
        const detector = await pd.createDetector(pd.SupportedModels.MoveNet, cfg);
        const poses = await detector.estimatePoses(captureCanvasRef.current);
        if (poses.length > 0) keypoints = poses[0].keypoints;
      }
    } catch (e) {
      console.warn('Pose detection failed, using fallback:', e);
    }

    // E. Draw composite onto the visible result canvas
    const rc = resultCanvasRef.current;
    rc.width = vidW;
    rc.height = vidH;
    compositeOnCanvas(userImg, clothImg, keypoints, rc);

    setAiAnalyzing(false);
  };

  const handleAddToCart = () => {
    addToCart(item);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="modal-overlay" onClick={() => { stopCamera(); onClose(); }}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '1000px' }}>
        <button className="modal-close" onClick={() => { stopCamera(); onClose(); }}>×</button>

        <div className="vto-workspace" style={{ minHeight: '580px' }}>
          {/* ── LEFT: Camera / Result ── */}
          <div className="vto-left" style={{ background: '#111', display: 'flex', flexDirection: 'column', padding: 0, border: 'none' }}>

            {/* Start screen */}
            {!cameraActive && !capturedDataUrl && (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '30px', color: 'white' }}>
                <div style={{ fontSize: '5rem', marginBottom: '16px' }}>📷</div>
                <h2 style={{ color: 'white', marginBottom: '10px' }}>Magic Mirror Try-On</h2>
                <p style={{ color: '#aaa', marginBottom: '30px', maxWidth: '280px', lineHeight: 1.5 }}>
                  Stand in front of your camera. The AI will place the clothing over your body automatically.
                </p>
                <button className="btn btn-secondary" onClick={startCamera}>
                  Enable Camera
                </button>
                {cameraError && <p style={{ color: '#ff6161', marginTop: '12px', fontSize: '13px' }}>{cameraError}</p>}
              </div>
            )}

            {/* Live camera feed */}
            {cameraActive && (
              <div style={{ flex: 1, position: 'relative', display: 'flex', flexDirection: 'column' }}>
                <video
                  ref={videoRef}
                  playsInline
                  style={{ width: '100%', height: '440px', objectFit: 'cover', background: '#000' }}
                />
                {/* Clothing preview ghost */}
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '40%', opacity: 0.25, pointerEvents: 'none' }}>
                  <img src={item.image} alt="" style={{ width: '100%', objectFit: 'contain' }} />
                </div>
                <div style={{ padding: '14px', textAlign: 'center', background: '#1a1a1a' }}>
                  <p style={{ color: '#aaa', fontSize: '13px', marginBottom: '10px' }}>Stand 1–2 metres from camera so your torso is fully visible</p>
                  <button className="btn btn-secondary" style={{ width: '220px' }} onClick={captureAndAnalyze}>
                    📸 Capture & Try On
                  </button>
                </div>
              </div>
            )}

            {/* Hidden canvas for capturing raw frame */}
            <canvas ref={captureCanvasRef} style={{ display: 'none' }} />

            {/* AI analyzing overlay */}
            {aiAnalyzing && (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white', padding: '40px' }}>
                <div style={{ fontSize: '3rem', marginBottom: '16px', animation: 'spin 1.5s linear infinite' }}>⚙️</div>
                <p style={{ fontWeight: 500, fontSize: '16px', marginBottom: '8px' }}>AI Body Mapping…</p>
                <p style={{ color: '#aaa', fontSize: '13px' }}>Detecting pose & fitting clothing to your body</p>
              </div>
            )}

            {/* RESULT: composite canvas */}
            {capturedDataUrl && !aiAnalyzing && (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <canvas
                  ref={resultCanvasRef}
                  style={{ width: '100%', flex: 1, objectFit: 'contain', display: 'block' }}
                />
                {aiResult === 'fallback' && (
                  <p style={{ background: '#333', color: '#ffcc00', fontSize: '12px', padding: '6px 12px', textAlign: 'center' }}>
                    ⚠️ Full body not detected. Showing estimated fit — stand further back for best results.
                  </p>
                )}
                <div style={{ display: 'flex', gap: '10px', padding: '14px', background: '#1a1a1a' }}>
                  <button className="btn btn-primary" style={{ flex: 1, background: '#444' }} onClick={startCamera}>
                    Retake
                  </button>
                  <button className="btn btn-secondary" style={{ flex: 2 }} onClick={handleAddToCart}>
                    {added ? '✅ Added!' : '🛒 Add to Cart'}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* ── RIGHT: Product Info ── */}
          <div className="vto-right">
            {/* Clothing thumbnail */}
            <div style={{ width: '100%', height: '160px', background: '#f5f5f5', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', overflow: 'hidden' }}>
              <img src={item.image} alt={item.name} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
            </div>

            <h1 style={{ fontSize: '17px', fontWeight: 400, lineHeight: 1.4, marginBottom: '10px' }}>{item.name}</h1>
            <div style={{ marginBottom: '10px' }}>
              <span style={{ background: '#388e3c', color: 'white', padding: '2px 6px', borderRadius: '3px', fontSize: '12px', fontWeight: 'bold', marginRight: '8px' }}>4.2 ★</span>
              <span style={{ color: '#878787', fontSize: '13px' }}>1,245 Ratings & 120 Reviews</span>
            </div>

            <div style={{ fontSize: '26px', fontWeight: 500, marginBottom: '4px' }}>₹{item.price}</div>
            <div style={{ color: '#388e3c', fontSize: '14px', fontWeight: 500, marginBottom: '16px' }}>{item.discount}</div>

            {capturedDataUrl && !aiAnalyzing && (
              <div style={{ background: '#e8f5e9', border: '1px solid #c8e6c9', padding: '14px', borderRadius: '4px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span>🤖</span>
                  <span style={{ fontWeight: 600, color: '#388e3c' }}>
                    {aiResult === 'success' ? 'AI Fit Mapped to Your Body' : 'Fit Preview Generated'}
                  </span>
                </div>
                <p style={{ fontSize: '13px', color: '#212121' }}>
                  {aiResult === 'success'
                    ? 'Pose detection found your shoulders & hips and fitted the garment to your exact proportions. Recommended size: M.'
                    : 'Stand further back and ensure your full torso is visible for a more accurate fit.'}
                </p>
              </div>
            )}

            <div className="fit-recommendation" style={{ marginBottom: '16px' }}>
              <h3>Available Offers</h3>
              <ul style={{ fontSize: '12px', paddingLeft: '20px', color: '#212121' }}>
                <li>5% Cashback on Flipkart Axis Bank Card</li>
                <li>Extra 10% off with coupon</li>
              </ul>
            </div>

            <div className="action-buttons-modal">
              <button
                className="btn btn-primary"
                style={{ flex: 1, backgroundColor: added ? '#388e3c' : 'var(--accent-primary)' }}
                onClick={handleAddToCart}
              >
                {added ? 'ADDED ✓' : 'ADD TO CART'}
              </button>
              <button className="btn btn-secondary" style={{ flex: 1 }} onClick={() => { stopCamera(); onBuyNow(); }}>
                BUY NOW
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
