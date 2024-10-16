import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';

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

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
        keyboardType="numeric"
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
          style={styles.inputDimension}
          placeholder="Largo (L)"
          value={length}
          onChangeText={setLength}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.inputDimension}
          placeholder="Ancho (A)"
          value={width}
          onChangeText={setWidth}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.inputDimension}
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
        keyboardType="numeric"
      />

      <Button title="Enviar" onPress={() => console.log('Form submitted')} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f8f9fa',
    flexGrow: 1,
  },
  header: {
    fontSize: 20,
    marginVertical: 10,
    fontWeight: 'bold',
    color: '#007bff',
  },
  input: {
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  inputDimension: {
    flex: 1,
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    marginRight: 5,
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
});

export default EnvioForm;
