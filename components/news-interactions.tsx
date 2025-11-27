'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'sonner';

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
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [dislikeCount, setDislikeCount] = useState(initialDislikeCount);
  const [commentCount, setCommentCount] = useState(initialCommentCount);
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);
  const [hasDisliked, setHasDisliked] = useState(false);
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

  return (
    <div className="space-y-6">
      {/* Like/Dislike and Comment Count */}
      <div className="pt-6 border-t border-gray-200">
        <div className="flex items-center gap-6 text-sm">
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
    </div>
  );
}
