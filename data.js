export const lowongan = [
  {
    id: 1,
    tanggal: "2025-05-10",
    nama: "FrontEnd Developer",
    gajiMin: 4000000,
    gajiMax: 5000000,
    kategori: "Teknologi IT",
    jenis: "Full Time",
    tingkat: "Pemula",
    tentang: "Bertanggung jawab untuk membangun antarmuka pengguna yang interaktif dan responsif.",
    syarat: "Minimal pendidikan D3/S1 Teknik Informatika atau sejenis. Memiliki pengalaman proyek FrontEnd menjadi nilai tambah.",
    skill: ["HTML", "CSS", "JavaScript", "React", "Laravel", "MySql"],
    perusahaan: {
      id: 1,
      nama: "PT Astra Indonesia",
      logo: "https://i.ibb.co/Vj4p29F/LOGO.png",
      deskripsi: "PT Astra Indonesia adalah perusahaan multinasional yang bergerak di bidang otomotif dan teknologi.",
      lokasi: "Jakarta Selatan",
      email: "karir@astra.co.id",
    },
  },
  {
    id: 2,
    tanggal: "2025-05-12",
    nama: "Backend Developer",
    gajiMin: 5000000,
    gajiMax: 7000000,
    kategori: "Teknologi IT",
    jenis: "Full Time",
    tingkat: "Menengah",
    tentang: "Mengembangkan dan memelihara sistem backend termasuk API dan database.",
    syarat: "Pengalaman minimal 1 tahun sebagai Backend Developer. Mampu bekerja dengan Node.js dan Express.",
    skill: ["Node.js", "Express", "MongoDB", "REST API", "Git"],
    perusahaan: {
      id: 2,
      nama: "Gojek Indonesia",
      logo: "https://i.ibb.co/Vj4p29F/LOGO.png",
      deskripsi: "Gojek adalah perusahaan teknologi yang menyediakan layanan on-demand terbesar di Indonesia.",
      lokasi: "Jakarta Pusat",
      email: "jobs@gojek.com",
    },
  },
  {
    id: 3,
    tanggal: "2025-05-14",
    nama: "UI/UX Designer",
    gajiMin: 4500000,
    gajiMax: 6000000,
    kategori: "Desain",
    jenis: "Full Time",
    tingkat: "Pemula",
    tentang: "Merancang antarmuka pengguna dan pengalaman pengguna yang menarik dan intuitif.",
    syarat: "Menguasai tools desain seperti Figma, Adobe XD. Memiliki portofolio desain UI/UX.",
    skill: ["Figma", "Adobe XD", "Wireframing", "Prototyping"],
    perusahaan: {
      id: 3,
      nama: "Tokopedia",
      logo: "https://i.ibb.co/Vj4p29F/LOGO.png",
      deskripsi: "Tokopedia adalah perusahaan e-commerce besar di Indonesia yang menyediakan berbagai produk dan layanan.",
      lokasi: "Jakarta Barat",
      email: "career@tokopedia.com",
    },
  },
  {
    id: 4,
    tanggal: "2025-05-15",
    nama: "Mobile App Developer",
    gajiMin: 6000000,
    gajiMax: 8000000,
    kategori: "Teknologi IT",
    jenis: "Full Time",
    tingkat: "Menengah",
    tentang: "Bertanggung jawab mengembangkan aplikasi mobile berbasis Android/iOS.",
    syarat: "Pengalaman dalam pengembangan aplikasi Flutter atau React Native.",
    skill: ["Flutter", "Dart", "React Native", "Kotlin", "Swift"],
    perusahaan: {
      id: 4,
      nama: "Traveloka",
      logo: "https://i.ibb.co/Vj4p29F/LOGO.png",
      deskripsi: "Traveloka adalah platform pemesanan tiket dan akomodasi terkemuka di Asia Tenggara.",
      lokasi: "Jakarta Pusat",
      email: "hr@traveloka.com",
    },
  },
  {
    id: 5,
    tanggal: "2025-05-17",
    nama: "Data Analyst",
    gajiMin: 5500000,
    gajiMax: 7500000,
    kategori: "Data",
    jenis: "Full Time",
    tingkat: "Menengah",
    tentang: "Mengumpulkan, mengolah, dan menganalisis data untuk mendukung pengambilan keputusan bisnis.",
    syarat: "Menguasai SQL dan tools analisis data seperti Excel dan Python. Pengalaman kerja minimal 1 tahun.",
    skill: ["SQL", "Excel", "Python", "Power BI", "Tableau"],
    perusahaan: {
      id: 5,
      nama: "Bukalapak",
      logo: "https://i.ibb.co/Vj4p29F/LOGO.png",
      deskripsi: "Bukalapak adalah marketplace daring yang menyediakan layanan e-commerce bagi pelaku UMKM.",
      lokasi: "Jakarta Timur",
      email: "recruit@bukalapak.com",
    },
  },
];

// Generate perusahaan unik dari lowongan
const perusahaanSet = new Map();
lowongan.forEach(item => {
  if (!perusahaanSet.has(item.perusahaan.nama)) {
    perusahaanSet.set(item.perusahaan.nama, {
      nama: item.perusahaan.nama,
      logo: item.perusahaan.logo,
      deskripsi: item.perusahaan.deskripsi,
      lokasi: item.perusahaan.lokasi,
      email: item.perusahaan.email,
    });
  }
});
export const perusahaan = Array.from(perusahaanSet.values());

// Ambil kategori unik
const kategoriSet = new Set(lowongan.map((item) => item.kategori));
export const kategori = Array.from(kategoriSet).map((nama) => ({ nama }));

// Ambil skill unik
const skillSet = new Set(lowongan.flatMap((item) => item.skill));
export const skill = Array.from(skillSet).map((nama) => ({ nama }));

// Dummy user dengan username wajib sesuai schema
export const user = [
  {
    username: "admin",
    nama: "Admin",
    email: "admin@example.com",
    password: "admin123",
    role: "admin",
  },
  {
    username: "pelamar1",
    nama: "Pelamar 1",
    email: "pelamar1@example.com",
    password: "pelamar123",
    role: "user",
  },
];
