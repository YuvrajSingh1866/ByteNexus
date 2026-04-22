import React from "react";

const SubjectCard = ({ subject, onSelect, isActive }) => {

  return (
    <div
      className={`subject-card ${isActive ? "active" : ""}`}
      onClick={() => onSelect(subject)}
    >
      <div className="subject-icon-box">
        {subject.icon || "📚"}
      </div>

      <div className="subject-info">
        <div className="subject-name">{subject.name}</div>
      </div>

    </div>
  );
};

export default SubjectCard;