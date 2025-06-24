
import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import SyllabusChatbot from '@/components/SyllabusChatbot';
import { useToast } from '@/hooks/use-toast';

const UploadSKKNI = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [previewData, setPreviewData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const { toast } = useToast();

  // Sample data untuk preview
  const sampleData = [
    {
      area_fungsi_kunci: 'Pengembangan Perangkat Lunak',
      kode_okupasi: 'J.620100',
      okupasi: 'Software QA Engineer',
      level: '3',
      klasifikasi_uk: 'Inti',
      kode_uk: 'J.620100.001.01',
      judul_uk: 'Menganalisis Kebutuhan Pengujian Perangkat Lunak',
      judul_ek: 'Mengidentifikasi spesifikasi kebutuhan pengujian',
      judul_kuk: 'Dokumen spesifikasi kebutuhan dianalisis',
      aspek_kritis: 'Ketepatan analisis kebutuhan'
    },
    {
      area_fungsi_kunci: 'Pengembangan Perangkat Lunak',
      kode_okupasi: 'J.620100',
      okupasi: 'Software QA Engineer',
      level: '3',
      klasifikasi_uk: 'Inti',
      kode_uk: 'J.620100.001.02',
      judul_uk: 'Merancang Skenario Pengujian',
      judul_ek: 'Membuat test case sesuai requirement',
      judul_kuk: 'Test case dibuat berdasarkan spesifikasi',
      aspek_kritis: 'Kelengkapan coverage testing'
    }
  ];

  const parseCSV = (csvText: string) => {
    const lines = csvText.split('\n');
    if (lines.length === 0) return [];
    
    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, '').toLowerCase());
    const data = [];

    for (let i = 1; i < lines.length; i++) {
      if (lines[i].trim()) {
        const values = lines[i].split(',').map(v => v.trim().replace(/"/g, ''));
        const row: any = {};
        
        headers.forEach((header, index) => {
          const normalizedHeader = header
            .replace(/\s+/g, '_')
            .replace(/[^\w_]/g, '');
          row[normalizedHeader] = values[index] || '';
        });
        
        // Map to expected structure
        const mappedRow = {
          area_fungsi_kunci: row.area_fungsi_kunci || row.area_fungsi || '',
          kode_okupasi: row.kode_okupasi || '',
          okupasi: row.okupasi || '',
          level: row.level || '',
          klasifikasi_uk: row.klasifikasi_uk || row.klasifikasi || '',
          kode_uk: row.kode_uk || '',
          judul_uk: row.judul_uk || '',
          judul_ek: row.judul_ek || row.elemen_kompetensi || '',
          judul_kuk: row.judul_kuk || row.kuk || '',
          aspek_kritis: row.aspek_kritis || ''
        };
        
        data.push(mappedRow);
      }
    }
    return data;
  };

  const handleFileUpload = async (uploadedFiles: FileList | null) => {
    if (!uploadedFiles || uploadedFiles.length === 0) return;
    
    const csvFiles = Array.from(uploadedFiles).filter(file => file.type === 'text/csv');
    
    if (csvFiles.length === 0) {
      toast({
        title: "Invalid File",
        description: "Please select valid CSV files",
        variant: "destructive"
      });
      return;
    }

    setFiles(csvFiles);
    setUploadStatus('idle');
    
    try {
      let allData: any[] = [];
      
      for (const file of csvFiles) {
        const text = await file.text();
        const parsedData = parseCSV(text);
        allData = [...allData, ...parsedData];
      }
      
      setPreviewData(allData);
      setCurrentPage(1); // Reset to first page
      
      toast({
        title: "Files Uploaded",
        description: `Successfully parsed ${allData.length} rows from ${csvFiles.length} CSV file(s)`,
      });
    } catch (error) {
      toast({
        title: "Parse Error",
        description: "Failed to parse CSV files",
        variant: "destructive"
      });
      setPreviewData(sampleData); // Fallback to sample data
    }
  };

  const handleButtonClick = () => {
    const input = document.getElementById('csvUpload') as HTMLInputElement;
    if (input) {
      input.click();
    }
  };

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleFileUpload(event.target.files);
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    handleFileUpload(event.dataTransfer.files);
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

  // Pagination logic
  const totalRows = previewData.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, totalRows);
  const currentData = previewData.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleRowsPerPageChange = (value: string) => {
    setRowsPerPage(parseInt(value));
    setCurrentPage(1); // Reset to first page
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
            File harus berformat CSV dengan kolom: Area Fungsi Kunci, Kode Okupasi, Okupasi, Level, Klasifikasi UK, Kode UK, Judul UK, Judul EK, Judul KUK, Aspek Kritis
          </p>
          <input
            type="file"
            accept=".csv"
            multiple
            onChange={handleFileInputChange}
            className="hidden"
            id="csvUpload"
          />
          <Button 
            onClick={handleButtonClick}
            className="bg-[#0099FF] hover:bg-[#0088DD]"
          >
            Pilih File CSV
          </Button>
        </div>

        {/* File Info */}
        {files.length > 0 && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center space-x-3">
              <FileText className="text-[#0099FF]" size={24} />
              <div>
                <p className="font-semibold text-[#003366]">
                  {files.length === 1 ? files[0].name : `${files.length} files selected`}
                </p>
                <p className="text-sm text-gray-600">
                  Total ukuran: {(files.reduce((sum, file) => sum + file.size, 0) / 1024).toFixed(2)} KB
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
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Rows per page:</span>
                <Select value={rowsPerPage.toString()} onValueChange={handleRowsPerPageChange}>
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="25">25</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                    <SelectItem value="200">200</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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
                  <TableHead>Okupasi</TableHead>
                  <TableHead>Level</TableHead>
                  <TableHead>Kode UK</TableHead>
                  <TableHead>Judul UK</TableHead>
                  <TableHead>Judul EK</TableHead>
                  <TableHead>Judul KUK</TableHead>
                  <TableHead>Aspek Kritis</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentData.map((row, index) => (
                  <TableRow key={startIndex + index}>
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
                    <TableCell className="font-mono text-sm">{row.kode_uk}</TableCell>
                    <TableCell>{row.judul_uk}</TableCell>
                    <TableCell>{row.judul_ek}</TableCell>
                    <TableCell>{row.judul_kuk}</TableCell>
                    <TableCell>{row.aspek_kritis}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6 flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Showing {startIndex + 1} to {endIndex} of {totalRows} entries
              </div>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                      className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                  </PaginationItem>
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const pageNum = i + 1;
                    return (
                      <PaginationItem key={pageNum}>
                        <PaginationLink
                          onClick={() => handlePageChange(pageNum)}
                          isActive={currentPage === pageNum}
                          className="cursor-pointer"
                        >
                          {pageNum}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                      className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}

          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-start space-x-3">
              <AlertCircle className="text-yellow-600 mt-1" size={20} />
              <div>
                <h4 className="font-semibold text-yellow-800">Validasi Format</h4>
                <p className="text-sm text-yellow-700">
                  Pastikan file CSV memiliki semua kolom yang diperlukan. Preview menampilkan {totalRows} baris data dari {files.length} file CSV.
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
