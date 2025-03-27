import React, {ReactNode} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import {IMAGES} from '../../constants/images';
import {useNavigation} from '@react-navigation/native';
import styles from './Scree.LayoutStyle';
import {ScreenLayoutProps} from '../../types/type';

const ScreenLayout: React.FC<ScreenLayoutProps> = ({
  children,
  topbarProps,
  showBackButton = true,
  subBarProps,
}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {showBackButton && (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Image source={IMAGES.back} style={styles.backIcon} />
        </TouchableOpacity>
      )}

      <View style={styles.topSection}>
        {typeof topbarProps === 'string' ? (
          <Text style={styles.topText}>{topbarProps}</Text>
        ) : (
          topbarProps
        )}
      </View>
      {subBarProps && <View>{subBarProps}</View>}
      <View style={styles.bottomSection}>
        <View style={styles.innerContainer}>{children}</View>
      </View>
    </View>
  );
};

export default ScreenLayout;
