import React from 'react';
import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import {useCheckout} from './useChectout';
import ScreenLayout from '../../components/screenLoyout/ScreenLayout';
import styles from './CheckOutStyle';

const CheckoutScreen = () => {
  const {
    cartItems,
    totalPrice,
    placeOrder,
    handleRemoveItem,
    handleUpdateQuantity,
  } = useCheckout();

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
                    source={{uri: item.image}}
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
                      onPress={() => handleRemoveItem(item.productId)}>
                      <Text style={styles.cancelOrderButtonText}>
                        Cancel Order
                      </Text>
                    </TouchableOpacity>
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
                style={styles.placeOrderButton}
                onPress={placeOrder}>
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
