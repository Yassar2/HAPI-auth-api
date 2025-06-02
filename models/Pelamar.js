const mongoose = require('mongoose');

const pelamarSchema = new mongoose.Schema({
  id_pelamar: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  picture: {
    type: String,
    default: '', // Default kosong
  },
  spesialisasi: {
    type: String,
    default: '',
  },
  lokasi: {
    type: String,
    default: '',
  },
  provinsi: {
    type: String,
    default: '',
  },
  tentang: {
    type: String,
    default: '',
  },
  skill: {
    type: [String], // Array of skill
    default: [],
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Pelamar', pelamarSchema);
