import axiosInstance from './axiosInstance';
import Hotel from "../types/Hotel";

export const fetchHotelsByScrape = async (name: string) => {
  try {
    const response = await axiosInstance.get('/hotels/scrape', {
      params: { name },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching hotels by scrape:', error);
    throw error;
  }
};

export const fetchHotels = async () => {
  try {
    const response = await axiosInstance.get('/hotels');
    return response.data;
  } catch (error) {
    console.error('Error fetching hotels:', error);
    throw error;
  }
};

export const searchHotelsByName = async (name: string) => {
  try {
    const response = await axiosInstance.get(`/hotels/search`, {
      params: { name },
    });
    return response.data;
  } catch (error) {
    console.error('Error searching hotels:', error);
    throw error;
  }
};

export const postHotel = async (hotel: Hotel) => {
  try {
    const response = await axiosInstance.post('/hotels/', hotel);
    return response.data;
  } catch (error) {
    console.error('Error posting hotel:', error);
    throw error;
  }
};