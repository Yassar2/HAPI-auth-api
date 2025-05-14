const authController = require('../controllers/authController');

module.exports = [
  {
    method: 'POST',
    path: '/api/register',
    handler: authController.register
  },
  {
    method: 'POST',
    path: '/api/login',
    handler: authController.login
  },
  {
    method: 'GET',
    path: '/api/admin-only',
    options: {
      auth: 'jwt',
      handler: (request, h) => {
        const user = request.auth.credentials;
        if (user.role !== 'admin') {
          return h.response({ message: "Akses ditolak" }).code(403);
        }
        return { message: "Selamat datang Admin!" };
      }
    }
  }
];
