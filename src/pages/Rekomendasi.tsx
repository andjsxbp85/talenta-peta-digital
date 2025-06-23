
import React, { useState } from 'react';
import { Target, Download, FileText, CheckCircle, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const Rekomendasi = () => {
  const [selectedOkupasi, setSelectedOkupasi] = useState('');
  const [showRecommendations, setShowRecommendations] = useState(false);

  const okupasiList = [
    'Software QA Engineer',
    'Data Scientist',
    'Cloud Engineer',
    'ML Engineer',
    'Digital Marketer',
    'Cybersecurity Analyst',
    'UI/UX Designer',
    'DevOps Engineer'
  ];

  // Sample recommendation data
  const recommendationData = [
    {
      kode_uk: 'J.620100.001.01',
      judul_uk: 'Menganalisis Kebutuhan Pengujian Perangkat Lunak',
      status_pengembangan: 'sudah',
      mitra_yang_mengembangkan: ['DQLab', 'Microsoft'],
      priority: 'low'
    },
    {
      kode_uk: 'J.620100.001.02',
      judul_uk: 'Merancang Skenario Pengujian',
      status_pengembangan: 'belum',
      mitra_yang_mengembangkan: [],
      priority: 'high'
    },
    {
      kode_uk: 'J.620100.001.03',
      judul_uk: 'Melaksanakan Pengujian Unit',
      status_pengembangan: 'sudah',
      mitra_yang_mengembangkan: ['Google'],
      priority: 'medium'
    },
    {
      kode_uk: 'J.620100.001.04',
      judul_uk: 'Melaksanakan Pengujian Integrasi',
      status_pengembangan: 'belum',
      mitra_yang_mengembangkan: [],
      priority: 'high'
    },
    {
      kode_uk: 'J.620100.001.05',
      judul_uk: 'Melaksanakan Pengujian Sistem',
      status_pengembangan: 'belum',
      mitra_yang_mengembangkan: [],
      priority: 'medium'
    }
  ];

  const handleGenerateRecommendations = () => {
    if (selectedOkupasi) {
      setShowRecommendations(true);
    }
  };

  const handleExportExcel = () => {
    // Simulate Excel export
    console.log('Exporting to Excel...');
  };

  const handleExportPDF = () => {
    // Simulate PDF export
    console.log('Exporting to PDF...');
  };

  const sudahDikembangkan = recommendationData.filter(item => item.status_pengembangan === 'sudah').length;
  const belumDikembangkan = recommendationData.filter(item => item.status_pengembangan === 'belum').length;
  const highPriority = recommendationData.filter(item => item.priority === 'high' && item.status_pengembangan === 'belum').length;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-[#003366] mb-2">Rekomendasi untuk Mitra Baru</h1>
        <p className="text-gray-600 mb-6">
          Dapatkan rekomendasi materi pelatihan yang belum dikembangkan berdasarkan okupasi tertentu
        </p>

        {/* Okupasi Selection */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pilih Okupasi
            </label>
            <select
              value={selectedOkupasi}
              onChange={(e) => setSelectedOkupasi(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0099FF]"
            >
              <option value="">-- Pilih Okupasi --</option>
              {okupasiList.map(okupasi => (
                <option key={okupasi} value={okupasi}>{okupasi}</option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <Button
              onClick={handleGenerateRecommendations}
              disabled={!selectedOkupasi}
              className="bg-[#0099FF] hover:bg-[#0088DD]"
            >
              <Target className="mr-2" size={18} />
              Generate Rekomendasi
            </Button>
          </div>
        </div>
      </div>

      {/* Recommendations Results */}
      {showRecommendations && (
        <>
          {/* Summary Statistics */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-[#003366] mb-4">
              Ringkasan untuk {selectedOkupasi}
            </h2>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="text-2xl font-bold text-[#0099FF]">{recommendationData.length}</div>
                <div className="text-sm text-gray-600">Total Unit Kompetensi</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <div className="text-2xl font-bold text-green-600">{sudahDikembangkan}</div>
                <div className="text-sm text-gray-600">Sudah Dikembangkan</div>
              </div>
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <div className="text-2xl font-bold text-red-600">{belumDikembangkan}</div>
                <div className="text-sm text-gray-600">Belum Dikembangkan</div>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <div className="text-2xl font-bold text-yellow-600">{highPriority}</div>
                <div className="text-sm text-gray-600">Prioritas Tinggi</div>
              </div>
            </div>
          </div>

          {/* Recommendations Table */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#003366]">Detail Rekomendasi</h2>
              <div className="flex space-x-3">
                <Button
                  onClick={handleExportExcel}
                  variant="outline"
                  className="border-[#0099FF] text-[#0099FF] hover:bg-[#0099FF] hover:text-white"
                >
                  <Download className="mr-2" size={18} />
                  Export Excel
                </Button>
                <Button
                  onClick={handleExportPDF}
                  variant="outline"
                  className="border-[#003366] text-[#003366] hover:bg-[#003366] hover:text-white"
                >
                  <FileText className="mr-2" size={18} />
                  Export PDF
                </Button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Kode UK</TableHead>
                    <TableHead>Judul Unit Kompetensi</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Mitra yang Mengembangkan</TableHead>
                    <TableHead>Prioritas</TableHead>
                    <TableHead>Rekomendasi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recommendationData.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-mono text-sm">{item.kode_uk}</TableCell>
                      <TableCell className="max-w-xs">
                        <div className="font-medium">{item.judul_uk}</div>
                      </TableCell>
                      <TableCell>
                        {item.status_pengembangan === 'sudah' ? (
                          <div className="flex items-center text-green-600">
                            <CheckCircle className="mr-1" size={16} />
                            <span className="text-sm">Sudah dikembangkan</span>
                          </div>
                        ) : (
                          <div className="flex items-center text-red-600">
                            <AlertTriangle className="mr-1" size={16} />
                            <span className="text-sm">Belum dikembangkan</span>
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        {item.mitra_yang_mengembangkan.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {item.mitra_yang_mengembangkan.map(mitra => (
                              <span key={mitra} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                                {mitra}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-gray-400 text-sm">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(item.priority)}`}>
                          {item.priority === 'high' ? 'Tinggi' : 
                           item.priority === 'medium' ? 'Sedang' : 'Rendah'}
                        </span>
                      </TableCell>
                      <TableCell>
                        {item.status_pengembangan === 'belum' ? (
                          <span className="text-green-600 text-sm font-medium">
                            🎯 Peluang untuk mitra baru
                          </span>
                        ) : (
                          <span className="text-gray-500 text-sm">
                            ✅ Sudah tercukupi
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Recommendation Summary */}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-semibold text-[#003366] mb-2">💡 Kesimpulan Rekomendasi</h3>
              <p className="text-sm text-gray-700">
                Untuk okupasi <strong>{selectedOkupasi}</strong>, terdapat <strong>{belumDikembangkan}</strong> unit kompetensi 
                yang belum dikembangkan oleh mitra manapun. Ini merupakan peluang besar bagi mitra baru untuk mengisi gap 
                kompetensi yang ada, terutama untuk unit kompetensi dengan prioritas tinggi.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Rekomendasi;
