
import React from 'react';
import { Link } from 'react-router-dom';
import { Upload, Users, Target, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GeminiConnection from '@/components/GeminiConnection';

const Home = () => {
  const quickActions = [
    {
      title: 'Unggah SKKNI',
      description: 'Upload file CSV Standar Kompetensi Kerja Nasional Indonesia',
      icon: Upload,
      link: '/upload-skkni',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      title: 'Lihat Mitra',
      description: 'Jelajahi peta materi pelatihan dari mitra yang tersedia',
      icon: Users,
      link: '/peta-mitra',
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      title: 'Rekomendasi',
      description: 'Dapatkan rekomendasi materi untuk mitra baru',
      icon: Target,
      link: '/rekomendasi',
      color: 'bg-purple-500 hover:bg-purple-600'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Gemini AI Connection */}
      <GeminiConnection />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#003366] to-[#0099FF] text-white rounded-lg p-8">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold mb-4">
            Peta Kompetensi Digital untuk Mitra Pelatihan
          </h1>
          <p className="text-xl mb-6 text-blue-100">
            Platform digital untuk memetakan dan merekomendasikan materi pelatihan berdasarkan 
            Standar Kompetensi Kerja Nasional Indonesia (SKKNI) bagi ekosistem mitra pelatihan digital.
          </p>
          <div className="flex space-x-4">
            <Link to="/upload-skkni">
              <Button className="bg-white text-[#003366] hover:bg-gray-100">
                Mulai Mapping
              </Button>
            </Link>
            <Link to="/tentang">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-[#003366]">
                Pelajari Lebih Lanjut
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-6">
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <Link
              key={index}
              to={action.link}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-200"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className={`p-3 rounded-lg ${action.color}`}>
                  <Icon className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-[#003366]">{action.title}</h3>
              </div>
              <p className="text-gray-600">{action.description}</p>
            </Link>
          );
        })}
      </div>

      {/* Statistics */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-[#003366] mb-6">Statistik Platform</h2>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-[#0099FF] mb-2">150+</div>
            <div className="text-gray-600">Unit Kompetensi</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#0099FF] mb-2">25+</div>
            <div className="text-gray-600">Mitra Pelatihan</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#0099FF] mb-2">500+</div>
            <div className="text-gray-600">Materi Pelatihan</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#0099FF] mb-2">80%</div>
            <div className="text-gray-600">Coverage Rate</div>
          </div>
        </div>
      </div>

      {/* Google Looker Studio Dashboard */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-[#003366] mb-6">Dashboard Analitik</h2>
        <div className="w-full">
          <iframe 
            className="w-full h-[450px] md:h-[500px] lg:h-[600px] rounded-lg border border-gray-200"
            src="https://lookerstudio.google.com/embed/reporting/78d58971-02ce-445c-83b8-cde8d84c714c/page/KPcNF" 
            frameBorder="0" 
            style={{border: 0}} 
            allowFullScreen 
            sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
          />
        </div>
      </div>

      {/* Features Overview */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-[#003366] mb-6">Fitur Utama Platform</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <FileText className="text-[#0099FF] mt-1" size={20} />
              <div>
                <h4 className="font-semibold text-[#003366]">Upload & Validasi SKKNI</h4>
                <p className="text-gray-600 text-sm">
                  Sistem upload otomatis dengan validasi format CSV untuk data SKKNI dari berbagai okupasi.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Users className="text-[#0099FF] mt-1" size={20} />
              <div>
                <h4 className="font-semibold text-[#003366]">Mapping Materi Mitra</h4>
                <p className="text-gray-600 text-sm">
                  Pemetaan otomatis materi pelatihan dari mitra ke unit kompetensi yang sesuai.
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Target className="text-[#0099FF] mt-1" size={20} />
              <div>
                <h4 className="font-semibold text-[#003366]">Rekomendasi Cerdas</h4>
                <p className="text-gray-600 text-sm">
                  Algoritma rekomendasi untuk mengidentifikasi gap dan peluang pengembangan materi baru.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Upload className="text-[#0099FF] mt-1" size={20} />
              <div>
                <h4 className="font-semibold text-[#003366]">Ekspor & Analisis</h4>
                <p className="text-gray-600 text-sm">
                  Export data dalam format Excel dan PDF untuk analisis lebih lanjut.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
