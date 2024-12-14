import React from 'react';
import './NoData.css';

const NoData: React.FC = () => {
  return (
    <div className="no-data-container">
      <p className="no-data-message">No data available</p>
    </div>
  );
};

export default NoData;