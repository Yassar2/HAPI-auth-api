const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DataPerusahaanSchema = new Schema({
  id_perusahaan: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,  // pastikan unique supaya satu user cuma punya satu perusahaan
  },
  nama: String,
  email: String,
  role: {
    type: String,
    default: 'perusahaan'
  },
  picture: String,
  situs: String,
  tahun_didirikan: String,
  bidang: String,
  karyawan: String,
  lokasi: String,
  provinsi: String,
  tentang: String,
  visi: String,
  misi: String
}, { timestamps: true });

module.exports = mongoose.model('DataPerusahaan', DataPerusahaanSchema, 'data_perusahaans');
