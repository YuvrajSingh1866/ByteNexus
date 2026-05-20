import React from 'react';
import '../styles/firstYear.css';

const LoadingSpinner = () => {
  return (
    <div className="spinner-container">
      <div className="loading-spinner"></div>
      <p>Loading Data...</p>
    </div>
  );
};

export default LoadingSpinner;
