import React from 'react';
import '../styles/firstYear.css';

const SearchBar = ({ searchTerm, setSearchTerm, placeholder = "Search subjects..." }) => {
  return (
    <div className="search-bar-wrapper">
      <div className="search-icon">🔍</div>
      <input
        type="text"
        className="search-input"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
