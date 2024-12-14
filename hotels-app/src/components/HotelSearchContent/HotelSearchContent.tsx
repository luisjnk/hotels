import React from 'react';
import Hotel from '../../types/Hotel';
import NoData from "./NoData/NoData";
import Button, {ButtonType} from "../Button/Button";

interface HotelSearchContentProps {
  hotel: Hotel;
  handleAdd?: () => void;
}

const HotelSearchContent: React.FC<HotelSearchContentProps> = ({ hotel, handleAdd }) => {
  const isEmptyHotel = !hotel.name && !hotel.description && !hotel.location;

  return (
    <div className="hotel-search-content">
      {isEmptyHotel ? (
        <NoData/>
      ) : (
        <>
          <h2>{hotel.name}</h2>
          {hotel.image_srcs.map((src, index) => (
            <img key={index} src={src} alt={`Hotel image ${index + 1}`}/>
          ))}
          <p><strong>Description:</strong> {hotel.description}</p>
          <p><strong>Location:</strong> {hotel.location}</p>
          <p><strong>Review Mark:</strong> {hotel.review_mark}</p>
          <p><strong>Comments Count:</strong> {hotel.comments_count}</p>
          <p><strong>Amenities:</strong> {hotel.amenities.join(', ')}</p>
          <p><strong>Average Price:</strong> ${hotel.average_price}</p>
          {handleAdd && (
            <Button buttonStyle={ButtonType.Primary} message={"ADD"} handleAction={handleAdd} />
          )}
        </>
      )}
    </div>
  );
};

export default HotelSearchContent;