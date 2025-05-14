require('dotenv').config();
const Hapi = require('@hapi/hapi');
const Jwt = require('@hapi/jwt');
const mongoose = require('mongoose');
const routes = require('./routes/user.routes');
const User = require('./models/user.model');

const init = async () => {
  // 🔌 Koneksi ke MongoDB
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('✅ MongoDB Connected');

  const server = Hapi.server({
    port: process.env.PORT || 5000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*']
      }
    }
  });

  // 🔐 Register plugin JWT
  await server.register(Jwt);

  // 🚧 Define strategi auth langsung di sini (tanpa middleware)
  server.auth.strategy('jwt', 'jwt', {
    keys: process.env.JWT_SECRET,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      nbf: true,
      exp: true,
      maxAgeSec: 86400, // 1 hari
      timeSkewSec: 15
    },
    validate: async (artifacts, request, h) => {
      return {
        isValid: true,
        credentials: artifacts.decoded.payload
      };
    }
  });

  server.auth.default('jwt');

  // 👤 Buat akun admin default kalau belum ada
  const adminExists = await User.findOne({ role: 'admin' });
  if (!adminExists) {
    await User.create({
      username: 'admin',
      email: 'admin@example.com',
      password: await require('bcrypt').hash('admin123', 10),
      role: 'admin'
    });
    console.log('👑 Admin account created');
  }

  // 🌐 Route
  server.route(routes);

  await server.start();
  console.log(`🚀 Server running at: ${server.info.uri}`);
};

init();
