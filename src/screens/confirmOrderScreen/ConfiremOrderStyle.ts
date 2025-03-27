import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFD54F',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FF5722',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  innerDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFD54F',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8B4513',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#8B4513',
    marginBottom: 30,
  },
  deliveryText: {
    fontSize: 14,
    color: '#8B4513',
    marginBottom: 30,
  },
  backToHomeText: {
    fontSize: 16,
    color: '#B22222',
    fontWeight: 'bold',
    marginBottom: 40,
  },
  footerText: {
    fontSize: 12,
    color: '#6B4E3D',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default styles;
