
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import ScreenLayout from '../../components/screenLoyout/ScreenLayout';
import { useAppDispatch, useAppSelector } from '../../hooks/useStore';
import { removeItemFromCart, updateCartItemQuantity,  } from '../../redux/slices/userSlice';
import { IMAGES } from '../../constants/images';
import firestore from "@react-native-firebase/firestore"
import auth from "@react-native-firebase/auth"

const CartScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { cartItems, totalAmount } = useAppSelector(state => state.user.cart);
  const [loading, setLoading] = useState(true);

  const currentUser = auth().currentUser;

  useEffect(() => {
    if (!currentUser) return;

    const fetchCartItems = async () => {
      try {
        const cartRef = firestore().collection('carts').doc(currentUser.uid);
        const doc = await cartRef.get();

        if (doc.exists) {
          const cartData = doc.data();
          dispatch(setCartItems(cartData.items || []));
        } else {
          dispatch(setCartItems([])); // Set empty cart if no data exists
        }
      } catch (error) {
        console.error('Error fetching cart items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [currentUser, dispatch]);

  const handleRemoveItem = (productId: string) => {
    dispatch(removeItemFromCart({ productId }));
    updateCartInFirestore();
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    dispatch(updateCartItemQuantity({ productId, quantity }));
    updateCartInFirestore();
  };

  const updateCartInFirestore = async () => {
    if (!currentUser) return;

    try {
      const cartRef = firestore().collection('carts').doc(currentUser.uid);
      await cartRef.set({ items: cartItems }, { merge: true });
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  const renderCartItem = ({ item }: { item: any }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
        {item.toppings?.length > 0 && (
          <Text style={styles.toppingsText}>
            Toppings: {item.toppings.map((t: any) => t.name).join(', ')}
          </Text>
        )}
      </View>
      <View style={styles.quantityControl}>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => handleUpdateQuantity(item.productId, item.quantity - 1)}
        >
          <Text style={styles.quantityButtonText}>-</Text>
        </TouchableOpacity>

        <Text style={styles.quantityText}>{item.quantity}</Text>

        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => handleUpdateQuantity(item.productId, item.quantity + 1)}
        >
          <Text style={styles.quantityButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.removeButton} onPress={() => handleRemoveItem(item.productId)}>
        <Text style={styles.removeButtonText}>✕</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6347" />
      </View>
    );
  }

  return (
    <ScreenLayout
      showBackButton={true}
      topbarProps={
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Cart</Text>
        </View>
      }>
      {cartItems.length > 0 ? (
        <View style={styles.container}>
          <FlatList
            data={cartItems}
            keyExtractor={(item, index) => `${item.productId}-${index}`}
            renderItem={renderCartItem}
            contentContainerStyle={styles.listContainer}
          />

          <View style={styles.summaryContainer}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>${totalAmount.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Delivery Fee</Text>
              <Text style={styles.summaryValue}>$2.99</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>${(totalAmount + 2.99).toFixed(2)}</Text>
            </View>

            <TouchableOpacity style={styles.checkoutButton}>
              <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.emptyCartContainer}>
          <Image source={IMAGES.plus} style={styles.emptyCartImage} />
          <Text style={styles.emptyCartText}>Your cart is empty</Text>
          <Text style={styles.emptyCartText}>Add items to get started</Text>
        </View>
      )}
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  container: {
    flex: 1,
  },
  listContainer: {
    padding: 15,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    alignItems: 'center',
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 5,
  },
  itemInfo: {
    flex: 1,
    marginLeft: 10,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
  },
  itemPrice: {
    fontSize: 14,
    color: '#FF6347',
    marginTop: 4,
  },
  toppingsText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: 15,
    padding: 3,
    marginRight: 10,
  },
  quantityButton: {
    width: 24,
    height: 24,
    backgroundColor: '#FFF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF6347',
  },
  quantityText: {
    fontSize: 12,
    fontWeight: '500',
    paddingHorizontal: 8,
  },
  removeButton: {
    marginLeft: 10,
    backgroundColor: '#FF6347',
    borderRadius: 12,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  summaryLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryContainer: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    marginTop: 10,
  },
  removeButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  emptyCartImage: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  emptyCartText: {
    fontSize: 14,
    color: '#666',
    marginTop: 10,
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  checkoutButton: {
    backgroundColor: '#FF6347',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  checkoutButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
export default CartScreen;