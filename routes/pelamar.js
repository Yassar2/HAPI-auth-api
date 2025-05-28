const DataPelamar = require('../models/DataPelamar');

const getPelamar = async (request, h) => {
  try {
    const data = await DataPelamar.find();
    return h.response(data);
  } catch (error) {
    return h.response({ message: 'Server error', error: error.message }).code(500);
  }
};

module.exports = [
  {
    method: 'GET',
    path: '/api/pelamar',
    options: {
      auth: {
        strategies: ['jwt'],
        scope: ['admin', 'pelamar'], // ⬅️ Tambah pelamar
      }
    },
    handler: getPelamar,
  },
];
