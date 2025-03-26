// import React, {useEffect} from 'react';
// import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
// import {
//   fetchUserData,
//   removeItemAndSync,
//   removeItemFromCart,
//   updateCartItemQuantityAndSync,
// } from '../../redux/slices/userSlice';
// import {useAppDispatch, useAppSelector} from '../../hooks/useStore';
// import ScreenLayout from '../../components/screenLoyout/ScreenLayout';
// import auth from '@react-native-firebase/auth';

// const CartScreen = () => {
//   const user = auth().currentUser;
//   const cartItems = useAppSelector(state => state.user.cart.cartItems) || [];
//   const dispatch = useAppDispatch();

//   useEffect(() => {
//     dispatch(fetchUserData(user?.uid as string));
//   }, [dispatch, user]);

//   const handleRemoveItem = (productId: string) => {
//     dispatch(removeItemFromCart({productId}));
//     dispatch(removeItemAndSync({productId}));
//   };

//   const handleUpdateQuantity = (productId: string, quantity: number) => {
//     if (quantity > 0) {
//       dispatch(updateCartItemQuantityAndSync({productId, quantity}));
//     }
//   };

//   const totalPrice = cartItems.reduce(
//     (total, item) => total + item.price * item.quantity,
//     0,
//   );

//   const navigateToCheckout = () => {
//     // Assuming you have a navigation setup
//     navigation.navigate('CheckoutScreen');
//   };

//   return (
//     <ScreenLayout topbarProps="Your Cart" showBackButton={true}>
//       <View style={styles.container}>
//         {cartItems.length === 0 ? (
//           <Text style={styles.emptyCartText}>Your cart is empty</Text>
//         ) : (
//           <>
//             <FlatList
//               data={cartItems}
//               keyExtractor={(item, index) =>
//                 item.productId ? `${item.productId}-${index}` : `item-${index}`
//               }
//               renderItem={({item}) => (
//                 <View style={styles.itemContainer}>
//                   <Text style={styles.itemName}>
//                     {item.name || 'Unnamed Item'}
//                   </Text>
//                   <Text style={styles.itemPrice}>
//                     ${(item.price * item.quantity).toFixed(2)}
//                   </Text>
//                   {item.toppings?.length > 0 && (
//                     <Text style={styles.toppingsText}>
//                       Toppings:{' '}
//                       {item.toppings
//                         .map((t: any) =>
//                           typeof t.name === 'string' ? t.name : 'Unknown',
//                         )
//                         .join(', ')}
//                     </Text>
//                   )}
//                   <View style={styles.quantityContainer}>
//                     <TouchableOpacity
//                       onPress={() =>
//                         item.quantity > 1 &&
//                         handleUpdateQuantity(item.productId, item.quantity - 1)
//                       }>
//                       <Text style={styles.button}>-</Text>
//                     </TouchableOpacity>
//                     <Text style={styles.quantity}>{item.quantity}</Text>
//                     <TouchableOpacity
//                       onPress={() =>
//                         handleUpdateQuantity(item.productId, item.quantity + 1)
//                       }>
//                       <Text style={styles.button}>+</Text>
//                     </TouchableOpacity>
//                   </View>
//                   <TouchableOpacity
//                     onPress={() => handleRemoveItem(item.productId)}>
//                     <Text style={styles.removeButton}>Remove</Text>
//                   </TouchableOpacity>
//                 </View>
//               )}
//             />
//             <View style={styles.totalContainer}>
//               <Text style={styles.totalText}>
//                 Total: ${totalPrice.toFixed(2)}
//               </Text>
//               <TouchableOpacity
//                 style={styles.checkoutButton}
//                 onPress={navigateToCheckout}>
//                 <Text style={styles.checkoutButtonText}>
//                   Proceed to Checkout
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </>
//         )}
//       </View>
//     </ScreenLayout>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#f8f9fa',
//   },
//   emptyCartText: {
//     fontSize: 18,
//     textAlign: 'center',
//     marginTop: 20,
//     color: '#6c757d',
//   },
//   itemContainer: {
//     padding: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: '#dee2e6',
//     backgroundColor: '#ffffff',
//     borderRadius: 5,
//     marginBottom: 10,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.1,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   itemName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#343a40',
//   },
//   itemPrice: {
//     fontSize: 16,
//     color: '#28a745',
//     marginTop: 5,
//   },
//   toppingsText: {
//     fontSize: 14,
//     color: '#6c757d',
//     marginTop: 5,
//   },
//   quantityContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   button: {
//     fontSize: 20,
//     paddingHorizontal: 10,
//     backgroundColor: '#e9ecef',
//     borderRadius: 5,
//     marginHorizontal: 5,
//     color: '#495057',
//   },
//   quantity: {
//     fontSize: 18,
//     color: '#495057',
//   },
//   removeButton: {
//     color: '#dc3545',
//     marginTop: 10,
//     fontWeight: 'bold',
//   },
//   totalContainer: {
//     padding: 20,
//     backgroundColor: '#ffffff',
//     borderTopWidth: 1,
//     borderTopColor: '#dee2e6',
//     alignItems: 'center',
//   },
//   totalText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#343a40',
//   },
//   checkoutButton: {
//     marginTop: 10,
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     backgroundColor: '#007bff',
//     borderRadius: 5,
//   },
//   checkoutButtonText: {
//     color: '#ffffff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

// export default CartScreen;
import React, {useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {
  fetchUserData,
  removeItemAndSync,
  removeItemFromCart,
  updateCartItemQuantityAndSync,
} from '../../redux/slices/userSlice';
import {useAppDispatch, useAppSelector} from '../../hooks/useStore';
import ScreenLayout from '../../components/screenLoyout/ScreenLayout';
import auth from '@react-native-firebase/auth';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types/type'; // Adjust the path as necessary

const CartScreen = () => {
  const user = auth().currentUser;
  const cartItems = useAppSelector(state => state.user.cart.cartItems) || [];
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUserData(user?.uid as string));
  }, [dispatch, user]);

  const handleRemoveItem = (productId: string) => {
    dispatch(removeItemFromCart({productId}));
    dispatch(removeItemAndSync({productId}));
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity > 0) {
      dispatch(updateCartItemQuantityAndSync({productId, quantity}));
    }
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const navigateToCheckout = () => {
    navigation.navigate('CheckoutScreen'); // Navigate to CheckoutScreen
  };

  return (
    <ScreenLayout topbarProps="Cart" showBackButton={true}>
      <View style={styles.container}>
        <Text style={styles.headerText}>
          You have {cartItems.length} items in the cart
        </Text>
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
                  <View style={styles.itemDetails}>
                    <Text style={styles.itemName}>
                      {item.name || 'Unnamed Item'}
                    </Text>
                    <Text style={styles.itemDate}>
                      {new Date().toLocaleDateString()} | 15:00
                    </Text>
                    <Text style={styles.itemPrice}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </Text>
                  </View>
                  <View style={styles.quantityContainer}>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() =>
                        item.quantity > 1 &&
                        handleUpdateQuantity(item.productId, item.quantity - 1)
                      }>
                      <Text style={styles.quantityButtonText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantity}>{item.quantity}</Text>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() =>
                        handleUpdateQuantity(item.productId, item.quantity + 1)
                      }>
                      <Text style={styles.quantityButtonText}>+</Text>
                    </TouchableOpacity>
                  </View>

                  {/* Remove Item Button */}
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => handleRemoveItem(item.productId)}>
                    <Text style={styles.removeButtonText}>Remove</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
            <View style={styles.summaryContainer}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Subtotal</Text>
                <Text style={styles.summaryValue}>
                  ${totalPrice.toFixed(2)}
                </Text>
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
                style={styles.checkoutButton}
                onPress={navigateToCheckout}>
                <Text style={styles.checkoutButtonText}>Checkout</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF5722',
    paddingTop: 20,
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  emptyCartText: {
    fontSize: 18,
    textAlign: 'center',
    color: 'white',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginBottom: 10,
    padding: 15,
    borderRadius: 10,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 5,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  itemDate: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
  },
  itemPrice: {
    fontSize: 16,
    color: '#FF5722',
    marginTop: 5,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: '#F0F0F0',
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  quantityButtonText: {
    fontSize: 18,
    color: '#333',
  },
  quantity: {
    marginHorizontal: 10,
    fontSize: 16,
  },
  removeButton: {
    marginLeft: 10,
    paddingVertical: 5,
    paddingHorizontal: 8,
    backgroundColor: '#F0F0F0',
    borderRadius: 5,
  },
  removeButtonText: {
    color: '#FF5722',
    fontSize: 14,
    fontWeight: 'bold',
  },
  summaryContainer: {
    backgroundColor: '#FF5722',
    marginHorizontal: 20,
    marginTop: 10,
    padding: 20,
    borderRadius: 10,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: 'white',
  },
  summaryValue: {
    fontSize: 14,
    color: 'white',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#FFF',
    paddingTop: 10,
    marginTop: 5,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  checkoutButton: {
    backgroundColor: '#FFC107',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  checkoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CartScreen;

