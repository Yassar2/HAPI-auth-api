const User = require('../models/User');

// GET all users
const getAllUsers = {
  method: 'GET',
  path: '/api/users',
  options: { auth: false },
  handler: async (request, h) => {
    try {
      const users = await User.find().lean();
      return h.response(users);
    } catch (error) {
      return h.response({ message: 'Gagal mengambil data user', error: error.message }).code(500);
    }
  },
};

// GET user by id
const getUserById = {
  method: 'GET',
  path: '/api/users/{id}',
  options: { auth: false },
  handler: async (request, h) => {
    try {
      const user = await User.findById(request.params.id).lean();
      if (!user) return h.response({ message: 'User tidak ditemukan' }).code(404);
      return h.response(user);
    } catch (error) {
      return h.response({ message: 'Gagal mengambil data user', error: error.message }).code(500);
    }
  },
};

// UPDATE user by id
const updateUser = {
  method: 'PUT',
  path: '/api/users/{id}',
  options: { auth: false },
  handler: async (request, h) => {
    try {
      const updateData = request.payload;
      const updatedUser = await User.findByIdAndUpdate(request.params.id, updateData, { new: true });
      if (!updatedUser) return h.response({ message: 'User tidak ditemukan' }).code(404);
      return h.response({ message: 'User berhasil diperbarui', user: updatedUser });
    } catch (error) {
      return h.response({ message: 'Gagal memperbarui user', error: error.message }).code(500);
    }
  },
};

// DELETE user by id
const deleteUser = {
  method: 'DELETE',
  path: '/api/users/{id}',
  options: { auth: false },
  handler: async (request, h) => {
    try {
      const deletedUser = await User.findByIdAndDelete(request.params.id);
      if (!deletedUser) return h.response({ message: 'User tidak ditemukan' }).code(404);
      return h.response({ message: 'User berhasil dihapus' });
    } catch (error) {
      return h.response({ message: 'Gagal menghapus user', error: error.message }).code(500);
    }
  },
};

module.exports = [getAllUsers, getUserById, updateUser, deleteUser];
