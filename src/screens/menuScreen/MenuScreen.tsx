import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import ScreenLayout from '../../components/screenLoyout/ScreenLayout';
import {IMAGES} from '../../constants/images';
import {Product, RootStackParamList} from '../../types/type';
import {useAppDispatch, useAppSelector} from '../../hooks/useStore';
import ProductCard from '../../components/productCart/ProductCart';
import {fetchProducts,} from '../../redux/slices/productSlice';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import Input from '../../components/input/Input';
import {categories} from '../../constants/menuLinks';
import { removeItemFromCart, updateUserData } from '../../redux/slices/userSlice';
import { store } from '../../redux/store';

const MenuScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const dispatch = useAppDispatch();
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
  
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const activeProducts = React.useMemo(() => {
    return activeCategory === 'all'
      ? Object.values(productsByCategory).flat()
      : productsByCategory?.[activeCategory] || [];
  }, [productsByCategory, activeCategory]);

  const filteredProducts = React.useMemo(() => {
    if (!searchTerm) return activeProducts;
    return activeProducts.filter(product =>
      product?.name?.toLowerCase()?.includes(searchTerm.toLowerCase()),
    );
  }, [searchTerm, activeProducts]);
  
  const navigateToCart = () => {
    navigation.navigate('CartScreen');
  };

  const handleRemoveProduct = (productId: string) => {
    // Remove item from local Redux state
    dispatch(removeItemFromCart({ productId }));
  
    // Get updated cart state
    const { cartItems, totalAmount } = store.getState().user.cart; // Adjust according to your state management
  
    // Get current user id from your auth state (ensure you have it stored somewhere)
    const userId = auth().currentUser?.uid;
    console.log("user id", userId)
    if (userId) {
      // Dispatch update action to sync with Firestore
      dispatch(updateUserData({ userId, cartItems, totalAmount }));
    }
  };
  

  return (
    <ScreenLayout
      showBackButton={false}
      topbarProps={
        <View style={styles.header}>
          <View style={styles.searchContainer}>
            <Input
              placeholder="Search"
              placeholderTextColor="black"
              style={styles.searchBar}
              value={searchTerm}
              onChangeText={text => setSearchTerm(text)}
            />
            <TouchableOpacity>
              <Image source={IMAGES.filter} style={styles.filterIcon} />
            </TouchableOpacity>
          </View>

          {/* Top Right Icons */}
          <View style={styles.iconsContainer}>
            <TouchableOpacity onPress={navigateToCart}>
              <View style={styles.cartContainer}>
                <Image source={IMAGES.cart} style={styles.icon} />
                {cartItems.length > 0 && (
                  <View style={styles.cartBadge}>
                    <Text style={styles.cartBadgeText}>{cartItems.length}</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={IMAGES.bell} style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={IMAGES.profile} style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>
      }>
      <View style={styles.content}>
        {/* Horizontal Category List */}
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id || ''}
          contentContainerStyle={styles.categoryContainer}
          renderItem={({item}) => {
            const isActive = item.title === activeCategory;
            return (
              <TouchableOpacity
                style={styles.categoryButton}
                onPress={() => setActiveCategory(item.title)}>
                <View
                  style={[
                    styles.categoryCircle,
                    isActive && styles.activeCategoryCircle,
                  ]}>
                  <Image source={item.icon} style={styles.categoryIcon} />
                </View>
                <Text
                  style={[
                    styles.categoryLabel,
                    isActive && styles.activeCategoryLabel,
                  ]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
        {loading ? (
          <Text style={styles.loadingText}>Loading products...</Text>
        ) : error ? (
          <Text style={styles.errorText}>Error: {error}</Text>
        ) : activeProducts.length > 0 ? (
          <FlatList
            data={filteredProducts}
            keyExtractor={(item, index) => item.id ? `${item.id}-${index}` : `item-${index}`}
            contentContainerStyle={styles.productListContainer}
            renderItem={({item}: {item: Product}) => (
              <ProductCard 
                product={item} 
                onRemove={() => item.id && handleRemoveProduct(item.id)}
              />
            )}
          />
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>
              No products in this category yet
            </Text>
          </View>
        )}
      </View>
    </ScreenLayout>
  );
};

export default MenuScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    width: '100%',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    flex: 1,
    paddingHorizontal: 10,
  },
  searchBar: {
    flex: 1,
    padding: 10,
    color: 'black',
  },
  filterIcon: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
  iconsContainer: {
    flexDirection: 'row',
    gap: 10,
    marginLeft: 15,
  },
  icon: {
    width: 27,
    height: 24,
  },
  cartContainer: {
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#FF6347',
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    paddingVertical: 10,
  },

  // Category List Styles
  categoryContainer: {
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  categoryButton: {
    alignItems: 'center',
    marginRight: 15,
  },
  categoryCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFF2CC',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  activeCategoryCircle: {
    backgroundColor: '#FFDDA1',
    borderWidth: 2,
    borderColor: '#FF8C00',
    shadowColor: '#FF8C00',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  categoryIcon: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
  categoryLabel: {
    fontSize: 12,
    color: '#333',
  },
  activeCategoryLabel: {
    fontWeight: 'bold',
    color: '#FF8C00',
  },

  // Product List Styles
  productListContainer: {
    paddingHorizontal: 15,
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#555',
    marginVertical: 20,
  },
  errorText: {
    textAlign: 'center',
    fontSize: 16,
    color: 'red',
    marginVertical: 20,
  },
  emptyState: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyStateText: {
    color: '#888',
    fontSize: 14,
  },
});
import auth from '@react-native-firebase/auth';

