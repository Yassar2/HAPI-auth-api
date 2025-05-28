const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DataPelamarSchema = new Schema({
  id_pelamar: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  nama: String,           // Tambah
  email: String,          // Tambah
  role: {                 // Tambah
    type: String,
    default: 'pelamar'
  },
  picture: String,
  spesialisasi: String,
  lokasi: String,
  provinsi: String,
  tentang: String,
  skill: {
    type: [String],
    default: []
  }
}, { timestamps: true });

module.exports = mongoose.model('DataPelamar', DataPelamarSchema, 'data_pelamars');
