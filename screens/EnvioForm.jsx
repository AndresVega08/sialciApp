import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { CountryPicker } from 'react-native-countries';

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
  const [recipientCountry, setRecipientCountry] = useState('');
  const [recipientRegion, setRecipientRegion] = useState('');
  const [recipientCity, setRecipientCity] = useState('');
  const [recipientPostalCode, setRecipientPostalCode] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [recipientPhone, setRecipientPhone] = useState('');

  // Handler for country change
  const handleCountryChange = (country) => {
    setRecipientCountry(country);
    // Implement logic to update regions based on selected country
  };

  // Handler for region change
  const handleRegionChange = (region) => {
    setRecipientRegion(region);
    // Implement logic to update cities based on selected region
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Datos del Remitente</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={senderName}
        onChangeText={setSenderName}
      />
      <TextInput
        style={styles.input}
        placeholder="Apellido"
        value={senderLastName}
        onChangeText={setSenderLastName}
      />
      <TextInput
        style={styles.input}
        placeholder="Dirección"
        value={senderAddress}
        onChangeText={setSenderAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="Correo"
        value={senderEmail}
        onChangeText={setSenderEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Teléfono"
        value={senderPhone}
        onChangeText={setSenderPhone}
      />
      <TextInput
        style={styles.input}
        placeholder="Nombre de la empresa (si aplica)"
        value={senderCompany}
        onChangeText={setSenderCompany}
      />

      <Text style={styles.header}>Mercancía</Text>
      <TextInput
        style={styles.input}
        placeholder="Paquetes"
        value={packages}
        onChangeText={setPackages}
      />
      <TextInput
        style={styles.input}
        placeholder="Descripción del paquete"
        value={packageDescription}
        onChangeText={setPackageDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Peso"
        value={weight}
        onChangeText={setWeight}
        keyboardType="numeric"
      />
      <Picker
        selectedValue={weightUnit}
        style={styles.picker}
        onValueChange={(itemValue) => setWeightUnit(itemValue)}
      >
        <Picker.Item label="lb" value="lb" />
        <Picker.Item label="kg" value="kg" />
      </Picker>
      <TextInput
        style={styles.input}
        placeholder="Valor de la mercancía"
        value={value}
        onChangeText={setValue}
        keyboardType="numeric"
      />
      <View style={styles.dimensionsContainer}>
        <TextInput
          style={styles.input}
          placeholder="Largo (L)"
          value={length}
          onChangeText={setLength}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Ancho (A)"
          value={width}
          onChangeText={setWidth}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Alto (A)"
          value={height}
          onChangeText={setHeight}
          keyboardType="numeric"
        />
      </View>

      <Text style={styles.header}>Datos del Destinatario</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre completo"
        value={recipientName}
        onChangeText={setRecipientName}
      />
      <TextInput
        style={styles.input}
        placeholder="Nombre de la empresa (si aplica)"
        value={recipientCompany}
        onChangeText={setRecipientCompany}
      />
      {/*
      <CountryPicker
        withFilter
        withFlag
        withCountryNameButton
        withCallingCode
        withCallingCodeButton
        onSelect={handleCountryChange}
        containerButtonStyle={styles.countryPicker}
      />

      <TextInput
        style={styles.input}
        placeholder="Región"
        value={recipientRegion}
        onChangeText={handleRegionChange}
      />
      <TextInput
        style={styles.input}
        placeholder="Ciudad"
        value={recipientCity}
        onChangeText={setRecipientCity}
      />
       */}
      <TextInput
        style={styles.input}
        placeholder="Código postal"
        value={recipientPostalCode}
        onChangeText={setRecipientPostalCode}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Correo"
        value={recipientEmail}
        onChangeText={setRecipientEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Número telefónico"
        value={recipientPhone}
        onChangeText={setRecipientPhone}
      />

      <Button title="Enviar" onPress={() => console.log('Form submitted')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    fontSize: 18,
    marginVertical: 8,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginVertical: 8,
    paddingHorizontal: 8,
  },
  picker: {
    height: 50,
    width: '100%',
    marginVertical: 8,
  },
  dimensionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  countryPicker: {
    height: 50,
    width: '100%',
    marginVertical: 8,
  },
});

export default EnvioForm;
