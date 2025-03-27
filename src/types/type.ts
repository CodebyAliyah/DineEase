import {ImageSourcePropType, StyleProp, TextStyle} from 'react-native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {ReactNode} from 'react';

export type ButtonProps = {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  disabled: boolean;
};

export type InputProps = {
  label?: string;
  placeholder?: string;
  value?: string;
  style?: StyleProp<TextStyle>;
  onChangeText?: (text: string) => void;
  isPassword?: boolean;
  placeholderTextColor?: string;
  secureTextEntry?: boolean;
  keyboardType?: string;
  multiline?: boolean;
  numberOfLines?: number;
  editable?: boolean;
  isTransparent?: boolean;
};

export type AuthStackParamList = {
  WelcomeScreen: undefined;
  LoginScreen: undefined;
  SignUpScreen: undefined;
};

export type RootStackParamList = {
  HomeScreen: undefined;
  WelcomeScreen: undefined;
  ProfileScreen: undefined;
  LoginScreen: undefined;
  SignUpScreen: undefined;
  SetPassword: undefined;
  ForgotPasswordScreen: undefined;
  OnBoardingScreen: undefined;
  CartScreen: undefined;
  MainApp: undefined;
  Home: undefined;
  CheckoutScreen: undefined;
  navigate: undefined;
  Menu: undefined;
  Product: undefined;
  Orders: undefined;
  Support: undefined;
  ProductDetailScreen: {product: Product};
  itemScreen: undefined;
  ConfirmOrderScreen: undefined;
};

type BottomTabParamList = {
  MainApp: {
    screen?: 'Home';
  };
};

export type Product = {
  id?: string;
  title?: string;
  name?: string;
  description?: string;
  price?: number;
  category?: 'snacks' | 'meals' | 'dessert' | 'drinks' | 'vegan';
  imageUrl?: string;
  rating?: number;
  length: number;
  map: (
    callback: (topping: {id: string; name: string; price: number}) => any,
  ) => any[];
};

export type FoodItemProps = {
  image: ImageSourcePropType;
  name: string;
  price: string;
  description: string;
};

export type ScreenLayoutProps = {
  children: ReactNode;
  topbarProps: string | ReactNode;
  showBackButton?: boolean;
  subBarProps?: ReactNode;
  title?: string;
};
export type ProductState = {
  productsByCategory: {
    snacks: Product[];
    meals: Product[];
    dessert: Product[];
    drinks: Product[];
    vegan: Product[];
  };
  loading: boolean;
  error: string | null;
};

export type ProductDetailScreenProps = {
  route: {params: {product: Product}};
  navigation: BottomTabNavigationProp<BottomTabParamList>;
};

export type PickedImage = {
  uri: string;
  base64?: string;
  fileName: string;
};

export type FirestoreResponsecc = {
  success: boolean;
  productId?: string;
  error?: string;
  imageUrl?: string;
};

export type ProductInfo = {
  name?: string;
  description?: string;
  price?: number;
};

export type navigationProps = BottomTabNavigationProp<BottomTabParamList>;
