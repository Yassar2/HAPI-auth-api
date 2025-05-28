const DataPerusahaan = require('../models/DataPerusahaan');

const getPerusahaan = async (request, h) => {
  try {
    const data = await DataPerusahaan.find();
    return h.response(data);
  } catch (error) {
    return h.response({ message: 'Server error', error: error.message }).code(500);
  }
};

module.exports = [
  {
    method: 'GET',
    path: '/api/perusahaan',
    options: {
      auth: {
        strategies: ['jwt'],
        scope: ['admin', 'perusahaan'], // ⬅️ Tambah perusahaan
      }
    },
    handler: getPerusahaan,
  },
];
