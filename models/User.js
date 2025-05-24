const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Gunakan bcryptjs agar konsisten dengan file route lain

const userSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['admin', 'pelamar', 'perusahaan'],
    required: true
  },
  refreshToken: {
    type: String,
    default: null
  }
}, { timestamps: true });

// Hash password sebelum menyimpan
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Metode untuk verifikasi password
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
