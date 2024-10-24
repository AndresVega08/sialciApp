import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Alert, Image, Text } from 'react-native';
import { login, logout } from '../api/api'; 
import { StackNavigationProp } from '@react-navigation/stack';
import { useUserContext } from '../context/UserContext'; 
import Icon from 'react-native-vector-icons/FontAwesome'; 

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
  const [showPassword, setShowPassword] = useState(false); 
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
        const { access_token, rol, nombre, id } = response.data;  
        setUser(id, correo_Usua, rol, nombre, access_token);  

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
      
      <Text style={styles.header}>Inicio de sesión</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Correo"
        value={correo_Usua}
        onChangeText={setCorreo_Usua}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Contraseña"
          secureTextEntry={!showPassword}
          value={password_Usua}
          onChangeText={setPassword_Usua}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
          <Icon name={showPassword ? 'eye' : 'eye-slash'} size={20} color="#495057" />
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Iniciar sesión</Text>
      </TouchableOpacity>

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
    width: 180, 
    height: 180, 
    alignSelf: 'center',
    marginBottom: 30, 
    borderRadius: 90, 
    shadowColor: '#000', 
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3, 
    shadowRadius: 4.65, 
    elevation: 8, 
  },
  header: {
    fontSize: 26,
    marginBottom: 24,
    textAlign: 'center',
    fontFamily: 'Open Sans', 
    fontWeight: 'bold',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    elevation: 2,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 2,
  },
  passwordInput: {
    flex: 1,
    height: 50,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  eyeIcon: {
    marginLeft: -10, 
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
