import React, { useState } from "react";
import { TextInput, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { InputProps } from "../../types/type";

const Input: React.FC<InputProps> = ({
  label,
  placeholder = "",
  value,
  onChangeText,
  isPassword = false,
}) => {
  const [secureText, setSecureText] = useState(isPassword);

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#7a6f6f"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureText}
          autoCapitalize="none"
        />
        {isPassword && (
          <TouchableOpacity
            onPress={() => setSecureText(!secureText)}
            style={styles.icon}
          >
            <Ionicons
              name={secureText ? "eye-off" : "eye"}
              size={20}
              color="#7D3E00"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    width: "90%",
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: "#7D3E00", // Dark brown for the label
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF2C5", // Light yellow background
    borderRadius: 10,
    paddingHorizontal: 10,
    // Removed border and borderColor
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: "#3b2f2f", // Dark brown text color
  },
  icon: {
    padding: 5,
  },
});
