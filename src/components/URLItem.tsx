
import React from 'react';
import { Copy, Trash2, ExternalLink, Calendar, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface ShortenedUrl {
  id: string;
  originalUrl: string;
  shortCode: string;
  customAlias?: string;
  createdAt: string;
  clicks: number;
}

interface URLItemProps {
  url: ShortenedUrl;
  onCopy: (shortUrl: string) => void;
  onDelete: (id: string) => void;
}

const URLItem: React.FC<URLItemProps> = ({ url, onCopy, onDelete }) => {
  const shortUrl = `https://zeta/${url.shortCode}`;
  const createdDate = new Date(url.createdAt).toLocaleDateString();

  const truncateUrl = (url: string, maxLength: number = 50) => {
    return url.length > maxLength ? `${url.substring(0, maxLength)}...` : url;
  };

  return (
    <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-lg hover:shadow-xl transition-all duration-200">
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                {shortUrl}
              </div>
              {url.customAlias && (
                <span className="bg-green-100 text-green-600 px-2 py-1 rounded text-xs font-medium">
                  Custom
                </span>
              )}
            </div>
            
            <div className="text-gray-600 mb-3">
              <div className="flex items-center gap-2 mb-1">
                <ExternalLink size={14} />
                <span className="text-sm">Original:</span>
              </div>
              <a
                href={url.originalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline break-all"
                title={url.originalUrl}
              >
                {truncateUrl(url.originalUrl, 60)}
              </a>
            </div>

            <div className="flex items-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Calendar size={14} />
                <span>Created {createdDate}</span>
              </div>
              <div className="flex items-center gap-1">
                <BarChart3 size={14} />
                <span>{url.clicks} clicks</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onCopy(shortUrl)}
              className="hover:bg-blue-50 hover:border-blue-300 transition-colors"
            >
              <Copy size={16} />
              Copy
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete(url.id)}
              className="hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-colors"
            >
              <Trash2 size={16} />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default URLItem;
