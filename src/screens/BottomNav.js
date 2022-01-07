/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {BottomNavigation, Text} from 'react-native-paper';
import {View, Image, ImageBackground} from 'react-native';
import HomeScreen from './HomeScreen';
import {useSelector} from 'react-redux';
import MyHealthScreen from './MyHealthScreen/MyHealthScreen';
import MyOrganizationScreen from './MyOrganizationScreen/MyOrganizationScreen';
const HomeScreenRoute = () => <HomeScreen />;
const MyHealthRoute = () => <MyHealthScreen />;
const MyOrganizationRoute = () => <MyOrganizationScreen />;
const BottomNav = () => {
  const [userData] = useState(useSelector(state => state.usr.userData));
  console.log('userrrrrr', userData.organization);
  const exists =
    userData && userData.organization;
  // const [exists,setExists] = useState ({userData.organization});
  // const exists =
  // console.log('exissss', exists);
  const [index, setIndex] = React.useState(0);
  const [routes] = exists
    ? React.useState([
        {
          key: 'home',
          title: 'HOME',
          icon: 'home-outline',
          function: HomeScreen,
        },
        {
          key: 'myHealth',
          title: 'MY HEALTH',
          icon: 'clipboard-pulse-outline',
          function: MyHealthRoute,
        },
        {
          key: 'myOrganization',
          title: 'MY ORGANIZATION',
          icon: 'account',
          function: MyOrganizationRoute,
        },
      ])
    : React.useState([
        {
          key: 'home',
          title: 'HOME',
          icon: 'home-outline',
          function: HomeScreen,
        },
        {
          key: 'myHealth',
          title: 'MY HEALTH',
          icon: 'clipboard-pulse-outline',
          function: MyHealthRoute,
        },
      ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeScreenRoute,
    myHealth: MyHealthRoute,
    myOrganization: MyOrganizationRoute,
  });

  return (
    <BottomNavigation
      shifting={false}
      sceneAnimationEnabled={true}
      inactiveColor="#77787b"
      activeColor="#5bd8cc"
      barStyle={{backgroundColor: 'white', paddingBottom: 20}}
      navigationState={{index, routes}}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default BottomNav;
