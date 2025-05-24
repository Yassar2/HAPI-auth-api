// File: seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('./models/User');
const Kategori = require('./models/Kategori');
const Skill = require('./models/Skill');
const Perusahaan = require('./models/Perusahaan');
const Lowongan = require('./models/Lowongan');
const Pelamar = require('./models/Pelamar');


const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Terhubung ke MongoDB');

    const today = new Date().toISOString().split('T')[0];

    // --- Seed Admin ---
    const adminEmail = 'admin@gmail.com';
    const adminExists = await User.findOne({ email: adminEmail });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await User.create({
        nama: 'Admin',
        email: adminEmail,
        password: hashedPassword,
        role: 'admin',
        created_at: today,
      });
      console.log('✅ Admin berhasil dibuat');
    }

    // --- Seed Perusahaan ---
    const perusahaanEmail = 'tech@company.com';
    let perusahaanUser = await User.findOne({ email: perusahaanEmail });
    if (!perusahaanUser) {
      const hashedPassword = await bcrypt.hash('perusahaan123', 10);
      perusahaanUser = await User.create({
        nama: 'PT Teknologi Hebat',
        email: perusahaanEmail,
        password: hashedPassword,
        role: 'perusahaan',
        created_at: today,
      });
      await Perusahaan.create({
        id_perusahaan: perusahaanUser._id,
        nama: 'PT Teknologi Hebat',
        picture: 'logo.png',
        situs: 'https://teknologihebat.co.id',
        tahun_didirikan: '2010',
        bidang: 'Teknologi',
        karyawan: '100+',
        lokasi: 'Jakarta',
        provinsi: 'DKI Jakarta',
        tentang: 'Kami perusahaan teknologi berkembang.',
        visi: 'Inovasi untuk masa depan',
        misi: 'Mengembangkan solusi digital',
        created_at: today,
      });
      console.log('✅ Perusahaan berhasil dibuat');
    }

    // --- Seed Pelamar ---
    const pelamarEmail = 'pelamar@gmail.com';
    let pelamarUser = await User.findOne({ email: pelamarEmail });
    if (!pelamarUser) {
      const hashedPassword = await bcrypt.hash('pelamar123', 10);
      pelamarUser = await User.create({
        nama: 'Yassar',
        email: pelamarEmail,
        password: hashedPassword,
        role: 'pelamar',
        created_at: today,
      });
      await Pelamar.create({
        id_pelamar: pelamarUser._id,
        picture: 'foto.png',
        spesialisasi: 'Frontend',
        lokasi: 'Bandung',
        provinsi: 'Jawa Barat',
        tentang: 'Saya pengembang frontend.',
        skill: ['JavaScript', 'React'],
        created_at: today,
      });
      console.log('✅ Pelamar berhasil dibuat');
    }

    // --- Seed Kategori ---
    const kategoriList = ['Teknologi', 'Keuangan', 'Pemasaran'];
    for (const nama of kategoriList) {
      const exist = await Kategori.findOne({ nama });
      if (!exist) {
        await Kategori.create({ nama });
        console.log(`✅ Kategori '${nama}' berhasil ditambahkan`);
      }
    }

    // --- Seed Skill ---
    const skillList = ['JavaScript', 'Python', 'Project Management'];
    for (const nama of skillList) {
      const exist = await Skill.findOne({ nama });
      if (!exist) {
        await Skill.create({ nama });
        console.log(`✅ Skill '${nama}' berhasil ditambahkan`);
      }
    }

    // --- Seed Lowongan ---
    const kategori = await Kategori.findOne({ nama: 'Teknologi' });
    const perusahaan = await Perusahaan.findOne({ nama: 'PT Teknologi Hebat' });
    const skill = await Skill.findOne({ nama: 'JavaScript' });

    const lowonganExists = await Lowongan.findOne({ posisi: 'Frontend Developer' });
    if (!lowonganExists && kategori && perusahaan && skill) {
      await Lowongan.create({
        posisi: 'Frontend Developer',
        deskripsi: 'Membangun antarmuka React.',
        kategori: kategori._id,
        perusahaan: perusahaan._id,
        skills: [skill._id],
        lokasi: 'Jakarta',
        gaji: '10-15 juta',
        tanggalPost: today,
      });
      console.log('✅ Lowongan Frontend Developer berhasil ditambahkan');
    }

    process.exit(0);
  } catch (err) {
    console.error('❌ Gagal melakukan seed:', err);
    process.exit(1);
  }
};

seed();
