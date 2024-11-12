import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Importamos Picker
import apiClient from '../api/apiClient';

const EditOrderScreen = ({ route, navigation }) => {
  const { order } = route.params;

  const [nombreEmpresaRemi, setNombreEmpresaRemi] = useState(order.nombreEmpresaRemi);
  const [direccionRemi, setDireccionRemi] = useState(order.direccionRemi);
  const [telefonoRemi, setTelefonoRemi] = useState(order.telefonoRemi ? order.telefonoRemi.toString() : '');
  const [numeroCuenta, setNumeroCuenta] = useState(order.numeroCuenta ? order.numeroCuenta.toString() : '');
  
  const [ubicacion, setUbicacion] = useState(order.ubicacion || ''); 
  const [estado, setEstado] = useState(order.estado || '');  // Verifica si el estado está inicializado correctamente

  const handleUpdateOrder = async () => {
    const dataToSend = {
      correoUsua: order.correoUsua, 
      direccionRemi,
      estado,  // Estado actualizado
      fecha: order.fecha, 
      idMercancia: order.idMercancia,
      nombreEmpresaRemi,
      numeroCuenta: numeroCuenta ? parseInt(numeroCuenta) : null,
      telefonoRemi: telefonoRemi ? parseInt(telefonoRemi) : null,
      ubicacion,  // Ubicación actualizada
    };

    console.log("Datos que se envían al backend:", dataToSend);

    try {
      await apiClient.put(`/pedidos/${order.idPedidos}`, dataToSend);
      Alert.alert('Éxito', 'Pedido actualizado correctamente');
      navigation.goBack();
    } catch (error) {
      console.error('Error al actualizar pedido:', error);
      Alert.alert('Error', 'No se pudo actualizar el pedido');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Editar Pedido</Text>

        {/* Mostrar datos del pedido */}
        <Text style={styles.label}>ID del Pedido:</Text>
        <Text style={styles.data}>{order.idPedidos}</Text>

        <Text style={styles.label}>Correo del Usuario:</Text>
        <Text style={styles.data}>{order.correoUsua}</Text>

        <Text style={styles.label}>Nombre de la Empresa:</Text>
        <TextInput
          style={styles.input}
          value={nombreEmpresaRemi}
          onChangeText={setNombreEmpresaRemi}
        />

        <Text style={styles.label}>Dirección del Remitente:</Text>
        <TextInput
          style={styles.input}
          value={direccionRemi}
          onChangeText={setDireccionRemi}
        />

        <Text style={styles.label}>Teléfono del Remitente:</Text>
        <TextInput
          style={styles.input}
          value={telefonoRemi}
          onChangeText={setTelefonoRemi}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Número de Cuenta:</Text>
        <TextInput
          style={styles.input}
          value={numeroCuenta}
          onChangeText={setNumeroCuenta}
          keyboardType="numeric"
        />

        {/* Nuevos campos: Ubicación y Estado */}
        <Text style={styles.label}>Ubicación:</Text>
        <TextInput
          style={styles.input}
          value={ubicacion}
          onChangeText={setUbicacion}
        />

        <Text style={styles.label}>Estado:</Text>
        <Picker
          selectedValue={estado}
          onValueChange={(itemValue) => setEstado(itemValue)}  // Actualizamos el estado seleccionado
          style={styles.picker}
        >
          <Picker.Item label="Pedido recibido" value="Pedido recibido" />
          <Picker.Item label="En proceso" value="En proceso" />
          <Picker.Item label="En tránsito" value="En tránsito" />
          <Picker.Item label="En destino" value="En destino" />
          <Picker.Item label="Entregado" value="Entregado" />
        </Picker>

        <TouchableOpacity style={styles.saveButton} onPress={handleUpdateOrder}>
          <Text style={styles.saveButtonText}>Guardar Cambios</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f4f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#007bff',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: '#495057',
  },
  data: {
    fontSize: 16,
    marginBottom: 10,
    color: '#212529',
    padding: 10,
    backgroundColor: '#e9ecef',
    borderRadius: 5,
  },
  input: {
    height: 45,
    borderColor: '#ced4da',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 3,
  },
  picker: {
    height: 45,
    borderColor: '#ced4da',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  saveButton: {
    backgroundColor: '#28a745',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  saveButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default EditOrderScreen;
