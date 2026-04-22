
import React from "react";

const SubjectCard = ({ subject }) => {

  const openNotes = () => {
    console.log(subject); // debug

    if (subject && subject.notes) {
      window.open(subject.notes, "_blank");
    }
  };

  return (
    <div className="subject-card" onClick={openNotes} style={{cursor:"pointer"}}>

      <div className="subject-icon-box">
        {subject.icon || "📚"}
      </div>

      <div className="subject-info">
        <div className="subject-name">{subject.name}</div>

        <div className="subject-year-tag">
          CSE – {subject.year ? subject.year.replace("year", "") : ""} Year
        </div>
      </div>

      <div className="subject-link">
        Open Notes →
      </div>

    </div>
  );
};

export default SubjectCard;
