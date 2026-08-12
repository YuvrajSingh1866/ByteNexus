import React, { useState } from "react";
import {
  Heart,
  MessageSquare,
  Bookmark,
  Share2,
  Copy,
  Check,
  ImageIcon,
  Link2,
} from "lucide-react";
import CommentPreview from "./CommentPreview";
import { commentPreviews } from "../data/communityPosts";
import "./PostCard.css";

export default function PostCard({ post }) {
  const [liked, setLiked] = useState(post.liked);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [bookmarked, setBookmarked] = useState(post.bookmarked);
  const [copied, setCopied] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const handleLike = () => {
    setLiked((prev) => !prev);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  const handleCopy = () => {
    if (post.code?.snippet) {
      navigator.clipboard?.writeText(post.code.snippet).catch(() => {});
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const comments = commentPreviews[post.id];

  return (
    <article className="bn-post-card">
      <header className="bn-post-card__header">
        <div className="bn-post-card__avatar">{post.author.avatar}</div>
        <div className="bn-post-card__meta">
          <div className="bn-post-card__meta-top">
            <span className="bn-post-card__name">{post.author.name}</span>
            <span className="bn-post-card__username">{post.author.username}</span>
            <span className="bn-post-card__dot">·</span>
            <span className="bn-post-card__time">{post.time}</span>
          </div>
          <span className="bn-post-card__role">{post.author.role}</span>
        </div>
        {post.tag && <span className="bn-post-card__tag">#{post.tag}</span>}
      </header>

      <p className="bn-post-card__content">{post.content}</p>

      {post.type === "image" && (
        <div className="bn-post-card__image-placeholder">
          <ImageIcon size={26} strokeWidth={1.5} />
          <span>Image attachment</span>
        </div>
      )}

      {post.type === "code" && post.code && (
        <div className="bn-code-card">
          <div className="bn-code-card__header">
            <div className="bn-code-card__dots">
              <span />
              <span />
              <span />
            </div>
            <span className="bn-lang-badge">{post.code.language}</span>
            <button
              type="button"
              className="bn-code-card__copy"
              onClick={handleCopy}
              aria-label="Copy code"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <pre className="bn-code-card__body">
            <code>{post.code.snippet}</code>
          </pre>
        </div>
      )}

      {post.type === "link" && post.link && (
        <a className="bn-link-card" href="#" onClick={(e) => e.preventDefault()}>
          <div className="bn-link-card__icon">
            <Link2 size={18} strokeWidth={1.6} />
          </div>
          <div className="bn-link-card__body">
            <span className="bn-link-card__title">{post.link.title}</span>
            <span className="bn-link-card__desc">{post.link.description}</span>
            <span className="bn-link-card__domain">{post.link.domain}</span>
          </div>
        </a>
      )}

      <footer className="bn-post-card__footer">
        <button
          type="button"
          className={"bn-post-action" + (liked ? " bn-post-action--liked" : "")}
          onClick={handleLike}
        >
          <Heart size={17} strokeWidth={1.8} fill={liked ? "currentColor" : "none"} />
          <span>{likeCount}</span>
        </button>

        <button
          type="button"
          className="bn-post-action"
          onClick={() => setShowComments((p) => !p)}
        >
          <MessageSquare size={17} strokeWidth={1.8} />
          <span>{post.comments}</span>
        </button>

        <button
          type="button"
          className="bn-post-action"
        >
          <Share2 size={17} strokeWidth={1.8} />
          <span>{post.shares}</span>
        </button>

        <button
          type="button"
          className={
            "bn-post-action bn-post-action--bookmark" +
            (bookmarked ? " bn-post-action--liked" : "")
          }
          onClick={() => setBookmarked((p) => !p)}
          aria-label="Bookmark"
        >
          <Bookmark size={17} strokeWidth={1.8} fill={bookmarked ? "currentColor" : "none"} />
        </button>
      </footer>

      {showComments && <CommentPreview comments={comments} />}
    </article>
  );
}
