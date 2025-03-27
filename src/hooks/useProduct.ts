import {useEffect} from 'react';
import {
  fetchProducts,
  addProductAsync,
  removeProductAsync,
  searchProductsAsync,
} from '../store/slices/productSlice';
import {Product} from '../types/type';
import {useAppDispatch, useAppSelector} from './useStore';

export const useFetchProducts = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(state => state.product.productsByCategory);
  const loading = useAppSelector(state => state.product.loading);
  const error = useAppSelector(state => state.product.error);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return {products, loading, error};
};

export const useAddProduct = () => {
  const dispatch = useAppDispatch();

  const addOrUpdateProduct = (product: Product) => {
    dispatch(addProductAsync(product));
  };

  return {addOrUpdateProduct};
};

export const useRemoveProduct = () => {
  const dispatch = useAppDispatch();

  const removeProduct = (category: Product['category'], id: string) => {
    dispatch(removeProductAsync({category, id}));
  };

  return {removeProduct};
};

export const useSearchProducts = () => {
  const dispatch = useAppDispatch();
  const searchResults = useAppSelector(
    state => state.product.productsByCategory,
  );
  const loading = useAppSelector(state => state.product.loading);
  const error = useAppSelector(state => state.product.error);

  const searchProducts = (searchTerm: string) => {
    dispatch(searchProductsAsync(searchTerm));
  };

  return {searchProducts, searchResults, loading, error};
};
