import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, BackHandler } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types'; 
import { useUserContext } from '../context/UserContext'; // Para obtener el nombre del usuario

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'HomeScreen'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { userName } = useUserContext(); // Obtenemos el nombre del usuario

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

  // Lógica para confirmar si el usuario quiere salir de la aplicación
  useEffect(() => {
    const backAction = () => {
      Alert.alert('Confirmar salida', '¿Estás seguro de que deseas salir de la aplicación?', [
        {
          text: 'Cancelar',
          onPress: () => null,
          style: 'cancel',
        },
        { text: 'Salir', onPress: () => BackHandler.exitApp() },
      ]);
      return true; // Para evitar que la acción de retroceso predeterminada se ejecute
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove(); // Limpieza del listener al desmontar el componente
  }, []);

  return (
    <View style={styles.container}>
      {/* Mensaje de bienvenida */}
      <Text style={styles.welcomeText}>Bienvenido {userName}</Text>

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
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
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
