import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  nama: String,
});

const Skill = mongoose.model('Skill', skillSchema);
export default Skill;
