const User = require('../models/User');
const DataPelamar = require('../models/DataPelamar');
const DataPerusahaan = require('../models/DataPerusahaan');
const DataAdmin = require('../models/DataAdmin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (request, h) => {
  try {
    const { nama, username, email, password, role } = request.payload;

    // Cek apakah email sudah terdaftar
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return h.response({ message: 'Email sudah terdaftar' }).code(400);
    }

    // Buat user baru
    const newUser = new User({
      nama,
      username,
      email,
      password,
      role
    });

    // Simpan user
    await newUser.save();

    // Tambahkan data pelamar/perusahaan/admin otomatis
    if (newUser.role === 'pelamar') {
      await DataPelamar.create({ id_pelamar: newUser._id });
    } else if (newUser.role === 'perusahaan') {
      await DataPerusahaan.create({ id_perusahaan: newUser._id });
    } else if (newUser.role === 'admin') {
      await DataAdmin.create({ id_admin: newUser._id });
    }

    return h.response({
      message: 'User berhasil didaftarkan',
      user: {
        id: newUser._id,
        nama: newUser.nama,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role
      }
    }).code(201);

  } catch (error) {
    return h.response({
      message: 'Server error',
      error: error.message,
    }).code(500);
  }
};

const login = async (request, h) => {
  try {
    const { email, password } = request.payload;

    // Cari user berdasarkan email
    const user = await User.findOne({ email });
    if (!user) {
      return h.response({ message: 'Email atau password salah' }).code(400);
    }

    // Verifikasi password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return h.response({ message: 'Email atau password salah' }).code(400);
    }

    // Buat JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    return h.response({
      message: 'Login berhasil',
      token,
      user: {
        id: user._id,
        nama: user.nama,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    return h.response({
      message: 'Server error',
      error: error.message,
    }).code(500);
  }
};

module.exports = [
  {
    method: 'POST',
    path: '/api/auth/register',
    options: {
      auth: false
    },
    handler: register,
  },
  {
    method: 'POST',
    path: '/api/auth/login',
    options: {
      auth: false
    },
    handler: login,
  }
];
