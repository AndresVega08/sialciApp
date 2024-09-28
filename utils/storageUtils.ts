import AsyncStorage from '@react-native-async-storage/async-storage';

// Constantes para las claves de almacenamiento
const AUTH_TOKEN_KEY = 'authToken';

// Guardar el token en AsyncStorage
export const storeToken = async (token: string) => {
  try {
    await AsyncStorage.setItem('auth_token', token);
  } catch (e) {
    console.error('Error al almacenar el token', e);
  }
};

// Obtener el token desde AsyncStorage
export const getToken = async (): Promise<string | null> => {
  try {
    const token = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
    return token;
  } catch (error) {
    console.error('Error obteniendo el token:', error);
    throw new Error('Error obteniendo el token');
  }
};

// Eliminar el token de AsyncStorage
export const removeToken = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
  } catch (error) {
    console.error('Error eliminando el token:', error);
    throw new Error('Error eliminando el token');
  }
};
