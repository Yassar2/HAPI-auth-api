const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DataAdminSchema = new Schema({
  id_admin: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  nama: String,           // Tambah
  email: String,          // Tambah
  role: {                 // Tambah
    type: String,
    default: 'admin'
  }
}, { timestamps: true });

module.exports = mongoose.model('DataAdmin', DataAdminSchema);
