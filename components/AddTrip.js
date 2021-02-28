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

export default function AddTrip(props) {
  const [changeTripTitle, setChangeTripTitle] = useState('');
  const [changeStartDate, setChangeStartDate] = useState('');
  const [changeEndDate, setChangeEndDate] = useState('');
  const [changeDescription, setChangeDescription] = useState('');
  const [changeCost, setChangeCost] = useState('');
  const [isClicked, setIsClicked] = useState(false);

  const history = useHistory();

  const changeTripTitleInput = (inputText) => {
    setChangeTripTitle(inputText);
  };

  const changeStartDateInput = (inputText) => {
    setChangeStartDate(inputText);
  };
  const changeEndDateInput = (inputText) => {
    setChangeEndDate(inputText);
  };

  const changeDescriptionInput = (inputText) => {
    setChangeDescription(inputText);
  };

  const changeCostInput = (inputText) => {
    setChangeCost(inputText);
  };

  const clickToAddTrip = async () => {
    await API.post(`/trips`, {
      title: changeTripTitle,
      startDate: changeStartDate,
      endDATE: changeEndDate,
      description: changeDescription,
      cost: changeCost,
    });
    setIsClicked(false);
    history.push(`/dashboard`);
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
          inputText={changeTripTitle}
          onChangeText={changeTripTitleInput}
        />

        <TextInput
          style={styles.addInfo}
          placeholder='Start Date'
          name='startDate'
          inputText={changeStartDate}
          onChangeText={changeStartDateInput}
        />

        <TextInput
          style={styles.addInfo}
          placeholder='End Date'
          name='endDATE'
          inputText={changeEndDate}
          onChangeText={changeEndDateInput}
        />

        <TextInput
          style={styles.addInfo}
          placeholder='Description'
          name='description'
          inputText={changeDescription}
          onChangeText={changeDescriptionInput}
        />

        <TextInput
          style={styles.addInfo}
          placeholder='Description'
          name='cost'
          inputText={changeCost}
          onChangeText={changeCostInput}
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
