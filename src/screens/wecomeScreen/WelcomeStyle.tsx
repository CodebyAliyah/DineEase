import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E65125',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  logo: {
    width: 210,
    height: 180,
    marginBottom: 20,
  },
  appName: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFF',
  },
  highlight: {
    color: '#FFD166',
  },
  tagline: {
    padding: 20,
    fontSize: 14,
    color: '#FFF',
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default styles;
