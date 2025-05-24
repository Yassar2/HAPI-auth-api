const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DataPerusahaanSchema = new Schema({
  id_perusahaan: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  nama: String,
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

// ⬇️ Tambahkan nama koleksi eksplisit
module.exports = mongoose.model('DataPerusahaan', DataPerusahaanSchema, 'data_perusahaans');
