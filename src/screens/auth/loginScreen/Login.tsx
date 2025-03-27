import React, {useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import ScreenLayout from '../../../components/screenLoyout/ScreenLayout';
import {IMAGES} from '../../../constants/images';
import {useLogin} from './useLogin';
import Input from '../../../components/input/Input';
import styles from './LoginStyle';
import {RootStackParamList} from '../../../types/type';

const LoginScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {login, loading, error} = useLogin();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      ToastAndroid.show(
        'Please enter both email and password.',
        ToastAndroid.SHORT,
      );
      return;
    }

    try {
      await login(email, password);
      ToastAndroid.show('Login successful!', ToastAndroid.SHORT);
      setEmail('');
      setPassword('');
    } catch (err) {
      console.log('Login error:', err);
    }
  };

  return (
    <ScreenLayout topbarProps="Log In">
      <View style={styles.container}>
        <Text style={styles.welcomeTitle}>Welcome</Text>
        <Text style={styles.welcomeText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Text>

        <Text style={styles.label}>Email or Mobile Number</Text>
        <View style={styles.inputContainer}>
          <Input
            style={styles.input}
            placeholder="example@example.com"
            placeholderTextColor="#7a6f6f"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <Text style={styles.label}>Password</Text>
        <View style={styles.inputContainer}>
          <Input
            style={styles.input}
            placeholder="************"
            placeholderTextColor="#7a6f6f"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>
        {error && <Text style={styles.errorText}>{error}</Text>}

        <TouchableOpacity
          onPress={() => navigation.navigate('ForgotPasswordScreen')}>
          <Text style={styles.forgotPassword}>Forget Password</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleLogin}
          disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.loginButtonText}>Log In</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.orText}>or sign up with</Text>
        <View style={styles.socialIcons}>
          <TouchableOpacity>
            <Image source={IMAGES.GoogleIcon} style={styles.socialIcon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={IMAGES.FacebookIcon} style={styles.socialIcon} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
          <View>
            <Text style={styles.signUpText}>
              Don't have an account?{' '}
              <Text style={styles.signUpLink}>Sign Up</Text>
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScreenLayout>
  );
};

export default LoginScreen;
