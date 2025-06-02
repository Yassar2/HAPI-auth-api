const DataAdmin = require('../models/DataAdmin');

const getAllAdmin = async (request, h) => {
  try {
    const data = await DataAdmin.find();
    return h.response(data);
  } catch (error) {
    return h.response({ message: 'Server error', error: error.message }).code(500);
  }
};

const getAdminById = async (request, h) => {
  try {
    const { id } = request.params;
    const data = await DataAdmin.findById(id);
    if (!data) return h.response({ message: 'Admin not found' }).code(404);
    return h.response(data);
  } catch (error) {
    return h.response({ message: 'Server error', error: error.message }).code(500);
  }
};

const updateAdminProfile = async (request, h) => {
  try {
    const userId = request.auth.credentials.id;
    const updateData = request.payload;
    const updated = await DataAdmin.findOneAndUpdate(
      { userId },
      { $set: updateData },
      { new: true, upsert: true }
    );
    return h.response(updated);
  } catch (error) {
    return h.response({ message: 'Error updating admin profile', error: error.message }).code(500);
  }
};

const updateAdminById = async (request, h) => {
  try {
    const { id } = request.params;
    const updateData = request.payload;
    const updated = await DataAdmin.findByIdAndUpdate(id, { $set: updateData }, { new: true });
    if (!updated) return h.response({ message: 'Admin not found' }).code(404);
    return h.response(updated);
  } catch (error) {
    return h.response({ message: 'Error updating admin', error: error.message }).code(500);
  }
};

const deleteAdminById = async (request, h) => {
  try {
    const { id } = request.params;
    const deleted = await DataAdmin.findByIdAndDelete(id);
    if (!deleted) return h.response({ message: 'Admin not found' }).code(404);
    return h.response({ message: 'Admin deleted successfully' });
  } catch (error) {
    return h.response({ message: 'Error deleting admin', error: error.message }).code(500);
  }
};

module.exports = [
  { method: 'GET', path: '/api/admin', options: { auth: { strategies: ['jwt'], scope: ['admin'] } }, handler: getAllAdmin },
  { method: 'GET', path: '/api/admin/{id}', options: { auth: { strategies: ['jwt'], scope: ['admin'] } }, handler: getAdminById },
  { method: 'PATCH', path: '/api/admin/profile', options: { auth: { strategies: ['jwt'], scope: ['admin'] } }, handler: updateAdminProfile },
  { method: 'PUT', path: '/api/admin/{id}', options: { auth: { strategies: ['jwt'], scope: ['admin'] } }, handler: updateAdminById },
  { method: 'DELETE', path: '/api/admin/{id}', options: { auth: { strategies: ['jwt'], scope: ['admin'] } }, handler: deleteAdminById },
];
