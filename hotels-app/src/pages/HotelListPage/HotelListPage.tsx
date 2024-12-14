import React, { useEffect, useState } from 'react';
import { fetchHotels } from '../../services/apiService';
import Hotel from '../../types/Hotel';
import Loading from '../../components/Loading/Loading';
import './HotelListPage.css';
import StatusMessage, {StatusTypes} from "../../components/StatusMessage/StatusMessage";
import NavBar from "../../components/NavBar/NavBar";

const HotelListPage: React.FC = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      {hotels.map((hotel) => (
        <li key={hotel.id}>
        <img src={hotel.image_srcs[0]} alt={hotel.name} />
            <div className="hotel-info">
              <h2>{hotel.name}</h2>
              <p>{hotel.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default HotelListPage;