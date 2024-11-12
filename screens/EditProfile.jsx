import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, ActivityIndicator } from 'react-native';
import { useUserContext } from '../context/UserContext';
import Icon from 'react-native-vector-icons/FontAwesome'; // Asegúrate de tener esta librería instalada
import apiClient from '../api/apiClient';

const EditProfile = ({ navigation }) => {
  const { userEmail, userId } = useUserContext(); 
  const [loading, setLoading] = useState(true);
  const [nombreUsua, setNombreUsua] = useState('');
  const [apellidosUsua, setApellidosUsua] = useState('');
  const [correoUsua, setCorreoUsua] = useState(userEmail || '');
  const [passwordUsua, setPasswordUsua] = useState('');
  const [rol, setRol] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Estado para controlar la visibilidad de la contraseña

  const fetchUserData = async () => {
    setLoading(true);
    console.log('ID del usuario que inició sesión:', userId); 
    try {
      const response = await apiClient.get(`/usuarios/${userId}`); 
      const userData = response.data;
      setNombreUsua(userData.nombreUsua);
      setApellidosUsua(userData.apellidosUsua);
      setCorreoUsua(userData.correoUsua);
      setPasswordUsua(userData.passwordUsua); // Si necesitas mostrarlo
      setRol(userData.rol); // Si necesitas mostrarlo

    } catch (error) {
      console.error('Error al obtener datos del usuario:', error);
      Alert.alert('Error', 'No se pudo cargar los datos del usuario');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUser = async () => {
    if (!nombreUsua || !apellidosUsua || !correoUsua || !passwordUsua) {
      Alert.alert('Error', 'Por favor, complete todos los campos.');
      return;
    }

    const dataToSend = {
      nombreUsua,
      apellidosUsua,
      correoUsua,
      passwordUsua, // Asegúrate de enviar la contraseña si es necesaria
      rol,
    };

    try {
      await apiClient.put(`/usuarios/${userId}`, dataToSend);
      Alert.alert('Éxito', 'Usuario actualizado correctamente');
      navigation.goBack(); 
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      Alert.alert('Error', 'No se pudo actualizar el usuario');
    }
  };

  useEffect(() => {
    fetchUserData(); 
  }, []);

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

        <Text style={styles.label}>Contraseña:</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            value={passwordUsua}
            onChangeText={setPasswordUsua}
            secureTextEntry={!showPassword} // Cambia según el estado
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.iconButton}>
            <Icon name={showPassword ? 'eye' : 'eye-slash'} size={20} color="#495057" />
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Rol:</Text>
        <TextInput
          style={[styles.input, { backgroundColor: '#e9ecef' }]} // Cambia el fondo para indicar que está deshabilitado
          value={rol}
          editable={false} // Habilitar solo lectura
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
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderColor: '#ced4da',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#fff',
    height: 45,
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  iconButton: {
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
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
