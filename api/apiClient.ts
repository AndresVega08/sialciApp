import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_HOST, 
  withCredentials: true, 
});

export default apiClient;
