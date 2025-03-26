import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import ScreenLayout from '../../components/screenLoyout/ScreenLayout';
import {IMAGES} from '../../constants/images';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../types/type';
import {StackNavigationProp} from '@react-navigation/stack';
import {useAppDispatch} from '../../hooks/useStore';
import firestore from '@react-native-firebase/firestore';
import {addItemToCart} from '../../redux/slices/userSlice';
import auth from '@react-native-firebase/auth';
import {TOPPINGS} from '../../constants/toppings';

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
        {/* Product image */}
        <View style={styles.imageContainer}>
          <Image
            source={{uri: product.imageUrl}}
            style={styles.productImage}
            resizeMode="cover"
          />
        </View>

        {/* Price and quantity */}
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
        {/* Product details */}
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

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
  },
  categoryText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    top: 25,
  },
  favoriteButton: {
    padding: 0,
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  productImage: {
    width: '90%',
    height: 180,
    borderRadius: 15,
  },
  priceQuantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  price: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FF6347',
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: 20,
    paddingHorizontal: 5,
  },
  quantityButton: {
    width: 30,
    height: 30,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  disabledButton: {
    opacity: 0.5,
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6347',
  },
  quantityValue: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 10,
  },
  productInfo: {
    padding: 20,
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  toppingsSection: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  toppingsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  toppingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  toppingInfo: {
    flexDirection: 'row',
    justifyContent:"space-between",
    alignItems:"center",
    flex: 1,
  },
  toppingName: {
    fontSize: 16,
  },
  toppingPrice: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  checkbox: {
    padding: 5,
  },
  spacer: {
    height: 70,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  addToCartButton: {
    backgroundColor: '#FF6347',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addToCartText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProductDetailScreen;
