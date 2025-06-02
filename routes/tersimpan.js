const Hapi = require('@hapi/hapi');
const LowonganTersimpan = require('../models/LowonganTersimpan');
const PerusahaanTersimpan = require('../models/PerusahaanTersimpan');

module.exports = [
  {
    method: 'POST',
    path: '/api/tersimpan/lowongan',
    handler: async (request, h) => {
      const { id_lowongan } = request.payload;
      const id_pelamar = request.auth.credentials.id;
      const existing = await LowonganTersimpan.findOne({ id_pelamar, id_lowongan });
      if (existing) return h.response({ message: 'Sudah disimpan' }).code(400);

      const tersimpan = new LowonganTersimpan({ id_pelamar, id_lowongan });
      await tersimpan.save();
      return { message: 'Lowongan disimpan', tersimpan };
    }
  },
  {
    method: 'DELETE',
    path: '/api/tersimpan/lowongan/{id}',
    handler: async (request, h) => {
      const id_pelamar = request.auth.credentials.id;
      const id = request.params.id;
      await LowonganTersimpan.deleteOne({ id_pelamar, id_lowongan: id });
      return { message: 'Lowongan dihapus' };
    }
  },
  {
    method: 'POST',
    path: '/api/tersimpan/perusahaan',
    handler: async (request, h) => {
      const { id_perusahaan } = request.payload;
      const id_pelamar = request.auth.credentials.id;
      const existing = await PerusahaanTersimpan.findOne({ id_pelamar, id_perusahaan });
      if (existing) return h.response({ message: 'Sudah disimpan' }).code(400);

      const tersimpan = new PerusahaanTersimpan({ id_pelamar, id_perusahaan });
      await tersimpan.save();
      return { message: 'Perusahaan disimpan', tersimpan };
    }
  },
  {
    method: 'DELETE',
    path: '/api/tersimpan/perusahaan/{id}',
    handler: async (request, h) => {
      const id_pelamar = request.auth.credentials.id;
      const id = request.params.id;
      await PerusahaanTersimpan.deleteOne({ id_pelamar, id_perusahaan: id });
      return { message: 'Perusahaan dihapus' };
    }
  }
];
