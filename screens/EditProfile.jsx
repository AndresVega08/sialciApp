import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, ActivityIndicator } from 'react-native';
import { useUserContext } from '../context/UserContext';

const EditProfile = ({ navigation }) => {
  const { userEmail, userId } = useUserContext(); 
  const [loading, setLoading] = useState(true);
  const [nombreUsua, setNombreUsua] = useState('');
  const [apellidosUsua, setApellidosUsua] = useState('');
  const [correoUsua, setCorreoUsua] = useState(userEmail || '');


  const fetchUserData = async () => {
    setLoading(true);
    console.log('ID del usuario que inició sesión:', userId); 
    try {
      const response = await fetch(`http://192.168.1.2:8080/api/usuarios/${userId}`); 
      if (!response.ok) {
        throw new Error('Error al cargar los datos del usuario');
      }
      const userData = await response.json();
      setNombreUsua(userData.nombreUsua);
      setApellidosUsua(userData.apellidosUsua);
    } catch (error) {
      console.error('Error al obtener datos del usuario:', error);
      Alert.alert('Error', 'No se pudo cargar los datos del usuario');
    } finally {
      setLoading(false);
    }
  };

  // Función para actualizar los datos del usuario
  const handleUpdateUser = async () => {
    if (!nombreUsua || !apellidosUsua) {
      Alert.alert('Error', 'Por favor, complete todos los campos.');
      return;
    }

    const dataToSend = {
      nombreUsua,
      apellidosUsua,
      correoUsua,
    };

    try {
      const response = await fetch(`http://192.168.1.2:8080/api/usuarios/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar el usuario');
      }

      Alert.alert('Éxito', 'Usuario actualizado correctamente');
      navigation.goBack(); // Volver a la pantalla anterior después de actualizar
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      Alert.alert('Error', 'No se pudo actualizar el usuario');
    }
  };

  // Efecto para cargar los datos al iniciar
  useEffect(() => {
    fetchUserData(); // Llamar a la función para cargar los datos del usuario
  }, []);

  // Mostrar un indicador de carga mientras se obtienen los datos
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Editar Usuario</Text>

        <Text style={styles.label}>ID del Usuario:</Text>
        <Text style={styles.data}>{userId}</Text>

        <Text style={styles.label}>Correo:</Text>
        <Text style={styles.data}>{correoUsua}</Text>

        <Text style={styles.label}>Nombre:</Text>
        <TextInput
          style={styles.input}
          value={nombreUsua}
          onChangeText={setNombreUsua}
        />

        <Text style={styles.label}>Apellidos:</Text>
        <TextInput
          style={styles.input}
          value={apellidosUsua}
          onChangeText={setApellidosUsua}
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleUpdateUser}>
          <Text style={styles.saveButtonText}>Guardar Cambios</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.reloadButton} onPress={fetchUserData}>
          <Text style={styles.reloadButtonText}>Recargar Datos</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f4f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#007bff',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: '#495057',
  },
  data: {
    fontSize: 16,
    marginBottom: 10,
    color: '#212529',
    padding: 10,
    backgroundColor: '#e9ecef',
    borderRadius: 5,
  },
  input: {
    height: 45,
    borderColor: '#ced4da',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 3,
  },
  saveButton: {
    backgroundColor: '#28a745',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  saveButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  reloadButton: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  reloadButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f4f8',
  },
});

export default EditProfile;
