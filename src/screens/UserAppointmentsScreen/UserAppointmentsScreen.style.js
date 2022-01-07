import {Dimensions, StyleSheet} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default StyleSheet.create({
  header: {
    backgroundColor: '#5bd8cc',
    width: '100%',
    height: windowHeight * 0.36,
    flexDirection: 'column',
  },
  logo: {
    resizeMode: 'contain',
    width: windowWidth * 0.3,
    height: windowHeight * 0.2,
    alignSelf: 'center',
  },
  name: {
    fontSize: 25,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  welcome: {
    marginTop: 10,
    alignSelf: 'center',
  },
  image: {
    width: 120,
    height: 95,
    resizeMode: 'contain',
    marginLeft: 'auto',
    // borderTopRightRadius: 200,
    // borderTopLeftRadius: 200,
    opacity: 0.9,
  },
});
