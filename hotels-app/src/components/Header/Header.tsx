import React from 'react';
import './Header.css';
import SearchBox from "../SearchBox/SearchBox";
import {debounce} from "../../utils/common";

interface HeaderProps {
  handleSearchByName?: (toSearch: string) => void;
  disabled?: boolean;
}

const Header: React.FC<HeaderProps> = ({ handleSearchByName, disabled }) => {
  const debouncedSearchHandler = handleSearchByName ? debounce(handleSearchByName, 1000) : () => {};

  return (
    <header className="header">
      <div className="header-content">
        <h1>Find Hotel by name</h1>
        <div className="search-box">
          {handleSearchByName && disabled !== undefined && (
            <SearchBox
              placeHolder={"Enter the hotel that needs to be scraped"}
              handleSearch={debouncedSearchHandler}
              disabled={disabled}
            />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;