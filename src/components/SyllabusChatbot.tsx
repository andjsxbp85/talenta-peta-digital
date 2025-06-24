
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle, Send, Bot, User, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface SyllabusChatbotProps {
  csvData?: any[];
}

const SyllabusChatbot: React.FC<SyllabusChatbotProps> = ({ csvData = [] }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const sendMessageToGemini = async (message: string, csvContext: string = '') => {
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
      const contextPrompt = csvContext 
        ? `Berdasarkan data CSV berikut yang berisi materi pelatihan SKKNI:\n${csvContext}\n\nPertanyaan: ${message}`
        : message;

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
                  text: `Anda adalah asisten AI yang membantu membuat rekomendasi silabus pelatihan digital berdasarkan SKKNI. ${contextPrompt}`
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
            `Kode UK: ${row.kode_uk}, Judul: ${row.judul_uk}, Kompetensi: ${row.elemen_kompetensi}, KUK: ${row.kuk}, Okupasi: ${row.okupasi}`
          ).join('\n')
        : '';

      const response = await sendMessageToGemini(inputMessage, csvContext);
      
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
          Tanyakan tentang rekomendasi silabus berdasarkan data SKKNI yang telah diupload
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
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
                <span className="ml-2 text-sm">Sedang berpikir...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="flex space-x-2">
          <Textarea
            placeholder="Tanyakan tentang silabus, kompetensi, atau rekomendasi pelatihan..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 resize-none"
            rows={2}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isLoading}
            className="bg-[#0099FF] hover:bg-[#0077CC] px-4"
          >
            <Send size={16} />
          </Button>
        </div>

        <div className="text-xs text-gray-500">
          <p>💡 Contoh pertanyaan: "Buatkan silabus untuk Software QA Engineer" atau "Apa saja kompetensi yang harus dikuasai?"</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SyllabusChatbot;
