// seed.js
import 'dotenv/config';
import mongoose from 'mongoose';

import Lowongan from './models/lowongan.model.js';  // sesuaikan dengan file model Lowongan-mu
import Perusahaan from './models/perusahaan.model.js';
import Kategori from './models/kategori.model.js';
import Skill from './models/skill.model.js';
import User from './models/user.model.js';

import { lowongan, perusahaan, kategori, skill, user } from './data.js';

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB');

    // Kosongkan koleksi
    await Promise.all([
      Lowongan.deleteMany(),
      Perusahaan.deleteMany(),
      Kategori.deleteMany(),
      Skill.deleteMany(),
      User.deleteMany(),
    ]);

    // Insert data dummy
    await Promise.all([
      Perusahaan.insertMany(perusahaan),
      Kategori.insertMany(kategori),
      Skill.insertMany(skill),
      Lowongan.insertMany(lowongan),
      User.insertMany(user),
    ]);

    console.log('✅ Seeding completed!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Failed to seed data:', err);
    process.exit(1);
  }
}

seed();
