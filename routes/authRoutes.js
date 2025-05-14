const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = [
  // 🔐 Register
  {
    method: 'POST',
    path: '/api/register',
    options: {
      auth: false,
      handler: async (request, h) => {
        const { username, email, password, role } = request.payload;

        try {
          const existingUser = await User.findOne({ email });
          if (existingUser) {
            return h.response({ message: 'Email sudah terdaftar' }).code(400);
          }

          const hashedPassword = await bcrypt.hash(password, 10);

          const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role: role || 'user' // default ke user
          });

          await newUser.save();
          return h.response({ message: 'Pendaftaran berhasil' }).code(201);
        } catch (error) {
          console.error(error);
          return h.response({ message: 'Terjadi kesalahan saat register' }).code(500);
        }
      }
    }
  },

  // 🔐 Login
  {
    method: 'POST',
    path: '/api/login',
    options: {
      auth: false,
      handler: async (request, h) => {
        const { email, password } = request.payload;

        try {
          const user = await User.findOne({ email });
          if (!user) {
            return h.response({ message: 'Email tidak ditemukan' }).code(404);
          }

          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
            return h.response({ message: 'Password salah' }).code(401);
          }

          const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
          );

          return h.response({ token }).code(200);
        } catch (error) {
          console.error(error);
          return h.response({ message: 'Terjadi kesalahan saat login' }).code(500);
        }
      }
    }
  },

  // 🔐 Admin Only
  {
    method: 'GET',
    path: '/api/admin-only',
    options: {
      auth: 'jwt',
      handler: (request, h) => {
        const user = request.auth.credentials;

        if (user.role !== 'admin') {
          return h.response({ message: 'Akses ditolak' }).code(403);
        }

        return { message: 'Selamat datang Admin!' };
      }
    }
  }
];
