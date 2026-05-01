
export default function handler(req, res) {
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
}
