import React, { useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import { fetchHotelById } from '../../services/apiService';
import Hotel from '../../types/Hotel';
import Loading from '../../components/Loading/Loading';
import StatusMessage, { StatusTypes } from '../../components/StatusMessage/StatusMessage';
import './HotelDetailsPage.css';
import HotelDetails from "../../components/HotelDetails/HotelDetails";
import NavBar from "../../components/NavBar/NavBar";
import Button, {ButtonType} from "../../components/Button/Button";

const HotelDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadHotel = async () => {
      setIsLoading(true);
      try {
        if(id) {
        const data = await fetchHotelById(id);
        setHotel(data);
        setError(null);
        } else {
          setError('Error no id provided');
        }
      } catch (err) {
        setError('Error fetching hotel details');
      } finally {
        setIsLoading(false);
      }
    };

    loadHotel();
  }, [id]);

  const handleReturn = () => {
    navigate('/');
  }

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <StatusMessage message={error} statusType={StatusTypes.Error} />;
  }

  if (!hotel) {
    return <StatusMessage message="Hotel not found" statusType={StatusTypes.Error} />;
  }

  return (
    <div className="hotel-details-page">
      <header className="hotel-search-header">
        <NavBar/>
      </header>
      <HotelDetails hotel={hotel}/>
      <Button message={"Return"} handleAction={handleReturn} buttonStyle={ButtonType.Secondary} />
    </div>
  );
};

export default HotelDetailsPage;