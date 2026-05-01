const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, '../fitvision-backend/routes/productRoutes.js');
let content = fs.readFileSync(srcPath, 'utf-8');

// Strip express code
content = content.replace(/const express = require\('express'\);/g, '');
content = content.replace(/const router = express\.Router\(\);/g, '');
content = content.replace(/router\.get.*/g, '');
content = content.replace(/module\.exports = router;/g, '');

const baseDir = path.join(__dirname, 'api');
fs.mkdirSync(path.join(baseDir, 'products'), { recursive: true });
fs.mkdirSync(path.join(baseDir, 'auth'), { recursive: true });

// 1. /api/products/index.js
const productsIndex = `
${content}
module.exports = (req, res) => {
  res.status(200).json(products);
};
`;
fs.writeFileSync(path.join(baseDir, 'products/index.js'), productsIndex);

// 2. /api/products/[id].js
const productId = `
${content}
module.exports = (req, res) => {
  const { id } = req.query;
  const product = products.find(p => p.id === parseInt(id));
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
};
`;
fs.writeFileSync(path.join(baseDir, 'products/[id].js'), productId);

// 3. /api/auth/login.js
const authLogin = `
module.exports = (req, res) => {
  if (req.method === 'POST') {
    const { email, password } = req.body || {};
    if (email === 'test@fitvision.com' && password === 'password123') {
      return res.status(200).json({
        success: true,
        user: { id: 1, name: 'Test User', email: 'test@fitvision.com' },
        token: 'mock-jwt-token-xyz'
      });
    } else {
      return res.status(401).json({ success: false, message: 'Invalid credentials. Use test@fitvision.com / password123' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};
`;
fs.writeFileSync(path.join(baseDir, 'auth/login.js'), authLogin);

console.log('Vercel serverless functions generated successfully.');
