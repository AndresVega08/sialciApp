import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Image, TouchableOpacity, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import apiClient from '../api/apiClient';

const AgregarProducto = ({ navigation }) => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [imagen, setImagen] = useState(null);

  const requestPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso denegado', 'La aplicación necesita acceso a la galería para seleccionar imágenes.');
    }
  };

  useEffect(() => {
    requestPermission();
  }, []);

  const handleAgregarProducto = async () => {
    if (!nombre.trim() || !descripcion.trim() || !precio.trim() || !imagen) {
      Alert.alert('Error', 'Por favor, complete todos los campos.');
      return;
    }

    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('descripcion', descripcion);
    formData.append('precio', parseFloat(precio));
    formData.append('imagen', {
      uri: imagen,
      type: 'image/jpeg',
      name: 'image.jpg',
    });

    try {
      const response = await apiClient.post('/productos', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Producto agregado:', response.data);
      Alert.alert('Éxito', 'Producto agregado exitosamente');
      navigation.goBack();
    } catch (err) {
      console.error('Error agregando producto:', err.response);
      
    }
  };

  const selectImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImagen(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nombre del Producto"
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Descripción"
        value={descripcion}
        onChangeText={setDescripcion}
      />
      <TextInput
        style={styles.input}
        placeholder="Precio"
        value={precio}
        onChangeText={setPrecio}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button} onPress={selectImage}>
        <Text style={styles.buttonText}>Seleccionar Imagen</Text>
      </TouchableOpacity>

      {imagen && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: imagen }} style={styles.imagePreview} />
        </View>
      )}

      <Button title="Agregar Producto" onPress={handleAgregarProducto} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  imageContainer: {
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    overflow: 'hidden',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
});

export default AgregarProducto;
