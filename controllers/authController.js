const User = require('/models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (request, h) => {
  const { username, email, password, role } = request.payload;
  try {
    const user = new User({ username, email, password, role });
    await user.save();
    return h.response({ message: "Berhasil register" }).code(201);
  } catch (err) {
    return h.response({ error: err.message }).code(400);
  }
};

exports.login = async (request, h) => {
  const { email, password } = request.payload;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return h.response({ message: "Email atau password salah" }).code(401);
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
    return { token, role: user.role };
  } catch (err) {
    return h.response({ error: err.message }).code(500);
  }
};
