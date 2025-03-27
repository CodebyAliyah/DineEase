import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, StyleSheet} from 'react-native';
import HomeScreen from '../../screens/homeScreen/HomeScreen';
import MenuScreen from '../../screens/menuScreen/MenuScreen';
import AddproductScreen from '../../screens/AddProductScreen/AddProductScreen';
import OrderScreen from '../../screens/orderScreen/OrderScreen';
import SupportScreen from '../../screens/supportScreen/SupportScreen';
import {RootStackParamList} from '../../types/type';

const Tab = createBottomTabNavigator<RootStackParamList>();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBarStyle,
        tabBarActiveTintColor: '#ffffff',
        tabBarInactiveTintColor: '#FFA07A',
        tabBarIcon: ({focused}) => {
          let iconSource;
          switch (route.name) {
            case 'Home':
              iconSource = require('../../assets/icons/home.png');
              break;
            case 'Menu':
              iconSource = require('../../assets/icons/menu.png');
              break;
            case 'Product':
              iconSource = require('../../assets/images/plus.png');
              break;
            case 'Orders':
              iconSource = require('../../assets/icons/order.png');
              break;
            case 'Support':
              iconSource = require('../../assets/icons/support.png');
              break;
            default:
              iconSource = require('../../assets/icons/home.png');
          }

          return (
            <Image
              source={iconSource}
              style={[
                styles.icon,
                {tintColor: focused ? '#ffffff' : '#FFA07A'},
              ]}
            />
          );
        },
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Menu" component={MenuScreen} />
      <Tab.Screen name="Product" component={AddproductScreen} />
      <Tab.Screen name="Orders" component={OrderScreen} />
      <Tab.Screen name="Support" component={SupportScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: '#E84E1B',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: 60,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 0,
  },
  icon: {
    width: 27,
    height: 30,
    resizeMode: 'contain',
  },
});

export default BottomTabNavigator;
