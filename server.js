require('dotenv').config();
const Hapi = require('@hapi/hapi');
const connectDB = require('./config/db');
const routes = require('./routes/authRoutes');
const User = require('/models/User');
const Jwt = require('@hapi/jwt');

const init = async () => {
  await connectDB();

  const server = Hapi.server({
    port: process.env.PORT,
    host: 'localhost'
  });

  await server.register(Jwt);

  server.auth.strategy('jwt', 'jwt', require('./utils/authMiddleware').authStrategy);
  server.auth.default('jwt');

  // Tambah admin default
  const admin = await User.findOne({ role: 'admin' });
  if (!admin) {
    await User.create({
      username: 'admin',
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin'
    });
    console.log("✅ Akun admin dibuat");
  }

  server.route(routes);

  await server.start();
  console.log(`🚀 Server running at: ${server.info.uri}`);
};

init();
