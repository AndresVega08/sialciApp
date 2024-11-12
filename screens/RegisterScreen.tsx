import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import apiClient from '../api/apiClient';

const RegisterScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); 
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [showPassword, setShowPassword] = useState(false); 
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); 

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Por favor, ingrese un correo electrónico válido');
      return;
    }

    const passwordRegex = /^(?=.*[A-Z]).{8,}$/;
    if (!passwordRegex.test(password)) {
      Alert.alert('Error', 'La contraseña debe tener al menos 8 caracteres y una letra mayúscula');
      return;
    }

    try {
      const response = await apiClient.post('/usuarios', { 
        correoUsua: email,
        passwordUsua: password,
        nombreUsua: name,
        apellidosUsua: surname,
      });

      if (response.status === 201) {
        Alert.alert('Éxito', 'Usuario registrado exitosamente');
        navigation.navigate('Login'); 
      }
    } catch (error: any) {
      if (error.response) {
        Alert.alert('Error', error.response.data.message || 'Error en el registro');
      } else if (error.request) {
        Alert.alert('Error', 'No se recibió respuesta del servidor');
      } else {
        Alert.alert('Error', 'Error en la configuración de la solicitud');
      }
      console.error('Error en el registro:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Registro</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Contraseña"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
          <Icon name={showPassword ? 'eye' : 'eye-slash'} size={20} color="#495057" />
        </TouchableOpacity>
      </View>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Repetir contraseña"
          secureTextEntry={!showConfirmPassword}
          value={confirmPassword} 
          onChangeText={setConfirmPassword} 
        />
        <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.eyeIcon}>
          <Icon name={showConfirmPassword ? 'eye' : 'eye-slash'} size={20} color="#495057" />
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Nombre completo"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Apellidos"
        value={surname}
        onChangeText={setSurname}
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    height: 48,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#333',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  passwordInput: {
    flex: 1,
    height: 48,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  eyeIcon: {
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default RegisterScreen;
