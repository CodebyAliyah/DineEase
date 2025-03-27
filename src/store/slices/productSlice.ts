import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';
import {Product, ProductState} from '../../types/type';

const initialState: ProductState = {
  productsByCategory: {
    snacks: [],
    meals: [],
    dessert: [],
    drinks: [],
    vegan: [],
  },
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk(
  'product/fetchProducts',
  async (_, {rejectWithValue}) => {
    try {
      const snapshot = await firestore().collection('products').get();
      const products: Product[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Product),
      }));

      return products;
    } catch (error) {
      console.error('Error fetching products:', error);
      return rejectWithValue(error);
    }
  },
);

export const addProductAsync = createAsyncThunk(
  'product/addProductAsync',
  async (product: Product, {rejectWithValue}) => {
    try {
      if (!product.id) {
        const docRef = await firestore().collection('products').add(product);
        return {...product, id: docRef.id};
      } else {
        const {id, ...productData} = product;
        await firestore().collection('products').doc(id).set(productData);
        return product;
      }
    } catch (error) {
      console.error('Error adding/updating product:', error);
      return rejectWithValue(error);
    }
  },
);

export const removeProductAsync = createAsyncThunk(
  'product/removeProductAsync',
  async (
    payload: {category: Product['category']; id: string},
    {rejectWithValue},
  ) => {
    try {
      await firestore().collection('products').doc(payload.id).delete();
      return payload;
    } catch (error) {
      console.error('Error removing product:', error);
      return rejectWithValue(error);
    }
  },
);

export const searchProductsAsync = createAsyncThunk(
  'product/searchProductsAsync',
  async (searchTerm: string, {rejectWithValue}) => {
    try {
      if (!searchTerm.trim()) return [];

      const snapshot = await firestore()
        .collection('products')
        .where('name', '>=', searchTerm)
        .where('name', '<=', searchTerm + '\uf8ff')
        .get();

      const filteredProducts: Product[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Product),
      }));

      return filteredProducts;
    } catch ({error}: any) {
      console.error('Error searching products:', error);
      return rejectWithValue(error.message);
    }
  },
);

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      if (product.category) {
        state.productsByCategory[product.category].push(product);
      }
    },
    removeProduct: (
      state,
      action: PayloadAction<{category: Product['category']; id: string}>,
    ) => {
      const {category, id} = action.payload;
      if (category) {
        state.productsByCategory[category] = state.productsByCategory[
          category
        ].filter(product => product.id !== id);
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        const categorizedProducts: ProductState['productsByCategory'] = {
          snacks: [],
          meals: [],
          dessert: [],
          drinks: [],
          vegan: [],
        };

        action.payload.forEach(product => {
          if (product.category && categorizedProducts[product.category]) {
            categorizedProducts[product.category].push(product);
          }
        });

        state.productsByCategory = categorizedProducts;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(addProductAsync.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProductAsync.fulfilled, (state, action) => {
        state.loading = false;
        const product = action.payload;
        if (product.category) {
          const existingIndex = state.productsByCategory[
            product.category
          ].findIndex(p => p.id === product.id);

          if (existingIndex >= 0) {
            state.productsByCategory[product.category][existingIndex] = product;
          } else {
            state.productsByCategory[product.category].push(product);
          }
        }
      })
      .addCase(addProductAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(removeProductAsync.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeProductAsync.fulfilled, (state, action) => {
        state.loading = false;
        const {category, id} = action.payload;
        if (category) {
          state.productsByCategory[category] = state.productsByCategory[
            category
          ].filter(product => product.id !== id);
        }
      })
      .addCase(removeProductAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(searchProductsAsync.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchProductsAsync.fulfilled, (state, action) => {
        state.loading = false;
        const categorizedProducts: ProductState['productsByCategory'] = {
          snacks: [],
          meals: [],
          dessert: [],
          drinks: [],
          vegan: [],
        };

        action.payload.forEach(product => {
          if (product.category && categorizedProducts[product.category]) {
            categorizedProducts[product.category].push(product);
          }
        });

        state.productsByCategory = categorizedProducts;
      })
      .addCase(searchProductsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {addProduct, removeProduct} = productSlice.actions;
export default productSlice.reducer;
