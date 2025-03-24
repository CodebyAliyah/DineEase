// screens/SetPasswordScreen.tsx
import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Input from "../../../components/input/Input";
import Button from "../../../components/button/Button";
import { useSetPassword } from "./useSetPassword";

const SetPasswordScreen: React.FC = () => {
  const [password, setPasswordValue] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { setPassword, loading } = useSetPassword();

  const handleSetPassword = async () => {
    await setPassword(password, confirmPassword);
    setPasswordValue("");
    setConfirmPassword("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Set Password</Text>

      <Input
        label="Password"
        placeholder="********"
        value={password}
        onChangeText={setPasswordValue}
        isPassword
      />

      <Input
        label="Confirm Password"
        placeholder="********"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        isPassword
      />

      <Button
        title={loading ? "Updating..." : "Create New Password"}
        onPress={handleSetPassword}
        disabled={loading}
      />
    </View>
  );
};

export default SetPasswordScreen;

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
    marginBottom: 20,
  },
});
