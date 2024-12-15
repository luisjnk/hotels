import React from 'react';
import './NavBar.css';

function NavBar() {
  return (
    <div className="hnf-content-container hnf-header__container">
      <div className="hnf-header__logo">
        <a href="/" className="hnf-link" >
          <img src="/hotel-logo.ico" alt="hotels-app Logo" />
        </a>
      </div>

    </div>
  );
}

export default NavBar;