import React from "react";
import "./CommentPreview.css";

export default function CommentPreview({ comments }) {
  if (!comments || comments.length === 0) return null;

  return (
    <div className="bn-comment-preview">
      {comments.map((c, i) => (
        <div className="bn-comment-preview__item" key={i}>
          <div className="bn-comment-preview__avatar">{c.avatar}</div>
          <div className="bn-comment-preview__body">
            <span className="bn-comment-preview__author">{c.author}</span>
            <span className="bn-comment-preview__text">{c.text}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
