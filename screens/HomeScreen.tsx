import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types'; 
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'HomeScreen'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
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
        <TouchableOpacity style={styles.menuItem}>
          <MaterialIcons name="list-alt" size={30} color="#000" />
          <Text style={styles.menuText}>Pedidos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <MaterialIcons name="edit" size={30} color="#000" />
          <Text style={styles.menuText}>Editar información personal</Text>
        </TouchableOpacity>
      </View>
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
  },
});

export default HomeScreen;
