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

      <View style={styles.overviewNavigationSection}>
        <View style={styles.splitWiseContainer}>
          {fetchExpenses.map((expense) => {
            return (
              <View key={expense.id} style={styles.expenseContainer}>
                <View style={styles.expenseSection}>
                  <Text style={styles.expenseData}>Title:</Text>
                  <Text>{expense.data.title}</Text>
                </View>

                <View style={styles.expenseSection}>
                  <Text style={styles.expenseData}>Owner:</Text>
                  <Text>{expense.data.person}</Text>
                </View>

                <View style={styles.expenseSection}>
                  <Text style={styles.expenseData}>Amount: </Text>
                  <Text>${expense.data.amount}</Text>
                </View>

                <View style={styles.expenseSection}>
                  <Text style={styles.expenseData}>Split with:</Text>
                  <Text>{expense.data.participants}</Text>
                </View>
              </View>
            );
          })}
        </View>
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
  },
  expenseSection: {
    display: 'flex',
    flexDirection: 'column',
    borderColor: 'black',
    borderWidth: 1,
    width: '26%',
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
