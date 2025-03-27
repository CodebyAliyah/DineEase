import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/useStore';
import {
  fetchUserData,
  removeItemAndSync,
  removeItemFromCart,
  updateCartItemQuantityAndSync,
} from '../../store/slices/userSlice';
import auth from '@react-native-firebase/auth';

const useCart = () => {
  const dispatch = useAppDispatch();
  const user = auth().currentUser;
  const cartItems = useAppSelector(state => state.user.cart.cartItems) || [];

  useEffect(() => {
    if (user?.uid) {
      dispatch(fetchUserData(user.uid));
    }
  }, [dispatch, user]);

  const removeItem = (productId: string) => {
    dispatch(removeItemFromCart({productId}));
    dispatch(removeItemAndSync({productId}));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity > 0) {
      dispatch(updateCartItemQuantityAndSync({productId, quantity}));
    }
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return {cartItems, removeItem, updateQuantity, totalPrice};
};

export default useCart;
