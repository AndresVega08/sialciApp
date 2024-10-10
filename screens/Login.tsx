import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Image, Text } from 'react-native';
import { login, logout } from '../api/api'; 
import { StackNavigationProp } from '@react-navigation/stack';
import { useUserContext } from '../context/UserContext'; 

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
  const [correo_Usua, setCorreo_Usua] = useState(''); 
  const [password_Usua, setPassword_Usua] = useState('');
  const { setUser } = useUserContext();

  const handleLogin = async () => {
    if (!correo_Usua.trim() || !password_Usua.trim()) {
      Alert.alert('Error', 'Por favor, complete ambos campos.');
      return;
    }
  
    try {
      const response = await login(correo_Usua, password_Usua);
      console.log('Login response:', response);
  
      if (response.status === 200) {
        const { access_token } = response.data;
        const userId = access_token; 
        const userRole = 'user'; 
        setUser(userId, correo_Usua, userRole);
        navigation.navigate('HomeScreen');
      } else {
        Alert.alert('Error', 'Credenciales inválidas');
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

  
  const handleLogout = async () => {
    try {
      await logout();
      Alert.alert('Éxito', 'Sesión cerrada');
      navigation.navigate('Login');
    } catch (err) {
      console.error('Error cerrando sesión:', err);
      Alert.alert('Error', 'Hubo un problema cerrando sesión');
    }
  };
  
  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />

      <View style={styles.header}>
        <Text>Login</Text>
      </View>
      
      <TextInput
        style={styles.input}
        placeholder="Correo"
        value={correo_Usua}
        onChangeText={setCorreo_Usua}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password_Usua}
        onChangeText={setPassword_Usua}
      />
      
      <Button title="Login" onPress={handleLogin} />
      <Button title="Registrarse" onPress={() => navigation.navigate('Register')} color="gray" />
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
});

export default LoginScreen;
