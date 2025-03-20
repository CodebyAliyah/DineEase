import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // ✅ Vector Icons

const CustomDrawer = (props: any) => {
  const navigation = useNavigation();

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <View style={styles.header}>
        <Icon name="account-circle" size={80} color="#fff" /> {/* ✅ Profile Icon */}
        <Text style={styles.username}>John Smith</Text>
        <Text style={styles.email}>john@example.com</Text>
      </View>

      <View style={styles.menu}>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('OrderScreen')}>
          <Icon name="cart-outline" size={24} color="#fff" />
          <Text style={styles.menuText}>My Orders</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('ProfileScreen')}>
          <Icon name="account-outline" size={24} color="#fff" />
          <Text style={styles.menuText}>My Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Address')}>
          <Icon name="map-marker-outline" size={24} color="#fff" />
          <Text style={styles.menuText}>Delivery Address</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Payments')}>
          <Icon name="credit-card-outline" size={24} color="#fff" />
          <Text style={styles.menuText}>Payment Methods</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Contact')}>
          <Icon name="phone-outline" size={24} color="#fff" />
          <Text style={styles.menuText}>Contact Us</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('FaqsScreen')}>
          <Icon name="help-circle-outline" size={24} color="#fff" />
          <Text style={styles.menuText}>Help & FAQs</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Settings')}>
          <Icon name="cog-outline" size={24} color="#fff" />
          <Text style={styles.menuText}>Settings</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#FF6347',
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  email: {
    fontSize: 14,
    color: '#fff',
  },
  menu: {
    flex: 1,
    backgroundColor: '#FF6347',
    paddingTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
  },
  menuText: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 15,
  },
});

export default CustomDrawer;
