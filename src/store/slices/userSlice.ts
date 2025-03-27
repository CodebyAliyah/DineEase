import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  totalPrice: number;
  toppings: string[];
  length: number;
}

interface UserState {
  user: any;
  loading: boolean;
  error: string | null;
  isLoggedIn: boolean;
  cart: {
    cartItems: CartItem[];
    totalAmount: number;
    loading: boolean;
    error: string | null;
    length: number;
  };
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
  isLoggedIn: false,
  cart: {
    cartItems: [],
    totalAmount: 0,
    loading: false,
    error: null,
    length: 0,
  },
};

export const signupUser = createAsyncThunk(
  'user/signupUser',
  async (
    {
      name,
      email,
      password,
      phone,
      dob,
    }: {
      email: string;
      password: string;
      name: string;
      phone: string;
      dob: string;
    },
    thunkAPI,
  ) => {
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      await firestore()
        .collection('users')
        .doc(userCredential.user.uid)
        .set({
          name,
          email,
          phone,
          dob,
          cart: {cartItems: [], totalAmount: 0},
          createdAt: firestore.Timestamp.now(),
        });
      return userCredential.user;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        message: error.message,
        code: error.code,
      });
    }
  },
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({email, password}: {email: string; password: string}, thunkAPI) => {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(
        email,
        password,
      );
      return userCredential.user;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const forgotPassword = createAsyncThunk(
  'user/forgotPassword',
  async (email: string, thunkAPI) => {
    try {
      await auth().sendPasswordResetEmail(email);
      return 'Password reset email sent!';
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const fetchUserData = createAsyncThunk(
  'user/fetchUserData',
  async (userId: string, {rejectWithValue}) => {
    try {
      const userRef = firestore().collection('users').doc(userId);
      const userSnap = await userRef.get();
      if (userSnap.exists) {
        const data = userSnap.data();
        return {
          cart: data?.cart || {cartItems: [], totalAmount: 0},
        };
      }
      return {cart: {cartItems: [], totalAmount: 0}};
    } catch (error) {
      return rejectWithValue('Error fetching user data');
    }
  },
);

export const updateUserData = createAsyncThunk(
  'user/updateUserData',
  async (
    {
      userId,
      cartItems,
      totalAmount,
    }: {userId: string; cartItems: CartItem[]; totalAmount: number},
    {rejectWithValue},
  ) => {
    try {
      await firestore().collection('users').doc(userId).update({
        cart: {cartItems, totalAmount},
        updatedAt: firestore.FieldValue.serverTimestamp(),
      });
      console.log('Firestore update successful', {cartItems, totalAmount});
      return {cart: {cartItems, totalAmount}};
    } catch (error) {
      console.error('Firestore update error:', error);
      return rejectWithValue('Error updating user data');
    }
  },
);

export const removeItemAndSync = createAsyncThunk(
  'user/removeItemAndSync',
  async ({productId}: {productId: string}, {getState, rejectWithValue}) => {
    try {
      const state = getState() as {user: UserState};
      const userId = auth().currentUser?.uid;

      if (!userId) {
        return rejectWithValue('User not authenticated');
      }

      // Filter out the removed item
      const updatedCartItems = state.user.cart.cartItems.filter(
        item => item.productId !== productId,
      );
      const updatedTotalAmount = updatedCartItems.reduce(
        (total, item) => total + item.totalPrice,
        0,
      );

      // Update Firestore
      await firestore()
        .collection('users')
        .doc(userId)
        .update({
          cart: {
            cartItems: updatedCartItems,
            totalAmount: updatedTotalAmount,
          },
          updatedAt: firestore.FieldValue.serverTimestamp(),
        });

      return {cartItems: updatedCartItems, totalAmount: updatedTotalAmount};
    } catch (error) {
      console.error('Error removing item:', error);
      return rejectWithValue('Failed to remove item from cart');
    }
  },
);

export const updateCartItemQuantityAndSync = createAsyncThunk(
  'user/updateCartItemQuantityAndSync',
  async (
    {productId, quantity}: {productId: string; quantity: number},
    {getState, rejectWithValue},
  ) => {
    try {
      const state = getState() as {user: UserState};
      const userId = auth().currentUser?.uid;

      if (!userId) {
        return rejectWithValue('User not authenticated');
      }
      const updatedCartItems = state.user.cart.cartItems.map(item => {
        if (item.productId === productId) {
          return {
            ...item,
            quantity: quantity,
            totalPrice: item.price * quantity,
          };
        }
        return item;
      });

      const updatedTotalAmount = updatedCartItems.reduce(
        (total, item) => total + item.totalPrice,
        0,
      );

      // Update Firestore
      await firestore()
        .collection('users')
        .doc(userId)
        .update({
          cart: {
            cartItems: updatedCartItems,
            totalAmount: updatedTotalAmount,
          },
          updatedAt: firestore.FieldValue.serverTimestamp(),
        });

      return {cartItems: updatedCartItems, totalAmount: updatedTotalAmount};
    } catch (error) {
      console.error('Error updating item quantity:', error);
      return rejectWithValue('Failed to update item quantity');
    }
  },
);
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: state => {
      auth().signOut();
      state.user = null;
      state.isLoggedIn = false;
      state.cart = {
        cartItems: [],
        totalAmount: 0,
        loading: false,
        error: null,
        length: 0,
      };
    },
    addItemToCart: (state, action: PayloadAction<{item: CartItem}>) => {
      const {item} = action.payload;
      const existingItemIndex = state.cart.cartItems.findIndex(
        i => i.productId === item.productId,
      );

      if (existingItemIndex >= 0) {
        state.cart.cartItems[existingItemIndex].quantity += item.quantity;
        state.cart.cartItems[existingItemIndex].totalPrice =
          state.cart.cartItems[existingItemIndex].price *
          state.cart.cartItems[existingItemIndex].quantity;
      } else {
        state.cart.cartItems.push(item);
      }
      state.cart.totalAmount = state.cart.cartItems.reduce(
        (total, i) => total + i.totalPrice,
        0,
      );
    },

    removeItemFromCart: (state, action: PayloadAction<{productId: string}>) => {
      const {productId} = action.payload;
      state.cart.cartItems = state.cart.cartItems.filter(
        item => item.productId !== productId,
      );
      state.cart.totalAmount = state.cart.cartItems.reduce(
        (total, item) => total + item.totalPrice,
        0,
      );
    },

    updateCartItemQuantity: (
      state,
      action: PayloadAction<{productId: string; quantity: number}>,
    ) => {
      const {productId, quantity} = action.payload;
      const itemIndex = state.cart.cartItems.findIndex(
        i => i.productId === productId,
      );

      if (itemIndex >= 0) {
        if (quantity <= 0) {
          state.cart.cartItems.splice(itemIndex, 1);
        } else {
          state.cart.cartItems[itemIndex].quantity = quantity;
          state.cart.cartItems[itemIndex].totalPrice =
            state.cart.cartItems[itemIndex].price * quantity;
        }
        state.cart.totalAmount = state.cart.cartItems.reduce(
          (total, i) => total + i.totalPrice,
          0,
        );
      }
    },

    clearCart: state => {
      state.cart.cartItems = [];
      state.cart.totalAmount = 0;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(signupUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(removeItemAndSync.pending, state => {
        state.cart.loading = true;
        state.cart.error = null;
      })
      .addCase(removeItemAndSync.fulfilled, (state, action) => {
        state.cart.loading = false;
        state.cart.cartItems = action.payload.cartItems;
        if (action.payload) {
          if (action.payload) {
            state.cart.totalAmount = action.payload.totalAmount;
          }
        }
      })
      .addCase(removeItemAndSync.rejected, (state, action) => {
        state.cart.loading = false;
        state.cart.error = action.payload as string;
      })
      .addCase(updateCartItemQuantityAndSync.pending, state => {
        state.cart.loading = true;
        state.cart.error = null;
      })
      .addCase(updateCartItemQuantityAndSync.fulfilled, (state, action) => {
        state.cart.loading = false;
        if (action.payload) {
          state.cart.cartItems = action.payload.cartItems;
          state.cart.totalAmount = action.payload.totalAmount;
        }
      })
      .addCase(updateCartItemQuantityAndSync.rejected, (state, action) => {
        state.cart.loading = false;
        state.cart.error = action.payload as string;
      })
      .addCase(loginUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(forgotPassword.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, state => {
        state.loading = false;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchUserData.pending, state => {
        state.cart.loading = true;
        state.cart.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.cart.loading = false;
        state.cart.cartItems = action.payload.cart.cartItems;
        state.cart.totalAmount = action.payload.cart.totalAmount;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.cart.loading = false;
        state.cart.error = action.payload as string;
      })
      .addCase(updateUserData.pending, state => {
        state.cart.loading = true;
      })
      .addCase(updateUserData.fulfilled, (state, action) => {
        state.cart.loading = false;
        state.cart.cartItems = action.payload.cart.cartItems;
        state.cart.totalAmount = action.payload.cart.totalAmount;
      })
      .addCase(updateUserData.rejected, (state, action) => {
        state.cart.loading = false;
        state.cart.error = action.payload as string;
      });
  },
});

export const {
  logout,
  addItemToCart,
  removeItemFromCart,
  updateCartItemQuantity,
  clearCart,
} = userSlice.actions;

export default userSlice.reducer;
