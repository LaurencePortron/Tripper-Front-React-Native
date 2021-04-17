import React, { useState } from 'react';
import {
  View,
  Modal,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import firebase from 'firebase/app';
import DropDownSelector from './DropDownSelector';
import { useHistory } from 'react-router-native';

export default function AddExpense({
  tripId,
  show,
  handleExpenseModalClosure,
}) {
  const [addExpenseTitle, setAddExpenseTitle] = useState('');
  const [addExpensePerson, setAddExpensePerson] = useState('');
  const [addExpenseAmount, setAddExpenseAmount] = useState('');
  const [addExpenseParticipants, setAddExpenseParticipants] = useState('');
  var db = firebase.firestore();
  require('firebase/firestore');
  const history = useHistory();

  const handleExpenseTitle = (inputText) => {
    setAddExpenseTitle(inputText);
  };
  const handleExpensePerson = (inputText) => {
    setAddExpensePerson(inputText);
  };

  const handleExpenseAmount = (inputText) => {
    setAddExpenseAmount(inputText);
  };

  const onChangeText = (value) => {
    setAddExpenseParticipants(value);
  };

  const clickToAddExpense = () => {
    db.collection('trips')
      .doc(tripId)
      .collection('expenses')
      .add({
        title: addExpenseTitle,
        person: addExpensePerson,
        amount: Number(addExpenseAmount),
        participants: addExpenseParticipants,
        trip_id: tripId,
        created: firebase.firestore.Timestamp.fromDate(new Date()),
      });
    history.push(`/custom-expenses/${tripId}`);
  };

  // what we need: friends (associate costs), option to add costs (such as groceries, other activities etc: 1 textInput to add with different titles)

  //when adding a cost we display: date, title of cost, person who paid, expense amount,

  //add dropdown for friends who are part of the trip

  return (
    <Modal visible={show}>
      <View style={styles.modalContainer}>
        <Feather
          name='x-circle'
          size={30}
          color='#535b63'
          onPress={() => handleExpenseModalClosure()}
        />
        <TextInput
          style={styles.addExpense}
          placeholder='Expense Title'
          name='Expense Title'
          inputText={addExpenseTitle}
          onChangeText={handleExpenseTitle}
        />
        <TextInput
          style={styles.addExpense}
          placeholder='Person'
          name='Person'
          inputText={addExpensePerson}
          onChangeText={handleExpensePerson}
        />
        <TextInput
          style={styles.addExpense}
          placeholder='Amount'
          name='Amount'
          inputText={addExpenseAmount}
          onChangeText={handleExpenseAmount}
        />
        <DropDownSelector tripId={tripId} onChangeText={onChangeText} />
        <TouchableOpacity
          style={styles.clickForDetailsSection}
          onPress={() => {
            clickToAddExpense();
            handleExpenseModalClosure();
          }}
        >
          <Text style={styles.clickForDetailsText}>Submit Expense</Text>
          <Feather
            name='arrow-right'
            size={24}
            color='#2E5E4E'
            style={styles.expenseButton}
          />
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
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
  splitWiseTitle: {
    color: '#2E5E4E',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 30,
    marginLeft: 10,
  },

  addExpense: {
    display: 'flex',
    padding: 15,
    borderWidth: 1,
    borderColor: '#535b63',
    marginBottom: 15,
    margin: 10,
  },
  expenseButton: {
    display: 'flex',
    color: '#2E5E4E',
    marginLeft: 20,
  },
  clickForDetailsSection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
    marginBottom: 10,
  },
  clickForDetailsText: { fontWeight: 'bold', color: '#2E5E4E' },
});
