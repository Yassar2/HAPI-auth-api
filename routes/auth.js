const User = require('../models/User');
const DataPelamar = require('../models/DataPelamar');
const DataPerusahaan = require('../models/DataPerusahaan');
const DataAdmin = require('../models/DataAdmin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// ✅ Register dengan logging detail
const register = async (request, h) => {
  try {
    const { nama, username, email, password, role, skill, lokasi } = request.payload;

    console.log("📩 Register attempt:");
    console.log(`📝 Email: ${email}`);
    console.log(`📝 Raw password: ${password}`);

    if (!email || !password) {
      return h.response({ message: 'Email dan password wajib diisi' }).code(400);
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log(`❌ Email ${email} sudah terdaftar`);
      return h.response({ message: 'Email sudah terdaftar' }).code(400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(`🔒 Hashed password: ${hashedPassword}`);

    const newUser = new User({
      nama,
      username,
      email,
      password: hashedPassword,
      role
    });
    await newUser.save();
    console.log(`✅ User ${email} registered successfully!`);

    if (role === 'pelamar') {
      await DataPelamar.create({
        id_pelamar: newUser._id,
        nama,
        email,
        role,
        skill: skill || []
      });
    } else if (role === 'perusahaan') {
      await DataPerusahaan.create({
        id_perusahaan: newUser._id,
        nama,
        email,
        role,
        lokasi: lokasi || ''
      });
    } else if (role === 'admin') {
      await DataAdmin.create({
        id_admin: newUser._id,
        nama,
        email,
        role
      });
    }

    return h.response({
      message: 'User berhasil didaftarkan',
      user: {
        id: newUser._id,
        nama,
        username,
        email,
        role
      }
    }).code(201);

  } catch (error) {
    console.error('🔥 Register error:', error);
    return h.response({
      message: 'Server error',
      error: error.message
    }).code(500);
  }
};

// ✅ Login dengan logging detail
const login = async (request, h) => {
  try {
    const { email, password } = request.payload;

    console.log(`📩 Login attempt for email: ${email}`);
    console.log(`🔑 Raw input password: ${password}`);

    if (!email || !password) {
      return h.response({ message: 'Email dan password wajib diisi' }).code(400);
    }

    const user = await User.findOne({ email });
    if (!user) {
      console.log('❌ User not found');
      return h.response({ message: 'Email atau password salah' }).code(400);
    }

    console.log(`🔍 User found: ${user.email}`);
    console.log(`🔍 Stored hashed password: ${user.password}`);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log(`🔑 Password match result: ${isMatch}`);

    if (!isMatch) {
      console.log('❌ Password does not match');
      return h.response({ message: 'Email atau password salah' }).code(400);
    }

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET || 'fallback-secret-key',
      { expiresIn: '1d' }
    );

    console.log(`✅ Login successful for ${email}`);
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
    console.error('🔥 Login error:', error);
    return h.response({
      message: 'Server error',
      error: error.message
    }).code(500);
  }
};

// ✅ Export routes
module.exports = [
  {
    method: 'POST',
    path: '/api/auth/register',
    options: { auth: false },
    handler: register
  },
  {
    method: 'POST',
    path: '/api/auth/login',
    options: { auth: false },
    handler: login
  },
];
