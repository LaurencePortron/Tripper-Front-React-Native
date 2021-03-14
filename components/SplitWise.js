import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AddExpense from './AddExpense';
import { useHistory } from 'react-router-native';
import { useFirestoreCollection } from './hooks';
import firebase from 'firebase/app';

export default function SplitWise(props) {
  const tripId = props.match.params.id;
  const [expenseModalOpen, setExpenseModalOpen] = useState(false);
  const history = useHistory();

  const handleExpenseModalClosure = () => {
    setExpenseModalOpen(false);
  };

  const BackToTripDetails = () => {
    history.push(`/trip-details/${tripId}`);
  };

  const fetchExpenses = useFirestoreCollection(
    firebase.firestore().collection('trips').doc(tripId).collection('expenses'),
    [tripId]
  );

  if (!fetchExpenses) {
    return null;
  }

  return (
    <View style={styles.friendsContainer}>
      <Feather
        name='arrow-left-circle'
        size={32}
        color='#B37650'
        style={styles.backToTripDetailsButton}
        onPress={BackToTripDetails}
      />
      <Text style={styles.splitWiseTitle}>SplitWise</Text>
      <Text style={styles.currentExpensesTitle}>Current Expenses</Text>
      {fetchExpenses.map((expense) => {
        return (
          <View key={expense.id}>
            <Text>{expense.data.title}</Text>
            <Text>{expense.data.person}</Text>
            <Text>{expense.data.amount}</Text>
          </View>
        );
      })}
      <TouchableOpacity
        style={styles.overviewNavigationSection}
        onPress={() => setExpenseModalOpen(true)}
      >
        <Text style={styles.overviewNavigationText}>Add Expense</Text>
        <Feather name='arrow-right' size={24} color='#B37650' />
      </TouchableOpacity>
      <AddExpense
        tripId={tripId}
        show={expenseModalOpen}
        handleExpenseModalClosure={handleExpenseModalClosure}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  splitWiseTitle: {
    color: '#2E5E4E',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 30,
    marginLeft: 10,
    marginTop: 20,
  },
  backToTripDetailsButton: {
    marginTop: 20,
    marginLeft: 20,
  },
  addExpenseTitle: {
    textAlign: 'left',
    marginLeft: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E5E4E',
    marginTop: 0,
    borderWidth: 1,
    padding: 10,
  },
  currentExpensesTitle: {
    textAlign: 'left',
    marginLeft: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E5E4E',
    marginTop: 0,
  },
  overviewNavigationSection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 20,
    marginLeft: 20,
  },
  overviewNavigationText: {
    color: '#B37650',
    fontWeight: 'bold',
    fontSize: 15,
    marginRight: 10,
  },
});
