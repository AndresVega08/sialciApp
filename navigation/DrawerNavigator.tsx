import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import RegisterScreen from '../screens/RegisterScreen';
import EditUsers from '../screens/EditUsers';
import Productos from '../screens/Productos';
import PedidosScreen from '../screens/PedidosScreen';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="HomeScreen">
      <Drawer.Screen name="HomeScreen" component={HomeScreen} />
      <Drawer.Screen name="Register" component={RegisterScreen} />
      <Drawer.Screen name="Edit Users" component={EditUsers} />
      <Drawer.Screen name="Productos" component={Productos} />
      <Drawer.Screen name="Pedidos" component={PedidosScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
