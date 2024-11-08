import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, BackHandler } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types'; 
import { useUserContext } from '../context/UserContext'; 

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'HomeScreen'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { userName, userRole } = useUserContext(); 

  const handleLogout = async () => {
    try {
      Alert.alert('Éxito', 'Sesión cerrada');
      navigation.navigate('Login'); 
    } catch (err) {
      console.error('Error cerrando sesión:', err);
      Alert.alert('Error', 'Hubo un problema cerrando sesión');
    }
  };


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
      return true; 
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove(); 
  }, []);

  return (
    <View style={styles.container}>

      <Text style={styles.welcomeText}>Bienvenido {userName}</Text>

      <View style={styles.row}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('Productos')} 
        >
          <MaterialIcons name="shopping-bag" size={35} color="#fff" />
          <Text style={styles.menuText}>Productos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('EnvioForm')} 
        >
          <MaterialIcons name="add-shopping-cart" size={35} color="#fff" />
          <Text style={styles.menuText}>Hacer pedido</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('PedidosScreen')} 
        >
          <MaterialIcons name="list-alt" size={35} color="#fff" />
          <Text style={styles.menuText}>Pedidos</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('EditProfile')} 
        >
          <MaterialIcons name="edit" size={35} color="#fff" />
          <Text style={styles.menuText}>Editar información personal</Text>
        </TouchableOpacity>
      </View>

      {userRole === '1' && ( 
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.adminButton}
            onPress={() => navigation.navigate('EditOrders')}
          >
            <MaterialIcons name="edit" size={35} color="#fff" />
            <Text style={styles.adminText}>Editar pedidos</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.adminButton}
            onPress={() => navigation.navigate('EditUsers')}
          >
            <MaterialIcons name="group" size={35} color="#fff" />
            <Text style={styles.adminText}>Editar usuarios</Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout} 
      >
        <MaterialIcons name="logout" size={35} color="#fff" />
        <Text style={styles.logoutText}>Cerrar sesión</Text>
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
    backgroundColor: '#e9ecef', 
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#343a40',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 25,
  },
  menuItem: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#007bff', 
    paddingVertical: 20,
    borderRadius: 15,
    marginHorizontal: 10,
    elevation: 5, 
  },
  menuText: {
    fontSize: 20,
    marginTop: 8,
    textAlign: 'center',
    color: '#fff',
  },
  adminButton: {
    alignItems: 'center',
    backgroundColor: '#28a745', 
    paddingVertical: 20,
    flex: 1,
    borderRadius: 15,
    marginHorizontal: 10,
    elevation: 5, 
  },
  adminText: {
    fontSize: 20,
    marginTop: 8,
    textAlign: 'center',
    color: '#fff',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#dc3545', 
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 30,
    elevation: 5, 
  },
  logoutText: {
    fontSize: 20,
    marginLeft: 10,
    color: '#fff',
  },
});

export default HomeScreen;
