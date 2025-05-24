const mongoose = require('mongoose');

const perusahaanSchema = new mongoose.Schema({
  nama: String,
  deskripsi: String
});

module.exports = mongoose.model('Perusahaan', perusahaanSchema);
