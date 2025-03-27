import {createStackNavigator} from '@react-navigation/stack';
import ProfileScreen from '../../screens/profileScreen/ProfileScreen';
import CheckoutScreen from '../../screens/checkoutScreen/CheckoutScreen';
import BottomTabNavigator from '../bottom/BottomTabNavigator';
import CartScreen from '../../screens/cartScreen/CartScreen';
import ProductDetailScreen from '../../screens/productDetailScreen/ProductDetailScreen';
import {RootStackParamList} from '../../types/type';
import OnBoardingScreen from '../../screens/onBoardingScreen/OnBoardingScreen';
import ConfirmOrderScreen from '../../screens/confirmOrderScreen/ConfirmOrderScreen';
const Stack = createStackNavigator<RootStackParamList>();

export const StackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="OnBoardingScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="MainApp" component={BottomTabNavigator} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
      <Stack.Screen name="ConfirmOrderScreen" component={ConfirmOrderScreen} />
      <Stack.Screen name="CartScreen" component={CartScreen} />
      <Stack.Screen
        name="ProductDetailScreen"
        component={ProductDetailScreen}
      />
      <Stack.Screen name="OnBoardingScreen" component={OnBoardingScreen} />
    </Stack.Navigator>
  );
};
