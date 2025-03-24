import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Button from '../../components/button/Button';
import { IMAGES } from '../../constants/images';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type AuthStackParamList = {
  Welcome: undefined;
  Login: undefined;
  SignUp: undefined;
};

const WelcomeScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  return (
    <View style={styles.container}>
      <Image source={IMAGES.logo} style={styles.logo} />

      <Text style={styles.appName}>
        <Text style={styles.highlight}>YUM</Text>QUICK
      </Text>

      <Text style={styles.tagline}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
      </Text>

      <Button title="Log In" onPress={() => navigation.navigate("LoginScreen")} disabled={false} />
      <Button title="Sign Up" onPress={() => navigation.navigate("SignUpScreen")} variant="secondary" disabled={false} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E65125',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  logo: {
    width: 210,
    height: 180,
    marginBottom: 20,
  },
  appName: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFF',
  },
  highlight: {
    color: '#FFD166',
  },
  tagline: {
    padding: 20,
    fontSize: 14,
    color: '#FFF',
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default WelcomeScreen;
