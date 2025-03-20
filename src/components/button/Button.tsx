
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

import { ButtonProps } from "../../types/type";

const Button: React.FC<ButtonProps> = ({ title, onPress, variant = "primary" }) => {
  return (
    <TouchableOpacity
      style={[styles.button, variant === "secondary" ? styles.secondaryButton : styles.primaryButton]}
      onPress={onPress}
    >
      <Text style={[styles.text, variant === "secondary" ? styles.secondaryText : styles.primaryText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "80%",
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: "center",
    marginVertical: 5,
  },
  primaryButton: {
    backgroundColor: "#FFD166",
  },
  secondaryButton: {
    backgroundColor: "#FFECB5",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
  primaryText: {
    color: "#7D3E00",
  },
  secondaryText: {
    color: "#C76C00",
  },
});

export default Button;
