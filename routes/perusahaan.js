const Perusahaan = require('../models/Perusahaan');

const getPerusahaan = async (request, h) => {
  try {
    const data = await Perusahaan.find();
    return h.response(data);
  } catch (error) {
    return h.response({ message: 'Server error', error: error.message }).code(500);
  }
};

module.exports = [
  {
    method: 'GET',
    path: '/api/perusahaan',
    handler: getPerusahaan,
  },
];
