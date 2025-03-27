import {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const useProfile = () => {
  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const user = auth().currentUser;

  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        try {
          setLoading(true);
          const userDoc = await firestore()
            .collection('users')
            .doc(user.uid)
            .get();
          if (userDoc.exists) {
            const userData = userDoc.data();
            setFullName(userData?.name || '');
            setDob(userData?.dob || '');
            setEmail(userData?.email || '');
            setPhone(userData?.phone || '');
          }
        } catch (error) {
          Alert.alert('Error', 'Failed to fetch user data');
        } finally {
          setLoading(false);
        }
      };
      fetchUserData();
    }
  }, []);

  const handleUpdateProfile = async () => {
    if (!fullName || !dob || !phone) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    try {
      setLoading(true);
      await firestore().collection('users').doc(user?.uid).update({
        name: fullName,
        dob,
        phone,
      });
      await user?.updateProfile({
        displayName: fullName,
      });
      Alert.alert('Success', 'Profile updated successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return {
    fullName,
    setFullName,
    dob,
    setDob,
    email,
    phone,
    setPhone,
    loading,
    handleUpdateProfile,
  };
};

export default useProfile;
