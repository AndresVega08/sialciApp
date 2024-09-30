import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, Button, TextInput, Alert } from 'react-native';
import axios from 'axios';

const Productos = ({ isAdmin }) => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', image: '' });
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://192.168.1.2:8080/api/productos');
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };
    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://192.168.1.2:8080/api/productos/${id}`);
      setProducts(products.filter(product => product.id !== id));
    } catch (error) {
      console.error("Error deleting product", error);
    }
  };

  const handleAddOrUpdateProduct = async () => {
    if (editingProduct) {
      // Update product
      try {
        await axios.put(`http://192.168.1.2:8080/api/productos/${editingProduct.id}`, newProduct);
        setProducts(products.map(product => product.id === editingProduct.id ? { ...product, ...newProduct } : product));
        setEditingProduct(null);
      } catch (error) {
        console.error("Error updating product", error);
      }
    } else {
      // Add new product
      try {
        const response = await axios.post('http://192.168.1.2:8080/api/productos', newProduct);
        setProducts([...products, response.data]);
      } catch (error) {
        console.error("Error adding product", error);
      }
    }
    setNewProduct({ name: '', price: '', image: '' }); // Reset form
  };

  return (
    <View style={styles.container}>
      {products.length === 0 ? (
        <Text>No hay productos</Text> 
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.productItem}>
              <Image source={{ uri: item.image }} style={styles.productImage} />
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productPrice}>${item.price}</Text>
                {isAdmin && (
                  <>
                    <Button title="Edit" onPress={() => { setEditingProduct(item); setNewProduct({ name: item.name, price: item.price, image: item.image }); }} />
                    <Button title="Delete" onPress={() => deleteProduct(item.id)} />
                  </>
                )}
              </View>
            </View>
          )}
        />
      )}
      {isAdmin && (
        <View style={styles.formContainer}>
          <TextInput placeholder="Nombre" value={newProduct.name} onChangeText={text => setNewProduct({ ...newProduct, name: text })} />
          <TextInput placeholder="Precio" value={newProduct.price} onChangeText={text => setNewProduct({ ...newProduct, price: text })} />
          <TextInput placeholder="Imagen URL" value={newProduct.image} onChangeText={text => setNewProduct({ ...newProduct, image: text })} />
          <Button title={editingProduct ? "Update Product" : "Add Product"} onPress={handleAddOrUpdateProduct} />
          {editingProduct && <Button title="Cancel" onPress={() => setEditingProduct(null)} />}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  productItem: {
    flexDirection: 'row',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
  },
  productImage: {
    width: 100,
    height: 100,
    marginRight: 16,
  },
  productInfo: {
    justifyContent: 'center',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 16,
    color: '#888',
  },
  formContainer: {
    marginTop: 20,
  },
});

export default Productos;
