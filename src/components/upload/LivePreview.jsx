import React from "react";

/**
 * LivePreview
 * Renders a live, real-time preview of the course card exactly as
 * it will appear on the Courses Marketplace, driven entirely by formData.
 *
 * Props:
 *  - formData: the shared form state object
 */
export default function LivePreview({ formData }) {
  const isFree = formData.courseType === "free";
  const hasTitle = formData.title.trim().length > 0;

  return (
    <div className="live-preview">
      <span className="live-preview__eyebrow">Live Preview</span>

      <article className="preview-card">
        <div className="preview-card__media">
          {formData.thumbnailPreview ? (
            <img
              src={formData.thumbnailPreview}
              alt="Course thumbnail"
              className="preview-card__thumb"
            />
          ) : (
            <div className="preview-card__placeholder">
              <span className="preview-card__placeholder-icon">◈</span>
              <span>Add a thumbnail</span>
            </div>
          )}

          <div className={`preview-price-badge ${isFree ? "free" : "paid"}`}>
            {isFree ? "Free" : formData.price ? `₹${formData.price}` : "Paid"}
          </div>
        </div>

        <div className="preview-card__body">
          <div className="preview-card__meta-row">
            <span className="preview-card__category">
              {formData.category || "Category"}
            </span>
            {formData.difficulty && (
              <span className="preview-card__difficulty">
                {formData.difficulty}
              </span>
            )}
          </div>

          <h3 className="preview-card__title">
            {hasTitle ? formData.title : "Your course title will appear here"}
          </h3>

          <p className="preview-card__description">
            {formData.shortDescription ||
              "A short, compelling description of your course goes here."}
          </p>

          {formData.tags.length > 0 && (
            <div className="preview-card__tags">
              {formData.tags.slice(0, 4).map((tag) => (
                <span key={tag} className="preview-card__tag">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="preview-card__stats">
            <span>
              <span className="icon">⏱</span>
              {formData.duration ? `${formData.duration} Hours` : "— Hours"}
            </span>
            <span>
              <span className="icon">▶</span>
              {formData.lessons ? `${formData.lessons} lessons` : "— lessons"}
            </span>
          </div>

          <div className="preview-card__footer">
            <div className="preview-card__instructor">
              <span className="preview-card__avatar">Y</span>
              <div>
                <span className="preview-card__instructor-name">You</span>
                <span className="preview-card__instructor-role">Creator</span>
              </div>
            </div>
            <div className="preview-card__social-proof">
              <span className="preview-card__rating">★ New</span>
              <span className="preview-card__students">0 enrolled</span>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
