import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image } from 'react-native';
import { login } from '../api/api'; // Asegúrate de que esta función haga la llamada al endpoint correcto
import { storeToken } from '../utils/storageUtils'; 
import { StackNavigationProp } from '@react-navigation/stack';

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
  const [correo_Usua, setCorreo_Usua] = useState(''); // Cambiado a correo_Usua
  const [password_Usua, setPassword_Usua] = useState('');

  const handleLogin = async () => {
    try {
      const response = await login(correo_Usua, password_Usua);
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
        value={correo_Usua}
        onChangeText={setCorreo_Usua} // Cambiado a setCorreo_Usua
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password_Usua}
        onChangeText={setPassword_Usua}
      />
      {/* Botón de login */}
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
