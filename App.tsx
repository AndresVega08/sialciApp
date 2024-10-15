import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { UserProvider } from './context/UserContext'; 
import LoginScreen from './screens/Login';
import HomeScreen from './screens/HomeScreen';
import RegisterScreen from './screens/RegisterScreen';
import EnvioForm from './screens/EnvioForm'; 
import Productos from './screens/Productos';
import PedidosScreen from './screens/PedidosScreen';
import AgregarProducto from './screens/AgregarProducto';
import DetallePedidoScreen from './screens/DetallePedidoScreen'; 
import EditarProducto from './screens/EditarProducto';

const Stack = createStackNavigator();

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen 
            name="Login" 
            component={LoginScreen} 
            options={{ title: 'Login', headerShown: false }} // Ocultar el header en Login
          />
          <Stack.Screen 
            name="HomeScreen" 
            component={HomeScreen} 
            options={{ 
              title: 'Home', 
              headerLeft: () => null,  // Eliminar la flecha de retroceso
            }} 
          />
          <Stack.Screen 
            name="Register" 
            component={RegisterScreen} 
            options={{ title: 'Register' }} 
          />
          <Stack.Screen 
            name="EnvioForm" 
            component={EnvioForm} 
            options={{ title: 'Enviar Formulario' }} 
          />
          <Stack.Screen 
            name="Productos" 
            component={Productos} 
            options={{ title: 'Productos' }} 
          /> 
          <Stack.Screen 
            name="PedidosScreen" 
            component={PedidosScreen} 
            options={{ title: 'Pedidos' }} 
          /> 
          <Stack.Screen
            name="AgregarProducto"
            component={AgregarProducto}
            options={{ title: 'Agregar Producto' }}
          />
          <Stack.Screen
            name="DetallePedidoScreen" // Agregar la pantalla de detalles del pedido
            component={DetallePedidoScreen}
            options={{ title: 'Detalles del Pedido' }}
          />
          <Stack.Screen
            name="EditarProducto"
            component={EditarProducto}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}
