'use strict';

const Hapi = require('@hapi/hapi');
const Jwt = require('@hapi/jwt');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');
const kategoriRoutes = require('./routes/kategori');
const perusahaanRoutes = require('./routes/perusahaan');
const skillRoutes = require('./routes/skill');
const lowonganRoutes = require('./routes/lowongan');
const refreshTokenRoutes = require('./routes/refreshToken');
const pelamarRoutes = require('./routes/pelamar');

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 5000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'], // ⚠️ Bisa diubah ke whitelist domain saat production
      },
    },
  });

  // Register plugin JWT
  await server.register(Jwt);

  // JWT Auth Strategy
  server.auth.strategy('jwt', 'jwt', {
    keys: process.env.JWT_SECRET,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: 15 * 60, // 15 menit
    },
    validate: (artifacts, request, h) => {
      const payload = artifacts.decoded?.payload;
      if (!payload?.id || !payload?.role) {
        return { isValid: false };
      }

      return {
        isValid: true,
        credentials: {
          id: payload.id,
          role: payload.role,
        },
      };
    },
  });

  // Default auth strategy
  server.auth.default('jwt');

  // Route root tanpa autentikasi
  server.route({
    method: 'GET',
    path: '/',
    options: {
      auth: false,
    },
    handler: () => {
      return '🎯 Job Portal API is running';
    },
  });

  // Register all routes
  [
    ...authRoutes,
    ...userRoutes,
    ...adminRoutes,
    ...kategoriRoutes,
    ...perusahaanRoutes,
    ...skillRoutes,
    ...lowonganRoutes,
    ...refreshTokenRoutes,
    ...pelamarRoutes,
  ].forEach((route) => server.route(route));

  // Middleware: Global error formatter (opsional tapi rapi)
  server.ext('onPreResponse', (request, h) => {
    const response = request.response;
    if (response.isBoom) {
      const { statusCode, payload } = response.output;
      return h
        .response({
          statusCode,
          error: payload.error,
          message: response.message || 'Internal Server Error',
        })
        .code(statusCode);
    }
    return h.continue;
  });

  // Koneksi ke MongoDB
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  }

  await server.start();
  console.log(`🚀 Server running at ${server.info.uri}`);
};

init();
