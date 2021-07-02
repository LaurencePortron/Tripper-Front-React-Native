import React, { useState } from 'react';
import API from '../../services/API';
import { useHistory } from 'react-router-native';
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import firebase from 'firebase/app';
import BackToDashboardButton from '../Buttons';
import { Button } from 'react-native';
import { Feather } from '@expo/vector-icons';
import CalendarExample from './CalendarExample';

export default function AddTrip(props) {
  const [addTripTitle, setAddTripTitle] = useState('');
  const [addDescription, setAddDescription] = useState('');
  const [addCost, setAddCost] = useState('');
  const [openCalendar, setOpenCalendar] = useState(false);
  const [dateRange, setDateRange] = useState({});
  const user = firebase.auth().currentUser;
  const userId = user.uid;

  const history = useHistory();

  const addTripTitleInput = (inputText) => {
    setAddTripTitle(inputText);
  };

  const addDescriptionInput = (inputText) => {
    setAddDescription(inputText);
  };

  const addCostInput = (inputText) => {
    setAddCost(inputText);
  };

  const clickToAddTrip = async () => {
    try {
      const result = await API.post('/images', { title: addTripTitle });

      var db = firebase.firestore();
      await db.collection('trips').add({
        title: addTripTitle,
        startDate: new Date(dateRange.startDate),
        endDate: new Date(dateRange.endDate),
        description: addDescription,
        cost: Number(addCost),
        photo: result.data.url,
        userId: userId,
      });

      history.push(`/dashboard`);
    } catch (error) {
      console.error('Error cannot add trip', error);
    }
  };

  const onChangeDateRange = (range) => {
    setDateRange(range);
    return range;
  };

  return (
    <View>
      <BackToDashboardButton />
      <View style={styles.addTripContainer}>
        <Text style={styles.addTripTitle}>Add your trip</Text>
        <View style={styles.addInfoFields}>
          <TextInput
            style={styles.addInfo}
            placeholder='Location'
            name='title'
            inputText={addTripTitle}
            onChangeText={addTripTitleInput}
          />
          <TouchableOpacity onPress={() => setOpenCalendar(!openCalendar)}>
            <View style={styles.calendarContainer}>
              <Text style={styles.calendarText}>Change dates</Text>
              <Feather name='arrow-down' size={24} color='black' />
            </View>
          </TouchableOpacity>
          {openCalendar ? (
            <CalendarExample
              dateRange={dateRange}
              onChange={onChangeDateRange}
            />
          ) : null}

          <TextInput
            style={styles.addInfo}
            placeholder='Description'
            name='description'
            inputText={addDescription}
            onChangeText={addDescriptionInput}
          />

          <TextInput
            style={styles.addInfo}
            placeholder='Cost'
            name='cost'
            inputText={addCost}
            onChangeText={addCostInput}
          />

          <Button
            style={styles.button}
            title='Add Trip'
            onPress={() => {
              clickToAddTrip();
            }}
          ></Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  addTripContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 40,
    height: 400,
  },
  addInfoFields: { width: 300, marginTop: 30 },
  addTripTitle: {
    textAlign: 'left',
    color: '#2E5E4E',
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 20,
  },

  dashboardButtonContainer: {
    position: 'absolute',
    bottom: 20,
  },
  addInfo: {
    display: 'flex',
    padding: 15,
    borderWidth: 1,
    marginBottom: 15,
    margin: 10,
  },
  button: {
    width: 80,
    padding: 15,
    backgroundColor: '#1b3332',
    fontWeight: 'bold',
    color: '#ffffff',
  },
  arrow: { marginTop: 30 },

  calendarContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  calendarText: {
    fontSize: 18,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 10,
  },
});
