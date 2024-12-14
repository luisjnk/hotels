import React from 'react';
import './App.css';
import Button, {ButtonType} from "./components/Button/Button";
import {useNavigate} from "react-router-dom";

function App() {
  const navigate = useNavigate();

  const handleSarchHotelToScrape = () => {
    navigate('/hotel-search');
  }
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Button message={"Search hotel to scrape"} handleAction={handleSarchHotelToScrape} buttonStyle={ButtonType.Primary} />
        <Button message={"List of Hotels"} handleAction={handleSarchHotelToScrape} buttonStyle={ButtonType.Secondary} />
      </header>
    </div>
  );
}

export default App;
