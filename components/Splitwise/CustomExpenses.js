import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AddExpense from './AddExpense';
import { useHistory } from 'react-router-native';
import { useFirestoreCollection } from '../hooks';
import firebase from 'firebase/app';

export default function CustomExpenses({ tripId }) {
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
    <View style={styles.customExpensesContainer}>
      <Text style={styles.currentExpensesTitle}>Custom Expenses</Text>

      <TouchableOpacity
        style={styles.overviewNavigationSection}
        onPress={() => setExpenseModalOpen(true)}
      >
        <View style={styles.splitWiseContainer}>
          {fetchExpenses.map((expense) => {
            return (
              <View key={expense.id} style={styles.expenseContainer}>
                <Text style={styles.expenseSections}>{expense.data.title}</Text>
                <Text style={styles.expenseSections}>
                  {expense.data.person}
                </Text>
                <Text style={styles.expenseSections}>
                  ${expense.data.amount}
                </Text>
              </View>
            );
          })}
        </View>
        <View style={styles.addExpenseContainer}>
          <Text style={styles.overviewNavigationText}>Add Expense</Text>
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
    display: 'flex',
    flexDirection: 'column',
    marginTop: 20,
  },
  addExpenseContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  overviewNavigationText: {
    color: '#B37650',
    fontWeight: 'bold',
    fontSize: 15,
  },
  expenseContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  expenseSections: {
    borderColor: 'black',
    borderWidth: 1,
    width: 50,
    height: 30,
  },

  currentExpensesTitle: {
    textAlign: 'left',
    marginTop: 10,
    marginBottom: 10,
    fontSize: 20,
    color: '#2E5E4E',
  },
});
