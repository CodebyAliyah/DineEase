import React, {useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {
  fetchUserData,
  removeItemAndSync,
  removeItemFromCart,
  updateCartItemQuantityAndSync,
  clearCart,
  updateUserData, // <-- Make sure this is imported
} from '../../redux/slices/userSlice';
import {useAppDispatch, useAppSelector} from '../../hooks/useStore';
import ScreenLayout from '../../components/screenLoyout/ScreenLayout';
import auth from '@react-native-firebase/auth';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types/type'; // Adjust the path if needed
import { RootState } from '../../redux/store';
import firestore from '@react-native-firebase/firestore';

const CheckoutScreen = () => {
  const user = auth().currentUser;
  const cartItems = useAppSelector((state: RootState) => state.user.cart.cartItems) || [];
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    if (user?.uid) {
      dispatch(fetchUserData(user.uid));
    }
  }, [dispatch, user]);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const placeOrder = async () => {
    if (!user) return;

    try {
      await firestore().collection('orders').add({
        userId: user.uid,
        items: cartItems,
        totalPrice: totalPrice,
        status: 'completed',
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

      dispatch(clearCart());

      dispatch(updateUserData({
        userId: user.uid,
        cartItems: [],
        totalAmount: 0,
      }));

      navigation.navigate('ConfirmOrderScreen');

    } catch (error) {
      console.error('Error placing order:', error);
    }
  };


  // Remove item from cart
  const handleRemoveItem = (productId: string) => {
    dispatch(removeItemFromCart({productId}));
    dispatch(removeItemAndSync({productId}));
  };

  // Update item quantity
  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity > 0) {
      dispatch(updateCartItemQuantityAndSync({productId, quantity}));
    }
  };

  return (
    <ScreenLayout topbarProps="Order Summary" showBackButton={true}>
      <View style={styles.container}>
        {cartItems.length === 0 ? (
          <Text style={styles.emptyCartText}>Your cart is empty</Text>
        ) : (
          <>
            <FlatList
              data={cartItems}
              keyExtractor={(item, index) =>
                item.productId ? `${item.productId}-${index}` : `item-${index}`
              }
              renderItem={({item}) => (
                <View style={styles.itemContainer}>
                  <Image
                    source={{ uri: item.image }}
                    style={styles.productImage}
                  />
                  <View style={styles.itemInfoContainer}>
                    <View style={styles.itemHeader}>
                      <Text style={styles.itemName}>
                        {item.name || 'Unnamed Item'}
                      </Text>
                      <View style={styles.priceItemsContainer}>
                        <Text style={styles.itemPrice}>
                          ${(item.price * item.quantity).toFixed(2)}
                        </Text>
                        <Text style={styles.itemCount}>
                          {item.quantity > 1
                            ? `${item.quantity} items`
                            : `${item.quantity} item`}
                        </Text>
                      </View>
                    </View>
                    <Text style={styles.itemDate}>
                      {new Date().toLocaleDateString()}, 15:00 pm
                    </Text>
                    <TouchableOpacity
                      style={styles.cancelOrderButton}
                      onPress={() => handleRemoveItem(item.productId)}
                    >
                      <Text style={styles.cancelOrderButtonText}>Cancel Order</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.quantityContainer}>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() =>
                        item.quantity > 1 &&
                        handleUpdateQuantity(item.productId, item.quantity - 1)
                      }
                    >
                      <Text style={styles.quantityButtonText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantity}>{item.quantity}</Text>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() =>
                        handleUpdateQuantity(item.productId, item.quantity + 1)
                      }
                    >
                      <Text style={styles.quantityButtonText}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />

            <View style={styles.summaryContainer}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Subtotal</Text>
                <Text style={styles.summaryValue}>${totalPrice.toFixed(2)}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Tax and Fees</Text>
                <Text style={styles.summaryValue}>$5.00</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Delivery</Text>
                <Text style={styles.summaryValue}>$3.00</Text>
              </View>
              <View style={[styles.summaryRow, styles.totalRow]}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>
                  ${(totalPrice + 8).toFixed(2)}
                </Text>
              </View>

              <TouchableOpacity
                style={styles.placeOrderButton}
                onPress={placeOrder}
              >
                <Text style={styles.placeOrderButtonText}>Place Order</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </ScreenLayout>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F6',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  emptyCartText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginTop: 40,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginBottom: 15,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 2,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 10,
  },
  itemInfoContainer: {
    flex: 1,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    maxWidth: '60%',
  },
  priceItemsContainer: {
    alignItems: 'flex-end',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6A6A',
  },
  itemCount: {
    fontSize: 12,
    color: '#555',
    marginTop: 2,
  },
  itemDate: {
    fontSize: 12,
    color: '#999',
    marginVertical: 6,
  },
  cancelOrderButton: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: '#FF6A6A',
    borderRadius: 5,
  },
  cancelOrderButtonText: {
    color: '#FF6A6A',
    fontWeight: 'bold',
    fontSize: 13,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    marginTop: 5,
  },
  quantityButton: {
    backgroundColor: '#FFF1EE',
    borderRadius: 5,
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 3,
  },
  quantityButtonText: {
    fontSize: 16,
    color: '#FF6A6A',
    fontWeight: 'bold',
  },
  quantity: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
  },
  summaryContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    marginTop: 5,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 2,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#555',
  },
  summaryValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    paddingTop: 10,
    marginTop: 10,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6A6A',
  },
  placeOrderButton: {
    backgroundColor: '#FFE0D3',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  placeOrderButtonText: {
    fontSize: 16,
    color: '#FF6A6A',
    fontWeight: 'bold',
  },
});
