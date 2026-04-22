import React from "react";
import SubjectCard from "./SubjectCard";

const YearSection = ({ title, subjects }) => {
  if (subjects.length === 0) return null;

  return (
    <div className="year-section">
      <div className="year-header">
        <h2 className="year-heading">{title}</h2>
        <span className="year-badge">● {subjects.length} subjects</span>
        <div className="year-line"></div>
      </div>

      <div className="subjects-grid">
        {subjects.map((subject) => (
          <SubjectCard key={subject.id} subject={subject} />
        ))}
      </div>
    </div>
  );
};

export default YearSection;