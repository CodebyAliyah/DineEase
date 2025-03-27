import {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useAppDispatch} from '../../hooks/useStore';
import {addItemToCart, updateUserData} from '../../store/slices/userSlice';
import {store} from '../../store/store';
import {useNavigation} from '@react-navigation/native';
import {NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../../types/type';

const useOrders = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const user = auth().currentUser;
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
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

  const addToCartAndUpdateUser = (order: any) => {
    if (!order?.items) return;

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
            length: 0,
          },
        }),
      );
    });

    const {cartItems, totalAmount} = store.getState().user.cart;
    if (user?.uid) {
      dispatch(
        updateUserData({
          userId: user.uid,
          cartItems,
          totalAmount,
        }),
      );
    }

    navigation.navigate('CartScreen');
  };

  return {orders, addToCartAndUpdateUser};
};

export default useOrders;
