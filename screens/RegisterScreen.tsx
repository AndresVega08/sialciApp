import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const RegisterScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [role, setRole] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/register', { 
        correo_Usua: email,
        password_Usua: password,
        nombre_Usua: name,
        apellidos_Usua: surname,
        correo_Admi: adminEmail,
        password_Admi: adminPassword,
        rol: role,
      });

      if (response.status === 201) {
        Alert.alert('Success', 'User registered successfully');
        navigation.navigate('Login'); // Navegar a la pantalla de login después del registro
      }
    } catch (error: any) {
      // Manejo de errores más robusto
      if (error.response) {
        // Error del servidor
        Alert.alert('Error', error.response.data.message || 'Error en el registro'); // Usa 'message' si es más adecuado
      } else if (error.request) {
        // Error en la solicitud
        Alert.alert('Error', 'No se recibió respuesta del servidor');
      } else {
        // Error en la configuración de la solicitud
        Alert.alert('Error', 'Error en la configuración de la solicitud');
      }
      console.error('Error en el registro:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Surname"
        value={surname}
        onChangeText={setSurname}
      />
      <TextInput
        style={styles.input}
        placeholder="Admin Email (optional)"
        value={adminEmail}
        onChangeText={setAdminEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Admin Password (optional)"
        secureTextEntry
        value={adminPassword}
        onChangeText={setAdminPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Role"
        value={role}
        onChangeText={setRole}
      />
      <Button title="Register" onPress={handleRegister} />
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

export default RegisterScreen;
