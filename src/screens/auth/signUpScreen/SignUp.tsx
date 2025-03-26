import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  ToastAndroid, 
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import ScreenLayout from '../../../components/screenLoyout/ScreenLayout';
import { IMAGES } from '../../../constants/images';
import { RootStackParamList } from '../../../types/type';
import { useSignup } from './useSignup';
import Input from '../../../components/input/Input';

const SignUpScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { signup, loading, error } = useSignup();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [dob, setDob] = useState('');

  const handleSignUp = async () => {
    if (
      !fullName.trim() ||
      !email.trim() ||
      !password.trim() ||
      !mobileNumber.trim() ||
      !dob.trim()
    ) {
      ToastAndroid.show('Please fill out all fields.', ToastAndroid.SHORT);
      return;
    }
  
    try {
      await signup(fullName, mobileNumber, dob, email, password);
  
      ToastAndroid.show('Account created successfully!', ToastAndroid.SHORT);
      setEmail('');
      setPassword('');
      setFullName('');
      setMobileNumber('');
      setDob('');
  
    } catch (err) {
      console.log('Signup error:', err);
    }
  };
  

  return (
    <ScreenLayout topbarProps="New Account">
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.label}>Full name</Text>
          <View style={styles.inputContainer}>
            <Input
              style={styles.input}
              placeholder="John Doe"
              placeholderTextColor="#7a6f6f"
              value={fullName}
              onChangeText={setFullName}
            />
          </View>

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

          <Text style={styles.label}>Mobile Number</Text>
          <View style={styles.inputContainer}>
            <Input
              style={styles.input}
              placeholder="+ 123 456 789"
              placeholderTextColor="#7a6f6f"
              value={mobileNumber}
              onChangeText={setMobileNumber}
            />
          </View>

          <Text style={styles.label}>Date of birth</Text>
          <View style={styles.inputContainer}>
            <Input
              style={styles.input}
              placeholder="DD / MM / YYYY"
              placeholderTextColor="#7a6f6f"
              value={dob}
              onChangeText={setDob}
            />
          </View>

          <View style={styles.buttonContainer}>
            <View style={{ width: 180, margin: 'auto' }}>
              <Text style={styles.termsText}>
                By continuing, you agree to{' '}
                <Text style={styles.linkText}>Terms of Use</Text> and{' '}
                <Text style={styles.linkText}>Privacy Policy</Text>.
              </Text>
            </View>

            <TouchableOpacity
              style={styles.signUpButton}
              onPress={handleSignUp}
              disabled={loading}
            >
              <Text style={styles.signUpButtonText}>
                {loading ? 'Signing Up...' : 'Sign Up'}
              </Text>
            </TouchableOpacity>

            {error && <Text style={styles.errorText}>{error}</Text>}

            <Text style={styles.orText}>or sign up with</Text>
          </View>
          <View style={{ paddingBottom: 20 }}>
            <View style={styles.socialIcons}>
              <TouchableOpacity>
                <Image source={IMAGES.GoogleIcon} style={styles.socialIcon} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image source={IMAGES.FacebookIcon} style={styles.socialIcon} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
              <Text style={styles.loginText}>
                Already have an account? <Text style={styles.loginLink}>Log in</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ScreenLayout>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    paddingHorizontal: 12,
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
    marginBottom: 10,
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
  termsText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#7a6f6f',
    marginBottom: 10,
  },
  linkText: {
    color: 'red',
    fontWeight: 'bold',
  },
  buttonContainer: {
    paddingHorizontal: 68,
    paddingBottom: 10,
  },
  signUpButton: {
    backgroundColor: '#EB5222',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  signUpButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orText: {
    textAlign: 'center',
    color: '#7a6f6f',
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 5,
  },
  socialIcon: {
    width: 35,
    height: 35,
  },
  loginText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#7a6f6f',
    marginBottom: 40,
  },
  loginLink: {
    color: 'red',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 5,
  },
});
