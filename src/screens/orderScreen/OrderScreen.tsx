// import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import auth from "@react-native-firebase/auth";
// import React from 'react';

// const OrderScreen = () => {
//   const handleSignOut = async () => {
//     try {
//       await auth().signOut();
//       console.log('User signed out successfully');
//     } catch (error) {
//       console.error('Error signing out: ', error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity 
//         style={styles.signOutButton} 
//         onPress={handleSignOut}
//       >
//         <Text style={styles.signOutText}>
//           Sign out
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default OrderScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   signOutButton: {
//     backgroundColor: '#f44336',
//     padding: 10,
//     borderRadius: 5,
//   },
//   signOutText: {
//     color: 'white',
//     fontWeight: 'bold',
//   }
// });

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import ScreenLayout from '../../components/screenLoyout/ScreenLayout';

// Hooks and actions from your Redux store
import { useAppDispatch } from '../../hooks/useStore';
import { addItemToCart, updateUserData } from '../../redux/slices/userSlice';
import { store } from '../../redux/store';

// Navigation imports
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types/type';

const OrderScreen = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const user = auth().currentUser;
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // Fetch completed orders for the current user
  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;

      try {
        const snapshot = await firestore()
          .collection('orders')
          .where('userId', '==', user.uid)
          .where('status', '==', 'completed')
          .get();

        const userOrders = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(userOrders);
      } catch (error) {
        console.log('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [user]);

  // Helper to format Firestore timestamps
  const formatDate = (firestoreDate: any) => {
    if (!firestoreDate) return '';
    const dateObj = firestoreDate.toDate ? firestoreDate.toDate() : new Date(firestoreDate);
    // Example: "29 Nov, 01:20 pm"
    return dateObj.toLocaleString([], {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  // When user taps "Order Again"
  const handleOrderAgain = (order: any) => {
    if (!order?.items) return;

    // 1. Add each item to the Redux cart
    order.items.forEach((item: any) => {
      dispatch(
        addItemToCart({
          item: {
            productId: item.productId,
            name: item.name,
            price: item.price,
            image: item.image,
            quantity: item.quantity,
            totalPrice: item.price * item.quantity,
            toppings: item.toppings || [],
            length: 0, // If your CartItem type requires this
          },
        })
      );
    });

    // 2. Update Firestore with the latest cart data
    const { cartItems, totalAmount } = store.getState().user.cart;
    if (user?.uid) {
      dispatch(
        updateUserData({
          userId: user.uid,
          cartItems,
          totalAmount,
        })
      );
    }

    // 3. Navigate to the Cart screen
    navigation.navigate('CartScreen');
  };

  // Render each completed order as a card
  const renderOrderItem = ({ item }: { item: any }) => {
    // Display the first item’s image & name
    const firstItem = item.items?.[0];
    const orderImage = firstItem?.image || '';
    const orderName = firstItem?.name || 'Unknown Item';

    // Calculate total items in the order
    const totalItems =
      item.items?.reduce((acc: number, i: any) => acc + (i.quantity || 1), 0) || 0;

    return (
      <View style={styles.orderCard}>
        <Image source={{ uri: orderImage }} style={styles.orderImage} />
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
            onPress={() => handleOrderAgain(item)}
          >
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
            keyExtractor={(item) => item.id}
            renderItem={renderOrderItem}
            contentContainerStyle={styles.listContent}
          />
        )}
      </View>
    </ScreenLayout>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  noOrdersText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginTop: 40,
  },
  listContent: {
    paddingBottom: 20,
  },
  orderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginBottom: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 2,
  },
  orderImage: {
    width: '100%',
    height: 130,
    borderRadius: 8,
    marginBottom: 10,
    resizeMode: 'cover',
  },
  orderInfo: {
    marginBottom: 8,
  },
  orderName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  orderDate: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  deliveredText: {
    color: '#FF6A6A',
  },
  priceItemsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 5,
  },
  orderPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6A6A',
  },
  itemCount: {
    fontSize: 14,
    color: '#666',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  reviewButton: {
    borderWidth: 1,
    borderColor: '#FF6A6A',
    borderRadius: 5,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  reviewButtonText: {
    color: '#FF6A6A',
    fontWeight: 'bold',
    fontSize: 13,
  },
  orderAgainButton: {
    borderWidth: 1,
    borderColor: '#FF6A6A',
    borderRadius: 5,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#FF6A6A',
  },
  orderAgainButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 13,
  },
});
