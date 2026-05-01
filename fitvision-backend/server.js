const express = require('express');
const cors = require('cors');
const path = require('path');
const productRoutes = require('./routes/productRoutes');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// ── API Routes ──────────────────────────────────────────
app.use('/api/products', productRoutes);

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (email === 'test@fitvision.com' && password === 'password123') {
    res.json({
      success: true,
      user: { id: 1, name: 'Test User', email: 'test@fitvision.com' },
      token: 'mock-jwt-token-xyz'
    });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials. Use test@fitvision.com / password123' });
  }
});

// ── Serve React frontend build in production ─────────────
const frontendBuild = path.join(__dirname, '../fitvision/dist');
app.use(express.static(frontendBuild));

// All non-API routes → serve React app
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendBuild, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`FitVision server running on port ${PORT}`);
});
