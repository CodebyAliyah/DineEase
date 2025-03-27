import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Product} from '../../types/type';
import {useNavigation} from '@react-navigation/native';
import styles from './ProductCartStyle';

interface ProductCardProps {
  product: Product;
  onRemove: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({product}) => {
  const navigation = useNavigation();
  const rating = product.rating ?? 0;
  const displayRating = rating.toFixed(1);
  console.log('Image URL:', product.imageUrl);
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('ProductDetailScreen', {product})}
      style={styles.card}>
      {product.imageUrl ? (
        <Image source={{uri: product.imageUrl}} style={styles.image} />
      ) : (
        <View style={[styles.image, styles.imagePlaceholder]}>
          <Text style={styles.placeholderText}>No Image</Text>
        </View>
      )}

      <View style={styles.cardContent}>
        {/* Title & Rating Row */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{product.title || product.name}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingStar}>⭐</Text>
            <Text style={styles.ratingText}>{displayRating}</Text>
          </View>
        </View>

        {/* Description */}
        <Text style={styles.description} numberOfLines={2}>
          {product.description}
        </Text>

        {/* Price */}
        <Text style={styles.price}>${(product.price ?? 0).toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;
