import React from 'react';
import {Link} from 'react-router-dom';
import Hotel from '../../types/Hotel';
import './HotelItem.css';

interface HotelItemProps {
  hotel: Hotel;
}

const HotelItem: React.FC<HotelItemProps> = ({hotel}) => {
  return (
    <li key={hotel.id}>
      <img src={hotel.image_srcs[0]} alt={hotel.name}/>
      <div className="hotel-info">
        <h2>
          <Link to={`/hotel/${hotel.id}`}>{hotel.name}</Link>
        </h2>
        <p>{hotel.description}</p>
      </div>
    </li>
  );
};

export default HotelItem;