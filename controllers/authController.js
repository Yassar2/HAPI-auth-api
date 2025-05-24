const User = require('../models/User'); // pastikan sudah ada model User
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (request, h) => {
  try {
    const { username, email, password } = request.payload;

    // Cek user sudah ada atau belum
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return h.response({ message: 'Email sudah terdaftar' }).code(400);
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Simpan user baru
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return h.response({
      message: 'User berhasil didaftarkan',
      user: { id: newUser._id, username, email }
    }).code(201);

  } catch (error) {
    return h.response({
      message: 'Server error',
      error: error.message,
    }).code(500);
  }
};

exports.login = async (request, h) => {
  try {
    const { email, password } = request.payload;

    // Cari user berdasarkan email
    const user = await User.findOne({ email });
    if (!user) {
      return h.response({ message: 'Email atau password salah' }).code(400);
    }

    // Cek password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return h.response({ message: 'Email atau password salah' }).code(400);
    }

    // Buat token JWT
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    return h.response({
      message: 'Login berhasil',
      token,
    });

  } catch (error) {
    return h.response({
      message: 'Server error',
      error: error.message,
    }).code(500);
  }
};
