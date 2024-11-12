import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, TextInput, RefreshControl } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useUserContext } from '../context/UserContext';
import apiClient from '../api/apiClient';

const EditOrders = ({ navigation }) => {
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const { userRole } = useUserContext();

  const fetchOrders = async () => {
    try {
      setRefreshing(true);
      const response = await apiClient.get('/pedidos');   
      const data = response.data;
      console.log('Pedidos obtenidos:', data);

      setOrders(data);
      setFilteredOrders(data);
    } catch (error) {
      console.error('Error al obtener pedidos:', error);
      Alert.alert('Error', 'No se pudo obtener la lista de pedidos');
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (userRole !== '1') {
      Alert.alert('Acceso denegado', 'No tienes permiso para acceder a esta página');
      navigation.goBack();
    } else {
      fetchOrders();
    }
  }, [userRole]);

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text === '') {
      setFilteredOrders(orders);
    } else {
      const filtered = orders.filter((order) =>
        order.idPedidos.toString().includes(text) || order.correoUsua.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredOrders(filtered);
    }
  };

  const handleEditOrder = (order) => {
    navigation.navigate('EditOrderScreen', { order }); 
  };

  const renderItem = ({ item }) => {
    if (!item.idPedidos) {
      return null;
    }

    return (
      <TouchableOpacity style={styles.orderItem} onPress={() => handleEditOrder(item)}>
        <View style={styles.orderInfo}>
          <Text style={styles.orderText}>Pedido ID: <Text style={styles.orderTextBold}>{item.idPedidos}</Text></Text>
          <Text style={styles.orderText}>Correo: <Text style={styles.orderTextBold}>{item.correoUsua}</Text></Text>
          <Text style={styles.orderText}>Nombre: <Text style={styles.orderTextBold}>{item.nombreEmpresaRemi}</Text></Text>
          <Text style={styles.orderText}>Fecha: <Text style={styles.orderTextBold}>{new Date(item.fecha).toLocaleString()}</Text></Text>
        </View>
        <MaterialIcons name="edit" size={30} color="#007bff" />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestión de Pedidos</Text>

      <TextInput
        style={styles.searchBar}
        placeholder="Buscar por ID de Pedido o Correo del Usuario"
        value={searchQuery}
        onChangeText={handleSearch}
        keyboardType="default"
      />

      <FlatList
        data={filteredOrders}
        renderItem={renderItem}
        keyExtractor={(item) => item.idPedidos ? item.idPedidos.toString() : Math.random().toString()}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text style={styles.emptyMessage}>No se encontraron pedidos.</Text>}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchOrders} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#007bff',
  },
  searchBar: {
    height: 40,
    borderColor: '#ced4da',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  list: {
    paddingBottom: 20,
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  orderInfo: {
    flex: 1,
    marginRight: 10,
  },
  orderText: {
    fontSize: 16,
    color: '#495057',
    marginBottom: 4,
  },
  orderTextBold: {
    fontWeight: 'bold',
    color: '#212529',
  },
  emptyMessage: {
    textAlign: 'center',
    fontSize: 18,
    color: '#6c757d',
  },
});

export default EditOrders;
