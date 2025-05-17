import 'dotenv/config'; // langsung load dotenv
import Hapi from '@hapi/hapi';
import Jwt from '@hapi/jwt';
import mongoose from 'mongoose';
import routes from './routes/authRoutes.js';  // pastikan pakai .js di ESM
import User from './models/user.model.js';

const init = async () => {
  // Koneksi MongoDB
  await mongoose.connect(process.env.MONGO_URI, {
    // Warning untuk useNewUrlParser dan useUnifiedTopology di driver baru bisa diabaikan
  });
  console.log('✅ MongoDB Connected');

  const server = Hapi.server({
    port: process.env.PORT || 5000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  // Register JWT plugin
  await server.register(Jwt);

  // Definisikan strategi auth JWT
  server.auth.strategy('jwt', 'jwt', {
    keys: process.env.JWT_SECRET,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      nbf: true,
      exp: true,
      maxAgeSec: 86400, // 1 hari
      timeSkewSec: 15,
    },
    validate: async (artifacts, request, h) => ({
      isValid: true,
      credentials: artifacts.decoded.payload,
    }),
  });

  server.auth.default('jwt'); // Semua route pakai auth default

  // Buat admin jika belum ada
  const adminExists = await User.findOne({ role: 'admin' });
  if (!adminExists) {
    await User.create({
      username: 'admin',
      email: 'admin@example.com',
      password: 'admin123', // hash otomatis di model
      role: 'admin',
    });
    console.log('👑 Admin account created');
  }

  // Daftarkan routes
  server.route(routes);

  await server.start();
  console.log(`🚀 Server running at: ${server.info.uri}`);
};

init();
