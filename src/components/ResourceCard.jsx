import React from 'react';
import '../styles/firstYear.css';

const ResourceCard = ({ title, link, type }) => {
  const getIcon = () => {
    switch (type) {
      case 'video': return '🎥';
      case 'pdf': return '📄';
      default: return '🔗';
    }
  };

  return (
    <a href={link} target="_blank" rel="noopener noreferrer" className="resource-card">
      <div className="resource-icon">{getIcon()}</div>
      <div className="resource-info">
        <h4 className="resource-title">{title}</h4>
        <span className="resource-type">{type.toUpperCase()}</span>
      </div>
      <div className="resource-arrow">→</div>
    </a>
  );
};

export default ResourceCard;
