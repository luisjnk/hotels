import React from 'react';
import Hotel from '../../types/Hotel';
import NoData from "./NoData/NoData";
import Button, { ButtonType } from "../Button/Button";
import ImageCarousel from "../ImageCarousel/ImageCarousel";
import './HotelDetails.css';

interface HotelDetailsProps {
  hotel: Hotel;
  handleAdd?: () => void;
}

const HotelDetails: React.FC<HotelDetailsProps> = ({ hotel, handleAdd }) => {
  const isEmptyHotel = !hotel.name && !hotel.description && !hotel.location;

  return (
    <div className="hotel-details">
      {isEmptyHotel ? (
        <NoData />
      ) : (
        <>
          <h2>{hotel.name}</h2>
          <ImageCarousel images={hotel.image_srcs} />
          <p><strong>Description:</strong> {hotel.description}</p>
          <p><strong>Location:</strong> {hotel.location}</p>
          <p><strong>Review Mark:</strong> {hotel.review_mark}</p>
          <p><strong>Comments Count:</strong> {hotel.comments_count}</p>
          <div className="amenities">
            {hotel.amenities.map((amenity, index) => (
              <span key={index}>{amenity}</span>
            ))}
          </div>
          <p><strong>Average Price:</strong> ${hotel.average_price}</p>
          {handleAdd && (
            <div className="button-container">
              <Button buttonStyle={ButtonType.Primary} message={"Add"} handleAction={handleAdd} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default HotelDetails;