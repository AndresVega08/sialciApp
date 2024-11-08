import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';

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
      console.error("Número de cuenta no proporcionado.");
      setLoading(false);
      return;
    }

    const fetchPedidoInfo = async () => {
      try {
        const response = await fetch(`http://192.168.1.2:8080/api/pedidos/envio/${numeroCuenta}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error(`Error al cargar la información del pedido: ${response.status}`);
        }

        const data = await response.json();
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
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  // Esta función genera los puntos de la línea de progreso
  const renderProgresoEnvio = () => {
    const estados = ['Pedido recibido', 'En proceso', 'En tránsito', 'En destino', 'Entregado'];
    const estadoIndex = estados.indexOf(pedidoInfo?.estado || '');

    return (
      <View style={styles.progressContainer}>
        <View style={styles.line}>
          {/* Dibujar una línea conectando los puntos */}
          <View
            style={[
              styles.progressLine,
              { width: `${(estadoIndex / (estados.length - 1)) * 100}%` }, // Ajustar la longitud de la línea según el progreso
            ]}
          />
        </View>
        {estados.map((estado, index) => (
          <View
            key={index}
            style={[
              styles.progressDot,
              index <= estadoIndex ? styles.activeDot : styles.inactiveDot,
            ]}
          >
            {/* Mostrar el icono solo en el último estado alcanzado */}
            {index === estadoIndex && (
              <Icon
                name="truck"
                size={20}
                color="white"
                style={styles.icon}
              />
            )}
            <Text style={styles.dotText}>{index + 1}</Text>
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

          {/* Mostrar información básica del pedido */}
          <Text style={styles.label}>Correo del Usuario: {pedidoInfo.correoUsua}</Text>

          {/* Mostrar la ubicación y el estado */}
          <Text style={styles.label}>Ubicación: {pedidoInfo.ubicacion || 'No disponible'}</Text>
          <Text style={styles.label}>Estado: {pedidoInfo.estado || 'No disponible'}</Text>

          {/* Mostrar la línea de progreso del envío */}
          {renderProgresoEnvio()}

          {/* Mostrar las alertas, si existen */}
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

          {/* Información adicional sobre el pedido */}
          <Text style={styles.sectionTitle}>Información del Remitente:</Text>
          <Text style={styles.label}>Nombre de la Empresa: {pedidoInfo.nombreEmpresaRemi}</Text>
          <Text style={styles.label}>Dirección del Remitente: {pedidoInfo.direccionRemi}</Text>
          <Text style={styles.label}>Teléfono del Remitente: {pedidoInfo.telefonoRemi}</Text>
          <Text style={styles.label}>Número de Cuenta: {pedidoInfo.numeroCuenta}</Text>

        </>
      ) : (
        <Text>No se encontró información del pedido.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  alertContainer: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  alertTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red',
  },
  alertText: {
    fontSize: 16,
    color: 'orange',
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  line: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#ddd', 
  },
  progressLine: {
    height: 2,
    backgroundColor: 'green', 
  },
  progressDot: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeDot: {
    backgroundColor: 'green',
  },
  inactiveDot: {
    backgroundColor: '#ddd',
  },
  icon: {
    marginBottom: 5,
  },
  dotText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default DetallePedidoScreen;
