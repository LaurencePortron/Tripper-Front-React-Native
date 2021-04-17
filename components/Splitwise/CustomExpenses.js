import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AddExpense from './AddExpense';
import moment from 'moment';
import { useFirestoreCollection } from '../hooks';
import firebase from 'firebase/app';
import { useHistory } from 'react-router-native';

export default function CustomExpenses(props) {
  const tripId = props.match.params.id;
  const [expenseModalOpen, setExpenseModalOpen] = useState(false);
  const history = useHistory();

  const handleExpenseModalClosure = () => {
    setExpenseModalOpen(false);
  };

  const fetchExpenses = useFirestoreCollection(
    firebase.firestore().collection('trips').doc(tripId).collection('expenses'),
    [tripId]
  );

  const backToTripDetails = () => {
    history.push(`/trip-details/${tripId}`);
  };

  if (!fetchExpenses) {
    return null;
  }

  return (
    <View style={styles.customExpensesContainer}>
      <View style={styles.customExpensesHeader}>
        <Text style={styles.expenseTitle}>Balance Overview</Text>
        <Feather
          style={styles.backToTripButton}
          name='arrow-left-circle'
          size={32}
          color='#2E5E4E'
          onPress={backToTripDetails}
        />
      </View>
      {fetchExpenses.map((expense) => {
        return (
          <View key={expense.id} style={styles.expenseContainer}>
            <Text>
              {moment(expense.data.created.toDate()).format('MMM Do')}
            </Text>

            <View style={styles.expenseSection}>
              <Text style={styles.expenseData}>{expense.data.title}</Text>
              <Text>${expense.data.amount}</Text>
            </View>
            <View style={styles.expenseSection}>
              <Text style={styles.expenseData}>'Person' paid:</Text>
              <Text>{expense.data.participants}</Text>
            </View>
          </View>
        );
      })}
      <TouchableOpacity onPress={() => setExpenseModalOpen(true)}>
        <View style={styles.addExpenseContainer}>
          <Text style={styles.addExpenseText}>Add Expense</Text>
          <Feather name='arrow-right' size={24} color='#B37650' />
        </View>
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
  customExpensesContainer: {
    marginLeft: 20,
    marginTop: 25,
  },
  backToTripButton: { marginLeft: 120 },
  customExpensesHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  expenseTitle: {
    textAlign: 'left',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E5E4E',
  },
  addExpenseContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  addExpenseText: {
    color: '#B37650',
    fontWeight: 'bold',
    fontSize: 15,
  },
  expenseContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25,
  },
  expenseSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '30%',
    height: 50,
  },
  expenseData: { fontWeight: 'bold' },
  currentExpensesTitle: {
    textAlign: 'left',
    marginTop: 10,
    marginBottom: 10,
    fontSize: 20,
    color: '#93A7AA',
  },
});
