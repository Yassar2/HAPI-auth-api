// models/PerusahaanTersimpan.js
const mongoose = require('mongoose');

const PerusahaanTersimpanSchema = new mongoose.Schema({
  id_pelamar: { type: mongoose.Schema.Types.ObjectId, ref: 'Pelamar', required: true },
  id_perusahaan: { type: mongoose.Schema.Types.ObjectId, ref: 'Perusahaan', required: true },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('PerusahaanTersimpan', PerusahaanTersimpanSchema);
