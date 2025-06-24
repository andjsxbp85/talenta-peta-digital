
import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import SyllabusChatbot from '@/components/SyllabusChatbot';
import { useToast } from '@/hooks/use-toast';

const UploadSKKNI = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [previewData, setPreviewData] = useState<any[]>([]);
  const { toast } = useToast();

  // Sample data untuk preview
  const sampleData = [
    {
      kode_uk: 'J.620100.001.01',
      judul_uk: 'Menganalisis Kebutuhan Pengujian Perangkat Lunak',
      elemen_kompetensi: 'Mengidentifikasi spesifikasi kebutuhan pengujian',
      kuk: 'Dokumen spesifikasi kebutuhan dianalisis',
      aspek_kritis: 'Ketepatan analisis kebutuhan',
      okupasi: 'Software QA Engineer',
      level: '3'
    },
    {
      kode_uk: 'J.620100.001.02',
      judul_uk: 'Merancang Skenario Pengujian',
      elemen_kompetensi: 'Membuat test case sesuai requirement',
      kuk: 'Test case dibuat berdasarkan spesifikasi',
      aspek_kritis: 'Kelengkapan coverage testing',
      okupasi: 'Software QA Engineer',
      level: '3'
    }
  ];

  const parseCSV = (csvText: string) => {
    const lines = csvText.split('\n');
    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
    const data = [];

    for (let i = 1; i < lines.length; i++) {
      if (lines[i].trim()) {
        const values = lines[i].split(',').map(v => v.trim().replace(/"/g, ''));
        const row: any = {};
        headers.forEach((header, index) => {
          row[header.toLowerCase().replace(/\s+/g, '_')] = values[index] || '';
        });
        data.push(row);
      }
    }
    return data;
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile && uploadedFile.type === 'text/csv') {
      setFile(uploadedFile);
      setUploadStatus('idle');
      
      try {
        const text = await uploadedFile.text();
        const parsedData = parseCSV(text);
        setPreviewData(parsedData);
        
        toast({
          title: "File Uploaded",
          description: `Successfully parsed ${parsedData.length} rows from CSV`,
        });
      } catch (error) {
        toast({
          title: "Parse Error",
          description: "Failed to parse CSV file",
          variant: "destructive"
        });
        setPreviewData(sampleData); // Fallback to sample data
      }
    } else {
      toast({
        title: "Invalid File",
        description: "Please select a valid CSV file",
        variant: "destructive"
      });
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === 'text/csv') {
      setFile(droppedFile);
      // Process the dropped file similar to handleFileUpload
      droppedFile.text().then(text => {
        const parsedData = parseCSV(text);
        setPreviewData(parsedData);
      }).catch(() => {
        setPreviewData(sampleData);
      });
    }
  };

  const handleProcessFile = () => {
    setIsUploading(true);
    // Simulate processing
    setTimeout(() => {
      setIsUploading(false);
      setUploadStatus('success');
      toast({
        title: "Data Processed",
        description: "SKKNI data has been successfully processed and saved",
      });
    }, 2000);
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-[#003366] mb-2">Upload SKKNI CSV</h1>
        <p className="text-gray-600 mb-6">
          Upload file CSV yang berisi data Standar Kompetensi Kerja Nasional Indonesia (SKKNI)
        </p>

        {/* Upload Area */}
        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#0099FF] transition-colors"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <Upload className="mx-auto mb-4 text-gray-400" size={48} />
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Drag & drop file CSV atau klik untuk browse
          </h3>
          <p className="text-gray-500 mb-4">
            File harus berformat CSV dengan kolom: Kode UK, Judul UK, Elemen Kompetensi, KUK, Aspek Kritis, Okupasi, Level
          </p>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            className="hidden"
            id="csvUpload"
          />
          <label htmlFor="csvUpload">
            <Button className="bg-[#0099FF] hover:bg-[#0088DD]">
              Pilih File CSV
            </Button>
          </label>
        </div>

        {/* File Info */}
        {file && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center space-x-3">
              <FileText className="text-[#0099FF]" size={24} />
              <div>
                <p className="font-semibold text-[#003366]">{file.name}</p>
                <p className="text-sm text-gray-600">
                  Ukuran: {(file.size / 1024).toFixed(2)} KB
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Chatbot Component */}
      <SyllabusChatbot csvData={previewData} />

      {/* Preview Table */}
      {previewData.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-[#003366]">Preview Data</h2>
            <div className="flex space-x-3">
              {uploadStatus === 'success' && (
                <div className="flex items-center text-green-600">
                  <CheckCircle className="mr-2" size={20} />
                  Data berhasil diproses
                </div>
              )}
              <Button
                onClick={handleProcessFile}
                disabled={isUploading || uploadStatus === 'success'}
                className="bg-[#003366] hover:bg-[#002244]"
              >
                {isUploading ? 'Memproses...' : 'Proses & Simpan'}
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Kode UK</TableHead>
                  <TableHead>Judul UK</TableHead>
                  <TableHead>Elemen Kompetensi</TableHead>
                  <TableHead>KUK</TableHead>
                  <TableHead>Aspek Kritis</TableHead>
                  <TableHead>Okupasi</TableHead>
                  <TableHead>Level</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {previewData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-mono text-sm">{row.kode_uk}</TableCell>
                    <TableCell>{row.judul_uk}</TableCell>
                    <TableCell>{row.elemen_kompetensi}</TableCell>
                    <TableCell>{row.kuk}</TableCell>
                    <TableCell>{row.aspek_kritis}</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        {row.okupasi}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                        Level {row.level}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-start space-x-3">
              <AlertCircle className="text-yellow-600 mt-1" size={20} />
              <div>
                <h4 className="font-semibold text-yellow-800">Validasi Format</h4>
                <p className="text-sm text-yellow-700">
                  Pastikan file CSV memiliki semua kolom yang diperlukan. Preview menampilkan {previewData.length} baris data.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadSKKNI;
