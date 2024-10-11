import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { useUserContext } from '../context/UserContext';
import axios from 'axios';

const Productos = ({ navigation }) => {
  const { userRole } = useUserContext(); 
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get('http://192.168.1.2:8080/api/productos');
        setProductos(response.data);
      } catch (err) {
        console.error('Error fetching productos:', err);
      }
    };

    fetchProductos();
  }, []);

  const renderProduct = ({ item }) => (
    <View style={{ marginBottom: 20 }}>
      <Text>Nombre: {item.nombre}</Text>
      <Text>Descripción: {item.descripcion}</Text>
      <Text>Precio: ${item.precio}</Text>
      {userRole === '1' && ( 
        <View style={{ flexDirection: 'row', marginTop: 10 }}>
          <Button title="Editar" onPress={() => navigation.navigate('EditarProducto', { id: item.id })} />
          <Button title="Eliminar" color="red" onPress={() => handleEliminarProducto(item.id)} />
        </View>
      )}
    </View>
  );

  const handleAgregarProducto = () => {
    navigation.navigate('AgregarProducto');
  };

  const handleEliminarProducto = async (id) => {
    try {
      await axios.delete(`http://192.168.1.2:8080/api/productos/${id}`);
      setProductos(productos.filter((producto) => producto.id !== id));
    } catch (err) {
      console.error('Error eliminando producto:', err);
    }
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <FlatList
        data={productos}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
      />
      {userRole === '1' && ( // Solo permitir agregar si es administrador
        <Button title="Agregar Producto" onPress={handleAgregarProducto} />
      )}
    </View>
  );
};

export default Productos;
