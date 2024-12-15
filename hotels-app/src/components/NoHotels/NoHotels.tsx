import React from 'react';
import { Link } from 'react-router-dom';
import './NoHotels.css';

const NoHotels: React.FC = () => {
  return (
    <div className="no-hotels">

      <p>Your saved hotels will appear here but first you must scrape</p>
      <Link to="/hotel-search">Go to search</Link></div>
  );
};

export default NoHotels;