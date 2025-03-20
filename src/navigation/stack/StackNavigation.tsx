import {createStackNavigator} from '@react-navigation/stack';
import ProfileScreen from '../../screens/profileScreen/ProfileScreen';
import CheckoutScreen from '../../screens/checkoutScreen/CheckoutScreen';
import SnackScreen from '../../screens/snackScreen/SnackScreen';
import BottomTabNavigator from '../bottom/BottomTabNavigator';

const Stack = createStackNavigator();

export const StackNavigation = () => {

  return (
    <Stack.Navigator initialRouteName="MainApp" screenOptions={{headerShown: false}}>
      <Stack.Screen name="MainApp" component={BottomTabNavigator} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
      <Stack.Screen name="SnackScreen" component={SnackScreen} />
    </Stack.Navigator>
  );
};
