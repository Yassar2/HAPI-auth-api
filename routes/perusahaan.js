const DataPerusahaan = require('../models/DataPerusahaan');

const getPerusahaan = async (request, h) => {
  try {
    const data = await DataPerusahaan.find();
    return h.response(data);
  } catch (error) {
    return h.response({ message: 'Server error', error: error.message }).code(500);
  }
};

const getPerusahaanById = async (request, h) => {
  try {
    const { id } = request.params;
    const data = await DataPerusahaan.findById(id);
    if (!data) return h.response({ message: 'Perusahaan not found' }).code(404);
    return h.response(data);
  } catch (error) {
    return h.response({ message: 'Server error', error: error.message }).code(500);
  }
};

const updatePerusahaanProfile = async (request, h) => {
  try {
    const userId = request.auth.credentials.id;
    const updateData = request.payload;
    const updated = await DataPerusahaan.findOneAndUpdate(
      { userId },
      { $set: updateData },
      { new: true, upsert: true }
    );
    return h.response(updated);
  } catch (error) {
    return h.response({ message: 'Error updating perusahaan profile', error: error.message }).code(500);
  }
};

const updatePerusahaanById = async (request, h) => {
  try {
    const { id } = request.params;
    const updateData = request.payload;
    const updated = await DataPerusahaan.findByIdAndUpdate(id, { $set: updateData }, { new: true });
    if (!updated) return h.response({ message: 'Perusahaan not found' }).code(404);
    return h.response(updated);
  } catch (error) {
    return h.response({ message: 'Error updating perusahaan', error: error.message }).code(500);
  }
};

const deletePerusahaanById = async (request, h) => {
  try {
    const { id } = request.params;
    const deleted = await DataPerusahaan.findByIdAndDelete(id);
    if (!deleted) return h.response({ message: 'Perusahaan not found' }).code(404);
    return h.response({ message: 'Perusahaan deleted successfully' });
  } catch (error) {
    return h.response({ message: 'Error deleting perusahaan', error: error.message }).code(500);
  }
};

module.exports = [
  { method: 'GET', path: '/api/perusahaan', options: { auth: { strategies: ['jwt'], scope: ['admin', 'perusahaan'] } }, handler: getPerusahaan },
  { method: 'GET', path: '/api/perusahaan/{id}', options: { auth: { strategies: ['jwt'], scope: ['admin'] } }, handler: getPerusahaanById },
  { method: 'PATCH', path: '/api/perusahaan/profile', options: { auth: { strategies: ['jwt'], scope: ['perusahaan'] } }, handler: updatePerusahaanProfile },
  { method: 'PUT', path: '/api/perusahaan/{id}', options: { auth: { strategies: ['jwt'], scope: ['admin'] } }, handler: updatePerusahaanById },
  { method: 'DELETE', path: '/api/perusahaan/{id}', options: { auth: { strategies: ['jwt'], scope: ['admin'] } }, handler: deletePerusahaanById },
];
