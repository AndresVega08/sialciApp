import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Alert, Image, Text } from 'react-native';
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
            const { access_token, rol, nombre } = response.data; 
            setUser(null, correo_Usua, rol, nombre, access_token); 
            
            
            navigation.reset({
                index: 0,
                routes: [{ name: 'HomeScreen' }],
            });
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

    <Text style={styles.header}>Inicio de sesion</Text>
    
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
    
    {/* Botón de Login */}
    <TouchableOpacity style={styles.button} onPress={handleLogin}>
      <Text style={styles.buttonText}>Login</Text>
    </TouchableOpacity>

    {/* Botón de Registro */}
    <TouchableOpacity style={[styles.button, { backgroundColor: 'gray' }]} onPress={() => navigation.navigate('Register')}>
      <Text style={styles.buttonText}>Registrarse</Text>
    </TouchableOpacity>
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
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
