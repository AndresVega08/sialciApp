import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const EditOrderScreen = ({ route, navigation }) => {
  const { order } = route.params; // Obtener el pedido desde los parámetros de navegación

  const [nombreEmpresaRemi, setNombreEmpresaRemi] = useState(order.nombreEmpresaRemi);
  const [direccionRemi, setDireccionRemi] = useState(order.direccionRemi);
  const [telefonoRemi, setTelefonoRemi] = useState(order.telefonoRemi.toString());
  const [numeroCuenta, setNumeroCuenta] = useState(order.numeroCuenta.toString());

  const handleUpdateOrder = async () => {
    try {
      const response = await fetch(`http://192.168.1.2:8080/api/pedidos/${order.idPedidos}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombreEmpresaRemi,
          direccionRemi,
          telefonoRemi: parseInt(telefonoRemi),
          numeroCuenta: parseInt(numeroCuenta),
        }),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar el pedido');
      }

      Alert.alert('Éxito', 'Pedido actualizado correctamente');
      navigation.goBack(); // Volver a la pantalla anterior después de actualizar
    } catch (error) {
      console.error('Error al actualizar pedido:', error);
      Alert.alert('Error', 'No se pudo actualizar el pedido');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Pedido</Text>

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

      <TouchableOpacity style={styles.saveButton} onPress={handleUpdateOrder}>
        <Text style={styles.saveButtonText}>Guardar Cambios</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
