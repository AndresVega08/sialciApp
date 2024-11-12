import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeToken = async (token : any) => {
  try {
    await AsyncStorage.setItem('token', token);
  } catch (error) {
    console.error('Error guardando el token:', error);
  }
};

export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    return token;
  } catch (error) {
    console.error('Error obteniendo el token:', error);
  }
};
