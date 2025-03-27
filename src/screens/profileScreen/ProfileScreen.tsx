import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {IMAGES} from '../../constants/images';
import ScreenLayout from '../../components/screenLoyout/ScreenLayout';
import styles from './ProfileScreenStyle';
import Input from '../../components/input/Input';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';

const ProfileScreen = ({navigation}: any) => {
  // const navigation = useNavigation();
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

  const handleSignOut = async () => {
    try {
      await auth().signOut();
      navigation.replace('WelcomeScreen');
    } catch (error) {
      console.log('Error signing out:', error);
    }
  };

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

  return (
    <ScreenLayout
      showBackButton={true}
      topbarProps={
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Profile</Text>
        </View>
      }>
      {loading ? (
        <ActivityIndicator size="large" color="#FF6347" />
      ) : (
        <View style={styles.content}>
          <View style={styles.profileImageContainer}>
            <Image source={IMAGES.profilep} style={styles.profileImage} />
            <View style={styles.editIconContainer}>
              <Image source={IMAGES.edit} style={styles.editIcon} />
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your full name"
              placeholderTextColor="gray"
              value={fullName}
              onChangeText={setFullName}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Date of Birth</Text>
            <Input
              style={styles.input}
              placeholder="DD / MM / YYYY"
              placeholderTextColor="gray"
              value={dob}
              onChangeText={setDob}
              editable={true}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Email</Text>
            <Input
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="gray"
              keyboardType="email-address"
              value={email}
              editable={false}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your phone number"
              placeholderTextColor="gray"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />
          </View>

          <TouchableOpacity
            style={styles.updateButton}
            onPress={handleUpdateProfile}>
            <Text style={styles.updateButtonText}>Update Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.updateButton} onPress={handleSignOut}>
            <Text style={styles.updateButtonText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScreenLayout>
  );
};

export default ProfileScreen;
