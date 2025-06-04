const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DataAdminSchema = new Schema({
  id_admin: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true, // pastikan satu user punya satu data admin
  },
  nama: String,
  email: String,
  role: {
    type: String,
    default: 'admin'
  }
}, { timestamps: true });

module.exports = mongoose.model('DataAdmin', DataAdminSchema);
