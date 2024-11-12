import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Button, FlatList, Image, StyleSheet, RefreshControl, TouchableOpacity } from 'react-native';
import { useUserContext } from '../context/UserContext';
import apiClient from '../api/apiClient';

const Productos = ({ navigation }) => {
  const { userRole } = useUserContext();
  const [productos, setProductos] = useState([]);
  const [refreshing, setRefreshing] = useState(false);


  const fetchProductos = async () => {
    try {
      const response = await apiClient.get('/productos');
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

  const handleEliminarProducto = async (id) => {
    try {
      const response = await apiClient.delete(`/productos/${id}`);
      if (response.status === 200) {
        setProductos((prevProductos) => prevProductos.filter((producto) => producto.id !== id));
      } else {
        console.error('Error eliminando producto:', response.data);
      }
    } catch (err) {
      console.error('Error eliminando producto:', err);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchProductos().then(() => setRefreshing(false));
  }, []);

  const renderProduct = ({ item }) => (
    <View style={styles.productContainer}>
      <Image
        source={{ uri: `data:image/jpeg;base64,${item.imagen}` }}
        style={styles.productImage}
      />
      <View style={styles.productDetails}>
        <Text style={styles.productName}>{item.nombre}</Text>
        <Text style={styles.productDescription}>{item.descripcion}</Text>
        <Text style={styles.productPrice}>${item.precio}</Text>
      </View>
      {userRole === '1' && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigation.navigate('EditarProducto', { id: item.id })}
          >
            <Text style={styles.buttonText}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleEliminarProducto(item.id)}
          >
            <Text style={styles.buttonText}>Eliminar</Text>
          </TouchableOpacity>
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
        <TouchableOpacity style={styles.addButton} onPress={handleAgregarProducto}>
          <Text style={styles.addButtonText}>Agregar Producto</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f3f4f6',
  },
  productContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  productImage: {
    width: '100%',
    height: 180,
    borderRadius: 8,
    marginBottom: 15,
  },
  productDetails: {
    marginBottom: 12,
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 6,
  },
  productDescription: {
    fontSize: 15,
    color: '#777777',
    marginBottom: 6,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: '600',
    color: '#007bff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  editButton: {
    flex: 1,
    backgroundColor: '#007bff',
    paddingVertical: 10,
    marginRight: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  deleteButton: {
    flex: 1,
    backgroundColor: '#dc3545',
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#28a745',
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginVertical: 10,
  },
  addButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default Productos;
