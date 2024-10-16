import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useUserContext } from '../context/UserContext';

type RootStackParamList = {
  PedidosScreen: undefined;
  DetallePedidoScreen: { numeroCuenta: string }; 
};

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

      try {
        const response = await fetch(
          `http://192.168.1.2:8080/api/pedidos/usuario/${encodeURIComponent(userEmail)}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          }
        );

        if (response.status === 204) {
          setPedidos([]);
          setNoPedidos(true);
          return;
        }

        if (!response.ok) {
          throw new Error(`Error al cargar los pedidos: ${response.status}`);
        }

        const data = await response.json();
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
    return <ActivityIndicator size="large" color="#007bff" style={styles.loadingIndicator} />;
  }

  if (noPedidos) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>El usuario no tiene pedidos.</Text>
      </View>
    );
  }

  const handlePedidoPress = (numeroCuenta: string) => {
    navigation.navigate('DetallePedidoScreen', { numeroCuenta });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={pedidos}
        keyExtractor={(item) => item.idPedidos.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePedidoPress(item.numeroCuenta)} activeOpacity={0.7}>
            <View style={styles.pedidoItem}>
              <Text style={styles.pedidoText}>ID Pedido: <Text style={styles.boldText}>{item.idPedidos}</Text></Text>
              <Text style={styles.pedidoText}>Número de cuenta: <Text style={styles.boldText}>{item.numeroCuenta}</Text></Text>
              <Text style={styles.pedidoText}>Correo: <Text style={styles.boldText}>{item.correoUsua}</Text></Text>
              <Text style={styles.pedidoText}>Dirección: <Text style={styles.boldText}>{item.direccionRemi}</Text></Text>
              <Text style={styles.pedidoText}>Teléfono: <Text style={styles.boldText}>{item.telefonoRemi}</Text></Text>
              <Text style={styles.pedidoText}>Empresa: <Text style={styles.boldText}>{item.nombreEmpresaRemi}</Text></Text>
              <Text style={styles.pedidoText}>ID Mercancía: <Text style={styles.boldText}>{item.idMercancia}</Text></Text>
              <Text style={styles.pedidoText}>Fecha: <Text style={styles.boldText}>{new Date(item.fecha).toLocaleString()}</Text></Text>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContent} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pedidoItem: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#007bff',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4, 
  },
  pedidoText: {
    fontSize: 16,
    color: '#343a40',
    marginVertical: 2, 
  },
  boldText: {
    fontWeight: 'bold',
    color: '#495057', 
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18, 
  },
  listContent: {
    paddingBottom: 20, 
  },
});

export default PedidosScreen;
