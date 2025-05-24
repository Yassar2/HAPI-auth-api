// routes/admin.js
const Boom = require('@hapi/boom');

module.exports = [
  {
    method: 'GET',
    path: '/api/admin',
    handler: (request, h) => {
      return '🚀 Admin route is working!';
    }
  }

  // Kamu bisa tambah route lain di sini, misal untuk CRUD admin nanti
];
