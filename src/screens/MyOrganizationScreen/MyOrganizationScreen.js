// import {useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {Dimensions, Image, StyleSheet, View, ScrollView} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {Button, Modal, Text} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import TimeItem from '../../components/TimeItem';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const OrganizationBooking = props => {
  const navigation = useNavigation(); 
  // const route = useRoute();
  const [userData] = useState(useSelector(state => state.usr.userData));
  // const [doctorId] = useState(props.route.params.id);
  // const [clinicId] = useState(props.route.params.clinicId);
  const [today] = useState(Date().toString());
  const [selected, setSelected] = useState();
  const [markedDates, setMarkedDates] = useState({});
  const [time, setTime] = useState('');
  const [timeId, setTimeId] = useState('');
  const [availableTimes, setAvailableTimes] = useState([]);
  const [visible, setVisible] = useState(false);
  const [modalText, setModalText] = useState('');

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const instance = axios.create({
    baseURL: 'https://host.ucheed.com/matc/api/',
    timeout: 10000,
    headers: {
      Token: userData.token,
    },
  });
  const instance1 = axios.create({
    baseURL:
      'https://host.ucheed.com/wordpress_testing/wp-json/ucheed-json/v1/',
    timeout: 10000,
    headers: {
      Authorization:
        'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvaG9zdC51Y2hlZWQuY29tXC93b3JkcHJlc3NfdGVzdGluZyIsImlhdCI6MTY0MTQ1Nzk0NywibmJmIjoxNjQxNDU3OTQ3LCJleHAiOjE2NDIwNjI3NDcsImRhdGEiOnsidXNlciI6eyJpZCI6OCwiZGV2aWNlIjoiIiwicGFzcyI6ImE3N2EzMDlkNGUxY2UwN2YxNDJmZTY5Y2JmMTU3ZDEwIn19fQ.-L54jkezayvdgPrEvEWpsM1jBzm8tyrOA7l5VGZYBZY',
    },
  });
  console.log("Userdata",userData.token);

  useEffect(() => {
    let thisMonth = new Date().toISOString().split('T')[0];
    thisMonth = thisMonth.substring(0, thisMonth.length - 3);

    monthChangeHandler(thisMonth);
  }, []);

  useEffect(() => {
    if (selected) {
      const keys = Object.keys(selected);
      instance1
        .post('timings', {
          selected_date: keys[0],
          // doctor_address_id: doctorId,
        })
        .then(response => {
          if (!response.data.data[0].available_timings) {
            setAvailableTimes([]);
          } else {
            const times = response.data.data[4].available_timings.map(item => {
              return {id: item.id, time: item.from};
            });
            console.log('times', times);

            setAvailableTimes(times);
          }
        });
    }
  }, [selected]);

  const monthChangeHandler = monthDate => {
    instance1
      .get('timings', {
        // month: monthDate,

        // doctor_address_id: doctorId,
        all_month: true,
      })
      .then(res => {
        const dates = {};
        res.data.data.forEach(date => {
          if (date.available_timings == 0) {
            dates[date.date] = {selected: false, marked: false};
            setAvailableTimes([]);
            setTime('');
            setTimeId('');
          } else {
            dates[date.date] = {selected: false, marked: true};
            setMarkedDates(dates);
            setAvailableTimes([]);
            setTime('');
            setTimeId('');
          }
        });
        // console.log(item.date)
      });
  };

  const view = availableTimes.map(t => (
    <TimeItem
      key={t.id}
      hour={t.time}
      checked={t.time == time ? true : false}
      checled={true}
      onPress={() => {
        setTime(t.time);
        setTimeId(t.id);
      }}
    />
  ));

  // const handleBookPress = async () => {
  //   const keys = Object.keys(selected);
  //   const selectedDate = keys[0];

  //   try {
  //     const response = await instance.post(
  //       'appointment/book_user_appointment',
  //       {
  //         selected_date: selectedDate,
  //         doctor_address_timing_id: timeId,
  //       },
  //     );

  //     setModalText(response.data.message);
  //     showModal();
  //   } catch (error) {
  //     console.log(error);
  //     setModalText('Something went wrong.');
  //     showModal();
  //   }
  // };

  const handleContinuePress = () => {
    const keys = Object.keys(selected);
    const selectedDate = keys[0];

    navigation.navigate('AppointmentForm', {
      // selectedDate,
      // timeId,
      // clinicId,
    });
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{backgroundColor: '#eeeeee', flex: 1}}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: 'https://content.thriveglobal.com/wp-content/uploads/2020/12/Organization-In-Leadership.png',
            }}
            style={styles.image}
          />
        </View>
        <View style={styles.bookingContainer}>
          <Text style={styles.name}>ORGANIZATION Name</Text>
          <Text style={styles.spec} numberOfLines={1}>
            ORGANIZATION DETAILS
          </Text>
          <View style={styles.calendarWrapper}>
            <Calendar
              theme={{
                backgroundColor: '#eeeeee',
                calendarBackground: '#eeeeee',
                textSectionTitleColor: 'black',
                selectedDayTextColor: 'white',
                selectedDayFontSize: 14,
                todayTextColor: 'red',
                textDisabledColor: '#a1a1a1',
                selectedDotColor: '#5bd8cc',
                arrowColor: '#5bd8cc',
                disabledArrowColor: '#eeeeee',
                monthTextColor: '#5bd8cc',
                textDayFontSize: 12,
                textMonthFontSize: 16,
                textDayHeaderFontSize: 12,
                selectedColor: '#5bd8cc',
                selectedDayBackgroundColor: '#5bd8cc',
              }}
              style={styles.calendar}
              current={today}
              minDate={Date()}
              maxDate={'2030-05-30'}
              onDayPress={day => {
                setMarkedDates(prevState => {
                  const x = prevState;

                  if (selected) {
                    const key = Object.keys(selected)[0];
                    delete x[key];

                    if (availableTimes.length !== 0) {
                      x[key] = {selected: false, marked: false};
                    }
                  }

                  x[day.dateString] = {
                    selected: true,
                    selectedDotColor: 'green',
                  };
                  return x;
                });

                setSelected({
                  [day.dateString]: {selected: true, selectedDotColor: 'green'},
                });

                setTime('');
                setTimeId('');
              }}
              monthFormat={'MMMM yyyy'}
              onMonthChange={month => {
                const thisMonth = month.dateString.substring(
                  0,
                  month.dateString.length - 3,
                );

                monthChangeHandler(thisMonth);
              }}
              hideArrows={false}
              hideExtraDays={true}
              disableMonthChange={false}
              firstDay={7}
              onPressArrowLeft={subtractMonth => subtractMonth()}
              onPressArrowRight={addMonth => addMonth()}
              disableAllTouchEventsForDisabledDays={true}
              enableSwipeMonths={true}
              markedDates={markedDates}
            />
          </View>
          <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
            {view}
          </ScrollView>
        </View>
        <View style={styles.buttonsContainer}>
          <Button
            onPress={handleContinuePress}
            style={!selected || !timeId ? styles.disabledButton : styles.button}
            disabled={!selected || !timeId}>
            <Text style={styles.buttonText}>continue</Text>
          </Button>
        </View>
      </View>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={styles.containerStyle}>
        <Text>{modalText}</Text>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 5,
    borderBottomColor: '#03DAC5',
    width: '100%',
    height: windowHeight * 0.25,
    backgroundColor: 'rgba(216, 215, 221, 0.9)',
  },
  button: {
    alignSelf: 'center',
    backgroundColor: '#5bd8cc',
    width: windowWidth * 0.6,
    height: windowHeight * 0.07,
    borderRadius: 3,
    justifyContent: 'center',
  },
  disabledButton: {
    alignSelf: 'center',
    backgroundColor: '#cccccc',
    width: windowWidth * 0.6,
    height: windowHeight * 0.07,
    borderRadius: 3,
    justifyContent: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: windowHeight / 40,
  },
  bookingContainer: {
    backgroundColor: '#eeeeee',
    width: '100%',
    paddingHorizontal: 30,
    justifyContent: 'space-evenly',
  },
  calendar: {
    marginVertical: 5,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#5bd8cc',
    width: '95%',
    alignSelf: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    flex: 1,
    alignSelf: 'center',
    marginTop: 20,
    borderTopRightRadius: 200,
    borderTopLeftRadius: 200,
    opacity: 0.9,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    marginVertical: 3,
  },
  spec: {
    fontSize: 12,
    textTransform: 'capitalize',
    marginBottom: 10,
  },
  calendarWrapper: {
    width: '100%',
    justifyContent: 'space-evenly',
  },
  buttonsContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  containerStyle: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
  },
});

export default OrganizationBooking;
