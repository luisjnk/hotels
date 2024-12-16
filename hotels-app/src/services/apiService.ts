import Hotel from "../types/Hotel";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const defaultHeaders = {
  'Content-Type': 'application/json',
};

// Helper function for handling fetch responses
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Something went wrong');
  }
  return response.json();
};

export const fetchHotelsByScrape = async (name: string): Promise<Hotel> => {
  try {
    const url = `${API_BASE_URL}/hotels/scrape?name=${encodeURIComponent(name)}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: defaultHeaders,
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Error fetching hotels by scrape:', error);
    throw error;
  }
};

export const fetchHotels = async (): Promise<Hotel[]> => {
  try {
    const url = `${API_BASE_URL}/hotels/`;
    const response = await fetch(url, {
      method: 'GET',
      headers: defaultHeaders,
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Error fetching hotels:', error);
    throw error;
  }
};

export const fetchHotelById = async (id: string): Promise<Hotel> => {
  try {
    const url = `${API_BASE_URL}/hotels/${id}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: defaultHeaders,
    });
    return await handleResponse(response);
  } catch (error) {
    console.error(`Error fetching hotel with id ${id}:`, error);
    throw error;
  }
};

export const postHotel = async (hotel: Hotel) => {
  try {
    const url = `${API_BASE_URL}/hotels/`;
    const response = await fetch(url, {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify(hotel),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Error posting hotel:', error);
    throw error;
  }
};
