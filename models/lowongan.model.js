import mongoose from 'mongoose';

const perusahaanSchema = new mongoose.Schema({
  nama: String,
  profil: String,
  bidang: String,
  lokasi: String,
  provinsi: String,
  tentang: String,
}, { _id: false });

const lowonganSchema = new mongoose.Schema({
  tanggal: String,
  nama: String,
  gajiMin: Number,
  gajiMax: Number,
  kategori: String,
  jenis: String,
  tingkat: String,
  tentang: String,
  syarat: String,
  skill: [String],
  perusahaan: perusahaanSchema,
});

const Lowongan = mongoose.model('Lowongan', lowonganSchema);
export default Lowongan;
