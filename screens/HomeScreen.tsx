import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types'; 

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'HomeScreen'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  
  const handleLogout = async () => {
    try {
      // Lógica para cerrar sesión
      Alert.alert('Éxito', 'Sesión cerrada');
      navigation.navigate('Login'); // Navegar a la pantalla de inicio de sesión
    } catch (err) {
      console.error('Error cerrando sesión:', err);
      Alert.alert('Error', 'Hubo un problema cerrando sesión');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
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
      </View>

      <View style={styles.row}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('PedidosScreen')} 
        >
          <MaterialIcons name="list-alt" size={30} color="#000" />
          <Text style={styles.menuText}>Pedidos</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.menuItem}
          //onPress={() => navigation.navigate('EditProfile')} 
        >
          <MaterialIcons name="edit" size={30} color="#000" />
          <Text style={styles.menuText}>Editar información personal</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.menuItem}
        onPress={handleLogout} 
      >
        <MaterialIcons name="logout" size={30} color="#000" />
        <Text style={styles.menuText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  menuItem: {
    alignItems: 'center',
    flex: 1,
  },
  menuText: {
    fontSize: 18,
    marginTop: 8,
    textAlign: 'center',
  },
});

export default HomeScreen;
