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
import EditOrders from './screens/EditOrder';
import EditOrderScreen from './screens/EditOrderScreen';
import EditProfile from './screens/EditProfile';
import EditUsers from './screens/EditUsers';
import UserDetail from './screens/UserDetail';


const Stack = createStackNavigator();

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen 
            name="Login" 
            component={LoginScreen} 
            options={{ title: 'Login', headerShown: false }} 
          />
          <Stack.Screen 
            name="HomeScreen" 
            component={HomeScreen} 
            options={{ 
              title: 'Home', 
              headerLeft: () => null, 
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
            name="DetallePedidoScreen"
            component={DetallePedidoScreen}
            options={{ title: '' }}
          />
          <Stack.Screen
            name="EditarProducto"
            component={EditarProducto}
          />
          <Stack.Screen
            name="EditOrders"
            component={EditOrders}
            options={{ title: 'Editar Pedidos'}}
          />
          <Stack.Screen
            name="EditOrderScreen"
            component={EditOrderScreen}
            options={{ title: 'Editar Pedido'}}
          />
          <Stack.Screen
            name="EditProfile"
            component={EditProfile}
            options={{ title: ''}}
          />
          <Stack.Screen
            name="EditUsers"
            component={EditUsers}
            options={{ title: 'Editar Usuarios'}}
          />
          <Stack.Screen
            name="UserDetail"
            component={UserDetail}
            options={{ title: 'Detalles de Usuario'}}
          />

        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}
