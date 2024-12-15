import React, { useEffect, useState } from 'react';
import { fetchHotels } from '../../services/apiService';
import Hotel from '../../types/Hotel';
import Loading from '../../components/Loading/Loading';
import './HotelListPage.css';
import StatusMessage, {StatusTypes} from "../../components/StatusMessage/StatusMessage";
import NavBar from "../../components/NavBar/NavBar";
import {Link, useNavigate} from "react-router-dom";
import Button, {ButtonType} from "../../components/Button/Button";
import HotelItem from "../../components/HotelItem/HotelItem";

const HotelListPage: React.FC = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadHotels = async () => {
      setIsLoading(true);
      try {
        const data = await fetchHotels();
        setHotels(data);
        setError(null);
      } catch (err) {
        setError('Error fetching hotels');
      } finally {
        setIsLoading(false);
      }
    };

    loadHotels();
  }, []);

  const handleReturn = () => {
    navigate('/');
  }

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <StatusMessage message={error} statusType={StatusTypes.Error} />;
  }

  return (
    <div>
      <header className="hotel-search-header">
        <NavBar />
      </header>
    <div className="hotel-list-page">
      <h1>Hotel List</h1>
      <ul>
        <ul>
          {hotels.map((hotel) => (
            <HotelItem key={hotel.id} hotel={hotel}/>
          ))}
        </ul>
      </ul>
      <Button message={"Return"} handleAction={handleReturn} buttonStyle={ButtonType.Secondary}/>

    </div>
    </div>
  );
};

export default HotelListPage;