import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {IMAGES} from '../../constants/images';
import ScreenLayout from '../../components/screenLoyout/ScreenLayout';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import styles from './HomeScreenStyle';
import Input from '../../components/input/Input';
import {
  categories,
  bestSellers,
  recommendations,
} from '../../constants/homeLinks';
import {RootStackParamList} from '../../types/type';

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
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
              isTransparent
            />
            <TouchableOpacity>
              <Image source={IMAGES.filter} style={styles.filterIcon} />
            </TouchableOpacity>
          </View>
          <View style={styles.iconsContainer}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate({name: 'CartScreen', params: undefined})
              }>
              <Image source={IMAGES.cart} style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={IMAGES.bell} style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('ProfileScreen')}>
              <Image source={IMAGES.profile} style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>
      }
      subBarProps={
        <View style={styles.subBar}>
          <Text style={styles.greeting}>Good Morning</Text>
          <Text style={styles.subtext}>
            Rise And Shine! It's Breakfast Time
          </Text>
        </View>
      }>
      <View style={styles.content}>
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.categoryContainer}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.category}
              onPress={() =>
                navigation.navigate('MainApp', {screen: 'Home'} as never)
              }>
              <View style={styles.categoryCircle}>
                <Image source={item.icon} style={styles.categoryIcon} />
              </View>
              <Text style={styles.categoryText}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Best Seller</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bestSellerWrapper}>
          <FlatList
            data={bestSellers}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.bestSellerContainer}
            renderItem={({item}) => (
              <TouchableOpacity style={styles.bestSellerCard}>
                <Image source={item.image} style={styles.bestSellerImage} />
                <View style={styles.priceTag}>
                  <Text style={styles.priceText}>{item.price}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
        <ScrollView>
          <TouchableOpacity style={styles.promoContainer}>
            <Image
              source={require('../../assets/images/promo.png')}
              style={styles.promoImage}
            />
          </TouchableOpacity>

          <View style={styles.recommendSection}>
            <Text style={styles.sectionTitle}>Recommend</Text>
          </View>

          <View style={styles.recommendWrapper}>
            <FlatList
              data={recommendations}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.id}
              contentContainerStyle={styles.recommendContainer}
              renderItem={({item}) => (
                <TouchableOpacity style={styles.recommendCard}>
                  <Image source={item.image} style={styles.recommendImage} />
                  <View style={styles.ratingContainer}>
                    <Text style={styles.ratingText}>{item.rating}</Text>
                  </View>
                  <View style={styles.recommendPriceTag}>
                    <Text style={styles.recommendPriceText}>{item.price}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </ScrollView>
      </View>
    </ScreenLayout>
  );
};

export default HomeScreen;
