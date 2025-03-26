import { StyleProp, TextStyle } from 'react-native';
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

export type ButtonProps = {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  disabled:boolean;
};


export type InputProps = {
  label?: string;
  placeholder?: string;
  value?: string;
  style?: StyleProp<TextStyle>;
  onChangeText?: (text: string) => void;
  isPassword?: boolean;
  placeholderTextColor?: string;
  secureTextEntry?:boolean;
  keyboardType?:string;
  multiline?:boolean;
  numberOfLines?:number;
  editable?:boolean;
};


export type RootStackParamList = {
  HomeScreen:undefined;
  WelcomeScreen: undefined;
  ProfileScreen: undefined;
  LoginScreen: undefined;
  SignUpScreen: undefined;
  SetPassword: undefined;
  ForgotPasswordScreen: undefined;
  OnBoardingScreen: undefined;
  CartScreen:undefined;
  MainApp: undefined;
  Home: undefined;
  CheckoutScreen: undefined;
  navigate: undefined;
  Menu:undefined;
  Product:undefined;
  Orders:undefined;
  Support:undefined;
  ProductDetailScreen: { product: Product };
  itemScreen:undefined;
  ConfirmOrderScreen:undefined;
};

type BottomTabParamList = {
  MainApp:{
    screen?: "Home";
  }
}

export type Product = {
  id?: string;
  title?: string;
  name?: string;
  description?: string;
  price?: number;
  category?: 'snacks' | 'meals' | 'dessert' | 'drinks' | 'vegan';
  imageUrl?: string;
  rating?: number
  length : number;
  map: (callback: (topping: { id: string; name: string; price: number }) => any) => any[];
  }


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
}


export type navigationProps = BottomTabNavigationProp<BottomTabParamList>;