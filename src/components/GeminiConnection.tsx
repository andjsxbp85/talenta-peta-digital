
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, AlertCircle, Loader2, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const GeminiConnection = () => {
  const [apiKey, setApiKey] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState('');
  const { toast } = useToast();

  const testConnection = async () => {
    if (!apiKey.trim()) {
      toast({
        title: "Error",
        description: "Please enter your Gemini API key",
        variant: "destructive"
      });
      return;
    }

    setIsConnecting(true);
    setConnectionError('');

    try {
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
                  text: "Explain how AI works in a few words"
                }
              ]
            }
          ]
        })
      });

      if (response.ok) {
        const data = await response.json();
        setIsConnected(true);
        toast({
          title: "Connected Successfully",
          description: "Gemini AI connection established",
        });
        console.log('Gemini AI Response:', data);
      } else {
        throw new Error(`Connection failed: ${response.status}`);
      }
    } catch (error) {
      setConnectionError(error instanceof Error ? error.message : 'Connection failed');
      setIsConnected(false);
      toast({
        title: "Connection Failed",
        description: "Failed to connect to Gemini AI",
        variant: "destructive"
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const getStatusIcon = () => {
    if (isConnecting) return <Loader2 className="animate-spin text-blue-500" size={20} />;
    if (isConnected) return <CheckCircle className="text-green-500" size={20} />;
    if (connectionError) return <AlertCircle className="text-red-500" size={20} />;
    return <Zap className="text-gray-400" size={20} />;
  };

  const getStatusText = () => {
    if (isConnecting) return 'Connecting...';
    if (isConnected) return 'Connected';
    if (connectionError) return 'Connection Failed';
    return 'Not Connected';
  };

  return (
    <Card className="border-[#0099FF] bg-gradient-to-r from-blue-50 to-white">
      <CardHeader className="pb-4">
        <div className="flex items-center space-x-2">
          <Zap className="text-[#0099FF]" size={24} />
          <div>
            <CardTitle className="text-[#003366]">Google Studio AI Integration</CardTitle>
            <CardDescription>
              Connect to Gemini 2.0 Flash for AI-powered recommendations
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div className="md:col-span-2 space-y-2">
            <Label htmlFor="gemini-api-key">Gemini API Key</Label>
            <Input
              id="gemini-api-key"
              type="password"
              placeholder="Enter your Gemini API key..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="font-mono text-sm"
            />
          </div>
          <div className="space-y-2">
            <Button 
              onClick={testConnection} 
              disabled={isConnecting || !apiKey.trim()}
              className="w-full bg-[#0099FF] hover:bg-[#0077CC]"
            >
              {isConnecting ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={16} />
                  Connecting...
                </>
              ) : (
                'Test Connection'
              )}
            </Button>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 text-sm">
          {getStatusIcon()}
          <span className={`font-medium ${
            isConnected ? 'text-green-600' : 
            connectionError ? 'text-red-600' : 
            isConnecting ? 'text-blue-600' : 'text-gray-500'
          }`}>
            Status: {getStatusText()}
          </span>
          {connectionError && (
            <span className="text-red-500 text-xs">({connectionError})</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default GeminiConnection;
