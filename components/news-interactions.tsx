'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'sonner';
import { addBookmark } from '@/lib/api/bookmarks';
import { useAuth } from '@/contexts/AuthContext';

interface Comment {
  comment_id?: number;
  user_name?: string;
  comment?: string;
  comment_text?: string;
  created_at?: string;
  comment_date?: string;
  [key: string]: any;
}

interface NewsInteractionsProps {
  storyId: string;
  initialLikeCount: number;
  initialDislikeCount: number;
  initialCommentCount: number;
  initialComments: Comment[];
}

export function NewsInteractions({
  storyId,
  initialLikeCount,
  initialDislikeCount,
  initialCommentCount,
  initialComments,
}: NewsInteractionsProps) {
  const router = useRouter();
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [dislikeCount, setDislikeCount] = useState(initialDislikeCount);
  const [commentCount, setCommentCount] = useState(initialCommentCount);
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);
  const [hasDisliked, setHasDisliked] = useState(false);
  const [isBookmarking, setIsBookmarking] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [error, setError] = useState('');
  const [showAllComments, setShowAllComments] = useState(false);

  function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  // Prefer cookie set by AuthContext, fallback to any localStorage token if present
  const cookieToken = Cookies.get('auth_token');

  return cookieToken;
}

  const API_BASE = process.env.NEXT_PUBLIC_API_URL;
  
  const handleLikeDislike = async (action: 'like' | 'dislike') => {
      const AUTH_TOKEN = getAuthToken();
    if (!AUTH_TOKEN) {
      toast.error('Please login first to like or dislike');
      router.push('/login');
      return;
    }
    if (isLiking) return;
    if ((action === 'like' && hasLiked) || (action === 'dislike' && hasDisliked)) return;

    setIsLiking(true);
    setError('');

    try {
      const formData = new URLSearchParams();
      formData.append('story_id', storyId);
      formData.append('action', action);

      await axios.post(`${API_BASE}/like-dislike`, formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Bearer ${AUTH_TOKEN}`,
        },
      });

      if (action === 'like') {
        setLikeCount(prev => prev + 1);
        setHasLiked(true);
      } else {
        setDislikeCount(prev => prev + 1);
        setHasDisliked(true);
      }

      // Refresh to reload fetchStory API
      router.refresh();
    } catch (err: any) {
      console.error('Error submitting like/dislike:', err);
      setError(err.response?.data?.message || 'Failed to submit. Please try again.');
    } finally {
      setIsLiking(false);
    }
  };

  const handleBookmark = async () => {
    if (!user) {
      toast.error('Please login first to bookmark');
      router.push('/login');
      return;
    }
    if (isBookmarking || isBookmarked) return;

    setIsBookmarking(true);
    setError('');

    try {
      await addBookmark(storyId);
      setIsBookmarked(true);
      toast.success('Article bookmarked successfully');
    } catch (err: any) {
      console.error('Error bookmarking:', err);
      const errorMsg = err?.message || 'Failed to bookmark. Please try again.';
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setIsBookmarking(false);
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    const AUTH_TOKEN = getAuthToken();
    if (!AUTH_TOKEN) {
      toast.error('Please login first to post a comment');
      router.push('/login');
      return;
    }
    if (!newComment.trim() || isSubmitting) return;

    setIsSubmitting(true);
    setError('');

    try {
      const formData = new URLSearchParams();
      formData.append('story_id', storyId);
      formData.append('comment', newComment.trim());

      const response = await axios.post(`${API_BASE}/comments`, formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Bearer ${AUTH_TOKEN}`,
        },
      });

      // Add the new comment to the list
      const newCommentObj: Comment = {
        comment_id: Date.now(),
        user_name: 'You',
        comment: newComment.trim(),
        created_at: new Date().toISOString(),
      };

      setComments(prev => [newCommentObj, ...prev]);
      setCommentCount(prev => prev + 1);
      setNewComment('');

      // Refresh to reload fetchStory API
      router.refresh();
    } catch (err: any) {
      console.error('Error submitting comment:', err);
      setError(err.response?.data?.message || 'Failed to post comment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
          // User cancelled or error occurred
          if ((err as Error).name !== 'AbortError') {
            console.error('Error sharing:', err);
          }
          return;
        }
      } else {
        // Fallback: copy to clipboard if native share not available
        handleCopyUrl();
        return;
      }
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
    <div className="space-y-6">
      {/* Like/Dislike, Bookmark and Comment Count */}
      <div className="pt-6 border-t border-gray-200">
        <div className="flex items-center gap-6 text-sm flex-wrap">
          <button
            onClick={() => handleLikeDislike('like')}
            disabled={isLiking || hasLiked}
            className={`flex items-center gap-2 transition-colors ${
              hasLiked
                ? 'text-blue-600'
                : 'text-gray-600 hover:text-blue-600'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
            </svg>
            <span className="font-medium">{likeCount} Likes</span>
          </button>

          <button
            onClick={() => handleLikeDislike('dislike')}
            disabled={isLiking || hasDisliked}
            className={`flex items-center gap-2 transition-colors ${
              hasDisliked
                ? 'text-red-600'
                : 'text-gray-600 hover:text-red-600'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM14 9.667v-5.43a2 2 0 00-1.105-1.79l-.05-.025A4 4 0 0011.055 2H5.64a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4l1.4-1.866a4 4 0 00.8-2.4z" />
            </svg>
            <span className="font-medium">{dislikeCount} Dislikes</span>
          </button>

          <button
            onClick={handleBookmark}
            disabled={isBookmarking || isBookmarked}
            className={`flex items-center gap-2 transition-colors ${
              isBookmarked
                ? 'text-yellow-600'
                : 'text-gray-600 hover:text-yellow-600'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <svg className="w-5 h-5" fill={isBookmarked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
            <span className="font-medium">{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
          </button>

          <div className="flex items-center gap-2 text-gray-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
            </svg>
            <span className="font-medium">{commentCount} Comments</span>
          </div>
        </div>

        {error && (
          <div className="mt-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
            {error}
          </div>
        )}
      </div>

      {/* Add Comment Form */}
      <div className="pt-6 border-t border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Leave a Comment</h3>
        <form onSubmit={handleSubmitComment} className="space-y-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Share your thoughts..."
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            disabled={isSubmitting}
          />
          <button
            type="submit"
            disabled={isSubmitting || !newComment.trim()}
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Posting...' : 'Post Comment'}
          </button>
        </form>
      </div>

      {/* Comments Section */}
      {comments && comments.length > 0 && (
        <div className="pt-6 border-t border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Comments ({commentCount})</h3>
          <div className="space-y-4">
            {(showAllComments ? comments : comments.slice(0, 5)).map((comment, index) => (
              <div key={comment.comment_id || index} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {(comment.user_name || 'U').charAt(0).toUpperCase()}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-gray-900">{comment.user_name || 'Anonymous'}</span>
                      {(comment.created_at || comment.comment_date) && (
                        <span className="text-xs text-gray-500">
                          {new Date(comment.created_at || comment.comment_date!).toLocaleDateString(undefined, {
                            month: 'short',
                            day: '2-digit',
                            year: 'numeric',
                          })}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {comment.comment || comment.comment_text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {comments.length > 5 && (
            <button
              onClick={() => setShowAllComments(!showAllComments)}
              className="mt-4 px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
            >
              {showAllComments ? 'Show Less' : `Show All ${comments.length} Comments`}
            </button>
          )}
        </div>
      )}

      {/* Share Section */}
      <div className="pt-6 border-t border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Share this article</h3>
        <div className="flex flex-wrap items-center gap-3">
          {/* Copy Link Button */}
          <button
            onClick={handleCopyUrl}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <span className="text-sm font-medium">{copied ? 'Copied!' : 'Copy Link'}</span>
          </button>

          {/* X (Twitter) Share Button */}
          <button
            onClick={() => handleShare('twitter')}
            className="flex items-center gap-2 px-4 py-2 bg-black hover:bg-gray-800 text-white rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
            <span className="text-sm font-medium">X</span>
          </button>

          {/* WhatsApp Share Button */}
          <button
            onClick={() => handleShare('whatsapp')}
            className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.485 3.488"/>
            </svg>
            <span className="text-sm font-medium">WhatsApp</span>
          </button>

          {/* Native Share Button */}
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
    </div>
  );
}
