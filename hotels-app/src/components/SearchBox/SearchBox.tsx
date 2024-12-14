import React from 'react';
import './SearchBox.css';

interface SearchBoxProps {
  placeHolder: string;
  handleSearch: (toSearch: string) => void;
  disabled: boolean;
}

function SearchBox({ placeHolder, handleSearch, disabled }: SearchBoxProps) {
  return (
    <div className="wrap">
      <div className="search">
        <input
          onChange={(e) => handleSearch(e.target.value)}
          type="text"
          className="searchTerm"
          placeholder={placeHolder}
          disabled={disabled}
        />
      </div>
    </div>
  );
}
export default SearchBox;