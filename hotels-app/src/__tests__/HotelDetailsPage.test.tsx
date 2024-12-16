import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import HotelDetailsPage from "../pages/HotelDetailsPage/HotelDetailsPage";
import {fetchHotelById, fetchHotels} from "../services/apiService";
import Hotel from "../types/Hotel";

jest.mock('../services/apiService');

// Mock the useParams hook to return { id: '1' }
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ id: '1' }),
}));

describe('HotelDetailsPage', () => {
  const mockFetchHotels = fetchHotelById as jest.MockedFunction<typeof fetchHotelById>;

  test('renders HotelDetailsPage component', async () => {
    const hotels: Hotel = {
        id: '1',
        name: 'Hotel One',
        location: 'Location One',
        description: 'Description One',
        review_mark: '9.0',
        comments_count: "100",
        average_price: 200,
        image_srcs: ['image1.jpg'],
        amenities: ['Amenity One', 'Amenity Two'],
      };

    mockFetchHotels.mockResolvedValueOnce(hotels);

    render(
      <BrowserRouter   future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
      >
        <HotelDetailsPage />
      </BrowserRouter>
    );

    // Check for the presence of key elements
    await waitFor(() => {
      expect(screen.getByText(/Hotel One/i)).toBeInTheDocument();
    });
  });
  // Add more tests as needed to cover other functionalities
});