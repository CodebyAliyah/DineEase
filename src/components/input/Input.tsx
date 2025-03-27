import React, {useState} from 'react';
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {InputProps} from '../../types/type';
import styles from './InputStyle';

const Input: React.FC<InputProps> = ({
  label,
  placeholder = '',
  value,
  onChangeText,
  isTransparent = false,
  isPassword = false,
}) => {
  const [secureText, setSecureText] = useState(isPassword);

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: isTransparent ? 'transparent' : '#FFF2C5',
          borderRadius: 10,
          height: isTransparent ? 25 : undefined,
          paddingHorizontal: !isTransparent ? 10 : undefined,
        }}>
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
            style={styles.icon}>
            <Ionicons
              name={secureText ? 'eye-off' : 'eye'}
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
