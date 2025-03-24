import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ToastAndroid, // 1) Import ToastAndroid
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ScreenLayout from '../../../components/screenLoyout/ScreenLayout';
import {IMAGES} from '../../../constants/images';
import {useLogin} from './useLogin';
import Input from '../../../components/input/Input';

const LoginScreen = () => {
  const navigation = useNavigation();
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
      console.error('Login error:', err);
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
          <TouchableOpacity>
            <Image source={IMAGES.ShowOff} style={styles.eyeIcon} />
          </TouchableOpacity>
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

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  welcomeTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#3b2f2f',
    marginBottom: 15,
  },
  welcomeText: {
    fontSize: 13,
    color: '#7a6f6f',
    marginBottom: 20,
  },
  label: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#3b2f2f',
    marginBottom: 5,
  },
  inputContainer: {
    backgroundColor: '#FFF2C5',
    borderRadius: 10,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#000',
  },
  eyeIcon: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
  forgotPassword: {
    color: 'red',
    fontSize: 12,
    textAlign: 'right',
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: '#EB5222',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  loginButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orText: {
    textAlign: 'center',
    color: '#7a6f6f',
    marginBottom: 10,
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 20,
  },
  socialIcon: {
    width: 35,
    height: 35,
  },
  signUpText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#7a6f6f',
  },
  signUpLink: {
    color: 'red',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
  },
});
