import {useState} from 'react';
import {ToastAndroid} from 'react-native';
import auth from '@react-native-firebase/auth';

export const useSetPassword = () => {
  const [loading, setLoading] = useState(false);

  const setPassword = async (password: string, confirmPassword: string) => {
    if (password.trim() !== confirmPassword.trim()) {
      ToastAndroid.show('Passwords do not match!', ToastAndroid.SHORT);
      return;
    }

    const user = auth().currentUser;
    if (!user) {
      ToastAndroid.show('No user is logged in!', ToastAndroid.SHORT);
      return;
    }

    try {
      setLoading(true);
      await user.updatePassword(password.trim());
      ToastAndroid.show('Password updated successfully!', ToastAndroid.SHORT);
    } catch (error: any) {
      console.log('Error updating password:', error);
      ToastAndroid.show(error.message, ToastAndroid.LONG);
    } finally {
      setLoading(false);
    }
  };

  return {setPassword, loading};
};
