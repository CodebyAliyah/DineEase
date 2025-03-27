import React from 'react';
import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import ScreenLayout from '../../components/screenLoyout/ScreenLayout';
import styles from './OrderScreenStyle';
import useOrders from './useOrders';

const OrderScreen = () => {
  const {orders, addToCartAndUpdateUser} = useOrders();
  const formatDate = (firestoreDate: any) => {
    if (!firestoreDate) return '';
    const dateObj = firestoreDate.toDate
      ? firestoreDate.toDate()
      : new Date(firestoreDate);
    return dateObj.toLocaleString([], {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const renderOrderItem = ({item}: {item: any}) => {
    const firstItem = item.items?.[0];
    const orderImage = firstItem?.image || '';
    const orderName = firstItem?.name || 'Unknown Item';
    const totalItems =
      item.items?.reduce((acc: number, i: any) => acc + (i.quantity || 1), 0) ||
      0;

    return (
      <View style={styles.orderCard}>
        <Image source={{uri: orderImage}} style={styles.orderImage} />
        <View style={styles.orderInfo}>
          <Text style={styles.orderName}>{orderName}</Text>
          <Text style={styles.orderDate}>
            {formatDate(item.createdAt)} {' | '}
            <Text style={styles.deliveredText}>Order delivered</Text>
          </Text>
        </View>
        <View style={styles.priceItemsContainer}>
          <Text style={styles.orderPrice}>
            ${item.totalPrice?.toFixed(2) || '0.00'}
          </Text>
          <Text style={styles.itemCount}>
            {totalItems} {totalItems === 1 ? 'item' : 'items'}
          </Text>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.reviewButton}>
            <Text style={styles.reviewButtonText}>Leave a review</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.orderAgainButton}
            onPress={() => addToCartAndUpdateUser(item)}>
            <Text style={styles.orderAgainButtonText}>Order Again</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <ScreenLayout topbarProps="Order List" showBackButton={true}>
      <View style={styles.container}>
        {orders.length === 0 ? (
          <Text style={styles.noOrdersText}>No completed orders found.</Text>
        ) : (
          <FlatList
            data={orders}
            keyExtractor={item => item.id}
            renderItem={renderOrderItem}
            contentContainerStyle={styles.listContent}
          />
        )}
      </View>
    </ScreenLayout>
  );
};

export default OrderScreen;
