import {useNavigation, NavigationProp} from '@react-navigation/native';
import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {slides} from '../../constants/onBoarding';
import styles from './OnBoardingStyle';
const OnBoardingScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  type RootStackParamList = {
    MainApp: {screen: string};
  };

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      navigation.navigate('MainApp', {screen: 'Home'});
    }
  };

  return (
    <View style={styles.container}>
      <Image source={slides[currentIndex].image} style={styles.image} />

      <View style={styles.bottomContainer}>
        {slides[currentIndex].icon && (
          <Image source={slides[currentIndex].icon} style={styles.icon} />
        )}

        <Text style={styles.title}>{slides[currentIndex].title}</Text>
        <Text style={styles.description}>
          {slides[currentIndex].description}
        </Text>

        <View style={styles.pagination}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[styles.dot, currentIndex === index && styles.activeDot]}
            />
          ))}
        </View>

        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>
            {currentIndex === slides.length - 1 ? 'Get Started' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OnBoardingScreen;
