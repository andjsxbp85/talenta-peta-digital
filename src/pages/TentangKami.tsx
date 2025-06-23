
import React from 'react';
import { Mail, MapPin, Phone, Globe, Users, Target, Award } from 'lucide-react';

const TentangKami = () => {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#003366] to-[#0099FF] text-white rounded-lg p-8">
        <div className="max-w-4xl">
          <h1 className="text-4xl font-bold mb-4">
            Pusat Pengembangan Talenta Digital
          </h1>
          <p className="text-xl text-blue-100">
            Kementerian Komunikasi dan Informatika Republik Indonesia
          </p>
        </div>
      </div>

      {/* Misi dan Visi */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <Target className="text-[#0099FF] mr-3" size={24} />
            <h2 className="text-2xl font-bold text-[#003366]">Visi</h2>
          </div>
          <p className="text-gray-700 leading-relaxed">
            Menjadi pusat unggulan dalam pengembangan talenta digital Indonesia yang kompeten, 
            inovatif, dan berdaya saing global untuk mendukung transformasi digital nasional.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <Award className="text-[#0099FF] mr-3" size={24} />
            <h2 className="text-2xl font-bold text-[#003366]">Misi</h2>
          </div>
          <ul className="text-gray-700 space-y-2">
            <li className="flex items-start">
              <span className="text-[#0099FF] mr-2">•</span>
              Mengembangkan ekosistem pelatihan digital nasional
            </li>
            <li className="flex items-start">
              <span className="text-[#0099FF] mr-2">•</span>
              Memetakan kompetensi digital berdasarkan SKKNI
            </li>
            <li className="flex items-start">
              <span className="text-[#0099FF] mr-2">•</span>
              Memfasilitasi kolaborasi mitra pelatihan
            </li>
          </ul>
        </div>
      </div>

      {/* Tentang Platform */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-[#003366] mb-6">Tentang Platform Peta Kompetensi Digital</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="text-[#0099FF]" size={32} />
            </div>
            <h3 className="text-lg font-semibold text-[#003366] mb-2">Kolaborasi Mitra</h3>
            <p className="text-gray-600 text-sm">
              Platform yang memfasilitasi kolaborasi antara berbagai mitra pelatihan digital 
              untuk mengembangkan ekosistem yang komprehensif.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="text-green-600" size={32} />
            </div>
            <h3 className="text-lg font-semibold text-[#003366] mb-2">Pemetaan SKKNI</h3>
            <p className="text-gray-600 text-sm">
              Sistem pemetaan otomatis materi pelatihan berdasarkan Standar Kompetensi 
              Kerja Nasional Indonesia untuk memastikan relevansi dan kualitas.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="text-purple-600" size={32} />
            </div>
            <h3 className="text-lg font-semibold text-[#003366] mb-2">Rekomendasi Cerdas</h3>
            <p className="text-gray-600 text-sm">
              Algoritma rekomendasi yang mengidentifikasi gap kompetensi dan memberikan 
              saran pengembangan materi untuk mitra baru.
            </p>
          </div>
        </div>
      </div>

      {/* Program Unggulan */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-[#003366] mb-6">Program Unggulan</h2>
        <div className="space-y-4">
          <div className="border-l-4 border-[#0099FF] pl-4">
            <h3 className="text-lg font-semibold text-[#003366]">Digital Talent Scholarship</h3>
            <p className="text-gray-600 text-sm">
              Program beasiswa pelatihan digital untuk mengembangkan SDM digital Indonesia 
              dalam berbagai bidang teknologi informasi dan komunikasi.
            </p>
          </div>
          <div className="border-l-4 border-[#0099FF] pl-4">
            <h3 className="text-lg font-semibold text-[#003366]">Digital Leadership Academy</h3>
            <p className="text-gray-600 text-sm">
              Program pengembangan kepemimpinan digital untuk mempersiapkan pemimpin 
              yang mampu mengarahkan transformasi digital di berbagai sektor.
            </p>
          </div>
          <div className="border-l-4 border-[#0099FF] pl-4">
            <h3 className="text-lg font-semibold text-[#003366]">Sertifikasi Kompetensi Digital</h3>
            <p className="text-gray-600 text-sm">
              Program sertifikasi yang mengacu pada SKKNI untuk memberikan pengakuan 
              formal terhadap kompetensi digital yang dimiliki.
            </p>
          </div>
        </div>
      </div>

      {/* Kontak */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-[#003366] mb-6">Kontak Kami</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <MapPin className="text-[#0099FF] mt-1" size={20} />
              <div>
                <h4 className="font-semibold text-[#003366]">Alamat</h4>
                <p className="text-gray-600 text-sm">
                  Gedung Kementerian Komunikasi dan Informatika<br />
                  Jl. Medan Merdeka Barat No. 8<br />
                  Jakarta Pusat 10110
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Phone className="text-[#0099FF] mt-1" size={20} />
              <div>
                <h4 className="font-semibold text-[#003366]">Telepon</h4>
                <p className="text-gray-600 text-sm">+62 21 3504040</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Mail className="text-[#0099FF] mt-1" size={20} />
              <div>
                <h4 className="font-semibold text-[#003366]">Email</h4>
                <p className="text-gray-600 text-sm">talentadigital@kominfo.go.id</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Globe className="text-[#0099FF] mt-1" size={20} />
              <div>
                <h4 className="font-semibold text-[#003366]">Website</h4>
                <a 
                  href="https://digitalent.kominfo.go.id" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#0099FF] text-sm hover:underline"
                >
                  digitalent.kominfo.go.id
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Partnership */}
      <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg p-6 border border-gray-200">
        <h2 className="text-2xl font-bold text-[#003366] mb-4 text-center">Mitra Strategis</h2>
        <p className="text-gray-600 text-center mb-6">
          Bekerjasama dengan berbagai institusi dan perusahaan teknologi terkemuka
        </p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {['Microsoft', 'Google', 'AWS', 'Alibaba', 'DQLab'].map(partner => (
            <div key={partner} className="bg-white p-4 rounded-lg shadow-sm text-center">
              <span className="text-sm font-medium text-gray-700">{partner}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TentangKami;
