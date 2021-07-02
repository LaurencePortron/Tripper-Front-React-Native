import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import firebase from 'firebase/app';
import CalendarExample from './CalendarExample';

export default function InviteModal({
  tripId,
  show,
  handleInviteModalClosure,
}) {
  var db = firebase.firestore();
  const [editDescription, setEditDescription] = useState('');
  const [editCost, setEditCost] = useState('');
  const [openCalendar, setOpenCalendar] = useState(false);
  const [dateRange, setDateRange] = useState({});

  const editDescriptionInput = (inputText) => {
    setEditDescription(inputText);
  };

  const editCostInput = (inputText) => {
    setEditCost(inputText);
  };

  const handleSaveChanges = () => {
    if (!dateRange.startDate || !dateRange.endDate) {
      return;
    }
    db.collection('trips')
      .doc(tripId)
      .update({
        startDate: new Date(dateRange.startDate),
        endDate: new Date(dateRange.endDate),
        description: editDescription,
        cost: Number(editCost),
      });
  };

  const onChangeDateRange = (range) => {
    setDateRange(range);
    return range;
  };

  return (
    <Modal visible={show} style={styles.modalContainer}>
      <View style={styles.modalMainDisplay}>
        <Feather
          name='x-circle'
          size={30}
          color='black'
          onPress={() => handleInviteModalClosure()}
        />
        <Text style={styles.editText}>Enter changes here</Text>

        <TouchableOpacity onPress={() => setOpenCalendar(!openCalendar)}>
          <View style={styles.calendarContainer}>
            <Text style={styles.calendarText}>Change dates</Text>
            <Feather name='arrow-down' size={24} color='black' />
          </View>
        </TouchableOpacity>
        {openCalendar ? (
          <CalendarExample dateRange={dateRange} onChange={onChangeDateRange} />
        ) : null}

        <TextInput
          style={styles.editField}
          onChangeText={editDescriptionInput}
          inputText={editDescription}
          placeholder='Change description'
          name='description'
        />
        <TextInput
          style={styles.editField}
          onChangeText={editCostInput}
          inputText={editCost}
          placeholder='Change amount'
          name='cost'
        />

        <Button
          onPress={() => {
            handleSaveChanges();
            handleInviteModalClosure();
          }}
          type='submit'
          method='post'
          action='/invites'
          title='Save changes'
        ></Button>
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
});
