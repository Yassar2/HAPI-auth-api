const User = require('../models/User');
const { auth, adminOnly } = require('../middleware/authMiddleware');

const getUsers = {
  method: 'GET',
  path: '/api/user',
  options: {
    pre: [auth, adminOnly]
  },
  handler: async (request, h) => {
    try {
      const users = await User.find({}, '-password -refreshToken');
      return h.response(users);
    } catch (error) {
      return h.response({ message: 'Gagal mengambil data user', error: error.message }).code(500);
    }
  }
};

const logoutUser = {
  method: 'POST',
  path: '/api/user/logout',
  options: {
    pre: [auth]
  },
  handler: async (request, h) => {
    try {
      const user = await User.findById(request.user.userId);
      if (!user) {
        return h.response({ message: 'User tidak ditemukan' }).code(404);
      }
      user.refreshToken = null;
      await user.save();

      return h.response({ message: 'Berhasil logout, refresh token dihapus' });
    } catch (error) {
      return h.response({ message: 'Gagal logout', error: error.message }).code(500);
    }
  }
};

module.exports = [getUsers, logoutUser];
