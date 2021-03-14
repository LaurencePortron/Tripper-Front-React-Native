import React, { useState } from 'react';
import API from '../services/API';
import { useHistory } from 'react-router-native';
import {
  TextInput,
  View,
  Button,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import firebase from 'firebase/app';
import BackToDashboardButton from './Buttons';
import { TouchableOpacity } from 'react-native';

export default function AddTrip(props) {
  const [addTripTitle, setAddTripTitle] = useState('');
  const [addStartDate, setAddStartDate] = useState('');
  const [addEndDate, setAddEndDate] = useState('');
  const [addDescription, setAddDescription] = useState('');
  const [addCost, setAddCost] = useState('');

  var db = firebase.firestore();
  require('firebase/firestore');

  const history = useHistory();

  const addTripTitleInput = (inputText) => {
    setAddTripTitle(inputText);
  };

  const addStartDateInput = (inputText) => {
    setAddStartDate(inputText);
  };
  const addEndDateInput = (inputText) => {
    setAddEndDate(inputText);
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

      await db.collection('trips').add({
        title: addTripTitle,
        startDate: new Date(addStartDate),
        endDate: new Date(addEndDate),
        description: addDescription,
        cost: Number(addCost),
        photo: result.data.url,
      });

      history.push(`/dashboard`);
    } catch (error) {
      console.error('Error', error);
    }
  };

  return (
    <ScrollView>
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

          <TextInput
            style={styles.addInfo}
            placeholder='Start Date'
            name='startDate'
            inputText={addStartDate}
            onChangeText={addStartDateInput}
          />

          <TextInput
            style={styles.addInfo}
            placeholder='End Date'
            name='endDate'
            inputText={addEndDate}
            onChangeText={addEndDateInput}
          />

          <TextInput
            style={styles.addInfo}
            placeholder='Description'
            name='description'
            inputText={addDescription}
            onChangeText={addDescriptionInput}
          />

          <TextInput
            style={styles.addInfo}
            placeholder='Description'
            name='cost'
            inputText={addCost}
            onChangeText={addCostInput}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              clickToAddTrip();
            }}
          >
            <Text style={styles.buttonColor}>Add Trip</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  addTripContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  addInfoFields: { width: 300, marginTop: 30 },
  addTripTitle: {
    textAlign: 'center',
    color: '#2E5E4E',
    fontSize: 20,
    fontWeight: 'bold',
  },
  addInfo: {
    display: 'flex',
    padding: 15,
    borderBottomWidth: 1,
    marginBottom: 15,
    margin: 10,
  },
  button: {
    padding: 20,
    backgroundColor: 'white',
    borderColor: '#2E5E4E',
    borderWidth: 1,
    fontWeight: 'bold',
  },
  buttonColor: {
    color: '#2E5E4E',
  },
  arrow: { marginTop: 30 },
});
