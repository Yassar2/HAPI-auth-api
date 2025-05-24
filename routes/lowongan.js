const Lowongan = require('../models/Lowongan');
const { auth } = require('../middleware/authMiddleware'); // Pastikan middleware auth juga sudah Hapi compatible

const getLowongan = async (request, h) => {
  try {
    const data = await Lowongan.find().populate('perusahaan kategori skills');
    return h.response(data);
  } catch (error) {
    return h.response({ message: 'Server error', error: error.message }).code(500);
  }
};

const createLowongan = async (request, h) => {
  try {
    const lowongan = new Lowongan(request.payload);
    await lowongan.save();
    return h.response(lowongan).code(201);
  } catch (error) {
    return h.response({ message: 'Server error', error: error.message }).code(500);
  }
};

module.exports = [
  {
    method: 'GET',
    path: '/api/lowongan',
    handler: getLowongan,
  },
  {
    method: 'POST',
    path: '/api/lowongan',
    options: {
      pre: [{ method: auth, assign: 'user' }], // middleware auth
    },
    handler: createLowongan,
  },
];
