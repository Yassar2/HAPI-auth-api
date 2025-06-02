const User = require('../models/User');
const DataPelamar = require('../models/DataPelamar');
const DataPerusahaan = require('../models/DataPerusahaan');
const DataAdmin = require('../models/DataAdmin');
const Pelamar = require('../models/Pelamar');
const Skill = require('../models/Skill');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Helper: Simpan skill ke koleksi `skills` jika belum ada
const saveSkills = async (skills) => {
  if (!Array.isArray(skills)) return;

  for (const nama of skills) {
    if (!nama || typeof nama !== 'string') continue;

    await Skill.findOneAndUpdate(
      { nama },
      { nama },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
  }
};

const register = async (request, h) => {
  try {
    const {
      nama,
      username,
      email,
      password,
      role,
      skill,
      lokasi,
      picture,
      spesialisasi,
      provinsi,
      tentang
    } = request.payload;

    if (!email || !password) {
      return h.response({ message: 'Email dan password wajib diisi' }).code(400);
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return h.response({ message: 'Email sudah terdaftar' }).code(400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      nama,
      username,
      email,
      password: hashedPassword,
      role
    });
    await newUser.save();

    if (role === 'pelamar') {
      await DataPelamar.create({
        id_pelamar: newUser._id,
        nama,
        email,
        role,
        skill: skill || [],
        lokasi: lokasi || '',
        created_at: new Date()
      });

      await Pelamar.create({
        id_pelamar: newUser._id,
        picture: picture || '',
        spesialisasi: spesialisasi || '',
        lokasi: lokasi || '',
        provinsi: provinsi || '',
        tentang: tentang || '',
        skill: skill || [],
        created_at: new Date()
      });

      await saveSkills(skill || []);
    } else if (role === 'perusahaan') {
      await DataPerusahaan.create({
        id_perusahaan: newUser._id,
        nama,
        email,
        role,
        lokasi: lokasi || '',
        created_at: new Date()
      });
    } else if (role === 'admin') {
      await DataAdmin.create({
        id_admin: newUser._id,
        nama,
        email,
        role,
        created_at: new Date()
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
    return h.response({
      message: 'Server error',
      error: error.message
    }).code(500);
  }
};

const login = async (request, h) => {
  try {
    const { email, password } = request.payload;

    if (!email || !password) {
      return h.response({ message: 'Email dan password wajib diisi' }).code(400);
    }

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
      process.env.JWT_SECRET || 'fallback-secret-key',
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
      error: error.message
    }).code(500);
  }
};

// Convenience handler khusus pelamar (register dengan role pelamar)
const registerPelamar = async (request, h) => {
  const payload = { ...request.payload, role: 'pelamar' };
  return register({ payload }, h);
};

// Convenience handler khusus perusahaan (login dengan filter role perusahaan)
const loginPerusahaan = async (request, h) => {
  const { email, password } = request.payload;

  const user = await User.findOne({ email, role: 'perusahaan' });
  if (!user) {
    return h.response({ message: 'Perusahaan tidak ditemukan atau password salah' }).code(400);
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return h.response({ message: 'Perusahaan tidak ditemukan atau password salah' }).code(400);
  }

  const token = jwt.sign(
    { userId: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET || 'fallback-secret-key',
    { expiresIn: '1d' }
  );

  return h.response({
    message: 'Login perusahaan berhasil',
    token,
    user: {
      id: user._id,
      nama: user.nama,
      email: user.email,
      role: user.role
    }
  });
};

module.exports = [
  { method: 'POST', path: '/api/auth/register', options: { auth: false }, handler: register },
  { method: 'POST', path: '/api/auth/login', options: { auth: false }, handler: login },
  { method: 'POST', path: '/api/auth/register-pelamar', options: { auth: false }, handler: registerPelamar },
  { method: 'POST', path: '/api/auth/login-perusahaan', options: { auth: false }, handler: loginPerusahaan },
];
