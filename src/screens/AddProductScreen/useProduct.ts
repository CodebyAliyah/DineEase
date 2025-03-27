import {useAppDispatch, useAppSelector} from '../../hooks/useStore';
import {addProduct, removeProduct} from '../../store/slices/productSlice';
import {Product} from '../../types/type';

export const useProducts = () => {
  const dispatch = useAppDispatch();

  const productsByCategory = useAppSelector(
    state => state.product.productsByCategory,
  );

  const handleAddProduct = (product: Product) => {
    dispatch(addProduct(product));
  };
  const handleRemoveProduct = (category: Product['category'], id: string) => {
    dispatch(removeProduct({category, id}));
  };

  return {
    productsByCategory,
    handleAddProduct,
    handleRemoveProduct,
  };
};
