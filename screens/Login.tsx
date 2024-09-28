import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image } from 'react-native';
import { login } from '../api/api';
import { storeToken } from '../utils/storageUtils'; 
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

type RootStackParamList = {
  Login: undefined;
  Register: undefined; 
  HomeScreen: undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

const LoginScreen = ({ navigation }: Props) => {
  const [correoUsua, setCorreoUsua] = useState('');
  const [passwordUsua, setPasswordUsua] = useState('');

  const handleLogin = async () => {
    try {
      const response = await login(correoUsua, passwordUsua);
      console.log('Login response:', response);
      
      const token = response.data.access_token;
  
      if (token) {
        await storeToken(token);  // Almacenar el token
        navigation.navigate('HomeScreen');  // Navegar a la pantalla principal
      } else {
        Alert.alert('Error', 'Token de acceso no recibido');
      }
    } catch (err: any) {
      console.error('Error en el login:', err);
      if (err.response) {
        Alert.alert('Error', err.response.data.error || 'Credenciales incorrectas');
      } else if (err.request) {
        Alert.alert('Error', 'No se recibió respuesta del servidor');
      } else {
        Alert.alert('Error', 'Ocurrió un error inesperado');
      }
    }
  };
  

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />

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
       {/*Botón de login */}
      <Button
        title="Login"
        onPress={handleLogin} // Aquí se usa la función de login
      />
      
      <Button
        title="Registrarse"
        onPress={() => navigation.navigate('Register')} 
        color="gray"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f9f9f9', 
  },
  logo: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginBottom: 20,
    borderRadius: 100,

  },
  header: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
    fontFamily: 'Open Sans',
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
    padding: 12,
    borderRadius: 5,
    backgroundColor: '#4CAF50', 
    marginBottom: 12,
  },
});

export default LoginScreen;
