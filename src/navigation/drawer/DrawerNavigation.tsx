// src/navigation/DrawerNavigation.tsx
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomTabNavigator from '../bottom/BottomTabNavigator';
import ProfileScreen from '../../screens/profileScreen/ProfileScreen';
import HelpFaqsScreen from '../../screens/helpFaqsScreen/HelpFaqsScreen';
import OrderScreen from '../../screens/orderScreen/OrderScreen';
import CustomDrawerContent from '../../components/customDrawerContent/CustomDrawerContent';

const Drawer = createDrawerNavigator();

export const DrawerNavigation: React.FC = () => {
  return (
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerShown: false,
          drawerPosition: 'left', // Drawer opens from the left
          drawerStyle: {
            backgroundColor: '#ff4d00', // Orange background as in screenshot
            width: 80, // Narrow width to match screenshot
            borderTopRightRadius: 20, // Rounded corners
            borderBottomRightRadius: 20,
          },
          drawerType: 'front', // Drawer slides over the content
          swipeEnabled: true, // Enable swipe gestures
          swipeEdgeWidth: 50, // Swipe area width from the left edge
        }}
      >
        <Drawer.Screen name="Home" component={BottomTabNavigator} />
        <Drawer.Screen name="Profile" component={ProfileScreen} />
        <Drawer.Screen name="Orders" component={OrderScreen} />
        <Drawer.Screen name="FAQs" component={HelpFaqsScreen} />
      </Drawer.Navigator>
  );
};

export default DrawerNavigation;