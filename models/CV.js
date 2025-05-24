// models/CV.js
const mongoose = require('mongoose');

const cvSchema = new mongoose.Schema({
  id_pelamar: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  nama: String,
  size: Number,
  link: String, // tambahkan ini
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('CV', cvSchema);
