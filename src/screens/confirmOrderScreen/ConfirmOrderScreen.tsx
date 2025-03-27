import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../../types/type'; //
import styles from './ConfiremOrderStyle';
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
      <Text style={styles.subtitle}>
        Your order has been placed successfully
      </Text>

      <Text style={styles.deliveryText}>Delivery by Thu, 29th, 4:00 PM</Text>

      <TouchableOpacity onPress={handleGoHome}>
        <Text style={styles.backToHomeText}>Back To Home</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>
        If you have any questions, please reach out directly to our customer
        support
      </Text>
    </View>
  );
};

export default ConfirmOrderScreen;
