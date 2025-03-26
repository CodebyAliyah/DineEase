import React, {ReactNode} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import {IMAGES} from '../../constants/images';
import {useNavigation} from '@react-navigation/native';

interface ScreenLayoutProps {
  children: ReactNode;
  topbarProps: string | ReactNode;
  showBackButton?: boolean;
  subBarProps?: ReactNode;
  title?: string;
}

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFD466',
  },
  backButton: {
    position: 'absolute',
    top: 70,
    left: 22,
  },
  backIcon: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
  },
  topSection: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
  },
  bottomSection: {
    flex: 8,
    backgroundColor: 'white',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    overflow: 'hidden',
    paddingTop: 20,
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
});

export default ScreenLayout;
