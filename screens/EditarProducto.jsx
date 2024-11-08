import React, { useEffect, useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Alert, Image, Button, ActivityIndicator, Text } from 'react-native'; 
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { useUserContext } from '../context/UserContext';

const EditarProducto = ({ route, navigation }) => {
    const { id } = route.params;
    const [producto, setProducto] = useState({
        nombre: '',
        descripcion: '',
        precio: '',
        imagen: null,
    });
    const [loading, setLoading] = useState(false);
    const { userRole } = useUserContext();

    useEffect(() => {
        const fetchProducto = async () => {
            setLoading(true); // Indicar que se está cargando
            try {
                const response = await axios.get(`http://192.168.1.2:8080/api/productos/${id}`);
                console.log('Datos del producto:', response.data); 
                setProducto({
                    nombre: response.data.nombre,
                    descripcion: response.data.descripcion,
                    precio: response.data.precio.toString(), 
                    imagen: response.data.imagen ? `data:image/jpeg;base64,${response.data.imagen}` : null,
                });
            } catch (err) {
                console.error('Error fetching producto:', err);
                Alert.alert('Error', 'No se pudo cargar el producto');
            } finally {
                setLoading(false); // Indicar que la carga ha finalizado
            }
        };
    
        fetchProducto();
    }, [id]);
    

    const handleInputChange = (field, value) => {
        setProducto((prev) => ({ ...prev, [field]: value }));
    };

    const handleImagePicker = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setProducto((prev) => ({
                ...prev,
                imagen: result.assets[0].uri,
            }));
        }
    };

    const handleActualizarProducto = async () => {
        const { nombre, descripcion, precio, imagen } = producto;

        if (!nombre.trim() || !descripcion.trim() || !precio.trim()) {
            Alert.alert('Error', 'Por favor, complete todos los campos.');
            return;
        }

        const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('descripcion', descripcion);
        formData.append('precio', parseFloat(precio));

        if (imagen) {
            const localUri = imagen;
            const filename = localUri.split('/').pop();
            const type = `image/${filename.split('.').pop()}`;
            formData.append('imagen', {
                uri: localUri,
                name: filename,
                type,
            });
        }

        try {
            const response = await axios.put(`http://192.168.1.2:8080/api/productos/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Respuesta de la actualización:', response.data);
            if (response.status === 200) {
                Alert.alert('Éxito', 'Producto actualizado exitosamente');
                navigation.goBack();
            } else {
                Alert.alert('Error', 'No se pudo actualizar el producto');
            }
        } catch (err) {
            console.error('Error actualizando producto:', err);
            Alert.alert('Error', 'Hubo un problema al actualizar el producto');
        }
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Actualizar Producto</Text>
            </View>
            <TextInput
                style={styles.input}
                placeholder="Nombre"
                value={producto.nombre}
                onChangeText={(value) => handleInputChange('nombre', value)}
            />
            <TextInput
                style={styles.input}
                placeholder="Descripción"
                value={producto.descripcion}
                onChangeText={(value) => handleInputChange('descripcion', value)}
            />
            <TextInput
                style={styles.input}
                placeholder="Precio"
                value={producto.precio}
                onChangeText={(value) => handleInputChange('precio', value)}
                keyboardType="numeric"
            />
            {producto.imagen && (
                <Image source={{ uri: producto.imagen }} style={styles.image} />
            )}
            <Button title="Seleccionar Imagen" onPress={handleImagePicker} />
            <TouchableOpacity style={styles.button} onPress={handleActualizarProducto}>
                <View style={styles.buttonText}>
                    <Text style={styles.buttonTextInner}>Actualizar Producto</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f9f9f9',
    },
    header: {
        marginBottom: 20,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
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
        marginTop: 10,
    },
    buttonTextInner: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    image: {
        width: 100,
        height: 100,
        marginVertical: 10,
        borderRadius: 5,
    },
});

export default EditarProducto;
