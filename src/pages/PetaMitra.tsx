
import React, { useState } from 'react';
import { Search, Filter, ExternalLink, CheckCircle, XCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const PetaMitra = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMitra, setSelectedMitra] = useState('all');
  const [selectedOkupasi, setSelectedOkupasi] = useState('all');

  // Sample data materi mitra
  const mitraData = [
    {
      id: 1,
      nama_mitra: 'DQLab',
      judul_pelatihan: 'Python for Data Science Fundamentals',
      url: 'https://academy.dqlab.id/python-basics',
      topik: 'Data Science',
      mapped_kode_uk: 'J.620100.010.01',
      okupasi: 'Data Scientist',
      status: 'mapped'
    },
    {
      id: 2,
      nama_mitra: 'Microsoft',
      judul_pelatihan: 'Azure Fundamentals (AZ-900)',
      url: 'https://docs.microsoft.com/learn/azure',
      topik: 'Cloud Computing',
      mapped_kode_uk: 'J.620100.015.02',
      okupasi: 'Cloud Engineer',
      status: 'mapped'
    },
    {
      id: 3,
      nama_mitra: 'Alibaba Cloud',
      judul_pelatihan: 'Introduction to Machine Learning',
      url: 'https://edu.alibabacloud.com/course/ml-intro',
      topik: 'Machine Learning',
      mapped_kode_uk: 'J.620100.020.01',
      okupasi: 'ML Engineer',
      status: 'mapped'
    },
    {
      id: 4,
      nama_mitra: 'Google',
      judul_pelatihan: 'Digital Marketing Fundamentals',
      url: 'https://skillshop.withgoogle.com',
      topik: 'Digital Marketing',
      mapped_kode_uk: null,
      okupasi: 'Digital Marketer',
      status: 'unmapped'
    },
    {
      id: 5,
      nama_mitra: 'AWS',
      judul_pelatihan: 'Cloud Practitioner Essentials',
      url: 'https://aws.amazon.com/training',
      topik: 'Cloud Computing',
      mapped_kode_uk: 'J.620100.015.01',
      okupasi: 'Cloud Engineer',
      status: 'mapped'
    }
  ];

  const uniqueMitra = [...new Set(mitraData.map(item => item.nama_mitra))];
  const uniqueOkupasi = [...new Set(mitraData.map(item => item.okupasi))];

  const filteredData = mitraData.filter(item => {
    const matchesSearch = item.judul_pelatihan.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.nama_mitra.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.topik.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMitra = selectedMitra === 'all' || item.nama_mitra === selectedMitra;
    const matchesOkupasi = selectedOkupasi === 'all' || item.okupasi === selectedOkupasi;
    
    return matchesSearch && matchesMitra && matchesOkupasi;
  });

  const mappedCount = mitraData.filter(item => item.status === 'mapped').length;
  const unmappedCount = mitraData.filter(item => item.status === 'unmapped').length;

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-[#003366] mb-2">Peta Materi Mitra</h1>
        <p className="text-gray-600 mb-6">
          Daftar lengkap materi pelatihan dari mitra yang telah dipetakan ke unit kompetensi SKKNI
        </p>

        {/* Statistics */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="text-2xl font-bold text-[#0099FF]">{mitraData.length}</div>
            <div className="text-sm text-gray-600">Total Materi</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <div className="text-2xl font-bold text-green-600">{mappedCount}</div>
            <div className="text-sm text-gray-600">Sudah Dipetakan</div>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <div className="text-2xl font-bold text-yellow-600">{unmappedCount}</div>
            <div className="text-sm text-gray-600">Belum Dipetakan</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <div className="text-2xl font-bold text-purple-600">{uniqueMitra.length}</div>
            <div className="text-sm text-gray-600">Mitra Aktif</div>
          </div>
        </div>

        {/* Filters */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            <Input
              placeholder="Cari materi atau mitra..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={selectedMitra}
            onChange={(e) => setSelectedMitra(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0099FF]"
          >
            <option value="all">Semua Mitra</option>
            {uniqueMitra.map(mitra => (
              <option key={mitra} value={mitra}>{mitra}</option>
            ))}
          </select>
          <select
            value={selectedOkupasi}
            onChange={(e) => setSelectedOkupasi(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0099FF]"
          >
            <option value="all">Semua Okupasi</option>
            {uniqueOkupasi.map(okupasi => (
              <option key={okupasi} value={okupasi}>{okupasi}</option>
            ))}
          </select>
          <Button className="bg-[#003366] hover:bg-[#002244]">
            <Filter className="mr-2" size={18} />
            Filter
          </Button>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mitra</TableHead>
                <TableHead>Judul Pelatihan</TableHead>
                <TableHead>Topik</TableHead>
                <TableHead>Okupasi</TableHead>
                <TableHead>Kode UK</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="font-semibold text-[#003366]">{item.nama_mitra}</div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-xs">
                      <div className="font-medium">{item.judul_pelatihan}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                      {item.topik}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {item.okupasi}
                    </span>
                  </TableCell>
                  <TableCell>
                    {item.mapped_kode_uk ? (
                      <span className="font-mono text-sm bg-green-50 px-2 py-1 rounded">
                        {item.mapped_kode_uk}
                      </span>
                    ) : (
                      <span className="text-gray-400 text-sm">Belum dipetakan</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {item.status === 'mapped' ? (
                      <div className="flex items-center text-green-600">
                        <CheckCircle className="mr-1" size={16} />
                        <span className="text-sm">Dipetakan</span>
                      </div>
                    ) : (
                      <div className="flex items-center text-yellow-600">
                        <XCircle className="mr-1" size={16} />
                        <span className="text-sm">Belum dipetakan</span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => window.open(item.url, '_blank')}
                      >
                        <ExternalLink size={14} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filteredData.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Tidak ada data yang sesuai dengan filter yang dipilih.
          </div>
        )}
      </div>
    </div>
  );
};

export default PetaMitra;
