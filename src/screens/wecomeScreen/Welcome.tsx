import React from 'react';
import {View, Text, Image} from 'react-native';
import Button from '../../components/button/Button';
import {IMAGES} from '../../constants/images';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import styles from './WelcomeStyle';
import {AuthStackParamList} from '../../types/type';

const WelcomeScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  return (
    <View style={styles.container}>
      <Image source={IMAGES.logo} style={styles.logo} />

      <Text style={styles.appName}>
        <Text style={styles.highlight}>YUM</Text>QUICK
      </Text>

      <Text style={styles.tagline}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
      </Text>

      <Button
        title="Log In"
        onPress={() => navigation.navigate('LoginScreen')}
        disabled={false}
      />
      <Button
        title="Sign Up"
        onPress={() => navigation.navigate('SignUpScreen')}
        variant="secondary"
        disabled={false}
      />
    </View>
  );
};

export default WelcomeScreen;
