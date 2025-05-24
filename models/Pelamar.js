const mongoose = require('mongoose');

const pelamarSchema = new mongoose.Schema({
  id_pelamar: { type: Number, required: true, unique: true },
  nama: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['pelamar'], default: 'pelamar' },
  created_at: { type: String, required: true } // format: YYYY-MM-DD
});

module.exports = mongoose.model('Pelamar', pelamarSchema);
