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
import { Feather } from '@expo/vector-icons';
import firebase from 'firebase/app';

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
        startDate: addStartDate,
        endDate: addEndDate,
        description: addDescription,
        cost: addCost,
        photo: result.data.url,
      });

      history.push(`/dashboard`);
    } catch (error) {
      console.error('Error', error);
    }
  };
  const backToDashboard = () => {
    history.push(`/dashboard`);
  };

  return (
    <ScrollView>
      <Feather
        style={styles.arrow}
        name='arrow-left'
        size={25}
        color='black'
        onPress={backToDashboard}
      />
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

        <Button
          style={styles.button}
          type='submit'
          method='post'
          action='/trips'
          title='Add Trip'
          onPress={() => {
            clickToAddTrip();
          }}
        ></Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  addInfoFields: { width: 300, marginTop: 30 },
  addTripTitle: { textAlign: 'center', color: '#4d4d4d', fontSize: 18 },
  addInfo: {
    display: 'flex',
    padding: 15,
    borderWidth: 1,
    borderColor: '#535b63',
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
});
