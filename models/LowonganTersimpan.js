// models/LowonganTersimpan.js
const mongoose = require('mongoose');

const LowonganTersimpanSchema = new mongoose.Schema({
  id_pelamar: { type: mongoose.Schema.Types.ObjectId, ref: 'Pelamar', required: true },
  id_lowongan: { type: mongoose.Schema.Types.ObjectId, ref: 'Lowongan', required: true },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('LowonganTersimpan', LowonganTersimpanSchema);
