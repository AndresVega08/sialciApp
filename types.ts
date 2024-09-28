export type RootStackParamList = {
    Login: undefined;    // Pantalla de inicio de sesión
    Register: undefined; // Pantalla de registro
    HomeScreen: undefined;     // Pantalla principal
    EnvioForm: undefined;  // Pantalla de detalles con un parámetro
    Productos: undefined; // Pantalla de productos
  };
  
  // Define la estructura del objeto Usuario
  export interface User {
    id: number;
    nombre_Usua: string;
    apellidos_Usua: string;
    correo_Usua: string;
    rol: string;
  }
  
  // Define la respuesta que recibes al hacer login
  export interface AuthResponse {
    access_token: string;
    token_type: string;
  }
  
  // Define la estructura de los posibles errores que devuelve la API
  export interface ErrorResponse {
    error: string;
  }
  
  // Define la estructura del formulario de inicio de sesión
  export interface LoginForm {
    correo_Usua: string;
    password_Usua: string;
  }
  
  // Define la estructura del formulario de registro
  export interface RegisterForm {
    correo_Usua: string;
    password_Usua: string;
    nombre_Usua: string;
    apellidos_Usua: string;
    correo_Admi?: string;     // Opcional
    password_Admi?: string;   // Opcional
    rol: string;
  }
  