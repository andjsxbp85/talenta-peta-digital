
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle, Send, Bot, User, Loader2, Plus, File, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface UploadedFile {
  file: File;
  content: string;
  id: string;
}

interface SyllabusChatbotProps {
  csvData?: any[];
}

const SyllabusChatbot: React.FC<SyllabusChatbotProps> = ({ csvData = [] }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const readFileContent = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        resolve(result);
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      
      if (file.type === 'application/pdf') {
        // For PDF files, we'll read as text (note: this is basic text extraction)
        reader.readAsText(file);
      } else {
        reader.readAsText(file);
      }
    });
  };

  const handleFileUpload = async (files: FileList) => {
    const newUploadedFiles: UploadedFile[] = [];
    
    for (const file of Array.from(files)) {
      try {
        const content = await readFileContent(file);
        const uploadedFile: UploadedFile = {
          file,
          content,
          id: Date.now() + Math.random().toString()
        };
        newUploadedFiles.push(uploadedFile);
      } catch (error) {
        toast({
          title: "File Read Error",
          description: `Failed to read ${file.name}`,
          variant: "destructive"
        });
      }
    }
    
    setUploadedFiles(prev => [...prev, ...newUploadedFiles]);
    
    if (newUploadedFiles.length > 0) {
      toast({
        title: "Files Uploaded",
        description: `Successfully uploaded ${newUploadedFiles.length} file(s)`,
      });
    }
  };

  const handleFileInputClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      handleFileUpload(event.target.files);
    }
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const sendMessageToGemini = async (message: string, csvContext: string = '', syllabusContext: string = '') => {
    const apiKey = localStorage.getItem('gemini_api_key');
    
    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: "Please connect to Gemini AI first in the home page",
        variant: "destructive"
      });
      return null;
    }

    try {
      let contextPrompt = message;
      
      if (csvContext || syllabusContext) {
        contextPrompt = `Anda adalah asisten AI yang membantu membuat rekomendasi silabus pelatihan digital berdasarkan SKKNI dan analisis silabus mitra yang sudah ada.
        
${csvContext ? `Data SKKNI yang tersedia:\n${csvContext}\n` : ''}
${syllabusContext ? `Silabus mitra yang sudah ada:\n${syllabusContext}\n` : ''}

Berdasarkan data di atas, ${message}

Tolong berikan rekomendasi yang spesifik dengan:
1. Unit Kompetensi (UK) yang bisa dikembangkan
2. Tools/teknologi alternatif yang bisa digunakan
3. Materi yang belum ada di silabus mitra lain
4. Fokus bahasan yang bisa menjadi diferensiasi`;
      }

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: contextPrompt
                }
              ]
            }
          ]
        })
      });

      if (response.ok) {
        const data = await response.json();
        return data.candidates?.[0]?.content?.parts?.[0]?.text || 'Maaf, tidak ada respons yang diterima.';
      } else {
        throw new Error(`API Error: ${response.status}`);
      }
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      throw error;
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Create CSV context from uploaded data
      const csvContext = csvData.length > 0 
        ? csvData.map(row => 
            `Okupasi: ${row.okupasi}, Level: ${row.level}, Kode UK: ${row.kode_uk}, Judul UK: ${row.judul_uk}, Judul EK: ${row.judul_ek}, Judul KUK: ${row.judul_kuk}, Aspek Kritis: ${row.aspek_kritis}`
          ).join('\n')
        : '';

      // Create syllabus context from uploaded files
      const syllabusContext = uploadedFiles.length > 0
        ? uploadedFiles.map(file => 
            `File: ${file.file.name}\nContent: ${file.content.substring(0, 2000)}...`
          ).join('\n\n')
        : '';

      const response = await sendMessageToGemini(inputMessage, csvContext, syllabusContext);
      
      if (response) {
        const assistantMessage: Message = {
          role: 'assistant',
          content: response,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, assistantMessage]);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get response from Gemini AI",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="border-[#0099FF] bg-gradient-to-r from-blue-50 to-white">
      <CardHeader className="pb-4">
        <div className="flex items-center space-x-2">
          <MessageCircle className="text-[#0099FF]" size={24} />
          <CardTitle className="text-[#003366]">Asisten Silabus AI</CardTitle>
        </div>
        <p className="text-sm text-gray-600">
          Tanyakan tentang rekomendasi silabus berdasarkan data SKKNI dan silabus mitra yang telah diupload
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Uploaded Files Display */}
        {uploadedFiles.length > 0 && (
          <div className="border border-gray-200 rounded-lg p-3 bg-gray-50">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">File Silabus Terupload:</h4>
            <div className="space-y-2">
              {uploadedFiles.map((uploadedFile) => (
                <div key={uploadedFile.id} className="flex items-center justify-between bg-white p-2 rounded border">
                  <div className="flex items-center space-x-2">
                    <File size={16} className="text-[#0099FF]" />
                    <span className="text-sm">{uploadedFile.file.name}</span>
                    <span className="text-xs text-gray-500">
                      ({(uploadedFile.file.size / 1024).toFixed(1)} KB)
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(uploadedFile.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X size={14} />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Messages Area */}
        <div className="h-64 overflow-y-auto border border-gray-200 rounded-lg p-4 bg-white space-y-3">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500">
              <Bot className="mx-auto mb-2" size={32} />
              <p>Mulai percakapan dengan menanyakan tentang silabus pelatihan!</p>
              <p className="text-xs mt-1">
                {csvData.length > 0 
                  ? `${csvData.length} data SKKNI siap untuk dianalisis`
                  : 'Upload file CSV terlebih dahulu untuk analisis yang lebih akurat'
                }
              </p>
              {uploadedFiles.length > 0 && (
                <p className="text-xs mt-1 text-blue-600">
                  {uploadedFiles.length} file silabus mitra siap untuk dianalisis
                </p>
              )}
            </div>
          ) : (
            messages.map((message, index) => (
              <div key={index} className={`flex items-start space-x-2 ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}>
                {message.role === 'assistant' && <Bot className="text-[#0099FF] mt-1" size={20} />}
                <div className={`max-w-[80%] p-3 rounded-lg ${
                  message.role === 'user' 
                    ? 'bg-[#0099FF] text-white' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  <p className="whitespace-pre-wrap">{message.content}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
                {message.role === 'user' && <User className="text-[#003366] mt-1" size={20} />}
              </div>
            ))
          )}
          {isLoading && (
            <div className="flex items-start space-x-2">
              <Bot className="text-[#0099FF] mt-1" size={20} />
              <div className="bg-gray-100 p-3 rounded-lg">
                <Loader2 className="animate-spin" size={16} />
                <span className="ml-2 text-sm">Sedang menganalisis...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="flex space-x-2">
          <div className="flex-1 relative">
            <Textarea
              placeholder="Tanyakan tentang silabus, kompetensi, atau rekomendasi pelatihan..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="resize-none pr-12"
              rows={2}
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={handleFileInputClick}
              className="absolute right-2 top-2 text-[#0099FF] hover:text-[#0077CC] hover:bg-blue-50"
              title="Upload file silabus"
            >
              <Plus size={16} />
            </Button>
          </div>
          <Button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isLoading}
            className="bg-[#0099FF] hover:bg-[#0077CC] px-4"
          >
            <Send size={16} />
          </Button>
        </div>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="*/*"
          onChange={handleFileInputChange}
          className="hidden"
        />

        <div className="text-xs text-gray-500">
          <p>💡 Contoh pertanyaan: "Buatkan silabus untuk Software QA Engineer dengan tools alternatif dari JMeter" atau "Analisis gap silabus mitra untuk okupasi Data Analyst"</p>
          <p className="mt-1">📎 Upload file silabus PDF dari mitra lain untuk analisis perbandingan</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SyllabusChatbot;
