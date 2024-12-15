import React, { useEffect, useState } from 'react';
import { fetchHotels } from '../../services/apiService';
import Hotel from '../../types/Hotel';
import Loading from '../../components/Loading/Loading';
import './HotelListPage.css';
import StatusMessage, {StatusTypes} from "../../components/StatusMessage/StatusMessage";
import NavBar from "../../components/NavBar/NavBar";
import HotelItem from "../../components/HotelItem/HotelItem";
import NoHotels from "../../components/NoHotels/NoHotels";

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
      {hotels.length === 0 ? (
        <NoHotels />
      ) : (
        <ul>
          <ul>
            {hotels.map((hotel) => (
              <HotelItem key={hotel.id} hotel={hotel}/>
            ))}
          </ul>
        </ul>

      )}
    </div>
    </div>
  );
};

export default HotelListPage;