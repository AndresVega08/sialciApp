import apiClient from './apiClient'; 

//Funcion para iniciar sesion
export const login = async (correoUsua: string, passwordUsua: string) => {
  try {
    const response = await apiClient.post('/login', {
      correoUsua,
      passwordUsua
    });
    return response; 
  } catch (error) {
    throw error; 
  }
};

// Función para cerrar sesión
export const logout = async () => {
  try {
    const response = await apiClient.post('/logout'); 
    return response; 
  } catch (error) {
    throw error; 
  }
};