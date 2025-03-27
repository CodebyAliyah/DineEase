import {StyleSheet} from 'react-native';

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
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: 20,
  },
  searchBar: {
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

  productListContainer: {
    paddingHorizontal: 10,
    paddingBottom: 53,
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

export default styles;
