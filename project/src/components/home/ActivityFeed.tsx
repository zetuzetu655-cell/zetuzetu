import { useState, useRef, useEffect } from 'react';
import { Heart, MessageCircle, MapPin, Share2, ChevronDown, Send, MessageCircle as WhatsappIcon, Facebook, Twitter, Link2, Check } from 'lucide-react';
import type { FeedPost } from '@/types';
import { GraffitiLogo } from '@/components/GraffitiLogo';

interface LocalComment {
  id: string;
  author: string;
  initial: string;
  colorIndex: number;
  text: string;
}

interface FeedCardProps {
  post: FeedPost;
}

const AVATAR_COLORS = ['#22C55E', '#3B82F6'];

export function FeedCard({ post }: FeedCardProps) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [comments, setComments] = useState<LocalComment[]>([]);
  const [commentText, setCommentText] = useState('');
  const [commentName, setCommentName] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const shareRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!shareOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (shareRef.current && !shareRef.current.contains(e.target as Node)) {
        setShareOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [shareOpen]);

  const postUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/#/home`
    : 'https://zetuzetuform.org/#/home';
  const shareText = `${post.text} — ${post.author} via ZETUZETUFORM #NISISI`;

  const shareWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(`${shareText}\n\n${postUrl}`)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setShareOpen(false);
  };

  const shareFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setShareOpen(false);
  };

  const shareTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(postUrl)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setShareOpen(false);
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(postUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const toggleLike = () => {
    if (liked) {
      setLiked(false);
      setLikeCount(likeCount - 1);
    } else {
      setLiked(true);
      setLikeCount(likeCount + 1);
    }
  };

  const toggleComments = () => {
    setShowComments((prev) => !prev);
  };

  const submitComment = () => {
    const trimmedText = commentText.trim();
    if (!trimmedText) return;

    const trimmedName = commentName.trim();
    let author: string;
    let initial: string;

    if (trimmedName) {
      author = trimmedName;
      initial = trimmedName.charAt(0).toUpperCase();
    } else {
      author = 'Anonymous Youth';
      initial = 'A';
    }

    setComments((prev) => [
      ...prev,
      {
        id: `c-${Date.now()}`,
        author,
        initial,
        colorIndex: prev.length % AVATAR_COLORS.length,
        text: trimmedText,
      },
    ]);
    setCommentText('');
    setCommentName('');
  };

  const handleCommentKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      submitComment();
    }
  };

  const totalComments = post.comments + comments.length;

  return (
    <article className="bg-ink-900 rounded-2xl border border-ink-600/50 overflow-hidden card-glow animate-slide-up">
      {/* Header */}
      <div className="flex items-center gap-3 p-4">
        <GraffitiLogo className="h-11 w-11 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="font-display font-semibold text-white text-sm">
            {post.author}
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <MapPin className="w-3 h-3" />
            <span>{post.location}</span>
            <span>·</span>
            <span>{post.timestamp}</span>
          </div>
        </div>
        <div className="relative" ref={shareRef}>
          <button
            onClick={() => setShareOpen((prev) => !prev)}
            className={`p-2 rounded-lg transition-colors ${
              shareOpen ? 'text-lime bg-lime/10' : 'text-gray-500 hover:text-lime'
            }`}
            aria-label="Share post"
          >
            <Share2 className="w-4 h-4" />
          </button>

          {shareOpen && (
            <div className="absolute right-0 top-full mt-2 w-52 bg-ink-800 border border-ink-600/60 rounded-xl shadow-2xl shadow-black/40 overflow-hidden z-30 animate-fade-in">
              <button
                onClick={shareWhatsApp}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:text-lime hover:bg-ink-700/50 transition-colors text-left"
              >
                <WhatsappIcon className="w-4 h-4 flex-shrink-0" />
                Share to WhatsApp
              </button>
              <button
                onClick={shareFacebook}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:text-lime hover:bg-ink-700/50 transition-colors text-left"
              >
                <Facebook className="w-4 h-4 flex-shrink-0" />
                Share to Facebook
              </button>
              <button
                onClick={shareTwitter}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:text-lime hover:bg-ink-700/50 transition-colors text-left"
              >
                <Twitter className="w-4 h-4 flex-shrink-0" />
                Share to Twitter / X
              </button>
              <div className="border-t border-ink-700/50" />
              <button
                onClick={copyLink}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:text-lime hover:bg-ink-700/50 transition-colors text-left"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 flex-shrink-0 text-lime" />
                    <span className="text-lime font-medium">Copied!</span>
                  </>
                ) : (
                  <>
                    <Link2 className="w-4 h-4 flex-shrink-0" />
                    Copy Link
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Text */}
      <div className="px-4 pb-3">
        <p className="text-gray-300 text-sm leading-relaxed">{post.text}</p>
      </div>

      {/* Image */}
      <div className="relative w-full aspect-video overflow-hidden bg-ink-800">
        <img
          src={post.image}
          alt=""
          loading="lazy"
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
        />
      </div>

      {/* Engagement bar */}
      <div className="flex items-center gap-1 p-3 border-t border-ink-700/40">
        <button
          onClick={toggleLike}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
            liked
              ? 'text-lime bg-lime/10'
              : 'text-gray-400 hover:text-lime hover:bg-ink-700/50'
          }`}
        >
          <Heart className="w-4 h-4" fill={liked ? 'currentColor' : 'none'} />
          {likeCount}
        </button>
        <button
          onClick={toggleComments}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
            showComments
              ? 'text-sky bg-sky/10'
              : 'text-gray-400 hover:text-sky hover:bg-ink-700/50'
          }`}
        >
          <MessageCircle className="w-4 h-4" />
          {totalComments}
        </button>
      </div>

      {/* Comments section */}
      {showComments && (
        <div className="px-4 pb-4 pt-1 border-t border-ink-700/40 animate-fade-in">
          {/* Existing comments */}
          {comments.length > 0 && (
            <div className="space-y-3 mt-3">
              {comments.map((comment) => (
                <div key={comment.id} className="flex items-start gap-2.5">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-white text-sm"
                    style={{ backgroundColor: AVATAR_COLORS[comment.colorIndex] }}
                  >
                    {comment.initial}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="bg-ink-800 rounded-xl px-3 py-2">
                      <div className="text-xs font-semibold text-gray-300 mb-0.5">
                        {comment.author}
                      </div>
                      <p className="text-sm text-gray-400 leading-relaxed break-words">
                        {comment.text}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Comment input */}
          <div className="mt-3 space-y-2">
            {/* Optional name field */}
            <input
              type="text"
              value={commentName}
              onChange={(e) => setCommentName(e.target.value)}
              onKeyDown={handleCommentKeyDown}
              placeholder="Name (optional)"
              className="w-full bg-ink-800 border border-ink-600/50 rounded-full px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-sky/50 focus:ring-1 focus:ring-sky/20 transition-all"
            />
            {/* Comment text field with submit */}
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-white text-sm"
                style={{
                  backgroundColor:
                    AVATAR_COLORS[comments.length % AVATAR_COLORS.length],
                }}
              >
                {commentName.trim()
                  ? commentName.trim().charAt(0).toUpperCase()
                  : 'A'}
              </div>
              <div className="relative flex-1">
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  onKeyDown={handleCommentKeyDown}
                  placeholder="Write a comment..."
                  className="w-full bg-ink-800 border border-ink-600/50 rounded-full pl-4 pr-10 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-sky/50 focus:ring-1 focus:ring-sky/20 transition-all"
                />
                <button
                  onClick={submitComment}
                  disabled={!commentText.trim()}
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 rounded-full text-sky hover:bg-sky/10 disabled:text-gray-600 disabled:hover:bg-transparent transition-all"
                  aria-label="Submit comment"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}

interface ActivityFeedProps {
  posts: FeedPost[];
}

export function ActivityFeed({ posts }: ActivityFeedProps) {
  const [visibleCount, setVisibleCount] = useState(3);
  const [loading, setLoading] = useState(false);

  const visiblePosts = posts.slice(0, visibleCount);
  const hasMore = visibleCount < posts.length;

  const loadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + 3, posts.length));
      setLoading(false);
    }, 400);
  };

  return (
    <section id="news-feed" className="py-16 md:py-24 bg-grid scroll-mt-20">
      <div className="section-pad">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-sky/10 text-sky text-xs font-semibold tracking-wider uppercase mb-4">
            Live From Langas
          </span>
          <h2 className="font-display font-bold text-white text-3xl md:text-4xl lg:text-5xl mb-4">
            Initiative <span className="gradient-text">Activity Feed</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg">
            Real updates from the ground — studio sessions, clean-ups, tournaments,
            and moments of change as they happen.
          </p>
        </div>

        <div className="max-w-2xl mx-auto space-y-6">
          {visiblePosts.map((post) => (
            <FeedCard key={post.id} post={post} />
          ))}
        </div>

        {hasMore && (
          <div className="text-center mt-10">
            <button
              onClick={loadMore}
              disabled={loading}
              className="btn-outline-lime inline-flex items-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-lime border-t-transparent rounded-full animate-spin" />
                  Loading...
                </>
              ) : (
                <>
                  <ChevronDown className="w-5 h-5" />
                  Load More
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
