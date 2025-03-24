import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Product } from '../../types/type';
import { useNavigation } from '@react-navigation/native';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigation = useNavigation();
  const rating = product.rating ?? 0;
  const displayRating = rating.toFixed(1); // e.g. "5.0"

  console.log("Image URL:", product.imageUrl);
  return (
    <TouchableOpacity onPress={()=> navigation.navigate("ProductDetailScreen",{ product })} style={styles.card}>
      {product.imageUrl ? (
        <Image source={{ uri: product.imageUrl }} style={styles.image} />
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

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    backgroundColor: 'white',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  imagePlaceholder: {
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 10,
    color: '#666',
  },
  cardContent: {
    padding: 12,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  ratingStar: {
    fontSize: 16,
    marginRight: 4,
    color: '#FF5722',
  },
  ratingText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#555',
  },
  description: {
    fontSize: 14,
    color: '#777',
    marginBottom: 6,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF5722',
  },
});
