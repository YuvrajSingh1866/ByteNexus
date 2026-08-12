import React, { useRef, useState } from "react";

const CATEGORY_OPTIONS = [
  "Programming",
  "Web Development",
  "Artificial Intelligence",
  "Machine Learning",
  "Cyber Security",
  "Cloud Computing",
  "DevOps",
  "Data Science",
  "Database",
  "System Design",
  "College Subjects",
  "Career Development",
  "Other",
];

const DIFFICULTY_OPTIONS = ["Beginner", "Intermediate", "Advanced", "All Levels"];

const LANGUAGE_OPTIONS = [
  "English",
  "Hindi",
  "Hinglish",
  "Punjabi",
  "Tamil",
  "Telugu",
  "Marathi",
];

/**
 * CourseInfoForm
 * Step 1 of the Creator Studio — collects all core course information.
 *
 * Props:
 *  - formData: the shared form state object
 *  - onFieldChange(field, value): generic field setter
 *  - onThumbnailUpload(file): handles thumbnail image selection
 *  - onBannerUpload(file): handles banner image selection
 *  - onAddTag(tag): adds a tag to formData.tags
 *  - onRemoveTag(tag): removes a tag from formData.tags
 */
export default function CourseInfoForm({
  formData,
  onFieldChange,
  onThumbnailUpload,
  onBannerUpload,
  onAddTag,
  onRemoveTag,
}) {
  const [tagInput, setTagInput] = useState("");
  const thumbnailInputRef = useRef(null);
  const bannerInputRef = useRef(null);

  const handleTagKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const cleaned = tagInput.trim();
      if (cleaned) {
        onAddTag(cleaned);
        setTagInput("");
      }
    } else if (e.key === "Backspace" && !tagInput && formData.tags.length) {
      onRemoveTag(formData.tags[formData.tags.length - 1]);
    }
  };

  return (
    <div className="form-card">
      {/* ── Media Upload ── */}
      <div className="form-section">
        <h3 className="form-section__title">Course Media</h3>
        <div className="media-upload-row">
          <label
            className={`dropzone dropzone--thumbnail${
              formData.thumbnailPreview ? " dropzone--filled" : ""
            }`}
            onClick={() => thumbnailInputRef.current?.click()}
          >
            {formData.thumbnailPreview ? (
              <img
                src={formData.thumbnailPreview}
                alt="Thumbnail preview"
                className="dropzone__image"
              />
            ) : (
              <>
                <span className="dropzone__icon">🖼</span>
                <span className="dropzone__title">Thumbnail</span>
                <span className="dropzone__hint">1:1 · min 400×400px</span>
              </>
            )}
            <input
              ref={thumbnailInputRef}
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => onThumbnailUpload(e.target.files?.[0] || null)}
            />
          </label>

          <label
            className={`dropzone dropzone--banner${
              formData.bannerPreview ? " dropzone--filled" : ""
            }`}
            onClick={() => bannerInputRef.current?.click()}
          >
            {formData.bannerPreview ? (
              <img
                src={formData.bannerPreview}
                alt="Banner preview"
                className="dropzone__image"
              />
            ) : (
              <>
                <span className="dropzone__icon">🏞</span>
                <span className="dropzone__title">Banner</span>
                <span className="dropzone__hint">16:9 · min 1280×720px</span>
              </>
            )}
            <input
              ref={bannerInputRef}
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => onBannerUpload(e.target.files?.[0] || null)}
            />
          </label>
        </div>
      </div>

      {/* ── Basic Info ── */}
      <div className="form-section">
        <h3 className="form-section__title">Basic Information</h3>

        <div className="form-field">
          <label htmlFor="course-title">Course Title</label>
          <input
            id="course-title"
            type="text"
            placeholder="e.g. Complete DSA for Placements"
            value={formData.title}
            onChange={(e) => onFieldChange("title", e.target.value)}
          />
        </div>

        <div className="form-field">
          <label htmlFor="short-description">Short Description</label>
          <input
            id="short-description"
            type="text"
            placeholder="A one-line hook for your course card"
            value={formData.shortDescription}
            onChange={(e) => onFieldChange("shortDescription", e.target.value)}
          />
        </div>

        <div className="form-field">
          <label htmlFor="full-description">Full Description</label>
          <textarea
            id="full-description"
            rows={5}
            placeholder="Explain what students will learn, who it's for, and why it's worth their time."
            value={formData.fullDescription}
            onChange={(e) => onFieldChange("fullDescription", e.target.value)}
          />
        </div>
      </div>

      {/* ── Classification ── */}
      <div className="form-section">
        <h3 className="form-section__title">Classification</h3>
        <div className="form-grid form-grid--3">
          <div className="form-field">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) => onFieldChange("category", e.target.value)}
            >
              <option value="">Select category</option>
              {CATEGORY_OPTIONS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="difficulty">Difficulty</label>
            <select
              id="difficulty"
              value={formData.difficulty}
              onChange={(e) => onFieldChange("difficulty", e.target.value)}
            >
              <option value="">Select level</option>
              {DIFFICULTY_OPTIONS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="language">Language</label>
            <select
              id="language"
              value={formData.language}
              onChange={(e) => onFieldChange("language", e.target.value)}
            >
              <option value="">Select language</option>
              {LANGUAGE_OPTIONS.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* ── Pricing ── */}
      <div className="form-section">
        <h3 className="form-section__title">Pricing</h3>
        <div className="course-type-toggle">
          <button
            type="button"
            className={`course-type-btn${
              formData.courseType === "paid" ? " course-type-btn--active" : ""
            }`}
            onClick={() => onFieldChange("courseType", "paid")}
          >
            Paid
          </button>
          <button
            type="button"
            className={`course-type-btn${
              formData.courseType === "free" ? " course-type-btn--active" : ""
            }`}
            onClick={() => onFieldChange("courseType", "free")}
          >
            Free
          </button>
        </div>

        {formData.courseType === "paid" && (
          <div className="form-field form-field--price">
            <label htmlFor="price">Price (₹)</label>
            <input
              id="price"
              type="number"
              min="0"
              placeholder="e.g. 999"
              value={formData.price}
              onChange={(e) => onFieldChange("price", e.target.value)}
            />
          </div>
        )}
      </div>

      {/* ── Structure ── */}
      <div className="form-section">
        <h3 className="form-section__title">Course Structure</h3>
        <div className="form-grid form-grid--2">
          <div className="form-field">
            <label htmlFor="duration">Duration (Hours)</label>
            <input
              id="duration"
              type="number"
              min="0"
              placeholder="e.g. 42"
              value={formData.duration}
              onChange={(e) => onFieldChange("duration", e.target.value)}
            />
          </div>

          <div className="form-field">
            <label htmlFor="lessons">Estimated Lessons</label>
            <input
              id="lessons"
              type="number"
              min="0"
              placeholder="e.g. 120"
              value={formData.lessons}
              onChange={(e) => onFieldChange("lessons", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* ── Tags ── */}
      <div className="form-section">
        <h3 className="form-section__title">Tags</h3>
        <div className="tags-input">
          {formData.tags.map((tag) => (
            <span key={tag} className="tag-pill">
              {tag}
              <button
                type="button"
                className="tag-pill__remove"
                onClick={() => onRemoveTag(tag)}
                aria-label={`Remove ${tag}`}
              >
                ×
              </button>
            </span>
          ))}
          <input
            type="text"
            className="tags-input__field"
            placeholder={formData.tags.length ? "" : "Type a tag and press Enter…"}
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagKeyDown}
          />
        </div>
        <p className="form-hint">Press Enter or comma to add a tag.</p>
      </div>
    </div>
  );
}
