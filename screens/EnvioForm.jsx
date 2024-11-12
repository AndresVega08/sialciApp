import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

const EnvioForm = () => {
  const [senderName, setSenderName] = useState('');
  const [senderLastName, setSenderLastName] = useState('');
  const [senderAddress, setSenderAddress] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [senderPhone, setSenderPhone] = useState('');
  const [senderCompany, setSenderCompany] = useState('');
  const [packages, setPackages] = useState('');
  const [packageDescription, setPackageDescription] = useState('');
  const [weight, setWeight] = useState('');
  const [weightUnit, setWeightUnit] = useState('lb');
  const [value, setValue] = useState('');
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [recipientCompany, setRecipientCompany] = useState('');
  const [recipientPostalCode, setRecipientPostalCode] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [recipientPhone, setRecipientPhone] = useState('');
  const [countries, setCountries] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [cities, setCities] = useState([]);
  const [recipientCountry, setRecipientCountry] = useState('');
  const [recipientDepartment, setRecipientDepartment] = useState('');
  const [recipientCity, setRecipientCity] = useState('');

  const API_URL_COUNTRIES = 'https://www.universal-tutorial.com/api/countries/';
  const API_URL_DEPARTMENTS = 'https://www.universal-tutorial.com/api/states/';
  const API_URL_CITIES = 'https://www.universal-tutorial.com/api/cities/';
  const API_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJhbmRyZXNfdmVnYXBlQGZldC5lZHUuY28iLCJhcGlfdG9rZW4iOiJGMTBTX1Jla3NsanVGN2pCLTZoS1JjS0UwTWk0YW9JRWdEdnhfTGlpV0gxRGpCY0lsUWN0QTdLU3ZYeU5SSFc4MHVZIn0sImV4cCI6MTczMTUyMzQ2N30.r51-7udafTcpk-jGcn9uMQ5B5pbbUuFl6Gv9TFcXFKk';

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(API_URL_COUNTRIES, {
          headers: {
            'Authorization': `Bearer ${API_TOKEN}`,
            'Accept': 'application/json'
          }
        });
        setCountries(response.data);
      } catch (error) {
        Alert.alert('Error', 'No se pudieron obtener los países. Verifica tu conexión y credenciales.');
      }
    };
    
    fetchCountries();
  }, []);

  const handleCountryChange = async (countryName) => {
    setRecipientCountry(countryName);
    try {
      const response = await axios.get(`${API_URL_DEPARTMENTS}${countryName}`, {
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`,
          "Accept": "application/json"
        }
      });
      setDepartments(response.data);
      setRecipientDepartment('');
      setCities([]);
      setRecipientCity('');
    } catch (error) {
      Alert.alert('Error', 'No se pudieron obtener los departamentos.');
    }
  };

  const handleDepartmentChange = async (departmentName) => {
    setRecipientDepartment(departmentName);
    try {
      const response = await axios.get(`${API_URL_CITIES}${departmentName}`, {
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`,
          "Accept": "application/json"
        }
      });
      setCities(response.data);
      setRecipientCity('');
    } catch (error) {
      Alert.alert('Error', 'No se pudieron obtener las ciudades.');
    }
  };

  const handleSubmit = async () => {
    try {
      const parsedPackages = parseInt(packages);
      if (isNaN(parsedPackages)) {
        Alert.alert('Error', 'Por favor, ingresa un número válido para Paquetes.');
        return;
      }
  
      const requestData = {
        senderName,
        senderLastName,
        senderAddress,
        senderEmail,
        senderPhone: parseInt(senderPhone),
        senderCompany,
        packages: parsedPackages, // Asegúrate de que es un número válido
        packageDescription,
        weight: parseFloat(weight),
        weightUnit,
        value: parseFloat(value),
        length: parseFloat(length),
        width: parseFloat(width),
        height: parseFloat(height),
        recipientName,
        recipientCompany,
        recipientCountry,
        recipientDepartment,
        recipientCity,
        recipientPostalCode: parseInt(recipientPostalCode),
        recipientEmail,
        recipientPhone: parseInt(recipientPhone),
        accountNumber: '',
      };
  
      // Mostrar los datos por consola
      console.log('Datos enviados al backend:', requestData);
  
      const response = await axios.post('http://192.168.1.2:8080/api/envio', requestData);
      Alert.alert('Éxito', response.data);
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al enviar los datos. Inténtalo de nuevo.');
      console.error('Error al enviar los datos:', error);
    }
  };
  
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Datos del Remitente</Text>
      <TextInput style={styles.input} placeholder="Nombre" value={senderName} onChangeText={setSenderName} />
      <TextInput style={styles.input} placeholder="Apellido" value={senderLastName} onChangeText={setSenderLastName} />
      <TextInput style={styles.input} placeholder="Dirección" value={senderAddress} onChangeText={setSenderAddress} />
      <TextInput style={styles.input} placeholder="Correo" value={senderEmail} onChangeText={setSenderEmail} />
      <TextInput style={styles.input} placeholder="Teléfono" value={senderPhone} onChangeText={setSenderPhone} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Nombre de la empresa (si aplica)" value={senderCompany} onChangeText={setSenderCompany} />
      <Text style={styles.header}>Mercancía</Text>
      <TextInput style={styles.input}  placeholder="Paquetes"  value={packages}  onChangeText={setPackages}  keyboardType="numeric"/>
      <TextInput style={styles.input} placeholder="Descripción del paquete" value={packageDescription} onChangeText={setPackageDescription} />
      <TextInput style={styles.input} placeholder="Peso" value={weight} onChangeText={setWeight} keyboardType="numeric" />
      <Picker selectedValue={weightUnit} style={styles.picker} onValueChange={(itemValue) => setWeightUnit(itemValue)}>
        <Picker.Item label="lb" value="lb" />
        <Picker.Item label="kg" value="kg" />
      </Picker>
      <TextInput style={styles.input} placeholder="Valor de la mercancía" value={value} onChangeText={setValue} keyboardType="numeric" />
      <View style={styles.dimensionsContainer}>
        <TextInput style={styles.inputDimension} placeholder="Largo (L)" value={length} onChangeText={setLength} keyboardType="numeric" />
        <TextInput style={styles.inputDimension} placeholder="Ancho (A)" value={width} onChangeText={setWidth} keyboardType="numeric" />
        <TextInput style={styles.inputDimension} placeholder="Alto (A)" value={height} onChangeText={setHeight} keyboardType="numeric" />
      </View>

      <Text style={styles.header}>Datos del Destinatario</Text>
      <TextInput style={styles.input} placeholder="Nombre completo" value={recipientName} onChangeText={setRecipientName} />
      <TextInput style={styles.input} placeholder="Nombre de la empresa (si aplica)" value={recipientCompany} onChangeText={setRecipientCompany} />
      <TextInput style={styles.input} placeholder="Código postal" value={recipientPostalCode} onChangeText={setRecipientPostalCode} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Correo" value={recipientEmail} onChangeText={setRecipientEmail} />
      <TextInput style={styles.input} placeholder="Teléfono" value={recipientPhone} onChangeText={setRecipientPhone} keyboardType="numeric" />
      
      <Picker selectedValue={recipientCountry} style={styles.picker} onValueChange={(itemValue) => handleCountryChange(itemValue)}>
        <Picker.Item label="Selecciona un país" value="" />
        {countries.map((country, index) => (
          <Picker.Item key={index} label={country.country_name} value={country.country_name} />
        ))}
      </Picker>

      <Picker selectedValue={recipientDepartment} style={styles.picker} onValueChange={(itemValue) => handleDepartmentChange(itemValue)}>
        <Picker.Item label="Selecciona un departamento" value="" />
        {departments.map((department, index) => (
          <Picker.Item key={index} label={department.state_name} value={department.state_name} />
        ))}
      </Picker>

      <Picker selectedValue={recipientCity} style={styles.picker} onValueChange={(itemValue) => setRecipientCity(itemValue)}>
        <Picker.Item label="Selecciona una ciudad" value="" />
        {cities.map((city, index) => (
          <Picker.Item key={index} label={city.city_name} value={city.city_name} />
        ))}
      </Picker>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Enviar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f3f4f6',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  inputDimension: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    flex: 1,
    backgroundColor: '#fff',
  },
  dimensionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  picker: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  submitButton: {
    backgroundColor: '#28a745',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default EnvioForm;
