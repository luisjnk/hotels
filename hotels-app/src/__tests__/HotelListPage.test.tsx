import React from 'react';
import {render, waitFor, screen} from '@testing-library/react';
import HotelListPage from '../pages/HotelListPage/HotelListPage';
import {fetchHotels} from '../services/apiService';
import {BrowserRouter} from 'react-router-dom';
import Hotel from '../types/Hotel';

jest.mock('../services/apiService');

describe('HotelListPage', () => {
  const mockFetchHotels = fetchHotels as jest.MockedFunction<typeof fetchHotels>;

  test('displays a list of hotels', async () => {
    const hotels: Hotel[] = [
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
      },
      {
        id: '2',
        name: 'Hotel Two',
        location: 'Location Two',
        description: 'Description Two',
        review_mark: '8.5',
        comments_count: "50",
        average_price: 150,
        image_srcs: ['image2.jpg'],
        amenities: ['Amenity One', 'Amenity Two'],
      },
    ];

    mockFetchHotels.mockResolvedValueOnce(hotels);

    render(
      <BrowserRouter future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
      >
        <HotelListPage/>
      </BrowserRouter>
    );

    await waitFor(() => {
      hotels.forEach(hotel => {
        expect(screen.getByText(hotel.name)).toBeInTheDocument();
      });
    });
  });

  test('displays a message when no hotels are available', async () => {
    mockFetchHotels.mockResolvedValueOnce([]);

    render(
      <BrowserRouter future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
      >
        <HotelListPage/>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Your saved hotels will appear here but first you must scrape')).toBeInTheDocument();
    });
  });

  test('displays an error message when fetching hotels fails', async () => {
    mockFetchHotels.mockRejectedValueOnce(new Error('Error fetching hotels'));

    render(
      <BrowserRouter future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
      >
        <HotelListPage/>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Error fetching hotels')).toBeInTheDocument();
    });
  });
});
