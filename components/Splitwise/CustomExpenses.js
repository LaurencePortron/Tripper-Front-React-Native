import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AddExpense from './AddExpense';
import moment from 'moment';
import { useFirestoreCollection } from '../hooks';
import firebase from 'firebase/app';
import { useHistory } from 'react-router-native';
import SettleBalance from './SettleBalance';

export default function CustomExpenses(props) {
  const tripId = props.match.params.id;
  const [expenseModalOpen, setExpenseModalOpen] = useState(false);
  const history = useHistory();
  const db = firebase.firestore();

  const handleExpenseModalClosure = () => {
    setExpenseModalOpen(false);
  };

  const fetchExpenses = useFirestoreCollection(
    firebase
      .firestore()
      .collection('trips')
      .doc(tripId)
      .collection('expenses')
      .orderBy('created', 'asc'),
    [tripId]
  );

  const backToTripDetails = () => {
    history.push(`/trip-details/${tripId}`);
  };

  if (!fetchExpenses) {
    return null;
  }

  const amountOfExpenses = fetchExpenses.map((expense) => {
    return expense.data.amount;
  });

  const totalOwed = amountOfExpenses.reduce(function (
    previousTotalExpenseBalance,
    newExpenseBalance
  ) {
    return previousTotalExpenseBalance + newExpenseBalance;
  },
  0);

  const verifySettledBalance = fetchExpenses.map((expense) => {
    return expense.data.amountSettled;
  });

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
        const expenseSplitBetweenParticipants =
          (expense.data.amount / (expense.data.participants.length + 1)) *
          expense.data.participants.length;

        return (
          <View key={expense.id} style={styles.expenseContainer}>
            <View style={styles.expenseSection}>
              <Text>
                {moment(expense.data.created.toDate()).format('MMM Do')}
              </Text>
            </View>
            <View style={styles.expenseSection}>
              <Text style={styles.expenseData}>{expense.data.title}</Text>
              <Text>${expense.data.amount}</Text>
            </View>
            <View style={styles.expenseSection}>
              <Text style={styles.expenseData}>You are owed:</Text>
              <Text>${expenseSplitBetweenParticipants}</Text>
            </View>
            <SettleBalance
              tripId={tripId}
              expenseId={expense.id}
              fetchExpenses={fetchExpenses}
            />
          </View>
        );
      })}
      <View style={styles.totalBalanceOwed}>
        <Text style={styles.expenseData}>total owed:</Text>
        <Text>${totalOwed}</Text>
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
  );
}

const styles = StyleSheet.create({
  customExpensesContainer: {
    marginLeft: 20,
    marginTop: 25,
    marginRight: 20,
    width: '80%',
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

    alignItems: 'flex-start',
    width: '35%',
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
  totalBalanceOwed: { display: 'flex', left: 210, borderTopWidth: 1 },
});
