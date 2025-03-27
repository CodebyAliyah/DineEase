import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import ScreenLayout from '../../../components/screenLoyout/ScreenLayout';
import {useForgetPassword} from './useForgetPassword';
import Input from '../../../components/input/Input';
import styles from './ForgetStyle';

const ForgetPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const {resetPassword, loading, error} = useForgetPassword();

  const isValidEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleResetPassword = async () => {
    if (!email.trim()) {
      ToastAndroid.show('Please enter an email.', ToastAndroid.SHORT);
      return;
    }
    if (!isValidEmail(email)) {
      ToastAndroid.show(
        'Please enter a valid email address.',
        ToastAndroid.SHORT,
      );
      return;
    }

    try {
      await resetPassword(email);

      ToastAndroid.show('Reset email sent successfully!', ToastAndroid.SHORT);
      setEmail('');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ScreenLayout topbarProps="Forget Password">
      <View style={styles.container}>
        <Text style={styles.label}>Email</Text>
        <View style={styles.inputContainer}>
          <Input
            style={styles.input}
            placeholder="example@example.com"
            placeholderTextColor="#7a6f6f"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {error && <Text style={styles.errorText}>{error}</Text>}

        <TouchableOpacity
          style={[
            styles.forgetPasswordButton,
            loading && styles.disabledButton,
          ]}
          onPress={handleResetPassword}
          disabled={loading}>
          <Text style={styles.forgetPasswordButtonText}>
            {loading ? 'Processing...' : 'Reset'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScreenLayout>
  );
};

export default ForgetPasswordScreen;
