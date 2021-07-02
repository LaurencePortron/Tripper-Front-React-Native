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
import { COLORS } from '../colors.js';

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
      <View style={styles.addTripContainer}>
        <View style={styles.backToDashButton}>
          <BackToDashboardButton />
        </View>
        <Text style={styles.addTripTitle}>Add your trip</Text>
        <View style={styles.addInfoFields}>
          <Text style={styles.inputTitle}>Location</Text>
          <TextInput
            style={styles.addInfo}
            placeholder='Location'
            name='title'
            inputText={addTripTitle}
            onChangeText={addTripTitleInput}
          />
          <TouchableOpacity onPress={() => setOpenCalendar(!openCalendar)}>
            <View style={styles.calendarContainer}>
              <Text style={styles.calendarText}>Dates</Text>
              <Feather name='calendar' size={24} color='black' />
            </View>
          </TouchableOpacity>
          {openCalendar ? (
            <CalendarExample
              dateRange={dateRange}
              onChange={onChangeDateRange}
            />
          ) : null}
          <Text style={styles.inputTitle}>Description</Text>
          <TextInput
            style={styles.addInfo}
            placeholder='Description'
            name='description'
            inputText={addDescription}
            onChangeText={addDescriptionInput}
          />
          <Text style={styles.inputTitle}>Cost</Text>
          <TextInput
            style={styles.addInfo}
            placeholder='Cost'
            name='cost'
            inputText={addCost}
            onChangeText={addCostInput}
          />
          <View style={styles.button}>
            <Button
              title='Add Trip'
              color='white'
              onPress={() => {
                clickToAddTrip();
              }}
            ></Button>
          </View>
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

  backToDashButton: {
    position: 'absolute',
    top: 10,
    left: 310,
  },
  addInfoFields: {
    width: 300,
    marginTop: 30,
  },
  inputTitle: {
    fontWeight: 'bold',
    marginLeft: 10,
    fontSize: 20,
    color: COLORS.lightGreen,
  },
  addTripTitle: {
    textAlign: 'left',
    color: COLORS.darkGreen,
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 20,
  },
  addInfo: {
    display: 'flex',
    borderBottomWidth: 1,
    marginBottom: 45,
    marginTop: 20,
    margin: 10,
    paddingBottom: 10,
  },
  button: {
    alignSelf: 'center',
    width: 200,
    padding: 5,
    borderRadius: 10,
    backgroundColor: COLORS.brown,
    fontWeight: 'bold',
  },

  calendarContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  calendarText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 10,
    color: COLORS.lightGreen,
  },
});
