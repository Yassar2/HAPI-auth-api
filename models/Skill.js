const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  nama: { type: String, unique: true, required: true }
});

module.exports = mongoose.model('Skill', skillSchema);
