'use client';

import { useState } from 'react';
import { toast } from 'sonner';

export function ArticleShareButtons() {
  const [copied, setCopied] = useState(false);

  const getShareUrl = () => {
    if (typeof window === 'undefined') return '';
    return window.location.href;
  };

  const handleCopyUrl = async () => {
    try {
      const url = getShareUrl();
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success('URL copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy URL:', err);
      toast.error('Failed to copy URL');
    }
  };

  const handleShare = async (platform: 'twitter' | 'whatsapp' | 'native') => {
    const url = getShareUrl();
    const title = typeof document !== 'undefined' ? document.title : '';
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);

    if (platform === 'native') {
      if (typeof navigator !== 'undefined' && navigator.share) {
        try {
          await navigator.share({
            title,
            url,
          });
          return;
        } catch (err) {
          if ((err as Error).name !== 'AbortError') {
            console.error('Error sharing:', err);
          }
          return;
        }
      }

      handleCopyUrl();
      return;
    }

    let shareUrl = '';

    if (platform === 'twitter') {
      shareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
    } else if (platform === 'whatsapp') {
      shareUrl = `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  return (
    <div className="py-4 border-b border-gray-200">
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={handleCopyUrl}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          <span className="text-sm font-medium">{copied ? 'Copied!' : 'Copy Link'}</span>
        </button>

        <button
          onClick={() => handleShare('twitter')}
          className="flex items-center gap-2 px-4 py-2 bg-black hover:bg-gray-800 text-white rounded-lg transition-colors"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          <span className="text-sm font-medium">X</span>
        </button>

        <button
          onClick={() => handleShare('whatsapp')}
          className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.485 3.488" />
          </svg>
          <span className="text-sm font-medium">WhatsApp</span>
        </button>

        <button
          onClick={() => handleShare('native')}
          className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
          </svg>
          <span className="text-sm font-medium">Share</span>
        </button>
      </div>
    </div>
  );
}
