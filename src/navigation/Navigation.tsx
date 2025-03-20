import React, { useEffect, useState } from "react";
import auth from "@react-native-firebase/auth";
import AuthStack from "../navigation/stack/AuthStackNavigation";
import { View, ActivityIndicator } from "react-native";
import { StackNavigation } from "./stack/StackNavigation";


const Navigation = () => {
  // const [user, setUser] = useState<null | object>(null);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const unsubscribe = auth().onAuthStateChanged((authUser) => {
  //     setUser(authUser);
  //     setLoading(false);
  //   });

  //   return unsubscribe;
  // }, []);

  // if (loading) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
  //       <ActivityIndicator size="large" color="#0000ff" />
  //     </View>
  //   );
  // }

  return   <StackNavigation />
};

export default Navigation;
