import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['user', 'perusahaan', 'admin'],
    default: 'user',
  },
  lokasi: String,
  provinsi: String,
  tentang: String,
  skill: [String],
  cv: [{
    id: Number,
    cv: String,
  }],
  status: String,
  lowongan: [{
    id: String,
  }],
  perusahaan: [{
    id: String,
  }],
});

// Hash password sebelum save
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const hashed = await bcrypt.hash(this.password, 10);
    this.password = hashed;
    next();
  } catch (err) {
    next(err);
  }
});

const User = mongoose.model('User', userSchema);
export default User;
