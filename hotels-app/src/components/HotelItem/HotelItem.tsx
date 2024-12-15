import React from 'react';
import {Link} from 'react-router-dom';
import Hotel from '../../types/Hotel';
import './HotelItem.css';

interface HotelItemProps {
  hotel: Hotel;
}

const HotelItem: React.FC<HotelItemProps> = ({ hotel }) => {
  const truncateDescription = (description: string, maxLength: number) => {
    if (description.length <= maxLength) {
      return description;
    }
    return description.substring(0, maxLength) + '...';
  };

  return (
    <li key={hotel.id}>
      <img src={hotel.image_srcs[0]} alt={hotel.name}/>
      <div className="hotel-info">
        <h2>
          <Link to={`/hotel/${hotel.id}`}>{hotel.name}</Link>
        </h2>
        <p>
          {truncateDescription(hotel.description, 500)}{' '}
          <Link to={`/hotel/${hotel.id}`}>Read more</Link>
        </p>
        <div className="additional-info">
          <p><strong>Average Price:</strong> ${hotel.average_price}</p>
          <p><strong>Location:</strong> {hotel.location}</p>
        </div>
      </div>
    </li>
  );
};

export default HotelItem;