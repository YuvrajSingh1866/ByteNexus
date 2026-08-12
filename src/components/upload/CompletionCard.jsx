import React, { useMemo } from "react";

/**
 * CompletionCard
 * Tracks completion of the required fields and renders a progress bar
 * plus a checklist so creators know exactly what's left.
 *
 * Props:
 *  - formData: the shared form state object
 */
export default function CompletionCard({ formData }) {
  const requiredFields = useMemo(() => {
    const fields = [
      { key: "thumbnail", label: "Thumbnail", done: !!formData.thumbnailPreview },
      { key: "title", label: "Course Title", done: formData.title.trim().length > 0 },
      {
        key: "description",
        label: "Description",
        done: formData.shortDescription.trim().length > 0,
      },
      { key: "category", label: "Category", done: formData.category.trim().length > 0 },
      { key: "duration", label: "Duration", done: String(formData.duration).trim().length > 0 },
    ];

    if (formData.courseType === "paid") {
      fields.splice(4, 0, {
        key: "price",
        label: "Price",
        done: String(formData.price).trim().length > 0,
      });
    }

    return fields;
  }, [formData]);

  const completedCount = requiredFields.filter((f) => f.done).length;
  const percent = Math.round((completedCount / requiredFields.length) * 100);

  return (
    <div className="completion-card">
      <div className="completion-card__header">
        <h3>Course Completeness</h3>
        <span className="completion-card__percent">{percent}%</span>
      </div>

      <div className="completion-progress">
        <div
          className="completion-progress__fill"
          style={{ width: `${percent}%` }}
        />
      </div>

      <ul className="completion-checklist">
        {requiredFields.map((field) => (
          <li
            key={field.key}
            className={`completion-checklist__item${
              field.done ? " completion-checklist__item--done" : ""
            }`}
          >
            <span className="completion-checklist__icon">
              {field.done ? "✓" : "○"}
            </span>
            {field.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
