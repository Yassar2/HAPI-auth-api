// routes/kategori.js
const Kategori = require('../models/Kategori');
const Boom = require('@hapi/boom');

module.exports = [
  {
    method: 'GET',
    path: '/api/kategori',
    handler: async (request, h) => {
      try {
        const kategori = await Kategori.find();
        return h.response(kategori).code(200);
      } catch (err) {
        return h.response({ message: 'Gagal mengambil kategori', error: err.message }).code(500);
      }
    }
  },
  {
    method: 'POST',
    path: '/api/kategori',
    options: {
      auth: 'jwt', // nanti harus setup strategy jwt di server.js
      pre: [
        {
          method: (request, h) => {
            // middleware adminOnly
            if (request.auth.credentials.role !== 'admin') {
              throw Boom.forbidden('Akses admin saja');
            }
            return h.continue;
          }
        }
      ]
    },
    handler: async (request, h) => {
      try {
        const kategori = new Kategori({ nama: request.payload.nama });
        await kategori.save();
        return h.response(kategori).code(201);
      } catch (err) {
        return h.response({ message: 'Gagal menambah kategori', error: err.message }).code(500);
      }
    }
  }
];
