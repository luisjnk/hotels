import React from 'react';
import './App.css';
import Button, {ButtonType} from "./components/Button/Button";
import {useNavigate} from "react-router-dom";

function App() {
  const navigate = useNavigate();

  const handleSearchHotelToScrape = () => {
    navigate('/hotel-search');
  }

  const handleSearchHotels = () => {
    navigate('/hotels');
  }
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Button message={"Search hotel to scrape"} handleAction={handleSearchHotelToScrape} buttonStyle={ButtonType.Primary} />
        <Button message={"List of Hotels"} handleAction={handleSearchHotels} buttonStyle={ButtonType.Secondary} />
      </header>
    </div>
  );
}

export default App;
