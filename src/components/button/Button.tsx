import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

import {ButtonProps} from '../../types/type';
import styles from './ButtonStyle';

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        variant === 'secondary' ? styles.secondaryButton : styles.primaryButton,
      ]}
      onPress={onPress}>
      <Text
        style={[
          styles.text,
          variant === 'secondary' ? styles.secondaryText : styles.primaryText,
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
