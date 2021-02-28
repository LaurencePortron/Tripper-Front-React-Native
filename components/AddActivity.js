import React, { useState } from 'react';
import { useHistory } from 'react-router-native';
import API from '../services/API';
import {
  TextInput,
  View,
  Button,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function AddActivity(props) {
  const [addTitle, setAddTitle] = useState('');
  const [addDate, setAddDate] = useState('');
  const [addDescription, setAddDescription] = useState('');
  const [addCost, setAddCost] = useState('');
  const history = useHistory();
  const [isClicked, setIsClicked] = useState(false);

  const tripId = props.match.params.id;

  const addTitleForActivity = (inputText) => {
    setAddTitle(inputText);
  };
  const addDateForActivity = (inputText) => {
    setAddDate(inputText);
  };

  const addDescriptionForActivity = (inputText) => {
    setAddDescription(inputText);
  };

  const addCostForActivity = (inputText) => {
    setAddCost(inputText);
  };

  const backToDashboard = () => {
    history.push(`/dashboard`);
  };

  const clickToAddActivity = async () => {
    await API.post(`/activities`, {
      title: addTitle,
      date: addDate,
      description: addDescription,
      cost: addCost,
      trip_id: tripId,
    });

    setIsClicked(true);
    history.push(`/trip-details/${tripId}`);
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
      <Text style={styles.addTripTitle}>Add an activity</Text>
      <View style={styles.addInfoFields}>
        <TextInput
          style={styles.addInfo}
          placeholder='Title'
          name='title'
          inputText={addTitle}
          onChangeText={addTitleForActivity}
        />

        <TextInput
          style={styles.addInfo}
          placeholder='Date'
          name='date'
          inputText={addDate}
          onChangeText={addDateForActivity}
        />

        <TextInput
          style={styles.addInfo}
          placeholder='Description'
          name='description'
          inputText={addDescription}
          onChangeText={addDescriptionForActivity}
        />

        <TextInput
          style={styles.addInfo}
          placeholder='Cost'
          name='cost'
          inputText={addCost}
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
  arrow: {
    marginTop: 30,
  },
});
