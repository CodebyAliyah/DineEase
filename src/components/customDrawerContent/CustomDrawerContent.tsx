// src/components/CustomDrawerContent.tsx
import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { IMAGES } from '../../constants/images';

const CustomDrawerContent: React.FC<DrawerContentComponentProps> = (props) => {
  return (
    <View style={styles.container}>
      {/* Profile Picture */}
      <View style={styles.profileContainer}>
        <Image
          source={IMAGES.profilep}
          style={styles.profileImage}
        />
      </View>

      {/* Drawer Items */}
      <View style={styles.itemsContainer}>
        <TouchableOpacity style={styles.item}>
          <Image
            source={IMAGES.cart}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Image
            source={IMAGES.logo} // Placeholder for user icon
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Image
            source={IMAGES.logo} // Placeholder for location icon
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Image
            source={IMAGES.logo} // Placeholder for credit card icon
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Image
            source={IMAGES.logo} // Placeholder for phone icon
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Image
            source={IMAGES.logo} // Placeholder for chat icon
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Image
            source={IMAGES.logo} // Placeholder for settings icon
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Image
            source={IMAGES.logo} // Placeholder for logout icon
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff4d00', // Orange background
  },
  profileContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  itemsContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  item: {
    paddingVertical: 15,
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  },
});

export default CustomDrawerContent;