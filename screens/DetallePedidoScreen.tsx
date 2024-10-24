import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  DetallePedidoScreen: { numeroCuenta: string }; 
};

type DetallePedidoScreenNavigationProp = StackNavigationProp<RootStackParamList, 'DetallePedidoScreen'>;

interface Props {
  navigation: DetallePedidoScreenNavigationProp;
  route: RouteProp<RootStackParamList, 'DetallePedidoScreen'>;
}

const DetallePedidoScreen: React.FC<Props> = ({ route }) => {
  const { numeroCuenta } = route.params;
  const [envioInfo, setEnvioInfo] = useState<any>(null);
  const [alertas, setAlertas] = useState<any[]>([]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(`Número de cuenta enviado para la consulta: ${numeroCuenta}`); 

    const fetchEnvioInfo = async () => {
      try {
        const response = await fetch(`http://192.168.1.2:8080/api/pedidos/envio/${numeroCuenta}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        console.log(`Respuesta del servidor: ${response.status}`); 

        if (!response.ok) {
          throw new Error(`Error al cargar la información del envío: ${response.status}`);
        }

        const data = await response.json();
        setEnvioInfo(data);

        // Verificar si hay alertas en la respuesta
        if (data.alertas) {
          setAlertas(data.alertas); 
        }
      } catch (error) {
        console.error('Error al recuperar información del envío:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEnvioInfo();
  }, [numeroCuenta]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <ScrollView style={styles.container}>
      {envioInfo ? (
        <>
          <Text style={styles.title}>Información del Envío</Text>
          <Text>{JSON.stringify(envioInfo, null, 2)}</Text>
          
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
        </>
      ) : (
        <Text>No se encontró información del envío.</Text>
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
});

export default DetallePedidoScreen;
