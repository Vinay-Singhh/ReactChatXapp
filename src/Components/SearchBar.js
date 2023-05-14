import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search conversations..."
        value={searchQuery}
        onChange={handleSearchInputChange}
        className="search-input"
      />
    </div>
  );
}

export default SearchBar;
