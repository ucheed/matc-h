import React, {useState} from 'react';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Button} from 'react-native-paper';
import {ScrollView} from 'react-native-gesture-handler';
import {Modal} from 'react-native-paper';

import styles from './SignUpScreen.style';

const SignupScreen = props => {
  // const [email, setEmail] = useState('hrag.h@Hotmail.com');
  // const [fname, setFname] = useState('hrag');
  // const [lname, setLname] = useState('hayrabedian');
  // const [password, setPassword] = useState('password');
  // const [c_password, setCpassword] = useState('password');

  const [email, setEmail] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [password, setPassword] = useState('');
  const [c_password, setCpassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [modalText, setModalText] = useState('');

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const handlePress = () => {
    if (!fname) {
      return;
    }
    if (!lname) {
      return;
    }
    if (!email) {
      return;
    }
    if (!password) {
      return;
    }
    if (c_password !== password) {
      setModalText('Passwords must be the same');
      showModal();
      return;
    }

    props.navigation.navigate('Signup2Screen', {
      first_name: fname,
      last_name: lname,
      email: email,
      password: password,
    });
  };

  return (
    <>
      <ScrollView keyboardDismissMode="interactive">
        <View style={styles.header}>
          <Image
            style={styles.logo}
            source={require('../auth/MATC-colored.png')}
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.title}>SIGNUP</Text>
          <TextInput
            value={email}
            style={styles.placeholder}
            placeholder="Email"
            placeholderTextColor="black"
            onChangeText={val => setEmail(val)}
          />
          <View style={styles.line} />
          <TextInput
            value={fname}
            style={styles.placeholder}
            placeholder="First Name"
            placeholderTextColor="black"
            onChangeText={val => setFname(val)}
          />
          <View style={styles.line} />
          <TextInput
            value={lname}
            style={styles.placeholder}
            placeholder="Last Name"
            placeholderTextColor="black"
            onChangeText={val => setLname(val)}
          />
          <View style={styles.line} />
          <TextInput
            value={password}
            placeholder="Password"
            secureTextEntry={true}
            style={styles.placeholder}
            placeholderTextColor="black"
            onChangeText={val => setPassword(val)}
          />
          <View style={styles.line} />
          <TextInput
            value={c_password}
            secureTextEntry={true}
            style={styles.placeholder}
            placeholder="Confirm Password"
            placeholderTextColor="black"
            onChangeText={val => setCpassword(val)}
          />
          <View style={styles.line} />
          <Button onPress={handlePress} style={styles.button}>
            <Text style={styles.buttonText}>CREATE ACCOUNT</Text>
          </Button>
          <View style={styles.textContainer}>
            <Text>Already have an account?</Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('LoginScreen')}>
              <Text style={styles.link}>Login</Text>
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
};

export default SignupScreen;
