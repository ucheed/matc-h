import React, {useEffect, useState} from 'react';
import {Image, ScrollView, Text, View} from 'react-native';
import {Card, Paragraph} from 'react-native-paper';
import {useSelector} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios';

import styles from './UserAppointmentsScreen.style';

const UserAppointmentsScreen = props => {
  const [userData] = useState(useSelector(state => state.usr.userData));
  const [userAppointments, setUserAppointments] = useState([]);
  const [spinner, setSpinner] = useState(true);

  const instance = axios.create({
    baseURL: 'https://host.ucheed.com/matc/api/',
    timeout: 10000,
    headers: {
      Token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IjEi.eVIwRoyUBIXM7ipKVLHZkqVYB19ZVCAunLQgtCtxJIg",

    },
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await instance.post(
          'appointment/get_user_appointments',
          {selected_date: ''},
        );

        const userAppointmentsViews = response.data.data.map(
          (appointmentDay, idx) => {
            const appointmentList = appointmentDay.user_appointments.map(
              (userAppointment, idx2) => {
                return (
                  <View
                    key={idx2}
                    style={{
                      backgroundColor: '#cacccc',
                      marginTop: 10,
                      marginBottom: 10,
                      padding: 5,
                    }}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                      <View>
                        <Paragraph style={{fontSize: 12}}>
                          {userAppointment.clinic_name}
                        </Paragraph>
                        <Paragraph style={{fontSize: 16}}>
                          {userAppointment.appointment_time_from} -{' '}
                          {userAppointment.appointment_time_to}
                        </Paragraph>
                        <Paragraph style={{fontSize: 12}}>
                          {userAppointment.doctor_name}
                        </Paragraph>
                      </View>
                      <View
                        style={{
                          width: '50%',
                          flexDirection: 'row',
                          justifyContent: 'flex-end',
                        }}>
                        <Image
                          style={styles.image}
                          source={{uri: userAppointment.doctor_image}}
                        />
                      </View>
                    </View>
                  </View>
                );
              },
            );

            const date = new Date(appointmentDay.date);

            return (
              <View key={idx} style={{margin: 10}}>
                <Card.Title title={date.toDateString()} />
                <Card.Content>{appointmentList}</Card.Content>
              </View>
            );
          },
        );

        setUserAppointments(userAppointmentsViews);
        setSpinner(false);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [userData]);

  return (
    <>
      <Spinner
        visible={spinner}
        textContent={'Fetching your appointments...'}
        color={'#5bd8cc'}
        overlayColor={'#fff'}
        animation={'fade'}
      />
      <View style={styles.header}>
        <Image style={styles.logo} source={require('../MATC-colored.png')} />
        <Text style={styles.name}>My Appointments</Text>
      </View>
      <ScrollView>{userAppointments}</ScrollView>
    </>
  );
};

export default UserAppointmentsScreen;
