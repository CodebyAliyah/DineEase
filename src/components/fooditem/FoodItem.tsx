import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

interface FoodItemProps {
  image: any;
  name: string;
  price: string;
  description: string;
}

const FoodItem: React.FC<FoodItemProps> = ({ image, name, price, description }) => {
  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image} />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.price}>{price}</Text>
      <Text style={styles.description}>{description}</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
  },
  price: {
    fontSize: 16,
    color: 'green',
  },
  description: {
    fontSize: 14,
    color: '#555',
  },
  button: {
    backgroundColor: '#ff6600',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default FoodItem;
