import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import HotelDetailsPage from "../pages/HotelDetailsPage/HotelDetailsPage";
import {fetchHotelById} from "../services/apiService";

jest.mock('../services/apiService', () => ({
  fetchHotelById: jest.fn(),
}));

// Mock the useParams hook to return { id: '1' }
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ id: '1' }),
}));

describe('HotelDetailsPage', () => {

  test('renders HotelDetailsPage component', async () => {
    // Mock the API response
    (fetchHotelById as jest.Mock).mockResolvedValue({
      name: 'Hotel Test',
      address: '123 Test St',
      contact: '123-456-7890',
    });

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
      expect(screen.getByText(/Hotel Test/i)).toBeInTheDocument();
    });
  });
  // Add more tests as needed to cover other functionalities
});