import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { useUserContext } from '../context/UserContext';

type PedidosScreenNavigationProp = StackNavigationProp<RootStackParamList, 'PedidosScreen'>;

interface Props {
  navigation: PedidosScreenNavigationProp;
}

const PedidosScreen: React.FC<Props> = ({ navigation }) => {
  const { userEmail } = useUserContext();
  const [pedidos, setPedidos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [noPedidos, setNoPedidos] = useState(false);

  useEffect(() => {
    const fetchPedidos = async () => {
      if (!userEmail) {
          console.error('No hay correo disponible para realizar la solicitud.');
          setNoPedidos(true);
          setLoading(false);
          return;
      }
  
      console.log('Correo del usuario:', userEmail); // Asegúrate de que el correo es el correcto
  
      try {
          const response = await fetch(`http://192.168.1.2:8080/api/pedidos/usuario/${encodeURIComponent(userEmail)}`, {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
              },
              credentials: 'include',
          });
  
          if (response.status === 204) {
              setPedidos([]); // No hay pedidos, así que establece el estado como un array vacío
              setNoPedidos(true);
              return;
          }
  
          if (!response.ok) {
              throw new Error(`Error al cargar los pedidos: ${response.status}`);
          }
  
          const data = await response.json();
          console.log('Pedidos recibidos:', data); // Verifica la respuesta de la API
          setPedidos(data);
          
          if (data.length === 0) {
              setNoPedidos(true);
          }
      } catch (error) {
          console.error('Error al recuperar pedidos:', error);
          setNoPedidos(true);
      } finally {
          setLoading(false);
      }
  };  

    fetchPedidos();
  }, [userEmail]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (noPedidos) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>El usuario no tiene pedidos.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={pedidos}
        keyExtractor={(item) => item.idPedidos.toString()}
        renderItem={({ item }) => (
          <View style={styles.pedidoItem}>
            <Text style={styles.pedidoText}>ID Pedido: {item.idPedidos}</Text>
            <Text style={styles.pedidoText}>Correo: {item.correoUsua}</Text>
            <Text style={styles.pedidoText}>Dirección: {item.direccionRemi}</Text>
            <Text style={styles.pedidoText}>Teléfono: {item.telefonoRemi}</Text>
            <Text style={styles.pedidoText}>Empresa: {item.nombreEmpresaRemi}</Text>
            <Text style={styles.pedidoText}>ID Mercancía: {item.idMercancia}</Text>
            <Text style={styles.pedidoText}>Fecha: {new Date(item.fecha).toLocaleString()}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  pedidoItem: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    borderRadius: 5,
  },
  pedidoText: {
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default PedidosScreen;
