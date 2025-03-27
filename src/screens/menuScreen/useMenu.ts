import {useEffect, useMemo, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {useAppDispatch, useAppSelector} from '../../hooks/useStore';
import {fetchProducts} from '../../store/slices/productSlice';
import {removeItemFromCart, updateUserData} from '../../store/slices/userSlice';
import {store} from '../../store/store';
import {Product} from '../../types/type';

const useMenu = () => {
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const {productsByCategory, loading, error} = useAppSelector(
    state => state.product,
  ) as {
    productsByCategory: Record<string, Product[]>;
    loading: boolean;
    error: string | null;
  };

  const {cartItems} = useAppSelector(state => state.user.cart) as {
    cartItems: any[];
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const activeProducts = useMemo(() => {
    return activeCategory === 'all'
      ? Object.values(productsByCategory).flat()
      : productsByCategory?.[activeCategory] || [];
  }, [productsByCategory, activeCategory]);

  const filteredProducts = useMemo(() => {
    if (!searchTerm) return activeProducts;
    return activeProducts.filter(product =>
      product?.name?.toLowerCase()?.includes(searchTerm.toLowerCase()),
    );
  }, [searchTerm, activeProducts]);

  const handleRemoveProduct = (productId: string) => {
    dispatch(removeItemFromCart({productId}));

    const {cartItems, totalAmount} = store.getState().user.cart;

    const userId = auth().currentUser?.uid;
    if (userId) {
      dispatch(updateUserData({userId, cartItems, totalAmount}));
    }
  };

  return {
    searchTerm,
    setSearchTerm,
    activeCategory,
    setActiveCategory,
    filteredProducts,
    loading,
    error,
    cartItems,
    handleRemoveProduct,
  };
};

export default useMenu;
