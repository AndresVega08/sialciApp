import axios from 'axios';

const API_URL = 'http://192.168.1.2:8080/api/login'; // URL de tu backend

export const login = async (correoUsua: string, passwordUsua: string) => {
  try {
    const response = await axios.post(API_URL, {
      correoUsua,
      passwordUsua
    });
    return response;
  } catch (error) {
    throw error;
  }
};
