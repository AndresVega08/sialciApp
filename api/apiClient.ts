import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://192.168.1.2:8080/api', 
  withCredentials: true, 
});

export default apiClient;
