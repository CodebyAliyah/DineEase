// screens/SetPasswordScreen.tsx
import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Input from "../../../components/input/Input";
import Button from "../../../components/button/Button";

const SetPasswordScreen: React.FC = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Set Password</Text>
      <Input label="Password" placeholder="********" value={password} onChangeText={setPassword} isPassword />
      <Input label="Confirm Password" placeholder="********" value={confirmPassword} onChangeText={setConfirmPassword} isPassword />
      <Button title="Create New Password" onPress={() => console.log("Password Set!")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFD166",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF6B35",
  },
});

export default SetPasswordScreen;
