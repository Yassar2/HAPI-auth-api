const jwt = require('jsonwebtoken');

exports.validateToken = async (decoded, request, h) => {
  // Di sini kamu bisa tambahkan pengecekan user ke DB kalau perlu
  return { isValid: true };
};

exports.authStrategy = {
  key: process.env.JWT_SECRET,
  validate: exports.validateToken,
  verifyOptions: { algorithms: ['HS256'] }
};
