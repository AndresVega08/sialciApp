import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Button, FlatList, Image, StyleSheet, RefreshControl } from 'react-native';
import { useUserContext } from '../context/UserContext';
import axios from 'axios';

const Productos = ({ navigation }) => {
  const { userRole } = useUserContext();
  const [productos, setProductos] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  // Función para obtener productos desde la API
  const fetchProductos = async () => {
    try {
      const response = await axios.get('http://192.168.1.2:8080/api/productos');
      console.log('Productos:', response.data); 
      setProductos(response.data);
    } catch (err) {
      console.error('Error fetching productos:', err);
    }
  };

  useEffect(() => {
    fetchProductos(); 
  }, []);

  
  const handleAgregarProducto = () => {
    navigation.navigate('AgregarProducto', {
      onGoBack: () => {
        fetchProductos(); 
      },
    });
  };

  // Función para manejar la eliminación de productos
  const handleEliminarProducto = async (id) => {
    try {
      const response = await axios.delete(`http://192.168.1.2:8080/api/productos/${id}`);
      if (response.status === 200) {
        setProductos((prevProductos) => prevProductos.filter((producto) => producto.id !== id));
      } else {
        console.error('Error eliminando producto:', response.data);
      }
    } catch (err) {
      console.error('Error eliminando producto:', err);
    }
  };

  // Función para refrescar la lista de productos
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchProductos().then(() => setRefreshing(false));
  }, []);

  // Renderiza cada producto
  const renderProduct = ({ item }) => (
    <View style={styles.productContainer}>
      <Image
        source={{ uri: `data:image/jpeg;base64,${item.imagen}` }} 
        style={styles.productImage}
      />
      <View style={styles.productDetails}>
        <Text style={styles.productName}>Nombre: {item.nombre}</Text>
        <Text style={styles.productDescription}>Descripción: {item.descripcion}</Text>
        <Text style={styles.productPrice}>Precio: ${item.precio}</Text>
      </View>
      {userRole === '1' && (
        <View style={styles.buttonContainer}>
          <Button title="Editar" onPress={() => navigation.navigate('EditarProducto', { id: item.id })} />
          <Button title="Eliminar" color="red" onPress={() => handleEliminarProducto(item.id)} />
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={productos}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      {userRole === '1' && (
        <Button title="Agregar Producto" onPress={handleAgregarProducto} />
      )}
    </View>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  productContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 2,
  },
  productImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  productDetails: {
    marginBottom: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productDescription: {
    fontSize: 14,
    color: '#666',
  },
  productPrice: {
    fontSize: 16,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

export default Productos;
