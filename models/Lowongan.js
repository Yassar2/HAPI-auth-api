const mongoose = require('mongoose');

const lowonganSchema = new mongoose.Schema({
  judul: String,
  deskripsi: String,
  perusahaan: { type: mongoose.Schema.Types.ObjectId, ref: 'Perusahaan' },
  kategori: { type: mongoose.Schema.Types.ObjectId, ref: 'Kategori' },
  skills: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Skill' }],
  tanggalPost: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Lowongan', lowonganSchema);
