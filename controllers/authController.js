const User = require('../models/User');
const Pelamar = require('../models/Pelamar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// ✅ REGISTER
exports.register = async (request, h) => {
  try {
    const { username, email, password, role } = request.payload;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return h.response({ message: 'Email sudah terdaftar' }).code(400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    if (role === 'pelamar') {
      await Pelamar.create({
        id_pelamar: newUser._id,
        picture: '',
        spesialisasi: '',
        lokasi: '',
        provinsi: '',
        tentang: '',
        skill: [],
      });
    }

    return h.response({
      message: 'User berhasil didaftarkan',
      user: { id: newUser._id, username, email, role }
    }).code(201);

  } catch (error) {
    console.error('Register error:', error);
    return h.response({
      message: 'Server error',
      error: error.message,
    }).code(500);
  }
};

// ✅ LOGIN
exports.login = async (request, h) => {
  try {
    const { email, password } = request.payload;

    const user = await User.findOne({ email });
    if (!user) {
      return h.response({ message: 'Email atau password salah' }).code(400);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return h.response({ message: 'Email atau password salah' }).code(400);
    }

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
        username: user.username,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    return h.response({
      message: 'Server error',
      error: error.message,
    }).code(500);
  }
};

// ✅ UPDATE PROFIL PELAMAR
exports.updatePelamarProfile = async (request, h) => {
  try {
    const { id: userId } = request.auth.credentials;
    const {
      picture,
      spesialisasi,
      lokasi,
      provinsi,
      tentang,
      skill
    } = request.payload;

    const pelamar = await Pelamar.findOneAndUpdate(
      { id_pelamar: userId },
      {
        picture,
        spesialisasi,
        lokasi,
        provinsi,
        tentang,
        skill
      },
      { new: true }
    );

    if (!pelamar) {
      return h.response({ message: 'Pelamar tidak ditemukan' }).code(404);
    }

    return h.response({
      message: 'Profil pelamar berhasil diperbarui',
      data: pelamar
    }).code(200);

  } catch (error) {
    console.error('Update profile error:', error);
    return h.response({
      message: 'Gagal memperbarui profil',
      error: error.message
    }).code(500);
  }
};
