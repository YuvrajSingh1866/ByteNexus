import React from 'react';
import '../styles/firstYear.css';

const SubjectHeader = ({ title, description }) => {
  return (
    <div className="subject-header-container">
      <h1 className="subject-page-title">{title}</h1>
      <p className="subject-page-desc">{description}</p>
    </div>
  );
};

export default SubjectHeader;
