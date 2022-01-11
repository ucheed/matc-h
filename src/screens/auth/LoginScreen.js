import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Button, Modal} from 'react-native-paper';
import {ScrollView} from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';
import CountryCodePicker from '../../global/elements/countries/CountryCodePicker';
import {useSelector} from 'react-redux';

import authApi from '../../provider/api/auth';
import * as actionTypes from '../../store/actions';

import {Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function LoginScreen(props) {
  const [username, setUsername] = useState('charbel@gmail.com1');
  const [password, setPassword] = useState('1234567891');

  // const [phone, setPhone] = useState('');
  // const [password, setPassword] = useState('');
  const [spinner, setSpinner] = useState(false);
  const [visible, setVisible] = useState(false);
  const [modalText, setModalText] = useState('');
  const [countryCode, setCountryCode] = useState('961');
  const [userData] = useState(useSelector(state => state.usr.userData));

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  // useEffect(() => {
  //   if (userData.token) {
  //     props.navigation.replace('BottomNav');
  //   }
  // }, []);

  const handleSubmitPress = async () => {
    if (!username) {
      return;
    }
    if (!password) {
      return;
    }

    setSpinner(true);
    const data = {
      username: username,
      password: password,
    };

    try {
      const response = await authApi.login(data);
      console.log('resppppp', response.data.success);
      if (response.data.success) {
        setSpinner(false);
        props.storeUserData(response.data.data);

        if (response.data.data.user_info === null) {
          props.navigation.replace('Signup2Screen');
        } else {
          props.navigation.replace('BottomNav');
        }
      } else {
        setModalText('Either your username or password is incorrect');
        setSpinner(false);
        showModal();
      }
    } catch (error) {
      console.log(error);
      setModalText('Server error');
    }

    // props.navigation.replace('BottomNav');
  };

  return (
    <>
      <Spinner
        visible={spinner}
        textContent={'Logging in...'}
        color={'#5bd8cc'}
        overlayColor={'#fff'}
        animation={'fade'}
      />
      <ScrollView keyboardDismissMode="interactive">
        <View style={styles.header}>
          <Image style={styles.logo} source={require('./MATC-colored.png')} />
        </View>
        <View style={styles.container}>
          <Text style={styles.title}>LOGIN</Text>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{marginTop: 10}}>
              {/* <CountryCodePicker
                direction={'ltr'}
                selectedCountry={'lb'}
                onCountrySelected={country => {
                  setCountryCode(country.dialCode);
                }}
              /> */}
            </View>
            <TextInput
              value={username}
              style={styles.placeholder}
              placeholder="username"
              placeholderTextColor="black"
              // keyboardType="phone-pad"
              onChangeText={username => setUsername(username)}
            />
          </View>
          <View style={styles.line} />
          <TextInput
            value={password}
            style={styles.placeholder}
            placeholder="Password"
            placeholderTextColor="black"
            secureTextEntry
            onChangeText={password => setPassword(password)}
          />
          <View style={styles.line} />
          <View>
            <Button onPress={handleSubmitPress} style={styles.button}>
              <Text style={styles.buttonText}>LOGIN</Text>
            </Button>
          </View>
          <View style={styles.textContainer}>
            <Text>Already have an account?</Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('SignupScreen')}>
              <Text style={styles.link}>Signup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={styles.containerStyle}>
        <Text>{modalText}</Text>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
    alignSelf: 'center',
    backgroundColor: '#5bd8cc',
    width: windowWidth * 0.8,
    height: 40,
    borderRadius: 3,
  },
  buttonText: {
    color: 'black',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    padding: 10,
    paddingHorizontal: 40,
  },
  header: {
    flex: 1,
    backgroundColor: '#5bd8cc',
    width: '100%',
    height: windowHeight / 3,
  },
  logo: {
    resizeMode: 'contain',
    width: windowWidth * 0.7,
    height: windowHeight / 3,
    alignSelf: 'center',
  },
  title: {
    alignSelf: 'center',
    marginTop: 15,
    fontSize: 30,
    color: 'black',
  },
  signup: {
    alignSelf: 'center',
    textAlign: 'center',
    padding: 10,
  },
  placeholder: {
    color: 'black',
  },
  line: {
    borderBottomColor: 'black',
    borderBottomWidth: 0.5,
    width: windowWidth * 0.8,
    color: '#77787b',
  },
  textContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    textAlign: 'center',
    padding: 10,
  },
  link: {
    color: '#5bd8cc',
    alignSelf: 'center',
    fontSize: 14,
    marginLeft: 8,
    fontWeight: '500',
  },
  containerStyle: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
  },
});

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    storeUserData: userData =>
      dispatch({
        type: actionTypes.STORE_USER_DATA,
        userData,
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
