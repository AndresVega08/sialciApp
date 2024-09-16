import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', 
});

export const login = (username: string, password: string) => {
  return api.post('/login', { username, password });
};
