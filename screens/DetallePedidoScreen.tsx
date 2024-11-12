import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import apiClient from '../api/apiClient';

type RootStackParamList = {
  DetallePedidoScreen: { numeroCuenta: string };
};

type DetallePedidoScreenNavigationProp = StackNavigationProp<RootStackParamList, 'DetallePedidoScreen'>;

interface Props {
  navigation: DetallePedidoScreenNavigationProp;
  route: RouteProp<RootStackParamList, 'DetallePedidoScreen'>;
}

const DetallePedidoScreen: React.FC<Props> = ({ route }) => {
  const { numeroCuenta } = route.params || {};
  const [pedidoInfo, setPedidoInfo] = useState<any>(null);
  const [alertas, setAlertas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!numeroCuenta) {
      setLoading(false);
      return;
    }
  
    const fetchPedidoInfo = async () => {
      try {
        const response = await apiClient.get(`/pedidos/envio/${numeroCuenta}`);
  
        const data = response.data;
        setPedidoInfo(data);
  
        if (data.alertas) {
          setAlertas(data.alertas);
        }
      } catch (error) {
        console.error('Error al recuperar información del pedido:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchPedidoInfo();
  }, [numeroCuenta]);
  

  if (loading) {
    return <ActivityIndicator size="large" color="#007bff" style={styles.loading} />;
  }

  const renderProgresoEnvio = () => {
    const estados = ['Pedido recibido', 'En proceso', 'En tránsito', 'En destino', 'Entregado'];
    const estadoIndex = estados.indexOf(pedidoInfo?.estado || '');

    return (
      <View style={styles.progressContainer}>
        <View style={styles.line}>
          <View
            style={[
              styles.progressLine,
              { height: `${(estadoIndex / (estados.length - 1)) * 100}%` },
            ]}
          />
        </View>
        {estados.map((estado, index) => (
          <View key={index} style={styles.stateRow}>
            <View
              style={[
                styles.progressDot,
                index <= estadoIndex ? styles.activeDot : styles.inactiveDot,
              ]}
            >
              {index === estadoIndex && (
                <Icon name="truck" size={20} color="white" style={styles.icon} />
              )}
              <Text style={styles.dotText}>{index + 1}</Text>
            </View>
            <Text style={styles.estadoText}>{estado}</Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      {pedidoInfo ? (
        <>
          <Text style={styles.title}>Detalles del Pedido</Text>

          <View style={styles.card}>
            <Text style={styles.label}>Correo del Usuario: {pedidoInfo.correoUsua}</Text>
            <Text style={styles.label}>Ubicación: {pedidoInfo.ubicacion || 'No disponible'}</Text>
            <Text style={styles.label}>Estado: {pedidoInfo.estado || 'No disponible'}</Text>
          </View>

          {renderProgresoEnvio()}

          {alertas.length > 0 && (
            <View style={styles.alertContainer}>
              <Text style={styles.alertTitle}>Alertas:</Text>
              {alertas.map((alerta, index) => (
                <Text key={index} style={styles.alertText}>
                  {alerta.message} (Código: {alerta.code}, Tipo: {alerta.alertType})
                </Text>
              ))}
            </View>
          )}

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Información del Remitente:</Text>
            <Text style={styles.label}>Nombre de la Empresa: {pedidoInfo.nombreEmpresaRemi}</Text>
            <Text style={styles.label}>Dirección del Remitente: {pedidoInfo.direccionRemi}</Text>
            <Text style={styles.label}>Teléfono del Remitente: {pedidoInfo.telefonoRemi}</Text>
            <Text style={styles.label}>Número de Cuenta: {pedidoInfo.numeroCuenta}</Text>
          </View>
        </>
      ) : (
        <Text style={styles.noInfo}>No se encontró información del pedido.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    color: '#495057',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#343a40',
    marginBottom: 10,
  },
  alertContainer: {
    backgroundColor: '#f8d7da',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  alertTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#721c24',
    marginBottom: 10,
  },
  alertText: {
    fontSize: 16,
    color: '#856404',
  },
  progressContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginVertical: 20,
    paddingLeft: 32,
  },
  line: {
    position: 'absolute',
    left: 55, 
    top: 25,
    bottom: 25,
    width: 4,
    backgroundColor: '#e9ecef',
    borderRadius: 2,
  },
  progressLine: {
    position: 'absolute',
    left: 0, 
    width: 4,
    backgroundColor: '#28a745',
    borderRadius: 2,
  },
  stateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },
  progressDot: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    zIndex: 2,
  },
  activeDot: {
    backgroundColor: '#28a745',
  },
  inactiveDot: {
    backgroundColor: '#e9ecef',
  },
  icon: {
    marginBottom: 5,
  },
  dotText: {
    color: 'white',
    fontWeight: 'bold',
  },
  estadoText: {
    fontSize: 16,
    color: '#495057',
  },
  noInfo: {
    fontSize: 16,
    textAlign: 'center',
    color: '#6c757d',
  },
});

export default DetallePedidoScreen;
