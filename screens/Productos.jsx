import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';

const products = [
  {
    id: '1',
    name: 'Café colombiano',
    price: '$10',
    image: require('../assets/cafe.jpeg'),
  },
  {
    id: '2',
    name: 'Bolsos artesanales',
    price: '$15',
    image: require('../assets/bolsos.jpg'),
  },
  {
    id: '3',
    name: 'Dulces típicos',
    price: '$20',
    image: require('../assets/dulces.jpg'),
  },
];

const Productos = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.productItem}>
            <Image source={item.image} style={styles.productImage} />
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productPrice}>{item.price}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

Productos.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.string,
  image: PropTypes.any,
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
});

export default Productos;
