const jwt = require('jsonwebtoken');
const User = require('../models/User');

const refreshTokenHandler = async (request, h) => {
  const { token } = request.payload;
  if (!token) {
    return h.response({ msg: 'Refresh token diperlukan' }).code(401);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.id);
    if (!user || user.refreshToken !== token) {
      return h.response({ msg: 'Refresh token tidak cocok' }).code(403);
    }

    const accessToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );

    return h.response({ accessToken });
  } catch (err) {
    return h.response({ msg: 'Refresh token tidak valid' }).code(403);
  }
};

module.exports = [
  {
    method: 'POST',
    path: '/api/refresh-token',
    handler: refreshTokenHandler,
  },
];
