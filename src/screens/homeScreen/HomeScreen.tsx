import React from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from 'react-native';
import {IMAGES} from '../../constants/images';
import ScreenLayout from '../../components/screenLoyout/ScreenLayout';
import { DrawerActionHelpers, DrawerActions, useNavigation } from '@react-navigation/native';


const categories = [
  {id: '1', title: 'Snacks', icon: require('../../assets/icons/snack.png')},
  {id: '2', title: 'Meal', icon: require('../../assets/icons/meal.png')},
  {id: '3', title: 'Vegan', icon: require('../../assets/icons/vegan.png')},
  {id: '4', title: 'Dessert', icon: require('../../assets/icons/dessert.png')},
  {id: '5', title: 'Drinks', icon: require('../../assets/icons/drinks.png')},
];


const bestSellers = [
  {id: '1', image: require('../../assets/images/sushi.png'), price: '$103.0'},
  {id: '2', image: require('../../assets/images/salad.png'), price: '$50.0'},
  {id: '3', image: require('../../assets/images/lasagna.png'), price: '$12.99'},
  {id: '4', image: require('../../assets/images/cake.png'), price: '$8.20'},
];

const recommendations = [
  {
    id: '1',
    image: require('../../assets/images/burger.png'),
    price: '$10.0',
    rating: '5.0',
  },

  {
    id: '2',
    image: require('../../assets/images/sushi2.png'),
    price: '$25.0',
    rating: '5.0',
  },
];


const HomeScreen = () => {
  return (
    <ScreenLayout
      showBackButton={false}
      topbarProps={
        <View style={styles.header}>
          <View style={styles.searchContainer}>
            <TextInput
              placeholder="Search"
              placeholderTextColor="black"
              style={styles.searchBar}
            />
            <TouchableOpacity>
              <Image source={IMAGES.filter} style={styles.filterIcon} />
            </TouchableOpacity>
          </View>
          <View style={styles.iconsContainer}>
            <TouchableOpacity>
              <Image source={IMAGES.cart} style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={IMAGES.bell} style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity>
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
        <ScrollView>
          <View style={styles.content}>
            <FlatList
              data={categories}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.id}
              contentContainerStyle={styles.categoryContainer}
              renderItem={({item}) => (
                <TouchableOpacity style={styles.category}>
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
          </View>
        </ScrollView>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    width: '100%',
  },
  viewAll: {
    fontSize: 12,
    color: '#FF8C00',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 15,
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
  subBar: {
    paddingHorizontal: 25,
    marginBottom: 10,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF8C00',
  },
  subtext: {
    fontSize: 14,
    color: 'gray',
  },
  content: {
    flex: 1,
    paddingVertical: 10,
  },
  categoryContainer: {
    paddingHorizontal: 15,
  },
  bestSellerWrapper: {},
  recommendSection: {
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  recommendWrapper: {},
  recommendContainer: {
    paddingHorizontal: 15,
  },
  recommendCard: {
    width: 159,
    height: 140,
    borderRadius: 15,
    marginRight: 10,
    position: 'relative',
    overflow: 'hidden',
  },
  recommendImage: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
  ratingContainer: {
    position: 'absolute',
    top: 5,
    left: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  recommendPriceTag: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  recommendPriceText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  bestSellerContainer: {
    paddingHorizontal: 15,
  },
  bestSellerCard: {
    width: 80,
    height: 110,
    borderRadius: 15,
    marginRight: 10,
    position: 'relative',
    overflow: 'hidden',
  },
  bestSellerImage: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
  priceTag: {
    position: 'absolute',
    bottom: 8,
    left: 35,
    backgroundColor: '#E95322',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  priceText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000',
  },
  promoContainer: {
    width: '90%',
    height: 120,
    borderRadius: 20,
    alignSelf: 'center',
    marginVertical: 15,
    position: 'relative',
    overflow: 'hidden',
  },
  promoImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  promoContent: {
    position: 'absolute',
    justifyContent: 'center',
  },
  promoText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  promoDiscount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  category: {
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
  },
  categoryIcon: {
    width: 30,
    height: 30,
  },
  categoryText: {
    fontSize: 12,
    marginTop: 5,
    color: 'black',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default HomeScreen;