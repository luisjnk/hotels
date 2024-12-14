import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from '../App';
import HotelSearchPage from '../pages/HotelSearchPage/HotelSearchPage';
import HotelListPage from "../pages/HotelListPage/HotelListPage";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/hotel-search" element={<HotelSearchPage />} />
        <Route path="/hotels" element={<HotelListPage />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;