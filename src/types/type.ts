import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

export type ButtonProps = {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
};

export type InputProps = {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  isPassword?: boolean;
};

export type RootStackParamList = {
  WelcomeScreen: undefined;
  ProfileScreen: undefined;
  LoginScreen: undefined;
  SignUpScreen: undefined;
  SetPassword: undefined;
  ForgotPasswordScreen: undefined;
  OnBoardingScreen: undefined;
  MainApp: undefined;
  Home: undefined;
  Menu:undefined;
  Product:undefined;
  Orders:undefined;
  Support:undefined;
};

type BottomTabParamList = {
  MainApp:{
    screen?: "Home";
  }
}

export type navigationProps = BottomTabNavigationProp<BottomTabParamList>;