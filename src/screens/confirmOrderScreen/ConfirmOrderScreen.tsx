
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types/type'; // 

const ConfirmOrderScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleGoHome = () => {
    navigation.navigate('MainApp');
  };

  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        <View style={styles.innerDot} />
      </View>

      <Text style={styles.title}>¡Order Confirmed!</Text>
      <Text style={styles.subtitle}>Your order has been placed successfully</Text>

      <Text style={styles.deliveryText}>Delivery by Thu, 29th, 4:00 PM</Text>

      <TouchableOpacity onPress={handleGoHome}>
        <Text style={styles.backToHomeText}>Back To Home</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>
        If you have any questions, please reach out directly to our customer support
      </Text>
    </View>
  );
};

export default ConfirmOrderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFD54F', // Similar to your screenshot
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FF5722',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  innerDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFD54F',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8B4513',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#8B4513',
    marginBottom: 30,
  },
  deliveryText: {
    fontSize: 14,
    color: '#8B4513',
    marginBottom: 30,
  },
  backToHomeText: {
    fontSize: 16,
    color: '#B22222',
    fontWeight: 'bold',
    marginBottom: 40,
  },
  footerText: {
    fontSize: 12,
    color: '#6B4E3D',
    textAlign: 'center',
    marginTop: 20,
  },
});
