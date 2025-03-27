import {useEffect, useMemo} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/useStore';
import {
  fetchUserData,
  removeItemAndSync,
  removeItemFromCart,
  updateCartItemQuantityAndSync,
  clearCart,
  updateUserData,
} from '../../store/slices/userSlice';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {RootState} from '../../store/store';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../../types/type';

export const useCheckout = () => {
  const user = auth().currentUser;
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const cartItems =
    useAppSelector((state: RootState) => state.user.cart.cartItems) || [];

  useEffect(() => {
    if (user?.uid) {
      dispatch(fetchUserData(user.uid));
    }
  }, [dispatch, user]);

  const totalPrice = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  }, [cartItems]);

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

      dispatch(
        updateUserData({userId: user.uid, cartItems: [], totalAmount: 0}),
      );

      navigation.navigate('ConfirmOrderScreen');
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  const handleRemoveItem = (productId: string) => {
    dispatch(removeItemFromCart({productId}));
    dispatch(removeItemAndSync({productId}));
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity > 0) {
      dispatch(updateCartItemQuantityAndSync({productId, quantity}));
    }
  };

  return {
    cartItems,
    totalPrice,
    placeOrder,
    handleRemoveItem,
    handleUpdateQuantity,
  };
};
