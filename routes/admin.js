const DataAdmin = require('../models/DataAdmin');

const getAllAdmin = async (request, h) => {
  try {
    const data = await DataAdmin.find();
    return h.response(data);
  } catch (error) {
    return h.response({ message: 'Server error', error: error.message }).code(500);
  }
};

module.exports = [
  {
    method: 'GET',
    path: '/api/admin',
    options: {
      auth: {
        strategies: ['jwt'],
        scope: ['admin'], // Hanya admin yang boleh akses data admin
      }
    },
    handler: getAllAdmin,
  },
];
