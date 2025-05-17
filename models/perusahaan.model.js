import mongoose from 'mongoose';

const perusahaanSchema = new mongoose.Schema({
  nama: String,
  profil: String,
  email: String,
  situs: String,
  didirikan: String,
  bidang: String,
  lokasi: String,
  provinsi: String,
  tentang: String,
  visi: String,
  misi: String,
  lowongan: [{ id: Number }],
});

const Perusahaan = mongoose.model('Perusahaan', perusahaanSchema);
export default Perusahaan;
