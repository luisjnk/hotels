import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import HotelSearchPage from '../pages/HotelSearchPage/HotelSearchPage';
import { fetchHotelsByScrape } from '../services/apiService';
import Hotel from '../types/Hotel';

jest.mock('../services/apiService');

describe('HotelSearchPage', () => {
  const mockFetchHotels = fetchHotelsByScrape as jest.MockedFunction<typeof fetchHotelsByScrape>;


  test('search functionality works correctly', async () => {
    const hotel: Hotel =
      {
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

    mockFetchHotels.mockResolvedValueOnce(hotel);

    render(
      <BrowserRouter>
        <HotelSearchPage />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/Enter the hotel that needs to be scraped/i), {
      target: { value: 'Hotel One' },

    });

    await waitFor(() => {
      expect(screen.getByText(/Hotel One/i)).toBeInTheDocument();
    });
  });
});