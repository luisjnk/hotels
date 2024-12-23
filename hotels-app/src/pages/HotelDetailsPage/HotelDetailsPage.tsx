import React, { useEffect, useState } from 'react';
import { useParams} from 'react-router-dom';
import { fetchHotelById } from '../../services/apiService';
import Hotel from '../../types/Hotel';
import Loading from '../../components/Loading/Loading';
import StatusMessage, { StatusTypes } from '../../components/StatusMessage/StatusMessage';
import './HotelDetailsPage.css';
import HotelDetails from "../../components/HotelDetails/HotelDetails";
import NavBar from "../../components/NavBar/NavBar";

const HotelDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    <>
      <header className="hotel-search-header">
        <NavBar/>
      </header>
      <div className="hotel-details-page">
        <HotelDetails hotel={hotel}/>
      </div>
    </>

  );
};

export default HotelDetailsPage;