import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import ScreenLayout from '../../../components/screenLoyout/ScreenLayout';
import { useForgetPassword } from './useForgetPassword';

const ForgetPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const { resetPassword, loading, error } = useForgetPassword();

  const handleResetPassword = () => {
    if (email.trim() === '') return;
    resetPassword(email);
  };

  return (
    <ScreenLayout topbarProps="Forget Password">
      <View style={styles.container}>
        {/* Email Input */}
        <Text style={styles.label}>Email</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="example@example.com"
            placeholderTextColor="#7a6f6f"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* Show error message if any */}
        {error && <Text style={styles.errorText}>{error}</Text>}

        {/* Forget Password Button */}
        <TouchableOpacity
          style={[styles.forgetPasswordButton, loading && styles.disabledButton]}
          onPress={handleResetPassword}
          disabled={loading}
        >
          <Text style={styles.forgetPasswordButtonText}>
            {loading ? 'Processing...' : 'Reset'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScreenLayout>
  );
};

export default ForgetPasswordScreen;

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  label: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#3b2f2f',
    marginBottom: 20,
  },
  inputContainer: {
    backgroundColor: '#FFF2C5',
    borderRadius: 15,
    marginBottom: 40,
    padding: 5,
  },
  input: {
    fontSize: 14,
    color: '#000',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  forgetPasswordButton: {
    backgroundColor: '#EB5222',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
  },
  forgetPasswordButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
});
