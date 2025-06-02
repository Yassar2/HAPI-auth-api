const mongoose = require('mongoose');

const perusahaanSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: true,
  },
  alamat: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  telepon: {
    type: String,
    required: true,
  },
  website: {
    type: String,
  },
  deskripsi: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Perusahaan = mongoose.model('Perusahaan', perusahaanSchema);

module.exports = Perusahaan;
