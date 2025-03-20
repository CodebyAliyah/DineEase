import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from '../bottom/BottomTabNavigator';
import ProfileScreen from '../../screens/profileScreen/ProfileScreen';
import HelpFaqsScreen from '../../screens/helpFaqsScreen/HelpFaqsScreen';
import OrderScreen from '../../screens/orderScreen/OrderScreen';
import CustomDrawer from '../../components/drawer/Drawer';

const Drawer = createDrawerNavigator();

export const DrawerNavigation: React.FC = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={(props) => <CustomDrawer {...props} />}
        screenOptions={{ headerShown: false }}
      >
        <Drawer.Screen name="Home" component={BottomTabNavigator} />
        <Drawer.Screen name="Profile" component={ProfileScreen} />
        <Drawer.Screen name="Orders" component={OrderScreen} />
        <Drawer.Screen name="FAQs" component={HelpFaqsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
