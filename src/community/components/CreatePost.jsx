import React, { useState } from "react";
import {
  ImageIcon,
  Code2,
  Link2,
  Smile,
  BarChart3,
  Send,
} from "lucide-react";

import { currentUser } from "../data/communityPosts";

import "./CreatePost.css";

const attachments = [
  {
    key: "image",
    label: "Image",
    icon: ImageIcon,
  },
  {
    key: "code",
    label: "Code",
    icon: Code2,
  },
  {
    key: "link",
    label: "Link",
    icon: Link2,
  },
  {
    key: "poll",
    label: "Poll",
    icon: BarChart3,
  },
  {
    key: "emoji",
    label: "Emoji",
    icon: Smile,
  },
];

const CreatePost = () => {
  const [content, setContent] = useState("");

  const [activeAttachment, setActiveAttachment] = useState(null);

  const toggleAttachment = (key) => {
    setActiveAttachment((prev) => (prev === key ? null : key));
  };

  return (
    <section className="bn-create-post bn-card">

      {/* Header */}

      <div className="bn-create-header">

        <div className="bn-create-avatar">

          {currentUser.avatar}

        </div>

        <div>

          <h3>{currentUser.name}</h3>

          <span>Share something with the ByteNexus Community</span>

        </div>

      </div>

      {/* Textarea */}

      <textarea

        className="bn-create-textarea"

        placeholder="What's your next build? Share a project, ask a coding question, or celebrate an achievement..."

        value={content}

        onChange={(e) => setContent(e.target.value)}

      />

      {/* Attachments */}

      {activeAttachment && (

        <div className="bn-create-preview">

          {activeAttachment.toUpperCase()} Attachment

        </div>

      )}

      {/* Footer */}

      <div className="bn-create-footer">

        <div className="bn-create-actions">

          {attachments.map(({ key, label, icon: Icon }) => (

            <button

              key={key}

              className={`bn-attach-btn ${
                activeAttachment === key ? "active" : ""
              }`}

              onClick={() => toggleAttachment(key)}

            >

              <Icon size={16} />

              <span>{label}</span>

            </button>

          ))}

        </div>

        <button

          className="bn-create-post-btn"

          disabled={!content.trim()}

        >

          <Send size={16} />

          Publish

        </button>

      </div>

    </section>
  );
};

export default CreatePost;