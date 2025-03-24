import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import auth from "@react-native-firebase/auth";
import React from 'react';

const OrderScreen = () => {
  const handleSignOut = async () => {
    try {
      await auth().signOut();
      console.log('User signed out successfully');
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.signOutButton} 
        onPress={handleSignOut}
      >
        <Text style={styles.signOutText}>
          Sign out
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signOutButton: {
    backgroundColor: '#f44336',
    padding: 10,
    borderRadius: 5,
  },
  signOutText: {
    color: 'white',
    fontWeight: 'bold',
  }
});