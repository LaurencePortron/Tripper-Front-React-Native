import React, { useState } from 'react';
import { useHistory } from 'react-router-native';
import API from '../../services/API';
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
import { COLORS } from '../colors.js';

export default function AddActivity(props) {
  const [addActivityTitle, setAddActivityTitle] = useState('');
  const [addActivityDate, setAddActivityDate] = useState('');
  const [addActivityDescription, setAddActivityDescription] = useState('');
  const [addActivityCost, setAddActivityCost] = useState('');
  const history = useHistory();
  var db = firebase.firestore();
  require('firebase/firestore');
  const user = firebase.auth().currentUser;
  const userId = user.uid;

  const tripId = props.match.params.id;

  const addTitleForActivity = (inputText) => {
    setAddActivityTitle(inputText);
  };
  const addDateForActivity = (inputText) => {
    setAddActivityDate(inputText);
  };

  const addDescriptionForActivity = (inputText) => {
    setAddActivityDescription(inputText);
  };

  const addCostForActivity = (inputText) => {
    setAddActivityCost(inputText);
  };

  const clickToAddActivity = async () => {
    try {
      const result = await API.post('/images', { title: addActivityTitle });

      await db
        .collection('trips')
        .doc(tripId)
        .collection('activities')
        .add({
          title: addActivityTitle,
          date: new Date(addActivityDate),
          description: addActivityDescription,
          cost: Number(addActivityCost),
          trip_id: tripId,
          photo: result.data.url,
        });
      db.collection('notifications').add({
        userId: userId,
        trip_id: tripId,
      });

      history.push(`/trip-details/${tripId}`);
    } catch (error) {
      console.error('Error', error);
    }
  };
  const backToTripDetails = () => {
    history.push(`/trip-details/${tripId}`);
  };

  return (
    <ScrollView>
      <Feather
        style={styles.backToTripButton}
        name='arrow-left-circle'
        size={32}
        color={COLORS.darkGreen}
        onPress={backToTripDetails}
      />
      <View style={styles.addActivityContainer}>
        <Text style={styles.addActivityTitle}>Add an activity</Text>
        <View style={styles.addInfoFields}>
          <TextInput
            style={styles.addInfo}
            placeholder='Title'
            name='title'
            inputText={addActivityTitle}
            onChangeText={addTitleForActivity}
          />

          <TextInput
            style={styles.addInfo}
            placeholder='Date'
            name='date'
            inputText={addActivityDate}
            onChangeText={addDateForActivity}
          />

          <TextInput
            style={styles.addInfo}
            placeholder='Description'
            name='description'
            inputText={addActivityDescription}
            onChangeText={addDescriptionForActivity}
          />

          <TextInput
            style={styles.addInfo}
            placeholder='Cost'
            name='cost'
            inputText={addActivityCost}
            onChangeText={addCostForActivity}
          />

          <Button
            style={styles.button}
            type='submit'
            method='post'
            action='/trips'
            title='Add Activity'
            onPress={() => {
              clickToAddActivity();
            }}
          ></Button>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  addActivityContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  addInfoFields: { width: 300, marginTop: 30 },
  addActivityTitle: {
    textAlign: 'center',
    color: COLORS.darkGreen,
    fontSize: 20,
    fontWeight: 'bold',
  },
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
  arrow: {
    marginTop: 30,
  },
  backToTripButton: {
    marginTop: 20,
    left: 300,
  },
});
