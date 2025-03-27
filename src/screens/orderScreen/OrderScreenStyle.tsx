import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  noOrdersText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginTop: 40,
  },
  listContent: {
    paddingBottom: 20,
  },
  orderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginBottom: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 2,
  },
  orderImage: {
    width: '100%',
    height: 130,
    borderRadius: 8,
    marginBottom: 10,
    resizeMode: 'cover',
  },
  orderInfo: {
    marginBottom: 8,
  },
  orderName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  orderDate: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  deliveredText: {
    color: '#FF6A6A',
  },
  priceItemsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 5,
  },
  orderPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6A6A',
  },
  itemCount: {
    fontSize: 14,
    color: '#666',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  reviewButton: {
    borderWidth: 1,
    borderColor: '#FF6A6A',
    borderRadius: 5,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  reviewButtonText: {
    color: '#FF6A6A',
    fontWeight: 'bold',
    fontSize: 13,
  },
  orderAgainButton: {
    borderWidth: 1,
    borderColor: '#FF6A6A',
    borderRadius: 5,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#FF6A6A',
  },
  orderAgainButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 13,
  },
});

export default styles;
