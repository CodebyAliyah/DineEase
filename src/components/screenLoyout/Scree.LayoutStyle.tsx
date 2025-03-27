import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFD466',
  },
  backButton: {
    position: 'absolute',
    top: 70,
    left: 22,
  },
  backIcon: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
  },
  topSection: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
  },
  bottomSection: {
    flex: 8,
    backgroundColor: 'white',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    overflow: 'hidden',
    paddingTop: 5,
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
});

export default styles;
