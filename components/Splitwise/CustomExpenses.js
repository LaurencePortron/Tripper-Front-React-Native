import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AddExpense from './AddExpense';
import moment from 'moment';
import { useFirestoreCollection } from '../hooks';
import firebase from 'firebase/app';
import SettleBalance from './SettleBalance';
import { useHistory } from 'react-router-native';

export default function CustomExpenses(props) {
  const tripId = props.match.params.id;
  const history = useHistory();

  const [expenseModalOpen, setExpenseModalOpen] = useState(false);

  const handleExpenseModalClosure = () => {
    setExpenseModalOpen(false);
  };

  const backToTripDetails = () => {
    history.push(`/trip-details/${tripId}`);
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

  return (
    <View style={styles.customExpensesContainer}>
      <Feather
        style={styles.backToTripButtoninCustomExpenses}
        name='arrow-left-circle'
        size={32}
        color='#2E5E4E'
        onPress={backToTripDetails}
      />
      <Text style={styles.customExpensesHeader}>Your custom expenses</Text>
      {fetchExpenses.map((expense) => {
        const expenseSplitBetweenParticipants =
          (expense.data.amount / (expense.data.participants.length + 1)) *
          expense.data.participants.length;
        const verifySettledBalance = expense.data.amountSettled;
        return (
          <View key={expense.id} style={styles.expenseContainer}>
            <View style={styles.expenseSection}>
              <Text style={styles.expenseData}>
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
              verifySettledBalance={verifySettledBalance}
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
    alignSelf: 'center',
    margin: 'auto',
    width: '90%',
  },

  backToTripButtoninCustomExpenses: {
    marginTop: 20,
    left: 300,
  },
  customExpensesHeader: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E5E4E',
  },
  backToTripButton: { marginLeft: 120 },

  expenseTitle: {
    textAlign: 'left',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E5E4E',
  },
  addExpenseContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: 30,
    marginTop: 10,
  },
  addExpenseText: {
    color: '#B37650',
    fontWeight: 'bold',
    fontSize: 15,
    marginRight: 5,
  },
  expenseContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,

    backgroundColor: '#ececec',
  },
  expenseSection: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
    height: 50,
    padding: 10,
  },
  expenseData: {
    fontWeight: 'bold',
  },

  totalBalanceOwed: { left: 190, borderTopWidth: 1, marginTop: 10 },
});
