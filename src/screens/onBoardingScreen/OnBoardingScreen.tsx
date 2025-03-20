import { useNavigation } from '@react-navigation/native';
import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';

const slides = [
  {
    id: 1,
    image: require('../../assets/images/pizza.png'),
    icon: require('../../assets/images/orderfil.png'),
    title: 'Order For Food',
    description:
      'Order delicious food from your favorite restaurants with just a tap.',
  },
  {
    id: 2,
    image: require('../../assets/images/choclate.png'),
    icon: require('../../assets/images/payment.png'),
    title: 'Fast Delivery',
    description:
      'Get your food delivered hot and fresh to your doorstep in no time!',
  },
  {
    id: 3,
    image: require('../../assets/images/coffe.png'),
    icon: require('../../assets/images/deliver.png'),
    title: 'Enjoy Your Meal',
    description:
      'Savor every bite and enjoy a great dining experience at home.',
  },
];

const OnBoardingScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
const navigation = useNavigation()
  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      navigation.navigate('MainApp',{screen:"Home"});
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
            {currentIndex === slides.length - 1  ? 'Get Started' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8E1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  bottomContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    height: '45%',
  },
  icon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#EB5222',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: 'black',
    textAlign: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  pagination: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  dot: {
    width: 40,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#EB5222',
  },
  nextButton: {
    backgroundColor: '#EB5222',
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 25,
  },
  nextButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OnBoardingScreen;
