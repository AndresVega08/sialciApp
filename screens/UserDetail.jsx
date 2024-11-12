import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import apiClient from '../api/apiClient';

const UserDetail = ({ route, navigation }) => {
  const { user } = route.params; 
  const [loading, setLoading] = useState(false);
  const [nombreUsua, setNombreUsua] = useState(user.nombreUsua);
  const [apellidosUsua, setApellidosUsua] = useState(user.apellidosUsua);
  const [correoUsua, setCorreoUsua] = useState(user.correoUsua);
  const [passwordUsua, setPasswordUsua] = useState(user.passwordUsua);
  const [rol, setRol] = useState(user.rol);
  const [showPassword, setShowPassword] = useState(false); 

  const handleUpdateUser = async () => {
    if (!nombreUsua || !apellidosUsua || !correoUsua || !passwordUsua) {
      Alert.alert('Error', 'Por favor, complete todos los campos.');
      return;
    }

    const dataToSend = {
      nombreUsua,
      apellidosUsua,
      correoUsua,
      passwordUsua,
      rol,
    };

    setLoading(true);
    try {
      await apiClient.put(`/usuarios/${user.id}`,dataToSend);
      Alert.alert('Éxito', 'Usuario actualizado correctamente');
      navigation.goBack();
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      Alert.alert('Error', 'No se pudo actualizar el usuario');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Usuario</Text>
      <Text style={styles.label}>ID del Usuario:</Text>
      <Text style={styles.data}>{user.id}</Text>

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

      <Text style={styles.label}>Correo:</Text>
      <TextInput
        style={styles.input}
        value={correoUsua}
        onChangeText={setCorreoUsua}
      />

      <Text style={styles.label}>Contraseña:</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          value={passwordUsua}
          onChangeText={setPasswordUsua}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeButton}>
          <Icon name={showPassword ? 'eye' : 'eye-slash'} size={20} color="#495057" />
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Rol:</Text>
      <TextInput
        style={styles.input}
        value={rol}
        onChangeText={setRol} 
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleUpdateUser}>
        <Text style={styles.saveButtonText}>Guardar Cambios</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderColor: '#ced4da',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  passwordInput: {
    flex: 1,
    height: 45,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  eyeButton: {
    paddingHorizontal: 10, // Espaciado adicional a la izquierda
  },
  saveButton: {
    backgroundColor: '#28a745',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
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

export default UserDetail;
