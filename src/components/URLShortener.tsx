
import React, { useState, useEffect } from 'react';
import { Copy, Link, Trash2, BarChart3, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import URLItem from './URLItem';
import { validateUrl, generateShortCode, saveUrl, getUrls, deleteUrl } from '@/utils/urlUtils';

interface ShortenedUrl {
  id: string;
  originalUrl: string;
  shortCode: string;
  customAlias?: string;
  createdAt: string;
  clicks: number;
}

const URLShortener = () => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [customAlias, setCustomAlias] = useState('');
  const [urls, setUrls] = useState<ShortenedUrl[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Get the domain
  const domain = window.location.origin;

  useEffect(() => {
    setUrls(getUrls());
  }, []);

  const handleShorten = async () => {
    if (!validateUrl(originalUrl)) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid URL starting with http:// or https://",
        variant: "destructive",
      });
      return;
    }

    if (customAlias) {
      const existingUrl = urls.find(url => url.shortCode === customAlias);
      if (existingUrl) {
        toast({
          title: "Custom alias already exists",
          description: "Please choose a different custom alias",
          variant: "destructive",
        });
        return;
      }
    }

    setIsLoading(true);

    const shortCode = customAlias || generateShortCode();
    
    const newUrl: ShortenedUrl = {
      id: Date.now().toString(),
      originalUrl,
      shortCode,
      customAlias: customAlias || undefined,
      createdAt: new Date().toISOString(),
      clicks: 0,
    };

    console.log("Creating new URL with shortCode:", shortCode);

    const updatedUrls = saveUrl(newUrl);
    setUrls(updatedUrls);
    setOriginalUrl('');
    setCustomAlias('');

    toast({
      title: "URL shortened successfully!",
      description: `Your short link is ready: ${domain}/${shortCode}`,
    });

    setIsLoading(false);
  };

  const handleDelete = (id: string) => {
    const updatedUrls = deleteUrl(id);
    setUrls(updatedUrls);
    toast({
      title: "URL deleted",
      description: "The shortened URL has been removed",
    });
  };

  const handleCopy = (shortUrl: string) => {
    navigator.clipboard.writeText(shortUrl);
    toast({
      title: "Copied to clipboard!",
      description: "The short URL has been copied to your clipboard",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            URL Shortener
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transform long URLs into short, memorable links with custom aliases
          </p>
        </div>

        <Card className="max-w-2xl mx-auto mb-12 backdrop-blur-sm bg-white/80 border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Link className="text-blue-600" />
              Create Short Link
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Original URL
              </label>
              <Input
                type="url"
                placeholder="https://example.com/very-long-url"
                value={originalUrl}
                onChange={(e) => setOriginalUrl(e.target.value)}
                className="h-12 text-lg"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Custom Alias (Optional)
              </label>
              <div className="flex items-center gap-2">
                <span className="text-gray-500 font-medium">{domain}/</span>
                <Input
                  placeholder="my-custom-link"
                  value={customAlias}
                  onChange={(e) => setCustomAlias(e.target.value.replace(/\s+/g, '-').toLowerCase())}
                  className="h-12"
                />
              </div>
            </div>

            <Button
              onClick={handleShorten}
              disabled={!originalUrl || isLoading}
              className="w-full h-12 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
            >
              {isLoading ? "Shortening..." : "Shorten URL"}
            </Button>
          </CardContent>
        </Card>

        {urls.length > 0 && (
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-6">
              <BarChart3 className="text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-800">Your Short Links</h2>
              <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                {urls.length}
              </span>
            </div>
            
            <div className="grid gap-4">
              {urls.map((url) => (
                <URLItem
                  key={url.id}
                  url={url}
                  onCopy={handleCopy}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default URLShortener;
