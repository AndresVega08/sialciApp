import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { login } from '../api/api';
import { storeToken } from '../utils/storageUtils'; 
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

type RootStackParamList = {
  Login: undefined;
  HomeScreen: undefined;
};

// Propiedades de navegación para el tipo LoginScreen
type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

// Props del componente
type Props = {
  navigation: LoginScreenNavigationProp;
};

const LoginScreen = ({ navigation }: Props) => {
  const [correoUsua, setCorreoUsua] = useState('');
  const [passwordUsua, setPasswordUsua] = useState('');

  const handleLogin = async () => {
    try {
      const response = await login(correoUsua, passwordUsua);
      console.log('Login response:', response); // Verifica la respuesta
      const token = response.data.access_token;
  
      if (token) {
        // Almacenar el token
        await storeToken(token);
  
        // Redirigir al HomeScreen después de un login exitoso
        navigation.navigate('HomeScreen');
      } else {
        Alert.alert('Error', 'Token de acceso no recibido');
      }
    } catch (err: any) {
      console.error('Error en el login:', err); // Más detalles de error en consola
      if (err.response) {
        // El servidor respondió con un error
        Alert.alert('Error', err.response.data.error || 'Credenciales incorrectas');
      } else if (err.request) {
        // No se recibió respuesta del servidor
        Alert.alert('Error', 'No se recibió respuesta del servidor');
      } else {
        // Otro tipo de error
        Alert.alert('Error', 'Ocurrió un error inesperado');
      }
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo"
        value={correoUsua}
        onChangeText={setCorreoUsua}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={passwordUsua}
        onChangeText={setPasswordUsua}
      />
      <Button
        title="Login"
        onPress={() => navigation.navigate('HomeScreen')}
      />
      {/*}
      <Button 
        title="Login" 
        onPress={handleLogin} // Usamos handleLogin aquí 
      />*/}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  header: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default LoginScreen;
