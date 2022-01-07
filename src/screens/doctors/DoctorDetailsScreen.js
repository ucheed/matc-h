import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {Button} from 'react-native-paper';

import ClinicCard from '../../components/ClinicCard';

let windowHeight = Dimensions.get('window').height;
let windowWidth = Dimensions.get('window').width;

function DoctorDetailsScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const [clinicData, setClinicData] = useState([]);
  const [doctorId] = useState(route.params.id);
  const [userData] = useState(useSelector(state => state.usr.userData));
  const [selectedClinic, setSelectedClinic] = useState('');

  const instance = axios.create({
    baseURL: 'https://host.ucheed.com/matc/api/',
    timeout: 10000,
    headers: {
      Token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IjEi.eVIwRoyUBIXM7ipKVLHZkqVYB19ZVCAunLQgtCtxJIg",
    },
  });

  useEffect(() => {
    instance
      .post('doctor/get_doctor_by_id', {doctor_id: doctorId})
      .then(res => {
        setClinicData(res.data.data.doctor_clinics);
      });
  }, []);

  const handleCall = () => {
    console.log('call');
  };

  const handleFacebook = () => {
    console.log('facebook');
  };

  const handleInstagram = () => {
    console.log('instagram');
  };

  const handleLinkedin = () => {
    console.log('linkedin');
  };

  const handleMessage = () => {
    console.log('message');
  };

  const handleBooking = () => {
    navigation.navigate('BookingScreen', {
      id: route.params.id,
      clinicId: selectedClinic,
      name: route.params.name,
      image: route.params.image,
      desc: route.params.desc,
      spec: route.params.spec,
    });
  };

  const handlePressClinic = clinic => {
    setSelectedClinic(clinic.id);
  };

  return (
    <>
      <View style={styles.imageContainer}>
        {/* <ImageBackground
          blurRadius={1}
          source={require('../../assets/images/background.png')}
          style={styles.background}> */}
        <Image source={{uri: route.params.image}} style={styles.image} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{route.params.name}</Text>
        <Text style={styles.spec} numberOfLines={1}>
          {route.params.spec}
        </Text>
        <View style={styles.socialsbox}>
          <TouchableOpacity onPress={handleCall}>
            <Image
              style={styles.socialsicon}
              source={require('../../assets/images/ionicons/call.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleFacebook}>
            <Image
              style={styles.socialsicon}
              source={require('../../assets/images/ionicons/facebook.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleInstagram}>
            <Image
              style={styles.socialsicon}
              source={require('../../assets/images/ionicons/instagram.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLinkedin}>
            <Image
              style={styles.socialsicon}
              source={require('../../assets/images/ionicons/linkedin.png')}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.text}>{route.params.desc}</Text>
        {clinicData.map((clinic, idx) => (
          <ClinicCard
            key={idx}
            id={clinic.id}
            doctorId={clinic.doctor_id}
            title={clinic.title}
            address1={clinic.address1}
            address2={clinic.address2}
            isOnline={clinic.is_online}
            mobile={clinic.mobile}
            phone1={clinic.phone1}
            phone2={clinic.phone2}
            email={clinic.email}
            isSelected={clinic.id === selectedClinic}
            onPress={() => {
              handlePressClinic(clinic);
            }}
          />
        ))}
      </View>
      <View style={styles.buttonsContainer}>
        <Button onPress={handleMessage} style={styles.button}>
          <Text style={styles.buttonText}>Send Message</Text>
        </Button>
        <Button
          onPress={handleBooking}
          style={selectedClinic ? styles.button : styles.disabledButton}
          disabled={!selectedClinic}>
          <Text style={styles.buttonText}>Book Now</Text>
        </Button>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    backgroundColor: 'rgba(216, 215, 221, 0.9)',
    borderBottomWidth: 5,
    borderBottomColor: '#03DAC5',
    flex: 1,
    width: '100%',
    height: windowHeight * 0.25,
  },
  buttonsContainer: {
    backgroundColor: '#ffffff',
    width: '100%',
    height: windowHeight * 0.1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingBottom: 20,
  },
  button: {
    marginTop: 20,
    alignSelf: 'center',
    backgroundColor: '#5bd8cc',
    width: windowWidth * 0.4,
    height: 40,
    borderRadius: 3,
    alignContent: 'center',
    justifyContent: 'center',
  },
  disabledButton: {
    marginTop: 20,
    alignSelf: 'center',
    backgroundColor: '#cccccc',
    width: windowWidth * 0.4,
    height: 40,
    borderRadius: 3,
    alignContent: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 13,
  },
  infoContainer: {
    backgroundColor: '#eeeeee',
    borderBottomWidth: 8,
    borderBottomColor: '#bbbbbb',
    width: '100%',
    height: windowHeight * 0.55,
    paddingHorizontal: 30,
  },
  image: {
    width: '80%',
    height: '100%',
    resizeMode: 'contain',
    flex: 1,
    alignSelf: 'center',
    marginTop: 10,
    borderTopRightRadius: 200,
    borderTopLeftRadius: 200,
    opacity: 0.9,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  text: {
    fontSize: 10,
    lineHeight: 19,
    marginBottom: 20,
  },
  spec: {
    fontSize: 12,
    textTransform: 'capitalize',
  },
  socialsbox: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  socialsicon: {
    width: 28,
    height: 28,
  },
});
export default DoctorDetailsScreen;
