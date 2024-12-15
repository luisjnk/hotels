import React, { useState } from 'react';
import NavBar from "../../components/NavBar/NavBar";
import { fetchHotelsByScrape, postHotel } from "../../services/apiService";
import StatusMessage, { StatusTypes } from "../../components/StatusMessage/StatusMessage";
import './HotelSearchPage.css';
import Hotel from "../../types/Hotel";
import Loading from "../../components/Loading/Loading";
import HotelSearchContent from "../../components/HotelSearchContent/HotelSearchContent";
import Button, { ButtonType } from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";

const emptyHotel: Hotel = {
  name: '',
  description: '',
  location: '',
  review_mark: '',
  comments_count: '',
  amenities: [],
  image_srcs: [],
  average_price: 0
};

function HotelSearchPage() {
  const [status, setStatus] = useState(StatusTypes.NoStatus);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [hotel, setHotel] = useState(emptyHotel);
  const navigate = useNavigate();

  const handleApiCall = async (apiCall: () => Promise<any>, successStatus: StatusTypes, successMessage: string, errorMessage: string) => {
    try {
      setIsLoading(true);
      const response = await apiCall();
      setIsLoading(false);
      setStatus(successStatus);
      setStatusMessage(successMessage);
      return response;
    } catch (error) {
      console.error(errorMessage, error);
      setStatus(StatusTypes.Error);
      setStatusMessage(errorMessage);
      setIsLoading(false);
      throw error;
    }
  };

  const handleSearchByName = async (name: string) => {
    const data: Hotel = await handleApiCall(
      () => fetchHotelsByScrape(name),
      StatusTypes.Success_Load,
      "Hotels fetched successfully",
      "Error fetching hotels by scrape"
    );
    setHotel(data);
    console.log("data", data);
  };

  const handleAddHotel = async () => {
    await handleApiCall(
      () => postHotel(hotel),
      StatusTypes.Success_Insert,
      "Hotel added successfully",
      "Error trying to add hotel"
    );
    setHotel(emptyHotel);
    console.log('Hotel posted successfully');
  };

  const handleReturn = () => {
    navigate('/');
  }

  return (
    <div className="hotel-search-page">
      <header className="hotel-search-header">
        <NavBar handleSearchByName={handleSearchByName} disabled={isLoading} />
      </header>
      <div className="hotel-search-page-content">
        {isLoading && <Loading />}
        {StatusTypes.NoStatus !== status && <StatusMessage message={statusMessage} statusType={status}/>}
        {!isLoading && status !== StatusTypes.Error && <HotelSearchContent hotel={hotel} handleAdd={handleAddHotel} />}
        <Button message={"Return"} handleAction={handleReturn} buttonStyle={ButtonType.Secondary} />
      </div>
    </div>
  );
}

export default HotelSearchPage;