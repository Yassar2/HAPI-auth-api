const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  nama: String
});

module.exports = mongoose.model('Skill', skillSchema);
