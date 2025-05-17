// models/kategori.model.js
import mongoose from 'mongoose';

const kategoriSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: true,
  },
}, {
  timestamps: true, // opsional, menambahkan createdAt dan updatedAt
});

const Kategori = mongoose.model('Kategori', kategoriSchema);

export default Kategori;
