import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import ScreenLayout from '../../components/screenLoyout/ScreenLayout';
import {IMAGES} from '../../constants/images';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../types/type';
import {StackNavigationProp} from '@react-navigation/stack';
import {useAppDispatch} from '../../hooks/useStore';
import firestore from '@react-native-firebase/firestore';
import {addItemToCart} from '../../store/slices/userSlice';
import auth from '@react-native-firebase/auth';
import {TOPPINGS} from '../../constants/toppings';
import styles from './ProductStyle';

interface Topping {
  id: string;
  name: string;
  price: number;
}

type ProductDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  'ProductDetailScreen'
>;

type ProductDetailScreenNavigationProp =
  StackNavigationProp<RootStackParamList>;

interface ProductDetailScreenProps {
  route: ProductDetailScreenRouteProp;
  navigation: ProductDetailScreenNavigationProp;
}

const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({
  route,
  navigation,
}) => {
  const {product} = route.params;
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedToppings, setSelectedToppings] = useState<Topping[]>([]);
  const dispatch = useAppDispatch();

  const calculateTotalPrice = (): number => {
    let total = (product.price ?? 0) * quantity;

    selectedToppings.forEach(topping => {
      total += topping.price;
    });

    return total;
  };

  const toggleTopping = (topping: Topping): void => {
    if (selectedToppings.find(item => item.id === topping.id)) {
      setSelectedToppings(
        selectedToppings.filter(item => item.id !== topping.id),
      );
    } else {
      setSelectedToppings([...selectedToppings, topping]);
    }
  };
  const handleAddToCart = async (): Promise<void> => {
    const currentUser = auth().currentUser;

    if (!currentUser) {
      console.log('User is not logged in');
      return;
    }

    const cartItem = {
      productId: product.id || '',
      name: product.name || '',
      price: product.price || 0,
      image: product.imageUrl || '',
      quantity: quantity,
      totalPrice: calculateTotalPrice(),
      toppings: selectedToppings.map(topping => topping.name),
      length: selectedToppings.length,
    };

    try {
      dispatch(addItemToCart({item: cartItem}));
      const userRef = firestore().collection('users').doc(currentUser.uid);
      const userSnap = await userRef.get();

      if (userSnap.exists) {
        const userData = userSnap.data();
        const currentCartItems = userData?.cart?.cartItems || [];
        const updatedCartItems = [...currentCartItems, cartItem];
        const totalAmount = updatedCartItems.reduce(
          (total, item) => total + item.totalPrice,
          0,
        );

        await userRef.update({
          cart: {
            cartItems: updatedCartItems,
            totalAmount,
          },
          updatedAt: firestore.FieldValue.serverTimestamp(),
        });
      }

      navigation.goBack();
    } catch (error) {
      console.log('Error adding item to cart:', error);
    }
  };
  const HeaderComponent = () => (
    <View style={styles.header}>
      <Text style={styles.categoryText}>{product.category}</Text>
      <TouchableOpacity style={styles.favoriteButton}>
        <Image source={IMAGES.heart} style={{width: 22, height: 22}} />
      </TouchableOpacity>
    </View>
  );

  return (
    <ScreenLayout topbarProps={<HeaderComponent />} showBackButton={true}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.imageContainer}>
          <Image
            // source={{uri: product.imageUrl}}
            style={styles.productImage}
            resizeMode="cover"
          />
        </View>

        <View style={styles.priceQuantityContainer}>
          <Text style={styles.price}>${calculateTotalPrice().toFixed(2)}</Text>
          <View style={styles.quantityControl}>
            <TouchableOpacity
              style={[
                styles.quantityButton,
                quantity <= 1 && styles.disabledButton,
              ]}
              onPress={() => quantity > 1 && setQuantity(quantity - 1)}
              disabled={quantity <= 1}>
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityValue}>{quantity}</Text>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => setQuantity(quantity + 1)}>
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productDescription}>{product.description}</Text>
        </View>
        <View style={styles.toppingsSection}>
          <Text style={styles.toppingsTitle}>Toppings</Text>
          {TOPPINGS.map(topping => (
            <View key={topping.id} style={styles.toppingItem}>
              <View style={styles.toppingInfo}>
                <Text style={styles.toppingName}>{topping.name}</Text>
                <Text style={styles.toppingPrice}>${topping.price}</Text>
              </View>
              <TouchableOpacity style={styles.checkbox}></TouchableOpacity>
            </View>
          ))}
        </View>
        <View style={styles.spacer} />
      </ScrollView>

      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={handleAddToCart}>
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </ScreenLayout>
  );
};

export default ProductDetailScreen;
