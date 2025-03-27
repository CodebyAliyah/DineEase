import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import styles from './FoodItemStyle';
import {FoodItemProps} from '../../types/type';

const FoodItem: React.FC<FoodItemProps> = ({
  image,
  name,
  price,
  description,
}) => {
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
export default FoodItem;
