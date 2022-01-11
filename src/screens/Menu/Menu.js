import React, {useState} from 'react';
import {Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {IconButton} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';

import styles from './Menu.style';
import * as actionTypes from '../../store/actions';

const Menu = props => {
  const navigation = useNavigation();

  return (
    <View style={{height: '100%', width: '100%'}}>
      <IconButton
        icon="menu"
        color={'black'}
        size={30}
        style={{alignSelf: 'flex-end'}}
        onPress={props.handleCloseMiniCart}
      />
      <View style={{height: '15%'}}></View>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-evenly',
        }}>
        <TouchableOpacity
          onPress={() => {
            props.handleCloseMiniCart();
            navigation.navigate('BottomNav');
          }}>
          <Text style={styles.menuItem}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            props.handleCloseMiniCart();
            navigation.navigate('DoctorsScreen');
          }}>
          <Text style={styles.menuItem}>Doctors</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            props.handleCloseMiniCart();
            navigation.navigate('UserAppointmentsScreen');
          }}>
          <Text style={styles.menuItem}>My Appointments</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.menuItem}>Blog</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.menuItem}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.menuItem}>Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            props.handleCloseMiniCart();
            navigation.navigate('OrganizationID');
          }}>
          <Text style={styles.menuItem}>Your Code</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            props.handleCloseMiniCart();
            props.clearUserData();
            navigation.navigate('LoginScreen');
          }}>
          <Text style={styles.menuItem}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    store: state  
  };
};

const mapDispatchToProps = dispatch => {
  return {
    clearUserData: userData =>
      dispatch({
        type: actionTypes.CLEAR_USER_DATA,
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
