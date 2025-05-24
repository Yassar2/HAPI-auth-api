const jwt = require('jsonwebtoken');

// Middleware auth: verifikasi token dan simpan ke request.auth.credentials
const auth = async (request, h) => {
  try {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      return h.response({ msg: 'Token diperlukan' }).code(401).takeover();
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return h.response({ msg: 'Token tidak ditemukan' }).code(401).takeover();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Simpan payload JWT ke request.auth.credentials
    request.auth = { credentials: decoded };
    return h.continue;
  } catch (err) {
    console.error('JWT Error:', err.message);
    return h.response({ msg: 'Token tidak valid' }).code(401).takeover();
  }
};

// Middleware adminOnly: cek role di request.auth.credentials
const adminOnly = (request, h) => {
  const user = request.auth && request.auth.credentials;
  if (!user || user.role !== 'admin') {
    return h.response({ msg: 'Akses admin saja' }).code(403).takeover();
  }

  return h.continue;
};

module.exports = { auth, adminOnly };
