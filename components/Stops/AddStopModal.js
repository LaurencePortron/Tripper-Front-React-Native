import React, { useState } from 'react';
import { View, StyleSheet, Modal, Text, TextInput, Button } from 'react-native';
import { Feather } from '@expo/vector-icons';
import firebase from 'firebase/app';
import { COLORS } from '../colors.js';

export default function AddStopModal({ tripId, show, handleStopModalClosure }) {
  var db = firebase.firestore();
  const [addStopLongitude, setAddStopLongitude] = useState('');
  const [addStopLatitude, setAddStopLatitude] = useState('');

  const [addStopDate, setAddStopDate] = useState('');
  const [addStopDescription, setAddStopDescription] = useState('');
  const [addStopCost, setAddStopCost] = useState('');
  const [addStopTitle, setAddStopTitle] = useState('');

  const addTitleForStop = (inputText) => {
    setAddStopTitle(inputText);
  };

  const addLongitudeForStop = (inputText) => {
    setAddStopLongitude(inputText);
  };

  const addLatitudeForStop = (inputText) => {
    setAddStopLatitude(inputText);
  };

  const addDateForStop = (inputText) => {
    setAddStopDate(inputText);
  };

  const addDescriptionForStop = (inputText) => {
    setAddStopDescription(inputText);
  };

  const addCostForStop = (inputText) => {
    setAddStopCost(inputText);
  };

  const clickToAddStop = async () => {
    db.collection('trips')
      .doc(tripId)
      .collection('stops')
      .add({
        title: addStopTitle,
        longitude: Number(addStopLongitude),
        latitude: Number(addStopLatitude),
        date: new Date(addStopDate),
        description: addStopDescription,
        cost: Number(addStopCost),
        trip_id: tripId,
      });

    history.push(`/trip-details${tripId}`);
  };

  return (
    <Modal visible={show} style={styles.modalContainer}>
      <View style={styles.modalMainDisplay}>
        <Feather
          name='x-circle'
          size={30}
          color='black'
          onPress={() => handleStopModalClosure()}
        />
        <View style={styles.addStopContainer}>
          <Text style={styles.addStopTitle}>Add a Stop</Text>
          <View style={styles.addInfoFields}>
            <TextInput
              style={styles.addInfo}
              placeholder='Title'
              name='title'
              inputText={addStopTitle}
              onChangeText={addTitleForStop}
            />
            <TextInput
              style={styles.addInfo}
              placeholder='Longitude'
              name='longitude'
              inputText={addStopLongitude}
              onChangeText={addLongitudeForStop}
            />

            <TextInput
              style={styles.addInfo}
              placeholder='Latitude'
              name='latitude'
              inputText={addStopLatitude}
              onChangeText={addLatitudeForStop}
            />

            <TextInput
              style={styles.addInfo}
              placeholder='Date'
              name='date'
              inputText={addStopDate}
              onChangeText={addDateForStop}
            />

            <TextInput
              style={styles.addInfo}
              placeholder='Description'
              name='description'
              inputText={addStopDescription}
              onChangeText={addDescriptionForStop}
            />

            <TextInput
              style={styles.addInfo}
              placeholder='Cost'
              name='cost'
              inputText={addStopCost}
              onChangeText={addCostForStop}
            />

            <Button
              onPress={() => {
                clickToAddStop();
                handleStopModalClosure();
              }}
              type='submit'
              method='post'
              action='/invites'
              title='Save changes'
            ></Button>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    display: 'flex',
    justifyContent: 'center',
  },

  calendarText: {
    fontSize: 18,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  modalMainDisplay: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    position: 'absolute',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#eee',
    top: 30,
    left: 35,
    width: 300,
    padding: 10,
  },

  editText: {
    textAlign: 'left',
    marginLeft: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.darkGreen,
    marginTop: 0,
  },
  editField: {
    display: 'flex',
    padding: 15,
    borderWidth: 1,
    borderColor: COLORS.darkGreen,
    marginBottom: 15,
    margin: 10,
  },

  calendarContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  addStopContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  addInfoFields: { width: 300, marginTop: 30 },
  addStopTitle: {
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
});
