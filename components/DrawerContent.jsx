import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const DrawerContent = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate('Productos')}
      >
        <MaterialIcons name="shopping-bag" size={30} color="#000" />
        <Text style={styles.menuText}>Productos</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate('EnvioForm')}
      >
        <MaterialIcons name="add-shopping-cart" size={30} color="#000" />
        <Text style={styles.menuText}>Hacer pedido</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate('Pedidos')}
      >
        <MaterialIcons name="list-alt" size={30} color="#000" />
        <Text style={styles.menuText}>Pedidos</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate('EditarPerfil')}
      >
        <MaterialIcons name="edit" size={30} color="#000" />
        <Text style={styles.menuText}>Editar información personal</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate('Login')} // Navegar a Login
      >
        <MaterialIcons name="exit-to-app" size={30} color="#000" />
        <Text style={styles.menuText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  menuText: {
    marginLeft: 10,
    fontSize: 18,
  },
});

export default DrawerContent;
