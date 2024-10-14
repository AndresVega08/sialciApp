import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Image, TouchableOpacity, Text } from 'react-native';
import axios from 'axios';
import { launchImageLibrary } from 'react-native-image-picker'; 

const AgregarProducto = ({ navigation }) => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [imagen, setImagen] = useState(null); 

  const handleAgregarProducto = async () => {
    // Validar que los campos no estén vacíos
    if (!nombre.trim() || !descripcion.trim() || !precio.trim() || !imagen) {
      Alert.alert('Error', 'Por favor, complete todos los campos.');
      return;
    }

    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('descripcion', descripcion);
    formData.append('precio', parseFloat(precio));
    formData.append('imagen', {
      uri: imagen.uri,
      type: imagen.type,
      name: imagen.fileName || 'image.jpg', // Establecer un nombre para la imagen
    });

    try {
      // Hacer una solicitud POST para agregar el producto
      const response = await axios.post('http://192.168.1.2:8080/api/productos', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Producto agregado:', response.data);
      Alert.alert('Éxito', 'Producto agregado exitosamente');
      navigation.goBack(); // Volver a la pantalla anterior
    } catch (err) {
      console.error('Error agregando producto:', err);
      Alert.alert('Error', 'Hubo un problema al agregar el producto');
    }
  };

  const selectImage = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('Usuario canceló la selección de imagen');
      } else if (response.error) {
        console.error('Error al seleccionar la imagen:', response.error);
      } else {
        setImagen(response.assets[0]); // Almacenar la imagen seleccionada
      }
    });
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

      {/* Botón personalizado para seleccionar la imagen */}
      <TouchableOpacity style={styles.button} onPress={selectImage}>
        <Text style={styles.buttonText}>Seleccionar Imagen</Text>
      </TouchableOpacity>

      {/* Contenedor para mostrar la imagen seleccionada */}
      {imagen && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: imagen.uri }} style={styles.imagePreview} />
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
    backgroundColor: '#007bff', // Color de fondo del botón
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: {
    color: '#ffffff', // Color del texto del botón
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
    height: 200, // Altura fija para la vista previa de la imagen
    resizeMode: 'cover', // Ajustar la imagen al contenedor
  },
});

export default AgregarProducto;
