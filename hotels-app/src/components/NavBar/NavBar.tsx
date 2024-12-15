import React from 'react';
import './NavBar.css';
import SearchBox from '../SearchBox/SearchBox';
import {debounce} from "../../utils/common";

interface NavBarProps {
  handleSearchByName?: (toSearch: string) => void;
  disabled?: boolean;
}

function NavBar({ handleSearchByName, disabled }: NavBarProps) {
  const debouncedSearchHandler = handleSearchByName ? debounce(handleSearchByName, 1000) : () => {};
  return (
    <div className="hnf-content-container hnf-header__container">
      <div className="hnf-header__logo">
        <a href="/" className="hnf-link" >
          <img src="/hotel-logo.ico" alt="hotels-app Logo" />
        </a>
      </div>
      <div className="hnf-header__search">
        {handleSearchByName && disabled !== undefined && (
          <SearchBox placeHolder={"Enter the hotel that needs to be scraped"} handleSearch={debouncedSearchHandler} disabled={disabled} />
        )}      </div>
      <ul className="hnf-header__icons"></ul>
    </div>
  );
}

export default NavBar;