import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL, // Use the environment variable for the base URLs
  timeout: 10000, // Optional: set a timeout for requests
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;