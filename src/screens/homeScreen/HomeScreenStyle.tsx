import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    width: '100%',
  },
  menuIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
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
    marginTop: 10,
    paddingVertical: 2,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 23,
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: 20,
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
    paddingTop: 5,
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
    marginBottom: 65,
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

export default styles;
