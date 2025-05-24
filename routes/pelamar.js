const bcrypt = require('bcryptjs');
const Pelamar = require('../models/Pelamar');

module.exports = [
  // ✅ Register pelamar
  {
    method: 'POST',
    path: '/pelamar/register',
    options: { auth: false },
    handler: async (request, h) => {
      try {
        const { id_pelamar, nama, email, password } = request.payload;
        const existing = await Pelamar.findOne({ email });
        if (existing) {
          return h.response({ message: 'Email sudah terdaftar' }).code(400);
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const pelamar = new Pelamar({
          id_pelamar,
          nama,
          email,
          password: hashedPassword,
          role: 'pelamar', // ✅ wajib untuk validasi schema
          created_at: new Date().toISOString().split('T')[0],
        });

        await pelamar.save();
        return h.response({ message: 'Pelamar berhasil didaftarkan' }).code(201);
      } catch (error) {
        return h.response({ message: 'Gagal register pelamar', error: error.message }).code(500);
      }
    },
  },

  // ✅ Get semua pelamar
  {
    method: 'GET',
    path: '/pelamar',
    handler: async (request, h) => {
      try {
        const list = await Pelamar.find();
        return h.response(list).code(200);
      } catch (error) {
        return h.response({ message: 'Gagal mengambil data pelamar', error: error.message }).code(500);
      }
    },
  },

  // ✅ Get pelamar by ID
  {
    method: 'GET',
    path: '/pelamar/{id}',
    handler: async (request, h) => {
      try {
        const pelamar = await Pelamar.findById(request.params.id);
        if (!pelamar) {
          return h.response({ message: 'Pelamar tidak ditemukan' }).code(404);
        }
        return h.response(pelamar).code(200);
      } catch (error) {
        return h.response({ message: 'Gagal mengambil pelamar', error: error.message }).code(500);
      }
    },
  },

  // ✅ Update pelamar
  {
    method: 'PUT',
    path: '/pelamar/{id}',
    handler: async (request, h) => {
      try {
        const updated = await Pelamar.findByIdAndUpdate(request.params.id, request.payload, {
          new: true,
          runValidators: true,
        });
        if (!updated) {
          return h.response({ message: 'Pelamar tidak ditemukan' }).code(404);
        }
        return h.response({ message: 'Pelamar berhasil diupdate', data: updated }).code(200);
      } catch (error) {
        return h.response({ message: 'Gagal update pelamar', error: error.message }).code(500);
      }
    },
  },

  // ✅ Delete pelamar
  {
    method: 'DELETE',
    path: '/pelamar/{id}',
    handler: async (request, h) => {
      try {
        const deleted = await Pelamar.findByIdAndDelete(request.params.id);
        if (!deleted) {
          return h.response({ message: 'Pelamar tidak ditemukan' }).code(404);
        }
        return h.response({ message: 'Pelamar berhasil dihapus' }).code(200);
      } catch (error) {
        return h.response({ message: 'Gagal hapus pelamar', error: error.message }).code(500);
      }
    },
  },

  // ✅ Login pelamar
  {
    method: 'POST',
    path: '/pelamar/login',
    options: { auth: false },
    handler: async (request, h) => {
      try {
        const { email, password } = request.payload;
        const pelamar = await Pelamar.findOne({ email });
        if (!pelamar) {
          return h.response({ message: 'Email tidak ditemukan' }).code(404);
        }

        const match = await bcrypt.compare(password, pelamar.password);
        if (!match) {
          return h.response({ message: 'Password salah' }).code(400);
        }

        return h.response({ message: 'Login berhasil', pelamar }).code(200);
      } catch (error) {
        return h.response({ message: 'Gagal login', error: error.message }).code(500);
      }
    },
  },
];
