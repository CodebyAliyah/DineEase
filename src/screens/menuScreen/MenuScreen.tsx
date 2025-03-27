import React from 'react';
import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import ScreenLayout from '../../components/screenLoyout/ScreenLayout';
import {IMAGES} from '../../constants/images';
import {RootStackParamList} from '../../types/type';
import Input from '../../components/input/Input';
import {categories} from '../../constants/menuLinks';
import styles from './MenuScreenStyle';
import ProductCard from '../../components/productCart/ProductCart';
import useMenu from './useMenu';

const MenuScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const {
    searchTerm,
    setSearchTerm,
    activeCategory,
    setActiveCategory,
    filteredProducts,
    loading,
    error,
    cartItems,
    handleRemoveProduct,
  } = useMenu();

  const navigateToCart = () => {
    navigation.navigate('CartScreen');
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
              isTransparent
            />
            <TouchableOpacity>
              <Image source={IMAGES.filter} style={styles.filterIcon} />
            </TouchableOpacity>
          </View>

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
        ) : filteredProducts.length > 0 ? (
          <FlatList
            data={filteredProducts}
            keyExtractor={(item, index) =>
              item.id ? `${item.id}-${index}` : `item-${index}`
            }
            contentContainerStyle={styles.productListContainer}
            renderItem={({item}) => (
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
