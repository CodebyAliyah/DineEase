import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "../../screens/wecomeScreen/Welcome";
import LoginScreen from "../../screens/auth/loginScreen/Login";
import SignupScreen from "../../screens/auth/signUpScreen/SignUp";
import ForgotPasswordScreen from "../../screens/auth/forgetPasswordScreen/ForgetPasswordScreen";
import ProfileScreen from "../../screens/profileScreen/ProfileScreen";
import { RootStackParamList } from "../../types/type";

const Stack = createStackNavigator<RootStackParamList>();

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="WelcomeScreen" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignUpScreen" component={SignupScreen} />
      <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
