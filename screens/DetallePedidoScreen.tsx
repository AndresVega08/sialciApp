import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnvioInfo = async () => {
      try {
        const response = await fetch(`http://192.168.1.2:8080/api/pedidos/envio/${numeroCuenta}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error(`Error al cargar la información del envío: ${response.status}`);
        }

        const data = await response.json();
        setEnvioInfo(data);
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
    <View style={styles.container}>
      {envioInfo ? (
        <Text>{JSON.stringify(envioInfo)}</Text> 
      ) : (
        <Text>No se encontró información del envío.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default DetallePedidoScreen;
