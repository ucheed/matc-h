import 'react-native-gesture-handler';
import React from 'react';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import {persistStore, persistReducer} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StyleSheet, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
// import RootStack from './src/routes/RootStack';
import {Colors} from 'react-native/Libraries/NewAppScreen';
// import {MAIN_COLOR} from './src/global/css/Styles';
// import messaging from '@react-native-firebase/messaging';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import DeviceInfo from 'react-native-device-info';
// import Provider from './src/provider/Provider';
// import BaseScreen from './src/base/BaseScreen';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {COLORS} from './src/theme/Colors';
// import I18n from './src/provider/TranslationProvider.js';
// import StorageProvider from './src/provider/StorageProvider';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './src/screens/auth/LoginScreen';
import SignupScreen from './src/screens/SignUpScreen/SignupScreen';
import HomeScreen from './src/screens/HomeScreen';
import BottomNav from './src/screens/BottomNav';
import Signup2Screen from './src/screens/auth/Signup2Screen';
import DoctorsScreen from './src/screens/doctors/DoctorsScreen';
import DoctorDetailsScreen from './src/screens/doctors/DoctorDetailsScreen';
import BookingScreen from './src/screens/appointments/BookAppointmentScreen';
import UserAppointmentsScreen from './src/screens/UserAppointmentsScreen/UserAppointmentsScreen';
import AppointmentForm from './src/screens/appointments/AppointmentForm';
import PaymentScreen from './src/screens/PaymentScreen/PaymentScreen';
import OrganizationBooking from './src/screens/MyOrganizationScreen/MyOrganizationScreen';
import userReducer from './src/store/reducers/user.reducer';
import OrganizationID from './src/screens/OrganizationID/OrganizationID';
const rootReducer = combineReducers({
  usr: userReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <View style={styles.container}>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
              <Stack.Screen name="LoginScreen" component={LoginScreen} />
              <Stack.Screen name="SignupScreen" component={SignupScreen} />
              <Stack.Screen name="Signup2Screen" component={Signup2Screen} />
              <Stack.Screen name="HomeScreen" component={HomeScreen} />
              <Stack.Screen name="BottomNav" component={BottomNav} />
              <Stack.Screen name="DoctorsScreen" component={DoctorsScreen} />
              <Stack.Screen name="OrganizationID" component={OrganizationID} />
              <Stack.Screen
                name="DoctorDetails"
                component={DoctorDetailsScreen}
              />
              <Stack.Screen name="BookingScreen" component={BookingScreen} />
              <Stack.Screen
                name="OrganizationBooking"
                component={OrganizationBooking}
              />
              <Stack.Screen
                name="UserAppointmentsScreen"
                component={UserAppointmentsScreen}
              />
              <Stack.Screen
                name="AppointmentForm"
                component={AppointmentForm}
              />
              <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
