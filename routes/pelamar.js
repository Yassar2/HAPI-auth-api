const Pelamar = require('../models/Pelamar');
const { updatePelamarProfile } = require('../controllers/authController');

const getPelamar = async (request, h) => {
  try {
    const data = await Pelamar.find();
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
        scope: ['admin', 'pelamar'], // ✅ cek scope
      }
    },
    handler: getPelamar,
  },
  {
    method: 'PATCH',
    path: '/api/pelamar/profile',
    options: {
      auth: {
        strategies: ['jwt'],
        scope: ['pelamar'], // ✅ cek scope
      }
    },
    handler: updatePelamarProfile
  }
];
