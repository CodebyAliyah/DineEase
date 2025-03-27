import React from 'react';
import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../../types/type';
import ScreenLayout from '../../components/screenLoyout/ScreenLayout';
import styles from './CartScreenStyle';
import useCart from './useCart';

const CartScreen = () => {
  const {cartItems, removeItem, updateQuantity, totalPrice} = useCart();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const navigateToCheckout = () => {
    navigation.navigate('CheckoutScreen');
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
                    source={{uri: item.image}}
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
                        updateQuantity(item.productId, item.quantity - 1)
                      }>
                      <Text style={styles.quantityButtonText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantity}>{item.quantity}</Text>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() =>
                        updateQuantity(item.productId, item.quantity + 1)
                      }>
                      <Text style={styles.quantityButtonText}>+</Text>
                    </TouchableOpacity>
                  </View>

                  {/* Remove Item Button */}
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => removeItem(item.productId)}>
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

export default CartScreen;
